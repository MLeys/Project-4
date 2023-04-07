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
import * as skillsApi from "/src/utils/skillApi.js";
import * as subSkillsApi from "./utils/subSkillApi.js";
import * as youTubeApi from "./utils/youTubeApi.js";
import * as chatGPT3Api from "./utils/chatGPT3Api.js";
import * as resourcesApi from "./utils/resourceApi.js";

export default function App() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState(userService.getUser());
  const [skills, dispatch] = useImmerReducer(SkillsReducer, null)
  const [userSkills, setUserSkills] = useState([])
  const [activeSkillIndex, setActiveSkillIndex] = useState(-1)
  const [resources, setResources] = useState([]);
  

  const loggedUser = userService.getUser();
  
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeSub, setActiveSub] = useState(null);

  function handleSetUserSkills(skillsArray) {
      const assignedSkills =skillsArray?.filter((skill => skill.usersAssigned.some(u => u._id === user._id)))
      // console.log(assignedSkills, "USERS SKILLS (getSkills)")
      setUserSkills(assignedSkills)
      console.log(" END OF HANDLE SETUSERSKILLS ")
  }

  function handleSetActiveSub(subIndex=0){
    const skillIndex = activeSkill?.index;
    setActiveSub({
      ...activeSub,
      index: subIndex,
      subSkill: skills[skillIndex]?.subSkills[subIndex],
      resources: skills[skillIndex]?.subSkills[subIndex]?.resources
    });
  };

  function resetActiveSubToFirstIndexActiveSkill(subSkills) {
    setActiveSub({
      ...activeSub,
      index: 0,
      subSkill: subSkills[0],
      resources: subSkills[0]?.resources
    });
  }

  async function handleSetActiveSkill(index=0){
    const skill = skills[index];
    
    resetActiveSubToFirstIndexActiveSkill(skill.subSkills);
    setActiveSkill({
      ...activeSkill,
      index: index,
      skill: skills[index],
      subSkills: skills[index].subSkills
    })
    console.log(skill.name, "<--- name of skill clicked")
    console.log(skill.name === activeSkill.skill.name, " active Skill Updated")
    
  }


  async function handleCreateSkill(data) {
    try {
      const response = await skillsApi.create(data);
      dispatch({
        type: 'createSkill',
        data: response.skill,
      })
      getSkills();
    } catch(err){
      setError(console.log(`*** Error CREATE SKILL ****\n ${err}`))
    }
    // console.log(skills, "<<<<<< skills")
  } 

  async function getSkills() {
    try {
      const response = await skillsApi.getAll(user._id);
      dispatch({
        type: 'readSkills',
        data: response.skills //COULD BE .skills *****
      })
      handleSetUserSkills(response.userSkills);
      // console.log((!!activeSkill.index === -1) === true, " no active skill ")
      // console.log(response, "<---- getSkills Response")
      if (!!activeSkill.index === true) {
        // console.log(!!activeSkill.index === true," hitting in get")
        setActiveSkillIndex(response.firstSkillIndex)
        
        setInitialActiveSkill(response.firstSkillIndex);
      }

      console.log(" after setting in get skills ")
    } catch (err) {
      setError(`*** Error READ SKILL ****\n ${err}`)
    }
    // console.log(skills, "End of getSkills")
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
        // console.log(response, "assign skill response")
        dispatch({
          type: 'assignSkill',
          user: user,
          index: index
        })
        getSkills();
        const assignedSkills =skills?.filter((skill => skill.usersAssigned.some(u => u._id === user._id)))
        // console.log(assignedSkills, "USERS SKILLS (assignSkill)")
        setUserSkills(assignedSkills)
        
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
        // console.log(response, "unassign skill response")
        dispatch({
          type: 'unAssignSkill',
          userIndex: userAssignedIndex,
          skillIndex: skillIndex
        })
        getSkills();
        const assignedSkills = skills?.filter((skill => skill.usersAssigned.some(u => u._id === user._id)))
        // console.log(assignedSkills, "USERS SKILLS (unassignSkill)")
        setUserSkills(assignedSkills)
      } else {
        console.log(`${user.username} Not alaready Assigned to skill( ${skills[skillIndex].name})`)
      }
    } catch (err) {
      setError(console.log(`*** Error UNAssign SKILL ****\n ${err}`))
    }
  }



  async function handleAddResource(data) {
    console.log(data, "<=== add resource data ")
    console.log(`Data(before): ${data}`)
    /// ADD LOGIC TO NOT ADD OF ALREADY ADDED
    const resource = ({
      title: data.title,
      videoId: data.videoId,
      description: data.description,
      thumbnail: data.thumbnail,
      datePublished: data.datePublished,
      skillId: data.skillId,
      userId: data.userId,
      source: data.source
    })
    try {
      const response = await resourcesApi.create(data);
      console.log("RESPONSE", response)
      dispatch({
        type: 'addResource',
        skillIndex: data.skillIndex,
        subIndex: data.subIndex,
        resource: response,
      })

      getSkills();

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

  } 

  async function handleCreateSubSkill(data) {
    try {
      const response = await subSkillsApi.create(data);
      dispatch({
        type: 'createSubSkill',
        skillIndex: activeSkill.index,
        data: response.skill,
      })
      getSkills();

    } catch(err){
      setError(console.log(`*** Error CREATE SKILL ****\n ${err}`))
    }

  } 

  async function handleEditSubSkill(subskill) {
    try {
        console.log(subskill, "<<<<< subskill data IN handle EDIT SUBSKill")
        // setSubSkill(updatedSkill)
        const response = await subSkillsApi.update(subskill);
        console.log(response, "++++ EDIT SUBSKILL RESPONSE")
        
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

  useEffect(() => {
    async function start() {
      await getSkills();
      handleSetActiveSkill();
    }
    start();

    
  }, [!skills, !activeSkill]); 

  if (user) {

    return (
      <SkillsContext.Provider 
        value={{
          loggedUser: user,
          skills: skills,
          skill: activeSkill?.skill,
          activeSkillIndex: activeSkillIndex,
          activeSkill: activeSkill,
          activeSubSkills: activeSkill?.subSkills,
          userSkills: userSkills,
          activeSub: activeSub,
          
          
          handleSignUpOrLogin: handleSignUpOrLogin,
          createSkill: handleCreateSkill,
          getSkills: getSkills,
          deleteSkill: handleDeleteSkill,
          assignSkillUser: assignSkillUser,
          unAssignSkillUser: unAssignSkillUser, 
          handleSetActiveSkill: handleSetActiveSkill,
          handleSetActiveSub: handleSetActiveSub,
          handleCreateSubSkill: handleCreateSubSkill,
          handleAddResource: handleAddResource,
          
       
      }}>
        <SkillsDispatchContext.Provider value={dispatch}>
          <Routes>
            <Route path="/" element={ <Layout handleLogout={handleLogout} /> }>
              <Route
                index
                element={<LandingPage />}
              />          
              <Route path="skills/:skillName" element={<SkillPage  />} />
              <Route path="/:username" element={<DashboardPage />}/>
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
        element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} getSkills={getSkills} />}
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
// async function assignSubUser(subskill) {
//   try {
//     const response = await skillsApi.assignUser(user, subskill._id)
//     getSkills();
//   } catch(err) {
//     console.log(err, "<--assign Skill error")
//   }
// }

// async function unAssignSubUser(subskill) {
//   try {
//     const response = await skillsApi.unAssignUser(user, subskill._id)
//     getSkills();
//   } catch(err) {
//     console.log(err, "<--unassign Skill error")
//   }
// }
