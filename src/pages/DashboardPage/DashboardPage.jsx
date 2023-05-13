import React from "react";
import { useEffect, useContext, useState } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import SkillCard3 from "../../components/SkillCard3/SkillCard3";
import ProgressLinear from "../../components/ProgressLinear/ProgressLinear";


function DashboardPage() {
  const ctx = useContext(SkillsContext);
  const checkIfUserAssigned = ctx.checkIfUserAssigned;
  const user = ctx.loggedUser;
  const skills = ctx.skills;
  const totalProgress = ctx.totalProgress;

  const userSkills = skills?.filter((skill) => checkIfUserAssigned(skill.usersAssigned))
  
  useEffect(() => {
 
  }, []); 

  return (
    <Grid spacing={2} justifyContent={'center'} alignContent={'center'}>
      <Box m={2}>
        <Typography variant="h4">{user.name}'s Progress</Typography>
        <ProgressLinear value={totalProgress} />
        
      </Box>
      <Container sx={{ py: 4 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2} >
            {userSkills?.map((skill, index) => (
              <Grid key={`skillCard-${index}`} xs={12} sm={6} md={4} >
                <SkillCard3 skill={skill} />
              </Grid>
            ))}
          </Grid>
        </Container>
   
    </Grid>
  );
}

export default DashboardPage;
