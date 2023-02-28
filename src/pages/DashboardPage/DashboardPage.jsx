import { useState, useEffect } from "react";
import { 
  Segment,
  Grid,
  Icon,
  Image,
  Menu,
  Tab,
  Progress
} from 'semantic-ui-react';
import { useParams } from "react-router-dom";

import SkillDisplay from "../../components/SkillDisplay/SkillDisplay";
import UserSkillsBarGraph from "../../components/UserSkillsBarGraph/UserSkillsBarGraph";


function Dashboard({
  loggedUser, unAssignSkillUser,  assignSkillUser, 
  handleDeleteSkill, handleAddSkill,
  handleAddSubSkill,
  allSkills, getSkill, getSkills, getUserSkills,
  
}) {



  const { username } = useParams();
  // console.log(`username(Dash): ${username}`)
  const [userSkills, setUserSkills] = useState([]);

  function filterUserSkills() {

    const userSkillsList = allSkills.filter(skill => skill.usersAssigned.some(assigned => assigned._id === loggedUser._id))

    // console.log(`userSkillsList: ${userSkillsList}`)
    setUserSkills([...userSkillsList])
    console.log(`userSkills: ${userSkills}`)

  }

	const skillPanes = userSkills.map((skill, index) => ({
		menuItem: (`${skill.name} - ${index}` ),
    render: () => (
      <Tab.Pane>
        <SkillDisplay key={skill.id} skill={skill} handleAddSkill={handleAddSkill} loggedUser={loggedUser} unAssignSkillUser={unAssignSkillUser} assignSkillUser={assignSkillUser} handleAddSubSkill={handleAddSubSkill} allSkills={allSkills}  />
      </Tab.Pane>
      
    )
	}));

  useEffect(() => {
    getSkills();
    filterUserSkills();
    
  }, [(userSkills === '')]); 
  
  
  return (
    <>
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Segment color='blue' inverted size='huge'>
            Skills Dashboard
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
        <Tab menu={{ widths: userSkills.length ,color: 'purple', inverted: true, attached: false, tabular: false, vertical: false, borderless: true }} panes={skillPanes} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
      
    </>
  )
  
}

export default Dashboard;

    


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