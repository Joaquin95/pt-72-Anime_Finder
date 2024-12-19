import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { AnimeCard } from "../component/animeCards";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAnime(); // Fetch top 10 anime when the component mounts
  }, []);

  return (
    <div className="main-div w-100 bg-dark text-light">
      <div className="container">
        {/* Title */}
        <h1 className="text-center py-4">Popular Anime</h1>

        {/* 3-Column Grid */}
        <div className="row justify-content-center">
          {store.anime.map((item, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center"
              key={index}
            >
              <AnimeCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
