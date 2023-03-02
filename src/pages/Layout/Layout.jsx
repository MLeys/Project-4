import React from 'react'
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

// import SkillsReducer from '../../reducers/SkillsReducer.js';
import SidebarReducer from '../../reducers/SidebarReducer.js';

import { useSkills, useSkillsDispatch, SkillsProvider } from '../../context/SkillsContext/SkillsContext.jsx';

// import { SkillsContext, SkillsDispatchContext } from '../../context/SkillsContext/SkillsContext.jsx';

import SkillPortal from '../../components/SkillPortal/SkillPortal';
import VerticalSidebar from '../../components/VerticalSidebar/VerticalSidebar';
import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';
import MainFooter from '../../components/MainFooter/MainFooter';
import SkillList from '../../components/SkillList/SkillList.jsx';


function Layout({ 
  loggedUser, handleLogout,
  assignSkillUser, unAssignSkillUser,
  assignSubUser, unAssignSubUser,
  getSkill, getSkills, skill, allSkills,
  handleAddSkill, handleDeleteSkill,
  handleClose,    
  allResources, handleAddResource

}) {
  const [error, setError] = useState(null);
  const dispatch = useSkillsDispatch()
  const skills = useSkills();
  console.log(skills, "<===== Skills")

  const [sidebarState, sidebarDispatch] = useReducer(SidebarReducer, {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  })
  const { animation, dimmed, direction, visible } = sidebarState;

  

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
  } 

  async function handleGetAllSkills() {
    
    try {
      const response = await skillsApi.getAll();
      console.log(response.data, "====== REsponse getallSkills")
      dispatch({
        type: 'readSkills',
        data: response.data //COULD BE .skills *****
      })
    } catch (err) {
      setError(console.log(`*** Error READ SKILL ****\n ${err}`))
    }
  }
  
  async function handleDeleteSkill(skillId) {
    try {
      
      const response = await skillsApi.deleteSkill(skillId);
      dispatch({
        type: 'deleteSkill',
        id: skillId,
      })

      // setSkills(skills.filter((skill) => skill._id !== skillId ))
      // CHECK IF NEED TO USE ._id INSTEAD OF .id or vice-versa ************
      // ELIMINATED RETURN (orig) ->> return skill._id !== skillId
    } catch (err) {
      setError(console.log(`*** Error DELETE SKILL ****\n ${err}`))

    }
  }

  useEffect(() => {
    getSkills();
    handleGetAllSkills();
  }, []); 

  return (
      
        
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
      
    
  )
}

export default Layout;