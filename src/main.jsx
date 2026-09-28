import { createRoot } from "react-dom/client";

import App from "./App";
import "./app/globals.css";

// Flag that scripts are alive before React paints, so the styles that start an
// element hidden (collapsed FAQ panels) apply only when something is around to
// bring it back. Without this the page renders fully, unanimated but readable.
document.documentElement.classList.add("js");

createRoot(document.getElementById("root")).render(<App />);
