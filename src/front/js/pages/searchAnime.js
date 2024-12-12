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
				`https://api.jikan.moe/v4/anime/${id}/streaming/full`
			);
			const data = await response.json();
			setStreaming(data.data);
		}
		searchAnime();
	}, []);

	// function findStreaming() {
	//     const response = await fetch("https://api.jikan.moe/v4/anime/{id}/streaming")
	//     const data = await response.json()
	//     setAnimes(data) //might need to update this if your data is nested
	// }

	return (
		<div className="text-center mt-5 bg-dark">
			{anime?.map((anime, index) => (
				<Link
					to={`/animes/${anime.mal_id}`}
					key={index}
					className="text-light"
				>
					{anime.title}
				</Link>
			))}
			{/* button to trigger finding the streaming service */}		
			<Link to="/selectGenre">
				<button type="button" className="btn btn-primary">Search By Genre</button>
			</Link>
		</div>
	);
};
