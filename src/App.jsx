import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
// import React from 'react';
// import ReactDOM from 'react-dom';

// import './index.css';

import Layout from "./pages/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import userService from "./utils/userService";
import * as skillsApi from "../src/utils/skillApi.js"

export default function App() {

  const [user, setUser] = useState(userService.getUser());
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');


  async function handleAddSkill(skill) {
      try {
          console.log(skill, "<<<<< skill data IN handleAddSKill")
    
          const response = await skillsApi.create(skill);
          console.log(response, "++++ handleAddskill RESPONSE")
  
          setSkills([response.skill, ...skills])
      } catch(err){
          console.log(err, " Error IN THE HANDLEADD")
      }

  } // END handleAddSkill Function

  async function getSkills() {
    try {
      const response = await skillsApi.getAll();
      console.log(response, "++++ getAll Skills RESPONSE *************========");
      setSkills(response.data)

    } catch(err) {
      setError(console.log('^^^^ getSkills Error!!! ^^^^'));
      console.log(err, '<--- getSkills ERROR');
    }
  } // END getSkills Function

  async function getSkills() {
    try {
      const response = await skillsApi.getAll();
      console.log(response, "++++ getAll Skills RESPONSE *************========");
      setSkills(response.data)
      return skills

    } catch(err) {
      setError(console.log('^^^^ getSkills Error!!! ^^^^'));
      console.log(err, '<--- getSkills ERROR');
    }
  } // END getSkills Function

  useEffect(() => {
    //Getting posts, C(R)UD
    getSkills();
    
  }, []); 



  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  function handleLogout() {
    console.log("+++++ SIGNOUT USER +++++")
    userService.logout();
    setUser(null);
  }



  if (user) {
    // are we logged in?
    return (
      
      <Routes>
        <Route
          path="/"
          element={<Layout handleAddSkill={handleAddSkill} allSkills = {skills} loggedUser={user} handleLogout={handleLogout} />}
        >
          <Route
          index
          element={<LandingPage loggedUser={user} handleLogout={handleLogout} />}
          />
          <Route
          path="/:username"
          element={<Dashboard loggedUser={user} handleLogout={handleLogout} />}
          />
        </Route>



        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />

      </Routes>
    );
}

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );


  // return (
  //   <Routes>
  //     <Route path="/" element={<LandingPage loggedUser={user} /> } />
  //     <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
  //     <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
  //     <Route path="/:username" element={<Dashboard />} />
  //   </Routes>
  // );
}


