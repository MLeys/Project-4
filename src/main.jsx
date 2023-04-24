import "vite/modulepreload-polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import userService from "./utils/userService";
import mainTheme from "./themes/mainTheme";

import { ThemeProvider } from "@mui/material/styles";

import { SkillsProvider } from "./context/SkillsContext/SkillsContext";
const user = userService.getUser()
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={mainTheme}>
        <SkillsProvider loggedUser={user}>
          <App />
        </SkillsProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
