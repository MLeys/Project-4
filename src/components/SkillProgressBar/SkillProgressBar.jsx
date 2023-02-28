import {
    Progress
} from 'semantic-ui-react'


function SkillProgressBar({skill}) {
    console.log(`Skill(pbar):  ${skill}`)
    return ( 
        <Progress value='4' total='5' progress='percent' label={skill.name} />
     );
}

export default SkillProgressBar;