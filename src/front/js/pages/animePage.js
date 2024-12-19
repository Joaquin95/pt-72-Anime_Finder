import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const AnimePage = () => {
    const { store, actions } = useContext(Context);
    const [anime, setAnime] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        async function getAnime() {
            setLoading(true);
            try {
                const response = await fetch("https://api.jikan.moe/v4/anime/" + id + "/full");
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setAnime(data.data);
            } catch (error) {
                console.error(error);
                setAnime(null);
            } finally {
                setLoading(false);
            }
        }
        getAnime();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5 bg-dark text-light">Loading...</div>;
    }

    if (!anime) {
        return <div className="text-center mt-5 bg-dark text-light">Failed to load anime data.</div>;
    }

    return (
        <div className="text-center mt-5 bg-dark">
            <div className="text-light">{anime.title || "Anime title not available"}</div>
        </div>
    );
};
