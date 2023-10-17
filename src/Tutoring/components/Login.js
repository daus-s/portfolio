import "../styles/tutoringstyles.css";
import SuccessLogin from "./SuccessLogin";

import { GoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import { useMediaQuery } from "@mui/material";
import jwt_decode from "jwt-decode";

export default function Login(props) {
  const isMobile = useMediaQuery("(max-width:870px)");
  const [cookies, setCookie] = useCookies(['jwt']);

  return (
    <div className="google-login" style={isMobile? {  top: '2px', right: '5px',} : {}}>
      {cookies.jwt ? (<SuccessLogin jwt={cookies.jwt}/>) : (<GoogleLogin
        onSuccess={(credentialResponse) => {
          const jwt = credentialResponse.credential;
          setCookie("jwt", jwt, { path: "/" });
          let info = jwt_decode(jwt);
          props.setLogin(true); //set count vara
        }}
        onError={() => {
          console.error("Login Failed");
        }}
        theme="filled_black"
        type={isMobile ? "icon" : ""}
      />
        )}
    </div>
  );
}
