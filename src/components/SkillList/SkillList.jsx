import React from 'react';
import { 
  Accordion,
  Menu

} from 'semantic-ui-react';

const SkillList = ({ allSkills }) => {
  const rootPanels = allSkills.map((skill, index) => {
    const subSkillPanels = skill.subSkills.map((subSkill, subIndex) => {
      const resourcePanels = subSkill.resources.map((resource, resourceIndex) => {
        return {
          key: `resource-${index}-${subIndex}-${resourceIndex}`,
          title: resource.title,
          content: (
            <div>
              <p>{resource.description}</p>
              <a href={resource.link}>Link</a>
            </div>
          )
        };
      });

      return {
        key: `subskill-${index}-${subIndex}`,
        title: subSkill.title,
        content: {
          content: (
            <div>
              <p>{subSkill.details}</p>
              <Accordion.Accordion panels={resourcePanels} />
            </div>
          )
        }
      };
    });

    return {
      key: `skill-${index}`,
      title: skill.name,
      content: { content: <Accordion.Accordion panels={subSkillPanels} /> }
    };
  });

  return <Accordion as={Menu} vertical defaultActiveIndex={0} panels={rootPanels} fluid="true" styled/>;
};

export default SkillList;


















// =================================================================================
// import React from 'react'
// import { Link, useNavigate} from "react-router-dom";
// import { 
//   Button, 
//   Image, 
//   List,
//   Menu,
//   Label,
//   Icon,
  

// } from 'semantic-ui-react'
// import SkillPortal from '../SkillPortal/SkillPortal';

// function SkillList({skill, handleDeleteSkill, handleAddSkill}) {
//   const navigate = useNavigate();
//   const clickHandler = () =>  handleDeleteSkill(skill._id)
  
//   return ( 
//     <Menu.Item>
//       <Label color='red' as='a'>
//         <Icon name='delete' key={skill._id} onClick={() => clickHandler() }/>
//       </Label>
//       {skill.name}
//     </Menu.Item>
//    );
   
// }

// export default SkillList;

// ===========================================================================