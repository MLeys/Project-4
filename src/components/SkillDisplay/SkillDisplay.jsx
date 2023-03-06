import React from 'react';
import { useState, useEffect, useContext } from "react";
import { Link, Route, Routes, Navigate, useParams} from 'react-router-dom';
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

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import ResourcePortal from '../ResourcePortal/ResourcePortal';
import SubSkillPortal from '../SubSkillPortal/SubSkillPortal';
import SubSkillDisplay from '../SubSkillDisplay/SubSkillDisplay';

import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';
import SearchYouTube from '../SearchYouTube/SearchYouTube';
import SkillPane from '../SkillPane/SkillPane';



export default function SkillDisplay() {
	const ctx = useContext(SkillsContext)
	const skills = ctx.skills;
	const loggedUser = ctx.loggedUser;
	const assignSkillUser = ctx.assignSkillUser;
	const unAssignSkillUser = ctx.unAssignSkillUser;
	const skill = ctx.activeSkill.skill;
	const allResources = ctx.skills.resources;
	
	const [youTubeSearchResults, setYouTubeSearchResults] = useState([]);
	const [subSkills, setSubSkills] = useState([]);
	const [skillResources, setSkillResources] = useState([])

	const assignIndex = skill?.usersAssigned?.some(user => user.username === loggedUser.username)
	const assignColor = assignIndex ? 'red' : 'green';
	const assignIcon = assignIndex ? 'minus' : 'plus';
	const assignContent = assignIndex ? 'unassign' : 'assign'

	const handleAssign = assignIndex ? () => unAssignSkillUser(skill) : () => assignSkillUser(skill)

	function liftYouTubeSearchResults(results) {
		(results) ? setYouTubeSearchResults([...results]) : '';
	}
	
	function liftSubSkills(subskills) {
		(subskills) ? setSubSkills([...subskills]) : '';
	}

	function getSkillResources() {
		// console.log(allResources, "ALL RESOURCES")
		const resources = allResources?.filter((r) => r.skillId === skill._id )
		// console.log(`resources-${skill.name}: ${resources}`)
		setSkillResources(resources)
	}

	useEffect(() => {
		getSkillResources();
		
	}, []); 

	return (
		
		<Grid as={Segment} >
			<Grid.Row>
				<Header as={Segment} size="huge" attached="top" to={`/skills/${skill?.name}`} inverted={true} color='black' >
					{skill?.name}
				</Header>
				<SubSkillPortal skill={skill} />
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
					<ResourcePortal />
					<SearchYouTube
								skill={skill}
								youTubeSearchResults={youTubeSearchResults}
								liftYouTubeSearchResults={liftYouTubeSearchResults}
								
							/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>

			
				<Grid.Column width={4}>
					<SubSkillDisplay 
						skill={skill} 
				
						liftSubSkills={liftSubSkills}
						youTubeSearchResults={youTubeSearchResults}
						liftYouTubeSearchResults={liftYouTubeSearchResults}
					/> 
				</Grid.Column>			
				<Grid.Column width={4}>
				
					{
						skillResources?.map((r) => {
							// console.log(r, "<<-- resource")
							return (
								<>
								<Item key={`resourceSeg-${r._id}`} content={r._id} />
								</>
							)
						})
					}
			

				</Grid.Column>	
				<Grid.Column width={8}>
					<ResourceDisplay
						skill={skill}
						loggedUser={loggedUser}
						youTubeSearchResults={youTubeSearchResults}
						liftYouTubeSearchResults={liftYouTubeSearchResults}
						skillResources={skillResources}
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