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



function SkillPage({handleAddSubSkill, allSkills, getSkill, getSkills, loggedUser }) {
    const [skill, setSkill] = useState({})
    const skillName  = useParams().skillName;
    console.log(useParams(), "< user params")
    console.log(skillName, "skillname")
    


    async function skillDetail(skillName) {
        try {
            const response = await getSkill(skillName)
            console.log(response, "response")
            
        }catch(err){
            console.log(err, "skill detail error")
        }
    }skillDetail(skillName)
    
    
    useEffect(() => {
        //Getting posts, C(R)UD
        
        
      }, [!skillName]); 

    return (  
        <>
            <h1>Skill Page - {skill?.name} </h1>
            <SkillDisplay skill={skill}/>

        </>
    );
}
export default SkillPage;
