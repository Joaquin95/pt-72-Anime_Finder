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

    //function handleFindingStreamingService() {
        // const response = await fetch("")
        // const data = await response.json()
        // setAnimes(data) //might need to update this if you data is nested
    // }

	return (
		<div className="text-center mt-5 bg-dark">
            {genres?.map((genre, index) => (
                <Link to={`/animes/genres/${genre.mal_id}`} key={index} className="text-light">{genre.name}</Link>
                //button to trigger finding the streaming service
            ))}
		</div>
	);
};