import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const createUser = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData);
                return alert(errorData.message || "Signup failed!");
            }

            const data = await response.json();
            console.log("User created:", data);
            alert("Signup successful!");
            navigate("/");
        } catch (error) {
            console.error("Network error:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className "">
            <h1>Signup</h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={createUser}>Sign Up</button>
        </div>
    );
};
