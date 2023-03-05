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
	const skill = ctx.skill;
	const subSkills = ctx.activeSkill.subSkills;
	const skillInfo = ctx.activeSkill;
	
	const handleSetActiveSub = ctx.handleSetActiveSub;
	// console.log(skillInfo, "<== skill info subskilldisplaytab")
	// console.log(subSkills, "<== subSkills subskilldisplaytab")

	const subPanes = subSkills?.map((sub, index) => ({

    menuItem: sub.title,
		pane: (
			<Tab.Pane 
				children={ <SubSkillPane />} 
				
			/>
			
		)
	}));

  function handleTabChange(e, data) {
    const activeIndex = data.activeIndex;

		const activeSubId = subSkills[activeIndex]._id;
    const subIndex = subSkills?.findIndex(sub => sub._id === activeSubId)
    console.log(`subSkill Index: ${activeIndex}\nsubIndex: ${subIndex}\nactiveSkill: ${subSkills[activeIndex].title}`)
    handleSetActiveSub(subIndex)
  }

  return (
    <>
      <Container 
				fluid={true} 
				style={{ backgroundColor: 'teal'}} 
				className='fullScreenHeight'
			>
        <Tab 
					renderActiveOnly={false}
					panes={subPanes} 
					defaultActiveIndex={0}
					onTabChange={ (e, data) => handleTabChange(e,data)}

      	/>
      </Container>
    </>
  );
}

export default SubSkillsTabDisplay;