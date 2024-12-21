import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        let data = await response.json();
        navigate("/login"); // Navigate to login after successful signup
      } else {
        console.error("Signup failed:", response.statusText);
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup d-flex justify-content-center align-items-center">
      <div className="overlay"></div>
      <div className="text-center signup-content">
        <h2>Create New Account</h2>
        <div className="login-container rounded"></div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Email
          </span>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Password
          </span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <button
          className="btn btn-info"
          onClick={() => createUser()}
          style={{ backgroundColor: "#3283ec", border: "black" }}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};
