import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault } from './Words';
import {createContext, useState} from "react";

//Allows for states to be transfered a lot easier
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  return (
  <div className="App">
    <nav>
      <h1>Wooooooordle</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt}}>
        <div className='game'>
      <Board />
      <Keyboard />
      </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
