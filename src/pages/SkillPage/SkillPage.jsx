import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    Grid,
    Segment,
    Header

} from 'semantic-ui-react';

import * as skillsApi from '../../utils/skillApi'



function SkillPage({skill, getSkill}) {
    
    const { skillName } = useParams();
    console.log(skill.skillData)
    const currentSkill = skill.skillData;
    
    // console.log(skillName, "<-- skillName from useParams") 



    useEffect(() => {
        getSkill(skillName)
      }, []); 


    return (  
        <>

            <h1>Skill Page </h1>
        </>
    );
}

export default SkillPage;
