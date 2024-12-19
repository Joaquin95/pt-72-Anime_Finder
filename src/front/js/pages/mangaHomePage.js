import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { MangaCard } from "../component/mangaCards";

export const MangaHomePage = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getManga(); // Fetch top 10 manga when the component mounts
  }, []);

  return (
    <div className="main-div w-100 bg-dark text-light">
      <div className="container">
        {/* Title */}
        <h1 className="text-center mb-4">Popular Manga</h1>

        {/* 3-Column Grid */}
        <div className="row justify-content-center">
          {store.manga.map((item, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center"
              key={index}
            >
              <MangaCard item={item} index={index} category="manga" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};