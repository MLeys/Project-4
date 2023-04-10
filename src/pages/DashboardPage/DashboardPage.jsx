import "./DashboardPage.css"
import { useEffect, useContext, useState } from "react";


import { 
  Menu,
  Tab,
  Container,
  Header
} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import SkillPane from "../../components/SkillPane/SkillPane";


function DashboardPage() {
  const ctx = useContext(SkillsContext);
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const loadSkills = ctx.loadSkills;
  const skills = ctx.skills;
  const userSkills = ctx.userSkills;
  const getSkills = ctx.getSkills;

  const [activeIndex, setActiveIndex] = useState(0)

	const skillPanes = userSkills?.map((skill, index) => ({
    menuItem: (

        <Menu.Item
          sx={{overflow: 'auto'}}
          onClick={() => {
            console.log(skill, " <--- skilllll on click")
            console.log(`Clicked On ${skill.name} tab`);
            handleClickTab(index);
          }}
          className="skill_pane" 
          key={`pane-${skill?.name}-${index}`} 
          fitted={false}
        >
          {skill?.name}
        </Menu.Item>


    ),
    render: () => (
      <SkillPane  />
    )
	}));

  function handleClickTab(index){
    console.log(index, '<< trying to change')
    
  }

  async function handleTabChange(e, data) {
    e.preventDefault();
		e.stopPropagation();
    console.log(data.activeIndex, " << tab change activeindex")
    setActiveIndex(data.activeIndex);
    const userSkillId = userSkills[data.activeIndex]._id;
    const skillId = skills?.findIndex((skill) => skill._id === userSkillId)

    await handleSetActiveSkill(skillId)
  }
  
  useEffect(() => {
    handleSetActiveSkill();
  }, [!skills]); 


  return (
    <Container fluid={true} style={{margin: 0, padding: 0}} className='fullScreenHeight' >
      <Tab
        menu={{
          id: 'skillTabs',
          fluid: true,
          color: 'blue', 
          inverted: true, 
          tabular: false, 
          vertical: true, 
        }}
        defaultActiveIndex={activeIndex}
        panes={skillPanes} 
        onTabChange={ (e, data) => handleTabChange(e,data)}
        menuPosition='left'
      />
    </Container>
  )
}

export default DashboardPage;
