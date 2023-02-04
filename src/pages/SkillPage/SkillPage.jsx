import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    Grid,
    Segment,

} from 'semantic-ui-react';

import * as skillsApi from '../../utils/skillApi'



function SkillPage({ loggedUser }) {
    const { skillName } = useParams();


    return (  
        <>
            <h1>Skill Page</h1>
        </>
    );
}

export default SkillPage;
