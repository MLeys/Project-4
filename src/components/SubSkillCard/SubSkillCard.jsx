import "./SubSkillCard.css"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
		Card,
		Icon,
		Image,
		Button,
		Accordion,
		Segment,
		Menu,
		Grid,
		Label
		
} from "semantic-ui-react";

export default function SubSkillCard({ skill }) {
	
	const navigate = useNavigate();

	const subSkills = skill?.subSkills
	const subSkillsLength = Math.floor(16 / subSkills.length) ;

	console.log(subSkillsLength);
	return (
		<>
		{
			
			subSkills?.map(sub => {
				const resources = sub.resources.map((resource) => {
					{resource.title}
				})
				console.log(subSkillsLength, )
				return (
					<Grid.Column width={subSkillsLength} verticalAlign="center">
						<Segment vertical key={`subCard-${sub._id}`} fluid >
							<Label
								corner='left'
								color="grey" 
								icon='edit' 
								size="mini" 
								onClick={() => navigate(`/skills/${skill?.name}/subskill/${sub._id}`)}
							/>
							
								{sub?.title}
								{resources}
							
						</Segment>

					</Grid.Column>


				)
			})
		}
			
	</>

	)

}
