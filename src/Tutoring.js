import "./tutoringstyles.css";
import TutoringHeader from "./TutoringHeader";
import Login from "./Login";
import About from "./About";
import Reviews from "./Reviews";
import ResourceList from "./ResourceList";
import TutorReqForm from "./TutorReqForm";
import Calendar from "./Calendar";
import ViewSelector from "./ViewSelector";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider, useCookies } from "react-cookie";
import { useState, useEffect } from "react";

export default function Tutoring() {
  const [aboutHeight, setAboutHeight] = useState(0);
  const [calendarHeight, setCalendarHeight] = useState(0);
  const [duration, setDuration] = useState(2);
  const [time, setTime] = useState([0,-4]);
  const [login, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies([]);
  const [mode, setMode] = useState('schedule');


  useEffect(() => {
    const aboutElement = document.querySelector(".about");
    if (aboutElement) {
      const aboutRect = aboutElement.getBoundingClientRect();
      setAboutHeight(aboutRect.height);
    }
  }, []);

  useEffect(() => {
    const calendarElement = document.querySelector(".calendar");
    if (calendarElement) {
      const calRect = calendarElement.getBoundingClientRect();
      setCalendarHeight(calRect.height);
    }
  }, []);

  useEffect(() => {
    if (cookies.jwt) {
      setLogin(true);
    }
  }, []);

  const gradientStyle = {
    background: `linear-gradient(to bottom, #000000 ${aboutHeight}px, #ffffff ${aboutHeight+calendarHeight}px)`
  };

  return (
    <CookiesProvider>
      <GoogleOAuthProvider clientId="607389287302-svd75tj30maollaukr8chldblhr4uokn.apps.googleusercontent.com">
        <div className="Tutoring" style={gradientStyle}>
          <TutoringHeader />
          <Login setLogin={setLogin}/>  
          <ViewSelector setMode={setMode}/>

          {mode==='schedule' ? <About /> : ''}

          {mode==='about' ? <Reviews /> : '' }

          {mode==='schedule' ? <Calendar changeDuration={setDuration} setTime={setTime} time={time} login={login}/> : ''}
          {mode==='schedule' ? <TutorReqForm duration={duration} time={time}/> : ''}

          {mode==='resources' ? <ResourceList /> : ''}


        </div>
      </GoogleOAuthProvider>
    </CookiesProvider>
  );
}
