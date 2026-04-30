import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="site-nav">
      <h2 className="site-nav__brand">Biblioteca Inteligente</h2>
      <div className="site-nav__links">
        <Link className="site-nav__link" to="/">Inicio</Link>
        <Link className="site-nav__link" to="/buscar">Buscador</Link>
        <Link className="site-nav__link" to="/favoritos">Favoritos</Link>
        <Link className="site-nav__link" to="/acerca">Acerca de</Link>
      </div>
    </nav>
  );
};

export default Navbar;