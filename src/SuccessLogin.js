import jwtDecode from "jwt-decode";
import "./tutoringstyles.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useMediaQuery } from "@mui/material";



export default function SuccessLogin(props) {
    const isMobile = useMediaQuery('(max-width:870px)');
    const [visible, setVisible] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const logout = () => {
        removeCookie('jwt');
    };

    const hide = () => {
        setVisible(false);
    }
    const show = () => {
        setVisible(true);
    };

    const doNothing = () => {};

    let info = jwtDecode(props.jwt);
    let name = info.name;
    let email = info.email;
    let src = info.picture;
    if (isMobile)
    {        
    return (
        <div> 
            <div className="mobileSuccessLogin" style={{padding: '0px'}} onMouseLeave={hide} onClick={show} onMouseEnter={visible ? show : doNothing}>
                <img src={src} alt={`${name}'s profile picture`}/>
            </div>
            <div className="logout-container" onMouseEnter={show} onMouseOut={hide} hidden={!visible}>
                <button className="mobileLogout" onClick={logout}>Log out</button>
            </div>
        </div>);}
    else {
    return (
        <div> 
            <div className="successLogin" onMouseLeave={hide} onClick={show} onMouseEnter={visible ? show : doNothing}>
                <div className="text">
                    <div className="greeting">Welcome, {name}!</div> 
                    <div className="username-email">{email}</div> 
                </div>
                <img src={src} alt={`${name}'s profile picture`}/>
            </div>
            <div className="logout-container" onMouseEnter={show} onMouseOut={hide} hidden={!visible}>
              <button className="logout" onClick={logout}>Log out</button>
          </div>
        </div>);
    }
}