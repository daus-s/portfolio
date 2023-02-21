import "./styles.css";
import "./board.css";
import "./switch.css";
import Square from "./Square";
import { useState } from "react";
import FirstPlayerSwitch from "./FirstPlayerSwitch";
import TwoPersonMode from "./TwoPersonMode";
import ResultModal from "./ResultModal";

function oddElementOut(a, b, c) {
  if (a === b && a && b) {
    return 2;
  } else if (a === c && a && c) {
    return 1;
  } else if (b === c && b && c) {
    return 0;
  } else {
    return null;
  }
}

function results(full, winner, firstPlay, twoPersonMode) {
  if (full && !winner) {
    return "tie";
  }
  if (winner) {
    if (!twoPersonMode) {
      if (winner === "X") {
        return firstPlay ? "computer" : "user";
      } //winner is O
      else {
        return firstPlay ? "user" : "computer";
      }
    } else {
      return winner;
    }
  } else return null;
}

function isGridFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      return false;
    }
  }
  return true;
}

function checkWinConditions(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function makePlay(squares, firstPlay, turn) {
  if (
    results(isGridFull(squares), checkWinConditions(squares), firstPlay, false)
  ) {
    return squares;
  }
  //used to check if a play is made
  const original = squares;
  let comp = firstPlay ? "X" : "O";
  let player = firstPlay ? "O" : "X";

  //safeguard if
  if (comp === turn) {
    //try to play center square
    if (!squares[4]) {
      squares[4] = comp;
      return squares;
    }

    //check win conditions
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let win = [];
    let lose = [];
    for (let i = 0; i < lines.length; i++) {
      const pick = oddElementOut(
        squares[lines[i][0]],
        squares[lines[i][1]],
        squares[lines[i][2]]
      );
      if (pick === 0) {
        if (lines[i][1] === comp) {
          win.push(lines[i][0]);
        } else {
          lose.push(lines[i][0]);
        }
      }
      if (pick === 1) {
        if (lines[i][2] === comp) {
          win.push(lines[i][1]);
        } else {
          lose.push(lines[i][1]);
        }
      }
      if (pick === 2) {
        if (lines[i][1] === comp) {
          win.push(lines[i][2]);
        } else {
          lose.push(lines[i][2]);
        }
      }
    }
    for (let i = 0; i < win.length; i++) {
      if (!squares[win[i]]) {
        //make the play and win -- play to win, not to not lose
        squares[win[i]] = comp;
        return squares;
      }
    }
    for (let i = 0; i < lose.length; i++) {
      if (!squares[lose[i]]) {
        //make the play and stay alive brother
        squares[lose[i]] = comp;
        return squares;
      }
    }
    //play corner on round 2
    if (
      !squares[0] &&
      !squares[1] &&
      !squares[2] &&
      !squares[3] &&
      !squares[5] &&
      !squares[6] &&
      !squares[7] &&
      !squares[8] &&
      squares[4] === player
    ) {
      let choice = getRandomInt(4);
      if (choice === 0) {
        squares[0] = comp;
        return squares;
      }
      if (choice === 1) {
        squares[2] = comp;
        return squares;
      }
      if (choice === 2) {
        squares[6] = comp;
        return squares;
      }
      if (choice === 3) {
        squares[8] = comp;
        return squares;
      }
    }
    //play corners
    if (squares[0] === player) {
      if (!squares[6]) {
        squares[6] = comp;
        return squares;
      }
      if (!squares[2]) {
        squares[2] = comp;
        return squares;
      }
    }
    if (squares[2] === player) {
      if (!squares[8]) {
        squares[8] = comp;
        return squares;
      }
      if (!squares[0]) {
        squares[0] = comp;
        return squares;
      }
    }
    if (squares[6] === player) {
      if (!squares[8]) {
        squares[8] = comp;
        return squares;
      }
      if (!squares[0]) {
        squares[0] = comp;
        return squares;
      }
    }
    if (squares[8] === player) {
      if (!squares[2]) {
        squares[2] = comp;
        return squares;
      }
      if (!squares[6]) {
        squares[6] = comp;
        return squares;
      }
    }

    if (squares === original) {
      let openings = [];
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          openings.push(i);
        }
      }
      squares[openings[getRandomInt(openings.length)]] = comp;
    }
  }
  return squares;
}

export default function Board() {
  const [turn, setTurn] = useState("X"); //x always goes first
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [firstPlay, setFirstPlay] = useState(false);
  const [twoPersonMode, setTwoPersonMode] = useState(false);

  function handleFPSToggle(event) {
    setFirstPlay(event.target.checked);
    if (event.target.checked && turn === "X") {
      //computer first
      setSquares(makePlay(squares, event.target.checked, turn));
      if (
        results(
          isGridFull(squares),
          checkWinConditions(squares),
          firstPlay,
          twoPersonMode
        )
      ) {
        return;
      }
      setTurn(turn === "X" ? "O" : "X");
    }
    if (!event.target.checked && turn === "O") {
      //computer second
      setSquares(makePlay(squares, event.target.checked, turn));
      if (
        results(
          isGridFull(squares),
          checkWinConditions(squares),
          firstPlay,
          twoPersonMode
        )
      ) {
        return;
      }
      setTurn(turn === "X" ? "O" : "X");
    }
  }

  function handleTPMToggle(event) {
    setTwoPersonMode(event.target.checked);
    if (!event.target.checked) {
      //computer controls 1 player
      makePlay(squares, firstPlay, turn);
    }
    if (
      results(
        isGridFull(squares),
        checkWinConditions(squares),
        firstPlay,
        twoPersonMode
      )
    ) {
      return;
    }
  }

  function handleClick(i) {
    const newSquares = squares.slice();
    let newTurn;
    if (newSquares[i] === null) {
      newSquares[i] = turn;
      newTurn = turn === "X" ? "O" : "X";
      setSquares(newSquares);
      setTurn(newTurn);

      const winner = checkWinConditions(newSquares);
      const full = isGridFull(newSquares);
      if (results(full, winner, firstPlay, twoPersonMode)) {
      }
      if (!twoPersonMode) {
        setSquares(makePlay(newSquares, firstPlay, newTurn));
        if (results(full, winner, firstPlay, twoPersonMode)) {
          return;
        }
        setTurn(newTurn === "X" ? "O" : "X");
        return;
      }
    }
  }

  function game() {
    if (
      !results(
        isGridFull(squares),
        checkWinConditions(squares),
        firstPlay,
        twoPersonMode
      )
    ) {
      return false;
    }
    return true;
  }
  function resetBoard() {
    setSquares(Array(9).fill(null));
    setTurn("X");
  }

  const renderSquare = (i) => {
    return (
      <Square
        number={i + 1}
        value={squares[i]}
        onClick={() => handleClick(i)}
        turn={turn} // pass turn as a prop to Square
      />
    );
  };

  return (
    <div className="GameParent">
      <ResultModal
        gameOver={game()}
        results={results(
          isGridFull(squares),
          checkWinConditions(squares),
          firstPlay,
          twoPersonMode
        )}
        handleClose={resetBoard}
      />

      <div className="TTTBoard">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="SwitchContainer">
        <TwoPersonMode
          handleSwitchToggle={handleTPMToggle}
          disabled={firstPlay}
        />
        <FirstPlayerSwitch
          handleSwitchToggle={handleFPSToggle}
          disabled={twoPersonMode}
        />
      </div>
    </div>
  );
}

/**
 * 1 | 2 | 3
 * ---------
 * 4 | 5 | 6
 * ---------
 * 7 | 8 | 9
 */
