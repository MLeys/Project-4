import React from 'react';
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




export default function SkillGroup({ skill, loggedUser, unAssignSkillUser, assignSkillUser, handleAddSubSkill, }) {
    // console.log(loggedUser.username, "req.user")
    // skill.usersAssigned.findIndex(user => console.log(user.username))
    const assignIndex = skill.usersAssigned.findIndex(user => user.username === loggedUser.username)
    console.log(assignIndex, "<=== INDEX")
    
    const assignColor = assignIndex > -1 ? 'green' : 'red'
    const assignIcon = assignIndex > -1 ? 'plus' : 'minus'
    

    const handleAssign = assignIndex > -1 ? () => unAssignSkillUser(skill) : () => assignSkillUser(skill)
    // function handleAssign(skill) {
    //     console.log(skill,"<<<<<<<<<<")
    //     const assignIndex = skill.usersAssigned.findIndex(user => user.username === loggedUser.username)
    //     console.log(assignIndex), "ASSIGN INDEX"

    //     // assignSkillUser(skill)
    // }
    // const { color } = 'red'
    // const { icon } = 'plus'

    return (
        <>
            <Link to='' >
                <Label
                    corner='left'
                    color="grey" 
                    as='a' 
                    icon='edit' 
                    size="mini" 
                />
            </Link>
            <Link to='' onClick={() => handleAssign()}>
                <Label
                        corner='right'
                        color={assignColor}
                        as='a' 
                        icon={assignIcon}
                        size="mini" 
                        
                    />
            </Link>

            

        <Link to={`skills/${skill.name}`} > 
            <Segment fluid raised inverted >
                {skill.name}
            </Segment>
        
        </Link>
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