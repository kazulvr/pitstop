// Mock data for typing test app
export const WORD_THEMES = {
  fruits: {
    en: 'Fruits',
    es: 'Frutas'
  },
  colors: {
    en: 'Colors',
    es: 'Colores'
  },
  animals: {
    en: 'Animals',
    es: 'Animales'
  },
  objects: {
    en: 'Objects',
    es: 'Objetos'
  },
  random: {
    en: 'Random Mix',
    es: 'Mezcla Aleatoria'
  }
};

export const WORDS_DATABASE = {
  fruits: {
    en: [
      { word: 'apple', icon: '🍎', color: '#ff6b6b' },
      { word: 'banana', icon: '🍌', color: '#ffd93d' },
      { word: 'cherry', icon: '🍒', color: '#ff1744' },
      { word: 'grape', icon: '🍇', color: '#9c27b0' },
      { word: 'orange', icon: '🍊', color: '#ff9800' },
      { word: 'strawberry', icon: '🍓', color: '#e91e63' },
      { word: 'watermelon', icon: '🍉', color: '#4caf50' },
      { word: 'pineapple', icon: '🍍', color: '#ffc107' }
    ],
    es: [
      { word: 'manzana', icon: '🍎', color: '#ff6b6b' },
      { word: 'plátano', icon: '🍌', color: '#ffd93d' },
      { word: 'cereza', icon: '🍒', color: '#ff1744' },
      { word: 'uva', icon: '🍇', color: '#9c27b0' },
      { word: 'naranja', icon: '🍊', color: '#ff9800' },
      { word: 'fresa', icon: '🍓', color: '#e91e63' },
      { word: 'sandía', icon: '🍉', color: '#4caf50' },
      { word: 'piña', icon: '🍍', color: '#ffc107' }
    ]
  },
  colors: {
    en: [
      { word: 'red', icon: '🔴', color: '#f44336' },
      { word: 'blue', icon: '🔵', color: '#2196f3' },
      { word: 'green', icon: '🟢', color: '#4caf50' },
      { word: 'yellow', icon: '🟡', color: '#ffeb3b' },
      { word: 'purple', icon: '🟣', color: '#9c27b0' },
      { word: 'orange', icon: '🟠', color: '#ff9800' },
      { word: 'pink', icon: '🩷', color: '#e91e63' },
      { word: 'brown', icon: '🤎', color: '#795548' }
    ],
    es: [
      { word: 'rojo', icon: '🔴', color: '#f44336' },
      { word: 'azul', icon: '🔵', color: '#2196f3' },
      { word: 'verde', icon: '🟢', color: '#4caf50' },
      { word: 'amarillo', icon: '🟡', color: '#ffeb3b' },
      { word: 'morado', icon: '🟣', color: '#9c27b0' },
      { word: 'naranja', icon: '🟠', color: '#ff9800' },
      { word: 'rosa', icon: '🩷', color: '#e91e63' },
      { word: 'marrón', icon: '🤎', color: '#795548' }
    ]
  },
  animals: {
    en: [
      { word: 'cat', icon: '🐱', color: '#ff7043' },
      { word: 'dog', icon: '🐶', color: '#8d6e63' },
      { word: 'bird', icon: '🐦', color: '#29b6f6' },
      { word: 'fish', icon: '🐠', color: '#00bcd4' },
      { word: 'rabbit', icon: '🐰', color: '#ffcc02' },
      { word: 'elephant', icon: '🐘', color: '#90a4ae' },
      { word: 'lion', icon: '🦁', color: '#ffa726' },
      { word: 'panda', icon: '🐼', color: '#424242' }
    ],
    es: [
      { word: 'gato', icon: '🐱', color: '#ff7043' },
      { word: 'perro', icon: '🐶', color: '#8d6e63' },
      { word: 'pájaro', icon: '🐦', color: '#29b6f6' },
      { word: 'pez', icon: '🐠', color: '#00bcd4' },
      { word: 'conejo', icon: '🐰', color: '#ffcc02' },
      { word: 'elefante', icon: '🐘', color: '#90a4ae' },
      { word: 'león', icon: '🦁', color: '#ffa726' },
      { word: 'panda', icon: '🐼', color: '#424242' }
    ]
  },
  objects: {
    en: [
      { word: 'book', icon: '📚', color: '#3f51b5' },
      { word: 'car', icon: '🚗', color: '#2196f3' },
      { word: 'house', icon: '🏠', color: '#4caf50' },
      { word: 'phone', icon: '📱', color: '#607d8b' },
      { word: 'computer', icon: '💻', color: '#9e9e9e' },
      { word: 'clock', icon: '🕐', color: '#795548' },
      { word: 'chair', icon: '🪑', color: '#8d6e63' },
      { word: 'flower', icon: '🌸', color: '#e91e63' }
    ],
    es: [
      { word: 'libro', icon: '📚', color: '#3f51b5' },
      { word: 'coche', icon: '🚗', color: '#2196f3' },
      { word: 'casa', icon: '🏠', color: '#4caf50' },
      { word: 'teléfono', icon: '📱', color: '#607d8b' },
      { word: 'computadora', icon: '💻', color: '#9e9e9e' },
      { word: 'reloj', icon: '🕐', color: '#795548' },
      { word: 'silla', icon: '🪑', color: '#8d6e63' },
      { word: 'flor', icon: '🌸', color: '#e91e63' }
    ]
  }
};

// Function to get random word from selected theme
export const getRandomWord = (theme, language) => {
  if (theme === 'random') {
    const allThemes = Object.keys(WORDS_DATABASE);
    const randomTheme = allThemes[Math.floor(Math.random() * allThemes.length)];
    const words = WORDS_DATABASE[randomTheme][language];
    return words[Math.floor(Math.random() * words.length)];
  }
  
  const words = WORDS_DATABASE[theme][language];
  return words[Math.floor(Math.random() * words.length)];
};

// Languages
export const LANGUAGES = {
  en: 'English',
  es: 'Español'
};