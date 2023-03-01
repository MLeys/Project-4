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
	Header,
	Container


} from 'semantic-ui-react';

import SubSkillPortal from '../SubSkillPortal/SubSkillPortal';

import SubSkillDisplay from '../SubSkillDisplay/SubSkillDisplay';

import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';
import SearchYouTube from '../SearchYouTube/SearchYouTube';



export default function SkillDisplay({ 
	skill, loggedUser,
	unAssignSkillUser, assignSkillUser,
	handleAddSkill, 
	handleAddSubSkill,
	handleAddResource
}) {
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
	}
	
	function liftSubSkills(subskills) {
		(subskills) ? setSubSkills([...subskills]) : '';
	}

	function getCurrentSkill() {
			(skill) ? setCurrentSkill({skill}) : '';
	}
	useEffect(() => {
	
		
	}, []); 

	return (
		<Grid as={Segment} >
			<Grid.Row>
				<Header as={Segment} size="huge" attached="top" to={`/skills/${skill?.name}`} inverted={true} color='black' >
					{skill?.name}
				</Header>
				<SubSkillPortal handleAddSubSkill={handleAddSubSkill} skill={skill} />
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
			<Grid.Row stretched={true} color='blue'> 
				<Grid.Column floated='left' width={12}>
					
				</Grid.Column>
				<Grid.Column floated='right' width={4}>
					<SearchYouTube
								skill={skill}
								youTubeSearchResults={youTubeSearchResults}
								liftYouTubeSearchResults={liftYouTubeSearchResults}
								handleAddResource={handleAddResource}
								
							/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>

			
				<Grid.Column width={4}>
					<SubSkillDisplay 
						skill={skill} 
						handleAddSubSkill={handleAddSubSkill}
						liftSubSkills={liftSubSkills}
						youTubeSearchResults={youTubeSearchResults}
						liftYouTubeSearchResults={liftYouTubeSearchResults}
					/> 
				</Grid.Column>				
				<Grid.Column width={12}>
					<ResourceDisplay
						skill={skill}
						loggedUser={loggedUser}
						youTubeSearchResults={youTubeSearchResults}
						liftYouTubeSearchResults={liftYouTubeSearchResults}
						handleAddResource={handleAddResource}
					/>
			
				</Grid.Column>				
				<Grid.Column width={1}>

				</Grid.Column>				
				<Grid.Column width={1}>
				</Grid.Column>
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