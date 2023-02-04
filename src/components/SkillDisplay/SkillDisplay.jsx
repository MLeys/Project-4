import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Segment,
    Card,
    Button,
    Icon

} from 'semantic-ui-react';

import SubSkillCard from '../SubSkillCard/SubSkillCard';

export default function SkillDisplay({ allSkills }) {

    
    return (
        <>
                {
            allSkills?.map((skill) => {
                return (
                    <Segment.Group>
                        <Segment text-align='center'>{skill.name}</Segment>
                            <Segment.Group text-align='center' horizontal>
                            <Segment.Group>
                                <Segment.Group horizontal>
                                    <Segment>SubSkills</Segment>
                                    <Segment>
                                        <Button icon labelpostition='right'>
                                            <Link to={`/${skill.name}/subskill`}>
                                                <Icon name='plus' />
                                            </Link>

                                        </Button>
                                    </Segment>
                                    <Segment> Edit Subskill</Segment>
                                </Segment.Group>
                                <SubSkillCard skill={skill}/>
                            </Segment.Group>
                            <Segment.Group> Resourcs
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