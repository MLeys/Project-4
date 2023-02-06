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



function SkillPage({skill, handleAddSubSkill, allSkills, getSkill, getSkills, loggedUser }) {
    console.log(skill, "skillpage skill")
    const skillName  = useParams().skillName;
    // console.log(useParams(), "< user params")
    console.log(skillName, "skillname")
   
    


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
            <SkillDisplay skill={skill}/>

        </>
    );
}
export default SkillPage;
