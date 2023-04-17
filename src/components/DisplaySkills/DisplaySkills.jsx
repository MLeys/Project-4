import React, { Suspense } from "react";
import { useContext, lazy } from "react";


import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

const SkillCard = lazy(() => import("../SkillCard/SkillCard"));


function DisplaySkills() {

  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;

  return ( 
    skills?.map((skill, index) => (
      <Suspense fallback={'LOADING'}>
        <Grid xs={12} key={`skillCard-${index}`} display="flex" justifyContent="center" alignItems="center" >
          <SkillCard skill={skill} index={index} />
        </Grid>
      </Suspense>

      ))
   );
}

export default DisplaySkills;