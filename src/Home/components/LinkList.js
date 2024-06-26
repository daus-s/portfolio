import "../styles/styles.css";
import "../styles/cardlist.css";
import "../styles/header.css";
import "../styles/linklist.css";
import "../styles/projectcard.css";
import "../styles/spacer.css";

import { useMediaQuery } from "@mui/material";

export default function LinkList() {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <div className="LinkList">
      <a href="/CarmichaelResume.pdf" title="Resume">
        <img
          src="https://github.com/daus-s/portfolio/blob/main/Resume.png?raw=true"
          alt="Icon of resume providing a link to my Resume"
          style={{ height: isSmallScreen ? "15px" : "" }}
        />
      </a>
      <a href="https://twitter.com/CarmichaelDaus" title="Twitter">
        <img
          src="https://github.com/daus-s/portfolio/blob/main/TwitterIcon.png?raw=true"
          alt="Twitter logo providing a link to my twitter account"
          style={{ height: isSmallScreen ? "15px" : "" }}
        />
      </a>
      <a href="https://github.com/daus-s" title="Github">
        <img
          src="https://github.com/daus-s/portfolio/blob/main/GithubLogo.png?raw=true"
          alt="Github Logo providing a link to my github account and all public repositories"
          style={{ height: isSmallScreen ? "15px" : "" }}
        />
      </a>
    </div>
  );
}
