import { useEffect, useState, useContext, useReducer } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useImmerReducer} from 'use-immer';

import "./App.css";

import SkillsReducer from "./reducers/SkillsReducer";

import { SkillsContext, SkillsDispatchContext } from './context/SkillsContext/SkillsContext.jsx';


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
  const [error, setError] = useState('');
  const [user, setUser] = useState(userService.getUser());
  const [skills, dispatch] = useImmerReducer(SkillsReducer, null)
  const [userSkills, setUserSkills] = useState([])
  const [activeSkillIndex, setActiveSkillIndex] = useState(-1)
  const [resources, setResources] = useState([]);

  
  
  function getUserSkills() {
    setUserSkills(skills?.filter(skill => skill.usersAssigned.some(u => u._id === user._id)))
  }

  function handleSetActiveSkillIndex(index){
    setActiveSkillIndex(index)
    console.log(`Active Skill Index: ${index}`)
  }


  async function handleCreateSkill(data) {
    try {
      const response = await skillsApi.create(data);
      dispatch({
        type: 'createSkill',
        data: response.skill,
      })
    } catch(err){
      setError(console.log(`*** Error CREATE SKILL ****\n ${err}`))
    }
    console.log(skills, "<<<<<< skills")
  } 

  async function getSkills() {
    try {
      const response = await skillsApi.getAll();
      dispatch({
        type: 'readSkills',
        data: response.data //COULD BE .skills *****
      })
      // console.log(skills, "_<<< updated skills hook handleget")
      getUserSkills();
    } catch (err) {
      setError(console.log(`*** Error READ SKILL ****\n ${err}`))
    }
    console.log(skills, "End of getSkills")
  }


  async function handleDeleteSkill(skillId) {
    try {
      const skillIndex = skills.findIndex((skill) => skill._id === skillId)
      const response = await skillsApi.deleteSkill(skillId);
      dispatch({
        type: 'deleteSkill',
        id: skillId,
        index: skillIndex,
      })
    } catch (err) {
      setError(console.log(`*** Error DELETE SKILL ****\n ${err}`))

    }
  }
  async function assignSkillUser(skill) {
    try {
      const index = skills?.findIndex((s) => s._id === skill._id)
      if (!skills[index].usersAssigned.some(u => u._id === user._id)) {
        const response = await skillsApi.assignUser(user, skill._id);
        console.log(response, "assign skill response")
        dispatch({
          type: 'assignSkill',
          user: user,
          index: index
        })
        getSkills();
        getUserSkills();
      } else {
        console.log(`${user.username} already assigned to skill( ${skills[index].name})`)
      }
    } catch (err) {
      setError(console.log(`*** Error Assign SKILL ****\n ${err}`))
    }
  }

  async function unAssignSkillUser(skill) {
    try {
      const skillIndex = skills?.findIndex((s) => s._id === skill._id)
      if (skills[skillIndex].usersAssigned.some(u => u._id === user._id)) {
        const userAssignedIndex = skills[skillIndex].usersAssigned?.findIndex((u) => u._id === user._id)
        const response = await skillsApi.unAssignUser(user, skill._id);
        console.log(response, "unassign skill response")
        dispatch({
          type: 'unAssignSkill',
          userIndex: userAssignedIndex,
          skillIndex: skillIndex
        })
        getSkills();
        getUserSkills();
      } else {
        console.log(`${user.username} Not alaready Assigned to skill( ${skills[index].name})`)
      }
    } catch (err) {
      setError(console.log(`*** Error UNAssign SKILL ****\n ${err}`))
    }
  }



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

  async function getResources() {
    console.log("getting resources")
    try {
      const response = await resourcesApi.getAll();
      setResources( await response.data)
      

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


  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  function handleLogout() {
    console.log("+++++ SIGNOUT USER +++++")
    navigate('/');
    userService.logout();
    setUser(null);
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
  async function handleAddSkill(skill) {
    try {
      const response = await skillsApi.create(skill);
      setSkills([response.skill, ...skills])
      getSkills();
    } catch(err){
      setError(console.log(`***Error in handle Skill message: ${err}`))
    }
  } 


  useEffect(() => {
    getSkills();
    getResources();    
  }, [!skills]); 


  if (user) {

    return (
      <SkillsContext.Provider 
        value={{
          loggedUser: user,
          skills: skills,
          createSkill: handleCreateSkill,
          getSkills: getSkills,
          deleteSkill: handleDeleteSkill,
          assignSkillUser: assignSkillUser,
          unAssignSkillUser: unAssignSkillUser, 
          handleSetActiveSkillIndex: handleSetActiveSkillIndex,
          activeSkillIndex: activeSkillIndex,
          userSkills: userSkills,


          
      }}>
        <SkillsDispatchContext.Provider value={dispatch}>
          <Routes>
            <Route path="/" element={ <Layout handleLogout={handleLogout} /> }>
              <Route
                index
                element={<LandingPage  handleAddSubSkill={handleAddSubSkill} allResources={resources} handleAddResource={handleAddResource}/>}
              />          
              <Route path="skills/:skillName" element={<SkillPage  handleAddSubSkill={handleAddSubSkill} />} />
              <Route path="/:username" element={<DashboardPage handleAddSubSkill={handleAddSubSkill}allResources={resources} handleAddResource={handleAddResource}/>}/>
                <Route path="skills/:skillName/subskill/:id" element={<SubSkillPage handleEditSubSkill={handleEditSubSkill} />} />
            </Route>
            <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
            <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          </Routes>
        </SkillsDispatchContext.Provider>
      </SkillsContext.Provider>
    );
  };
  
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
}

// async function searchOpenAi(question) {
  
//   try {
//     const response = await chatGPT3Api.searchOpenAi(question)
//     console.log(response, " <------ response from OPENAI SEARCH");

    
//   } catch (err) {
//     console.log(err.message, " <<<<<OPENAI SEARCH ERROR>>>>>");
//   }
// }

