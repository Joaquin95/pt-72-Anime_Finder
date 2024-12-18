import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const MangaPage = () => {
	const { store, actions } = useContext(Context);
    const [anime, setManga] = useState({})
    const { id } = useParams();

    useEffect(() => {
        async function getManga() {
            const response = await fetch("https://api.jikan.moe/v4/manga/" + id + "/full")
            const data = await response.json()
            setManga(data.data) 
        }
        getManga() 
    }, [])

    //function handleFindingStreamingService() {
        // const response = await fetch("")
        // const data = await response.json()
        // setAnimes(data) //might need to update this if you data is nested
    // }

	return (
		<div className="text-center mt-5 bg-dark">
            <div className="text-light">{anime.title}</div>
		</div>
	);
};