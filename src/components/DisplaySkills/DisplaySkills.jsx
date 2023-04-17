import React from "react";
import { useContext, lazy, Suspense } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

const SkillCard2 = lazy(() => import("../SkillCard2/SkillCard2"));

function DisplaySkills() {
  const ctx = useContext(SkillsContext);
  const skills = ctx.skills;

  return ( 
    
      skills?.map((skill, index) => (
        
          <Grid xs={12} key={`skillCard-${index}`} display="flex" justifyContent="center" alignItems="center" >
            <Suspense fallback={'LOADING'}>
              <SkillCard2 skill={skill} index={index} />
            </Suspense>

          </Grid>
        ))

   );
}

export default DisplaySkills;