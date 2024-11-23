import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar bg-primary bs-info-bg-subtle text-info">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand text-dark mb-0 h1">Anime Finder</span>
				</Link>
				<div className="ml-auto nav-item dropdown">
					<a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						List
					</a>
					<img herf=""/>
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
			</div>
		</nav>
	);
};
