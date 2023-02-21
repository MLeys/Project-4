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

import SkillPortal from '../../components/SkillPortal/SkillPortal';
import VerticalSidebar from '../../components/VerticalSidebar/VerticalSidebar';
import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';
import SidebarReducer from '../../components/Reducers/SidebarReducer';
import MainFooter from '../../components/MainFooter/MainFooter';

function Layout({ 
  loggedUser, handleLogout,
  assignSkillUser, unAssignSkillUser,
  assignSubUser, unAssignSubUser,
  getSkill, getSkills, skill, allSkills,
  handleAddSkill, handleDeleteSkill,
  handleClose,    

}) {
  // console.log(allSkills, "<-- all skills (layout)")
  const [sidebarState, dispatch] = React.useReducer(SidebarReducer, {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  })
  // console.log(allSkills, "<-- all skills (layout)")
  
  const { animation, dimmed, direction, visible } = sidebarState;

  async function loadSkills() {
    allSkills = await getSkills();
    // console.log(allSkills, "<-- all skills (layout)")
  }

  useEffect(() => {
    
    
    // searchYouTube();
    // searchOpenAi("top 5 most important software engineering skills");
    
    
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
        />      
        <Sidebar.Pusher  dimmed={dimmed && visible}>
          <Segment.Group>
            <Segment inverted>
              <SkillPortal handleAddSkill={handleAddSkill} skill={skill} handleClose={handleClose} />   
            </Segment>
            <Segment >
              <Outlet getSkill={getSkill} allSkills={allSkills} loggedUser={loggedUser} handleLogout={handleLogout} handleAddSkill={handleAddSkill} handleDeleteSkill={handleDeleteSkill}/>
            </Segment>
          </Segment.Group>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <MainFooter />
    
    </Container>
  )
}

export default Layout;