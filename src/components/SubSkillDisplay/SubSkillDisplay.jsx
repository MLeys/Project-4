import { useContext } from "react";

import { Link, Route, Routes, Navigate} from 'react-router-dom';

import { 
    Segment,
		Label,
    Card,
    Button,
    Icon,
    Header,
    Grid

} from 'semantic-ui-react';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

import ResourcePortal from "../ResourcePortal/ResourcePortal";
import SubSkillCard from '../SubSkillCard/SubSkillCard';

export default function SubSkillDisplay({ index }) {
	const ctx = useContext(SkillsContext)
	const subSkills = ctx.skills[index].subskills;



	return (
		<>
		
		
			<Header> 
			<ResourcePortal />
				  Subskills 
			</Header>

		
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
    

    


