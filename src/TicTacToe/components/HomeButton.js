import React, { useEffect } from "react";
import "../styles/tttstyles.css";

export default function HomeButton() {
  const originalSrc =
    "https://github.com/daus-s/portfolio/blob/main/public/arrowhome-gray.png?raw=true";
  const hoverSrc =
    "https://github.com/daus-s/portfolio/blob/main/public/arrowhome-green.png?raw=true";

  useEffect(() => {
    const imageElement = document.getElementById("homebutton");
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
    <a href="/" className="homebutton">
      <img
        src={originalSrc}
        id="homebutton"
        alt="Logo to return to the home page"
        className="icon"
      />
    </a>
  );
}
