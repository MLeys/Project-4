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



function SkillPage({handleAddSubSkill, allSkills, activeSkill, getSkill, }) {



    useEffect(() => {
        
      }, []); 

    return (  
        <>

            <h1>Skill Page - {} fdf</h1>

        </>
    );
}

export default SkillPage;
