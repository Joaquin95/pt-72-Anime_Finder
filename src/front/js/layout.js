import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Profile } from "./pages/profile";
import { SearchAnime } from "./pages/searchAnime";
import { SelectAnime } from "./pages/selectAnime";
import { SelectGenre } from "./pages/selectGenre";
import injectContext from "./store/appContext";
import { Favorites } from "./pages/favorites";
import { MangaHomePage } from "./pages/mangaHomePage";
import { AnimePage } from "./pages/animePage";
import { MangaPage } from "./pages/mangaPage";

import "../styles/layout.css";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Favorites />} path="/favorites" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<MangaHomePage />} path="/mangaHomePage" />
            <Route element={<SelectAnime />} path="/animes/genres/:id" />
            <Route element={<AnimePage />} path="/animes/:id" />
            <Route element={<MangaPage />} path="/mangaPage"/>
            <Route element={<SelectGenre />} path="/genre" />
            <Route element={<SearchAnime />} path="/searchAnime" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
