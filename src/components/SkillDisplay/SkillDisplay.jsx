import React from 'react';
import { Link, Route, Routes, Navigate, useParams} from 'react-router-dom';


import { 
    Segment,
    Card,
    Button,
    Icon,
    Label


} from 'semantic-ui-react';

import SkillGroup from '../SkillGroup/SkillGroup';


export default function SkillDisplay({ loggedUser, unAssignSkillUser, allSkills, getSkill, handleAddSubSkill, handleAddSkill, assignSkillUser }) {


    return (
        <>
        {
            allSkills?.map((skill) => {
                return (
                    <Segment.Group raised key={skill._id}>
                        <SkillGroup handleAddSkill={handleAddSkill} loggedUser={loggedUser} unAssignSkillUser={unAssignSkillUser} assignSkillUser={assignSkillUser} handleAddSubSkill={handleAddSubSkill} skill={skill} />
                    </Segment.Group>
                )
            })
        }

        </>



    )
}