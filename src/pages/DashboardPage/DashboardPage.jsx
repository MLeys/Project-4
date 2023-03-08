import "./DashboardPage.css"
import { useState, useEffect, useContext } from "react";
import { useParams} from "react-router-dom";
import { 
  Segment,
  Grid,
  Label,
  Menu,
  Tab,
  Progress,
  Container,
  Header
} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import SkillPane from "../../components/SkillPane/SkillPane";


function DashboardPage() {
  const ctx = useContext(SkillsContext);
  const activeSkill = ctx.activeSkill;
  const loggedUser = ctx.loggedUser;
  const getSkills = ctx.getSkills;
  const handleSetActiveSkill = ctx.handleSetActiveSkill
  const activeSkillIndex = ctx.activeSkillIndex
  const skills = ctx.skills;
  const userSkills = ctx.userSkills;


	const skillPanes = userSkills?.map((skill, index) => ({
  
    menuItem: (
      <Menu.Item className="skill_pane" key={`pane-${skill?.name}-${index}`} >
        <Progress 
          inverted={true}
          size='small' 
          color='blue' 
          value='4' 
          total='8' 
          progress='percent' 
        >
        <Header inverted={true}>{skill?.name}</Header>
        </Progress>
      </Menu.Item>
    ),
    render: () => (
      <SkillPane  />
    )
	}));

  useEffect(() => {
    
  }, []); 

  function handleTabChange(e, data) {
    const activeIndex = data.activeIndex;

    const userSkillId = userSkills[activeIndex]._id;
    const skillIndex = skills?.findIndex(skill => skill._id === userSkillId)
    console.log(`userSkillIndex: ${activeIndex}\nskillIndex: ${skillIndex}\nactiveSkill: ${userSkills[activeIndex].name}`)
    handleSetActiveSkill(skillIndex)
  }
  
  return (
    // className='fullScreenHeight'
      <Container fluid={true} >
        <Tab
          menu={{
            id: 'skillTabs',
            fluid: true,
            color: 'purple', 
            inverted: true, 
            attached: false, 
            tabular: true, 
            vertical: true, 
          }}
          grid ={{ paneWidth: 14, tabWidth: 2 }} 
          panes={skillPanes} 
          onTabChange={ (e, data) => handleTabChange(e,data)}
          menuPosition='left'
      />
      <Segment> Last Segment on Dashboard </Segment>
    </Container>
    
  )
  
}

export default DashboardPage;
