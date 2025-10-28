import "../styles/tutoringstyles.css";
import TutoringHeader from "./TutoringHeader.js";
import Login from "./Login.js";
import About from "./About.js";
import Reviews from "./Reviews.js";
import ResourceList from "./ResourceList.js";
import TutorReqForm from "./TutorReqForm.js";
import TutoringProvider from "./TutoringProvider.js";
import Calendar from "./Calendar.js";
import ViewSelector from "./ViewSelector.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider, useCookies } from "react-cookie";
import { useState, useEffect } from "react";

export default function Tutoring() {
  const [aboutHeight, setAboutHeight] = useState(0);
  const [calendarHeight, setCalendarHeight] = useState(0);
  const [duration, setDuration] = useState(2);
  const [time, setTime] = useState([0, -4]);
  const [login, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies([]);
  const [mode, setMode] = useState("schedule");
  const [gradientStyle, setGradientStyle] = useState({
    background: `linear-gradient(to bottom, #000000 ${126}px, #ffffff ${126}px)`,
  });

  useEffect(() => {
    const aboutElement = document.querySelector(".about");
    const calendarElement = document.querySelector(".calendar");

    if (aboutElement && calendarElement) {
      const aboutRect = aboutElement.getBoundingClientRect();
      const calendarRect = calendarElement.getBoundingClientRect();

      setGradientStyle({
        background: `linear-gradient(to bottom, #000000 ${aboutRect.height + 126}px, #ffffff ${aboutRect.height + calendarRect.height - 90}px)`,
      });
    }
  }, []);

  useEffect(() => {
    if (cookies.jwt) {
      setLogin(true);
    }
  }, []);

  return (
    <CookiesProvider>
      <GoogleOAuthProvider clientId="607389287302-svd75tj30maollaukr8chldblhr4uokn.apps.googleusercontent.com">
        <TutoringProvider>
          <div className="Tutoring">
            <div className="wide">
              <TutoringHeader />
              <Login setLogin={setLogin} />
              <ViewSelector setMode={setMode} />
              {mode === "schedule" ? (
                <About setGradientStyle={setGradientStyle} />
              ) : (
                ""
              )}
            </div>

            {mode === "about" ? <Reviews /> : ""}

            {mode === "schedule" ? (
              <Calendar
                changeDuration={setDuration}
                setTime={setTime}
                time={time}
                login={login}
              />
            ) : (
              ""
            )}
            {mode === "schedule" ? (
              <TutorReqForm duration={duration} time={time} />
            ) : (
              ""
            )}

            {mode === "resources" ? <ResourceList /> : ""}
          </div>
        </TutoringProvider>
      </GoogleOAuthProvider>
    </CookiesProvider>
  );
}
