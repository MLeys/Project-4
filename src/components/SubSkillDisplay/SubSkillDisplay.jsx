import React from 'react';
import { Link, Route, Routes, Navigate} from 'react-router-dom';


import { 
    Segment,
    Card,
    Button,
    Icon,
    Header,
    Grid

} from 'semantic-ui-react';

import SubSkillPortal from '../SubSkillPortal/SubSkillPortal.jsx';
import AddSubSkillForm from '../AddSubSkillForm/AddSubSkillForm.jsx';
import SubSkillPage from '../../pages/SubSkillPage/SubSkillPage';
import SkillPage from '../../pages/SkillPage/SkillPage';
import SubSkillCard from '../SubSkillCard/SubSkillCard';

export default function SubSkillDisplay({skill, handleAddSubSkill, getSkill }) {


    const subSkills = skill?.subSkills

    return (
        <>
        
        <Segment.Group raised>
            <Segment raised>
                <Link to={`skills/${skill.name}/subskill`}>
                    <Segment attached='top' size='big'>SubSkills</Segment>
                </Link>
                <Segment>
                    <SubSkillPortal handleAddSubSkill={handleAddSubSkill} skill={skill} />
                </Segment>                
            </Segment>
        
            <SubSkillCard subSkills={subSkills} />
        </Segment.Group>
        </>



    )
}
    

    


