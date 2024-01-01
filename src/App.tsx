import React, { useState} from 'react'
import Square from './components/Square'
import './App.css'

export default function App() {
  const [squares, setSquares] = useState<Array<string | null>> (Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<string>('❌')
  const [winner, setWinner] = useState<string | null>(null)
  function gamePlay(index: number) {
    if (squares[index] === null && !winner) {
      squares[index] = currentPlayer
      setSquares([...squares])
      playerSelection()
    }
    howToWin()
  }
  function playerSelection() {
    if (currentPlayer === '❌') {
      setCurrentPlayer('⭕️')
    } else {
      setCurrentPlayer("❌")
    }
  }
  function howToWin() {
    const winningRules: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    winningRules.forEach((value) => {
      const [first, second, third] = value;
      if (
        squares[first] === "❌" &&
        squares[second] === "❌" &&
        squares[third] === "❌"
      ) {
        setWinner("❌")
      } else if (
        squares[first] === "⭕️" &&
        squares[second] === "⭕️" &&
        squares[third] === "⭕️"
      ) {
        setWinner("⭕️")
      }
    })
  }
  const catsGame = squares.every((value: string | null) => value !== null)
  function startOver() {
    setSquares(Array(9).fill(null))
    setCurrentPlayer('❌')
    setWinner(null)
  }
  return (
    <>
    <h1>TIC TAC TOE</h1>
    {winner && <h2 className='winner-text'> {winner} is the winner!</h2>}
        {catsGame && !winner && <h2 className='cats-game-text'> It is a tie! Restart to play again.</h2>}
        <div className="game-board">
          {squares.map((value: any, index: any) => {
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
  )
}