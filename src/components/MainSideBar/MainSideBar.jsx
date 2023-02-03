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




function VerticalSidebar({ animation, direction, visible, loggedUser, allSkills }) {
  console.log(allSkills, "ALL SKIDSFJASDJFS AJSD:DJS:FA:DS:ALSD")

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
        allSkills.map((skill) => {
          return (
            <SkillList skill={skill}/>
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



function MainSideBar({ loggedUser, handleLogout, allSkills, handleAddSkill  }) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: 'push',
    direction: 'left',
    dimmed: false,
    visible: true,
  })

  const { animation, dimmed, direction, visible } = state
  const vertical = direction === 'bottom' || direction === 'top'

  
 

  return (
    
      <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>
        {vertical && (
          <HorizontalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
          />
        )}
        {!vertical && (
          <VerticalSidebar
            allSkills={allSkills}
            animation={animation}
            direction={direction}
            visible={visible}
          />
        )}

        <Sidebar.Pusher dimmed={dimmed && visible}>
          <Segment basic 
            onClick={() =>
              dispatch({ type: 'CHANGE_ANIMATION', animation: 'push' })
            }>
            
              <Outlet allSkills={allSkills} loggedUser={loggedUser} handleLogout={handleLogout} handleAddSkill={handleAddSkill}/>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    
  )
}

export default MainSideBar