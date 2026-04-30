import React, { useState, useEffect } from 'react';
import { openLibraryService } from '../services/openLibraryService';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función asíncrona para cargar libros por defecto
    const fetchDefaultBooks = async () => {
      try {
        setLoading(true);
        // Buscamos libros sobre Ingeniería de Software
        const data = await openLibraryService.searchBooks('software engineering');
        // Nos quedamos solo con los primeros 12 para no saturar la vista inicial
        setBooks(data.docs.slice(0, 12));
      } catch (err) {
        setError('Ocurrió un error al cargar los libros recomendados. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultBooks();
  }, []);

  if (loading) {
    return <div className="state-message state-message--loading">Cargando libros recomendados... ⏳</div>;
  }

  if (error) {
    return <div className="state-message state-message--error">{error}</div>;
  }

  return (
    <div className="app-page">
      <section className="page-hero">
        <h1 className="page-title">Descubre nuevas lecturas</h1>
        <p className="page-subtitle">Recomendaciones destacadas sobre Ingeniería de Software</p>
      </section>

      <div className="book-grid">
        {books.map((book, index) => (
          <BookCard key={`${book.key}-${index}`} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;