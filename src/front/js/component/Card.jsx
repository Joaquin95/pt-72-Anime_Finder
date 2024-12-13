import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Card = ({ item, index, category }) => {
    const { store, actions } = useContext(Context);
    const [imgErr, setImgErr] = useState(false);

    const handleImgErr = () => setImgErr(true);
    const GUIDE_URL = "https://api.jikan.moe/v4/anime/{id}/pictures";
    const getImageUrl = () => {
        if (imgErr && item.name === "Tatooine") {
            return tatooine;
        } else if (item.name === "Bespin") {
            return Bespin;
        } else if (category === "starships") {
            return store.starshipImages[index] || noImage;
        } return `${GUIDE_URL}${category}/${index + 1}.jpg`

    }
    const imageStyle = {
        height: category === "starships" ? "180px" :
            category === "planets" ? "254px" :
                "auto",
    };


    const isFavorite = store.favorites.some(fav => fav.name === item.name && fav.category === category)
    const handleFavorites = () => {
        const isFavorite = store.favorites.some(fav => fav.name === item.name && fav.category === category)
        if (isFavorite) {
            const indexToDelete = store.favorites.findIndex(fav => fav.name === item.name && fav.category === category)
            if (indexToDelete !== -1) {
                actions.deleteFavorites(indexToDelete)
            }
        } else {
            actions.addFavorites({ name: item.name, index, category })
        }
    }
    return (

        <div className="card" >
            {/* <img src={`${GUIDE_URL}${category}/${index + 1}.jpg`} className="card-img-top" alt="img not available" /> */}
            <img src={getImageUrl()} onError={handleImgErr} style={imageStyle} className="card-img-top" alt="img not available" />
            <div className="card-body d-flex flex-column" id="cardBody">
                <h5 className="card-title fw-bold">{item.name}</h5>
                <p className="card-text">
                    {
                        category == "characters" ? "Gender: " + item.gender :
                            category == "planets" ? "Population: " + item.population :
                                "Crew: " + item.crew
                    }
                </p>
                <p className="card-text">
                    {
                        category == "characters" ? "Height: " + item.height :
                            category == "planets" ? "Climate: " + item.climate :
                                "Model: " + item.model
                    }
                </p>
                <p className="card-text mb-4">
                    {
                        category == "characters" ? "Birth Year: " + item.birth_year :
                            category == "planets" ? "Terrain: " + item.terrain :
                                "Passengers: " + item.passengers
                    }
                </p>
                <div id="cardBtnGroup" className="d-flex justify-content-between mt-auto">
                    <Link to={"/details/" + category + "/" + index}>
                        <button className="btn btn-warning" type="button">Learn more!</button>
                    </Link>
                    
                    <button className="btn-heart btn-outline-dark" onClick={handleFavorites} type="button">
                        <FaGalacticRepublic />
                        <i className="fa-solid" style={{ color: isFavorite ? "#cd1818" : "red" }}></i>
                    </button>
                </div>
            </div>
        </div>

    );




};

export default Card