import React from "react";
import './SkillPage.css'
import mainTheme from "../../themes/mainTheme";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";

import Toolbar from "@mui/material/Toolbar";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import VideoCard from "../../components/VideoCard/VideoCard";
import PageDrawer from "../../components/PageDrawer/PageDrawer";

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
    backgroundColor: mainTheme.palette.secondary.main,
    color: mainTheme.palette.primary.contrastText,

  },
  '&:active': {
    backgroundColor: mainTheme.palette.secondary.dark,
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

const PageHeader = ({title, children}) => (
  <Box component={Paper} display={'flex'} justifyContent={'center'} elevation={12} sx={{backgroundColor: mainTheme.palette.primaryDarker.light}}>
    <MainTitle className="firstSlideIn" variant="h2">{title}</MainTitle>
    {children}
  </Box>
)


function SkillPage() {
  const ctx = useContext(SkillsContext);
  const getSkills = ctx.getSkills;
  const skills = ctx.skills;
  const handleSetActiveSub = ctx.handleSetActiveSub;
  const handleSetActiveSkill = ctx.handleSetActiveSkill;
  const handleSetActiveSkillById = ctx.handleSetActiveSkillById;
  const activeSkill = ctx.activeSkill;
  const skillId = useParams().skillId;
  const skill = skillId ? skills?.find(skill => skill?._id === skillId) : console.log('skill param not found');
  const activeSubIndex = ctx.activeSub?.index;

 
  function handleClickSub(index) {
    handleSetActiveSub(index);
  }

  async function ifActiveSkills() {
    await getSkills();
    console.log("FUCKER", skillId)
    console.log("ACtive SKill fuck: ", activeSkill)
    activeSkill ? "" : handleSetActiveSkillById(skillId)
  }


  useEffect(() => {
    ifActiveSkills();
  }, [!skills]); 

  return ( 
    <PageDrawer key={skill?._id}>
      
      <Grid p={1} component={Paper} container elevation={6}  >
        <Grid xs={12} >
          <PageHeader title={skill?.name}>
            Hello
          </PageHeader>
          
        </Grid>
        <Grid container component={Paper} elevation={12}  minHeight='80dvh' spacing={2} mt={2} xs={12}>
          <Grid xs={3} component={Paper}>
            <Grid container bgcolor={"primary.main"} component={Paper} elevation={12}>
              <Grid xs={12} >
                <Typography >Subskills </Typography>
              </Grid>
              {skill?.subSkills.map((sub, index) => (
              <CustomCard key={`sub-${index}`} onClick={() => handleClickSub(index)}>
                <Typography>
                  {sub?.title }
                </Typography>
              </CustomCard>
            ))}
            </Grid>
          </Grid>
          <Grid xs={9}  >
            <Paper elevation={12} sx={{mb: 2}} >
              <Typography variant="h4" component="h4" p={2}>
                {skill?.subSkills[activeSubIndex]?.title}
              </Typography>
            </Paper>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container align={'center'} m={0} p={0} spacing={1} >
                {skill?.subSkills[activeSubIndex]?.resources?.map((resource, index) => (
                  <Grid xs={12} md={6} lg={4} key={`resource-${index}`} >
                    <VideoCard key={`resource-${index}`} resource={resource} index={index} >
                     <Typography alignContent={'flex-end'}>Added: {resource.createdAt}</Typography>
                    </VideoCard>
                  </Grid>
                ))}   
              </Grid>
            </Box>
          </Grid>
        </Grid> 
      </Grid>


    </PageDrawer>



  );
}
export default SkillPage;
