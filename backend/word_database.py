# Word database for typing test app
import random

WORD_THEMES = {
    "fruits": {
        "en": "Fruits",
        "es": "Frutas"
    },
    "colors": {
        "en": "Colors",
        "es": "Colores"
    },
    "animals": {
        "en": "Animals",
        "es": "Animales"
    },
    "objects": {
        "en": "Objects",
        "es": "Objetos"
    },
    "random": {
        "en": "Random Mix",
        "es": "Mezcla Aleatoria"
    }
}

WORDS_DATABASE = {
    "fruits": {
        "en": [
            {"word": "apple", "icon": "🍎", "color": "#ff6b6b"},
            {"word": "banana", "icon": "🍌", "color": "#ffd93d"},
            {"word": "cherry", "icon": "🍒", "color": "#ff1744"},
            {"word": "grape", "icon": "🍇", "color": "#9c27b0"},
            {"word": "orange", "icon": "🍊", "color": "#ff9800"},
            {"word": "strawberry", "icon": "🍓", "color": "#e91e63"},
            {"word": "watermelon", "icon": "🍉", "color": "#4caf50"},
            {"word": "pineapple", "icon": "🍍", "color": "#ffc107"},
            {"word": "peach", "icon": "🍑", "color": "#ffab91"},
            {"word": "lemon", "icon": "🍋", "color": "#fff176"},
            {"word": "coconut", "icon": "🥥", "color": "#8d6e63"},
            {"word": "mango", "icon": "🥭", "color": "#ffa726"}
        ],
        "es": [
            {"word": "manzana", "icon": "🍎", "color": "#ff6b6b"},
            {"word": "plátano", "icon": "🍌", "color": "#ffd93d"},
            {"word": "cereza", "icon": "🍒", "color": "#ff1744"},
            {"word": "uva", "icon": "🍇", "color": "#9c27b0"},
            {"word": "naranja", "icon": "🍊", "color": "#ff9800"},
            {"word": "fresa", "icon": "🍓", "color": "#e91e63"},
            {"word": "sandía", "icon": "🍉", "color": "#4caf50"},
            {"word": "piña", "icon": "🍍", "color": "#ffc107"},
            {"word": "durazno", "icon": "🍑", "color": "#ffab91"},
            {"word": "limón", "icon": "🍋", "color": "#fff176"},
            {"word": "coco", "icon": "🥥", "color": "#8d6e63"},
            {"word": "mango", "icon": "🥭", "color": "#ffa726"}
        ]
    },
    "colors": {
        "en": [
            {"word": "red", "icon": "🔴", "color": "#f44336"},
            {"word": "blue", "icon": "🔵", "color": "#2196f3"},
            {"word": "green", "icon": "🟢", "color": "#4caf50"},
            {"word": "yellow", "icon": "🟡", "color": "#ffeb3b"},
            {"word": "purple", "icon": "🟣", "color": "#9c27b0"},
            {"word": "orange", "icon": "🟠", "color": "#ff9800"},
            {"word": "pink", "icon": "🩷", "color": "#e91e63"},
            {"word": "brown", "icon": "🤎", "color": "#795548"},
            {"word": "black", "icon": "⚫", "color": "#424242"},
            {"word": "white", "icon": "⚪", "color": "#fafafa"},
            {"word": "gray", "icon": "🩶", "color": "#9e9e9e"},
            {"word": "turquoise", "icon": "🔷", "color": "#00bcd4"}
        ],
        "es": [
            {"word": "rojo", "icon": "🔴", "color": "#f44336"},
            {"word": "azul", "icon": "🔵", "color": "#2196f3"},
            {"word": "verde", "icon": "🟢", "color": "#4caf50"},
            {"word": "amarillo", "icon": "🟡", "color": "#ffeb3b"},
            {"word": "morado", "icon": "🟣", "color": "#9c27b0"},
            {"word": "naranja", "icon": "🟠", "color": "#ff9800"},
            {"word": "rosa", "icon": "🩷", "color": "#e91e63"},
            {"word": "marrón", "icon": "🤎", "color": "#795548"},
            {"word": "negro", "icon": "⚫", "color": "#424242"},
            {"word": "blanco", "icon": "⚪", "color": "#fafafa"},
            {"word": "gris", "icon": "🩶", "color": "#9e9e9e"},
            {"word": "turquesa", "icon": "🔷", "color": "#00bcd4"}
        ]
    },
    "animals": {
        "en": [
            {"word": "cat", "icon": "🐱", "color": "#ff7043"},
            {"word": "dog", "icon": "🐶", "color": "#8d6e63"},
            {"word": "bird", "icon": "🐦", "color": "#29b6f6"},
            {"word": "fish", "icon": "🐠", "color": "#00bcd4"},
            {"word": "rabbit", "icon": "🐰", "color": "#ffcc02"},
            {"word": "elephant", "icon": "🐘", "color": "#90a4ae"},
            {"word": "lion", "icon": "🦁", "color": "#ffa726"},
            {"word": "panda", "icon": "🐼", "color": "#424242"},
            {"word": "tiger", "icon": "🐅", "color": "#ff5722"},
            {"word": "bear", "icon": "🐻", "color": "#5d4037"},
            {"word": "fox", "icon": "🦊", "color": "#ff6f00"},
            {"word": "wolf", "icon": "🐺", "color": "#616161"}
        ],
        "es": [
            {"word": "gato", "icon": "🐱", "color": "#ff7043"},
            {"word": "perro", "icon": "🐶", "color": "#8d6e63"},
            {"word": "pájaro", "icon": "🐦", "color": "#29b6f6"},
            {"word": "pez", "icon": "🐠", "color": "#00bcd4"},
            {"word": "conejo", "icon": "🐰", "color": "#ffcc02"},
            {"word": "elefante", "icon": "🐘", "color": "#90a4ae"},
            {"word": "león", "icon": "🦁", "color": "#ffa726"},
            {"word": "panda", "icon": "🐼", "color": "#424242"},
            {"word": "tigre", "icon": "🐅", "color": "#ff5722"},
            {"word": "oso", "icon": "🐻", "color": "#5d4037"},
            {"word": "zorro", "icon": "🦊", "color": "#ff6f00"},
            {"word": "lobo", "icon": "🐺", "color": "#616161"}
        ]
    },
    "objects": {
        "en": [
            {"word": "book", "icon": "📚", "color": "#3f51b5"},
            {"word": "car", "icon": "🚗", "color": "#2196f3"},
            {"word": "house", "icon": "🏠", "color": "#4caf50"},
            {"word": "phone", "icon": "📱", "color": "#607d8b"},
            {"word": "computer", "icon": "💻", "color": "#9e9e9e"},
            {"word": "clock", "icon": "🕐", "color": "#795548"},
            {"word": "chair", "icon": "🪑", "color": "#8d6e63"},
            {"word": "flower", "icon": "🌸", "color": "#e91e63"},
            {"word": "key", "icon": "🔑", "color": "#ffc107"},
            {"word": "camera", "icon": "📷", "color": "#424242"},
            {"word": "umbrella", "icon": "☂️", "color": "#9c27b0"},
            {"word": "guitar", "icon": "🎸", "color": "#ff5722"}
        ],
        "es": [
            {"word": "libro", "icon": "📚", "color": "#3f51b5"},
            {"word": "coche", "icon": "🚗", "color": "#2196f3"},
            {"word": "casa", "icon": "🏠", "color": "#4caf50"},
            {"word": "teléfono", "icon": "📱", "color": "#607d8b"},
            {"word": "computadora", "icon": "💻", "color": "#9e9e9e"},
            {"word": "reloj", "icon": "🕐", "color": "#795548"},
            {"word": "silla", "icon": "🪑", "color": "#8d6e63"},
            {"word": "flor", "icon": "🌸", "color": "#e91e63"},
            {"word": "llave", "icon": "🔑", "color": "#ffc107"},
            {"word": "cámara", "icon": "📷", "color": "#424242"},
            {"word": "paraguas", "icon": "☂️", "color": "#9c27b0"},
            {"word": "guitarra", "icon": "🎸", "color": "#ff5722"}
        ]
    }
}

def get_random_word(theme: str, language: str):
    """Get a random word from the specified theme and language"""
    if theme == "random":
        # Get random theme
        available_themes = [t for t in WORDS_DATABASE.keys() if t != "random"]
        theme = random.choice(available_themes)
    
    if theme not in WORDS_DATABASE:
        theme = "fruits"  # fallback
    
    if language not in WORDS_DATABASE[theme]:
        language = "en"  # fallback
    
    words = WORDS_DATABASE[theme][language]
    selected_word = random.choice(words)
    
    # Add theme and language to the word data
    word_data = selected_word.copy()
    word_data["theme"] = theme
    word_data["language"] = language
    
    return word_data

def calculate_wpm(word: str, time_ms: int) -> float:
    """Calculate Words Per Minute based on word length and time"""
    if time_ms <= 0:
        return 0.0
    
    # Standard WPM calculation: (characters / 5) / (time in minutes)
    # We use character count / 5 as the "word" metric
    characters = len(word)
    words = characters / 5
    minutes = time_ms / (1000 * 60)  # Convert ms to minutes
    
    if minutes <= 0:
        return 0.0
    
    wpm = words / minutes
    return round(wpm, 2)

def get_available_themes():
    """Get all available themes with their translations"""
    return WORD_THEMES