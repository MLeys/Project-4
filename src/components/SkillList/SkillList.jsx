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
import SkillPortal from '../SkillPortal/SkillPortal';

function SkillList({skill, handleDeleteSkill, handleAddSkill}) {

  const clickHandler = () => handleDeleteSkill(skill._id)


  
  return ( 
    <div>
        
      <Menu.Item>
        <Label color='red' as='a'>
          <Icon name='delete' key={skill.id} onClick={clickHandler}/>
      </Label>
        {skill.name}
      </Menu.Item>


    </div>

   );
   
}

export default SkillList;

