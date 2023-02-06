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

import SubSkillPortal from '../SubSkillPortal/SubSkillPortal';
import SubSkillPage from '../../pages/SubSkillPage/SubSkillPage';
import SkillPage from '../../pages/SkillPage/SkillPage';
import SubSkillCard from '../SubSkillCard/SubSkillCard';
import SubSkillDisplay from '../SubSkillDisplay/SubSkillDisplay';
import SkillPortal from '../SkillPortal/SkillPortal';



export default function SkillGroup({ ifAssigned, handleAddSkill, skill, loggedUser, unAssignSkillUser, assignSkillUser, handleAddSubSkill }) {
    console.log(skill, "skill in skill group")
    const assignIndex = skill?.usersAssigned.findIndex(user => user.username === loggedUser.username)
    
    const assignColor = assignIndex > -1 ? 'red' : 'green';
    const assignIcon = assignIndex > -1 ? 'minus' : 'plus';
    const assignContent = assignIndex > -1 ? 'unassign' : 'assign'
    

    const handleAssign = assignIndex > -1 ? () => unAssignSkillUser(skill) : () => assignSkillUser(skill)

    useEffect(() => {
        //Getting posts, C(R)UD
        
        
      }, []); 


    return (
        <>
        
        <Segment inverted >
            <Link to='' >
                <Label
                    corner='left'
                    color="grey" 
                    as='a' 
                    icon='edit' 
                    size="mini" 
                />
            </Link>
        <Link to={`/skills/${skill?.name}`} > 
            <Segment fluid raised inverted >
                {skill?.name}
            </Segment>
        </Link>
            <Link to='' onClick={() => handleAssign()}>
                <Label
                        
                        attached='top right'
                        color={assignColor}
                        as='a' 
                        content={assignContent}
                        icon={assignIcon}
                        size="mini"         
                    />
            </Link>

        </Segment>


        
  
        <Segment.Group text-align='center' horizontal>       
        <SubSkillPortal handleAddSubSkill={handleAddSubSkill} skill={skill} />          
            <SubSkillDisplay skill={skill} handleAddSubSkill={handleAddSubSkill}/>
            <Segment.Group> Resources
                <Card>

                </Card>
            </Segment.Group>

        </Segment.Group>
        </>

    )
}