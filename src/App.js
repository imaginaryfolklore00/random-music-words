import React, { useEffect, useState } from "react";
import ListOfWords from "./components/ListOfWords";
import wordService from "./services/words";
import musicService from "./services/musicbrainz";


const App = () => {
  const [inputNumber, setInputNumber] = useState(5);
  const [wordList, setWordList] = useState([]);
  useEffect(() => {if (wordList.length > 0) fillMusicList()}, [wordList]); //when the list of words changes, starts obtaining songs

  //extracts a random word from API response
  const getRandomWord = async () => {
    let randWord = "";
    await wordService.getWord().then((apiData) => randWord = apiData[0].word);
    return randWord;
  };

  //returns an object with a list of recording matching given title
  const getMatchingRecordings = async (mTitle) => {
    let matchRec = [];
    await musicService.getRecordings(mTitle).then((apiData) => matchRec = apiData);
    return matchRec;
  };

  //requests given number of words and later stores it in a state 'wordList'
  const fillWorldList = async () => {
    let randWordList = [];
    let wordToPush = "";

    const arrayLength = inputNumber;
    for (let i = 0; i < arrayLength; i++) {
      wordToPush = await getRandomWord();
      while (randWordList.includes(wordToPush)) { //safeguard against duplicate words
        wordToPush = await getRandomWord();
      }
      randWordList.push(wordToPush);
    }

    setWordList(randWordList.sort());
  };

  const fillMusicList = async () => {
    const wordsArray = wordList;
    let obtainedList = [];
    let recordToPush = [];
    let recordList = [];

    for (let i = 0; i < wordsArray.length; i++) {
      await getMatchingRecordings(wordsArray[i]).then(l => console.log(l));
    }
  };

  const handleNumberSubmit = async event => {
    event.preventDefault();
    await fillWorldList();
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
      <ListOfWords wordsToShow={wordList} />
    </div>
  );
};

export default App;
