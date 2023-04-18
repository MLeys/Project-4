import React from "react";
import { useEffect, useContext, useState } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";

import SkillPane from "../../components/SkillPane/SkillPane";
import VerticalTabs from "../../components/VerticalTabs/VerticalTabs";
import FixedMenuHeader from "../../components/FixedMenuHeader/FixedMenuHeader";


function DashboardPage() {
  const ctx = useContext(SkillsContext);
  const handleSetActiveSkill = ctx.handleSetActiveSkill;0
  const userId = ctx.loggedUser._id;
  const skills = ctx.skills;


  
  useEffect(() => {
 
  }, []); 

  return (
    <Grid>
      <h1> users dashboard</h1>
  
      
   
    </Grid>
  );
}

export default DashboardPage;
