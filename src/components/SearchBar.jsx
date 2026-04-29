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
    <form className="search-toolbar" onSubmit={handleSubmit}>
      <select 
        className="search-toolbar__select"
        value={type} 
        onChange={(e) => setType(e.target.value)}
      >
        <option value="q">General</option>
        <option value="title">Título</option>
        <option value="author">Autor</option>
        <option value="subject">Tema</option>
      </select>
      
      <input 
        className="search-toolbar__input"
        type="text" 
        placeholder="Buscar libros..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <button className="search-toolbar__button" type="submit">
        🔍 Buscar
      </button>
    </form>
  );
};

export default SearchBar;
