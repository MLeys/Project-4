import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    Grid,
    Segment,
    Header

} from 'semantic-ui-react';

import * as skillsApi from '../../utils/skillApi'



function SkillPage({currentSkill, allSkills}) {
    console.log(allSkills, 'AAAAAALLLL SKILLLLLS')
    console.log(currentSkill, '<<<<< CURRENT SKILLLLLL')
    const { skillName } = useParams();

    let skill = allSkills.filter((s) =>{
        return s.name === skillName
    } )
    console.log(skill[0]?.name, '<---- SKILL HERE AND NOW')
   




    // async function getSkill(allSkills) {
    //     try {
    //         const response = await skillsApi.getSkill(skillName);
    //         // console.log(response.skillDoc, "<--- getSkill REsponse")
    //         const skillData = await response.skillDoc
            
    //         console.log(skillData, "<--- SkillDATA")
            
    
    //     } catch(err) {
    //         console.log(err, "<--- getSkill SINGLE error")
    //     }
        
    //   }
    
    
    
    

    console.log(skillName, "<-- skillName from useParams") 



    useEffect(() => {
        
      }, []); 


    return (  
        <>
            
            <h1>Skill Page - {skill[0]?.name} </h1>
        </>
    );
}

export default SkillPage;
