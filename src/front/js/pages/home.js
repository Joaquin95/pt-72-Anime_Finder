import React, { useContext } from "react";
<<<<<<< HEAD
import MyCalendar from "./myCalendar";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      
    </div>
  );
};
=======
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.token)
	return (
		<div className="text-center mt-5 bg-dark">
			
		</div>
	);
};
>>>>>>> 1568f83986f20b814ab84e3b2834c9bd0db13496
