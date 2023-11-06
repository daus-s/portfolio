import "../styles/tutoringstyles.css";
import "../styles/hover.css";
import React, { useState } from "react";


export default function HoverText(props) {
    const [lock, setLocked] = useState(false);
    const [open, setOpen] = useState(false)

    const resize = () => {
        const aboutElement = document.querySelector(".about");
        const calendarElement = document.querySelector(".calendar");
  
        if (aboutElement && calendarElement) {
          const aboutRect = aboutElement.getBoundingClientRect();
          const calendarRect = calendarElement.getBoundingClientRect();
  
          props.setGradientStyle({background: `linear-gradient(to bottom, #000000 ${aboutRect.height+126}px, #ffffff ${aboutRect.height+calendarRect.height-90}px)`});
        }
    }

    const click = () => {
        setLocked(prev => !prev);
        resize();
    }

    const enter = () => {
        setOpen(true);
        resize();
    }

    const leave = () => {
        setOpen(lock);
        if (!lock)
            resize();
    }
    
    return (
        <div className="hovertext-wrapper">
            <div className={props.index % 2 ? "hover-text AL" : "hover-text AR"}
                onClick={click} 
                onMouseEnter={enter} 
                onMouseLeave={leave}
                style={{
                    transition: 'max-height 0.565s ease-in-out',
                    maxHeight: open ? '1000px' : '30px',
                    overflow: 'hidden'
                }}
                >
                { open ? (
                <div>
                    <div className="hover-title">{props.title}</div>
                    <div className="hover-para">{props.text}</div>
                    </div>) 
                : 
                <div className="hover-title">{props.title}</div>
                }
            </div>
        </div>
    );
  }
  