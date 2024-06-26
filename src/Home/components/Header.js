import "../styles/styles.css";
import "../styles/header.css";

import React from "react";
import { useMediaQuery } from "@mui/material";

const Header = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [text, setText] = React.useState("Davis Carmichael's Portfolio");
  const [ver, setVer] = React.useState(true);

  const onMouseover = () => {
    setVer(!ver);
    if (!ver) {
      setText("Davis Carmichael's Portfolio");
    } else if (ver) {
      setText("Daus Carmichael's Portfolio");
    }
  };

  return (
    <>
      {isMobile ? (
        <h3 className="Header" onMouseEnter={onMouseover}>
          {text}
        </h3>
      ) : (
        <h1 className="Header" onMouseEnter={onMouseover}>
          {text}
        </h1>
      )}
    </>
  );
};

export default Header;
