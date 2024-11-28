import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const SelectAmime = () => {
	const { store, actions } = useContext(Context);
    const [animes, setAnimes] = useState([])

    useEffect(() => {
        async function getAnimes() {
            const response = await fetch("")
            const data = await response.json()
            setAnimes(data) //might need to update this if you data is nested
        }
    }, [])

    //function handleFindingSteamingService() {
        // const response = await fetch("")
        // const data = await response.json()
        // setAnimes(data) //might need to update this if you data is nested
    // }

	return (
		<div className="text-center mt-5 bg-dark">
            {animes?.map((anime, index) => (
                <div>wazzup</div>
                //button to trigger finding the streaming service
            ))}
		</div>
	);
};