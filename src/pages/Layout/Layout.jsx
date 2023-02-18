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

function Layout({ handleClose, getSkill, activeSkill,skill, loggedUser, handleLogout, allSkills, handleAddSkill, handleDeleteSkill  }) {
  const [sidebarState, dispatch] = React.useReducer(SidebarReducer, {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  })

  const { animation, dimmed, direction, visible } = sidebarState;

  return (
    <Container  style={{ margin: 0, padding: 0, minHeight: '98vh', width: '98vw' }}>
      <FixedMenuHeader loggedUser={loggedUser} handleLogout={handleLogout} skill={skill} dispatch={dispatch}/>

      <Sidebar.Pushable as={Segment} inverted style={{ overflow: 'hidden', margin: 0, padding: 1, minHeight: '89vh'  }}>
        <VerticalSidebar
            allSkills={allSkills}
            animation={animation}
            direction={direction}
            visible={visible}
            handleDeleteSkill={handleDeleteSkill}
        />      
        <Sidebar.Pusher  dimmed={dimmed && visible}>
          <Segment.Group>
            <Segment inverted>
              <SkillPortal handleAddSkill={handleAddSkill} skill={skill} handleClose={handleClose} />   
            </Segment>
            <Segment >
              <Outlet getSkill={getSkill}  activeSkill={activeSkill} allSkills={allSkills} loggedUser={loggedUser} handleLogout={handleLogout} handleAddSkill={handleAddSkill} handleDeleteSkill={handleDeleteSkill}/>
            </Segment>
          </Segment.Group>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <MainFooter />
    
    </Container>
  )
}

export default Layout;