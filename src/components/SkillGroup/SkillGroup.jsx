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

    const handleAssign = ''
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
                        color='red'
                        as='a' 
                        icon='minus'
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