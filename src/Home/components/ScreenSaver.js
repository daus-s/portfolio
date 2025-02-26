import React, { useRef, useState, useEffect } from "react";
import EventListenerComponent from "../../Listener";

const ScreenSaver = () => {
    const timeout = 5000;
    /** listen for any mouse or keyboard event. after 500s  start screen saver */
    const timerRef = useRef(null);

    const [sss, creeper] = useState();
    const divRef = useRef(null);
    const [data, setData] = useState(undefined);

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            console.log("Existing timer cleared");
        }

        timerRef.current = setTimeout(() => {
            creeper(true);
            console.log("Existing timer cleared");
        }, timeout);
    };

    useEffect(() => {
        const fetchFile = async () => {
            const url = "/sunset.txt";
            const response = await fetch(url);
            if (response.ok) {
                setData(await response.text());
            }
        };
        fetchFile();
    }, []);

    const renderAsciiArt = () => {
        return data.split("\n").map((line, _) => (
            <pre key={_} style={{ whiteSpace: "pre", margin: "0" }}>
                {line}
            </pre>
        ));
    };

    return (
        <div
            ref={divRef}
            style={{
                width: "1px",
                height: "1px",
                backgroundColor: "transparent",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 100000000000,
            }}
        >
            <div ref={timerRef} />
            {sss ? (
                <div style={{ width: "100vw", height: "100vh", border: "1px solid white", zIndex: "100000000000", backgroundColor: "black", position: "fixed", top: "0px", padding: "10px" }}>
                    <div className="screensaver" style={{ width: "fit-content", height: "fit-content", margin: "auto", position: "relative", top: "50%", transform: "translateY(-50%)" }}>
                        {data && renderAsciiArt()}
                    </div>
                </div>
            ) : (
                <></>
            )}
            <EventListenerComponent onClick={}/>
        </div>
    );
};

export default ScreenSaver;
