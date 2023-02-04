import React from 'react';
import { Link, Route, Routes, Navigate} from 'react-router-dom';


import { 
    Segment,
    Card,
    Button,
    Icon

} from 'semantic-ui-react';

import SubSkillPage from '../../pages/SubSkillPage/SubSkillPage';
import SkillPage from '../../pages/SkillPage/SkillPage';
import SubSkillCard from '../SubSkillCard/SubSkillCard';

export default function SubSkillDisplay({skill}) {

    // function skillHandler(skillId) {
    //     getSkill(skillId)
    // }
    

    return (

                    <Segment.Group>fdf
                    <Segment.Group horizontal>
                        <Segment>SubSkills</Segment>
                        <Segment>
                            <Button icon labelpostition='right' >
                                {/* <Link to={`skills/${skill.name}/subskill`}>
                                    <Icon name='plus' />
                                    
                                </Link> */}
                            </Button>
                        </Segment>
                        <Segment> Edit Subskill</Segment>
                    </Segment.Group>
                    <SubSkillCard skill={skill}/>
                </Segment.Group>
                )
            }
        

    


