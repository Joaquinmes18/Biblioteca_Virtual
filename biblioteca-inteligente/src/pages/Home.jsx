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
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}>Cargando libros recomendados... ⏳</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>Descubre nuevas lecturas</h1>
      <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Recomendaciones destacadas sobre Ingeniería de Software</p>
      
      {/* Grid responsivo para las tarjetas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px' 
      }}>
        {books.map((book, index) => (
          <BookCard key={`${book.key}-${index}`} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;