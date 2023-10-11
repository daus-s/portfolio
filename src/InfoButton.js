import React, { useEffect } from "react";
import "./tttstyles.css";

export default function InfoButton(props) {
  const originalSrc =
    "https://github.com/daus-s/portfolio/blob/main/public/info-gray.png?raw=true";
  const hoverSrc =
    "https://github.com/daus-s/portfolio/blob/main/public/info-green.png?raw=true";

  useEffect(() => {
    const imageElement = document.getElementById("infobutton");
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
    <button className="infobutton tttButton" onClick={props.handle}>
      <img
        src={originalSrc}
        id="infobutton"
        alt="Icon to reset the board"
        className="icon"
      />
    </button>
  );
}
