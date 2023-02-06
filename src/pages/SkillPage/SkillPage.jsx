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



function SkillPage({ skill, handleAddSubSkill, allSkills, getSkill, getSkills, loggedUser, handleAddSkill, unAssignSkillUser, assignSkillUser}) {
    
    
    const skillName  = useParams().skillName;
    // console.log(useParams(), "< user params")
 

    // (skill?.name !== skillName) ? '' : skillDetail();


    async function skillDetail() {
        try {
            getSkill(skillName)
            
        }catch(err){
            console.log(err, "skill detail error")
        }
    }
    
    
    useEffect(() => {
        //Getting posts, C(R)UD
        skillDetail();
        
      }, [(skill.name !== skillName)]); 

    return (  
        <>
            <h1>Skill Page - {skill?.name} </h1>
            <SkillDisplay skill={skill} loggedUser={loggedUser} unAssignSkillUser={unAssignSkillUser} handleAddSubSkill={handleAddSubSkill} handleAddSkill={handleAddSkill} />

        </>
    );
}
export default SkillPage;
