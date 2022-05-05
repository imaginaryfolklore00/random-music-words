import React, { useState } from "react";

const App = () => {
  const [inputNumber, setInputNumber] = useState(5);

  const handleNumberSubmit = (event) => event.preventDefault();

  //This is a form to get number input from the user, the input is kept in a state 'inputNumber'
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
    <>
      <h1>Random words into music titles</h1>
      {numberForm()}
    </>
  );
};

export default App;
