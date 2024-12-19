import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/Anime logo2.jpg";
import "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar bg-primary bs-info-bg-subtle text-info">
      <div className="container">
        <Link to="/">
          <img src={logo} style={{ height: "55px" }} />
        </Link>
        <Link to="/">
          <h1 className="navbar-brand text-dark mb-0 h1">Anime Finder</h1>
        </Link>
        <Link to="/mangaHomePage" className="nav-item">
          <a className="nav-link text-dark" style={{ textDecoration: "none" }}>
            Manga
          </a>
        </Link>
        <div className="ml-auto nav-item dropdown d-flex">
          <a
            className="nav-link dropdown-toggle text-dark"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="icon fa-solid fa-bars"></i>
          </a>
          <div
            className="dropdown-menu bg-dark h1 m-auto"
            style={{ overflow: "hidden" }}
          >
            <Link to="/signup">
              <button className="btn btn-primary text-dark m-1">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-primary text-dark m-1">Login</button>
            </Link>
            <Link to="/profile">
              <button className="btn btn-primary text-dark m-1">Profile</button>
            </Link>
            <Link to="/favorites">
              <button className="btn btn-primary text-dark m-1">
                Favorites
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
