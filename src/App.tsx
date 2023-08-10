import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, FC, createContext } from "react";

const DataTransfer = () => {
  const IndependentBtn = () => {
    const [count, setCount] = useState(0);
    return (
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count} clicked
      </button>
    );
  };
  const SharedDataBtns = () => {
    const [count, setCount] = useState(0);

    const SharedDataBtn = () => {
      return (
        <button onClick={() => {setCount(count + 1);}}>
          {count} clicked
        </button>
      );
    };

    return (
      <>
        <SharedDataBtn />
        <SharedDataBtn />
      </>
    );
  };
  return (
    <div>
      <h1>Sharing data between components</h1>
      <h2>Each button has its own count state:</h2>
      <IndependentBtn />
      <IndependentBtn />
      <h2>Buttons have the same parent with count state:</h2>
      <SharedDataBtns />
    </div>
  );
};

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
    // calls when component mounted or updated
    useEffect(() => {
      console.log("Counter has been changed!");
    });

    // calls when component mounted or removed
    useEffect(() => {
      return () => {
        console.log("Counter has been removed!");
      };
    }, []);

    // calls when component mounted or onCount
    useEffect(() => {
      console.log("Counter has been mount or onCount changed!");
    }, [props.onCount]);

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
  };
  return (
    <div>
      <h1>UseEffect</h1>
      {counterExists && (
        <Counter counter={counter} onCount={incrementCounter} />
      )}
      <div>
        <button onClick={resetCounter}>Reset counter</button>
        <button onClick={hideCounter}>Delete Counter</button>
      </div>
    </div>
  );
};

const authorData = {
  authorName: "Maksym",
  authorLogin: "Gastello",
};
const AuthorDataContext = createContext(authorData);

const UseContext = () => {
  return (
    <div>
      <h1>UseContext</h1>
      <AuthorDataContext.Provider value={authorData}>
        <UseContextPart />
      </AuthorDataContext.Provider>
      <hr />
    </div>
  );
};
const UseContextPart = () => {
  const { authorName, authorLogin } = useContext(AuthorDataContext);
  return (
    <div>
      <div>Name: {authorName}</div>
      <div>Login: {authorLogin}</div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <hr />
      <DataTransfer />
      <hr />
      <UseState />
      <hr />
      <UseEffect />
      <hr />
      <UseContext />
    </div>
  );
};
export default App;
