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


function SkillList({skill, key, handleDeleteSkill , allSkills}) {
  // console.log(skill, "<<<<<EACH SKILL")
  // console.log(allSkills, '<<<<< ALl Skills')

  // const skillIndex = allSkills.findIndex(skil => skil._id == skill._id )
  // console.log(skillIndex, "SKILL INDEXXXXX")
  
  // async function handleDelete(e) {
  //   e.preventDefault();
  //   try {
  //     await handleDeleteSkill(allSkills[skillIndex]._id)
      
  //   } catch (err) {
  //     console.log(err, "clickDelete ------")
  //   }
  // }
 
  const clickHandler = () => handleDeleteSkill(skill._id)


  return ( 
    <Menu.Item  >
      <Label color='red' >
        
          <Icon centered name='delete' key={skill.id} onClick={clickHandler}/>
        
     </Label>
      {skill.name}
    </Menu.Item>
   );
   <Label color='red' horizontal onClick={clickDeleteHandler} key={skill._id} ></Label>
   
}

export default SkillList;

// const SkillList = () => (
//   <List divided Link verticalAlign='middle'>

//   </List>
// )

// export default SkillList
