import "./tutoringstyles.css";
import "./form.css";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { GoogleLogin } from "@react-oauth/google";
import { useMediaQuery } from "@mui/material";



Modal.setAppElement("#root");

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const modalStyles = {
    content: {
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      padding: '20px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      backgroundColor: "rgba(0,0,0,.95)",
      color: '#f8f8f8',
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
      padding: '20px 60px 20px 60px',
    }
};

const url = "/.netlify/functions/submit_form"

function eventString(date) {
  date = new Date(date);

  return `${weekdays[date.getUTCDay()]} ${date.getUTCMonth()}/${date.getUTCDate()} ${date.getUTCHours()%12}:${date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()} ${date.getUTCHours()>12?'PM':'AM'}`;

}


//return the start and end of the selected section
function generateDateTimeTuple([day, hour], dur) { //analagous to x,-y (looking in -z direction)
  let today = new Date();
  let start = today;

  start.setUTCDate(today.getUTCDate() + day);
  start.setUTCMilliseconds(0);
  start.setMinutes(30*hour%2);
  start.setUTCHours(8+(hour-hour%2)/2);
  start.setSeconds(0);

  const end = new Date(start);
  if (dur == 2 || dur == 4) {
    let hours = start.getUTCHours() + dur/2;
    end.setUTCHours(hours);
  }
  else if (dur == 3) {
    if (start.getUTCMinutes() >= 30) {
      end.setUTCHours(start.getUTCHours() + 2);
      end.setUTCMinutes(start.getUTCMinutes() - 30);
    }
    else {
      end.setUTCHours(start.getUTCHours() + 1);
      end.setUTCMinutes(start.getUTCMinutes() + 30);
    }
  }
  return [start, end];
}


function TutorReqForm(props) {
  //usemediaquery
  const isMobile = useMediaQuery('(max-width:870px)');
  // *_s represents state variable
  const [name_s, setName_s] = useState("");
  const [email_s, setEmail_s] = useState("");
  const [course, setCourse] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [start_s, setStart_s] = useState(new Date("1/1/1970 00:00 AM"));
  const [end_s, setEnd_s] = useState(new Date("1/1/1970 00:00 AM"));
  const [submission, setSubmission] = useState({});

  //modal states
  const [submissionModalStatus, setSubmissionModalStatus] = useState(false);
  const [loginModalStatus, setLoginModalStatus] = useState(false);

  function closeSubmissionModal() {
    setSubmissionModalStatus(false);
    setSubmission({});
  }
  function openSubmissionModal() {
    setSubmissionModalStatus(true);
  };

  function closeLoginModal() {
    setLoginModalStatus(false);
  }
  function openLoginModal() {
    setLoginModalStatus(true);
  };


  const [cookies, setCookie] = useCookies(['jwt']);

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  useEffect(() => {
    if (cookies.jwt) {
      if (loginModalStatus)
      {
        document.getElementById("submitbutton").click();
      }
      setLoginModalStatus(false);
    }
    
  }, [cookies.jwt])

  const  handleSubmit = async (event) => {
    let holder = 0;
    let name = cookies.jwt ? jwt_decode(cookies.jwt).name : ""; //leaves empty fields blank
    let email = cookies.jwt ? jwt_decode(cookies.jwt).email : "";
    console.log('trying to submit');
    holder= 1;
    //here check if user is logged in if not prompt to log in with modal, then do submit
    if (!cookies.jwt)
    {
      event.preventDefault();
      openLoginModal();
    } 
    else {
      let [start, end] = generateDateTimeTuple(props.time, props.duration);
      const data = {
        name: name,
        email: email,
        course: course,
        location: location,
        desc: desc, 
        start: start,
        end: end
      };
      setStart_s(start);
      setEnd_s(end);
      setName_s(name);
      setEmail_s(email);
      event.preventDefault();
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });     
      openSubmissionModal(); //open modal after post method 
      //clear form
      setSubmission({course: course, desc: desc, location: location})
      setCourse("");
      setDesc("");
      setLocation("");
    }
  };
  

  return (
    <div id="tutorReqForm" style={{zIndex : "4", width:'100%'}}>
      <Modal isOpen={submissionModalStatus} style={modalStyles}>
        <button className="modalClose" onClick={closeSubmissionModal}>
          <img src="https://github.com/daus-s/portfolio/blob/main/public/close.png?raw=true" alt="close button"/>
        </button>
        <h3>Your submission was received!</h3> 
        <ul>
          <li>Name: {name_s}</li>
          <li>Email: {email_s}</li>
          <li>Location: {submission.location}</li>
          <li>Course: {submission.course} </li>
          <li>About: {submission.desc} </li>
          <li>Start time: {eventString(start_s)}</li>
          <li>End time: {eventString(end_s)}</li>
        </ul>
        <p>You will receive an email letting you know if your appointment is scheduled. Thank you!</p>
      </Modal>
      <Modal isOpen={loginModalStatus} style={modalStyles}>
        <button className="modalClose" onClick={closeLoginModal}>
          <img src="https://github.com/daus-s/portfolio/blob/main/public/close.png?raw=true" alt="close button"/>
        </button>
        <GoogleLogin
        onSuccess={(credentialResponse) => {
          const jwt = credentialResponse.credential;
          setCookie("jwt", jwt, { path: "/" });
        }}
        onError={() => {
          console.error("Login Failed");
        }}
        theme="filled_black"
        />
      </Modal>
      <form onSubmit={handleSubmit} className="form" id="tutoringrequestform">
        <label className="course">
          <div className="ct"> What course are you working on? </div>
          <input
            type="text"
            value={course}
            onChange={handleCourseChange}
            required
            placeholder="e.g. Physics 201"
          />
        </label>
        <label className="location">
          <div className="lt"> Where would you like to meet? </div>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            required
            placeholder="Address, City ST"
          />
        </label>
        <label className="desc">
          <div className="dt">
            What would you like to focus on?
          </div>
          <textarea 
            value={desc} 
            onChange={handleDescChange} 
            spellCheck="true" 
            placeholder="Provide a brief description of the content you'd like to go over."/>
        </label>

        {cookies.jwt ? <button id="submitbutton" type="submit" value="Submit" disabled={props.time[0] === 0 && props.time[1] === -4} style={isMobile?{paddingLeft: '0px', paddingRight: '0px'}:{}}>Submit</button>: <button className="fakebutton" onClick={openLoginModal} disabled={props.time[0] === 0 && props.time[1] === -4} style={isMobile?{paddingLeft: '0px', paddingRight: '0px'}:{}}>Submit</button>}
      </form>
    </div>
  );
}

export default TutorReqForm;
