import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('q'); // 'q' es búsqueda general por defecto

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query, type);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <select 
        value={type} 
        onChange={(e) => setType(e.target.value)}
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      >
        <option value="q">General</option>
        <option value="title">Título</option>
        <option value="author">Autor</option>
        <option value="subject">Tema</option>
      </select>
      
      <input 
        type="text" 
        placeholder="Buscar libros..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      
      <button type="submit" style={{ padding: '10px 20px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        🔍 Buscar
      </button>
    </form>
  );
};

export default SearchBar;
