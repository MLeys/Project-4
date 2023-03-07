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
  const loggedUser = ctx.loggedUser;
  const getSkills = ctx.getSkills;
  const handleSetActiveSkill = ctx.handleSetActiveSkill
  const activeSkillIndex = ctx.activeSkillIndex
  const skills = ctx.skills;
  const userSkills = ctx.userSkills;
  // const firstUserSkillId = userSkills[0]?._id;
  // const userFirstIndex = skills?.findIndex((skill) => skill._id === firstUserSkillId)
  // console.log(userFirstIndex, "==== first user skill index")

  // async function loadData() {
  //   try {
  //     await getSkills();
  //     const assignedSkills = skills?.filter((skill => skill.usersAssigned.some(u => u._id === loggedUser._id)))
  //     const firstUserSkillId = assignedSkills[0]?._id;
  //     const userFirstIndex = skills?.findIndex((skill) => skill._id === firstUserSkillId)
  //     console.log(userFirstIndex, "==== first user skill index")
      
  //     handleSetActiveSkill(userFirstIndex)
  //   } catch (error) {
  //     console.log(`Error loading skills on dash==> ${error}`)
        
  //   }
  //   console.log("cannot load becuse userskills null")

  // }
  

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
    // loadData();
  }, []); 

  function handleTabChange(e, data) {
    const activeIndex = data.activeIndex;

    const userSkillId = userSkills[activeIndex]._id;
    const skillIndex = skills?.findIndex(skill => skill._id === userSkillId)
    console.log(`userSkillIndex: ${activeIndex}\nskillIndex: ${skillIndex}\nactiveSkill: ${userSkills[activeIndex].name}`)
    handleSetActiveSkill(skillIndex)
  }
  
  return (
      <Container fluid={true} className='fullScreenHeight'>
        <Tab
          defaultActiveIndex={0}
          menu={{
            id: 'skillTabs',
            fluid: true,
            color: 'purple', 
            inverted: true, 
            attached: false, 
            tabular: false, 
            vertical: true, 
          }}
          grid ={{ paneWidth: 14, tabWidth: 2 }} 
          panes={skillPanes} 
          onTabChange={ (e, data) => handleTabChange(e,data)}
          menuPosition='left'
      />
      <Segment> End</Segment>
    </Container>
    
  )
  
}

export default DashboardPage;
