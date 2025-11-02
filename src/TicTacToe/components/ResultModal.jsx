import "../styles/modal.css";
import "../styles/tttstyles.css";

import React, { useState } from "react";
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

    if (result === "user") {
        return "YOU HAVE DONE THE IMPOSSIBLE, CLAIM YOUR PRIZE FOR BEATING THE COMPUTER!";
    }
}

export default function ResultModal(props) {
    const { gameOver, handleClose, results } = props;
    //trim gameLog
    //submit to DB here

    const originalSrc = "/close-gray.png";
    const hoverSrc = "/close-green.png";

    const [src, setSrc] = useState(originalSrc);

    const width = {
        width: document.getElementById("tttBoard")
            ? document.getElementById("tttBoard").offsetWidth
            : ""
    };
    return (
        <Popup open={gameOver} onClose={handleClose} modal>
            <div className="modal" id="resultModal" style={width}>
                <button
                    className="close tttButton"
                    id="rmcb"
                    onClick={handleClose}
                    onMouseEnter={() => setSrc(hoverSrc)}
                    onMouseLeave={() => setSrc(originalSrc)}
                >
                    <img src={src} alt="Close." className="closeButton" />
                </button>
                <div
                    className="modalTitle"
                    style={props.mobile ? { fontSize: "1.0em" } : {}}
                >
                    {message(results)}
                </div>
            </div>
        </Popup>
    );
}
