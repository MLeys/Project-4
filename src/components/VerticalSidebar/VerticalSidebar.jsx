import {
    Sidebar,
    Menu 
} from "semantic-ui-react";

import SkillList from "../SkillList/SkillList";

function VerticalSidebar({ getSkill, activeSkill, animation, direction, visible, loggedUser, allSkills, handleDeleteSkill}) {
    // console.log(allSkills, "<--- allSkills in Sidebar")
  
    return (
      
      <Sidebar 
        style={{ textColor: 'white'}}
        as={Menu}
        animation={animation}
        direction={direction}
        inverted
        vertical
        visible={visible}
        width='thin'
      >
      
        {
          allSkills?.map((skill) => {
            return (
              <SkillList getSkill={getSkill} activeSkill={activeSkill} key={skill._id} skill={skill} handleDeleteSkill={handleDeleteSkill} allSkills={allSkills}/>
            )
          })
        }
        
      </Sidebar>
    )
  
  }

export default VerticalSidebar;