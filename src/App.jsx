
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css' // import
import './index.css';

import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/LoginPage/LoginPage";

import userService from "./utils/userService";

export default function App() {
  const [user, setUser] = useState(userService.getUser())


  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }


  return (
    <Routes>
      <Route path="/" element={<LandingPage loggedUser={user} /> } />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}


