import Board from "./Board";
import TTTHeader from "./TTTHeader";
import "../styles/tttstyles.css";

export default function TTT() {
  return (
    <div className="TTT">
      <TTTHeader />
      <Board />
    </div>
  );
}
