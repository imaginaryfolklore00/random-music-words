import React from "react";

const ListOfWords = ({ wordsToShow }) => (
  <ol>
    {wordsToShow.map((word, index) => <li key={index}>{word}</li>)}
  </ol>
);

export default ListOfWords;