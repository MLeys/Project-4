import React from 'react';
import { Link, Route, Routes, Navigate} from 'react-router-dom';


import { 
    Segment,
    Card,
    Button,
    Icon,
    Header

} from 'semantic-ui-react';

import SubSkillPortal from '../SubSkillPortal/SubSkillPortal.jsx';
import AddSubSkillForm from '../AddSubSkillForm/AddSubSkillForm.jsx';
import SubSkillPage from '../../pages/SubSkillPage/SubSkillPage';
import SkillPage from '../../pages/SkillPage/SkillPage';
import SubSkillCard from '../SubSkillCard/SubSkillCard';

export default function SubSkillDisplay({skill, handleAddSubSkill, getSkill }) {

    // function skillHandler(skillId) {
    //     getSkill(skillId)
    // }
    const subSkills = skill?.subSkills

    return (
        <>
        <SubSkillPortal handleAddSubSkill={handleAddSubSkill} skill={skill} />
        <Segment.Group>
            <Segment.Group horizontal>
                <Segment><Header>Subskills</Header></Segment>
                <Segment>

                    <Button icon labelpostition='right' >
                        <Link to={`skills/${skill.name}/subskill`}>
                            <Icon name='plus' />
                            
                        </Link>
                    </Button>
                </Segment>                
            </Segment.Group>
        
        <SubSkillCard subSkills={subSkills} />
        </Segment.Group>
        </>



    )
}
    

    


