import "../styles/spacer.css";

export default function Spacer(props) {
  return <div className="Spacer" style={{ height: props.height }} />;
}

Spacer.defaultProps = {
  height: "80px"
};
