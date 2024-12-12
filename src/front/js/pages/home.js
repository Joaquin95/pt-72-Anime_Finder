import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.token)
	
	
	return (
		<div className="text-center bg-dark">
			
			<div className="anime1">
				<h1 className="Anime1">New Anime for 2024</h1>
			</div>
			<div classname="anime2">
				<h1>Classic Anime</h1>
			</div>
		</div>
	);
};