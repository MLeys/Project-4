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



function SubSkillsTabDisplay() {
	const ctx = useContext(SkillsContext)
	const skill = ctx.skill;
	const subSkills = ctx.activeSkill.subSkills;
	const skillInfo = ctx.activeSkill;
	console.log(skillInfo, "<== skill info subskilldisplaytab")
	console.log(subSkills, "<== subSkills subskilldisplaytab")

	const subPanes = subSkills?.map((sub, index) => ({

    menuItem: sub.title,
		pane: (
			
			<Tab.Pane key={`{sub._id}-${index}`}>
				{sub.title}
			</Tab.Pane>
			


		)
	}));



  return (
    <>
      <Container fluid={true} style={{ backgroundColor: 'teal'}} className='fullScreenHeight'>
        <Tab 
					renderActiveOnly={false}
					panes={subPanes} 
					defaultActiveIndex={0}

      />
      
      </Container>
    </>
  );
}

export default SubSkillsTabDisplay;