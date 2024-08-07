import "../styles/wordle.css";

import { SettingsProvider, useSettings } from "./SettingsProvider";
import { useEffect, useState } from "react";
import StatefulTextBuffer from "./StatefulTextBuffer";
import Rainbow from "rainbowvis.js";
import Modal from "react-modal";

import {
    words,
    accepted,
    filterWords,
    getScore,
    winCondition,
    turns,
    parseCombinedString,
    generateColors,
    winningWord
} from "../lib/wordleutils";
import { useMediaQuery } from "@mui/material";

export default function Wordle({}) {
    const [checking, setChecking] = useState("");
    const [bigstr, setBigstr] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");

    const complexChangeHandler = (e) => {
        const w = e.target.value.toUpperCase();
        if (!w.length) {
            setBigstr("");
        }
        const wordValuePairs = parseCombinedString(w);

        const condition = wordValuePairs.every((pair) => {
            console.log(pair);
            for (let i = 0; i < pair.gyb.length; ++i) {
                if (
                    !(
                        pair.gyb[i] === "Y" ||
                        pair.gyb[i] === "G" ||
                        pair.gyb[i] === "B"
                    )
                ) {
                    return false;
                }
            }
            return true;
        });
        if (condition) {
            setBigstr(String(w).toUpperCase());
        }
        if (winCondition(w)) {
            setIsModalOpen(true);
        }
    };

    return (
        <SettingsProvider>
            <div
                className="wordle-bot"
                style={isMobile ? { paddingBottom: "50vh" } : {}} //accomodate keyboard
            >
                <WordleHeader />
                <Grid bigstr={bigstr} />
                <StatefulTextBuffer
                    state={bigstr}
                    setState={complexChangeHandler}
                />
                <RemainingWords bigstr={bigstr} setChecking={setChecking} />
                <Debug bigstr={bigstr} checking={checking} />
                <EndGameModal
                    isOpen={isModalOpen}
                    setMV={setIsModalOpen}
                    w={bigstr}
                    clear={setBigstr}
                />
            </div>
        </SettingsProvider>
    );
}

function Grid({ bigstr }) {
    return (
        <div className="wordle-grid">
            <Row
                index={1}
                letters={bigstr.substring(0, 5)}
                values={bigstr.substring(5, 10)}
            />
            <Row
                index={2}
                letters={bigstr.substring(10, 15)}
                values={bigstr.substring(15, 20)}
            />
            <Row
                index={3}
                letters={bigstr.substring(20, 25)}
                values={bigstr.substring(25, 30)}
            />
            <Row
                index={4}
                letters={bigstr.substring(30, 35)}
                values={bigstr.substring(35, 40)}
            />
            <Row
                index={5}
                letters={bigstr.substring(40, 45)}
                values={bigstr.substring(45, 50)}
            />
            <Row
                index={6}
                letters={bigstr.substring(50, 55)}
                values={bigstr.substring(55, 60)}
            />
        </div>
    );
}

function Row({ letters, values }) {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <div
            className="wordle-row"
            style={isMobile ? { maxWidth: "100vw" } : {}}
        >
            <LetterSquare letter={letters.charAt(0)} value={values.charAt(0)} />
            <LetterSquare letter={letters.charAt(1)} value={values.charAt(1)} />
            <LetterSquare letter={letters.charAt(2)} value={values.charAt(2)} />
            <LetterSquare letter={letters.charAt(3)} value={values.charAt(3)} />
            <LetterSquare letter={letters.charAt(4)} value={values.charAt(4)} />
        </div>
    );
}

function LetterSquare({ letter, value }) {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <div
            className={"l-square " + value.toLowerCase()}
            style={
                isMobile ? { width: "56px", height: "56px", margin: "5px" } : {}
            }
        >
            {letter?.toUpperCase()}
        </div>
    );
}

function RemainingWords({ bigstr, setChecking }) {
    const isMobile = useMediaQuery("(max-width:600px)");

    const [candidates, setCandidates] = useState(undefined);
    const [guesses, setGuesses] = useState(undefined);
    const [scores, setScores] = useState(undefined);

    const { settings } = useSettings();

    useEffect(() => {
        const getWords = async () => {
            const data = await words();
            setCandidates(data);
        };

        const getGuesses = async () => {
            const data = await accepted();
            setGuesses(data);
        };

        getWords();
        getGuesses();
    }, []);

    useEffect(() => {
        const score = async () => {
            if (!candidates || !guesses || bigstr.length === 0) {
                return;
            }
            if (bigstr.length % 10 === 0) {
                const remaining = filterWords(bigstr, candidates);
                const bigdog = settings.performance ? remaining : guesses;
                const scoresTmp = [];
                let i = 0;

                const processGuess = async () => {
                    if (i < bigdog.length) {
                        const score = await getScore(bigdog[i], remaining);
                        setChecking(score);
                        scoresTmp.push(score);
                        i++;

                        requestAnimationFrame(processGuess);
                    } else {
                        setScores(scoresTmp);
                    }
                };

                processGuess();
            }
        };

        score();
    }, [bigstr]);

    let spectrum = new Rainbow();
    let count = scores ? scores.length + 1 : 2;
    spectrum.setNumberRange(0, count);
    spectrum.setSpectrum("#13aa13", "#ffff36", "#bd2600");

    if (Array.isArray(scores)) {
        return (
            <div className="word list" style={isMobile? { maxWidth: "100vw" }:{}}>
                {scores
                    .sort((a, b) => b.avgRemoved - a.avgRemoved)
                    .map((word, i) => (
                        <Word
                            word={word.word}
                            key={i}
                            rank={i}
                            color={spectrum.colorAt(i)}
                        />
                    ))}
            </div>
        );
    }
}

function Word({ word, rank, color }) {
    //import rank to color here somehow
    return (
        <div
            className="word"
            key={rank}
            style={{
                fontWeight: 600,
                backgroundColor: "#121212",
                padding: "0 8px",
                width: "fit-content",
                color: "white",
                border: `2px solid #${color}`,
                height: "28px",
                borderRadius: "16px",
                margin: "4px",
                textAlign: "center"
            }}
        >
            {word}
        </div>
    );
}

function WordleHeader() {
    const isMobile = useMediaQuery("(max-width:600px)");
    const { openModal } = useSettings();

    return (
        <>
            <h1 className="wordle-header">
                W<span style={{ color: "#b1a02f" }}>o</span>
                <span style={{ color: "#2f812f" }}>r</span>
                <span style={{ color: "#444444" }}>d</span>leBot
            </h1>
            <div
                className="icons"
                style={isMobile ? { maxWidth: "100vw" } : {}}
            >
                <a href="https://www.github.com/daus-s/wordle">
                    <img
                        src="/GithubLogo.png"
                        alt=""
                        title=""
                        style={{ height: "48px", width: "48px" }}
                    />
                </a>
                <button
                    onClick={openModal}
                    style={{ backgroundColor: "transparent", border: "none" }}
                >
                    <img
                        src="/setting.png"
                        alt=""
                        title=""
                        style={{
                            height: "48px",
                            width: "48px",
                            cursor: "pointer"
                        }}
                    />
                </button>
                <a href="https://raw.githubusercontent.com/daus-s/wordle/main/sgb-words.txt">
                    <img
                        src="/document.png"
                        alt=""
                        title=""
                        style={{ height: "48px", width: "48px" }}
                    />
                </a>
            </div>
        </>
    );
}

function Debug({ bigstr, checking }) {
    const { settings } = useSettings();

    return settings.debug ? (
        <div
            className="debug"
            style={{
                position: "absolute",
                width: "calc(50vh - 210px)",
                padding: "10px",
                right: 0,
                top: "108px"
            }}
        >
            <span style={{ fontWeight: "bold" }}>string buffer:</span>
            <br />
            {bigstr}
            <br />
            <span style={{ fontWeight: "bold" }}>analyzing:</span>
            <br />
            {JSON.stringify(checking, null, 4)}
        </div>
    ) : (
        <></>
    );
}

function EndGameModal({ isOpen, setMV, w, clear }) {
    const isMobile = useMediaQuery("(max-width:600px)");

    const closeWrapper = () => {
        clear("");
        setMV(false);
    };

    if (!winCondition(w) && turns(w) === 6) {
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={closeWrapper}
                contentLabel="Settings Modal"
                style={{
                    content: {
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "black",
                        width: isMobile?"95vw:"420px",
                        height: "fit-content",
                        margin: "auto"
                    },
                    overlay: {
                        backgroundColor: "rgba(0,0,0,.5)"
                    }
                }}
            >
                <h1>You couldn't solve today's Wordle :(</h1>
            </Modal>
        );
    }
    if (!winningWord(w)) {
        return <></>;
    }
    const vals = generateColors("share", winningWord(w).toLowerCase());
    const colors = {
        g: { color: "#2f812f" },
        y: { color: "#b1a02f" },
        b: { color: "#444444" }
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeWrapper}
            contentLabel="Settings Modal"
            style={{
                content: {
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "black",
                    width: isMobile?"95vw:"420px",
                    height: "fit-content",
                    margin: "auto"
                },
                overlay: {
                    backgroundColor: "rgba(0,0,0,.5)"
                }
            }}
        >
            <h1 style={{ fontSize: "20px" }}>
                WordleBot helped you solve todays wordle in {winCondition(w)}{" "}
                turns!
            </h1>
            <div style={{ fontWeight: "bolder" }}>
                <span style={colors[vals[0]]}>S</span>
                <span style={colors[vals[1]]}>h</span>
                <span style={colors[vals[2]]}>a</span>
                <span style={colors[vals[3]]}>r</span>
                <span style={colors[vals[4]]}>e</span>?
            </div>
            <a
                href={`https://twitter.com/intent/tweet?text=www.daus-s.dev%2Fwordle%20helped%20me%20solve%20today%27s%20Wordle%20in%20${turns(
                    w
                )}%20turns!`}
            >
                <img src="/TwitterIcon.png" />
            </a>
        </Modal>
    );
}
