import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const SearchAnime = () => {
	const { store, actions } = useContext(Context);
    const [anime, setStreaming] = useState({})
    const { id } = useParams();

	useEffect(() => {
        async function searchAnime() {
            const response = await fetch("https://api.jikan.moe/v4/anime/{id}/streaming" + id + "/full")
            const data = await response.json()
            setStreaming(data.data) 
        }
        searchAnime() 
    }, [])	
	return (
		<div className="text-center mt-5 bg-dark">
			
		</div>
	);
};