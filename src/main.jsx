import "vite/modulepreload-polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
import 'semantic-ui-css/semantic.min.css' 
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
