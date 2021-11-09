import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { App } from "./App";
import { AppProvider } from "./context/context";
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
