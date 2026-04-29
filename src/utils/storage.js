// src/utils/storage.js
const FAVORITES_KEY = 'smart_library_favorites';

export const storage = {
  getFavorites: () => {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  },

  addFavorite: (book) => {
    const favorites = storage.getFavorites();
    // Evitar duplicados usando la clave única del libro [cite: 551]
    if (!favorites.some(fav => fav.key === book.key)) {
      favorites.push(book);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  },

  removeFavorite: (bookKey) => {
    const favorites = storage.getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.key !== bookKey);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  isFavorite: (bookKey) => {
    const favorites = storage.getFavorites();
    return favorites.some(fav => fav.key === bookKey);
  }
};