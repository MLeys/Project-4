import { Link, Outlet } from "react-router-dom";
import { useState, useEffect, useReducer, useContext} from "react";
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

import AddSkillDisplay from '../../components/AddSkillDisplay/AddSkillDisplay';
import VerticalSidebar from '../../components/VerticalSidebar/VerticalSidebar';
import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';
import MainFooter from '../../components/MainFooter/MainFooter';
import SkillList from '../../components/SkillList/SkillList.jsx';

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
    <Container className="layoutCtnr" fluid={true} style={{minWidth: '100dvw', margin: 0, padding: 0}}>

  
    <FixedMenuHeader handleLogout={handleLogout} sidebarDispatch={sidebarDispatch}/>

      <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden', margin: 0, padding: 0  }}>
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