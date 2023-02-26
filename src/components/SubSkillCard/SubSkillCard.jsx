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
		Menu
		
} from "semantic-ui-react";

export default function SubSkillCard({ skill }) {
const navigate = useNavigate();

	const subSkills = skill?.subSkills
	return (
		<>
		{
			subSkills?.map(sub => {
				const resources = sub.resources.map((resource) => {
					{resource.title}
				})

				return (
					<Card fluid onClick={() => navigate(`/skills/${skill?.name}/subskill/${sub._id}`)}>
						<Card.Content>
							{sub?.title}
							{resources}
						</Card.Content>
					</Card>

				)
			})
		}
			
	</>

	)

}
