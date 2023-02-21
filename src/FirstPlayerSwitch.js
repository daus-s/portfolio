export default function FirstPlayerSwitch(props) {
  return (
    <div className="FPS">
      <label className="switch">
        <input
          type="checkbox"
          disabled={props.disabled}
          onChange={props.handleSwitchToggle}
        />
        <span className="slider round"></span>
      </label>
      <p style={props.disabled ? { color: "#eee" } : {}}>
        Computer first player
      </p>
    </div>
  );
}
