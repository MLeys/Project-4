import React, { useState, useEffect } from 'react';
import {
	 Button,
	 Icon,
	 Segment,
	 Label,
	 Menu,
		 Progress,
		 Grid
} from 'semantic-ui-react';
import SkillProgressBar from '../SkillProgressBar/SkillProgressBar';



function UserSkillsBarGraph({ userSkills }) {


	return (

		<Segment.Group>
		{userSkills.map((skill, index) => {
			{console.log(`Skill(pbar):  ${skill.name}`)}
			return (
				<Segment inverted>
					<Progress inverted value='4' total='8' progress='percent' label={skill.name} key={`pBar-${skill._id}`} />

				</Segment>
				)
		})}
		</Segment.Group>

	);
}

export default UserSkillsBarGraph;

