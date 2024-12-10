import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const SelectAnime = () => {
	const { store, actions } = useContext(Context);
    const [animes, setAnimes] = useState([])
    const { id } = useParams();

    useEffect(() => {
        async function getAnimes() {
            const response = await fetch("https://api.jikan.moe/v4/anime?genres" + id)
            const data = await response.json()
            setAnimes(data.data) 
        }
        getAnimes()
        console.log 
    }, [])

    //function handleFindingStreamingService() {
        // const response = await fetch("")
        // const data = await response.json()
        // setAnimes(data) //might need to update this if you data is nested
    // }

	return (
		<div className="text-center mt-5 bg-dark">
            {animes?.map((anime, index) => (
                <Link to={"/animes/" + anime.mal_id} key={index} className="text-light">{anime.title}</Link>
                //button to trigger finding the streaming service
            ))}
		</div>
	);
};