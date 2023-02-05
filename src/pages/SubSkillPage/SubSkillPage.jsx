import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    Grid,
    Segment,

} from 'semantic-ui-react';

import * as skillsApi from '../../utils/skillApi'
import subSkills from "../../../controllers/subSkills";


export default function SubSkillPage({ loggedUser, skill, allSkills, getSkills}) {
    
    const subParams = useParams()
    const parentName = useParams().skillName;
    const subId = useParams().id 
    // console.log(allSkills, "all skills here")
    const parentSkill = allSkills?.find((skill) => skill.name === parentName);
    // setParent(parentSkill)
    // console.log(parentSkill, "parentskill")
    const subSkills = parentSkill?.subSkills
    // console.log(subSkills, "subskills")
    const subSkill = subSkills?.filter((sub) => sub.id === subId)

    // console.log(parentName, subId, subParams)
    // console.log(subSkills, "<--subSkills on subSkillPage")
    
    

    return (
        <>
            <h1>Subskill page - {parentName} - {subId}</h1>
        </>
    )
}