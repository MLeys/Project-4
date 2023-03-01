import React from 'react';
import { useState, useEffect } from "react";
import { Link, Route, Routes, Navigate, useParams} from 'react-router-dom';


import { 
	Segment,
	Card,
	Button,
	Icon,
	Label,
	Grid,
	Header


} from 'semantic-ui-react';

import SubSkillPortal from '../SubSkillPortal/SubSkillPortal';
import SubSkillPage from '../../pages/SubSkillPage/SubSkillPage';
import SkillPage from '../../pages/SkillPage/SkillPage';
import SubSkillCard from '../SubSkillCard/SubSkillCard';
import SubSkillDisplay from '../SubSkillDisplay/SubSkillDisplay';
import SkillPortal from '../SkillPortal/SkillPortal';
import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';



export default function SkillDisplay({ handleAddSkill, skill, loggedUser, unAssignSkillUser, assignSkillUser, handleAddSubSkill }) {
	const [currentSkill, setCurrentSkill] = useState({});
	const [youTubeSearchResults, setYouTubeSearchResults] = useState([]);
	const [subSkills, setSubSkills] = useState([]);

	const assignIndex = skill?.usersAssigned?.findIndex(user => user.username === loggedUser.username)
	const assignColor = assignIndex > -1 ? 'red' : 'green';
	const assignIcon = assignIndex > -1 ? 'minus' : 'plus';
	const assignContent = assignIndex > -1 ? 'unassign' : 'assign'

	const handleAssign = assignIndex > -1 ? () => unAssignSkillUser(skill) : () => assignSkillUser(skill)

	function liftYouTubeSearchResults(results) {
		(results) ? setYouTubeSearchResults([...results]) : '';
		console.log(`YT Results(skilldisp): ${youTubeSearchResults}`)
	}
	
	function liftSubSkills(subskills) {
		(subskills) ? setSubSkills([...subskills]) : '';
	}

	function getCurrentSkill() {
			(skill) ? setCurrentSkill({skill}) : '';
	}
	console.log(`\nskill: ${skill.name} \n currentSkill: ${currentSkill}`)
	useEffect(() => {
		//Getting posts, C(R)UD
		

		getCurrentSkill();
		
	}, [!currentSkill]); 

	return (
		<Grid as={Segment} >
			<Grid.Row>
				<Header as={Segment} size="huge" attached="top" to={`/skills/${skill?.name}`} inverted={true} color='black' >
					{skill?.name}
				</Header>
				<SubSkillPortal handleAddSubSkill={handleAddSubSkill} skill={skill} />
			{/* <Label
					corner='left'
					color="grey" 
					
					icon='edit' 
					size="mini" 
				/> */}
			{/* <Link to={`/skills/${skill?.name}`} > 
				<Header as={Segment} size="huge" attached="top" to={`/skills/${skill?.name}`} inverted="true" color='teal' >
					{skill?.name}
				</Header>
			</Link> */}
			<Label
				onClick={() => handleAssign()}
				attached='top right'
				color={assignColor}
				as='a' 
				content={assignContent}
				icon={assignIcon}
				size="mini"         
			/>
			</Grid.Row>
			<Grid.Row  > 
				<Header 
					as={Segment} 
					size="large" 
					attached="top" 
					inverted={true} 
					secondary={false}
					color='blue' 
					content={
						<ResourceDisplay 
							skill={skill}
							liftYouTubeSearchResults={liftYouTubeSearchResults()}
						/>} 
				/>
				<SubSkillDisplay 
					skill={skill} 
					handleAddSubSkill={handleAddSubSkill}
					liftSubSkills={liftSubSkills()}
				/> 

			</Grid.Row>
 


	</Grid>

	)
}
// 		{/* <Segment.Group text-align='center' horizontal > Subskills     */}
// 		<Segment.Group> Resources
// 		 <Card>

// 		 </Card>
// 	 </Segment.Group>
//  {/* </Segment.Group> */}
//  <ResourceDisplay skill={skill} />