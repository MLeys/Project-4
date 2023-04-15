import React from "react";
import { useContext } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import SkillCard from "../SkillCard/SkillCard";


function DisplaySkills() {

  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;

  return ( 
    skills?.map((skill, index) => (
      <Grid xs={12} key={`skillCard-${index}`} display="flex" justifyContent="center" alignItems="center" >
        <SkillCard skill={skill} index={index} />
      </Grid>
      ))
   );
}

export default DisplaySkills;