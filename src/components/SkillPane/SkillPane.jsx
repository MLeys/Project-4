import { useState, useEffect, useContext } from "react";
import { 
	Segment,
	Card,
	Button,
	Icon,
	Label,
	Grid,
	Header,
	Container,
	Item

} from 'semantic-ui-react';

import SubSkillsTabDisplay from "../SubSkillsTabDisplay/SubSkillsTabDisplay";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import SubSkillPortal from '../SubSkillPortal/SubSkillPortal';
import SkillAssignCornerBtn from "../SkillAssignCornerBtn/SkillAssignCornerBtn";
import SubSkillDisplay from '../SubSkillDisplay/SubSkillDisplay';
import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';
import SearchYouTube from '../SearchYouTube/SearchYouTube';

function SkillPane({ skill, handleAddSubSkill, allResources, handleAddResource }) {
  const ctx = useContext(SkillsContext)
  const skills = ctx.skills;
  const userSkills = ctx.userSkills;
  const subSkills = skill.subSkills;

  const loggedUser = useContext(SkillsContext).loggedUser;
	const assignSkillUser = useContext(SkillsContext).assignSkillUser;
	const unAssignSkillUser = useContext(SkillsContext).unAssignSkillUser;
	
	// const [youTubeSearchResults, setYouTubeSearchResults] = useState([]);
	// const [skillResources, setSkillResources] = useState([])

	// const assignIndex = skill?.usersAssigned?.some(user => user.username === loggedUser.username)
	// const assignColor = assignIndex ? 'red' : 'green';
	// const assignIcon = assignIndex ? 'minus' : 'plus';
	// const assignContent = assignIndex ? 'unassign' : 'assign'

	// const handleAssign = assignIndex ? () => unAssignSkillUser(skill) : () => assignSkillUser(skill)

	// function liftYouTubeSearchResults(results) {
	// 	(results) ? setYouTubeSearchResults([...results]) : '';
	// }
	

	// function getSkillResources() {
	// 	// console.log(allResources, "ALL RESOURCES")
	// 	const resources = allResources.filter((r) => r.skillId === skill._id )
	// 	// console.log(`resources-${skill.name}: ${resources}`)
	// 	setSkillResources(resources)
	// }



	return (
		
		<Grid >
      <Header  as={Segment}  attached="top" to={`/skills/${skill?.name}`} inverted={true} color='black' >
        {skill?.name}
				
      </Header>
      <SubSkillPortal handleAddSubSkill={handleAddSubSkill} skill={skill} />
			<SkillAssignCornerBtn skill={skill} test={skill.name} />
			
      <Grid.Row className="subSkillDisplayTab-row">
				
        <SubSkillsTabDisplay skill={skill}>

        </SubSkillsTabDisplay>
      </Grid.Row>

 	</Grid>

	)
}
export default SkillPane;

// {/* <Grid.Row>
// <Grid.Column width={4}>
//   <SubSkillDisplay 
//     skill={skill} 
//     handleAddSubSkill={handleAddSubSkill}
//     youTubeSearchResults={youTubeSearchResults}
//     liftYouTubeSearchResults={liftYouTubeSearchResults}
//   /> 
// </Grid.Column>			
// <Grid.Column width={4}>

//   {
//     skillResources?.map((r) => {
//       // console.log(r, "<<-- resource")
//       return (
//         <>
//         <Item key={`resourceSeg-${r._id}`} content={r._id} />
//         </>
//       )
//     })
//   }
// </Grid.Column>	
// <Grid.Column width={8}>
//   <ResourceDisplay
//     skill={skill}
//     loggedUser={loggedUser}
//     youTubeSearchResults={youTubeSearchResults}
//     liftYouTubeSearchResults={liftYouTubeSearchResults}
//     handleAddResource={handleAddResource}
//     skillResources={skillResources}
//   />

// </Grid.Column>				
// <Grid.Column width={1}>

// </Grid.Column>				
// <Grid.Column width={1}>
// </Grid.Column>
// </Grid.Row> */}