import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Item,
  Input,
  Label,
  List,
  Container
} from 'semantic-ui-react'
import { Outlet } from 'react-router-dom';

import * as skillsApi from "../../utils/skillApi.js"; 

import SkillPortal from '../../components/SkillPortal/SkillPortal';
import VerticalSidebar from '../../components/VerticalSidebar/VerticalSidebar';
import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';
import SidebarReducer from '../../reducers/SidebarReducer';
import MainFooter from '../../components/MainFooter/MainFooter';


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

  const [sidebarState, dispatch] = React.useReducer(SidebarReducer, {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  })
  const { animation, dimmed, direction, visible } = sidebarState;

  const [skills, setSkills] = useState(null);

  async function handleCreateSkill(data) {
    try {
      const response = await skillsApi.create(data);
      setSkills([
        ...skills,
        response.skill
      ])
      
    } catch(err){
      setError(console.log(`*** Error CREATE SKILL ****\n ${err}`))
    }
  } 
  
  async function handleDeleteSkill(skillId) {
    try {
      
      const response = await skillsApi.deleteSkill(skillId);
      setSkills(skills.filter((skill) => skill._id !== skillId ))
      // CHECK IF NEED TO USE ._id INSTEAD OF .id or vice-versa ************
      // ELIMINATED RETURN (orig) ->> return skill._id !== skillId
    } catch (err) {
      setError(console.log(`*** Error DELETE SKILL ****\n ${err}`))

    }
  }

  useEffect(() => {
    getSkills();
    
  }, []); 

  return (
    <Container  style={{ margin: 0, padding: 0, minHeight: '98vh', width: '98vw' }}>
      <FixedMenuHeader loggedUser={loggedUser} handleLogout={handleLogout} skill={skill} dispatch={dispatch}/>

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
              <SkillPortal handleAddSkill={handleAddSkill} skill={skill} handleClose={handleClose} />   
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