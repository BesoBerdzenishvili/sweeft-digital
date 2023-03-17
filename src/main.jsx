import React from "react";
import ReactDOM from "react-dom/client";
import { globalStyles } from "./stitches.config";
import App from "./App";
import "./index.css";

globalStyles();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
