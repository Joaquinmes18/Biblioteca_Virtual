import React from 'react';
import './Abaut.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">Biblioteca Inteligente</h1>

        <p className="about-text">
          Biblioteca Inteligente es una aplicación web desarrollada con React que permite
          a los usuarios buscar libros mediante la API pública de Open Library,
          visualizar información detallada y gestionar una lista personalizada de favoritos.
        </p>

        <div className="about-section">
          <h2>Objetivo</h2>
          <p>
            Proporcionar una herramienta simple e intuitiva para la exploración de libros,
            facilitando el acceso a información relevante y permitiendo guardar contenido
            de interés para el usuario.
          </p>
        </div>

        <div className="about-section">
          <h2>Funcionalidades</h2>
          <ul>
            <li>Búsqueda de libros por título, autor o palabra clave</li>
            <li>Visualización de detalles completos del libro</li>
            <li>Gestión de favoritos con almacenamiento local</li>
            <li>Página dedicada para libros guardados</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Tecnologías</h2>
          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>JavaScript</li>
            <li>CSS</li>
            <li>Open Library API</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Información adicional</h2>
          <p>
            Este proyecto fue desarrollado como parte de una práctica académica en el área de
            Ingeniería de Sistemas, aplicando conceptos de consumo de APIs, manejo de estado
            y desarrollo de interfaces modernas.
          </p>
        </div>

        <a
          href="https://openlibrary.org"
          target="_blank"
          rel="noopener noreferrer"
          className="about-link"
        >
          Abir libreria
        </a>
      </div>
    </div>
  );
};

export default About;