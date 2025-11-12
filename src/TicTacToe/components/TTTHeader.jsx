import "../styles/tttstyles.css";
import { useMediaQuery } from "@mui/material";
import InfoButton from "./InfoButton";

export default function TTTHeader(props) {
  const mobileStyle = props.isMobile
    ? { top: "28px", right: "calc(50% - 92px)" }
    : {};
  const isMobile = useMediaQuery("(max-width:592px)");
  return (
    <div className="tttTitle">
      {isMobile ? <h2>Tic-Tac-Toe</h2> : <h1>Tic-Tac-Toe</h1>}
      <InfoButton handle={props.openInfo} style={mobileStyle} />
    </div>
  );
}
