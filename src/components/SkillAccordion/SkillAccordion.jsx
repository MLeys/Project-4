import { useState, useEffect, useContext } from 'react';
import {
	 Accordion, 
	 Button, 
	 Icon,
	 Segment,
	 Label,
	 Menu
} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import SubSkillAccordion from '../SubSkillAccordion/SubSkillAccordion';


function SkillAccordion({currentUser, assignSkillUser, unAssignSkillUser }) {
	// console.log(skill, "<-SkillAccordion skill")
	// console.log("Hitting SkillAccordion")
  const [activeIndex, setActiveIndex] = useState(-1);
  const skills = useContext(SkillsContext).skills




  // FIX ME: SO THAT I PASS PROPS FROM CONTEXT ************
  useEffect(() => {
  }, []);

	


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
			skills?.map((skill, index) => (
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
				