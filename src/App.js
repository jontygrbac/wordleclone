import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault } from "./Words";
import { createContext, useState } from "react";

//Allows for states to be transfered a lot easier
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });

  // For all other letters, ensure that letters only go to the 7th tile
  // If valid set the tile and move the letterPos by 1
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 6) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };
  // If the keyVal is DELETE, ensure letterVal is not the first tile
  // Then create a new board so that we can remove the deleted tile
  //and set the new attempt back to it's previous position
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };
  // If the keyVal is ENTER, ensure letterVal is at the final tile
  // If it is set our attempt to move down a single row
  const onEnter = () => {
    if (currAttempt.letterPos !== 7) return;
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
  };
  return (
    <div className="App">
      <nav>
        <h1>Wooooooordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
