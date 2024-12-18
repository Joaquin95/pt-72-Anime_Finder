import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const SearchManga = () => {
	const { store, actions } = useContext(Context);
	const [anime, setStreaming] = useState({});
	const { id } = useParams();

	useEffect(() => {
		async function searchManga() {
			const response = await fetch(
				`https://api.jikan.moe/v4/manga/${id}/streaming/full`
			);
			const data = await response.json();
			setStreaming(data.data);
		}
		searchManga();
	}, []);

	// function findStreaming() {
	//     const response = await fetch("https://api.jikan.moe/v4/anime/{id}/streaming")
	//     const data = await response.json()
	//     setAnimes(data) //might need to update this if your data is nested
	// }

	return (
		<div className="text-center mt-5 bg-dark">
			{
			anime?.map((anime, index) => (
				<Link
					to={`/manga/${manga.mal_id}`}
					key={index}
					className="text-light"
				>
					{anime.title}
				</Link>
			))}
			{/* button to trigger finding the streaming service */}		
			<Link to="/selectMangaGenre">
				<button type="button" className="btn btn-primary">Search By Genre</button>
			</Link>
		</div>
	);
};