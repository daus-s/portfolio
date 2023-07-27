import Board from "./Board";
import TTTHeader from "./TTTHeader";
import "./tttstyles.css";

export default function TTT() {
  return (
    <div className="App">
      <TTTHeader />
      <Board />
    </div>
  );
}
