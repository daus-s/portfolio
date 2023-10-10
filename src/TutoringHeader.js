import "./tutoringstyles.css";
import "./app.css";

import "./header.css";

import React from "react";
import { useMediaQuery } from "@mui/material";

const TutoringHeader = () => {
  const isWideScreen = useMediaQuery("(min-width:750px)");
  const isMobile = useMediaQuery("(max-width:652px)");

  if (isWideScreen) {
    return (
      <>
        <h1
          className="TutoringHeader"
          style={{ left: "208px", right: "208px" }}
        >
          Private Physics Tutoring
        </h1>
      </>
    );
  } else if (isMobile) {
    return (
      <h3
        className="TutoringHeader"
        style={{ left: "80px", right: "80px", height: "30px" }}
      >
        Private Physics Tutoring
      </h3>
    );
  } else if (!isWideScreen && !isMobile) {
    return (
      <>
        <h2
          className="TutoringHeader"
          style={{ left: "208px", right: "208px" }}
        >
          Private Physics Tutoring
        </h2>
      </>
    );
  }

  return (
    <>
      {!isWideScreen ? (
        <h3 className="TutoringHeader" style={{ left: "80px", right: "80px" }}>
          Private Physics Tutoring
        </h3>
      ) : (
        <h1
          className="TutoringHeader"
          style={{ left: "208px", right: "208px" }}
        >
          Private Physics Tutoring
        </h1>
      )}
    </>
  );
};

export default TutoringHeader;
