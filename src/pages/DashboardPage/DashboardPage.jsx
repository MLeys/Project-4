import "./DashboardPage.css"
import { useState, useEffect, useContext } from "react";
import { useParams} from "react-router-dom";
import { 
  Segment,
  Grid,
  Label,
  Menu,
  Tab,
  Progress,
  Container
} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import { DashboardContext } from "../../context/DashboardContext/DashboardContext"

import SkillPane from "../../components/SkillPane/SkillPane";


function DashboardPage({ handleAddSubSkill,allResources, handleAddResource }) {
  const ctx = useContext(SkillsContext);
  const setActiveSkillIndex = ctx.handleSetActiveSkillIndex
  const activeSkillIndex = ctx.activeSkillIndex
  const skills = ctx.skills;
  const loggedUser = ctx.loggedUser;
  const assignSkillUser = ctx.assignSkillUser;
  const unAssignSkillUser = ctx.unAssignSkillUser;
  const getSkills = ctx.getSkills;
  const userSkills = ctx.userSkills;





  
  

	const skillPanes = userSkills?.map((skill, index) => ({
		// menuItem: (`${skill.name} - ${index}` ),
    // menuIten: {key:`pane-${skill.name}-${index}`},
    menuItem: (
      <Menu.Item className="skill_pane" key={`pane-${skill.name}-${index}`} >
        <Progress 
          inverted={true}
          size='small' 
          color='blue' 
          value='4' 
          total='8' 
          progress='ratio' 
        >
        <h4 >{skill.name}</h4>
        
        </Progress>
      </Menu.Item>
    ),
    render: () => (
      <>
      <SkillPane
        skill={skill}
        handleAddSubSkill={handleAddSubSkill} 
        allResources={allResources}
        handleAddResource={handleAddResource}
      />
      {/* <Tab.Pane>
        <SkillDisplay key={`skillDisplay-${skill.id}`} 
          skill={skill}
          handleAddSubSkill={handleAddSubSkill} 
          allResources={allResources}
          handleAddResource={handleAddResource}
        />
      </Tab.Pane> */}
      </>

      
    )
	}));


  useEffect(() => {
    getSkills();
   
  }, []); 
  
  
  return (
    <>
      <Container fluid={true} className='fullScreenHeight'>
        <Tab
          menu={{
            id: 'skillTabs',
            fluid: true,
            color: 'purple', 
            inverted: true, 
            attached: false, 
            tabular: false, 
            vertical: true, 
          }}
          grid ={{ paneWidth: 14, tabWidth: 2 }} 
          panes={skillPanes} 
          
          
          menuPosition='left'
      />
      </Container>
    </>
  )
  
}

export default DashboardPage;

    


// {
//   allSkills.map((skill) => {
//     const assignIndex = skill.usersAssigned.findIndex(user => user.username === loggedUser.username)
//     const ifAssigned = assignIndex > -1 ? true : false;
    
    
//     if (ifAssigned) {
//       // console.log(`skill(Dash): ${skill} index: ${assignIndex}`)
//       return (
//         <>

//           <Segment.Group raised key={`dashSkillCard-${skill._id}`}>
//               <SkillDisplay skill={skill} handleAddSkill={handleAddSkill} loggedUser={loggedUser} unAssignSkillUser={unAssignSkillUser} assignSkillUser={assignSkillUser} handleAddSubSkill={handleAddSubSkill}  />
//           </Segment.Group>
//         </>
//       ) 
//     } 

//   })

// }2