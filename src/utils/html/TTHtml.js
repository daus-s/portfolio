import React from "react";

export function TTHtml({ text }) {
    if (typeof text !== "string") return;

    let parts = text.split("\n");

    console.log({ text });

    return (
        <>
            {parts
                .filter((e) => e.length > 0)
                .map((e, index) => (
                    <React.Fragment key={index}>
                        <p className="tt-html">{linkify(e, linkPairs)}</p>
                    </React.Fragment>
                ))}
        </>
    );
}

const linkPairs = {
    "LinkedIn.": "https://www.linkedin.com/in/daus-carmichael"
};

function linkify(text, linkPairs) {
    let result = text;

    for (const [key, value] of Object.entries(linkPairs)) {
        const regex = new RegExp(`(${key})`, "g");
        result = result.replace(
            regex,
            `<a href="${value}" target="_blank" rel="noopener noreferrer">$1</a>`
        );
    }

    return <p dangerouslySetInnerHTML={{ __html: result }} />;
}
