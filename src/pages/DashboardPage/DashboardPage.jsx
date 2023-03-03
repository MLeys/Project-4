import { useState, useEffect, useContext } from "react";
import { useParams} from "react-router-dom";
import { 
  Segment,
  Grid,
  Icon,
  Image,
  Menu,
  Tab,
  Progress
} from 'semantic-ui-react';


import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import SkillDisplay from "../../components/SkillDisplay/SkillDisplay";
import UserSkillsBarGraph from "../../components/UserSkillsBarGraph/UserSkillsBarGraph";


function DashboardPage({ handleAddSubSkill,allResources, handleAddResource }) {
  
  const skills = useContext(SkillsContext).skills;
  const loggedUser = useContext(SkillsContext).loggedUser;
  const { username } = useParams();
  // console.log(`username(Dash): ${username}`)
  const userSkills = skills?.filter(skill => skill.usersAssigned.some(user => user._id === loggedUser._id))

	const skillPanes = userSkills?.map((skill, index) => ({
		menuItem: (`${skill.name} - ${index}` ),
    render: () => (
      <Tab.Pane>
        <SkillDisplay key={`skillDisplay-${skill.id}`} 
          skill={skill}
          handleAddSubSkill={handleAddSubSkill} 
          allResources={allResources}
          handleAddResource={handleAddResource}
        />
      </Tab.Pane>
      
    )
	}));

  useEffect(() => {
    
    
  }, []); 
  
  
  return (
    <>
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Segment color='blue' inverted size='huge'>
            Skills DashboardPage
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row> 
        <Grid.Column width={2} />
        <Grid.Column width={12}>
          <Segment  raised>
            <UserSkillsBarGraph userSkills={userSkills} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={2} />
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        <Tab menu={{ widths: userSkills?.length ,color: 'purple', inverted: true, attached: false, tabular: false, vertical: false, borderless: true }} panes={skillPanes} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
      
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