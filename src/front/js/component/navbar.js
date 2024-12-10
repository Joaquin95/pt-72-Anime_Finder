import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
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
=======
import logo from "../../img/Anime logo2.jpg";

export const Navbar = () => {
	return (
		<nav className="navbar bg-primary bs-info-bg-subtle text-info">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand text-dark mb-0 h1">Anime Finder</span>
				</Link>
				<img className="img" src={logo} className="img-fluid" alt="Responsive image"/>
				<div className="ml-auto nav-item dropdown">
					<a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						List
					</a>
					<div className="dropdown-menu bg-dark h1 m-auto">
						<Link to="/signup">
							<button className="btn btn-primary text-dark m-1">Sign Up</button>
						</Link>
						<Link to="/login">
							<button className="btn btn-primary text-dark m-1">Login</button>
						</Link>
						<Link to="/profile">
							<button className="btn btn-primary text-dark m-1">Profile</button>
						</Link>
					</div>
				</div>
>>>>>>> 1568f83986f20b814ab84e3b2834c9bd0db13496
			</div>

			<div className="navbar-center">
				<h1 className="navbar-title">Anime Calendar</h1>
			</div>
		</div>
	</nav>
	);
};
