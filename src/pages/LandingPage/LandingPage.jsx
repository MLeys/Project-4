import React from "react";
import { Grid, Segment} from "semantic-ui-react";

import MainSideBar from "../../components/MainSideBar/MainSideBar";
import SkillDisplay from "../../components/SkillDisplay/SkillDisplay";


function LandingPage({loggedUser, handleLogout, allSkills, handleAddSkill, handleDeleteSkill}) {
    console.log(loggedUser)
    console.log(allSkills, " ALL SKILLS - landing page") 
    return (
        <Grid>
            <Grid.Row>
            
            </Grid.Row>
            <Grid.Row>
               
                    <SkillDisplay allSkills={allSkills}/>
               
            </Grid.Row>
  
        </Grid>

    );
}

export default LandingPage;