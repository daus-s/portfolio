import React, { useState } from "react";
import "../styles/tttstyles.css";

export default function HomeButton() {
    const originalSrc = "/arrowhome-gray.png";
    const hoverSrc = "/arrowhome-green.png";

    const [src, setSrc] = useState(originalSrc);

    return (
        <a href="/" className="homebutton">
            <img
                src={src}
                id="homebutton"
                alt="Logo to return to the home page"
                className="icon"
                onMouseEnter={() => setSrc(hoverSrc)}
                onMouseLeave={() => setSrc(originalSrc)}
            />
        </a>
    );
}
