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

function DashboardPage() {
  const ctx = useContext(SkillsContext);
  const handleSetActiveSkill = ctx.handleSetActiveSkill;0
  const userId = ctx.loggedUser._id;
  const skills = ctx.skills;

  
  useEffect(() => {
 
  }, []); 

  return (
    <Grid spacing={2} justifyContent={'center'} alignContent={'center'}>
      <h1> users dashboard</h1>

      <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2} >
            {skills?.map((skill, index) => (
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
