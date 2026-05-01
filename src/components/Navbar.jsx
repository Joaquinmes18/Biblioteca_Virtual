import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="site-nav">
      <h2 className="site-nav__brand">Biblioteca Inteligente</h2>
      <div className="site-nav__links">
        <Link className="site-nav__link" href="/">Inicio</Link>
        <Link className="site-nav__link" href="/buscar">Buscador</Link>
        <Link className="site-nav__link" href="/favoritos">Favoritos</Link>
        <Link className="site-nav__link" href="/acerca">Acerca de</Link>
      </div>
    </nav>
  );
};

export default Navbar;