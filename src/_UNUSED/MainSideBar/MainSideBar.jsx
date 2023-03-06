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

import SkillPortal from '../../components/AddSkillDisplay/AddSkillDisplay';
import SkillList from '../../components/SkillList/SkillList';
import FixedMenuHeader from '../../components/FixedMenuHeader/FixedMenuHeader';



function VerticalSidebar({ getSkill, activeSkill, animation, direction, visible, loggedUser, allSkills, handleDeleteSkill}) {
  // console.log(allSkills, "<--- allSkills in Sidebar")

  return (
    
    <Sidebar 
      style={{ textColor: 'white'}}
      as={Menu}
      animation={animation}
      direction={direction}
      inverted
      vertical
      visible={visible}
      width='thin'
    >
    
      {
        allSkills?.map((skill) => {
          return (
            <SkillList getSkill={getSkill} activeSkill={activeSkill} key={skill._id} skill={skill} handleDeleteSkill={handleDeleteSkill} allSkills={allSkills}/>
          )
        })
      }
    </Sidebar>
  )

}



function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_ANIMATION':
      return { ...state, animation: action.animation, visible: !state.visible }
    case 'CHANGE_DIMMED':
      return { ...state, dimmed: action.dimmed }
    case 'CHANGE_DIRECTION':
      return { ...state, direction: action.direction, visible: false }
    default:
      throw new Error()
  }
}



function MainSideBar({ handleClose, getSkill, activeSkill,skill, loggedUser, handleLogout, allSkills, handleAddSkill, handleDeleteSkill  }) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  })

  const { animation, dimmed, direction, visible } = state
  const vertical = direction === 'bottom' || direction === 'top'

  return (
    <Container  style={{ margin: 0, padding: 0, minHeight: '98vh', width: '98vw' }}>
      <Menu  inverted style={{padding: '0em', margin: '0'}}>
        <Menu.Item as='a' header onClick={() =>
                dispatch({ type: 'CHANGE_ANIMATION', animation: 'overlay' })
                }>
            Skill.map
        </Menu.Item>
        <FixedMenuHeader loggedUser={loggedUser} handleLogout={handleLogout} skill={skill}/>
      </Menu>
      <Sidebar.Pushable as={Segment} inverted style={{ overflow: 'hidden', margin: 0, padding: 1, minHeight: '89vh'  }}>

        {!vertical && (
          <VerticalSidebar
            allSkills={allSkills}
            animation={animation}
            direction={direction}
            visible={visible}
            handleDeleteSkill={handleDeleteSkill}
          />
        )}

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
      <Segment id='main-seg' inverted fixed='bottom' vertical style={{ margin: '0', padding: '0em 0em', height: "2em", }}>
        <Container textAlign='center' style={{ innerWidth:'100vw' }}>
            <List horizontal inverted divided link size='small'>
                <List.Item >
                    Created by: Mike Leys
                </List.Item>
            </List>
        </Container>
      </Segment>
    
    </Container>



  )
}

export default MainSideBar