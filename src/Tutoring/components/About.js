import "../styles/tutoringstyles.css";
import "../styles/about.css";
import React from 'react';
import HoverText from "./HoverText";

export default function About(props) {
  return (
    <div className="about">
        
        <HoverText text="Daus provides tutoring in various STEM fields, including but not limited to: Physics, Mathematics, Computer Science, Statistics, math-based Business courses, and more. If you don't find your specific subject listed, but would still like to request an appointment, feel free to do so!" title="STEM Tutoring Services" index={0}  setGradientStyle={props.setGradientStyle}/>
        
        <HoverText text="For tutoring sessions, please reply to the confirmation email with any relevant content, specific chapters, or particular problems. Daus will thoroughly review the materials and prepare helpful notes along with clear explanations for more challenging concepts. The more information you provide, the more you'll benefit from this service." title="Preparation" index={1} setGradientStyle={props.setGradientStyle}/>
        
        <HoverText text='Sessions can be conducted in-person or virtually. For virtual appointments, simply fill out the location field with "Zoom" or "Virtual", and we will schedule accordingly.' title="Virtual and In-Person Options" index={2} setGradientStyle={props.setGradientStyle}></HoverText>
        
        <HoverText text={['Daus provides high-quality tutoring at competitive rates:',  <ul><li>1 Hour - $40</li><li>1&#189; Hours - 50$</li><li>2 Hours - 60$</li></ul>, ]} title='Rates' index={3} setGradientStyle={props.setGradientStyle}></HoverText>
        
    </div>
  );
}
