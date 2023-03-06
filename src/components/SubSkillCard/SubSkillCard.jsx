import "./SubSkillCard.css"
import { useContext} from "react";
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
		Label,
		Header,
		Container
		
} from "semantic-ui-react";
import ResourcePortal from "../AddResourceDisplay/AddResourceDisplay";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

 function SubSkillCard() {
	
	const navigate = useNavigate();
	const ctx = useContext(SkillsContext);
	const skills = ctx.skills;

	const skill = ctx.activeSkill.skill;
	

	// const subSkills = skill?.subSkills


	return (
		<>
				<Segment as={Header} fluid={true}>
				
				<ResourcePortal />
				  Subskills 
				
				</Segment>
		{
			
			skills?.subSkills?.map(sub => {
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

