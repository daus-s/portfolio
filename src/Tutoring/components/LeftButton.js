import "../styles/tutoringstyles.css";
import "../styles/calendar.css";

export default function LeftButton(props) {
  return (
    <button className="lb" onClick={props.onClick} style={props.style}>
      <img src="https://github.com/daus-s/portfolio/blob/main/public/left-arrow.png?raw=true" alt="left arrow, use to move schedule towards current date"/>
    </button>
  );
}
