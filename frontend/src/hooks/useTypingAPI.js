import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useTypingAPI = () => {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create or get session
  useEffect(() => {
    const initSession = async () => {
      try {
        // Check if we have a session in localStorage
        const storedSessionId = localStorage.getItem('typingSessionId');
        
        if (storedSessionId) {
          // Verify session exists
          const response = await axios.get(`${API}/sessions/${storedSessionId}`);
          setSessionId(storedSessionId);
        } else {
          // Create new session
          const response = await axios.post(`${API}/sessions`);
          const newSessionId = response.data.id;
          localStorage.setItem('typingSessionId', newSessionId);
          setSessionId(newSessionId);
        }
      } catch (error) {
        // If session doesn't exist or error, create new one
        try {
          const response = await axios.post(`${API}/sessions`);
          const newSessionId = response.data.id;
          localStorage.setItem('typingSessionId', newSessionId);
          setSessionId(newSessionId);
        } catch (err) {
          console.error('Error creating session:', err);
          setError('Failed to initialize session');
        }
      }
    };

    initSession();
  }, []);

  // Get random word
  const getRandomWord = async (theme, language) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API}/words/${theme}/${language}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching word:', error);
      setError('Failed to fetch word');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Save typing result
  const saveResult = async (wordData, timeMs) => {
    if (!sessionId) {
      throw new Error('No session available');
    }

    try {
      setLoading(true);
      setError(null);

      const resultData = {
        session_id: sessionId,
        word: wordData.word,
        icon: wordData.icon,
        color: wordData.color,
        theme: wordData.theme,
        language: wordData.language,
        time_ms: timeMs
      };

      const response = await axios.post(`${API}/results`, resultData);
      return response.data;
    } catch (error) {
      console.error('Error saving result:', error);
      setError('Failed to save result');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get session results
  const getSessionResults = async (limit = 50) => {
    if (!sessionId) return [];

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API}/results/${sessionId}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching results:', error);
      setError('Failed to fetch results');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get session statistics
  const getSessionStats = async () => {
    if (!sessionId) return null;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API}/stats/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to fetch statistics');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Clear session data
  const clearSessionData = async () => {
    if (!sessionId) return;

    try {
      setLoading(true);
      setError(null);

      await axios.delete(`${API}/sessions/${sessionId}`);
      return true;
    } catch (error) {
      console.error('Error clearing session:', error);
      setError('Failed to clear session data');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get available themes
  const getThemes = async () => {
    try {
      const response = await axios.get(`${API}/themes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching themes:', error);
      // Return fallback themes if API fails
      return {
        fruits: { en: 'Fruits', es: 'Frutas' },
        colors: { en: 'Colors', es: 'Colores' },
        animals: { en: 'Animals', es: 'Animales' },
        objects: { en: 'Objects', es: 'Objetos' },
        random: { en: 'Random Mix', es: 'Mezcla Aleatoria' }
      };
    }
  };

  return {
    sessionId,
    loading,
    error,
    getRandomWord,
    saveResult,
    getSessionResults,
    getSessionStats,
    clearSessionData,
    getThemes
  };
};