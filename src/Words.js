import wordBank from "./seven_letter_words.txt";

export const boardDefault = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;

  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n").map((word) => word.toUpperCase());
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });

  return { wordSet, todaysWord };
};
