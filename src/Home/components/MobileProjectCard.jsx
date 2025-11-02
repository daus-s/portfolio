import "../styles/mobileprojectcard.css";
import { substrAtWhitespace } from "./pretify";

import React, { useState } from "react";

export default function MobileProjectCard(props) {
  const [isExpanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleCollapse = () => {
    setExpanded(false);
  };

  return isExpanded ? (
    /* expanded */
    <div className="MobileContainerExpanded" onMouseLeave={handleCollapse}>
      <a href={props.link}>
        <div className="MobileProjectCard">
          <div className="title">{substrAtWhitespace(props.title, 18)}</div>
          <div className="altDescription">{props.altDescription}</div>
        </div>
      </a>
    </div>
  ) : (
    /* collapsed */
    <div className="MobileContainerCollapsed" onMouseEnter={handleExpand}>
      <div className="MobileProjectCard">
        <div className="title">{substrAtWhitespace(props.title, 18)}</div>
      </div>
    </div>
  );
}
