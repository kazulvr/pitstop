import React from 'react';
import { Button } from './ui/button';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={currentLanguage === 'es' ? 'default' : 'outline'}
        onClick={() => onLanguageChange('es')}
        className="retro-button text-sm font-bold"
        style={{
          background: currentLanguage === 'es' 
            ? 'linear-gradient(135deg, #ff6b9d, #c44569)' 
            : 'transparent',
          border: '2px solid #ff6b9d',
          color: currentLanguage === 'es' ? 'white' : '#ff6b9d'
        }}
      >
        🇪🇸 Español
      </Button>
      <Button
        variant={currentLanguage === 'en' ? 'default' : 'outline'}
        onClick={() => onLanguageChange('en')}
        className="retro-button text-sm font-bold"
        style={{
          background: currentLanguage === 'en' 
            ? 'linear-gradient(135deg, #4ecdc4, #44a08d)' 
            : 'transparent',
          border: '2px solid #4ecdc4',
          color: currentLanguage === 'en' ? 'white' : '#4ecdc4'
        }}
      >
        🇺🇸 English
      </Button>
    </div>
  );
};

export default LanguageSelector;