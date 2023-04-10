import { Link, Outlet } from "react-router-dom";
import { useState, useEffect, useReducer, useContext} from "react";
import Container from '@mui/material/Container';

import {
  Segment,
  Sidebar,

  Button,
  Grid,
  
} from 'semantic-ui-react'

import SidebarReducer from '../../reducers/SidebarReducer.js';

import { SkillsContext, SkillsDispatchContext } from '../../context/SkillsContext/SkillsContext.jsx';

import VerticalSidebar from '../../components/VerticalSidebar/VerticalSidebar';
import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';
import MainFooter from '../../components/MainFooter/MainFooter';




function Layout({ handleLogout }) {
  const ctx = useContext(SkillsContext)
  const getSkills = ctx.getSkills;

  const [sidebarState, sidebarDispatch] = useReducer(SidebarReducer, {
    animation: 'push',
    direction: 'left',
    dimmed: true,
    visible: false,
  })
  const { animation, dimmed, direction, visible } = sidebarState;

  useEffect(() => {
    getSkills();
  }, []); 

  return (
    <Container fluid='true' style={{margin: 0, padding: 0}}>

  
    <FixedMenuHeader handleLogout={handleLogout} sidebarDispatch={sidebarDispatch}/>

      <Sidebar.Pushable as={Container} style={{ overflow: 'auto', margin: 0, padding: 0  }}>
        <VerticalSidebar
          animation={animation}
          direction={direction}
          visible={visible}
        /> 
        <Sidebar.Pusher className='sidebarPusher' dimmed={dimmed && visible}>
          
          <Outlet />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <MainFooter />
    </Container> 
  )
}

export default Layout;