import React from 'react';

const About = () => {
  return (
    <div className="app-page">
      <section className="page-hero">
        <h1 className="page-title">Acerca de</h1>
        <p className="page-subtitle">Una biblioteca virtual construida sobre OpenLibrary con un diseño consistente para explorar, guardar y revisar libros.</p>
      </section>

      <div className="panel">
        <p className="detail-subtext">Información sobre la biblioteca inteligente, el buscador y la gestión de favoritos.</p>
      </div>
    </div>
  );
};

export default About;