import "./DashboardPage.css"
import { useEffect, useContext, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from '@mui/material/Box';

import { 
  Menu,
  Tab,
  Container,
  Header
} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import SkillPane from "../../components/SkillPane/SkillPane";
import AddResourceDisplay from "../../components/AddResourceDisplay/AddResourceDisplay";
import VerticalTabs from "../../components/VerticalTabs/VerticalTabs";

function DashboardPage() {
  const ctx = useContext(SkillsContext);
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const loadSkills = ctx.loadSkills;
  const skills = ctx.skills;
  const userSkills = ctx.userSkills;
  const getSkills = ctx.getSkills;

  const [activeIndex, setActiveIndex] = useState(0)


  const skillTitlesArray = userSkills?.map((skill) => skill.name)
  console.log(skillTitlesArray, " skill titles!")

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
    <Grid className='fullScreenHeight' p={.5} bgcolor={'accent.dark'} >
      
      <VerticalTabs titleArray={skillTitlesArray} >
        <SkillPane />
      </VerticalTabs>
    </Grid>
  )
}

export default DashboardPage;
