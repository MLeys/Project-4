import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import "./App.css";

import SkillPage from "./pages/SkillPage/SkillPage";
import SubSkillPage from "./pages/SubSkillPage/SubSkillPage";
import Layout from "./pages/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import userService from "./utils/userService";
import * as skillsApi from "/src/utils/skillApi.js"
import * as subSkillsApi from "./utils/subSkillApi.js"
import * as youTubeApi from "./utils/youTubeApi.js"
import * as chatGPT3Api from "./utils/chatGPT3Api.js"
import * as resourcesApi from "./utils/resourceApi.js"

export default function App() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(userService.getUser());
  const [skills, setSkills] = useState([]);
  const [allResources, setAllResources] = useState([]);
  const [error, setError] = useState('');
  

  

  async function handleAddResource(data) {
    console.log(`Data(before): ${data}`)
    try {
          
      const response = await resourcesApi.create(data);
      console.log("RESPONSE", response)
      getResources();
      
      getResources();
      // console.log(`Response(addResource (app)): ${response}`)
      // return await response;

    } catch (err) {
      setError(console.log(`***Error in handleAddResource(message): ${err}`))
    }
  }

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
    console.log(`AddSkill(app): ${skill}`)
    try {
      const response = await skillsApi.create(skill);
      setSkills([response.skill, ...skills])
      getSkills();
    } catch(err){
      setError(console.log(`***Error in handle Skill message: ${err}`))
    }
  } 

  async function getResources() {
    console.log("getting resources")
    try {
      const response = await resourcesApi.getAll();
      setAllResources( await response.data)
      

    } catch(err) {
      setError(console.log('^^^^ getSkills Error!!! ^^^^'));
      console.log(err, '<--- getSkills ERROR');
    }

  } // END getSkills Function

  async function handleAddSubSkill(subskill) {
    try {
        console.log(subskill, "<<<<< subskill data IN handleAddSUBSKill")

        const response = await subSkillsApi.create(subskill);
        console.log(response, "++++ handleAddSUBskill RESPONSE")
        getSkills();

        
    } catch(err){
        console.log(err, " Error IN THE HANDLEADDsubskill")
    }
  } // END handleAddSubSkill Function

  async function handleEditSubSkill(subskill) {
    try {
        console.log(subskill, "<<<<< subskill data IN handle EDIT SUBSKill")
        // setSubSkill(updatedSkill)
        const response = await subSkillsApi.update(subskill);
        console.log(response, "++++ EDIT SUBSKILL RESPONSE")
        setSkill(response.skill);
        getSkills();
        // return skill;
        
        
    } catch(err){
        console.log(err, " Error IN THE HANDLEADDsubskill")
    }

  } // END handleAddSubSkill Function

  async function getSkills() {
    try {
      const response = await skillsApi.getAll();
      setSkills( await response.data)
      // getUserSkills();

    } catch(err) {
      setError(console.log('^^^^ getSkills Error!!! ^^^^'));
      console.log(err, '<--- getSkills ERROR');
    }

  } // END getSkills Function

  async function getSkill(skillName) {
    console.log(skillName, "<-getSkill SkillName")
    try {
      const response = await skillsApi.getOneSkill(skillName)
      // console.log(response, "<-- getSkillByNameResponse")
      setSkill(response.skillDoc)
      
      
    } catch(err) {
      console.log(err, "getSkill SINGLE error")
    }
  }

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  function handleLogout() {
    console.log("+++++ SIGNOUT USER +++++")
    navigate('/');
    userService.logout();
    setUser(null);
  }


  async function assignSkillUser(skill) {
    try {
      console.log("ASSIGN SKILL USER")
      const isAssigned = skill.usersAssigned.some(user => user._id === loggedUser._id);
      if (!isAssigned) {
        const response = await skillsApi.assignUser(user, skill._id)
        getSkills();
        
      } else {
        console.log("*** User Already Assigned ***")
      }
      
    } catch(err) {
      console.log(err, "<--assign Skill error")
    }
  }

  async function unAssignSkillUser(skill) {
    try {
      const response = await skillsApi.unAssignUser(user, skill._id)
      getSkills();
      
    } catch(err) {
      console.log(err, "<--unassign Skill error")
    }
    
  }

  async function assignSubUser(subskill) {
    try {
      const response = await skillsApi.assignUser(user, subskill._id)
      getSkills();
    } catch(err) {
      console.log(err, "<--assign Skill error")
    }
  }

  async function unAssignSubUser(subskill) {
    try {
      const response = await skillsApi.unAssignUser(user, subskill._id)
      getSkills();
    } catch(err) {
      console.log(err, "<--unassign Skill error")
    }
  }



  useEffect(() => {
    getSkills();
    getResources();
    // getUserSkills();
    
    // searchYouTube();
    // searchOpenAi("top 5 most important software engineering skills");
    
    
  }, [!skills, !allResources]); 


  if (user) {
    // are we logged in?
    return (
      
      <Routes>
        <Route
          path="/"
          element={<Layout
            unAssignSkillUser={unAssignSkillUser}
            assignSkillUser={assignSkillUser}
            unAssignSubUser={unAssignSkillUser}
            assignSubUser={assignSkillUser}

            getSkill={getSkill} 


            getSkills={getSkills}
            allSkills={skills} 
            
            handleAddSkill={handleAddSkill} 
            handleDeleteSkill={handleDeleteSkill} 

            handleAddSubSkill={handleAddSubSkill}

            allResources={allResources}
            handleAddResource={handleAddResource}
            
            loggedUser={user} 
            handleLogout={handleLogout} 
            
          />}
        >
          <Route
            index
            element={<LandingPage 
              unAssignSkillUser={unAssignSkillUser}
              assignSkillUser={assignSkillUser}
              getSkills={getSkills}
              getSkill={getSkill} 
              loggedUser={user} 
              handleLogout={handleLogout} 
              handleAddSkill={handleAddSkill} 
              allSkills = {skills} 
              handleDeleteSkill={handleDeleteSkill}
              handleAddSubSkill={handleAddSubSkill}

              allResources={allResources}
              handleAddResource={handleAddResource}
            />}
          />          
          <Route
            path="skills/:skillName"
            element={<SkillPage 
              
              unAssignSkillUser={unAssignSkillUser}
              assignSkillUser={assignSkillUser}
              handleAddSubSkill={handleAddSubSkill} 

              allSkills={skills} 
              getSkill={getSkill} 
              getSkills={getSkills}
              loggedUser={user}
              handleAddSkill={handleAddSkill}
              
            />} 
          />
          <Route
            path="/:username"
            element={<DashboardPage 
              unAssignSkillUser={unAssignSkillUser}
              assignSkillUser={assignSkillUser}
              getSkills={getSkills}
              getSkill={getSkill} 
              loggedUser={user} 
              handleLogout={handleLogout} 
              handleAddSkill={handleAddSkill} 
              allSkills = {skills} 
              handleDeleteSkill={handleDeleteSkill}
              handleAddSubSkill={handleAddSubSkill}

              allResources={allResources}
              handleAddResource={handleAddResource}

              // getUserSkills={getUserSkills}
              // userSkills={userSkills}

              
            />}
          />

            <Route
              path="skills/:skillName/subskill/:id"
              element={<SubSkillPage 

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

// async function searchYouTube(search) {
    
//   try {
//     const response = await youTubeApi.searchYouTube(search);
//     console.log(response, " <------ response from YOUTUBE SEARCH");

//   } catch (err) {
//     console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
//   }
// }
// async function searchOpenAi(question) {
  
//   try {
//     const response = await chatGPT3Api.searchOpenAi(question)
//     console.log(response, " <------ response from OPENAI SEARCH");

    
//   } catch (err) {
//     console.log(err.message, " <<<<<OPENAI SEARCH ERROR>>>>>");
//   }
// }

