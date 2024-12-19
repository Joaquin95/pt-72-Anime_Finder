import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import ProfilePic from "../../img/user image.png";
import "../../styles/profile.css";
import MyCalendar from "./myCalendar";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState({});
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const getUser = async () => {
    // console.log(store.token, "get user!!")
    let response = await fetch(process.env.BACKEND_URL + "/user", {
      headers: {
        Authorization: "Bearer " + store.token,
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    setUser(data);
  };

  const handleLogout = () => {
    actions.logout();
    navigate("/login");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className="profile-container text-center bg-dark"
      style={{ height: "100vh" }}
    >
      {store.token ? (
        <div className="profile-Container bg-dark">
          <h1 className="py-3">Welcome Back, {user.email}!</h1>
          <div className="my-4">
            <img
              src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
              style={{ height: "100px" }}
            />
          </div>
          <MyCalendar />
          <div className="button-group pb-5">
            <Link to="/favorites">
              <button className="btn btn-primary me-4">My Favorites</button>
            </Link>
            <button className="btn btn-danger" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>YOU MUST LOGIN</h1>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};
