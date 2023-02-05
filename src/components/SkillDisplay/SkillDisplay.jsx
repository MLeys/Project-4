import React from 'react';
import { Link, Route, Routes, Navigate} from 'react-router-dom';


import { 
    Segment,
    Card,
    Button,
    Icon,


} from 'semantic-ui-react';

import SubSkillPortal from '../SubSkillPortal/SubSkillPortal';
import SubSkillPage from '../../pages/SubSkillPage/SubSkillPage';
import SkillPage from '../../pages/SkillPage/SkillPage';
import SubSkillCard from '../SubSkillCard/SubSkillCard';
import SubSkillDisplay from '../SubSkillDisplay/SubSkillDisplay';




export default function SkillDisplay({ allSkills, getSkill, handleAddSubSkill}) {

    return (
        <>
        {
            allSkills?.map((skill) => {
                return (
                    <Segment.Group raised key={skill._id}>
                        <Link to={`skills/${skill.name}`} onClick={() =>
                            getSkill(skill._id)
                        } > 
                            <Segment fluid raised inverted >
                                {skill.name}
                            </Segment>
                            </Link>
                            <SubSkillPortal handleAddSubSkill={handleAddSubSkill} skill={skill} />
                        
                        
                        <Segment.Group text-align='center' horizontal>                 
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