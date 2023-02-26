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

import SkillDisplay from "../../_UNUSED/SkillDisplay/SkillDisplay";
import skill from "../../../models/skill";
import SkillGroup from "../../components/SkillDisplay/SkillDisplay";



function SkillPage({ skill, handleAddSubSkill, getSkill, loggedUser, handleAddSkill, unAssignSkillUser, assignSkillUser}) {
    console.log(`\n\n\n HERE ======================================================== \n\n\n\n`)
    
    const skillName  = skill.name;

    // async function skillDetail() {
    //     try {
    //         await getSkill(skillName)
            
    //         console.log(skill, '=== SKILL on skillpage');
    //     }catch(err){
    //         console.log(err, "skill detail error")
    //     }
    // }
    
    
    // useEffect(() => {
    //     //Getting posts, C(R)UD
    //     // skillDetail();
    //     // isSkillPage(true);

    //   }, [(skill.name !== skillName)]); 

    return (  
        <>
            <h1>Skill Page - {skillName} </h1>
            {/* <SkillDisplay skill={skill} loggedUser={loggedUser} assignSkillUser={assignSkillUser} unAssignSkillUser={unAssignSkillUser} handleAddSubSkill={handleAddSubSkill} handleAddSkill={handleAddSkill} /> */}
            <SkillGroup skill={skill} loggedUser={loggedUser} assignSkillUser={assignSkillUser} unAssignSkillUser={unAssignSkillUser} handleAddSkill={handleAddSkill} handleAddSubSkill={handleAddSubSkill}  />

        </>
    );
}
export default SkillPage;
