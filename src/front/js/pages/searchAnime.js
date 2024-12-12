import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const SearchAnime = () => {
	const { store, actions } = useContext(Context);
	const [anime, setStreaming] = useState({});
	const { id } = useParams();

	useEffect(() => {
		async function searchAnime() {
			const response = await fetch(
				`https://api.jikan.moe/v4/anime/1/streaming`
			);
			const data = await response.json();
			setStreaming(data.data);
			console.log(data, "here is the anime")
		}
		searchAnime();

	}, []);

	// function findStreaming() {
	//     const response = await fetch("https://api.jikan.moe/v4/anime/{id}/streaming")
	//     const data = await response.json()
	//     setAnimes(data) //might need to update this if your data is nested
	// }

	return (
		<div className="text-center mt-5 bg-light">
			{anime.length > 0 ? anime.map((animeData, index) => (
				<Link
					to={`/animes/${animeData.mal_id}`}
					key={index}
					className="text-dark"
				>
					{/* {animeData.titles.title} */}
					{animeData.name}
					{animeData.url}

				</Link>
			)): ""}
			{/* button to trigger finding the streaming service */}
		</div>
	);
};
