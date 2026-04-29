import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { openLibraryService } from '../services/openLibraryService';
import { storage } from '../utils/storage';

const BookCard = ({ book }) => {
  // Extraemos el ID limpio del libro (la API devuelve '/works/OL123W')
  const workId = book.key.replace('/works/', '');
  
  // Estado para el botón de favoritos
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(storage.isFavorite(book.key));
  }, [book.key]);

  const toggleFavorite = () => {
    if (isFav) {
      storage.removeFavorite(book.key);
    } else {
      storage.addFavorite(book);
    }
    setIsFav(!isFav);
  };

  return (
    <div className="book-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', background: 'white' }}>
      <img 
        src={openLibraryService.getCoverUrl(book.cover_i)} 
        alt={`Portada de ${book.title}`} 
        style={{ height: '250px', objectFit: 'contain', marginBottom: '15px' }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#2c3e50' }}>{book.title}</h3>
        <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>Autor:</strong> {book.author_name ? book.author_name.join(', ') : 'Desconocido'}</p>
        <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>Año:</strong> {book.first_publish_year || 'N/D'}</p>
        <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>Ediciones:</strong> {book.edition_count || 1}</p>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <Link 
          to={`/libro/${workId}`} 
          style={{ flex: 1, textAlign: 'center', background: '#3498db', color: 'white', padding: '10px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Ver detalle
        </Link>
        <button 
          onClick={toggleFavorite}
          style={{ background: isFav ? '#e74c3c' : '#ecf0f1', color: isFav ? 'white' : '#333', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {isFav ? '❤️ Quitar' : '🤍 Favorito'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;