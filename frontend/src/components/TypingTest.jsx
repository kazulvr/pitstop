import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getRandomWord } from '../mock/wordData';

const TypingTest = ({ theme, language }) => {
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [results, setResults] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const inputRef = useRef(null);

  const generateNewWord = () => {
    const word = getRandomWord(theme, language);
    setCurrentWord(word);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsTyping(false);
  };

  useEffect(() => {
    generateNewWord();
  }, [theme, language]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    if (!isTyping && value.length > 0) {
      setStartTime(Date.now());
      setIsTyping(true);
    }

    if (value === currentWord.word) {
      const endTime = Date.now();
      setEndTime(endTime);
      const timeTaken = endTime - startTime;
      
      const newResult = {
        word: currentWord.word,
        icon: currentWord.icon,
        time: timeTaken,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setResults(prev => [...prev, newResult]);
      
      // Auto-generate new word after 2 seconds
      setTimeout(() => {
        generateNewWord();
      }, 2000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setResults([]);
    generateNewWord();
    inputRef.current?.focus();
  };

  const resetGame = () => {
    setGameStarted(false);
    setResults([]);
    generateNewWord();
  };

  if (!gameStarted) {
    return (
      <div className="text-center retro-panel p-8">
        <h2 className="text-2xl font-bold mb-4 retro-title">
          {language === 'es' ? '⚡ ¡Prueba tu velocidad de escritura!' : '⚡ Test your typing speed!'}
        </h2>
        <p className="text-lg mb-6 opacity-80">
          {language === 'es' 
            ? 'Escribe las palabras lo más rápido que puedas'
            : 'Type the words as fast as you can'
          }
        </p>
        <Button
          onClick={startGame}
          className="retro-start-button text-lg font-bold px-8 py-4"
          style={{
            background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
            border: 'none',
            color: 'white',
            boxShadow: '0 8px 25px rgba(255, 107, 157, 0.3)'
          }}
        >
          {language === 'es' ? '🚀 ¡Comenzar!' : '🚀 Start!'}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Current Word Display */}
      <div className="retro-word-display text-center p-8 mb-6">
        {currentWord && (
          <div className="mb-6">
            <div 
              className="text-8xl mb-4 retro-icon"
              style={{ 
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                color: currentWord.color 
              }}
            >
              {currentWord.icon}
            </div>
            <h2 
              className="text-4xl font-bold retro-word"
              style={{ color: currentWord.color }}
            >
              {currentWord.word}
            </h2>
          </div>
        )}

        {/* Input Field */}
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder={language === 'es' ? 'Escribe aquí...' : 'Type here...'}
            className="text-2xl text-center p-4 retro-input"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '3px solid #ffd93d',
              borderRadius: '15px',
              fontSize: '24px',
              boxShadow: '0 4px 15px rgba(255, 217, 61, 0.3)'
            }}
            autoComplete="off"
            disabled={endTime !== null}
          />
          
          {/* Typing indicator */}
          {isTyping && !endTime && (
            <div className="absolute top-2 right-2">
              <div className="animate-pulse text-green-500 text-xl">⚡</div>
            </div>
          )}
          
          {/* Success indicator */}
          {endTime && (
            <div className="absolute top-2 right-2">
              <div className="text-green-500 text-xl">✅</div>
            </div>
          )}
        </div>

        {/* Current time display */}
        {endTime && (
          <div className="mt-4 retro-time-display">
            <p className="text-xl font-bold" style={{ color: currentWord.color }}>
              {language === 'es' ? '⏱️ Tiempo: ' : '⏱️ Time: '}
              <span className="text-2xl">
                {endTime - startTime}ms
              </span>
              <span className="text-lg opacity-70 ml-2">
                ({((endTime - startTime) / 1000).toFixed(2)}s)
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Results Panel */}
      {results.length > 0 && (
        <div className="retro-panel p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold retro-title">
              {language === 'es' ? '📊 Resultados' : '📊 Results'}
            </h3>
            <Button
              onClick={resetGame}
              variant="outline"
              className="retro-button text-sm"
              style={{
                border: '2px solid #ff6b9d',
                color: '#ff6b9d'
              }}
            >
              {language === 'es' ? '🔄 Reiniciar' : '🔄 Reset'}
            </Button>
          </div>
          
          <div className="grid gap-3 max-h-60 overflow-y-auto">
            {results.slice(-5).reverse().map((result, index) => (
              <div 
                key={index} 
                className="retro-result-item flex items-center justify-between p-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 217, 61, 0.3)'
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{result.icon}</span>
                  <span className="font-bold">{result.word}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{result.time}ms</div>
                  <div className="text-sm opacity-70">{result.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Average time */}
          {results.length >= 3 && (
            <div className="mt-4 text-center p-3 retro-stats">
              <p className="font-bold text-lg">
                {language === 'es' ? '📈 Promedio: ' : '📈 Average: '}
                <span className="text-xl" style={{ color: '#4ecdc4' }}>
                  {Math.round(results.reduce((sum, r) => sum + r.time, 0) / results.length)}ms
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TypingTest;