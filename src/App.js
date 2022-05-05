import React, { useState } from "react";
import wordService from "./services/words";

const App = () => {
  const [inputNumber, setInputNumber] = useState(5);
  const [randomWord, setRandomWord] = useState("");

  let randWord = "";

  //gets a random word from API response and stores it in a state
  const getRandomWord = async () => {
    await wordService.getWord().then((apiData) => randWord = apiData[0].word);
    setRandomWord(randWord);
  };

  const handleNumberSubmit = async event => {
    event.preventDefault();
    getRandomWord();
  };

  //A form to get number input from the user, the input is kept in a state 'inputNumber'
  const numberForm = () => (
    <form onSubmit={handleNumberSubmit}>
      <div>
        Number of words:
        <input
          id="inputNumber"
          type="number"
          value={inputNumber}
          name="NumberOfWords"
          min="5"
          max="20"
          onChange={({ target }) => setInputNumber(target.value)}
        />
      </div>
      <button id="number-button" type="submit">
        Go
      </button>
    </form>
  );

  return (
    <div>
      <h1>Random words into music titles</h1>
      {numberForm()}
      <ol>
        <li>{randomWord}</li>
      </ol>
    </div>
  );
};

export default App;
