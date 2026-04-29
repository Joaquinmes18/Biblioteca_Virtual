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
    <article className="book-card">
      <img 
        className="book-card__cover"
        src={openLibraryService.getCoverUrl(book.cover_i)} 
        alt={`Portada de ${book.title}`} 
      />
      <div className="book-card__body">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__meta"><strong>Autor:</strong> {book.author_name ? book.author_name.join(', ') : 'Desconocido'}</p>
        <p className="book-card__meta"><strong>Año:</strong> {book.first_publish_year || 'N/D'}</p>
        <p className="book-card__meta"><strong>Ediciones:</strong> {book.edition_count || 1}</p>
      </div>
      
      <div className="book-card__actions">
        <Link 
          className="ui-link-button ui-link-button--primary"
          to={`/libro/${workId}`} 
        >
          Ver detalle
        </Link>
        <button 
          className={`ui-button ${isFav ? 'ui-button--danger' : 'ui-button--secondary'}`}
          onClick={toggleFavorite}
        >
          {isFav ? '❤️ Quitar' : '🤍 Favorito'}
        </button>
      </div>
    </article>
  );
};

export default BookCard;