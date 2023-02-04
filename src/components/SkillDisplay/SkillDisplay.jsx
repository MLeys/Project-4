import React from 'react';
import { 
    Segment, Card

} from 'semantic-ui-react';

import SubSkillCard from '../SubSkillCard/SubSkillCard';

export default function SkillDisplay({ allSkills }) {

    
    return (
        <>
                {
            allSkills?.map((skill) => {
                return (
                    <Segment.Group>
                        <Segment textAlign='center'>{skill.name}</Segment>
                            <Segment.Group textAlign='center' horizontal>
                            <Segment.Group>SubSkills
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