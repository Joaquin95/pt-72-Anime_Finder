import React from "react";
import { Link } from "react-router-dom";
// import Anime_logo_converted from './img/Anime_logo_converted.png';

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-container">
				<div className="logo-container">
				<img
						// src={Anime_logo_converted}
						xxxalt=""
					/>
			</div>

			<div className="navbar-center">
				<h1 className="navbar-title">Anime Calendar</h1>
			</div>
		</div>
	</nav>
	);
};
