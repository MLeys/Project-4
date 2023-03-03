import React, { useState, useEffect, useContext } from 'react';
import {
	 Button,
	 Icon,
	 Segment,
	 Label,
	 Menu,
	Progress,
	Grid,
	Tab,
	
} from 'semantic-ui-react';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';



function UserSkillsBarGraph() {
	const skills = useContext(SkillsContext).skills;
	const loggedUser = useContext(SkillsContext).loggedUser;
	const userSkills = skills?.filter(skill => skill.usersAssigned.some(assigned => assigned.id === loggedUser.id))



	return (<>

		<Segment.Group>
		{userSkills?.map((skill, index) => {
			// {console.log(`Skill(pbar):  ${skill.name}`)}
			
			return (
				<Segment inverted>
					<Progress inverted color='blue' value='4' total='8' progress='percent' label={skill.name} key={`pBar-${skill._id}`} />

				</Segment>
				)
		})}
		</Segment.Group>

	</>);
}

export default UserSkillsBarGraph;

