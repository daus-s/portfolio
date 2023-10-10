import "./styles.css";
import "./app.css";
import "./cardlist.css";
import "./data.css";
import "./header.css";
import "./linklist.css";
import "./projectcard.css";
import "./spacer.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home.js";
import TTT from "./TTT.js";
import Tutoring from "./Tutoring.js";

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
