import "./tutoringstyles.css";
import Days from "./Days.js";
import LeftButton from "./LeftButton";
import RightButton from "./RightButton";
import { useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Legend from "./Legend";


//Calendar element, define a function on press that takes a single parameter Id/key/timestamp, if it’s checked every other box needs to be unchecked. Function unselect.  Pass the function profs.onselect when you click the function is passed from layers above.

const scheduleUrl = "/.netlify/functions/get_schedule";
const personalUrl = "/.netlify/functions/get_personal_schedule";

const mobileContainerStyling = {  
  paddingLeft: "0px", 
  paddingRight: "0px",
  width: '100%',
  alignItems: 'center',
};

const mobileCalendarStying = {
  paddingLeft: "0px", 
  paddingRight: "0px",
  width: 'calc(100% - 10px)',
}

//return length of month
function length(date) {
  let month = date.getUTCMonth();
  let year = date.getUTCFullYear();
  if (month === 0||
      month === 2||
      month === 4||
      month === 6||
      month === 7||
      month === 9||
      month === 11)
  {
    return 31;
  }
  else if (month === 3||
           month === 5||
           month === 8||
           month === 10)
  {
    return 30;
  }
  else if (month === 1)
  {
    if (year%400===0) {
      return 29;
    }
    else if (year%100===0) {
      return 28;
    }
    else if (year%4===0) {
      return 29;
    }
    else {
      return 28;
    }
  }
}

function fillSchedule(arr, obj, strMode) {
  let today = new Date();


  for (const document of obj)
  {
    let start = document.start;
    let startDate = new Date(start);
    let end = document.end;
    let endDate = new Date(end);
    //then get offset
    //consider going over months
    let diff = ((startDate.getUTCMonth()-today.getUTCMonth()) ? length(startDate) : 0);
    let d = startDate.getUTCDate() - today.getUTCDate() - diff;
    //this is our first index [d][calculate]
    let [sh, sm] = [startDate.getUTCHours(), startDate.getUTCMinutes()]; //start hour, start minute
    let [eh, em] = [endDate.getUTCHours(), endDate.getUTCMinutes()];  //end hour, end minute



    let y1 =2*(sh-8)+((sm >= 30) ? 1 : 0); 
    let y2 =2*(eh-8)+((em >= 30) ? 0 : -1); 
    
    if (d >= 0 && d < 14) {
      for (var i = y1 + 1; i < y2; i++) {
        arr[d][i] = strMode === 'personal' ? 'personalBookedMiddle' :'scheduleBookedMiddle' ;
      }
      arr[d][y1] = strMode === 'personal' ? 'personalBookedTop' :'scheduleBookedTop';
      arr[d][y2] = strMode === 'personal' ? 'personalBookedBottom' :'scheduleBookedBottom';
    }
  }

  return arr;
}

function s() {
  const calendar = [];
  for (var i = 0; i < 14; i++) {
    const day = [];
    for (var j = 0; j < 30; j++) {
      day.push('none');
    }
    calendar.push(day);
  }
  return calendar;
}
const getPersonalSchedule = async (jwt) => {
  const res = await fetch(personalUrl + `?jwt=${jwt}`);
  if (res.status==200) {
    const data = await res.json();
    return data;
  }
  else {
    return false;
  }
};

const getSchedule = async() => {
  const res = await fetch(scheduleUrl);
  if (res.ok) {
    const data = await res.json();
    return data;
  } 
  else {
    return false;
  }
};

function durationFn(str) {
  if (str === "dur1") return 2;
  if (str === "dur112") return 3;
  if (str === "dur2") return 4;
}

export default function Calendar(props) {
  const isMobile = useMediaQuery("(max-width:652px)");
  const [selectedOption, setSelectedOption] = useState("dur1");
  const [duration, setDuration] = useState(2);
  const [index, setIndex] = useState(1);
  const [n, setN] = useState(isMobile ? 1 : 5);
  const [schedule, setSchedule] = useState(s());
  const [scheduleLoaded, setScheduleLoaded] = useState(false);
  const [personalLoaded, setPersonalLoaded] = useState(false);
  const [cookies, setCookie] = useCookies(['jwt']);


  const retrieveData = async () => {
    try {
      let s = await getSchedule();
      let filledSchedule = [...schedule];
      if (s && !scheduleLoaded) {
        fillSchedule(filledSchedule, s, 'general');
        setScheduleLoaded(true);
      }
      let p = await getPersonalSchedule(cookies.jwt?cookies.jwt:"undefined");
      if (p && !personalLoaded) {
        fillSchedule(filledSchedule, p, 'personal');
        setPersonalLoaded(true);
      }
      setSchedule(filledSchedule);
    }
    catch (error)
    {
      //call it again no balls
      setScheduleLoaded(false);
      setPersonalLoaded(false);
    } 
  };

  useEffect(() => {
    if (!scheduleLoaded)
      retrieveData();
  }, []);

  useEffect(() => {
    if (!personalLoaded)
      retrieveData();
  }, [props.login, cookies]);

  let today = new Date(); //today is index 0
  let dates = [];

  dates.push(today);
  for (let i = 1; i < 14; ++i) {
    let next = new Date(today);
    next.setDate(next.getDate() + i);
    dates.push(next);
  }


  const [view, setView] = useState(dates.slice(index - 1, index + n + 1));

  function handleRadioChange(event) {
    setSelectedOption(event.target.value);
    setDuration(durationFn(event.target.value));
    props.setTime([0,-4]);
    props.changeDuration(durationFn(event.target.value));
  }

  const handleLeft = () => {
    let temp = Math.max(1, index - 1);
    setIndex(temp);
    setView(dates.slice(temp - 1, temp + n + 1));
  };

  const handleRight = () => {
    let temp = Math.min(13-n, index + 1)
    setIndex(temp);
    setView(dates.slice(temp - 1, temp + n + 1));
    
  };

  return (
    <div className="calendar-container" style={isMobile?{zIndex:"3", ...mobileContainerStyling}:{zIndex:'3'}}>
      <div className="calendar" style={isMobile?mobileCalendarStying:{}}>
        <div className="buttons-container">
          <LeftButton
            onClick={handleLeft}
            style={isMobile ? { left: "calc(16%)" } : { left: "calc(7%)" }}
          />
          <RightButton
            onClick={handleRight}
            style={isMobile ? { right: "calc(16%)" } : { right: "calc(7%)" }}
          />
        </div>
        <Days days={view} duration={duration} time={props.time} setTime={props.setTime} index={index-1} schedule={schedule}/>
        <Legend/>
        <div className="radioDuration">
          <label>
            <input
              type="radio"
              name="option"
              value="dur1"
              onChange={handleRadioChange}
              checked={selectedOption === "dur1"}
            />
            1 Hour
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="dur112"
              onChange={handleRadioChange}
              checked={selectedOption === "dur112"}
            />
            1&#189; Hours
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="dur2"
              onChange={handleRadioChange}
              checked={selectedOption === "dur2"}
            />
            2 Hours
          </label>
        </div>
        <div className="loading" hidden={scheduleLoaded} style={scheduleLoaded ? { "pointerEvents": "none" } : {}}>
          <img src="https://github.com/daus-s/portfolio/blob/main/public/loading-gif.gif?raw=true" alt="loading" hidden={scheduleLoaded}/>
        </div>
      </div>

    </div>
  );
}
