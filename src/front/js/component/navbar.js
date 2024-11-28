import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-container">
				<div className="logo-container">
				<img
						src="/path-to-your-logo.png"
						alt="Anime Logo Here"
						className="navbar-logo"
					/>
			</div>

			<div className="navbar-center">
				<h1 className="navbar-title">Anime Calendar</h1>
			</div>
		</div>
	</nav>
	);
};
