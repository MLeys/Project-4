import React, { useState, useEffect } from 'react';
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

import skill from '../../../models/skill';
import SkillProgressBar from '../SkillProgressBar/SkillProgressBar';



function UserSkillsBarGraph({ userSkills }) {
	const [activeSkill, setActiveSkill] = useState({});
	
	// const skillPanes = [
	// 	userSkills.map((skill, index) => {
	// 		{
	// 		menuItem: (
	// 			<Segment key={`idx-${index}`} inverted>
	// 				<Progress inverted value='4' total='8' progress='percent' label={skill.name} key={`pBar-${index}`} />
	// 			</Segment>
	// 		),
	// 		render(<Tab.Pane attched={false} tabular={false}> {skill.name} content </Tab.Pane>) 
	// 		}
	// 	})
	// ]
	const skillPanes = userSkills.map((skill) => ({
		menuItem: (
			
				<Progress  value='4' total='8' progress='percent' label={skill.name} key={`pBar-${skill._id}`} />
			
		),
		pane: 
			<Tab.Pane key={skill.id} attached={false}>
				{skill.name} hand
			</Tab.Pane>,
	}));

	const TabExampleTabularFalse = () => (
		<Tab menu={{ attached: false, tabular: false, vertical: true, borderless: true }} panes={skillPanes} />
	)
	

	return (<>

		<Segment.Group>
		{userSkills.map((skill, index) => {
			{console.log(`Skill(pbar):  ${skill.name}`)}
			
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

