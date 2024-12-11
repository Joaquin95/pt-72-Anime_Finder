import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.token)
	
	
	return (
		<div className="text-center bg-dark">
			<h1>New Anime for 2024</h1>
		</div>
	);
};