import React from "react";
import { Grid } from "semantic-ui-react";

import MainSideBar from "../../components/MainSideBar/MainSideBar";

function LandingPage({loggedUser, handleLogout, allSkills, handleAddSkill, handleDeleteSkill}) {
    console.log(loggedUser)
    console.log(allSkills, " ALL SKILLS - landing page") 
    return (

            <Grid.Row>
                {allSkills.map((skill) => {
                    console.log(skill.name)


                    })}


            </Grid.Row>

    );
}

export default LandingPage;