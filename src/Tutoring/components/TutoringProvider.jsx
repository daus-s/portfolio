import { useEffect } from "react";

export default function TutoringProvider({ children }) {
  useEffect(() => {
    document.title = "Tutoring with Daus";

    //add new tab icon later
  }, []);

  return <>{children}</>;
}
