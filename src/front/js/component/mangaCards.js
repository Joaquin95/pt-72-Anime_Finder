import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const MangaCard = ({ item, index }) => {
  const { store, actions } = useContext(Context);

  // Use the correct key (anime_id) from the backend response
  const isFavorite = store.favorites.some(
    (fav) => fav.manga_id === item.mal_id
  );

  const handleFavorites = () => {
    if (isFavorite) {
      actions.deleteFavorites(item.mal_id); // Remove favorite
    } else {
      actions.addFavorites(item.mal_id); // Add favorite
    }
  };

  return (
    <div className="card bg-light shadow-sm" style={{ objectFit: "contain" }}>
      <img
        src={item.images.jpg.image_url}
        className="card-img-top"
        style={{ height: "240px", objectFit: "contain" }}
        alt={item.title || "Anime Image"}
      />
      <div className="card-body d-flex flex-column" style={{ color: "black" }}>
        <h5 className="card-title fw-bold">{item.title}</h5>
        <p className="card-text">Type: {item.type}</p>
        <p className="card-text">Volumes: {item.volumes || "N/A"}</p>
        <div className="d-flex justify-content-between mt-auto">
          <button className="btn btn-warning me-3">Series Info</button>
          {store.token ? (
            <button
              className="btn btn-outline-dark"
              onClick={handleFavorites}
              type="button"
            >
              {isFavorite ? "❤️" : "♡"}
            </button>
          ) : (
            <span className="text-muted">Log in to favorite</span>
          )}
        </div>
      </div>
    </div>
  );
};