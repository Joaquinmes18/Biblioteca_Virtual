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

  if (!book) return <p style={{ padding: '2rem' }}>Cargando...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate(-1)}>⬅ Volver</button>

      <h1>{book.title}</h1>

      <img
        src={openLibraryService.getCoverUrl(book.covers?.[0], 'L')}
        alt={book.title}
        style={{ height: '300px', margin: '20px 0' }}
      />

      <p>
        <strong>Descripción:</strong>{' '}
        {book.description
          ? typeof book.description === 'string'
            ? book.description
            : book.description.value
          : 'No disponible'}
      </p>

      <p><strong>Fecha publicación:</strong> {book.first_publish_date || 'N/D'}</p>

      <p>
        <strong>Temas:</strong>{' '}
        {book.subjects ? book.subjects.slice(0, 5).join(', ') : 'N/D'}
      </p>

      <button onClick={toggleFavorite} style={{ marginTop: '15px' }}>
        {isFav ? ' Quitar de favoritos' : ' Agregar a favoritos'}
      </button>

      <br /><br />

      <a href={`https://openlibrary.org${book.key}`} target="_blank">
        Ver en OpenLibrary
      </a>
    </div>
  );
};

export default BookDetail;