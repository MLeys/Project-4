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

  const [activeSkillIndex, setActiveSkillIndex] = useState(ctx.activeSkillIndex)
  const [activeSubIndex, setActiveSubIndex] = useState(0);


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

  function handleTabChange(e, data) {
    const activeIndex = data.activeIndex;
    const userSkillId = userSkills[activeIndex]._id;
    const skillIndex = skills?.findIndex(skill => skill._id === userSkillId)
    console.log(activeSkill)
    // console.log(`userSkillIndex: ${activeIndex}\nskillIndex: ${skillIndex}\nactiveSkill: ${userSkills[activeIndex].name}`)
    updateActiveSkillIndex(skillIndex);
    updateActiveSubskillIndex();
  }

  async function updateActiveSubskillIndex(subskillIndex=0) {
    console.log(subskillIndex, ' <- -- active sub index')
    await handleSetActiveSub(subskillIndex);
    setActiveSubIndex(subskillIndex);
  }

  async function updateActiveSkillIndex(skillIndex=0) {
    console.log(skillIndex, '<-- active skill index')
    await handleSetActiveSkill(skillIndex);
    setActiveSkillIndex(skillIndex);
  } 
  
  useEffect(() => {
    console.log('Dash useEffect')
    updateActiveSkillIndex();
    updateActiveSubskillIndex();
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
          panes={skillPanes} 
          onTabChange={ (e, data) => handleTabChange(e,data)}
          menuPosition='left'
      />
    </Container>
    
  )
  
}

export default DashboardPage;
