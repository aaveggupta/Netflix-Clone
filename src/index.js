import React from "react";
import Reactdom from "react-dom";
import App from "./App";
import "./index.css";

Reactdom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
