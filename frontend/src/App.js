import React, { useState } from 'react';
import './App.css';
import LanguageSelector from './components/LanguageSelector';
import ThemeSelector from './components/ThemeSelector';
import TypingTest from './components/TypingTest';

function App() {
  const [language, setLanguage] = useState('es');
  const [theme, setTheme] = useState('fruits');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="App retro-app">
      {/* Header */}
      <header className="retro-header p-6 text-center">
        <h1 className="retro-title text-4xl font-bold mb-2">
          {language === 'es' ? '⚡ Velocidad de Escritura' : '⚡ Typing Speed'}
        </h1>
        <p className="retro-subtitle text-lg opacity-80">
          {language === 'es' 
            ? 'Pon a prueba qué tan rápido puedes escribir' 
            : 'Test how fast you can type'
          }
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-8">
          <LanguageSelector 
            currentLanguage={language} 
            onLanguageChange={setLanguage} 
          />
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="retro-settings-button"
            style={{
              background: 'linear-gradient(135deg, #ffd93d, #ffa726)',
              border: '2px solid #ffd93d',
              color: '#333',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {showSettings ? '❌' : '⚙️'} {language === 'es' ? 'Ajustes' : 'Settings'}
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-8">
            <ThemeSelector 
              currentTheme={theme} 
              onThemeChange={setTheme} 
              language={language} 
            />
          </div>
        )}

        {/* Typing Test */}
        <TypingTest theme={theme} language={language} />
      </main>

      {/* Footer */}
      <footer className="retro-footer text-center p-6 mt-12">
        <p className="opacity-70 text-sm">
          {language === 'es' 
            ? '✨ Hecho con amor y estética retro ✨' 
            : '✨ Made with love and retro aesthetics ✨'
          }
        </p>
      </footer>
    </div>
  );
}

export default App;