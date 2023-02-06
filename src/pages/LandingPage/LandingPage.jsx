import React from "react";
import { useEffect, useState } from "react";
import { Grid, Segment} from "semantic-ui-react";

import MainSideBar from "../../components/MainSideBar/MainSideBar";
import SkillDisplay from "../../components/SkillDisplay/SkillDisplay";


function LandingPage({getSkills, assignSkillUser, loggedUser, handleLogout, allSkills, handleAddSkill, handleDeleteSkill, handleAddSubSkill}) {
    // console.log(loggedUser)
    // console.log(allSkills, " ALL SKILLS - landing page") 
    useEffect(() => {
        //Getting posts, C(R)UD
        getSkills();
        
      }, []); 
    return (
        <Grid>
            <Grid.Row>

            </Grid.Row>
            <Grid.Row>
               
                <SkillDisplay assignSkillUser={assignSkillUser} handleAddSubSkill={handleAddSubSkill} allSkills={allSkills}  />
               
            </Grid.Row>
  
        </Grid>

    );
}

export default LandingPage;