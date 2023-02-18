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



function SkillPage({isSkillPage, skill, handleAddSubSkill, getSkill, loggedUser, handleAddSkill, unAssignSkillUser, assignSkillUser}) {
    
    
    const skillName  = useParams().skillName;

    async function skillDetail() {
        try {
            await getSkill(skillName)
            isSkillPage = true
            console.log(skill, '=== SKILL on skillpage');
        }catch(err){
            console.log(err, "skill detail error")
        }
    }
    
    
    useEffect(() => {
        //Getting posts, C(R)UD
        skillDetail();
        isSkillPage(true);

      }, [(skill.name !== skillName)]); 

    return (  
        <>
            <h1>Skill Page - {skill?.name} </h1>
            {/* <SkillDisplay skill={skill} loggedUser={loggedUser} assignSkillUser={assignSkillUser} unAssignSkillUser={unAssignSkillUser} handleAddSubSkill={handleAddSubSkill} handleAddSkill={handleAddSkill} /> */}
            <SkillDisplay skill={skill} loggedUser={loggedUser} assignSkillUser={assignSkillUser} unAssignSkillUser={unAssignSkillUser} handleAddSkill={handleAddSkill} handleAddSubSkill={handleAddSubSkill}  />

        </>
    );
}
export default SkillPage;
