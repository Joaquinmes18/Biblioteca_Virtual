import React, { useEffect, useState } from 'react';
import { storage } from '../utils/storage';
import { openLibraryService } from '../services/openLibraryService';
import Link from 'next/link';

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
<div className="app-page">
  <section className="page-hero">
    <h1 className="page-title">Libros Favoritos Seleccionados</h1>
    <p className="page-subtitle">
      Aquí puedes ver y gestionar los libros que has guardado como favoritos.
    </p>
  </section>

      {favorites.length === 0 && <div className="empty-state">No tienes favoritos</div>}

      <div className="favorites-grid">
        {favorites.map(book => {
          const workId = book.key.replace('/works/', '');

          return (
            <article key={book.key} className="favorite-card">
              <img
                className="favorite-card__cover"
                src={openLibraryService.getCoverUrl(book.cover_i)}
                alt={book.title}
              />

              <div className="favorite-card__body">
                <h3 className="favorite-card__title">{book.title}</h3>
              </div>

              <div className="favorite-card__actions">
                <Link className="ui-link-button ui-link-button--primary" href={`/libro/${workId}`}>
                  Ver detalle
                </Link>

                <button className="favorite-card__button ui-button ui-button--danger" onClick={() => removeFav(book.key)}>
                  Eliminar
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;