import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
	const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const createUser = async() => {
        let response = await fetch(process.env.BACKEND_URL + "/signup", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ 
                email: email,
                password: password
            })
        })
        let data = await response.json()
        navigate("/")
    }

	return (
		<div className="text-center mt-5">
			<div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                <input type="password"  onChange={(e) => setPasword(e.target.value)}  className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
            </div>
            <button className="btn btn-info" onClick={() => createUser()}>Sign up</button>
		</div>
	);
};