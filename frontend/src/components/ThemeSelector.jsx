import React from 'react';
import { Button } from './ui/button';
import { WORD_THEMES } from '../mock/wordData';

const ThemeSelector = ({ currentTheme, onThemeChange, language }) => {
  const themes = Object.keys(WORD_THEMES);

  return (
    <div className="retro-panel p-6 mb-6">
      <h3 className="text-lg font-bold mb-4 text-center retro-title">
        {language === 'es' ? '🎯 Elige tu tema' : '🎯 Choose your theme'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {themes.map((theme) => (
          <Button
            key={theme}
            variant={currentTheme === theme ? 'default' : 'outline'}
            onClick={() => onThemeChange(theme)}
            className="retro-theme-button text-sm font-bold py-3"
            style={{
              background: currentTheme === theme 
                ? 'linear-gradient(135deg, #ffd93d, #ffa726)' 
                : 'rgba(255, 255, 255, 0.1)',
              border: '2px solid #ffd93d',
              color: currentTheme === theme ? '#333' : '#ffd93d',
              backdropFilter: 'blur(10px)'
            }}
          >
            {WORD_THEMES[theme][language]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;