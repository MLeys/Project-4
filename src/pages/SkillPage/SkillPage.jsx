import React from "react";
import './SkillPage.css'
import mainTheme from "../../themes/mainTheme";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";


import Container from '@mui/material/Container';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import VideoCard from "../../components/VideoCard/VideoCard";

const CustomCard = styled(Card)({
  width: '100%',
  height: '50px',
  marginTop: '.25rem',
  marginBottom: '.25rem',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '4px 4px 4px rgba(0,0,20,0.2)',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  backgroundColor: mainTheme.palette.primaryDarker.light,
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: mainTheme.palette.primary.main,
    color: mainTheme.palette.primary.contrastText,

  },
  '&:active': {
    backgroundColor: mainTheme.palette.primary.dark,
    color: mainTheme.palette.primary.contrastText,
    boxShadow: '0 5px #666',
    transform: 'translateY(4px)',
  },
})

const MainTitle = styled(Typography)({
  
  color: mainTheme.palette.secondary.contrastText,
  padding: 0,
  margin: 0
  // animationDuration: '3s',
  // animationName: 'slidein',
  // animationIterationCount: '1',
  // animationDirection: 'alternate',

})

const PageHeader = ({title}) => (
  <Paper elevation={12} sx={{backgroundColor: mainTheme.palette.primaryDarker.light}}>
    <MainTitle className="firstSlideIn" variant="h2">{title}</MainTitle>
  </Paper>
)


function SkillPage() {
  const ctx = useContext(SkillsContext);
  const getSkills = ctx.getSkills;
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const skills = ctx.skills;
  const skillId = useParams().skillId;
  const skill = ctx.activeSkill ? ctx.activeSkill?.skill : skills?.find(skill => skill?._id === skillId);
  const handleSetActiveSub = ctx.handleSetActiveSub;
  


  async function loadSkills() {
    await getSkills();
    const skillIndex = skills?.findIndex((skill => skill._id === skillId))
    console.log(skillIndex, " SKILL INDEX")
    
    await handleSetActiveSkill(skillIndex);
    await handleSetActiveSub();
  }

  const [activeSubIndex, setActiveSubIndex] = useState(0)
  
  function handleClickSub(index) {
    setActiveSubIndex(index);
    handleSetActiveSub(index);
  }


  useEffect(() => {

    loadSkills();
  }, [!skills && !skill]); 

  return (  
    <Box minHeight='90dvh' component={Paper} elevation={6} >
      <Grid p={2} component={Paper} container elevation={6}  >
        <Grid xs={12} >
          <PageHeader title={skill?.name}/>
        </Grid>
        <Grid container component={Paper} elevation={12} bgcolor={"primaryDarker.main"} minHeight='80dvh' spacing={2} mt={2} xs={12}>
          <Grid xs={3} bgcolor={"primaryDarker.dark"} component={Paper}>
            <Grid container bgcolor={"primary.light"} component={Paper} elevation={12}>
              <Grid xs={12} >
                <Typography  >Subskills </Typography>
              </Grid>
              {skill?.subSkills.map((sub, index) => (
              <CustomCard key={`sub-${index}`} onClick={() => handleClickSub(index)}>
                <Typography>{sub?.title }
               
                </Typography>
              </CustomCard>
              
            ))}
            </Grid>

          </Grid>
          <Grid xs={9} >
            <Paper elevation={12} sx={{mb: 2}} >
              <Typography variant="h4" component="h4" p={2}>{skill?.subSkills[activeSubIndex]?.title}</Typography>
            </Paper>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container >
                
                  {skill?.resources?.map((resource, index) => (
                    <Grid xs={2} sm={4} md={4} >
                      <VideoCard key={`resource-${index}`} resource={resource} index={index} />
                    </Grid>
                  ))}   
                
              </Grid>
            </Box>

          </Grid>
        </Grid> 
      </Grid>
    </Box>

  );
}
export default SkillPage;
