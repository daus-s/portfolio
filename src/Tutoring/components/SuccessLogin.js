import jwtDecode from "jwt-decode";
import "../styles/tutoringstyles.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useMediaQuery } from "@mui/material";

export default function SuccessLogin(props) {
    const isMobile = useMediaQuery("(max-width:870px)");
    const [visible, setVisible] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

    const logout = () => {
        removeCookie("jwt");
    };

    const hide = () => {
        setVisible(false);
    };
    const show = () => {
        setVisible(true);
    };

    const doNothing = () => {};

    let user = jwtDecode(props.jwt);

    if (isMobile) {
        return (
            <div>
                <div
                    className="mobileSuccessLogin"
                    style={{ padding: "0px" }}
                    onMouseLeave={hide}
                    onClick={show}
                    onMouseEnter={visible ? show : doNothing}
                >
                    <img
                        src={user.picture} //this wont work on local development because google sends images over https and cannot mix http and https
                        alt={`${user.name}'s profile picture`}
                    />
                </div>
                <div
                    className="logout-container"
                    onMouseEnter={show}
                    onMouseOut={hide}
                    hidden={!visible}
                >
                    <button className="mobileLogout" onClick={logout}>
                        Log out
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div
                    className="successLogin"
                    onMouseLeave={hide}
                    onClick={show}
                    onMouseEnter={visible ? show : doNothing}
                >
                    <div className="text">
                        <div className="greeting">Welcome, {user.name}!</div>
                        <div className="username-email">{user.email}</div>
                    </div>
                    <img
                        src={user.picture}
                        alt={`${user.name}'s profile picture`}
                    />
                </div>
                <div
                    className="logout-container"
                    onMouseEnter={show}
                    onMouseOut={hide}
                    hidden={!visible}
                >
                    <button className="logout" onClick={logout}>
                        Log out
                    </button>
                </div>
            </div>
        );
    }
}
