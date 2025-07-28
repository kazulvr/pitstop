import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useTypingAPI } from '../hooks/useTypingAPI';

const ThemeSelector = ({ currentTheme, onThemeChange, language }) => {
  const [themes, setThemes] = useState({});
  const { getThemes } = useTypingAPI();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const themesData = await getThemes();
        setThemes(themesData);
      } catch (error) {
        console.error('Error loading themes:', error);
        // Fallback themes
        setThemes({
          fruits: { en: 'Fruits', es: 'Frutas' },
          colors: { en: 'Colors', es: 'Colores' },
          animals: { en: 'Animals', es: 'Animales' },
          objects: { en: 'Objects', es: 'Objetos' },
          random: { en: 'Random Mix', es: 'Mezcla Aleatoria' }
        });
      }
    };

    fetchThemes();
  }, [getThemes]);

  const themeKeys = Object.keys(themes);

  return (
    <div className="retro-panel p-6 mb-6">
      <h3 className="text-lg font-bold mb-4 text-center retro-title">
        {language === 'es' ? '🎯 Elige tu tema' : '🎯 Choose your theme'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {themeKeys.map((theme) => (
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
            {themes[theme] && themes[theme][language] ? themes[theme][language] : theme}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;