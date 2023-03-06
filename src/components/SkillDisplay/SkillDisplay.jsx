
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
import ResourcePortal from '../ResourcePortal/ResourcePortal';
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
				<>
					<Card as={Segment} fluid={true} raised={true}>
						
							<Header
								style={{ backgroundColor: 'teal', color: 'white', fontSize: '1.5rem'}}

								attached={true}
								
							
								
							>							
								{skill?.name}

							</Header>
							<SubSkillPortal skill={skill} />
							<SkillAssignCornerBtn index={index} />
						
						<Card.Content>
							
							<SubSkillDisplay /> 
						</Card.Content>

					</Card>

	

	
					


				</>
		        )
		    })
		}
			</Card.Group>
		</Container>
	);
};
