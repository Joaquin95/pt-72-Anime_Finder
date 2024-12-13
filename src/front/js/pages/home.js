import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { SearchAnime} from "./searchAnime";
import AnimeCard from "./component/animeCards.jsx";
import MangaCard from "./compoent/mangaCards.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.token)
	
	
	return (
		<div className="text-center mt-5 bg-dark">
			
		</div>
	);
};
