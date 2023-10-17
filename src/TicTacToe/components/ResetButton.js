import React, { useEffect } from "react";
import "../styles/tttstyles.css";

export default function HomeButton(props) {
  const originalSrc =
    "https://github.com/daus-s/portfolio/blob/main/public/refresh-arrow-gray.png?raw=true";
  const hoverSrc =
    "https://github.com/daus-s/portfolio/blob/main/public/refresh-arrow-green.png?raw=true";

  useEffect(() => {
    const imageElement = document.getElementById("resetbutton");
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
    <button className="resetbutton tttButton" onClick={props.handle}>
      <img
        src={originalSrc}
        id="resetbutton"
        alt="Icon to reset the board"
        className="icon"
      />
    </button>
  );
}
