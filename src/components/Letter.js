import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPosition, attemptVal }) {
  const {
    board,
    correctWord,
    currAttempt,
    setDisabledLetters,
    setCorrectLetters,
    setAlmostLetters,
    correctLetters,
  } = useContext(AppContext);
  const letter = board[attemptVal][letterPosition];

  // Function to count occurrences of a letter in a word
  const countOccurrences = (word, char) => {
    return word.split('').filter(c => c === char).length;
  };

  // If position on word is the same as the cell
  const correct = correctWord[letterPosition] === letter;

  // If it isn't correct, isn't black and is included in the word
  const almost = !correct && letter !== "" && correctWord.includes(letter);

  // Check if the letter is correct and if there is only one occurrence of the letter in the correct word
  const isUniqueCorrect = almost && countOccurrences(correctWord, letter) == 1 && correctLetters.includes(letter);

  // Determining the id, will only be allowed when attemptVal has reached its max
  const letterState =
    currAttempt.attempt > attemptVal &&
    (isUniqueCorrect ? "error" : correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  useEffect(() => {
    if (letter !== "" && correct) {
      setCorrectLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  useEffect(() => {
    if (letter !== "" && almost) {
      setAlmostLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
