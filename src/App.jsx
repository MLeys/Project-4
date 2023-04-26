import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useImmerReducer} from 'use-immer';

import skillsReducer from "./reducers/skillsReducer.js";
import resourcesReducer from "./reducers/resourceReducer.js";
import { useSkills, useSkillsDispatch } from "./context/SkillsContext/SkillsContext.jsx";

import { SkillsContext, SkillsDispatchContext } from './context/SkillsContext/SkillsContext.jsx';
import { stockSkillsList, testSkillsList } from "./lists/skillTypes";

import SkillPage from "./pages/SkillPage/SkillPage";
import Layout from "./pages/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage.jsx";

import userService from "./utils/userService";
import * as skillsApi from "./utils/skillApi.js";
import * as subSkillsApi from "./utils/subSkillApi.js";
import * as youTubeApi from "./utils/youTubeApi.js";
import * as resourcesApi from "./utils/resourceApi.js";
import * as userProgressApi from "./utils/userProgressApi.js"

export async function getSkillsFromServer() {
  const user = userService.getUser();
  if (!user) {
    return null;
  }
  const response = await skillsApi.getAll(user._id);
  return await response.skills;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');
  const [user, setUser] = useState(userService.getUser());
  const [skills, dispatchSkills] = useImmerReducer(skillsReducer, useSkills());
  const [resources, setResources] = useState([]);
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [youTubeResults, setYouTubeResults] = useState([]);
  const [progressData, setProgressData] = useState(null);
  


  const userId = user?._id;
  const activeSkillId = activeSkill?.skill?._id;
  const activeSubId = activeSub?.subSkill?._id;


  function checkIfUserAssigned(usersAssigned) {
    return usersAssigned?.some((u) => u._id === user._id);
  }

  function getSkillIndexById(skillId){
    return skills?.findIndex((skill) => skill._id === skillId)
  }

  function getSubIndexById(subId) {
    return activeSkill?.subSkills?.findIndex((sub) => sub._id === subId);
  }

  function getResourceIndexById(resourceId) {
    return activeSub?.resources?.findIndex((r) => r._id === resourceId);
  }

  // NO LONGER IN USE instead using getSkillsFromServer
  async function getSkills() {
    try {
      console.log("GET SKILLS")
      const response = await skillsApi.getAll(user._id);
      // dispatchSkills({
      //   type: 'readSkills',
      //   data: response.skills 
      // })
      // handleSetUserSkills(response.userSkills);

      console.log("Updated skills from server... ")
    } catch (err) {
      setError(`*** Error READ SKILL ****\n ${err}`)
    }
    // console.log(skills, "End of getSkills")
  } 

  async function getResources() {
    console.log("getting resources")
    try {
      const response = await resourcesApi.getAll();
      setResources(response.data)
    } catch(err) {
      setError(console.log(err, '<-- Error getting all Resources! '));
      throw new Error(console.log(`${err} <-- Error getting all resources`),
        `${err} <- Error getting all resources`)
      
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

  async function handleCreateResource(data) {
    const skillId = data.skillId;
    const subId = data.subId;
    const isAssigned = activeSub?.resources?.some((r) => r.videoId === data.videoId)

    if (!isAssigned) {
      try {
        const response = await resourcesApi.create(data);
        if (response) {
          const resource = await response;
          const skillIndex = getSkillIndexById(skillId);
          const subIndex = getSubIndexById(subId);
          dispatchSkills({
            type: 'assignResourceToSubSkill',
            skillIndex: skillIndex,
            subSkillIndex: subIndex,
            resource: resource,
          })
        } 
      } catch (err) {
        setError(console.log(`***Error in handleCreateResource(message): ${err}`))
      }
    } else {
      console.log(`VideoId: ${data.videoId} already assigned to subSkill`)
    }

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

  async function handleDeleteResourcesByVideoId() {
    console.log("DELETE ALL IN APP")
    try {
    const response = await resourcesApi.deleteAllResourcesByVideoId("aWIrN50hVTo")
    console.log(response, "<-- response from delete all by video Id")
    } catch (err) {
      throw new Error(console.log(`${err} <- Error getting Deleting all resources by id`), 
        `${err} <- Error getting Deleting all resources by id`)
    }
  }

  async function handleAssignUserToSkill(skill) {
    const skillId = skill?._id
    try {
      // await handleAssignUserProgress(skillId);
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

  async function handleUnAssignUserFromSkill(skill) {
    const skillId = skill?._id;
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
        setUserSkills(assignedSkills)
      } else {
        console.log(`${user.username} Not alaready Assigned to skill( ${skills[skillIndex].name})`)
      }
    } catch (err) {
      setError(console.log(`*** Error UNAssign SKILL ****\n ${err}`))
    }
  }

  async function handleAssignUserToSubSkill(subSkill) {
    console.log(subSkill, '< subskill assigning user to')
    const isAssigned = await checkIfUserAssigned(subSkill?.usersAssigned);
    const parentSkillId = skills?.[activeSkill?.index]?._id;
    const skillIndex = getSkillIndexById(parentSkillId);
    const subIndex = getSubIndexById(subSkill?._id);

    const data = {
      subSkill: {
        ...subSkill,
        parentSkill: parentSkillId,
      },
      user: user,
      parentSkillId: parentSkillId,
    };
  
    if (!isAssigned) {

      try {
        const response = await subSkillsApi.assignUser(data);
        console.log(response, 'response from assigning user to subskills');
        dispatchSkills({
          type: 'assignUserToSubSkill',
          skillIndex: skillIndex,
          subSkillIndex: subIndex,
          user: user,
        });

      } catch (err) {
        setError(console.log(`*** Error assigning User to Subskill -> ${err}`));
      }
    }
  }
  

  async function handleUnAssignUserFromSubSkill(subSkill) {
    console.log(subSkill?.usersAssigned, 'users in UNassigning to subskill')
    const isAssigned = await checkIfUserAssigned(subSkill?.usersAssigned);
    console.log(isAssigned, " IS ASSIGNED in unassign from sub")
    const parentSkillId = skills?.[activeSkill?.index]?._id;
    const skillIndex = getSkillIndexById(parentSkillId);
    const subIndex = getSubIndexById(subSkill?._id);
    const data = {
      userId: userId,
      parentSkillId: parentSkillId,
      subId: subSkill?._id,
      user: user,
    };
  
    if (isAssigned) {

      try {
        const response = await subSkillsApi.unAssignUser(data);
        console.log(response, ' reponse from server unassign user from subskill')
        dispatchSkills({
          type: 'unAssignUserFromSubSkill',
          skillIndex,
          subSkillIndex: subIndex,
          user: user,
        });
      } catch (err) {
        setError(console.log(`*** Error unassigning User from SubSkill -> ${err}`));
      }
    } else {
      console.log("SubSkill not assigned to user. CANNOT unassign from subskill");
    }
  }



  async function handleAssignUserToResource(resource) {
    const isAssigned = checkIfUserAssigned(resource.usersAssigned);    
    const skillIndex = getSkillIndexById(resource.skillId);
    const subIndex = getSubIndexById(resource.subSkillId);
    const resourceIndex = getResourceIndexById(resource._id);
  
    const data = {
      resource: resource,
      userId: userId,
      skillId: resource.skillId,
      subId: resource.subSkillId,
      user: user,
    };
  
    if (!isAssigned) {
      try {
        const response = await resourcesApi.assignUserToResource(data);
        dispatchSkills({
          type: 'assignUserToResource',
          skillIndex: skillIndex,
          subSkillIndex: subIndex,
          resource,
          user: user,
        });
      } catch (err) {
        setError(console.log(`*** Error assigning User to Resource -> ${err}`));
      }
    } else {
      console.log("Resource already assigned to user");
    }
  }
  
  async function handleUnAssignUserFromResource(resource, skillId, subId) {
    const isAssigned = checkIfUserAssigned(resource.usersAssigned);    
    const skillIndex = getSkillIndexById(resource.skillId);
    const subIndex = getSubIndexById(resource.subSkillId);
    const resourceIndex = getResourceIndexById(resource._id);
    const data = {
      resource: resource,
      userId: userId,
      skillId: resource.skillId,
      subId: resource.subSkillId,
      user: user,
    };
  
    if (isAssigned) {
      try {
        const response = await resourcesApi.unAssignUserFromResource(data);
        dispatchSkills({
          type: 'unAssignUserFromResource',
          skillIndex,
          subSkillIndex: subIndex,
          resourceIndex,
          user: user,
        });
      } catch (err) {
        setError(console.log(`*** Error unassigning User from Resource -> ${err}`));
      }
    } else {
      console.log("Resource not assigned to user");
    }
  }
  

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
			// console.log(response, " <------ response from YOUTUBE SEARCH");
			setYouTubeResults([...response])
		} catch (err) {
			console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
		}
	}

  async function handleSignUpOrLogin() {
    setUser(await userService.getUser());
    await getSkillsFromServer();
  }

  function handleLogout() {
    console.log("+++++ SIGNOUT USER +++++")
    setUser();
    if (location.pathname !== "/onboarding") {
      navigate('/');
    }
    userService.logout();
    setUser(null);
  }

  async function handleSetActiveSkillById(skillId) {
    const skillIndex = skills?.findIndex((skill => skill._id === skillId))
    handleSetActiveSkill(skillIndex);
    if (activeSub === null) {
      handleSetActiveSub(0);
    }
    
  }

  function handleSetActiveSub(subIndex){
    const index = subIndex ? subIndex : 0;
    if (activeSkill?.subSkills ) {
      setActiveSub({
        ...activeSub,
        index: index,
        subSkill: activeSkill?.subSkills?.[index],
        resources: activeSkill?.subSkills?.[index]?.resources
      });
      console.log(`ActiveSub: ${activeSkill?.subSkills[subIndex]?.title} at index: ${subIndex} `)

    }

  };

  function resetActiveSubToFirstIndexActiveSkill(subSkills) {
    if (subSkills) {
      setActiveSub({
        ...activeSub,
        index: 0,
        subSkill: subSkills[0],
        resources: subSkills[0]?.resources
      });
    }
  }

  async function handleSetActiveSkill(index=0){
    if (skills) { 
      console.log(`ActiveSkill: ${skills[index]?.name}`)
      setActiveSkill({
        ...activeSkill,
        index: index,
        skill: skills[index],
        subSkills: skills[index]?.subSkills
      })    
      if (activeSub === null) {
        handleSetActiveSub(0);
      }
    }
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

 

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await userProgressApi.getUserProgress(userId);
  //       setProgressData(res.data);
  //     } catch (error) {
  //       console.error('Error fetching user progress data:', error);
  //     }
  //   })();
  // }, [userId]);

  
  useEffect(() => {
    console.log('useEffect for user change in app')
    if (!user) {
      return;
    }
  
    const fetchSkills = async () => {
      try {
        const response = await getSkillsFromServer();
        dispatchSkills({ type: "INITIALIZE_SKILLS", payload: response });
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
  
    fetchSkills();
  }, [user]);
  

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
          resources: resources,

          setUser: setUser,
          checkIfUserAssigned: checkIfUserAssigned,
          handleDeleteResourcesByVideoId: handleDeleteResourcesByVideoId,
          setYouTubeResults: setYouTubeResults,
          searchYouTube: searchYouTube,
          handleSetActiveSkillById: handleSetActiveSkillById,
          formatDate: formatDate,
          handleLogout: handleLogout,
          handleSignUpOrLogin: handleSignUpOrLogin,
          createSkill: handleCreateSkill,
          getSkills: getSkills,
          deleteSkill: handleDeleteSkill,
          handleAssignUserToSkill: handleAssignUserToSkill,
          handleUnAssignUserFromSkill: handleUnAssignUserFromSkill, 
          handleAssignUserToSubSkill: handleAssignUserToSubSkill,
          handleUnAssignUserFromSubSkill: handleUnAssignUserFromSubSkill,
          handleSetActiveSkill: handleSetActiveSkill,
          handleSetActiveSub: handleSetActiveSub,
          handleCreateSubSkill: handleCreateSubSkill,
          handleCreateResource: handleCreateResource,
          handleDeleteResource: handleDeleteResource,
          handleUnAssignUserFromResource: handleUnAssignUserFromResource,
          handleAssignUserToResource: handleAssignUserToResource,
        }}
      >
        <SkillsDispatchContext.Provider value={dispatchSkills}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="skills/:skillId" element={<SkillPage />} />
              {user ? (
                <Route path="/:username" element={<DashboardPage />} />
              ) : null}
            </Route>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
            <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          </Routes>
        </SkillsDispatchContext.Provider>
      </SkillsContext.Provider>
    );
    
}