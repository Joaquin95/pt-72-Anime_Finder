import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import MyCalendar from "./myCalendar";
import { Link } from "react-router-dom";
 
export const Profile = () => {
  const [user, setUser] = useState({});
  const { store, actions } = useContext(Context);

  const getUser = async () => {
    let response = await fetch(process.env.BACKEND_URL + "/user", {
      headers: {
        Authorization: "Bearer " + store.token,
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

	return (
		<div className="text-center mt-5">
			{
				user.email != undefined ?  
				<div className="m-5 profile-Container">
					<h1>Welcome Back</h1>
					<h3>{user.email}</h3>
					<Link to="/favorites">
						<button className="btn btn-primary text-dark m-1">Favorites</button>
					</Link>
					<h1 className="navbar-title">Anime Calendar</h1>
          			<MyCalendar />
				</div>
				:
				<div>
					<h1>YOU MUST LOGIN</h1>
					<Link to="/login">Login</Link>
				</div>
			}
		</div>
	);
};
