import React, { useContext } from 'react'
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect, useReducer} from "react";
import { useImmerReducer} from 'use-immer';

import {
  Segment,
  Sidebar,
  Container,
  Button
} from 'semantic-ui-react'


import * as skillsApi from "../../utils/skillApi.js"; 

import SkillsReducer from '../../reducers/SkillsReducer.js';
import SidebarReducer from '../../reducers/SidebarReducer.js';

import { SkillsContext, SkillsDispatchContext } from '../../context/SkillsContext/SkillsContext.jsx';

import SkillPortal from '../../components/SkillPortal/SkillPortal';
import VerticalSidebar from '../../components/VerticalSidebar/VerticalSidebar';
import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';
import MainFooter from '../../components/MainFooter/MainFooter';
import SkillList from '../../components/SkillList/SkillList.jsx';

function Layout({ 
  loggedUser, handleLogout,
  assignSkillUser, unAssignSkillUser,
  assignSubUser, unAssignSubUser,
  getSkill, skill, allSkills,
  handleAddSkill, handleDeleteSkill,
  handleClose,    
  allResources, handleAddResource

}) {

  const [error, setError] = useState(null);
  // const [skills, dispatch] = useImmerReducer(SkillsReducer, null)

  const [sidebarState, sidebarDispatch] = useReducer(SidebarReducer, {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  })
  const { animation, dimmed, direction, visible } = sidebarState;

  

  // async function handleCreateSkill(data) {
  //   try {
  //     const response = await skillsApi.create(data);
  //     dispatch({
  //       type: 'createSkill',
  //       data: response.skill,
  //     })
  //   } catch(err){
  //     setError(console.log(`*** Error CREATE SKILL ****\n ${err}`))
  //   }
  //   console.log(skills, "<<<<<< skills")
  // } 

  // async function getSkills() {
  //   try {
  //     const response = await skillsApi.getAll();
  //     dispatch({
  //       type: 'readSkills',
  //       data: response.data //COULD BE .skills *****
  //     })
  //     console.log(skills, "_<<< updated skills hook handleget")

  //   } catch (err) {
  //     setError(console.log(`*** Error READ SKILL ****\n ${err}`))
  //   }
  //   console.log(skills, "<<<<<< skills")
  // }

  
  // async function handleDeleteSkill(skillId) {
  //   try {
      
  //     const response = await skillsApi.deleteSkill(skillId);
  //     dispatch({
  //       type: 'deleteSkill',
  //       id: skillId,
  //     })

  //     // setSkills(skills.filter((skill) => skill._id !== skillId ))
  //     // CHECK IF NEED TO USE ._id INSTEAD OF .id or vice-versa ************
  //     // ELIMINATED RETURN (orig) ->> return skill._id !== skillId
  //   } catch (err) {
  //     setError(console.log(`*** Error DELETE SKILL ****\n ${err}`))

  //   }
  // }

  useEffect(() => {
    // getSkills();
    
    
  }, []); 

  return (
    // <SkillsContext.Provider 
    //   value={{
    //     getSkills:getSkills,
    //     skills:skills
    //   }}>
    //   <SkillsDispatchContext.Provider value={dispatch}>

        <Container  style={{ margin: 0, padding: 0, minHeight: '98vh', width: '98vw' }}>

          <FixedMenuHeader loggedUser={loggedUser} handleLogout={handleLogout} skill={skill} sidebarDispatch={sidebarDispatch}/>

          <Sidebar.Pushable as={Segment} inverted style={{ overflow: 'hidden', margin: 0, padding: 1, minHeight: '89vh'  }}>
            <VerticalSidebar
              loggedUser={loggedUser}
              animation={animation}
              direction={direction}
              visible={visible}
              allSkills={allSkills}
              handleDeleteSkill={handleDeleteSkill}
              handleAddSkill={handleAddSkill}
              handleClose={handleClose}
              assignSkillUser={assignSkillUser}
              unAssignSkillUser={unAssignSkillUser}
              
            />      
            <Sidebar.Pusher  dimmed={dimmed && visible}>
              <Segment.Group>
                <Segment inverted>
                  <SkillPortal 
                    
                    handleAddSkill={handleAddSkill} 
                    skill={skill} 
                    handleClose={handleClose} />   
                </Segment>
                <Segment >
                  <Outlet 
                    getSkill={getSkill} 
                    allSkills={allSkills} 
                    loggedUser={loggedUser} 
                    handleLogout={handleLogout} 
                    handleAddSkill={handleAddSkill} 
                    handleDeleteSkill={handleDeleteSkill}
                    handleAddResource={handleAddResource}
                    allResources={allResources}
                    

                  />
                </Segment>
              </Segment.Group>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          <MainFooter />
        </Container>
    //   </SkillsDispatchContext.Provider>
    // </SkillsContext.Provider>
    
  )
}

export default Layout;