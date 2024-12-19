import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/Anime logo2.jpg";
import "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar bg-primary text-info">
      <div className="container">
        {/* Logo and Brand Name */}
        <Link to="/">
          <img src={logo} alt="Anime Finder Logo" style={{ height: "55px" }} />
        </Link>
        <Link to="/" className="navbar-brand text-dark mb-0 h1">
          Anime Finder
        </Link>

        {/* Offcanvas Trigger Button */}
        <button
          className="btn btn-outline-dark btn-lg"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          style={{ border: "none" }}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Links in the Sidebar */}
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link
                to="/mangaHomePage"
                className="nav-link text-decoration-none text-light"
              >
                Manga
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="btn btn-primary text-dark mb-2 w-100"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="btn btn-primary text-dark mb-2 w-100"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className="btn btn-primary text-dark mb-2 w-100"
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/favorites"
                className="btn btn-primary text-dark mb-2 w-100"
              >
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
