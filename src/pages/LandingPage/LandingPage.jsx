import React from "react";
import { useEffect, useState } from "react";
import { Grid, Segment} from "semantic-ui-react";

import MainSideBar from "../../_UNUSED/MainSideBar/MainSideBar";
import SkillDisplay from "../../components/SkillDisplay/SkillDisplay";
import { unAssignUser } from "../../utils/skillApi";


function LandingPage({getSkills,unAssignSkillUser, assignSkillUser, 
    loggedUser, handleLogout, allSkills, 
    handleAddSkill, handleDeleteSkill, handleAddSubSkill,
    handleAddResource
}) {
    console.log(handleAddResource.type)
    // console.log(loggedUser)
    // console.log(allSkills, " ALL SKILLS - landing page") 
    useEffect(() => {
        //Getting posts, C(R)UD
        // getSkills();
        
      }, []); 
    return (
        <div>
        {
            allSkills?.map((skill) => {
                return (
                    <SkillDisplay 
                        key={`skillDisplay-${skill._id}`} 
                        skill={skill} handleAddSkill={handleAddSkill} 
                        loggedUser={loggedUser} 
                        unAssignSkillUser={unAssignSkillUser} 
                        assignSkillUser={assignSkillUser} 
                        handleAddSubSkill={handleAddSubSkill} 
                        allSkills={allSkills}  
                        handleAddResource={handleAddResource}
                    />
                )
            })
        }
        
        
        </div>
               


    );
}

export default LandingPage;