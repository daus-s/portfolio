export default function RightButton(props) {
    return (
        <button className="rb" onClick={props.onClick} style={props.style}>
            <img
                src="/right-arrow.png"
                alt="right arrow, use to move schedule towards future days"
            />
        </button>
    );
}
