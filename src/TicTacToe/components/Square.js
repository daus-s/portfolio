import "../styles/tttstyles.css";
import "../styles/square.css";

function borderStyling(n) {
  const borderStyle = "3px solid whitesmoke";

  const styles = {
    1: {
      borderRight: borderStyle,
      borderBottom: borderStyle
    },
    2: {
      borderLeft: borderStyle,
      borderBottom: borderStyle,
      borderRight: borderStyle
    },
    3: {
      borderLeft: borderStyle,
      borderBottom: borderStyle
    },
    4: {
      borderBottom: borderStyle,
      borderRight: borderStyle,
      borderTop: borderStyle
    },
    5: {
      borderLeft: borderStyle,
      borderBottom: borderStyle,
      borderRight: borderStyle,
      borderTop: borderStyle
    },
    6: {
      borderLeft: borderStyle,
      borderBottom: borderStyle,
      borderTop: borderStyle
    },
    7: {
      borderRight: borderStyle,
      borderTop: borderStyle
    },
    8: {
      borderRight: borderStyle,
      borderTop: borderStyle,
      borderLeft: borderStyle
    },
    9: {
      borderTop: borderStyle,
      borderLeft: borderStyle
    }
  };

  return styles[n];
}

function chooseImg(value) {
  if (value === "X") {
    return (
      <img
        alt="X"
        src="https://github.com/daus-s/portfolio/blob/main/x.png?raw=true"
      />
    );
  }
  if (value === "O") {
    return (
      <img
        alt="O"
        src="https://github.com/daus-s/portfolio/blob/main/o.png?raw=true"
      />
    );
  }
  if (value === null) {
    return;
  }
}

export default function Square(props) {
  const handleClick = () => {
    props.onClick();
  };

  const divStyle = {
    ...borderStyling(props.number),
    width: props.square.width,
    height: props.square.height
  };

  return (
    <div className="TTTSquare" style={divStyle} onClick={handleClick}>
      {chooseImg(props.value)}
    </div>
  );
}
