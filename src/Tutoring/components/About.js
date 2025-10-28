import "../styles/tutoringstyles.css";
import "../styles/about.css";
import React from "react";
import TextBox from "./TextBox";

export default function About(props) {
  return (
    <div className="about">
      <TextBox
        text="My name is Daus Carmichael, and I provide virtual or in-person tutoring in various STEM fields, including but not limited to:"
        title="About Daus"
        index={0}
        setGradientStyle={props.setGradientStyle}
      />

      <TextBox
        text="Daus provides tutoring in various STEM fields, including but not limited to: Physics, Mathematics, Computer Science, Statistics, math-based Business courses, and more. If you don't find your specific subject listed, but would still like to request an appointment, feel free to do so!"
        title="STEM Tutoring Services"
        index={1}
        setGradientStyle={props.setGradientStyle}
      />

      <TextBox
        text="For tutoring sessions, please reply to the confirmation email with any relevant content, specific chapters, or particular problems. Daus will thoroughly review the materials and prepare helpful notes along with clear explanations for more challenging concepts. The more information you provide, the more you'll benefit from this service."
        title="Preparation"
        index={2}
        setGradientStyle={props.setGradientStyle}
      />

      <TextBox
        text='Sessions can be conducted in-person or virtually. For virtual appointments, simply fill out the location field with "Zoom" or "Virtual", and we will schedule accordingly.'
        title="Virtual and In-Person Options"
        index={3}
        setGradientStyle={props.setGradientStyle}
      ></TextBox>

      <TextBox
        text={[
          "Daus provides high-quality tutoring at competitive rates:",
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
        title="Rates"
        index={4}
        setGradientStyle={props.setGradientStyle}
      ></TextBox>
    </div>
  );
}
