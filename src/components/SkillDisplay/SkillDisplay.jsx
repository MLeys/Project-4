import React from 'react';
import { Link, Route, Routes, Navigate} from 'react-router-dom';


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




export default function SkillDisplay({ allSkills, getSkill, handleAddSubSkill, assignSkillUser }) {

    function handleAssign(skill) {
        console.log('clicked')
        assignSkillUser(skill)
    }


    return (
        <>
        {
            allSkills?.map((skill) => {
                return (
                    <Segment.Group raised key={skill._id}>
                            <Link to='' >
                                <Label
                                    corner='left'
                                    color="grey" 
                                    as='a' 
                                    icon='edit' 
                                    size="mini" 
                                />
                            </Link>
                            <Link to='' onClick={() => assignSkillUser(skill._id)}>
                                <Label
                                        corner='right'
                                        color="green" 
                                        as='a' 
                                        icon='plus' 
                                        size="mini" 
                                        
                                    />
                            </Link>

                            

                        <Link to={`skills/${skill.name}`} onClick={() =>
                            getSkill(skill._id)
                        } > 
                            <Segment fluid raised inverted >
                                {skill.name}
                            </Segment>
                        
                        </Link>


                            
                        
                        
                        <Segment.Group text-align='center' horizontal>       
                        <SubSkillPortal handleAddSubSkill={handleAddSubSkill} skill={skill} />          
                            <SubSkillDisplay getSkill={getSkill} skill={skill} handleAddSubSkill={handleAddSubSkill}/>
                            <Segment.Group> Resources
                                <Card>
                
                                </Card>
                            </Segment.Group>
                
                        </Segment.Group>
                    </Segment.Group>
                )
            })
        }

        </>



    )
}