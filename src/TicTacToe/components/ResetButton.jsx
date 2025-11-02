import React, { useState } from "react";
import "../styles/tttstyles.css";

export default function HomeButton(props) {
    const originalSrc = "/refresh-arrow-gray.png";
    const hoverSrc = "/refresh-arrow-green.png";

    const [src, setSrc] = useState(originalSrc);

    return (
        <button className="resetbutton tttButton" onClick={props.handle}>
            <img
                src={src}
                id="resetbutton"
                alt="Icon to reset the board"
                className="icon"
                onMouseEnter={() => setSrc(hoverSrc)}
                onMouseLeave={() => setSrc(originalSrc)}
            />
        </button>
    );
}
