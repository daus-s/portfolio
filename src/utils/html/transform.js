import React from "react";

export function ttHtml(s) {
    if (typeof s !== "string") return;

    s = s.split("\r\n");

    return (
        <>
            {s
                .filter((e) => e.length > 0)
                .map((e, index) => (
                    <React.Fragment key={index}>
                        <p>{linkify(e)}</p>
                    </React.Fragment>
                ))}
        </>
    );
}

function linkify(s) {
    const linkPairs = {
        "LinkedIn.": "https://www.linkedin.com/in/dauscarmichael",
    };

    if (!linkPairs.every((k, _) => s.contains(k))) {
        return s;
    }

    return linkPairs.map((k,v)=>) s = e.split
}
