import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#2c3e50', color: 'white', display: 'flex', gap: '1rem' }}>
      <h2 style={{ margin: 0, marginRight: 'auto' }}>📚 Biblioteca Inteligente</h2>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
      <Link to="/buscar" style={{ color: 'white', textDecoration: 'none' }}>Buscador</Link>
      <Link to="/favoritos" style={{ color: 'white', textDecoration: 'none' }}>Favoritos</Link>
      <Link to="/acerca" style={{ color: 'white', textDecoration: 'none' }}>Acerca de</Link>
    </nav>
  );
};

export default Navbar;