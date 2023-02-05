import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    Grid,
    Segment,

} from 'semantic-ui-react';

import * as skillsApi from '../../utils/skillApi'
import subSkills from "../../../controllers/subSkills";


export default function SubSkillPage({ loggedUser, skill, getSubSkills, subSkills, getSkill}) {
    const subParams = useParams()
    const parentName = useParams().skillName;
    const subId = useParams().id 
    console.log(parentName, subId, subParams)
    console.log(subSkills, "<--subSkills on subSkillPage")
    
    

    useEffect(() => {
        getSkill(parentName);
      }, []); 

    return (
        <>
            <h1>Subskill page - {parentName} - {subId}</h1>
        </>
    )
}