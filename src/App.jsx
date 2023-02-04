import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
// import React from 'react';
// import ReactDOM from 'react-dom';

// import './index.css';

import SkillPage from "./pages/SkillPage/SkillPage";
import SubSkillPage from "./pages/SubSkillPage/SubSkillPage";
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
  const [skill, setSkill] = useState({})


  async function handleDeleteSkill(skillId) {
    try {
      
      const response = await skillsApi.deleteSkill(skillId);
      console.log(response, "<--- DELETE SKILL RESPONSE")
      setSkills(skills.filter((skill) => {
        return skill._id !== skillId
      }))
      
    } catch (err) {
      console.log(err, "<-------handleDelete skill Error")
    }
  }


  async function handleAddSkill(skill) {
      try {
          // console.log(skill, "<<<<< skill data IN handleAddSKill")
    
          const response = await skillsApi.create(skill);
          // console.log(response, "++++ handleAddskill RESPONSE")
          setSkills([response.skill, ...skills])
      } catch(err){
          console.log(err, " Error IN THE HANDLEADD")
      }
      console.log(skills, " <--- Skills State after ADDskill ")
  } // END handleAddSkill Function

  async function getSkills() {
    try {
      const response = await skillsApi.getAll();
      // console.log(response, " <----- getAllSkills Response from Api");
      setSkills(response.data)

    } catch(err) {
      setError(console.log('^^^^ getSkills Error!!! ^^^^'));
      console.log(err, '<--- getSkills ERROR');
    }
    // console.log(skills, " <--- Skills State AFTER getSkills() ")
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

  async function getSkill(skillId) {
    const skillName = skillId.name;
    try {
        const response = await skillsApi.getSkill(skillName);
        // console.log(response.skillDoc, "<--- getSkill REsponse")
        const skillData = response.skillDoc
        setSkill({skillData})
        console.log(skill, "<--- Skill State")
        

    } catch(err) {
        console.log(err, "<--- getSkill SINGLE error")
    }
    
}



  if (user) {
    // are we logged in?
    return (
      
      <Routes>
        <Route
          path="/"
          element={<Layout getSkill={getSkill} skill={skill} handleAddSkill={handleAddSkill} allSkills={skills} loggedUser={user} handleLogout={handleLogout} handleDeleteSkill={handleDeleteSkill} />}
        >
          <Route
          index
          element={<LandingPage getSkill={getSkill} loggedUser={user} handleLogout={handleLogout} handleAddSkill={handleAddSkill} allSkills = {skills} handleDeleteSkill={handleDeleteSkill}/>}
          />
          <Route
          path="/:username"
          element={<Dashboard getSkill={getSkill} loggedUser={user} handleLogout={handleLogout} handleAddSkill={handleAddSkill} allSkills = {skills} handleDeleteSkill={handleDeleteSkill}/>}
          />
          <Route
          path="skills/:skillName"
          element={<SkillPage skill={skill} getSkill={getSkill} loggedUser={user}/>} 
          />
          <Route
          path="skills/:skillName/subSkill"
          element={<SubSkillPage getSkill={getSkill} loggedUser={user}/>} 
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


