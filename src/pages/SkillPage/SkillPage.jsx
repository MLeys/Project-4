import React from 'react';
import './SkillPage.css'

import mainTheme from "../../themes/mainTheme";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from '@mui/material/Toolbar';

import VideoCard from "../../components/VideoCard/VideoCard";
import PageDrawer from "../../components/PageDrawer/PageDrawer";


function SkillPage() {
  const ctx = useContext(SkillsContext);
  const getSkills = ctx.getSkills;
  const skills = ctx.skills;
  const handleSetActiveSub = ctx.handleSetActiveSub;
  const handleSetActiveSkillById = ctx.handleSetActiveSkillById;
  const activeSkill = ctx.activeSkill;
  const skillId = useParams().skillId;
  const pageSkill = skillId ? skills?.find(skill => skill?._id === skillId) : console.log('skill param not found');
  const activeSubIndex = ctx.activeSub?.index;

  const [skill, setSkill] = useState(pageSkill);

  async function ifActiveSkills() {
    await getSkills();
    activeSkill ? "" : handleSetActiveSkillById(skillId)
  }

  useEffect(() => {
    
    if ( skills) { 
      handleSetActiveSkillById(skillId)
      setSkill(skills?.find(skill => skill?._id === skillId)) 
    }
    
  
  }, [skills]); 

  return ( 
    <PageDrawer >
      <Toolbar />
      <Box mx={0} p={0}>      
        <Paper elevation={12} sx={{ m: 0,p: 0}} >
          <Typography variant="h4" component="h4"  p={0}>
            {skill?.subSkills[activeSubIndex]?.title}
          </Typography>
        </Paper>
        <Box sx={{ flexGrow: 1 }}>
          {skill?.subSkills[activeSubIndex]?.resources?.map((resource, index) => (
            <Grid xs={12} md={6} lg={4} key={`resource-${index}`} >
              <VideoCard key={`resource-${index}`} resource={resource} index={index} >
                <Typography alignContent={'flex-end'}>Added: {resource.createdAt}</Typography>
              </VideoCard>
            </Grid>
          ))}   
        </Box>
      </Box>

    </PageDrawer>



  );
}
export default SkillPage;
