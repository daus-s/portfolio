import "./styles.css";
import "./app.css";
import "./cardlist.css";
import "./data.css";
import "./header.css";
import "./linklist.css";
import "./projectcard.css";
import "./spacer.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import CardList from "./CardList";
import LinkList from "./LinkList";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <LinkList />
        <CardList />
      </div>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/tictactoe" element={<TTT />} />
      </Routes>
    </Router>
  );
}
