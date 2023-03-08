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
	const activeSkillIndex = ctx.activeSkill?.index;
	const subSkills = ctx.activeSkill?.subSkills;
	
	const handleSetActiveSub = ctx.handleSetActiveSub;

	const subPanes = subSkills?.map((sub, index) => ({
		
		menuItem: sub.title,
		pane: (
			<Tab.Pane>
				<SubSkillPane  />
			</Tab.Pane>		
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
Before tab
        <Tab 
					renderActiveOnly={false}
					panes={subPanes} 
					onTabChange={ (e, data) => handleTabChange(e,data)}
      	/>
			<Segment> SubSkillsTabDisplay After tab declare</Segment>
      
			
    </>
  );
}

export default SubSkillsTabDisplay;