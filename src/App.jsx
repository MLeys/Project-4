import userService from "./utils/userService";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css' // import
import './index.css';


import SignUpPage from "./pages/SignupPage/SignupPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/LoginPage/LoginPage";



function App() {
  const [user, setUser] = useState(userService.getUser())


  function handleSignupOrLogin(){
    setUser(userService.getUser());
  }

  return (
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin}/>} />
      <Route path="/signup" element={<SignUpPage handleSignupOrLogin={handleSignupOrLogin}/>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
