import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || checkWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();

    if (xIsNext) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  const win = checkWinner(squares);
  let status = "Let's Play!";
  if (win) {
    status = "GAME OVER: " + win + " wins!!!";
  } else {
    status = "Next Move: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function checkWinner(squares) {
  let winner = null;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    if (
      squares[lines[i][0]] &&
      squares[lines[i][0]] === squares[lines[i][1]] &&
      squares[lines[i][0]] === squares[lines[i][2]]
    ) {
      winner = squares[lines[i][0]];
    }
  }
  return winner;
}
