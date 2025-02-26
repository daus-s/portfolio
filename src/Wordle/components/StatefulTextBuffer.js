import { useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";

export default function StatefulTextBuffer({ state, setState, disabled = false }) {
    if (disabled) {
        return;
    }
    const isMobile = useMediaQuery("(max-width: 600px)");
    const inputRef = useRef(null);

    const changeWrapper = (e) => {
        if (typeof setState !== "function") {
            console.log(e.target.value);
        } else {
            setState(e);
        }
    };

    useEffect(() => {
        const input = inputRef.current;
        input.focus();

        const handleBlur = () => {
            setTimeout(() => input.focus(), 0);
        };

        input.addEventListener("blur", handleBlur);

        return () => {
            input.removeEventListener("blur", handleBlur);
        };
    }, []);

    return (
        <input
            type="text"
            className="hidden-input"
            ref={inputRef}
            style={
                isMobile
                    ? { height: "100%", width: "100%", position: "absolute", border: 0, backgroundColor: "transparent", color: "rgba(1,1,1,0)", top: 0, bottom: 0, left: 0, right: 0 }
                    : { height: 0, width: 0, overflow: "hidden", padding: 0 }
            }
            value={state}
            onChange={changeWrapper}
        />
    );
}
