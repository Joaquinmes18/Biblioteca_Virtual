import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { openLibraryService } from '../services/openLibraryService';
import { storage } from '../utils/storage';

const BookDetail = () => {
  const { workId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await openLibraryService.getBookDetails(workId);
        setBook(data);
        setIsFav(storage.isFavorite(data.key));
      } catch (error) {
        console.error(error);
      }
    };

    loadBook();
  }, [workId]);

  const toggleFavorite = () => {
    if (isFav) {
      storage.removeFavorite(book.key);
    } else {
      storage.addFavorite(book);
    }
    setIsFav(!isFav);
  };

  if (!book) return <div className="state-message state-message--loading">Cargando...</div>;

  const description = book.description
    ? typeof book.description === 'string'
      ? book.description
      : book.description.value
    : 'No disponible';

  return (
    <div className="app-page detail-page">
      <button className="ui-button ui-button--ghost" onClick={() => navigate(-1)}>← Volver</button>

      <article className="detail-card">
        <img
          className="detail-card__cover"
          src={openLibraryService.getCoverUrl(book.covers?.[0], 'L')}
          alt={book.title}
        />

        <div className="detail-card__body">
          <div className="detail-card__section">
            <h1 className="detail-card__title">{book.title}</h1>
            <p className="detail-description">{description}</p>
          </div>

          <div className="detail-card__info">
            <p className="detail-meta"><span className="detail-card__label">Fecha publicación:</span> {book.first_publish_date || 'N/D'}</p>
            <p className="detail-meta"><span className="detail-card__label">Temas:</span> {book.subjects ? book.subjects.slice(0, 5).join(', ') : 'N/D'}</p>
          </div>

          <div className="detail-card__footer">
            <button className={`ui-button ${isFav ? 'ui-button--danger' : 'ui-button--secondary'}`} onClick={toggleFavorite}>
              {isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>

            <a className="ui-link-button ui-link-button--primary" href={`https://openlibrary.org${book.key}`} target="_blank" rel="noreferrer">
              Ver en OpenLibrary
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BookDetail;