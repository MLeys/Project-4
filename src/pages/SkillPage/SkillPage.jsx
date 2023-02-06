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



function SkillPage({handleAddSubSkill, allSkills, getSkill, getSkills, skill, loggedUser }) {
    console.log(skill, "<-skillpage skill")
    
    const { skillName } = useParams();
    console.log(skillName, "skillname")
    
    useEffect(() => {
        //Getting posts, C(R)UD
        getSkill(skillName);
        
      }, []); 

    return (  
        <>
            <h1>Skill Page - {skill.name} </h1>
            <SkillDisplay skill={skill}/>

        </>
    );
}
export default SkillPage;
