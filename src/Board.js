import "./tttstyles.css";
import "./board.css";
import "./switch.css";
import Square from "./Square";
import { useState, useEffect } from "react";
import FirstPlayerSwitch from "./FirstPlayerSwitch";
import TwoPersonMode from "./TwoPersonMode";
import ResultModal from "./ResultModal";
import { useMediaQuery } from "@mui/material";
import HomeButton from "./HomeButton";
import ResetButton from "./ResetButton";
import SimulateSwitch from "./SimulateSwitch";
import InfoModal from "./InfoModal";
import TTTHeader from "./TTTHeader";

const DEBUG = false;

function getOpening(squares, adv) {
  let opp = [];
  for (let i = 0; i < squares.length; ++i) {
    if (squares[i] === adv) {
      opp.push(i);
    }
  }
  if (opp.length !== 2) {
    return false; // not an opening
  } else {
    return opp;
  }
}

function intersection(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item));
}

function commonLines(lines, a, b) {
  let hasA = [];
  let hasB = [];
  for (let i = 0; i < lines.length; ++i) {
    //has A
    if (lines[i][0] === a || lines[i][1] === a || lines[i][2] === a) {
      hasA.push(lines[i]);
    }
    if (lines[i][0] === b || lines[i][1] === b || lines[i][2] === b) {
      hasB.push(lines[i]);
    }
  }
  let common = [];
  for (let i = 0; i < hasA.length; ++i) {
    for (let j = 0; j < hasB.length; ++j) {
      let is = intersection(hasA[i], hasB[j]);
      if (is.length === 1) {
        common.push(is);
      } else if (intersection.length > 1) {
        common.concat(is);
      } else {
      }
    }
  }

  return common;
}

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

function print(arg) {
  if (DEBUG) console.log(arg);
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
      print(comp + " plays 4 via center rule");
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
        if (squares[lines[i][1]] === comp) {
          win.push(lines[i][0]);
        } else {
          lose.push(lines[i][0]);
        }
      }
      if (pick === 1) {
        if (squares[lines[i][2]] === comp) {
          win.push(lines[i][1]);
        } else {
          lose.push(lines[i][1]);
        }
      }
      if (pick === 2) {
        if (squares[lines[i][0]] === comp) {
          win.push(lines[i][2]);
        } else {
          lose.push(lines[i][2]);
        }
      }
    }

    for (let i = 0; i < win.length; i++) {
      if (!squares[win[i]]) {
        //make the play and win -- play to win, not to not lose
        print(comp + " plays " + win[i] + " via winning move");
        squares[win[i]] = comp;
        return squares;
      }
    }
    for (let i = 0; i < lose.length; i++) {
      if (!squares[lose[i]]) {
        //make the play and stay alive brother
        squares[lose[i]] = comp;
        print(comp + " plays " + lose[i] + " via blocking losing move");
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
        print(comp + " plays 0 via play corners RD2");
        squares[0] = comp;
        return squares;
      }
      if (choice === 1) {
        print(comp + " plays 2 via play corners RD2");
        squares[2] = comp;
        return squares;
      }
      if (choice === 2) {
        print(comp + " plays 6 via play corners RD2");
        squares[6] = comp;
        return squares;
      }
      if (choice === 3) {
        print(comp + " plays 8 via play corners RD2");
        squares[8] = comp;
        return squares;
      }
    }

    if (
      (squares[0] === player && squares[8] === player) ||
      (squares[2] === player && squares[6] === player)
    ) {
      if (!squares[1]) {
        squares[1] = comp;
        print(comp + " plays 1 via blocking forked corners play");
        return squares;
      }
      if (!squares[3]) {
        squares[3] = comp;
        print(comp + " plays 3 via blocking forked corners play");

        return squares;
      }
      if (!squares[5]) {
        squares[5] = comp;
        print(comp + " plays 5 via blocking forked corners play");

        return squares;
      }
      if (!squares[7]) {
        squares[7] = comp;
        print(comp + " plays 7 via blocking forked corners play");

        return squares;
      }
    }

    if (squares[1] === player && squares[3] === player) {
      if (!squares[0]) {
        squares[0] = comp;
        print(comp + " plays 0 via blocking edging play");
        return squares;
      }
    }
    if (squares[1] === player && squares[5] === player) {
      if (!squares[2]) {
        squares[2] = comp;
        print(comp + " plays 2 via blocking edging play");
        return squares;
      }
    }
    if (squares[5] === player && squares[7] === player) {
      if (!squares[8]) {
        squares[8] = comp;
        print(comp + " plays 8 via blocking edging play");
        return squares;
      }
    }
    if (squares[7] === player && squares[3] === player) {
      if (!squares[6]) {
        squares[6] = comp;
        print(comp + " plays 6 via blocking edging play");
        return squares;
      }
    }

    //block common line
    let order = [4, 0, 2, 6, 8, 1, 3, 5, 7];

    let open = getOpening(squares, player);
    if (open) {
      let c = commonLines(lines, open[0], open[1]);
      for (let i = 0; i < order.length; ++i) {
        for (let a = 0; a < c.length; ++a) {
          let foo = order[i];
          let bar = c[a];
          print("" + foo + "=" + bar + ": " + (foo == bar));
          if (order[i] == c[a]) {
            if (!squares[c[a]]) {
              //the question is to prioritize corners or to avoid blocked lines
              squares[c[a]] = comp;
              print(comp + " plays " + c[a] + " via common lines");
              return squares;
            }
          }
        }
      }
    }

    if (!squares[0]) {
      squares[0] = comp;
      print(comp + " plays 0 via play corners");
      return squares;
    }
    if (!squares[2]) {
      squares[2] = comp;
      print(comp + " plays 2 via play corners");
      return squares;
    }
    if (!squares[6]) {
      squares[6] = comp;
      print(comp + " plays 6 via play corners");
      return squares;
    }
    if (!squares[8]) {
      squares[8] = comp;
      print(comp + " plays 8 via play corners");
      return squares;
    }

    //play corners
    if (squares[0] === player) {
      if (!squares[6]) {
        squares[6] = comp;
        print(comp + " plays 6 via play corners in response");
        return squares;
      }
      if (!squares[2]) {
        squares[2] = comp;
        print(comp + " plays 2 via play corners in response");
        return squares;
      }
      if (!squares[8]) {
        squares[8] = comp;
        print(comp + " plays 8 via play corners in response");
        return squares;
      }
    }
    if (squares[2] === player) {
      if (!squares[8]) {
        squares[8] = comp;
        print(comp + " plays 8 via play corners in response");
        return squares;
      }
      if (!squares[0]) {
        squares[0] = comp;
        print(comp + " plays 0 via play corners in response");
        return squares;
      }
      if (!squares[6]) {
        squares[6] = comp;
        print(comp + " plays 6 via play corners in response");
        return squares;
      }
    }
    if (squares[6] === player) {
      if (!squares[8]) {
        squares[8] = comp;
        print(comp + " plays 8 via play corners in response");
        return squares;
      }
      if (!squares[0]) {
        squares[0] = comp;
        print(comp + " plays 0 via play corners in response");
        return squares;
      }
      if (!squares[2]) {
        squares[2] = comp;
        print(comp + " plays 2 via play corners in response");
        return squares;
      }
    }
    if (squares[8] === player) {
      if (!squares[2]) {
        squares[2] = comp;
        print(comp + " plays 2 via play corners in response");
        return squares;
      }
      if (!squares[6]) {
        squares[6] = comp;
        print(comp + " plays 6 via play corners in response");
        return squares;
      }
      if (!squares[0]) {
        squares[0] = comp;
        print(comp + " plays 0 via play corners in response");
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
      print(
        comp +
          " plays " +
          openings[getRandomInt(openings.length)] +
          " via random square"
      );
      squares[openings[getRandomInt(openings.length)]] = comp;
    }
  }
  return squares;
}

async function displaySim(list, setSquares) {
  for (let i = 0; i < 9; ++i) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500ms
    setSquares(list[i]);
  }
  return Promise.resolve(); // Resolve the promise after all moves are set
}

function sims() {
  let list = [];
  for (let j = 0; j < 9; ++j) {
    list.push(Array(9).fill(null));
  }

  let turn = "X";
  let tb = true;
  const randomInt = Math.floor(Math.random() * 9);
  list[0][randomInt] = "X";
  print("opening: X plays " + randomInt);

  for (let i = 1; i < 9; ++i) {
    tb = !tb;
    turn = turn === "X" ? "O" : "X";
    const newBoard = list[i - 1].slice();
    list[i] = makePlay(newBoard, tb, turn);
  }
  print(list);
  return list;
}

export default function Board() {
  const [turn, setTurn] = useState("X"); //x always goes first
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [firstPlay, setFirstPlay] = useState(false);
  const [twoPersonMode, setTwoPersonMode] = useState(false);
  const [isWide, setIsWide] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const isMobile = useMediaQuery("(max-width:592px)");
  const [popupOpen, setPopupOpen] = useState(true);

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("gameParent");
      setIsWide(container.offsetWidth > container.offsetHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    resetBoard();
  }, [firstPlay, twoPersonMode]);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  function handleFPSToggle(event) {
    setFirstPlay(event.target.checked);
    resetBoard();
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
    resetBoard();
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
  function handleSSGToggle(event) {
    setSimulating(event.target.checked);
    if (!event.target.checked) {
      //computer controls 1 player
      resetBoard();
      setSimulating(false);
    } else if (event.target.checked) {
      print("new sim...");
      setSimulating(true);
      simulateGame();
    }
  }

  async function simulateGame() {
    let list = sims();
    await displaySim(list, setSquares);
    setSimulating(false);
    document.getElementById("simSwitch").checked = false;
    return;
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
    if (!twoPersonMode && firstPlay) {
      setSquares(makePlay(Array(9).fill(null), firstPlay, "X"));
      const newTurn = "O";
      setTurn(newTurn);
    }
    if (document.getElementById("simSwitch").checked) {
      document.getElementById("simSwitch").checked = true;
    }
  }

  const boardStyle = isMobile
    ? {
        width: isWide ? 0.7 * (screenHeight - 156) : 0.7 * screenWidth,
        height: isWide ? 0.7 * (screenHeight - 156) : 0.7 * screenWidth,
        position: "absolute",
        top: "120px"
      }
    : {
        width: isWide ? "" : "90%",
        height: isWide ? "100%" : ""
      };
  const size = isMobile
    ? {
        width: boardStyle.width / 3,
        height: boardStyle.height / 3
      }
    : {
        width: "100px",
        height: "100px"
      };

  const renderSquare = (i) => {
    return (
      <Square
        number={i + 1}
        value={squares[i]}
        onClick={() => handleClick(i)}
        turn={turn} // pass turn as a prop to Square
        square={isMobile ? { size } : {}}
      />
    );
  };

  let tpmDis = firstPlay || simulating;
  let fpsDis = twoPersonMode || simulating;
  let ssgDis = firstPlay || twoPersonMode || simulating;

  return (
    <div className="GameParent" id="gameParent">
      <TTTHeader openInfo={handleOpenPopup} />
      <HomeButton />
      <ResetButton handle={resetBoard} />
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
      <InfoModal
        open={popupOpen}
        onClose={handleClosePopup}
        onOpen={handleOpenPopup}
      />

      <div className="TTTBoard" id="tttBoard" style={boardStyle}>
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
          disabled={tpmDis}
          mobile={isMobile}
        />
        <FirstPlayerSwitch
          handleSwitchToggle={handleFPSToggle}
          disabled={fpsDis}
          mobile={isMobile}
        />
        <SimulateSwitch
          id="simSwitch"
          handleSwitchToggle={handleSSGToggle}
          disabled={ssgDis}
          mobile={isMobile}
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
