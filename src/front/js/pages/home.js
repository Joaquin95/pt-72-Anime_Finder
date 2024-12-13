import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { SearchAnime} from "./searchAnime";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.token)
	return (
		<div className="text-center mt-5 bg-dark">
			 <h1>Here is the Home page</h1>
			 <SearchAnime />
		</div>
	);
};
