import React from "react";
import { useState, useEffect, useContext } from "react";

import Container from '@mui/material/Container';
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";





function SkillPage({ }) {
    const ctx = useContext(SkillsContext);
    const activeSkill = ctx.activeSkill;
    const skill = activeSkill.skill;
    
    useEffect(() => {
      }, []); 

    return (  
        <Grid container={true} className='fullScreenHeight'>
            <h1>{skill.name}</h1>

        </Grid>
    );
}
export default SkillPage;
