import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault } from './Words';
import {createContext, useState} from "react";

//Allows for states to be transfered a lot easier
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  return (
  <div className="App">
    <nav>
      <h1>Sevoodle</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard}}>
      <Board />
      <Keyboard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
