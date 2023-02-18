import React from 'react';
import { useState, useEffect } from "react";
import { Link, Route, Routes, Navigate, useParams} from 'react-router-dom';


import { 
    Segment,
    Card,
    Button,
    Icon,
    Label


} from 'semantic-ui-react';

import SkillGroup from '../SkillGroup/SkillGroup';


export default function SkillDisplay({ skill, loggedUser, unAssignSkillUser, allSkills, getSkill, handleAddSubSkill, handleAddSkill, assignSkillUser }) {



    return (
        <Segment.Group raised >
            <SkillGroup skill={skill} handleAddSkill={handleAddSkill} loggedUser={loggedUser} unAssignSkillUser={unAssignSkillUser} assignSkillUser={assignSkillUser} handleAddSubSkill={handleAddSubSkill} />
        </Segment.Group>
    )
}