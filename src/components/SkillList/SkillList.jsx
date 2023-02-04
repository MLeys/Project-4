import React from 'react'
import { Link } from "react-router-dom";
import { 
  Button, 
  Image, 
  List,
  Menu,
  Label,
  Icon,
  

} from 'semantic-ui-react'


function SkillList({skill, handleDeleteSkill , allSkills}) {

  const clickHandler = () => handleDeleteSkill(skill._id)


  return ( 
    <Menu.Item>
      <Label color='red' >
        
          <Icon name='delete' key={skill.id} onClick={clickHandler}/>
        
     </Label>
      {skill.name}
    </Menu.Item>
   );
   
}

export default SkillList;

