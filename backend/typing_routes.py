from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import TypingResult, TypingResultCreate, TypingStats, UserSession, UserSessionCreate, WordData
from word_database import get_random_word, calculate_wpm, get_available_themes, WORD_THEMES
from datetime import datetime
from typing import List, Optional
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

router = APIRouter(prefix="/api")

@router.get("/themes")
async def get_themes():
    """Get all available word themes with translations"""
    return get_available_themes()

@router.get("/words/{theme}/{language}", response_model=WordData)
async def get_word(theme: str, language: str):
    """Get a random word from the specified theme and language"""
    try:
        word_data = get_random_word(theme, language)
        return WordData(**word_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error getting word: {str(e)}")

@router.post("/sessions", response_model=UserSession)
async def create_session():
    """Create a new user session"""
    try:
        session = UserSession()
        session_dict = session.dict()
        await db.user_sessions.insert_one(session_dict)
        return session
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating session: {str(e)}")

@router.get("/sessions/{session_id}", response_model=UserSession)
async def get_session(session_id: str):
    """Get session information"""
    try:
        session = await db.user_sessions.find_one({"id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        return UserSession(**session)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting session: {str(e)}")

@router.post("/results", response_model=TypingResult)
async def save_typing_result(result: TypingResultCreate):
    """Save a typing test result"""
    try:
        # Calculate WPM
        wpm = calculate_wpm(result.word, result.time_ms)
        
        # Create the typing result
        typing_result = TypingResult(**result.dict(), wpm=wpm)
        result_dict = typing_result.dict()
        
        # Save to database
        await db.typing_results.insert_one(result_dict)
        
        # Update session stats
        await db.user_sessions.update_one(
            {"id": result.session_id},
            {
                "$set": {"last_activity": datetime.utcnow()},
                "$inc": {"total_words_typed": 1}
            }
        )
        
        return typing_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving result: {str(e)}")

@router.get("/results/{session_id}", response_model=List[TypingResult])
async def get_session_results(session_id: str, limit: Optional[int] = 50):
    """Get all typing results for a session"""
    try:
        results = await db.typing_results.find(
            {"session_id": session_id}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        
        return [TypingResult(**result) for result in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting results: {str(e)}")

@router.get("/stats/{session_id}", response_model=TypingStats)
async def get_session_stats(session_id: str):
    """Get comprehensive statistics for a session"""
    try:
        # Get all results for the session
        results = await db.typing_results.find({"session_id": session_id}).to_list(1000)
        
        if not results:
            return TypingStats(
                session_id=session_id,
                total_words=0,
                average_time_ms=0.0,
                best_time_ms=0,
                worst_time_ms=0,
                average_wpm=0.0,
                best_wpm=0.0,
                words_by_theme={},
                recent_results=[]
            )
        
        # Calculate statistics
        times = [r["time_ms"] for r in results]
        wpms = [r["wpm"] for r in results]
        
        # Group by theme
        words_by_theme = {}
        for result in results:
            theme = result["theme"]
            if theme not in words_by_theme:
                words_by_theme[theme] = 0
            words_by_theme[theme] += 1
        
        # Get recent results (last 10)
        recent_results = sorted(results, key=lambda x: x["timestamp"], reverse=True)[:10]
        
        stats = TypingStats(
            session_id=session_id,
            total_words=len(results),
            average_time_ms=round(sum(times) / len(times), 2),
            best_time_ms=min(times),
            worst_time_ms=max(times),
            average_wpm=round(sum(wpms) / len(wpms), 2),
            best_wpm=max(wpms),
            words_by_theme=words_by_theme,
            recent_results=[TypingResult(**r) for r in recent_results]
        )
        
        return stats
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting stats: {str(e)}")

@router.delete("/sessions/{session_id}")
async def clear_session_data(session_id: str):
    """Clear all data for a session"""
    try:
        # Delete all typing results for the session
        await db.typing_results.delete_many({"session_id": session_id})
        
        # Reset session stats
        await db.user_sessions.update_one(
            {"id": session_id},
            {
                "$set": {
                    "total_words_typed": 0,
                    "last_activity": datetime.utcnow()
                }
            }
        )
        
        return {"message": "Session data cleared successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error clearing session data: {str(e)}")

@router.get("/leaderboard")
async def get_leaderboard(limit: Optional[int] = 10):
    """Get top performers across all sessions"""
    try:
        # Get best WPM results
        pipeline = [
            {"$sort": {"wpm": -1}},
            {"$limit": limit},
            {"$project": {
                "session_id": 1,
                "word": 1,
                "time_ms": 1,
                "wpm": 1,
                "timestamp": 1,
                "theme": 1,
                "language": 1
            }}
        ]
        
        results = await db.typing_results.aggregate(pipeline).to_list(limit)
        return results
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting leaderboard: {str(e)}")