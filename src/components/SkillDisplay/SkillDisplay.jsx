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

	const assignIndex = skill?.usersAssigned?.findIndex(user => user.username === loggedUser.username)
	
	const assignColor = assignIndex > -1 ? 'red' : 'green';
	const assignIcon = assignIndex > -1 ? 'minus' : 'plus';
	const assignContent = assignIndex > -1 ? 'unassign' : 'assign'
	

	const handleAssign = assignIndex > -1 ? () => unAssignSkillUser(skill) : () => assignSkillUser(skill)

	useEffect(() => {
		//Getting posts, C(R)UD
		
		
	  }, []); 

	return (
		<Grid as={Segment} >
			<Grid.Row>
				<Header as={Segment} size="huge" attached="top" to={`/skills/${skill?.name}`} inverted="true" color='teal' >
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
			<Grid.Row divided>
				<SubSkillCard skill={skill} handleAddSubSkill={handleAddSubSkill}/>  

			</Grid.Row>
 

		<Segment.Group text-align='center' horizontal >       
	
			
			{/* <SubSkillDisplay skill={skill} handleAddSubSkill={handleAddSubSkill}/> */}
			


			{/* <Segment.Group> Resources
				<Card>

				</Card>
			</Segment.Group> */}
		</Segment.Group>
		<ResourceDisplay skill={skill} />
	</Grid>

	)
}