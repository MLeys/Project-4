import "vite/modulepreload-polyfill";
import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import mainTheme from "./themes/mainTheme";

import { ThemeProvider } from "@mui/material/styles";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={mainTheme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
