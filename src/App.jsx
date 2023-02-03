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
import * as skillsApi from "/src/utils/skillApi.js"

export default function App() {

  const [user, setUser] = useState(userService.getUser());
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');


  async function handleDeleteSkill(skillId) {
    try {
      
      const response = await skillsApi.deleteSkill(skillId);
      console.log(response, "<--- DELETE SKILL RESPONSE")
      getSkills();
    } catch (err) {
      console.log(err, "<-------handleDelete skill Error")
    }
  }



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
    let qty = 0;
    try {
      
      const response = await skillsApi.getAll();
      console.log(response, "++++ getSkills ++++++");
      setSkills(response.data)
      console.log(skills)
      
      // console.log(skills, "%%%%%%%%%%%")
      // skills.map((skill) => {
      //   qty = qty + 1
      //   console.log(`Name: ${skill.name} Type: ${skill.type} Q: ${qty}`)
      // })

    } catch(err) {
      setError(console.log('^^^^ getSkills Error!!! ^^^^'));
      console.log(err, '<--- getSkills ERROR');
    }
  } // END getSkills Function

  // useEffect(() => {
  //   //Getting posts, C(R)UD
  //   getSkills();
  //   console.log(skills, " SKILLS HERE!!!!!!!")
    
  // }, []); 



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
          element={<Layout handleAddSkill={handleAddSkill} allSkills = {skills} loggedUser={user} handleLogout={handleLogout} handleDeleteSkill={handleDeleteSkill} />}
        >
          <Route
          index
          element={<LandingPage loggedUser={user} handleLogout={handleLogout} handleAddSkill={handleAddSkill} allSkills = {skills} handleDeleteSkill={handleDeleteSkill}/>}
          />
          <Route
          path="/:username"
          element={<Dashboard loggedUser={user} handleLogout={handleLogout} handleAddSkill={handleAddSkill} allSkills = {skills} handleDeleteSkill={handleDeleteSkill}/>}
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


