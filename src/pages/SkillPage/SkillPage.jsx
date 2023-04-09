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

const CustomCard = styled(Card)({
  width: '95%',
  height: '50px',
  marginTop: '.25rem',
  marginLeft: '.5rem',
  marginRight: '.5rem',
  marginBottom: '.25rem',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '2px 3px 10px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  backgroundColor: mainTheme.palette.primaryDarker.light,
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: mainTheme.palette.secondary.light,
  },
})

const MainTitle = styled(Typography)({
  
  color: mainTheme.palette.secondary.contrastText,
  padding: '0px 0px',
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
  const skill = ctx.activeSkill ? ctx.activeSkill.skill : skills?.find(skill => skill._id === skillId);
  const handleSetActiveSub = ctx.handleSetActiveSub;
  const subSkill = ctx.activeSub.subSkill; 

  async function loadSkills() {
    await getSkills();
    const skillIndex = skills?.findIndex((skill => skill._id === skillId))
    console.log(skillIndex, " SKILL INDEX")
    
    await handleSetActiveSkill(skillIndex);
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
    <Box minHeight='90dvh' component={Paper} elevation={12} >
      <Grid p={1} component={Paper} container elevation={12}  >
        <Grid xs={12} >
          <PageHeader title={skill?.name}/>
        </Grid>
        <Grid container component={Paper} elevation={12} bgcolor={"primaryDarker.main"} minHeight='80dvh' spacing={1} mt={1} xs={12}>
          <Grid xs={3} bgcolor={"primaryDarker.dark"} component={Paper}>
            <Grid container bgcolor={"primary.light"} component={Paper} elevation={12}>
              <Grid xs={12} >
                <Paper elevation={12} sx={{backgroundColor: "primary.light"}} >
                  <Typography variant="h5" p={.5} alignContent='center' justifyContent='center'>Subskills</Typography>
                </Paper>
              </Grid>
      {skill?.subSkills.map((sub, index) => (
              <CustomCard onClick={() => handleClickSub(index)}>
                <Typography textAlign='center' variant="subtitle1">{sub?.title }</Typography>
              </CustomCard>
              
            ))}
            </Grid>

          </Grid>
          <Grid xs={9} >
            <Paper elevation={12} >
              <Typography variant="h3">{subSkill?.title}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>

  );
}
export default SkillPage;
