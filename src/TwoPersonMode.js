export default function TwoPersonMode(props) {
  return (
    <div className="TPM">
      <label className="switch">
        <input
          type="checkbox"
          disabled={props.disabled}
          onChange={props.handleSwitchToggle}
        />
        <span className="slider round"></span>
      </label>
      <p style={props.disabled ? { color: "#eee" } : {}}>2-player Mode</p>
    </div>
  );
}
