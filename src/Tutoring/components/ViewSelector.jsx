import React, { useState } from 'react';
import '../styles//tutoringstyles.css';

export default function OptionSelector(props) {
  const [selectedOption, setSelectedOption] = useState('schedule');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    props.setMode(event.target.value);
  };

  return (
    <div className="radioView">
      <label style={selectedOption === "schedule" ? {fontWeight: "600"} : {fontWeight: "200"}}>
        <input 
          type="radio" 
          value="schedule" 
          checked={selectedOption === "schedule"} 
          onChange={handleOptionChange}
        />
        Schedule
      </label>
      <label style={selectedOption === "about" ? {fontWeight: "600"} : {fontWeight: "200"}} >
        <input 
          type="radio" 
          value="about" 
          checked={selectedOption === "about"} 
          onChange={handleOptionChange} 
        />
        Reviews
      </label>
      <label style={selectedOption === "resources" ? {fontWeight: "600"} : {fontWeight: "200"}}>
        <input 
          type="radio" 
          value="resources" 
          checked={selectedOption === "resources"} 
          onChange={handleOptionChange} 
        />
        Resources
      </label>
    </div>
  );
}
