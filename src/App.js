import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import { boardDefault, generateWordSet } from "./Words";
import { createContext, useEffect, useState } from "react";

//Allows for states to be transfered a lot easier
export const AppContext = createContext();
const showModal = () => {
  const modal = document.getElementById("wordNotFoundModal");

  modal.style.display = "block";

  // Hide the modal after 1 second (1000 milliseconds)
  setTimeout(() => {
    modal.style.display = "none";
  }, 1000);

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

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

  console.log(correctWord);
  // If the keyVal is ENTER, ensure letterVal is at the final tile
  // If it is set our attempt to move down a single row
  const onEnter = () => {
    if (currAttempt.letterPos !== 7) return;

    let currWord = "";
    for (let i = 0; i < 7; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord)) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      showModal();
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
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
          correctWord,
          disabledLetters,
          setDisabledLetters,
          correctLetters,
          setCorrectLetters,
          almostLetters,
          setAlmostLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <div id="wordNotFoundModal" class="modal">
            <div class="modal-content">
              <p className="modal__p">Word Not Found</p>
            </div>
          </div>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
        <footer>
          <p>
            Wordle Clone for Practice of React, please check out{" "}
            <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>
          </p>
        </footer>
      </AppContext.Provider>
    </div>
  );
}

export default App;
