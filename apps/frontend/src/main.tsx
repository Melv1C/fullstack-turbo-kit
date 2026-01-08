import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Global app version from root package.json
const appVersion = import.meta.env.VITE_APP_VERSION || "development";
console.log(`App version: ${appVersion}`);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
