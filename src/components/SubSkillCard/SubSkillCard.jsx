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

 function SubSkillCard({ skill }) {
	
	const navigate = useNavigate();

	const subSkills = skill?.subSkills
	const subSkillsLength = Math.floor(16 / subSkills.length) ;

	return (
		<>
		{
			
			subSkills?.map(sub => {
				const resources = sub.resources.map((resource) => {
					{resource.title}
				})
				
				return (
						<Segment size='large' inverted={true} color='teal' vertical={true} key={`subCard-${sub._id}`} fluid='true' >
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

					


				)
			})
		}
			
	</>

	)

}

export default SubSkillCard;

// {/* <Grid.Column  width={subSkillsLength} verticalAlign='middle' key={`subCard-${sub._id}`}>
// <Segment size='large' inverted={true} color='teal' vertical={true} key={`subCard-${sub._id}`} fluid='true' >
// 	<Label
// 		corner='left'
// 		color="grey" 
// 		icon='edit' 
// 		size="mini" 
// 		onClick={() => navigate(`/skills/${skill?.name}/subskill/${sub._id}`)}
// 	/>
	
// 		{sub?.title}
// 		{resources}
	
// </Segment>

// </Grid.Column>  */}