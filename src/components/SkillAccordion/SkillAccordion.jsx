import React, { useState, useEffect } from 'react';
import {
	 Accordion, 
	 Button, 
	 Icon,
	 Segment,
	 Label,
	 Menu
} from 'semantic-ui-react';

import SubSkillAccordion from '../SubSkillAccordion/SubSkillAccordion';


function SkillAccordion({ allSkills, currentUser, skill }) {
	// console.log(skill, "<-SkillAccordion skill")
	console.log("Hitting SkillAccordion")
  const [activeIndex, setActiveIndex] = useState(-1);
  const [skills, setSkills] = useState([]);
	// const [assignSkillIndex, setAssignSkillIndex] = useState(-1);
	// const [assignSkillColor, setAssignSkillColor] = useState(null);
	// const [assignSkillIcon, setAssignSkillIcon] = useState(null);
	// console.log(skills, "<- users skills")
	
	// const colorIfAssigned = 'red';
	// const colorIfNotAssigned = 'green'
	// setAssignSkillIndex(skill.usersAssigned.some(user => user._id === currentUser._id));
	// setAssignSkillColor(assignSkillIndex ? 'red' : 'green');
	// setAssignSkillIcon(assignSkillIndex ? 'minus' : 'plus');


	// function assignSkillAttrs(skill) {
	// 	setAssignSkillIndex(skill.usersAssigned.some(user => user._id === currentUser._id));

	// 	setAssignSkillColor(assignSkillIndex ? 'red' : 'green');
	// 	setAssignSkillIcon(assignSkillIndex ? 'minus' : 'plus');
	// 	// const assignSkillContent = assignSkillIndex ? 'unassign' : 'assign'
	// }

  useEffect(() => {
    setSkills(allSkills);
  }, [allSkills]);



  const handleSkillClick = (e, index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

	const skillAssignComp = (skill) => {
		const assignSkillIndex = skill.usersAssigned.some(user => user._id === currentUser._id);
		const assignSkillColor = assignSkillIndex ? 'red' : 'green';
		const assignSkillIcon =  assignSkillIndex ? 'minus' : 'plus';
		const assignSkillContent = assignSkillIndex ? 'unassign' : 'assign';
		return (
			<>
				<Segment padded>

					<Icon name="dropdown" />
					{skill.name}
					<Label as='a' size='mini' attached='top right' color={assignSkillColor}> 
						<Icon name={assignSkillIcon} size='small'  />
							{assignSkillContent}
					</Label>
				</Segment>
				
			</>
		)
	}

  return (
		<>
		{
			skills.map((skill, index) => (
				
				<Accordion styled>
				{/* {skills.map((skill, index) => ( */}
					<div key={skill._id}>
						{/* {assignSkillAttrs(skill)} */}
					
	
						<Accordion.Title
							active={activeIndex === index}
							index={index}
							onClick={(e) => handleSkillClick(e, index)}
						>
							{skillAssignComp(skill)}
							
		



							{skill.usersAssigned.some(user => user._id === currentUser._id) ? (
								<Button compact size="mini" color="red" floated="right" onClick={() => {
									skill.usersAssigned = skill.usersAssigned.filter(user => user._id !== currentUser._id);
									setSkills([...skills]);
								}}>
									Unassign
								</Button>
							) : (
								<Button compact size="mini" color="green" floated="right" onClick={() => {
									skill.usersAssigned.push(currentUser);
									setSkills([...skills]);
								}}>
									Assign
								</Button>
							)}
						</Accordion.Title>
						
						<Accordion.Content active={activeIndex === index}>
								<SubSkillAccordion
									skill={skill}
	
								/>
						</Accordion.Content>
					</div>
				{/* ))} */}
			</Accordion>
				
			))
		}
		</>
  
	)
}
export default SkillAccordion;
					
                        

