import React, { useState } from "react";
import "../styles/tttstyles.css";

export default function InfoButton(props) {
    const originalSrc = "/info-gray.png";
    const hoverSrc = "/info-green.png";

    const [src, setSrc] = useState(originalSrc);

    return (
        <button className="infobutton tttButton" onClick={props.handle}>
            <img
                src={src}
                id="infobutton"
                alt="Icon to reset the board"
                className="icon"
                onMouseEnter={() => setSrc(hoverSrc)}
                onMouseLeave={() => setSrc(originalSrc)}
            />
        </button>
    );
}
