import React from "react";

const ListOfSongs = ({ songsToShow }) => {
  const header2 = songsToShow.length ? <h2>Matching song pairs obtained</h2> : "";
  songsToShow.sort((a, b) => (a.word > b.word) ? 1 : -1); //sort pairs by the word value

  return (
    <div>
      {header2}
      <ul>
        {songsToShow.map(element => {
          if(element.notFound) {
            return (
              <li key={element.word}>
                {element.word}: <br />
                No recording found!
              </li>
            );}
          else {
            return (
              <li key={element.word}>
                {element.word}: <br />
                {element.artist} - {element.album} - {element.title}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ListOfSongs;