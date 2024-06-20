import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, currAttempt, correctWord } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "YOU WON!" : "BETTER LUCK NEXT TIME"}</h3>
      <h1>The word was: {correctWord}</h1>
      {gameOver.guessedWord && <h3>Attempts: {currAttempt.attempt}</h3>}
    </div>
  );
}

export default GameOver;
