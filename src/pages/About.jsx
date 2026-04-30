import React from 'react';
import './Abaut.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">

        <div className="about-header">
          <h1>Biblioteca Inteligente</h1>
          <p>
            Plataforma web para explorar libros, consultar información detallada
            y gestionar una colección personal de favoritos.
          </p>
        </div>

        <div className="about-grid">

          <div className="about-box">
            <h2>Objetivo</h2>
            <p>
              Facilitar la búsqueda y consulta de libros mediante una interfaz
              clara, rápida y accesible.
            </p>
          </div>

          <div className="about-box">
            <h2>Funcionalidades</h2>
            <ul>
              <li>Búsqueda por título, autor o palabra clave</li>
              <li>Visualización de detalles del libro</li>
              <li>Gestión de favoritos</li>
              <li>Persistencia con localStorage</li>
            </ul>
          </div>

          <div className="about-box">
            <h2>Tecnologías</h2>
            <ul>
              <li>React</li>
              <li>React Router</li>
              <li>JavaScript</li>
              <li>CSS</li>
              <li>Open Library API</li>
            </ul>
          </div>

          <div className="about-box">
            <h2>Información</h2>
            <p>
              Proyecto académico enfocado en el consumo de APIs, manejo de estado
              y desarrollo de interfaces modernas.
            </p>
          </div>

        </div>

        <div className="about-footer">
          <a
            href="https://openlibrary.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir a Open Library
          </a>
        </div>

      </div>
    </div>
  );
};

export default About;