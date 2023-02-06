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
import * as subSkillsApi from "./utils/subSkillApi.js"
import { render } from "ejs";

export default function App() {
  
  const [subSkill, setSubSkill] = useState('');
  const [user, setUser] = useState(userService.getUser());
  const [subSkills, setSubSkills] = useState([])
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const [skill, setSkill] = useState('')


  


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

  async function handleAddSubSkill(subskill) {
    try {
        console.log(subskill, "<<<<< subskill data IN handleAddSUBSKill")
        // setSkill(updatedSkill)
        const response = await subSkillsApi.create(subskill);
        console.log(response, "++++ handleAddSUBskill RESPONSE")
        setSkill(response.skill)
        getSkills();
        return skill
        
    } catch(err){
        console.log(err, " Error IN THE HANDLEADDsubskill")
    }
    // console.log(skills, " <--- Skills State after ADDsubskill ")
  } // END handleAddSubSkill Function

  async function handleEditSubSkill(subskill) {
    try {
        console.log(subskill, "<<<<< subskill data IN handle EDIT SUBSKill")
        // setSubSkill(updatedSkill)
        const response = await subSkillsApi.update(subskill);
        console.log(response, "++++ EDIT SUBSKILL RESPONSE")
        setSkill(response.skill)
        return skill
        
    } catch(err){
        console.log(err, " Error IN THE HANDLEADDsubskill")
    }
    // console.log(skills, " <--- Skills State after ADDsubskill ")
  } // END handleAddSubSkill Function


  async function getSkills() {
    try {
      const response = await skillsApi.getAll();

      // console.log(response, " <----- getAllSkills response FIRST");
      setSkills(response.data)
      // console.log(response.data, "data")
      // console.log(skills, "skills")
    } catch(err) {
      setError(console.log('^^^^ getSkills Error!!! ^^^^'));
      console.log(err, '<--- getSkills ERROR');
    }
    // console.log(skills, " <--- Skills State AFTER getSkills() ")
  } // END getSkills Function

  async function getSkill(skillName) {
    try {
      
      // console.log(skills, " WHY NOT CHAINGING")
      const response = await skillsApi.getOneSkill(skillName)
      // console.log(response, "<-- getSkillByNameResponse")
      setSkill(response.skillDoc)
      return skill
    } catch(err) {
      console.log(err, "getSkill SINGLE error")
    }
  }

  async function getSubSkills(skillName,subId) {
    try {
      console.log("******************* SHOULD NOT RUNN!!!! **************")
      console.log("******************* SHOULD NOT RUNN!!!! **************")
      console.log("******************* SHOULD NOT RUNN!!!! **************")
      console.log("******************* SHOULD NOT RUNN!!!! **************")

      console.log(skillName, "<SKILL NAME getsubskills")
      const response = await subSkillsApi.getAllSubSkills(skillName,subId)
      console.log(response, "<-- getSubSkill Response")
      // setSubSkills(
        
      //   response.skillDoc.subSkills
      // )
      // return response.skillDoc.subSkills
    } catch(err) {
      console.log(err, "getSkill SINGLE error")
    }
  }

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  function handleLogout() {
    console.log("+++++ SIGNOUT USER +++++")
    userService.logout();
    setUser(null);
  }


  async function assignSkillUser(skill) {
    try {
      const response = await skillsApi.assignUser(user, skill)


    } catch(err) {
      console.log(err, "<--assign Skill error")
    }
  }



  useEffect(() => {
    getSkills();
    
  }, []); 


  if (user) {
    // are we logged in?
    return (
      
      <Routes>
        <Route
          path="/"
          element={<Layout  
            getSkill={getSkill} 
            skill={skill} 
            handleAddSkill={handleAddSkill} 
            allSkills={skills} loggedUser={user} 
            handleLogout={handleLogout} 
            handleDeleteSkill={handleDeleteSkill} 
            getSkills={getSkills}
          />}
        >
          <Route
            index
            element={<LandingPage 
              
              assignSkillUser={assignSkillUser}
              getSkills={getSkills}
              getSkill={getSkill} 
              loggedUser={user} 
              handleLogout={handleLogout} 
              handleAddSkill={handleAddSkill} 
              allSkills = {skills} 
              handleDeleteSkill={handleDeleteSkill}
              handleAddSubSkill={handleAddSubSkill}
            />}
          />
          <Route
            path="/:username"
            element={<Dashboard 
              getSkill={getSkill}
              loggedUser={user} 
              handleLogout={handleLogout} 
              handleAddSkill={handleAddSkill}
              allSkills = {skills} 
              handleDeleteSkill={handleDeleteSkill}
            />}
          />
          <Route
            path="skills/:skillName"
            element={<SkillPage 
              handleAddSubSkill={handleAddSubSkill} 
              skill={skill} 
              allSkills={skills} 
              getSkill={getSkill} 
              getSkills={getSkills}
              loggedUser={user}
              handleAddSkill={handleAddSkill}
              
            />} 
          />
            <Route
              path="skills/:skillName/subskill/:id"
              element={<SubSkillPage 
                subSkills={subSkills}
                getSubSkills={getSubSkills}
                skill={skill}
                allSkills={skills} 
                getSkills={getSkills}
                getSkill={getSkill} 
                loggedUser={user}
                handleAddSubSkill={handleAddSubSkill}
                handleEditSubSkill={handleEditSubSkill}
                />} 
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


