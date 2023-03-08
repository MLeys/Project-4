import { useState, useEffect, useContext } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import { 
	Segment,
	Container,
	Tab,
	Menu,
	Progress,
	Grid,
	Item,
	Header

} from 'semantic-ui-react';

import SubSkillPane from "../SubSkillPane/SubSkillPane";


function SubSkillsTabDisplay() {
	const ctx = useContext(SkillsContext)
	const skills = ctx.skills;
	const skill = ctx.skill;
	const firstActiveSkill = skills[ctx.activeSkillIndex]
	const activeSkillIndex = ctx.activeSkill?.index;
	const subSkills = ctx.skills[activeSkillIndex]?.subSkills;
	
	const handleSetActiveSub = ctx.handleSetActiveSub;

	

	const subPanes = subSkills?.map((sub, index) => ({
		menuItem: sub.title,
		pane: (
			<Tab.Pane as={Container}			
				children={ 
				<SubSkillPane />} 
			/>
		)
	}));

  function handleTabChange(e, data) {
		e.preventDefault();
		e.stopPropagation();
		
    const activeIndex = data.activeIndex;

		const activeSubId = subSkills[activeIndex]._id;
    const subIndex = subSkills?.findIndex(sub => sub._id === activeSubId)
    console.log(`subSkill Index: ${activeIndex}\nsubIndex: ${subIndex}\nactiveSkill: ${subSkills[activeIndex].title}`)
    handleSetActiveSub(subIndex)
  }

  useEffect(() => {
    
  }, []); 

  return (
    <>
      <Container 
				fluid={true} 
				style={{ backgroundColor: 'teal'}} 
				className='fullScreenHeight'
			>
        <Tab 
					
					panes={subPanes} 
					onTabChange={ (e, data) => handleTabChange(e,data)}
      	/>
      </Container>
			
    </>
  );
}

export default SubSkillsTabDisplay;