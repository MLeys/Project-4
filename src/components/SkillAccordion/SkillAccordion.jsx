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
import SkillAssignCornerBtn from '../SkillAssignCornerBtn/SkillAssignCornerBtn';


function SkillAccordion() {
	const ctx = useContext(SkillsContext);
		const skills = ctx.skills;


		
	const [activeSkillIndexSidebar, setActiveSkillIndexSidebar] = useState(-1)

  useEffect(() => {
		
		
  }, []);

	const handleSkillClick = (e, index) => {
		e.preventDefault();
		setActiveSkillIndexSidebar(activeSkillIndexSidebar === index ? -1 : index);
	};

	function handleTitleClick(e, data) {
		console.log('=======================')
		console.log(`e: ${e}\ndata: ${data}`)
	}

  return (
		<>
		
		{
			skills?.map((skill, index) => (
			<Accordion styled key={`${skill._id}-accordion`}>
				
				<Accordion.Title
					key={`sidebar-title-${skill._id}`}
					as={Segment}
					active={activeSkillIndexSidebar === index}
					index={index}
					onClick={(e) => handleSkillClick(e, index)}
					
					children={
						<>
							<Icon name="dropdown" />
								{skill.name}fdfd
							<SkillAssignCornerBtn index={index}/>
						</>

						}
				/>
				<Accordion.Accordion >
					<Accordion.Content active={activeSkillIndexSidebar === index}>
							<SubSkillAccordion
								skill={skill}
								key={`${skill._id}-subskills`}
							/>
					</Accordion.Content>	
				</Accordion.Accordion>

			</Accordion>
			))
		}
		</>
  
	)
}
export default SkillAccordion;
				