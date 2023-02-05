import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    Grid,
    Segment,

} from 'semantic-ui-react';

import * as skillsApi from '../../utils/skillApi'


export default function SubSkillPage({ loggedUser, skill, getSkill }) {
    const subParams = useParams();
   
    const parentName = subParams.skillName
    const subId = subParams.id 
    console.log(parentName, subId)



    return (
        <>
            <h1>Subskill page - {parentName} - {subId}</h1>
        </>
    )
}