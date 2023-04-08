import { useState, useEffect, useContext } from "react";
import { 
	Segment,
	Grid,
	Header,
	Container,
	Tab

} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import SubSkillPane from "../SubSkillPane/SubSkillPane";

function SkillPane() {
  const ctx = useContext(SkillsContext)
  const skill = ctx.activeSkill?.skill;
	const subSkills = ctx.activeSkill?.subSkills;
	const handleSetActiveSub = ctx.handleSetActiveSub;
	const activeSub = ctx.activeSub;



	const subPanes = subSkills?.map((sub, index) => ({
		menuItem: sub.title,
		render: () => (
			<Header  inverted={false} color='purple' as='h2' >
				<SubSkillPane />
				{index}
				title:{sub.title} index:{sub.index}  - active skill 
			</Header>
			)
	}));


	async function handleTabChange(e, data) {
		e.preventDefault();
		e.stopPropagation();

    const activeIndex = data.activeIndex;

		const activeSubId = subSkills[activeIndex]._id;
    const subIndex = subSkills?.findIndex(sub => sub._id === activeSubId)
    await handleSetActiveSub(subIndex)	

  }

	useEffect(() => {
	}, [])
	
	return (
		<Container fluid={true} >
      <Header as={Segment} >
        {skill?.name}
      </Header>
			<Tab 
				activeIndex={activeSub?.index}
				renderActiveOnly={true}
				panes={subPanes} 
				onTabChange={ (e, data) => handleTabChange(e,data)}
			/>
		</Container>
	)
}
export default SkillPane;