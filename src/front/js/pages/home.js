import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import Card from "../component/animeCards.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.token)
	
	
	return (
		<div className="main-div w-100 bg-dark">
			<div className="d-flex flex-column w-100 mt-0 align-item-center">
				{/* Anime card div */}
				<h1 className="m-3">Popular Anime</h1> 
				<div id="cardDiv" className="d-flex flex-nowrap overflow-scroll align-items-stretch">
					{store.anime.map((item, index) => {
						return (
							<Card item={item} index={index} key={index} category="anime" /> 
						)
					})}
				</div>
			</div>
			<div className="d-flex flex-column w-100 mt-0 align-item-center">
				{/* Anime card div */}
				<h1 className="m-2">Classic Anime</h1>
				<div id="cardDiv" className="d-flex flex-nowrap overflow-scroll align-items-stretch">
					{store.anime.map((item, index) => {
						return (
							<Card item={item} index={index} key={index} category="anime" /> 
						)
					})}
				</div>
			</div>
			<div className="d-flex flex-column w-100 mt-0 align-item-center">
				{/* Anime card div */}
				<h1 className="m-2">Popular Manga</h1>
				<div id="cardDiv" className="d-flex flex-nowrap overflow-scroll align-items-stretch">
					{store.anime.map((item, index) => {
						return (
							<Card item={item} index={index} key={index} category="anime" /> 
						)
					})}
				</div>
			</div>
		</div>
	);
};