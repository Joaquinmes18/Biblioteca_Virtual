import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import { openLibraryService } from '../services/openLibraryService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('q');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const data = await openLibraryService.searchBooks(query, type);
      setBooks(data.docs || []);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const getProcessedBooks = () => {
    let result = [...books];

    if (minYear) {
      result = result.filter(b => b.first_publish_year >= parseInt(minYear));
    }

    if (maxYear) {
      result = result.filter(b => b.first_publish_year <= parseInt(maxYear));
    }

    if (author) {
      result = result.filter(b =>
        b.author_name &&
        b.author_name.join(' ').toLowerCase().includes(author.toLowerCase())
      );
    }

    if (language) {
      result = result.filter(b =>
        b.language &&
        b.language.includes(language.toLowerCase())
      );
    }

    if (sortBy === 'yearAsc') {
      result.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    } else if (sortBy === 'yearDesc') {
      result.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    }

    return result;
  };

  const filteredBooks = getProcessedBooks();

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* TÍTULO */}
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
        Buscador de Libros
      </h1>

      {/* BUSCADOR */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '25px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Buscar libros..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '12px 18px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            width: '300px',
            outline: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '20px',
            border: 'none',
            background: '#3498db',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="q">General</option>
          <option value="title">Título</option>
          <option value="author">Autor</option>
        </select>

        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            background: '#3498db',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Buscar
        </button>
      </div>

      {/* FILTROS */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '30px'
      }}>
        <input
          type="number"
          placeholder="Año min"
          value={minYear}
          onChange={(e) => setMinYear(e.target.value)}
          style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}
        />

        <input
          type="number"
          placeholder="Año max"
          value={maxYear}
          onChange={(e) => setMaxYear(e.target.value)}
          style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}
        />

        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}
        />

        <input
          type="text"
          placeholder="Idioma (eng, spa)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            background: '#2ecc71',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="relevance">Relevancia</option>
          <option value="yearAsc">Año ↑</option>
          <option value="yearDesc">Año ↓</option>
        </select>
      </div>

      {/* LOADING */}
      {loading && (
        <p style={{ textAlign: 'center', color: '#555' }}>
          Buscando libros...
        </p>
      )}

      {/* SIN RESULTADOS */}
      {!loading && filteredBooks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888' }}>
          No se encontraron resultados
        </p>
      )}

      {/* RESULTADOS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '25px'
      }}>
        {filteredBooks.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Search;