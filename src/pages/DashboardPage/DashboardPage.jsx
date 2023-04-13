import { useEffect, useContext, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from '@mui/material/Box';


import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import SkillPane from "../../components/SkillPane/SkillPane";
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
