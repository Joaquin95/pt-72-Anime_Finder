import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar bs-primary-bg-subtle">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Anime Finder</span>
				</Link>
				<div className="ml-auto nav-item dropdown">
					<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						List
					</a>
					<div className="dropdown-menu m-auto">
						<Link to="/signup">
							<button className="btn btn-primary m-1">Sign Up</button>
						</Link>
						<Link to="/login">
							<button className="btn btn-primary m-1">Login</button>
						</Link>
						<Link to="/profile">
							<button className="btn btn-primary m-1">Profile</button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};
