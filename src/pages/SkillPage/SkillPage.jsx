import { useParams, Link } from "react-router-dom";
import { useState, useEffect, Component } from "react";

import {
    Grid,
    Segment,
    Header,
    Button,
    Icon,
    Portal

} from 'semantic-ui-react';

import SkillDisplay from "../../components/SkillDisplay/SkillDisplay";
import skill from "../../../models/skill";



function SkillPage({skill, handleAddSubSkill, allSkills, getSkill, getSkills, loggedUser, handleAddSkill, unAssignSkillUser, assignSkillUser}) {
    console.log(skill, "skillpage skill")
    const skillName  = useParams().skillName;
    // console.log(useParams(), "< user params")
    console.log(skillName, "skillname")
    console.log(loggedUser, "<logged user")
    


    async function skillDetail() {
        try {
            await getSkill(skillName)
            
            
        }catch(err){
            console.log(err, "skill detail error")
        }
    }
    
    
    useEffect(() => {
        //Getting posts, C(R)UD
        skillDetail();
        
      }, [(!skill)]); 

    return (  
        <>
            <h1>Skill Page - {skill?.name} </h1>
            <SkillDisplay skill={skill} loggedUser={loggedUser} unAssignSkillUser={unAssignSkillUser} handleAddSubSkill={handleAddSubSkill} handleAddSkill={handleAddSkill} />

        </>
    );
}
export default SkillPage;
