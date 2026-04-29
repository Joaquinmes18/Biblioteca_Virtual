import React, { useEffect, useState } from 'react';
import { storage } from '../utils/storage';
import { openLibraryService } from '../services/openLibraryService';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(storage.getFavorites());
  }, []);

  const removeFav = (key) => {
    storage.removeFavorite(key);
    setFavorites(storage.getFavorites());
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Libros Favoritos</h1>

      {favorites.length === 0 && <p>No tienes favoritos</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 200px)', gap: '20px' }}>
        {favorites.map(book => {
          const workId = book.key.replace('/works/', '');

          return (
            <div key={book.key} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
              <img
                src={openLibraryService.getCoverUrl(book.cover_i)}
                alt={book.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />

              <h3>{book.title}</h3>

              <Link to={`/libro/${workId}`}>
                Ver detalle
              </Link>

              <br /><br />

              <button onClick={() => removeFav(book.key)}>
                Eliminar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;