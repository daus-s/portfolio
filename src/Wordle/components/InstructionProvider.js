import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookies";
import Modal from "react-modal";
import { LetterSquare } from "./GameManager";
import StatefulTextBuffer from "./StatefulTextBuffer";
import { useMediaQuery } from "@mui/material";

function OLD() {
    return (
        <>
            <h1>How to Play the Game</h1>
            <ol>
                <li>
                    <strong>Enter a Word:</strong>
                    <p>
                        Start by entering a word into the input field. For example, type <code>cover</code>.
                    </p>
                </li>
                <li>
                    <strong>Provide Feedback:</strong>
                    <p>
                        After entering the word, you will be asked to provide feedback using the values <code>gyb</code> (Green, Yellow, Black). For example, if the response is <code>gbbby</code>, it
                        means:
                    </p>
                    <ul>
                        <li>
                            <strong>g</strong>: The first letter is correct and in the right position (Green).
                        </li>
                        <li>
                            <strong>b</strong>: The second, third, and fourth letters are incorrect (Black).
                        </li>
                        <li>
                            <strong>y</strong>: The fifth letter is correct but in the wrong position (Yellow).
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Wait for Validation:</strong>
                    <p>The game will not allow you to input invalid data. It will wait for you to press the correct color corresponding to each letter before proceeding.</p>
                </li>
                <li>
                    <strong>Wait for the Game to Think:</strong>
                    <p>
                        After providing feedback, give the game a moment to process. It takes time to analyze and sort the possible words from <strong>most efficient</strong> to{" "}
                        <strong>least efficient</strong> to solve the puzzle.
                    </p>
                </li>
                <li>
                    <strong>Review the Results:</strong>
                    <p>Once the game has finished processing, it will display a list of words sorted by efficiency. Use this list to guide your next move.</p>
                </li>
            </ol>

            <h2>Example</h2>
            <p>Here’s an example of how the game works:</p>
            <ul>
                <li>
                    You enter the word: <code>cover</code>.
                </li>
                <li>
                    The game responds with: <code>gbbby</code>.
                </li>
                <li>
                    You interpret this as:
                    <ul>
                        <li>
                            The first letter <code>c</code> is correct and in the right position (Green).
                        </li>
                        <li>
                            The second, third, and fourth letters (<code>o</code>, <code>v</code>, <code>e</code>) are incorrect (Black).
                        </li>
                        <li>
                            The fifth letter <code>r</code> is correct but in the wrong position (Yellow).
                        </li>
                    </ul>
                </li>
                <li>After providing feedback, the game processes the information and displays a sorted list of words to help you solve the puzzle.</li>
            </ul>

            <p>Enjoy playing the game and solving the puzzle efficiently!</p>
        </>
    );
}

const Instructions = () => {
    return (
        <div className="instructions" style={{ fontSize: 24 }}>
            <h1 style={{ margin: "0", textDecoration: "underline", fontSize: 36 }}>Instructions</h1>
            <p style={{ margin: "0" }}>Enter the word you guessed.</p>
            <p className="instruction">
                Followed with the colors as:
                <br />
                <div style={{ display: "flex" }}>
                    <LetterSquare letter={"g"} value={"g"} />
                    <LetterSquare letter={"y"} value={"y"} />
                    <LetterSquare letter={"b"} value={"b"} />
                </div>
            </p>
        </div>
    );
};

function Tutorial({ setPage, handleAcknowledge }) {
    const [stb, setSTB] = useState("");

    const isMobile = useMediaQuery("(max-width:600px)");

    const trainingWheels = (e) => {
        const val = e.target.value;
        console.log(val);

        const TERM = "gybgyb";

        if (TERM.startsWith(val)) {
            setSTB(val);
        }
        if (val === TERM) {
            handleAcknowledge();
        }
    };

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <StatefulTextBuffer state={stb} setState={(e) => trainingWheels(e)} />
            <BackButton cb={() => setPage("")} />
            <div style={{ display: "flex", margin: "auto" }}>
                <LetterSquare letter={"g"} value={"g"} ghosty={stb.charAt(3) !== "g"} plus={stb.charAt(0) === "g"} />
                <LetterSquare letter={"y"} value={"y"} ghosty={stb.charAt(4) !== "y"} plus={stb.charAt(1) === "y"} />
                <LetterSquare letter={"b"} value={"b"} ghosty={stb.charAt(5) !== "b"} plus={stb.charAt(2) === "b"} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 400 }}>
                {isMobile ? (
                    <>Complete to unlock</>
                ) : (
                    <>
                        Color the letters correctly to unlock WordleBot{" "}
                        <span className="info" title="(Hint: enter gybgyb)">
                            &#9432;
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

function BackButton({ cb }) {
    return (
        <button onClick={cb} className="back-button">
            <span>&#x2190;</span> back
        </button>
    );
}

function InstructionModal({ show, handleAcknowledge }) {
    const [page, setPage] = useState("");

    const isMobile = useMediaQuery("(max-width:600px)");

    const startTutorial = () => {
        setPage("tutorial");
    };

    if (!show) {
        return;
    }

    let elem;

    switch (page) {
        case "":
            elem = (
                <>
                    <Instructions />
                    <div className="button-box">
                        <button onClick={startTutorial}>Tutorial</button>
                        <button onClick={handleAcknowledge}>{isMobile ? "Got it. " : "OK, I get it"}</button>
                    </div>
                </>
            );

            //<span style={{ fontSize: "smaller" }}>(don't show again)</span>
            break;
        case "tutorial":
            elem = <Tutorial setPage={setPage} handleAcknowledge={handleAcknowledge} />;
            break;
    }

    return (
        <Modal
            isOpen={show}
            contentLabel="Settings Modal"
            style={{
                content: {
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "black",
                    height: isMobile ? "fit-content" : "283px",
                    width: isMobile ? "auto" : "420px",
                    margin: "auto",
                    overflow: "hidden",
                },
                overlay: {
                    backgroundColor: "rgba(0,0,0,.5)",
                },
            }}
        >
            {elem}
        </Modal>
    );
}

const InstructionContext = createContext();

export const useTutorial = () => useContext(InstructionContext);

export const InstructionProvider = ({ children }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Check if the cookie exists
        const hasAcknowledged = Cookies.getItem("instructionsAcknowledged");

        console.log(hasAcknowledged);

        if (!hasAcknowledged) {
            setShow(true);
        } else {
            Cookies.setItem("instructionsAcknowledged", "true", { expires: 14 });
            setShow(false);
        }
    }, []);

    const handleAcknowledge = () => {
        // Set a cookie that expires in 2 weeks
        Cookies.setItem("instructionsAcknowledged", "true", { expires: 14 });
        setShow(false);
    };

    return (
        <InstructionContext.Provider value={{ show }}>
            {children}
            <InstructionModal show={show} setShow={setShow} handleAcknowledge={handleAcknowledge} />
        </InstructionContext.Provider>
    );
};
