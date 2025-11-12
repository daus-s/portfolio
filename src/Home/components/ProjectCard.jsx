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
    const {
        link,
        title,
        date,
        image,
        alt,
        height,
        description,
        altDescription
    } = props;

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            window.location.href = link;
        }
    };

    const isMobile = useMediaQuery("(max-width:600px)");

    if (isMobile) {
        <MobileProjectCard
            link={link}
            title={title}
            altDescription={altDescription}
        />;
    }

    return (
        <div className="Container">
            <div
                tabIndex="0"
                className="ProjectCard"
                onKeyDown={handleKeyPress}
                role="button" // Improves accessibility
                aria-label={`Open ${title}`} // Improves accessibility
            >
                <a href={link} className="card-link">
                    <div className="top">
                        <div className="title">{title}</div>
                        <div className="date">{date}</div>
                    </div>
                    <div className="content">
                        <img
                            className="img"
                            src={image}
                            alt={alt}
                            style={
                                height ? { height: height } : { width: "20%" }
                            }
                        />
                        <div className="description">{description}</div>
                    </div>
                </a>
            </div>
        </div>
    );
}
