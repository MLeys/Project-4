
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

import  { SkillsContext} from '../../context/SkillsContext/SkillsContext';

import SearchYouTube from "../SearchYouTube/SearchYouTube";
import AddResourceDisplay from '../AddResourceDisplay/AddResourceDisplay';
import SubSkillPortal from '../SubSkillPortal/SubSkillPortal';
import SubSkillDisplay from '../SubSkillDisplay/SubSkillDisplay';

// import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';
import SkillAssignCornerBtn from "../SkillAssignCornerBtn/SkillAssignCornerBtn";


export default function SkillDisplay() {
	const ctx = useContext(SkillsContext)
	const skills = ctx.skills;


	return (
		<Container as={Grid} >
			<Card.Group itemsPerRow={3}>

			
		{
		skills?.map((skill, index) => {
		  return (
				<Card 
					key={`skillCard-${index}-${skill._id}`}
					as={Segment} 
					fluid={true} 
					raised={true}
				>
					<Card.Header
						
						as={Segment}
						style={{ backgroundColor: 'teal', color: 'white', fontSize: '1.5rem', padding: ".5rem"}}
						attached={true}
						content={skill?.name}
					/>	
					<SubSkillPortal skill={skill} />
					<SkillAssignCornerBtn index={index} />
					<Card.Content >
						<SubSkillDisplay index={index} /> 

					</Card.Content>
						
				</Card>
				
		  )
	  })
	}
		</Card.Group>
	</Container>
	);
};
