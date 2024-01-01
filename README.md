## Create React App
% npx create-react-app your-app-name --template typescript

## App.js
```ts
import React, { useState } from 'react';
import Square from './components/Square';
import './App.css';

const App: React.FC = () => {
// Defines a functional component named App of type React.FC (FunctionComponent).
  const [squares, setSquares] = useState<Array<string | null>> Array(9).fill(null);
// Initializes a state variable squares. It represents the state of the Tic Tac Toe board, and it is an array of strings or null values. The initial state is an array of 9 null values.
  const [currentPlayer, setCurrentPlayer] = useState<string>("❌");
// Initializes a state variable currentPlayer representing the current player as either "❌" or "⭕️". The initial player is set to "❌".
  const [winner, setWinner] = useState<string | null>(null);
// Initializes a state variable winner to keep track of the winner. It can be either "❌", "⭕️", or null if there is no winner yet.
  const gamePlay = (index: number) => {
// Declares a function named gamePlay that takes an index as a parameter. It represents the logic for a player's move on the board.
    if (squares[index] === null && !winner) {
// Checks if the selected square is empty (null) and there is no winner yet.
      squares[index] = currentPlayer;
      setSquares([...squares]);
// Updates the squares array with the current player's symbol at the selected index. It then uses the spread operator ([...squares]) to create a new array, triggering a state update.
      playerSelection();
// Calls the playerSelection function to switch to the next player.
    }
    howToWin();
// Calls the howToWin function to check if there's a winner after the current move.
  };

  const playerSelection = () => {
// Defines the `playerSelection` function, responsible for toggling the current player between "❌" and "⭕️".
    if (currentPlayer === "❌") {
      setCurrentPlayer("⭕️");
    } else {
      setCurrentPlayer("❌");
    }
  };

  const howToWin = () => {
// Defines the howToWin function to check for a winner based on the game's rules.
    const winningRules: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
// Defines an array of winning combinations on the board.
    winningRules.forEach((value) => {
      const [first, second, third] = value;
      if (
        squares[first] === "❌" &&
        squares[second] === "❌" &&
        squares[third] === "❌"
      ) {
        setWinner("❌");
      } else if (
        squares[first] === "⭕️" &&
        squares[second] === "⭕️" &&
        squares[third] === "⭕️"
      ) {
        setWinner("⭕️");
      }
    });
  };
// Checks each winning combination to determine if a player has won and sets the winner accordingly.
  const catsGame = squares.every((value) => value !== null);
// Checks if every square is filled, indicating a tie or "cat's game."
  const startOver = () => {
// Defines the startOver function, which resets the game state.
    setSquares(Array(9).fill(null));
    setCurrentPlayer("❌");
    setWinner(null);
// Resets the squares array, sets the current player to "❌", and clears the winner.
  };

  return (
    <>
      <h1 className='header'>TIC TAC TOE</h1>
      {winner && <h2 className='winner-text'> {winner} is the winner!</h2>}
      {catsGame && !winner && <h2 className='cats-game-text'> It is a tie! Restart to play again.</h2>}
      <div className="game-board">
        {squares.map((value, index) => {
// Maps over the squares array and renders a Square component for each square on the board.
          return (
            <Square
              value={value}
              index={index}
              key={index}
              gamePlay={gamePlay}
            />
          );
        })}
      </div>
      <br />
      <button className='restart-btn' onClick={startOver}>Restart Game</button>
    </>
  );
};

export default App;

// Square.tsx
import React from 'react';

interface SquareProps {
  value: string | null;
  index: number;
  gamePlay: (index: number) => void;
}
// Declares an interface SquareProps that defines the expected props for the Square component. It has three properties:
  // value: Represents the value of the square, which can be a string ('❌', '⭕️') or null if the square is empty.
  // index: Represents the index of the square in the board.
  // gamePlay: Represents a function that takes an index as a parameter and returns void. This function is used to handle the gameplay logic when a square is clicked.
const Square: React.FC<SquareProps> = (props) => {
// Declares a functional component named Square of type React.FC (FunctionComponent) and specifies the SquareProps interface as its generic type. It takes props as its parameter.
  const handleClick = () => {
    props.gamePlay(props.index);
  };
// Defines a function named handleClick that is called when the square is clicked. It invokes the gamePlay function passed as a prop with the square's index.
  return (
    <div className="square" onClick={handleClick}>
      {props.value}
    </div>
  );
// Renders a <div> element with the class 'square'. It also attaches an onClick event handler that calls the handleClick function when the square is clicked. The content of the square is determined by the value prop, which represents the current state of the square ('❌', '⭕️', or null for an empty square).
};

export default Square;

```
