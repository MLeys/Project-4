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

import * as skillsApi from '../../utils/skillApi'



function SkillPage({handleAddSubSkill, allSkills, activeSkill, getSkill, getSkills, skill }) {

    const { skillName } = useParams();

    // async function findSkill(skillName) {
    //     try {
    //         console.log('find skill hitting')
    //         const skillFind = await getSkill(skillName)
    //         setPageSkill(skillFind)

    //     } catch(err) {
    //         console.log(err, "<-- findSkill Error on SkillPage")
    //     }
    // }
    // findSkill(skillName)
    

   

    useEffect(() => {
        getSkill(skillName)
        
      }, []); 

    return (  
        <>
            <h1>Skill Page - {skill.name} </h1>

        </>
    );
}
export default SkillPage;
