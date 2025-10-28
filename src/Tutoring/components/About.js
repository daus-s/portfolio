import "../styles/tutoringstyles.css";
import "../styles/about.css";
import React from "react";
import TextBox from "./TextBox";

export default function About(props) {
  return (
    <div className="about">
      <TextBox
        text="My name is Daus Carmichael. I currently teach math for a living, but my true passion is discovering and solving new problems. This is what first drew me to physics and later computer science. I have bachelor's degrees in both Physics and Computer Science from Chapman University."
        title="About Me"
        index={0}
        setGradientStyle={props.setGradientStyle}
      />

      <TextBox
        title="STEM Tutoring Services"
        text={[
          "I provide tutoring in various STEM fields, including but not limited to:",
          <ul style={{ fontWeight: "500" }}>
            <li>Physics</li>
            <li>Mathematics</li>
            <li>Computer Science</li>
            <li>Statistics</li>
            <li>Math-based Business courses</li>
          </ul>,
          "If you don't find your specific subject listed, feel free to reach out!",
        ]}
        index={1}
        setGradientStyle={props.setGradientStyle}
      />

      <TextBox
        text="For tutoring sessions, please reply to the confirmation email with any relevant content, specific chapters, or particular problems. I will thoroughly review the materials and prepare helpful notes along with clear explanations for more challenging concepts. The more information you provide, the more you'll benefit from this service."
        title="Preparation"
        index={2}
        setGradientStyle={props.setGradientStyle}
      />

      <TextBox
        title="Rates"
        text={[
          "High-quality tutoring at competitive rates:",
          <ul>
            <li>
              <b>&#189; Hour</b> - $25 (virtual only)
            </li>
            <li>
              <b>1 Hour</b> - $45
            </li>
            <li>
              <b>1&#189; Hours</b> - $60
            </li>
            <li>
              <b>2 Hours</b> - $75
            </li>
          </ul>,
        ]}
        index={3}
        setGradientStyle={props.setGradientStyle}
      ></TextBox>
    </div>
  );
}
