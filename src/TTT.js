import Board from "./Board";
import TTTHeader from "./TTTHeader";
import "./styles.css";

export default function TTT() {
  return (
    <div className="App">
      <TTTHeader />
      <Board />
    </div>
  );
}
