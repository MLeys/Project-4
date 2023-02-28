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


function SkillAccordion({ allSkills, currentUser, skill, assignSkillUser, unAssignSkillUser }) {
	// console.log(skill, "<-SkillAccordion skill")
	// console.log("Hitting SkillAccordion")
  const [activeIndex, setActiveIndex] = useState(-1);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills(allSkills);
  }, [allSkills]);

	


	const handleSkillClick = (e, index) => {
		setActiveIndex(activeIndex === index ? -1 : index);
	};


	function handleAssignSkillUser(skill) {
		const assignSkillIndex = skill.usersAssigned.some(user => user._id === currentUser._id);
		if (assignSkillIndex) {
			unAssignSkillUser(skill);
		} else {
			assignSkillUser(skill);
		}
	};

	const skillAssignComp = (skill, index) => {
		const assignSkillIndex = skill.usersAssigned.some(user => user._id === currentUser._id);
		const assignSkillColor = assignSkillIndex ? 'red' : 'green';
		const assignSkillIcon =  assignSkillIndex ? 'minus' : 'plus';
		const assignSkillContent = assignSkillIndex ? 'unassign' : 'assign';

		return (
			<>
			
				<Icon name="dropdown" />
				{skill.name}
				
				<Label
					key={`sidebar-title-label-${skill._id}`}
					as='a' 
					size='mini' 
					attached='top right' 
					color={assignSkillColor}
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						handleAssignSkillUser(skill);
					}}
				> 
					<Icon name={assignSkillIcon} size='small'  />
						{assignSkillContent}
				</Label>
			
			</>
		)
	}

  return (
		<>
		{
			skills.map((skill, index) => (
				<Accordion styled key={`${skill._id}-accordion`}>
					
						<Accordion.Title
							key={`sidebar-title-${skill._id}`}
							as={Segment}
							active={activeIndex === index}
							index={index}
							onClick={(e) => handleSkillClick(e, index)}
							children={skillAssignComp(skill, index)}
						/>
						<Accordion.Content active={activeIndex === index}>
								<SubSkillAccordion
									skill={skill}
									key={`${skill._id}-subskills`}
								/>
						</Accordion.Content>
					
			</Accordion>
			))
		}
		</>
  
	)
}
export default SkillAccordion;
					
                        

							{/* {skill.usersAssigned.some(user => user._id === currentUser._id) ? (
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
							)}  */}