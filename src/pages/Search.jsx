import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import BookCard from '../components/BookCard';
import { openLibraryService } from '../services/openLibraryService';

const Search = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Estado para los filtros locales
  const [filters, setFilters] = useState({
    minYear: '',
    maxYear: '',
    sortBy: 'relevance'
  });

  const handleSearch = async (query, type) => {
    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      const data = await openLibraryService.searchBooks(query, type);
      setBooks(data.docs || []);
    } catch (err) {
      setError('Error al buscar los libros. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Lógica de Filtrado y Ordenamiento (Client-Side)
  const getProcessedBooks = () => {
    let processed = [...books];

    // 1. Filtrar por Año Mínimo
    if (filters.minYear) {
      processed = processed.filter(book => book.first_publish_year >= parseInt(filters.minYear));
    }
    
    // 2. Filtrar por Año Máximo
    if (filters.maxYear) {
      processed = processed.filter(book => book.first_publish_year <= parseInt(filters.maxYear));
    }

    // 3. Ordenamiento
    if (filters.sortBy === 'yearAsc') {
      processed.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    } else if (filters.sortBy === 'yearDesc') {
      processed.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    } else if (filters.sortBy === 'editions') {
      processed.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0));
    }

    return processed;
  };

  const processedBooks = getProcessedBooks();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Buscador Avanzado</h1>
      
      <SearchBar onSearch={handleSearch} />
      <FilterPanel filters={filters} setFilters={setFilters} />

      {loading && <div style={{ textAlign: 'center', margin: '50px 0' }}>Buscando en la biblioteca... ⏳</div>}
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

      {!loading && !error && hasSearched && processedBooks.length === 0 && (
        <div style={{ textAlign: 'center', color: '#7f8c8d' }}>No se encontraron libros con estos criterios.</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
        {processedBooks.map((book, index) => (
          <BookCard key={`${book.key}-${index}`} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Search;