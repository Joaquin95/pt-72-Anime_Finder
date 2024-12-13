import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const SelectGenre= () => {
	const { store, actions } = useContext(Context);
    const [genres, setGenres] = useState([])

    useEffect(() => {
        async function getGenres() {
            const response = await fetch("https://api.jikan.moe/v4/genres/manga")
            const data = await response.json()
            setGenres(data.data) 
        }
        getGenres() 
    }, [])

	return (
		<div className="text-center mt-5 bg-dark">
            {genres?.map((genre, index) => (
                <Link to={`/manga/genres/${genre.mal_id}`} key={index} className="text-light">{genre.name}</Link>
                //button to trigger finding the streaming service
            ))}
		</div>
	);
};