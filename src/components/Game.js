import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";

const Game = ({ isCmp }) => {
  const [history, setHistory] = useState([Array(100).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [WonXGames, setWonXGames] = useState(0);
  const [WonOGames, setWonOGames] = useState(0);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    console.log(winner);
    if (winner || squares[i]) {
      setHistory([Array(100).fill(null)]);
      setStepNumber(0);
      if (winner == "X") setWonXGames(WonXGames + 1);
      else setWonOGames(WonOGames + 1);
      return;
    }
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    // setXisNext(!xIsNext);
    let v = parseInt(Math.random() * 100);
    while (v > 100 || squares[v] != null) v = parseInt(Math.random() * 100);
    squares[v] = xIsNext ? "O" : "X";
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <div className="center">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="score-board">
        <div className="row">
          <p>Red Player (X):</p>
          <p>{WonXGames}</p>
        </div>
        <div className="row">
          <p>{WonOGames} </p>
          <p>:(O) Green Player</p>
        </div>
      </div>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
      </div>
    </>
  );
};

export default Game;
