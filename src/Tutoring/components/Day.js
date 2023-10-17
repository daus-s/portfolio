import "../styles/calendar.css";
import HourBlock from "./HourBlock.js";
import { useState, useEffect } from "react";



const styleDict = {
  /*VALID STYLING **************************************** */
  startValidHighlightedTop: {
    backgroundColor: "rgba(102, 255, 102, 0.38)",
    borderTop: "2px solid rgba(0, 150, 0, 1)",
    borderRight: "2px solid rgba(0, 150, 0, 1)",
    borderLeft: "2px solid rgba(0, 150, 0, 1)"
  },
  startValidHighlightedBottom: {
    backgroundColor: "rgba(102, 255, 102, 0.38)",
    borderTop: "2px solid rgba(0, 150, 0, 1)",
    borderRight: "2px solid rgba(0, 150, 0, 1)",
    borderLeft: "2px solid rgba(0, 150, 0, 1)"
  },   
  middleValidHighlightedTop : {
    backgroundColor: "rgba(102, 255, 102, 0.38)",
    borderRight: "2px solid rgba(0, 150, 0, 1)",
    borderBottom: "none",
    borderLeft: "2px solid rgba(0, 150, 0, 1)"
  },
  middleValidHighlightedBottom : {
    backgroundColor: "rgba(102, 255, 102, 0.38)",
    borderTop: "none",
    borderRight: "2px solid rgba(0, 150, 0, 1)",
    borderBottom: "solid #464646 1px",
    borderLeft: "2px solid rgba(0, 150, 0, 1)"
  },
  endValidHighlightedTop: {
    backgroundColor: "rgba(102, 255, 102, 0.38)",
    borderTop: "1px solid #464646",
    borderRight: "2px solid rgba(0, 150, 0, 1)",
    borderBottom: "2px solid rgba(0, 150, 0, 1)",
    borderLeft: "2px solid rgba(0, 150, 0, 1)"
  },
  endValidHighlightedBottom : {
    backgroundColor: "rgba(102, 255, 102, 0.38)",
    borderTop: "none",
    borderRight: "2px solid rgba(0, 150, 0, 1)",
    borderBottom: "2px solid rgba(0, 150, 0, 1)",
    borderLeft: "2px solid rgba(0, 150, 0, 1)"
  },
  /******************************************************* */
  /*INVALID STYLING*************************************** */
  startInvalidHighlightedTop: {
    backgroundColor: "rgba(255, 102, 102, 0.38)",
    borderTop: "2px solid rgba(150, 0, 0, 1)",
    borderRight: "2px solid rgba(150, 0, 0, 1)",
    borderLeft: "2px solid rgba(150, 0, 0, 1)"
  },
  startInvalidHighlightedBottom: {
    backgroundColor: "rgba(255, 102, 102, 0.38)",
    borderTop: "2px solid rgba(150, 0, 0, 1)",
    borderRight: "2px solid rgba(150, 0, 0, 1)",
    borderLeft: "2px solid rgba(150, 0, 0, 1)"
  },   
  middleInvalidHighlightedTop : {
    backgroundColor: "rgba(255, 102, 102, 0.38)",
    borderRight: "2px solid rgba(150, 0, 0, 1)",
    borderBottom: "none",
    borderLeft: "2px solid rgba(150, 0, 0, 1)"
  },
  middleInvalidHighlightedBottom : {
    backgroundColor: "rgba(255, 102, 102, 0.38)",
    borderTop: "none",
    borderRight: "2px solid rgba(150, 0, 0, 1)",
    borderBottom: "solid #464646 1px",
    borderLeft: "2px solid rgba(150, 0, 0, 1)"
  },
  endInvalidHighlightedTop: {
    backgroundColor: "rgba(255, 102, 102, 0.38)",
    borderTop: "1px solid #464646",
    borderRight: "2px solid rgba(150, 0, 0, 1)",
    borderBottom: "2px solid rgba(150, 0, 0, 1)",
    borderLeft: "2px solid rgba(150, 0, 0, 1)"
  },
  endInvalidHighlightedBottom : {
    backgroundColor: "rgba(255, 102, 102, 0.38)",
    borderTop: "none",
    borderRight: "2px solid rgba(150, 0, 0, 1)",
    borderBottom: "2px solid rgba(150, 0, 0, 1)",
    borderLeft: "2px solid rgba(150, 0, 0, 1)"
  },
  /******************************************************* */
  /*GENERAL BOOKED STYLING******************************** */
  scheduleBookedMiddle: {
    backgroundColor: "rgba(166, 166, 166, 1)",
  },
  scheduleBookedTop : {    
    backgroundColor: "rgba(166, 166, 166, 1)",
  },
  scheduleBookedBottom: {
    backgroundColor: "rgba(166, 166, 166, 1)",
  },
  /******************************************************* */
  /*PERSONAL BOOKED STYLING******************************* */
  personalBookedMiddle: {
    backgroundColor: "rgba(21, 137, 255, 1)",
  },
  personalBookedTop : {    
    backgroundColor: "rgba(21, 137, 255, 1)",
  },
  personalBookedBottom: {
    backgroundColor: "rgba(21, 137, 255, 1)",
  },
  startSelectedTop: {
    backgroundColor: "rgba(94, 251, 110, 1)",
    borderTop: "1px solid rgba(14, 171, 30, 1)",
    borderRight: "2px solid rgba(14, 171, 30, 1)",
    borderLeft: "2px solid rgba(14, 171, 30, 1)"
  },
  startSelectedBot: {
    backgroundColor: "rgba(94, 251, 110, 1)",
    borderTop: "2px solid rgba(14, 171, 30, 1)",
    borderRight: "2px solid rgba(14, 171, 30, 1)",
    borderLeft: "2px solid rgba(14, 171, 30, 1)"
  },
  middleSelectedTop: {
    backgroundColor: "rgba(94, 251, 110, 1)",
    borderTop: "1px solid #464646",
    borderRight: "2px solid rgba(14, 171, 30, 1)",
    borderLeft: "2px solid rgba(14, 171, 30, 1)"
  },
  middleSelectedBot: {
    backgroundColor: "rgba(94, 251, 110, 1)",
    borderBottom: "1px solid #464646",
    borderRight: "2px solid rgba(14, 171, 30, 1)",
    borderLeft: "2px solid rgba(14, 171, 30, 1)"
  },
  endSelectedTop: {
    backgroundColor: "rgba(94, 251, 110, 1)",
    borderRight: "2px solid rgba(14, 171, 30, 1)",
    borderLeft: "2px solid rgba(14, 171, 30, 1)",
    borderBottom: "2px solid rgba(14, 171, 30, 1)"

  },
  endSelectedBot: {
    backgroundColor: "rgba(94, 251, 110, 1)",
    borderRight: "2px solid rgba(14, 171, 30, 1)",
    borderLeft: "2px solid rgba(14, 171, 30, 1)"
  },
  none: {}

}

const Weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const Hours = [
  "8:00 AM", //0
  "8:30 AM", //1
  "9:00 AM", //2
  "9:30 AM", //3
  "10:00 AM", //4
  "10:30 AM", //5
  "11:00 AM", //6
  "11:30 AM", //7
  "12:00 PM", //8
  "12:30 PM", //9
  "1:00 PM", //10
  "1:30 PM", //11
  "2:00 PM", //12
  "2:30 PM", //13
  "3:00 PM", //14
  "3:30 PM", //15
  "4:00 PM", //16
  "4:30 PM", //17
  "5:00 PM", //18
  "5:30 PM", //19
  "6:00 PM", //20
  "6:30 PM", //21
  "7:00 PM", //22
  "7:30 PM", //23
  "8:00 PM", //24
  "8:30 PM", //25
  "9:00 PM", //26
  "9:30 PM", //27
  "10:00 PM", //28
  "10:30 PM" //29
];




function validSession([x,y], dur, schedule) {
  const reserved = [];
  for (var i = 0; i < 14; ++i) {
    const row = [];
    for (var j = 0; j < 30; ++j) {
      row.push(!(schedule[i][j] == 'none')); //row is analgous to day
    }
    reserved.push(row)
  }

  if (y+dur > 30) {
    return false;
  }
  else {
    if (dur == 2) {
      return !reserved[x][y] && !reserved[x][y+1];
    }
    if (dur == 3) {
      return !reserved[x][y] && !reserved[x][y+1] && !reserved[x][y+2];
    }
    if (dur == 4) {
      return !reserved[x][y] && !reserved[x][y+1] && !reserved[x][y+2] && !reserved[x][y+3];
    }
  }
}




function style(hour, hoveredIndex, [selectedDay, selectedIndex], duration, day, schedule) {

  if (schedule[day][hour] != 'none')
  {
    return schedule[day][hour];
  }
  //check selected
  if (hour === selectedIndex && selectedDay === day) {
    return hour % 2 ? 'startSelectedBot' : 'startSelectedTop';
  }
  if (hour > selectedIndex && hour < selectedIndex + duration - 1 && selectedDay === day) {
    return hour % 2 ? 'middleSelectedBot' : 'middleSelectedTop';
  }
  if (hour === selectedIndex + duration - 1 && selectedDay === day) {
    return hour % 2 ? 'endSelectedBot' : 'endSelectedTop';
  }
  //check highlighted
  if (hour === hoveredIndex) {
    if (validSession([day, hoveredIndex], duration, schedule)) {
      return hour % 2 ? 'startValidHighlightedBottom' : 'startValidHighlightedTop';
    }
    else {
      return hour % 2 ? 'startInvalidHighlightedBottom' : 'startInvalidHighlightedTop';
    }
  }
  if (hour > hoveredIndex && hour < hoveredIndex + duration - 1) {
    if (validSession([day, hoveredIndex], duration, schedule)) {
      return hour % 2 ? 'middleValidHighlightedBottom' : 'middleValidHighlightedTop';
    } 
    else {
      return hour % 2 ? 'middleInvalidHighlightedBottom' : 'middleInvalidHighlightedTop';
    }
  }
  if (hour === hoveredIndex + duration - 1) {
    if (validSession([day, hoveredIndex], duration, schedule)) {
      return hour % 2 ? 'endValidHighlightedBottom' : 'endValidHighlightedTop';
    }
    else {
      return hour % 2 ? 'endInvalidHighlightedBottom' : 'endInvalidHighlightedTop';
    }
  }
  return 'none';
}



export default function Day(props) {
  const [hoveredIndex, setHoveredIndex] = useState(-4);
  const [selectedIndex, setSelectedIndex] = useState(-4);
  const [styles, setStyles] = useState([]);



  useEffect(()=>{
    setStyles(props.schedule[props.day]);
  }, [])

  useEffect(()=>{
    let styleArr = [...styles]; //create shallow copy of styles
    for (var i = 0; i < 30; ++i) {
      if (i < 30) {
          styleArr[i] = style(i, hoveredIndex, props.time, props.duration, props.day, props.schedule);
      }
    }
    setStyles([...styleArr])
  },[hoveredIndex, props.time, props.phase, props.schedule]);

  const over = (hour) => {
    setHoveredIndex(hour);
  };

  const out = () => {
      setHoveredIndex(-4); //xdd not illegal but -4 is well-chosen
  };

  
  const click = (hour) => {
    if (validSession([props.day, hour], props.duration, props.schedule))
    {
      props.setTime([props.day , hour]);
      setSelectedIndex(hour);
      //set styles
    }
    else {
      //do nothing
    }
  };
  //index mod 2 = 0 -> top
  //index mod 2 = 1 -> bot
  return (
    <div className="day">
      <div className="date-tutoring">
        {Weekday[props.date.getUTCDay()]} <br/>
        {Months[props.date.getUTCMonth()]}  {props.date.getUTCDate()}
      </div>
      <div className="Hours">
        {Hours.map((time, index) => (
          <HourBlock
            key={index}
            time={time}
            index={index}
            over={over}
            out={out}
            click={click}
            style={styleDict[styles[index]]}
          />
        ))}
      </div>
    </div>
  );
}
