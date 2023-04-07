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
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const handleSetActiveSub = ctx.handleSetActiveSub;
  
  const skills = ctx.skills;
  const userSkills = ctx.userSkills;


	const skillPanes = userSkills?.map((skill, index) => ({
    menuItem: (
      <Menu.Item className="skill_pane" key={`pane-${skill?.name}-${index}`} >
        <Header inverted={true}>{skill?.name}</Header>
      </Menu.Item>
    ),
    render: () => (
      <SkillPane  />
    )
	}));

  async function handleTabChange(e, data) {
    console.log(userSkills[data.activeIndex], "<<<<<<<<<<<<< userskill active")
    e.preventDefault();
		e.stopPropagation();
    console.log(e, ' this is event')
    console.log(data.activeIndex, '<-- active skill tab index')
    const activeIndex = data.activeIndex;
    const userSkillId = userSkills[activeIndex]._id;
    console.log(userSkillId, '<- userSkillID')
    const skillIndex = skills?.findIndex(skill => skill?._id === userSkillId);
    console.log(skillIndex, '<-- skill index whats going on')

    await handleSetActiveSkill(skillIndex)
    console.log('AFTER SET ACTIVE SKILL')
  }
  
  useEffect(() => {
    console.log('Dash useEffect')
  }, []); 


  return (
    // className='fullScreenHeight'
      <Container fluid={true} className='fullScreenHeight' >
        <Tab

          menu={{
            id: 'skillTabs',
            fluid: true,
            color: 'blue', 
            inverted: true, 
            attached: false, 
            tabular: true, 
            vertical: true, 
            
          }}
          grid ={{ paneWidth: 14, tabWidth: 2 }} 
          activeIndex={activeSkill?.index}
          panes={skillPanes} 
          onTabChange={ (e, data) => handleTabChange(e,data)}
          menuPosition='left'
      />
    </Container>
    
  )
  
}

export default DashboardPage;
