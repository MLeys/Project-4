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


function DashboardPage({
  loggedUser, unAssignSkillUser,  assignSkillUser, 
  handleDeleteSkill, handleAddSkill,
  handleAddSubSkill,
  allResources, handleAddResource
  
}) {
  const skills = useContext(SkillsContext).skills
  console.log(skills, '<=== Skills from context (dash)')


  const { username } = useParams();
  // console.log(`username(Dash): ${username}`)
  const [userSkills, setUserSkills] = useState([]);

  function filterUserSkills() {
    if (skills) {
      const userSkillsList = skills?.filter(skill => skill.usersAssigned.some(assigned => assigned.id === loggedUser.id))

      // console.log(`userSkillsList: ${userSkillsList}`)
      setUserSkills([...userSkillsList])
      console.log(`userSkills: ${userSkills}`)
    }


  }

	const skillPanes = userSkills?.map((skill, index) => ({
		menuItem: (`${skill.name} - ${index}` ),
    render: () => (
      <Tab.Pane>
        <SkillDisplay key={`skillDisplay-${skill.id}`} 
          skill={skill} handleAddSkill={handleAddSkill} 
          loggedUser={loggedUser} 
          unAssignSkillUser={unAssignSkillUser} 
          assignSkillUser={assignSkillUser} 
          handleAddSubSkill={handleAddSubSkill} 
          allSkills={skills}  
          allResources={allResources}
          handleAddResource={handleAddResource}
        />
      </Tab.Pane>
      
    )
	}));

  useEffect(() => {
    // getSkills();
    filterUserSkills();
    
  }, [(!userSkills)]); 
  
  
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