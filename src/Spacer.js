import "./styles.css";
import "./app.css";
import "./cardlist.css";
import "./data.css";
import "./header.css";
import "./linklist.css";
import "./projectcard.css";
import "./spacer.css";

export default function Spacer(props) {
  return <div className="Spacer" style={{ height: props.height }} />;
}

Spacer.defaultProps = {
  height: "80px"
};
