import "../styles/wordle.css";

import { useMediaQuery } from "@mui/material";
import GameManager from "./GameManager";

export default function Wordle({}) {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <div
            className="wordle-bot"
            style={isMobile ? { paddingBottom: "50vh" } : {}} //accommodate keyboard
        >
            <GameManager />
        </div>
    );
}
