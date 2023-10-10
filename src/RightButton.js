export default function RightButton(props) {
  return (
    <button className="rb" onClick={props.onClick} style={props.style}>
      <img src="https://github.com/daus-s/portfolio/blob/main/public/right-arrow.png?raw=true" alt="right arrow, use to move schedule towards future days"/>
    </button>
  );
}
