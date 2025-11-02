import { useMediaQuery } from "@mui/material";
import "../styles/modal.css";

import React, { useState } from "react";
import Popup from "reactjs-popup";

export default function ResultModal(props) {
    const isMobile = useMediaQuery("max-width: 678px");

    const originalSrc = "/close-gray.png";
    const hoverSrc = "/close-green.png";

    const [src, setSrc] = useState(originalSrc);

    // include this in the new styles const
    // width: document.getElementById("tttBoard") ? document.getElementById("tttBoard").offsetWidth : ""
    const styles = isMobile
        ? {
              width: "50vh"
          }
        : {
              width: document.getElementById("tttBoard")
                  ? document.getElementById("tttBoard").offsetWidth
                  : ""
          };

    return (
        <Popup open={props.open} onClose={props.onClose} modal>
            <div className="modal" id="infoModal" style={styles}>
                <button
                    className="close tttButton"
                    id="imcb"
                    onClick={props.onClose}
                >
                    <img
                        src={src}
                        alt="Close."
                        className="closeButton"
                        onMouseEnter={() => setSrc(hoverSrc)}
                        onMouseLeave={() => setSrc(originalSrc)}
                    />
                </button>
                <div
                    className="modalTitle"
                    style={props.mobile ? { fontSize: "1.0em" } : {}}
                >
                    Welcome to Tic-Tac-Toe
                </div>
                {props.mobile ? (
                    ""
                ) : (
                    <ul>
                        <li>
                            I created this game to show off the "unwinnability
                            and unloseability" of tic-tac-toe.
                        </li>
                        <li>
                            You can always return to the main page via the home
                            button in the top left corner.
                        </li>
                        <li>
                            The game was 3 options, two player mode, computer
                            first player, and simulate game
                        </li>
                        <li>
                            Two Player Mode is used to play someone else on the
                            same machine, the turns will automatically alternate
                            for you.
                        </li>
                        <li>
                            Computer First Player is the switch that determines
                            (when playing the computer) who goes first.
                        </li>
                        <li>
                            Simulate Game will run a game between the algorithm
                            and, well, itself. This SHOULD always draw, but code
                            is finnicky.{" "}
                        </li>
                    </ul>
                )}
            </div>
        </Popup>
    ); //future developments you could make the mobile version cycle through
    // tips like dota2 pause screen
}
