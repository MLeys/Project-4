import React from 'react'
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
  List
} from 'semantic-ui-react'
import { Outlet } from 'react-router-dom';
import SkillList from '../SkillList/SkillList';




function VerticalSidebar({ getSkill, activeSkill, animation, direction, visible, loggedUser, allSkills, handleDeleteSkill}) {
  // console.log(allSkills, "<--- allSkills in Sidebar")

  return (
    <Sidebar 
      style={{"text-color": 'white'}}
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



function MainSideBar({ getSkill, activeSkill, loggedUser, handleLogout, allSkills, handleAddSkill, handleDeleteSkill  }) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  })

  const { animation, dimmed, direction, visible } = state
  const vertical = direction === 'bottom' || direction === 'top'

  
 

  return (
    
      <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden', margin: 0, padding: 0, "min-height": '89vh'  }}>

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
              <Button onClick={() =>
                dispatch({ type: 'CHANGE_ANIMATION', animation: 'overlay' })
                }>
                ToggleSidebar
              </Button>
            </Segment>
            <Segment >
              <Outlet getSkill={getSkill}  activeSkill={activeSkill} allSkills={allSkills} loggedUser={loggedUser} handleLogout={handleLogout} handleAddSkill={handleAddSkill} handleDeleteSkill={handleDeleteSkill}/>

            </Segment>

          </Segment.Group>
        </Sidebar.Pusher>
      </Sidebar.Pushable>

  )
}

export default MainSideBar