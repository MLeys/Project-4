import React from 'react';
import { 
  Accordion,
  Menu,
  Segment,
  Button

} from 'semantic-ui-react';

import "./SkillList.css"

function SkillList({ allSkills }) {

  const AccordionPanel = ({ title, content }) => (
    <Accordion.AccordionPanel key={title} title={title}>
      {content}
      <button>Button 1</button>
      <button>Button 2</button>
    </Accordion.AccordionPanel>
  )
  


  // const rootPanels = allSkills.map((skill, index) => {
  //   const skillButton = <Button> </Button>
  //   const subSkillPanels = skill.subSkills.map((subSkill, subIndex) => {

  //     return {

  //       key: `subskill-${index}-${subIndex}`,
  //       title: subSkill.title,
  //       content: {
  //         content: (
  //           <div>
  //             <p>{subSkill.details}</p>
  //             {/* <Accordion.Accordion panels={resourcePanels} /> */}
  //           </div>
  //         )
  //       }
  //     };
  //   });

  //   return {
  //     key: `skill-${index}`,
  //     title: skill.name,
  //     content: { content: <Accordion.Accordion inverted panels={subSkillPanels} /> }
  //   }
    

  // });

  return (
    <Accordion
      className='vSidebar' 
      defaultActiveIndex={0} 
      panels={rootPanels}
      fluid="true"
      styled>
      </Accordion>
  )
};

export default SkillList;



      // const resourcePanels = subSkill.resources.map((resource, resourceIndex) => {
      //   return {
      //     key: `resource-${index}-${subIndex}-${resourceIndex}`,
      //     title: resource.title,
      //     content: (
      //       <div>
      //         <p>{resource.description}</p>
      //         <a href={resource.link}>Link</a>
      //       </div>
      //     )
      //   };
      // });















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