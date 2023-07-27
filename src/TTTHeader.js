import "./styles.css";
import { useMediaQuery } from "@material-ui/core";
import InfoButton from "./InfoButton";

export default function TTTHeader(props) {
  const mobileStyle = props.isMobile
    ? { top: "28px", right: "calc(50% - 92px)" }
    : {};
  const isMobile = useMediaQuery("(max-width:592px)");
  return (
    <div className="title">
      {isMobile ? <h2>Tic-Tac-Toe</h2> : <h1>Tic-Tac-Toe</h1>}
      <InfoButton handle={props.openInfo} style={mobileStyle} />
    </div>
  );
}
