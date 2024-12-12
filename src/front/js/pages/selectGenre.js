import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const SelectGenre= () => {
	const { store, actions } = useContext(Context);
    const [genres, setGenres] = useState([])

    useEffect(() => {
        async function getGenres() {
            const response = await fetch("https://api.jikan.moe/v4/genres/anime")
            const data = await response.json()
            setGenres(data.data) 
        }
        getGenres() 
    }, [])

	return (
		<div className="text-center mt-5 bg-dark">
            {genres?.map((genre, index) => (
                <Link to={`/animes/genres/${genre.mal_id}`} key={index} className="text-light">{genre.name}</Link>
                //button to trigger finding the streaming service
            ))}
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group me-2" role="group" aria-label="First group">
                    <button type="button" className="btn btn-primary">1</button>
                    <button type="button" className="btn btn-primary">2</button>
                    <button type="button" className="btn btn-primary">3</button>
                    <button type="button" className="btn btn-primary">4</button>
                </div>
                <div className="btn-group me-2" role="group" aria-label="Second group">
                    <button type="button" className="btn btn-secondary">5</button>
                    <button type="button" className="btn btn-secondary">6</button>
                    <button type="button" className="btn btn-secondary">7</button>
                </div>
                <div className="btn-group" role="group" aria-label="Third group">
                    <button type="button" className="btn btn-info">8</button>
                </div>
            </div>
		</div>
	);
};