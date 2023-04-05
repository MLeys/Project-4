import { useState, useEffect, useContext } from "react";
import { 
	Segment,
	Grid,
	Header,
	Container,
	Tab

} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import SubSkillPortal from '../SubSkillPortal/SubSkillPortal';
import SkillAssignCornerBtn from "../SkillAssignCornerBtn/SkillAssignCornerBtn";
import SubSkillsTabDisplay from "../SubSkillsTabDisplay/SubSkillsTabDisplay";
import SubSkillPane from "../SubSkillPane/SubSkillPane";

function SkillPane() {
	const [subskills, setSubskills] = useState();
  const ctx = useContext(SkillsContext)
	const skills = ctx.skills;
  const skill = ctx.activeSkill?.skill;
	const subSkills = ctx.activeSkill?.subSkills;
	const handleSetActiveSub = ctx.handleSetActiveSub;
	const sub = ctx.subSkills;

	console.log(sub, ",- sub")
	console.log(subSkills, '<M-- subskills')
	const subPanes = subSkills?.map((sub, index) => ({
		menuItem: sub.title,
		pane: (
	
				<SubSkillPane  />
			
		)
	}));

	function activeSubskills() {
		setSubskills()
	}

	async function handleTabChange(e, data) {
		e.preventDefault();
		e.stopPropagation();

		console.log(`activesubIdx: ${data.activeIndex}`)	
		console.log('tab change')
    const activeIndex = data.activeIndex;


		const activeSubId = subSkills[activeIndex]._id;
    const subIndex = subSkills?.findIndex(sub => sub._id === activeSubId)
    console.log(`subSkill Index: ${activeIndex}\nsubIndex: ${subIndex}\nactiveSkill: ${subSkills[activeIndex].title}`)
    await handleSetActiveSub(subIndex)
			.then(
				subSkills = ctx.subSkills,
				console.log('subSkills', subSkills)
			)
		
		
		console.log(activeIndex, "<-- active index")

  }

	useEffect(() => {
		console.log('SKILLPANE render')
	}, [])
	
	return (
		<Grid>
      <Header as={Segment} compact={true} inverted={false} >
        <h1>{skill?.name}</h1> here
      </Header>
			<Container>
				<Tab 
					inverted={false}
					renderActiveOnly={false}
					panes={subPanes} 
					onTabChange={ (e, data) => handleTabChange(e,data)}
				/>
				<Segment>hello</Segment>
			</Container>

		</Grid>
	)
}
export default SkillPane;