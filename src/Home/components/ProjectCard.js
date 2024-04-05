import "../styles/styles.css";
import "../styles/cardlist.css";
import "../styles/header.css";
import "../styles/linklist.css";
import "../styles/projectcard.css";
import "../styles/spacer.css";

import React from "react";
import { useMediaQuery } from "@mui/material";
import MobileProjectCard from "./MobileProjectCard";
export default function ProjectCard(props) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      window.location.href = props.link;
    }
  };
  
  const isMobile = useMediaQuery("(max-width:600px)");
  return isMobile ? (
    <MobileProjectCard
      link={props.link}
      title={props.title}
      altDescription={props.altDescription}
    />
  ) : (
    <div className="Container">
      <div tabIndex="0" className="ProjectCard" onKeyDown={handleKeyPress}>
        <a href={props.link}>
          <div className="top">
            <div className="title">{props.title}</div>
            <div className="date">{props.date}</div>
          </div>
          <div>
            <img className="img" src={props.image} alt={props.alt} style={{...(props.height?{height: props.height}:{width:'20%'}), ...(props.imgIsCircle?{borderRadius: '50%'}:{})}}/>
            <div className="description">{props.description}</div>
          </div>
        </a>
      </div>
    </div>
  );
}
