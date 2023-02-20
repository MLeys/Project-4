import { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Sidebar,
    Menu,
    Accordion,
    Icon
} from "semantic-ui-react";

// import SkillList from "../SkillList/SkillList";
import SkillAccordion from "../SkillAccordion/SkillAccordion";

function VerticalSidebar({
    animation, direction, visible, loggedUser,
    allSkills, handleAddSkill, handleDeleteSkill,
    handleClose
}) {
    console.log(allSkills, "<= allSkills ( vSidebar )")
//     const [activeIndex, setActiveIndex] = useState(null);


//     function handleClick(index)  {
//         setActiveIndex(activeIndex === index ? null : index)
//     };

//     const subSkillPanels = [
//         allSkills.subSkills.map((subSkill) => {

//         })
//     ]
    
//     function renderSubSkills(subSkills) {
//         return subSkills.map((subSkill) => {
//             <div key={subSkill.id}>
//                 <p>{subSkill.name}</p>
//                 <ul>
//                     {subSkill.resources.map((resources) => {
//                         <li key={resources.id}>{resource.name}</li>
//                     })}
//                 </ul>
//             </div>
//         });
//     };
//     function renderSkills(allSkills) {
//         return allSkills.map((skill) => {
//           <div key={skill.id}>
//             <Accordion.Title
//               active={activeIndex === skill.id}
//               index={skill.id}
//               onClick={() => handleClick(skill.id)}
//             >
//               <Icon name='dropdown' />
//               {skill.name}
//             </Accordion.Title>
//             <Accordion.Content active={activeIndex === skill.id}>
//               {/* {renderSubSkills(skill.subSkills)} */}
//             </Accordion.Content>
//           </div>
//         });
//     };
    
//     return (
//         <Sidebar 
//             style={{ textColor: 'white'}}
//             as={Menu}
//             animation={animation}
//             direction={direction}
//             inverted
//             vertical
//             visible={visible}
//             width='thin'
//         >
//         <Accordion styled>{renderSkills(allSkills)}</Accordion>
//         </Sidebar>
//     ) 
// };
    



    return (
      
        <Sidebar 
            style={{ textColor: 'white'}}
            as={Menu}
            animation={animation}
            direction={direction}
            inverted
            vertical
            visible={visible}
            width='wider'
        >
        Available Skills
        {/* <SkillList allSkills={allSkills}/> */}
        <SkillAccordion allSkills={allSkills} currentUser={loggedUser}/>
        </Sidebar>
    )
  
  }

export default VerticalSidebar;

        {/* {
          allSkills?.map((skill) => {
            return (



              <SkillList 
                key={skill._id} 
                skill={skill} 
                handleAddSkill={handleAddSkill}
                handleDeleteSkill={handleDeleteSkill} 
              />
            )
          })
        } */}