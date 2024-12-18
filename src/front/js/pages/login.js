import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const loginUser = async () => {
    sessionStorage.removeItem("token");
    await actions.login(email, password);

    navigate("/profile");
    window.location.reload();
    actions.getFavorites();
    console.log(store.favorites, "here are your favs");
  };

  return (
    <div className="text-center mt-2 bg-dark">
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
      <button className="btn btn-info m-3" onClick={() => loginUser()}>
        Login
      </button>
    </div>
  );
};
