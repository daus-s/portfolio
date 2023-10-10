import "./calendar.css";


export default function HourBlock(props) { 
  return (
    <div
      className={props.index % 2 ? "bot-t hour" : "top-t hour"}
      onMouseEnter={() => props.over(props.index)}
      onMouseLeave={() => props.out()}
      onClick={() => props.click(props.index)}
      style={props.style}
    >
      {props.time}
    </div>
  );
}
