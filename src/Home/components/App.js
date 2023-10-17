import "../styles/styles.css"; //good
import "../styles/cardlist.css"; //good
import "../styles/header.css"; //good
import "../styles/linklist.css"; //good
import "../styles/projectcard.css"; //good
import "../styles/spacer.css"; //good

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home.js";
import TTT from "../../TicTacToe/components/TTT.js";
import Tutoring from "../../Tutoring/components/Tutoring.js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/tictactoe" element={<TTT/>} />
        <Route path="/tutoring" element={<Tutoring/>}/>
      </Routes>
    </Router>
  );
}
