import "./DashboardPage.css"
import { useEffect, useContext } from "react";
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
  const skills = ctx.skills;
  const userSkills = ctx.userSkills;

	const skillPanes = userSkills?.map((skill, index) => ({
    menuItem: (

        <Menu.Item
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

  async function handleTabChange(e, data) {
    e.preventDefault();
		e.stopPropagation();

    const activeIndex = data.activeIndex;
    const userSkillId = userSkills[activeIndex]._id;
    const skillIndex = skills?.findIndex(skill => skill?._id === userSkillId);

    await handleSetActiveSkill(skillIndex)
  }
  
  useEffect(() => {
  }, []); 


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
       
        panes={skillPanes} 
        onTabChange={ (e, data) => handleTabChange(e,data)}
        menuPosition='left'
      />
    </Container>
  )
}

export default DashboardPage;
