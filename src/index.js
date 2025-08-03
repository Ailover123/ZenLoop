import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TimerProvider } from "./context/TimerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TimerProvider>
    <App />
  </TimerProvider>
);
