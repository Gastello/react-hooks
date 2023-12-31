import React, { useCallback, useContext, useEffect } from "react";
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
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
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
      <h2>Sharing data between components</h2>
      <h3>Each button has its own count state:</h3>
      <IndependentBtn />
      <IndependentBtn />
      <h3>Buttons have the same parent with count state:</h3>
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
      <DataTransfer />
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
const useContextStyle = {
  padding: 20,
  border: "5px grey dashed",
};
const AuthorDataContext = createContext(authorData);

const UseContext = () => {
  const [state, setState] = useState({
    authorName: "Maksym",
    authorLogin: "Gastello",
  });
  return (
    <div style={useContextStyle}>
      <i>parent:</i>
      <h1>UseContext</h1>
      <button
        onClick={() => {
          state.authorName == "Maksym"
            ? setState({
                authorName: "John",
                authorLogin: "Cena",
              })
            : setState({
                authorName: "Maksym",
                authorLogin: "Gastello",
              });
        }}
      >
        Change state in child of child, without passing props
      </button>
      <AuthorDataContext.Provider value={state}>
        <UseContextChild />
      </AuthorDataContext.Provider>
    </div>
  );
};
const UseContextChild = () => {
  return (
    <div style={useContextStyle}>
      <i>child:</i>
      <UseContextChildOfChild />
    </div>
  );
};
const UseContextChildOfChild = () => {
  const { authorName, authorLogin } = useContext(AuthorDataContext);
  return (
    <div style={useContextStyle}>
      <i>child of child:</i>
      <div>Name: {authorName}</div>
      <div>Login: {authorLogin}</div>
    </div>
  );
};

type ExpensiveProps = {
  callback: () => void;
};
class Expensive extends React.PureComponent<ExpensiveProps> {
  render() {
    let i = 0;
    while (i < 1000000000) i++;
    return <button onClick={this.props.callback}>Expensive</button>;
  }
}

const UseCallback = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  const callback = useCallback(() => {
    console.log("callback");
  }, []);

  return (
    <div>
      <h1>UseCallback</h1>
      <Expensive callback={callback} />
      <button onClick={increment}>Increment: {counter}</button>
    </div>
  );
};

const useCounter = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  return {
    counter,
    increment,
  };
};
const UseCustomHook = () => {
  const { counter, increment } = useCounter();
  return (
    <div>
      <h1>Custom Hooks</h1>
      <button onClick={() => increment()}>Counted {counter} times</button>
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
      <UseContext />
      <hr />
      <UseCallback />
      <hr />
      <UseCustomHook />
      <hr />
    </div>
  );
};
export default App;
