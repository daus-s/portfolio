import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import TTT from "./TTT";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <TTT />
  </StrictMode>
);
