import Day from "./Day.js";
import { useMediaQuery } from "@mui/material";
import "../styles/calendar.css";

export default function Days(props) {
  const isMobile = useMediaQuery("(max-width:600px)");



  return (
    <div
      className="days"
      style={
        isMobile
          ? { gridTemplateColumns: "repeat(3, 1fr)" }
          : { gridTemplateColumns: "repeat(7, 1fr)" }
      }
    >
      <div className="leftcover" style={isMobile ? { width: "calc(33.33% + 12.33px)" }: { width: "calc(14.28% + 4.71px)" } }>
        <img
          src="https://raw.githubusercontent.com/daus-s/portfolio/main/public/leftcolumn.PNG"
          alt="cover that is gradient black to white"
          className="cover"
        />
      </div>
      {props.days.map((date, index) => (
        <Day key={index} date={date} duration={props.duration} time={props.time} setTime={props.setTime} day={props.index + index} schedule={props.schedule} phase={props.index}/>
      ))}
      <div className="rightcover" style={isMobile ? { width: "calc(33.33% + 12.33px)" }: { width: "calc(14.28% + 4.71px)" }}>
        <img
          src="https://raw.githubusercontent.com/daus-s/portfolio/main/public/rightcolumn.PNG"
          alt="cover that is gradient black to white"
          className="cover"
        />
      </div>
    </div>
  );
}
