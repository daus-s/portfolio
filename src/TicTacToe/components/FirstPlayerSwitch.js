export default function FirstPlayerSwitch(props) {
  const pstyle = {
    color: props.disabled ? "#eee" : ""
  };

  const cstyle = {
    bottom: props.mobile ? "-10px" : "",
    height: props.mobile ? "110px" : ""
  };

  const sstyle = {
    width: props.mobile ? "40px" : "60px",
    height: props.mobile ? "22.67px" : "34px"
  };

  return (
    <div className="FPS" style={cstyle}>
      <label className="switch" style={sstyle}>
        <input
          type="checkbox"
          disabled={props.disabled}
          onChange={props.handleSwitchToggle}
        />
        <span
          className={props.mobile ? "mobileSlider round" : "slider round"}
          style={sstyle}
        ></span>
      </label>
      <p style={pstyle}>
        {props.mobile ? "Computer 1st player" : "Computer first player"}
      </p>
    </div>
  );
}
