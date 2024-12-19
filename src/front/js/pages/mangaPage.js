import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const MangaPage = () => {
    const { store, actions } = useContext(Context);
    const [anime, setManga] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        async function getManga() {
            setLoading(true);
            try {
                const response = await fetch("https://api.jikan.moe/v4/manga/" + id + "/full");
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setManga(data.data);
            } catch (error) {
                console.error(error);
                setManga(null);
            } finally {
                setLoading(false);
            }
        }
        getManga();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5 bg-dark text-light">Loading...</div>;
    }

    if (!anime) {
        return <div className="text-center mt-5 bg-dark text-light">Failed to load manga data.</div>;
    }

    return (
        <div className="text-center mt-5 bg-dark">
            <div className="text-light">{manga.title || "Manga title not available"}</div>
        </div>
    );
};
