// src/services/openLibraryService.js
const BASE_URL = 'https://openlibrary.org';
const COVERS_URL = 'https://covers.openlibrary.org/b/id';

export const openLibraryService = {
  // Búsqueda general o por criterios [cite: 612, 613]
  searchBooks: async (query, type = 'q') => {
    try {
      const response = await fetch(`${BASE_URL}/search.json?${type}=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Error al buscar libros');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Obtener detalle de una obra específica [cite: 620, 621]
  getBookDetails: async (workId) => {
    try {
      const response = await fetch(`${BASE_URL}/works/${workId}.json`);
      if (!response.ok) throw new Error('Error al obtener detalles del libro');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Generador de URL para las portadas [cite: 618, 619]
  getCoverUrl: (coverId, size = 'M') => {
    return coverId ? `${COVERS_URL}/${coverId}-${size}.jpg` : '/placeholder-book.png';
  }
};