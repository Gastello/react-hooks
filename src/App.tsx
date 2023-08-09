import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [state, setState] = useState({ isAdmin: false, userName: "Olga" });
  const { isAdmin, userName } = state;
  const assignAdmin = () => {
    setState({ ...state, isAdmin: true });
  };
  const assignUser = () => {
    setState({ ...state, isAdmin: false });
  };
  return (
    <div className="App">
      <h1>Hello, {isAdmin ? "Admin" : "User"}</h1>
      {isAdmin ? (
        <button onClick={assignUser}>Become an user!</button>
      ) : (
        <button onClick={assignAdmin}>Become an admin!</button>
      )}
    </div>
  );
};

export default App;
