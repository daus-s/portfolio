import React, { useRef, useState, useEffect } from "react";

const ScreenSaver = () => {
    /** listen for any mouse or keyboard event. after 500s  start screen saver */

    const [sss, creeper] = useState();
    const divRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            event.stopPropagation();
            console.log(`Key pressed: ${event.key}`);
            creeper(false);
        };

        const handleClick = (event) => {
            event.stopPropagation();
            console.log("Mouse clicked:", event);
            creeper(false);
        };

        const handleMouseMove = (event) => {
            event.stopPropagation();
            console.log(`Mouse moved: (${event.clientX}, ${event.clientY})`);
            creeper(false);
        };

        const element = divRef.current;
        if (element) {
            element.addEventListener("keydown", handleKeyDown);
            element.addEventListener("click", handleClick);
            element.addEventListener("mousemove", handleMouseMove);
        }

        // Cleanup event listeners on component unmount
        return () => {
            if (element) {
                element.removeEventListener("keydown", handleKeyDown);
                element.removeEventListener("click", handleClick);
                element.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, []);

    return (
        <div ref={divRef} tabIndex={0} style={{ width: "100vw", height: "100vh", border: "1px solid white", zIndex: "100000000000" }}>
            {true ? <ScreenSaver /> : <></>}
        </div>
    );
};

export default ScreenSaver;
