import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/favorites.css"

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  // Fetch favorites on component mount
  useEffect(() => {
    actions.getFavorites();
  }, []);

  return (
    <div className="text-center bg-dark text-light">
      <h1>Your Favorite Anime</h1>
      <div className="container mt-4">
        <div className="row">
          {store.favorites.length > 0 ? (
            store.favorites.map((fav, index) => (
              <div key={index} className="col-12 col-md-4 mb-4">
                <div className="card bg-light shadow-sm">
                  <img
                    src={fav.image}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "contain" }}
                    alt={fav.title || "Anime Image"}
                  />
                  <div className="card-body text-dark">
                    <h5 className="card-title">{fav.title}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No favorites added yet. Start adding some!</p>
          )}
        </div>
      </div>
    </div>
  );
};
