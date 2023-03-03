import { useEffect, useState, useContext } from "react";
import { Grid, Segment} from "semantic-ui-react";

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import MainSideBar from "../../_UNUSED/MainSideBar/MainSideBar";
import SkillDisplay from "../../components/SkillDisplay/SkillDisplay";
import { unAssignUser } from "../../utils/skillApi";


function LandingPage({ handleAddSubSkill, allResources, handleAddResource }) {

    const skills = useContext(SkillsContext).skills;
    
    useEffect(() => {

      }, []); 
    return (
        <div>
        {
            skills?.map((skill) => {
                return (
                    <SkillDisplay 
                        key={`skillDisplay-${skill._id}`} 
                        skill={skill} 
                        handleAddSubSkill={handleAddSubSkill} 
                        allResources={allResources}
                        handleAddResource={handleAddResource}
                    />
                )
            })
        }
        
        
        </div>
               


    );
}

export default LandingPage;