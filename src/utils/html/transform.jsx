import React from "react";

export function ttHtml(s) {
  if (typeof s !== "string") return;

  s = s.split("\r\n");

  return (
    <>
      {s
        .filter((e) => e.length > 0)
        .map((e, index) => (
          <React.Fragment key={index}>{linkify(e, linkPairs)}</React.Fragment>
        ))}
    </>
  );
}

const linkPairs = {
  "LinkedIn.": "https://www.linkedin.com/in/daus-carmichael",
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
