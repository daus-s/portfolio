import React, { useEffect } from "react";

export default function WordleProvider({ children }) {
    useEffect(() => {
        document.title = "WordleBot";

        const link =
            document.querySelector("link[rel*='icon']") ||
            document.createElement("link");

        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = "/wordlebot.png";

        document.head.appendChild(link);
    }, []);

    return <>{children}</>;
}
