import React, { useState } from 'react';
import { openLibraryService } from '../services/openLibraryService';
import BookCard from '../components/BookCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('q');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setBooks([]);

    try {
      const data = await openLibraryService.searchBooks(query, type);
      setBooks(data.docs || []);
    } catch (err) {
      setError('Error al buscar libros');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '20px' }}>Buscar Libros</h1>

      {/* BUSCADOR */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '25px',
          alignItems: 'center'
        }}
      >
        <input
          type="text"
          placeholder="Buscar libros..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '14px',
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
            backgroundColor: '#3498db',
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
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#3498db',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Buscar
        </button>
      </div>

      {/* ESTADOS */}
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && books.length === 0 && <p>No hay resultados</p>}

      {/* RESULTADOS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 250px)',
          gap: '20px'
        }}
      >
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Search;