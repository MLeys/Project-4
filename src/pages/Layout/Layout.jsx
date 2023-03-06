import React, { useContext } from 'react'
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect, useReducer} from "react";
import { useImmerReducer} from 'use-immer';

import {
  Segment,
  Sidebar,
  Container,
  Button,
  Grid,
  
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

function Layout({ handleLogout }) {

  const [sidebarState, sidebarDispatch] = useReducer(SidebarReducer, {
    animation: 'push',
    direction: 'left',
    dimmed: true,
    visible: false,
  })
  const { animation, dimmed, direction, visible } = sidebarState;

  useEffect(() => {
 
  }, []); 

  return (
    <Container  style={{ margin: 0, padding: 0, minHeight: '98vh', width: '98vw' }}>

  
    <FixedMenuHeader handleLogout={handleLogout} sidebarDispatch={sidebarDispatch}/>

      <Sidebar.Pushable as={Segment} inverted style={{ overflow: 'hidden', margin: 0, padding: 0  }}>
        <VerticalSidebar
          animation={animation}
          direction={direction}
          visible={visible}
        /> 
        <Sidebar.Pusher className='sidebarPusher' dimmed={dimmed && visible}>
          <SkillPortal className='skillPortal'/>   
          <Outlet />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <MainFooter />
    </Container> 
  )
}

export default Layout;