import React, { useEffect, useState } from "react";
import ListOfWords from "./components/ListOfWords";
import ListOfSongs from "./components/ListOfSongs";
import wordService from "./services/words";
import musicService from "./services/musicbrainz";
import recordingsParser from "./utils/recordingsParser";


const App = () => {
  const [inputNumber, setInputNumber] = useState(5);
  const [wordList, setWordList] = useState([]);
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {if (wordList.length > 0)  fillMusicList()}, [wordList]); //when the list of words changes, starts obtaining songs

  //extracts a random word from API response
  const getRandomWord = async () => {
    let randWord = "";
    await wordService.getWord().then((apiData) => randWord = apiData[0].word);
    return randWord;
  };

  //returns an object with a list of recording matching given title
  const getMatchingRecordings = async (mTitle) => {
    let matchRec = [];
    await musicService.getRecordings(mTitle).then((apiData) => matchRec = apiData.recordings);
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

    setWordList(randWordList);
  };

  const fillMusicList = async () => {
    const wordsArray = wordList;
    let obtainedList = [];
    let finalList = [];

    for (let i = 0; i < wordsArray.length; i++) {
      let element = wordsArray[i];
      await getMatchingRecordings(element).then(l => obtainedList.push(l));
      obtainedList[i].word = element;
    }

    recordingsParser.formatList(obtainedList).map(song => {
      finalList.push(recordingsParser.formatSong(song));
    });

    setMusicList(finalList);
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
      <ListOfSongs songsToShow={musicList} />
    </div>
  );
};

export default App;
