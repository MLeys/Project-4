import React from 'react'
import { Link, useNavigate} from "react-router-dom";
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
  const navigate = useNavigate();
  const clickHandler = () =>  handleDeleteSkill(skill._id)
  
  return ( 
    <Menu.Item>
      <Label color='red' as='a'>
        <Icon name='delete' key={skill._id} onClick={() => clickHandler() }/>
      </Label>
      {skill.name}
    </Menu.Item>
   );
   
}

export default SkillList;

