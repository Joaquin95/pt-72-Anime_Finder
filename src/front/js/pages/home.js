import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.token)
	return (
		<div className="text-center mt-5">
			<Link to={"/signup"} className="btn btn-primary m-2">Signup</Link>
			<Link to={"/login"} className="btn btn-info m-2">Login</Link>
			<Link to={"/profile"} className="btn btn-success m-2">Profile</Link>
		</div>
	);
};