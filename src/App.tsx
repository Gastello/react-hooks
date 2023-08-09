import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, FC } from "react";

const UseState = () => {
  const [state, setState] = useState({ isAdmin: false, userName: "Olga" });
  const { isAdmin, userName } = state;

  const assignAdmin = () => {
    setState({ ...state, isAdmin: true });
  };
  const assignUser = () => {
    setState({ ...state, isAdmin: false });
  };
  return (
    <div>
      <h1>useState</h1>
      <h2>Hello, {isAdmin ? "Admin" : "User"}</h2>
      {isAdmin ? (
        <button onClick={assignUser}>Become an user!</button>
      ) : (
        <button onClick={assignAdmin}>Become an admin!</button>
      )}
    </div>
  );
};

const UseEffect = () => {
  const [counter, setCounter] = useState(0);
  const [counterExists, toggleCounter] = useState(true);
  type CounterProps = {
    counter: number;
    onCount: () => void;
  };
  const Counter: FC<CounterProps> = (props) => {
    return (
      <button onClick={props.onCount}>Clicked {props.counter} times</button>
    );
  };
  const incrementCounter = () => {
    setCounter(counter + 1);
  };
  const resetCounter = () => {
    setCounter(0);
    toggleCounter(true);
  };
  const hideCounter = () => {
    toggleCounter(false);
  }
  return (
    <div>
      <h1>UseEffect</h1>
      {counterExists && <Counter counter={counter} onCount={incrementCounter} />}
      <div>
        <button onClick={resetCounter}>
          Reset counter
        </button>
        <button onClick={hideCounter}>
          Delete Counter
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <hr />
      <UseState />
      <hr />
      <UseEffect />
      <hr />
    </div>
  );
};
export default App;
