import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookies";
import Modal from "react-modal";

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
        <div
            style={{
                fontFamily: "Arial",
                color: "whitesmoke",
            }}
        >
            <p>Enter your guess</p>
            <p className="instruction">
                Followed by your output as <code style={{ color: "#2f812f", fontSize: 18 }}>g</code> <code style={{ color: "#ddd", fontSize: 18 }}>b</code> or{" "}
                <code style={{ color: "#b1a02f", fontSize: 18 }}>y</code> for each color:
            </p>
            <div>{/* <InstructionSquare /> */}</div>
        </div>
    );
};

function InstructionModal({ show, setShow, handleAcknowledge }) {
    if (show) {
        return (
            <Modal
                isOpen={show}
                onRequestClose={() => setShow(false)}
                contentLabel="Settings Modal"
                style={{
                    content: {
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "black",
                        width: "420px",
                        height: "80vh",
                        margin: "0 auto",
                        overflow: "hidden auto",
                    },
                    overlay: {
                        backgroundColor: "rgba(0,0,0,.5)",
                    },
                }}
            >
                <Instructions />
                <button onClick={() => setShow(false)}>OK</button>
                <button onClick={handleAcknowledge}>OK, I get it (don't show again)</button>
            </Modal>
        );
    } else {
    }
}

const InstructionContext = createContext();

export const useTutorial = () => useContext(InstructionContext);

export const InstructionProvider = ({ children }) => {
    const [show, setShow] = useState(true);
    // const [slide, setSlide] = useState();

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
        <>
            {children}
            <InstructionModal show={show} setShow={setShow} handleAcknowledge={handleAcknowledge} />
        </>
    );
};
