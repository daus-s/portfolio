import "./modal.css";

import React from "react";
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
  return (
    <Popup open={props.gameOver} onClose={props.handleClose} modal>
      <div className="modal">
        <h2>{message(props.results)}</h2>
      </div>
    </Popup>
  );
}
