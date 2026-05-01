import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { openLibraryService } from '../services/openLibraryService';
import { storage } from '../utils/storage';

const BookDetail = ({ book: initialBook }) => {
  const router = useRouter();
  const [book, setBook] = useState(initialBook);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (book) {
      setIsFav(storage.isFavorite(book.key));
    }
  }, [book]);

  const toggleFavorite = () => {
    if (isFav) {
      storage.removeFavorite(book.key);
    } else {
      storage.addFavorite(book);
    }
    setIsFav(!isFav);
  };

  if (!book) {
    return <div className="state-message state-message--loading">Cargando información del libro...</div>;
  }

  const description = book.description
    ? typeof book.description === 'string'
      ? book.description
      : book.description.value
    : 'No disponible';

  const subjects = book.subjects ? book.subjects.slice(0, 6).join(', ') : 'No disponible';

  return (
    <div className="app-page detail-page">

      {/* BOTÓN VOLVER */}
      <button
        className="ui-button ui-button--ghost"
        onClick={() => router.back()}
        style={{ marginBottom: '20px' }}
      >
        ← Volver
      </button>

      {/* TARJETA PRINCIPAL */}
      <article
        className="detail-card"
        style={{
          display: 'flex',
          gap: '30px',
          padding: '30px',
          borderRadius: '16px',
          background: '#ffffff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          flexWrap: 'wrap'
        }}
      >

        {/* IMAGEN */}
        <div style={{ flex: '0 0 250px', textAlign: 'center' }}>
          <img
            src={openLibraryService.getCoverUrl(book.covers?.[0], 'L')}
            alt={book.title}
            style={{
              width: '100%',
              maxWidth: '250px',
              borderRadius: '10px',
              boxShadow: '0 6px 15px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* CONTENIDO */}
        <div style={{ flex: '1', minWidth: '250px' }}>

          {/* TÍTULO */}
          <h1 style={{ marginBottom: '10px', color: '#2c3e50' }}>
            {book.title}
          </h1>

          {/* DESCRIPCIÓN */}
          <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.6' }}>
            {description}
          </p>

          {/* INFO */}
          <div style={{ marginBottom: '20px' }}>
            <p><strong>Fecha de publicación:</strong> {book.first_publish_date || 'N/D'}</p>
            <p><strong>Temas:</strong> {subjects}</p>
          </div>

          {/* BOTONES */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>

            <button
              onClick={toggleFavorite}
              style={{
                background: isFav ? '#e74c3c' : '#3498db',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>

            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#2ecc71',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Ver en OpenLibrary
            </a>

          </div>

        </div>
      </article>
    </div>
  );
};

export default BookDetail;