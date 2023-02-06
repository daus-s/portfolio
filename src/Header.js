import "./styles.css";
import "./app.css";
import "./cardlist.css";
import "./data.css";
import "./header.css";
import "./linklist.css";
import "./projectcard.css";
import "./spacer.css";

import React from "react";
import { useMediaQuery } from "@material-ui/core";

const Header = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [text, setText] = React.useState("Davis Carmichael's Portfolio");

  const onMouseover = () => {
    setText("Daus Carmichael's Portfolio");
  };
  const onMouseout = () => {
    setText("Davis Carmichael's Portfolio");
  };

  return (
    <>
      {isMobile ? (
        <h3
          className="Header"
          onMouseEnter={onMouseover}
          onMouseLeave={onMouseout}
        >
          {text}
        </h3>
      ) : (
        <h1
          className="Header"
          onMouseEnter={onMouseover}
          onMouseLeave={onMouseout}
        >
          {text}
        </h1>
      )}
    </>
  );
};

export default Header;
