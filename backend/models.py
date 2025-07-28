from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class WordData(BaseModel):
    word: str
    icon: str
    color: str
    theme: str
    language: str

class TypingResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    word: str
    icon: str
    color: str
    theme: str
    language: str
    time_ms: int
    wpm: float = Field(default=0.0)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class TypingResultCreate(BaseModel):
    session_id: str
    word: str
    icon: str
    color: str
    theme: str
    language: str
    time_ms: int

class TypingStats(BaseModel):
    session_id: str
    total_words: int
    average_time_ms: float
    best_time_ms: int
    worst_time_ms: int
    average_wpm: float
    best_wpm: float
    words_by_theme: dict
    recent_results: List[TypingResult]

class UserSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_activity: datetime = Field(default_factory=datetime.utcnow)
    total_words_typed: int = Field(default=0)
    
class UserSessionCreate(BaseModel):
    pass