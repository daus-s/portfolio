import "./modal.css";

import React, { useEffect } from "react";
import Popup from "reactjs-popup";

export default function ResultModal(props) {
  const originalSrc =
    "https://github.com/daus-s/portfolio/blob/main/public/close-gray.png?raw=true";
  const hoverSrc =
    "https://github.com/daus-s/portfolio/blob/main/public/close-green.png?raw=true";

  useEffect(() => {
    const imageElement = document.getElementById("imcb");
    if (imageElement) {
      imageElement.addEventListener("mouseover", () => {
        imageElement.src = hoverSrc;
      });

      imageElement.addEventListener("mouseout", () => {
        imageElement.src = originalSrc;
      });
    }
  }, [originalSrc, hoverSrc]);

  return (
    <Popup open={props.open} onClose={props.onClose} modal>
      <div className="modal" id="infoModal">
        <button className="close" id="imcb" onClick={props.onClose}>
          <img src={originalSrc} alt="Close." className="closeButton" />
        </button>
        <div className="modalTitle">Welcome to tic-tac-toe</div>
        <ul>
          <li>
            I created this game to show off the "unwinnability and
            unloseability" of tic-tac-toe.
          </li>
          <li>
            You can always return to the main page via the home button in the
            top left corner.
          </li>
          <li>
            The game was 3 options, two player mode, computer first player, and
            simulate game
          </li>
          <li>
            Two Player Mode is used to play someone else on the same machine,
            the turns will automatically alternate for you.
          </li>
          <li>
            Computer First Player is the switch that determines (when playing
            the computer) who goes first.
          </li>
          <li>
            Simulate Game will run a game between the algorithm and, well,
            itself. This SHOULD always draw, but code is finnicky.{" "}
          </li>
        </ul>
      </div>
    </Popup>
  );
}
