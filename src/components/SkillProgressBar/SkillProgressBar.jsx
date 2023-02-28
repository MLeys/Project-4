import {
    Progress
} from 'semantic-ui-react'


function SkillProgressBar({skill}) {
    console.log(`Skill(pbar):  ${skill.name}`)
    return ( 
        <Progress value='4' total='8' progress='percent' label={skill.name} key={`pBar-${skill._id}`} />
     );
}

export default SkillProgressBar;