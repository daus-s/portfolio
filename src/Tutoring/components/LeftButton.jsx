import "../styles/tutoringstyles.css";
import "../styles/calendar.css";

export default function LeftButton(props) {
    return (
        <button className="lb" onClick={props.onClick} style={props.style}>
            <img
                src="/left-arrow.png"
                alt="left arrow, use to move schedule towards current date"
            />
        </button>
    );
}
