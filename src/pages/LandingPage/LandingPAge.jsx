import React from "react";
import { Grid } from "semantic-ui-react";

import MainSideBar from "../../components/MainSideBar/MainSideBar";

function LandingPage({loggedUser, handleLogout, allSkills, handleAddSkill }) {
    console.log(loggedUser)
    console.log(allSkills, " ALL FUCKING SKILLS") 
    return (

            <Grid.Row>
                {allSkills.map((skill) => {
                    console.log(skill.name)


                    })}


            </Grid.Row>



    
    
    
    
    );
}

export default LandingPage;