import React from "react";

const ListOfWords = ({ wordsToShow }) => {
  const header2 = wordsToShow.length ? <h2>Random words obtained</h2> : "";

  return (
    <div>
      {header2}
      <ol>
        {wordsToShow.map((word, index) => <li key={index}>{word}</li>)}
      </ol>
    </div>
  );
};

export default ListOfWords;