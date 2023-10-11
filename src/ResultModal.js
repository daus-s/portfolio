import "./modal.css";
import './tttstyles.css';

import React, { useEffect } from "react";
import Popup from "reactjs-popup";

function message(result) {
  if (result === "tie") {
    return "It's a tie";
  }
  if (result === "X") {
    return "X's win!";
  }
  if (result === "O") {
    return "O's win!";
  }
  if (result === "computer") {
    return "The computer won!";
  }
  if (result === "computer") {
    return "The computer won!";
  }
  if (result === "user") {
    return "YOU HAVE DONE THE IMPOSSIBLE, CLAIM YOUR PRIZE FOR BEATING THE COMPUTER!";
  }
}

export default function ResultModal(props) {
  const { gameOver, handleClose, results } = props;

  const originalSrc =
    "https://github.com/daus-s/portfolio/blob/main/public/close-gray.png?raw=true";
  const hoverSrc =
    "https://github.com/daus-s/portfolio/blob/main/public/close-green.png?raw=true";

  useEffect(() => {
    const imageElement = document.getElementById("rmcb");
    if (imageElement) {
      imageElement.addEventListener("mouseover", () => {
        imageElement.src = hoverSrc;
      });

      imageElement.addEventListener("mouseout", () => {
        imageElement.src = originalSrc;
      });
    }
  }, [originalSrc, hoverSrc]);

  const width = {
    width: document.getElementById("tttBoard") ? document.getElementById("tttBoard").offsetWidth : ""
  };
  return (
    <Popup open={gameOver} onClose={handleClose} modal>
      <div className="modal" id="resultModal" style={width}>
        <button className="close tttButton" id="rmcb" onClick={handleClose}>
          <img src={originalSrc} alt="Close." className="closeButton" />
        </button>
        <div className="modalTitle" >{message(results)}</div>
      </div>
    </Popup>
  );
}
