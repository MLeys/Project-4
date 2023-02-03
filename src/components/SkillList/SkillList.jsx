import React from 'react'
import { Button, Image, List, Menu} from 'semantic-ui-react'


function SkillList({skill, key}) {
  console.log(skill, "<<<<<EACH SKILL")
  return ( 
    <Menu.Item key={skill._id} as='a'>
      {skill.name}
    </Menu.Item>
   );
}

export default SkillList;

// const SkillList = () => (
//   <List divided Link verticalAlign='middle'>

//   </List>
// )

// export default SkillList
