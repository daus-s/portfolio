import "../styles/tutoringstyles.css";
import "../styles/textbox.css";
import React, { useState } from "react";

export default function TextBox(props) {
  return (
    <div className="textbox-wrapper">
      <div
        className={props.index % 2 == 0 ? "textbox AL" : "textbox AR"}
        style={{
          transition: "max-height 0.565s ease-in-out",
          maxHeight: open ? "1000px" : "30px",
          overflow: "hidden",
        }}
      >
        {open ? (
          <div>
            <div className="textbox-title">{props.title}</div>
            <div>{props.text}</div>
          </div>
        ) : (
          <div className="hover-title">{props.title}</div>
        )}
      </div>
    </div>
  );
}
