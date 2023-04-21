import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useImmerReducer} from 'use-immer';

import skillsReducer from "./reducers/skillsReducer.js";
import resourcesReducer from "./reducers/resourceReducer.js";


import { SkillsContext, SkillsDispatchContext } from './context/SkillsContext/SkillsContext.jsx';
import { stockSkillsList, testSkillsList } from "./lists/skillTypes";

import SkillPage from "./pages/SkillPage/SkillPage";
import Layout from "./pages/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import userService from "./utils/userService";
import * as skillsApi from "./utils/skillApi.js";
import * as subSkillsApi from "./utils/subSkillApi.js";
import * as youTubeApi from "./utils/youTubeApi.js";
import * as resourcesApi from "./utils/resourceApi.js";
import * as userProgressApi from "./utils/userProgressApi.js"

export default function App() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState(userService.getUser());
  const [skills, dispatchSkills] = useImmerReducer(skillsReducer, null);
  const [resources, dispatchResources] = useImmerReducer(resourcesReducer, null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [youTubeResults, setYouTubeResults] = useState([]);
  const [progressData, setProgressData] = useState(null);
  
  const userId = user?._id;
  const skillId = activeSkill?.skill?._id;
  const subId = activeSub?.subSkill?._id;



  async function handleAssignUserProgress(skillId) {
    const userId = user?._id;
    console.log(`Handle Assgn Skill ${skillId}\nUserId: ${userId}`)
    try {
      const res = await userProgressApi.assignSkill(userId, skillId);
      setProgressData(res.data);
      console.log(res.data, " <-- Data fro assign skill")
    } catch (error) {
      console.error('Error assigning skill:', error);
    }
  };

  async function handleResourceCompletion(subSkillId, resourceId, complete)  {
    try {
      const res = await updateResourceCompletion(userId, subSkillId, resourceId, complete);
      setProgressData(res.data);
    } catch (error) {
      console.error('Error updating resource completion:', error);
    }
  };

  async function onStartUploadAllSkillsFromList() {
    // (testSkillsList) 
    //   ? await skillsApi.createAllSkillsFromList(testSkillsList) 
    //   : console.log('prorgammingSkills list is empty')
    console.log("Loading initial Skills?")
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
    return `${formattedDate} ${formattedTime}`;
  }

  async function handleSetActiveSkillById(skillId) {
    const skillIndex = skills?.findIndex((skill => skill._id === skillId))
    handleSetActiveSkill(skillIndex);
    handleSetActiveSub();
  }

  function handleSetActiveSub(subIndex=0){
    if (skills) {
      setActiveSub({
        ...activeSub,
        index: subIndex,
        subSkill: activeSkill?.subSkills[subIndex],
        resources: activeSkill?.subSkills[subIndex]?.resources
      });
      console.log(`ActiveSub: ${activeSkill?.subSkills[subIndex].title} at index: ${subIndex} `)

    }

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
    if (skills) { 
      const skill = skills[index];
      resetActiveSubToFirstIndexActiveSkill(skill?.subSkills);
      console.log(`ActiveSkill: ${skills[index].name}`)
      setActiveSkill({
        ...activeSkill,
        index: index,
        skill: skills[index],
        subSkills: skills[index]?.subSkills
      })    
    }
  }


  async function handleCreateSkill(data) {
    try {
      const response = await skillsApi.create(data);
      dispatchSkills({
        type: 'createSkill',
        data: response.skill,
      })
    } catch(err){
      setError(console.log(`*** Error CREATE SKILL ****\n ${err}`))
    }
    // console.log(skills, "<<<<<< skills")
  } 

  async function getSkills() {
    try {
      console.log("GET SKILLS")
      const response = await skillsApi.getAll(user._id);
      dispatchSkills({
        type: 'readSkills',
        data: response.skills //COULD BE .skills *****
      })
      handleSetUserSkills(response.userSkills);

      console.log("Updated skills from server... ")
    } catch (err) {
      setError(`*** Error READ SKILL ****\n ${err}`)
    }
    // console.log(skills, "End of getSkills")
  }


  async function handleDeleteSkill(skillId) {
    try {
      const skillIndex = skills.findIndex((skill) => skill._id === skillId)
      const response = await skillsApi.deleteSkill(skillId);
      dispatchSkills({
        type: 'deleteSkill',
        id: skillId,
        index: skillIndex,
      })
    } catch (err) {
      setError(console.log(`*** Error DELETE SKILL ****\n ${err}`))
    }
  }

  async function handleAssignSkill(skillId) {
    try {
      await handleAssignUserProgress(skillId);
      const index = skills?.findIndex((s) => s._id === skillId)
      if (!skills[index].usersAssigned.some(u => u._id === user._id)) {
        const response = await skillsApi.assignUser(user, skillId);
        // console.log(response, "assign skill response")
        dispatchSkills({
          type: 'assignSkill',
          user: user,
          index: index
        })
        // Response from server = response.skill
      } else {
        console.log(`${user.username} already assigned to skill( ${skills[index].name})`)
      }
    } catch (err) {
      setError(console.log(`*** Error Assign SKILL ****\n ${err}`))
    }
  }


  async function handleUnAssignSkill(skillId) {
    try {
      const skillIndex = skills?.findIndex((s) => s._id === skillId)
      if (skills[skillIndex]?.usersAssigned?.some(u => u._id === user._id)) {
        const userAssignedIndex = skills[skillIndex]?.usersAssigned?.findIndex((u) => u._id === user._id)
        const response = await skillsApi.unAssignUser(user, skillId);
        // console.log(response, "unassign skill response")
        dispatchSkills({
          type: 'unAssignSkill',
          userIndex: userAssignedIndex,
          skillIndex: skillIndex
        })
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

  function handleAssignResourceSubSkill(skillIndex, subIndex, response) {
    dispatchSkills({
      type: 'addResource',
      skillIndex: skillIndex,
      subIndex: subIndex,
      resource: response,
    })
  }

  async function handleCreateResource(data) {
    const skillIndex = skills?.findIndex((s) => s._id === data.skillId)
    const skill = skills[skillIndex];
    const subIndex = skill?.subSkills.findIndex((s) => s._id === data.subId)
    const sub = skill?.subSkills[subIndex];
    const isAssigned = sub.resources.some((r) => r.videoId === data.videoId)


    console.log(data, "<=== add resource data ")
    console.log(`Data(before): ${data}`)
    
    if (!isAssigned) {
      try {
        const response = await resourcesApi.create(data);
        if (response) {
          handleAssignResourceSubSkill(skillIndex, subIndex, response)
        } else {
          console.log(" Reponse invalid ")
        }
  

  
      } catch (err) {
        setError(console.log(`***Error in handleCreateResource(message): ${err}`))
      }
    } else {
      console.log(`VideoId: ${data.videoId} already assigned to subSkill`)
    }

  }

  async function handleUnAssignResourceUser(resourceId, skillId, subId, userId ) {
    const data = {
      resourceId: resourceId,
      userId: userId,
      skillId: skillId,
      subId: subId,
      userId: userId,
    }

    try {
      const response = await resourcesApi.unAssignResource(data);
      dispatchResources({
        type: 'unAssignResource',
        resourceId: resourceId,
        userId: userId,
        skillId: skillId,
        subId: subId,
        userId: userId,
      })
    } catch (err) {
      setError(console.log(`*** Error Unassigning Resource ${err}`))
    }
  }

  async function handleAssignResourceUser(resourceId, skillId, subId, userId) {
    const data = {
      resourceId: resourceId,
      userId: userId,
      skillId: skillId,
      subId: subId,
      userId: userId,
    }
    try {
      const response = await resourcesApi.assignResource(data);
      dispatchResources({
        type: 'assignResource',
        resourceId: resourceId,
        userId: userId,
        skillId: skillId,
        subId: subId,
        userId: userId,
      })
    } catch (err) {
      setError(console.log(`*** Error Unassigning Resource ${err}`))
    }
  }

  async function getResources() {
    console.log("getting resources")
    try {
      
      const response = await resourcesApi.getAll();
      setResources( await response.data)
    } catch(err) {
      setError(console.log('^^^^ getSkills Error!!! ^^^^'));
    }

  } 

  async function handleDeleteResource(resource) {
    const resourceId = resource._id
    const skillId = resource.skillId;
    const skillIndex = skills?.findIndex((s) => s._id === skillId)
    const skill = skills[skillIndex];
    const subId = resource.subSkillId;
    const subIndex = skill.subSkills.findIndex((s) => s._id === subId);
    

    try {

      const response = await resourcesApi.deleteResource(resourceId);
      console.log(response.resourceDoc.title, ' <---resource removed from database')

      dispatchSkills({
        type: 'deleteResource',
        skillIndex: skillIndex,
        subIndex: subIndex,
        resourceId: resourceId,
      })

    } catch (err) {
      setError(console.log(`*** Error DELETE SKILL ****\n ${err}`))

    }
  }

  async function handleCreateSubSkill(data) {
    try {
      const response = await subSkillsApi.create(data);
      dispatchSkills({
        type: 'createSubSkill',
        skillIndex: activeSkill.index,
        data: response.skill,
      })

    } catch(err){
      setError(console.log(`*** Error CREATE SKILL ****\n ${err}`))
    }

  } 

  async function handleEditSubSkill(subskill) {
    try {
        const response = await subSkillsApi.update(subskill);
    } catch(err){
        console.log(err, " Error IN THE HANDLEADDsubskill")
    }
  } // END handleAddSubSkill Function


  async function searchYouTube(search) {
		try {
			const response = await youTubeApi.searchYouTube(search, activeSkill?.skill?.name, activeSub?.subSkill?.title);
			console.log(response, " <------ response from YOUTUBE SEARCH");
		
			setYouTubeResults([...response])
		} catch (err) {
			console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
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

  useEffect(() => {
    (async () => {
      try {
        const res = await userProgressApi.getUserProgress(userId);
        setProgressData(res.data);
      } catch (error) {
        console.error('Error fetching user progress data:', error);
      }
    })();
  }, [userId]);

  useEffect(() => {
    async function start() {
      await onStartUploadAllSkillsFromList();
      await getSkills();
      await getResources();
      
    }
    start();

    
  }, [!skills, !activeSkill]); 

  
    return (
      <SkillsContext.Provider 
        value={{
          loggedUser: user,
          skills: skills,
          skill: activeSkill?.skill,
          activeSkill: activeSkill,
          activeSubSkills: activeSkill?.subSkills,
          activeSub: activeSub, 
          youTubeResults: youTubeResults,
          activeSkillId: activeSkill?.skill?._id,
          activeSubId: activeSub?.subSkill?._id,
          activeUserId: user?._id,

          setYouTubeResults: setYouTubeResults,
          searchYouTube: searchYouTube,
          handleSetActiveSkillById: handleSetActiveSkillById,
          formatDate: formatDate,
          handleLogout: handleLogout,
          handleSignUpOrLogin: handleSignUpOrLogin,
          createSkill: handleCreateSkill,
          getSkills: getSkills,
          deleteSkill: handleDeleteSkill,
          handleAssignSkill: handleAssignSkill,
          handleUnAssignSkill: handleUnAssignSkill, 
          handleSetActiveSkill: handleSetActiveSkill,
          handleSetActiveSub: handleSetActiveSub,
          handleCreateSubSkill: handleCreateSubSkill,
          handleCreateResource: handleCreateResource,
          handleDeleteResource: handleDeleteResource,
          handleUnAssignResourceUser: handleUnAssignResourceUser,
          handleAssignResourceUser: handleAssignResourceUser,
        }}>
        <SkillsDispatchContext.Provider value={dispatchSkills}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="skills/:skillId" element={<SkillPage />} />
              {user ? (
                <Route path="/:username" element={<DashboardPage />} />
              ) : null}
            </Route>
            <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
            <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          </Routes>
        </SkillsDispatchContext.Provider>
      </SkillsContext.Provider>
    );
    
}