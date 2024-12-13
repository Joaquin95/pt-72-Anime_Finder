import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const favorites = () => {
	const { store, actions } = useContext(Context);
    const [anime, setAnime] = useState({})
    const { id } = useParams();

    useEffect(() => {
        async function getAnime() {
            const response = await fetch("https://api.jikan.moe/v4/anime/" + id + "/full")
            const data = await response.json()
            setAnime(data.data)
        }
        getAnime() 
    }, [])
	
	return (
		<div className="text-center mt-5 bg-dark">
            <div className="text-light">{anime.title}</div>
		</div>
	);
};