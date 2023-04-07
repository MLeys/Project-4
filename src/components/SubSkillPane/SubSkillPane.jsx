import { useState, useEffect, useContext } from "react";
import { 
	Segment,
	Label,
	Grid,
	Header,
	Tab,
	Container

} from 'semantic-ui-react';

import SubSkillsTabDisplay from "../SubSkillsTabDisplay/SubSkillsTabDisplay";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import AddResourceDisplay from "../AddResourceDisplay/AddResourceDisplay";
import ResourceDisplay from "../ResourceDisplay/ResourceDisplay"

function SubSkillPane() {
	const ctx = useContext(SkillsContext);
	const subCtx = ctx.activeSub;
	const subSkill = subCtx?.subSkill;
	const resources = subCtx?.resources;
	const activeSkill = ctx.activeSkill?.skill.name;
	

	useEffect(() => {

	}, [])

	return (
		<Container className="subSkillPaneContainer">
				<Header  inverted={false} color='purple' as='h2' >
					{subSkill?.title} {activeSkill} -active skill hhh
				</Header>
				
				<AddResourceDisplay />
				{/* <ResourceDisplay /> */}
		</Container>
	)
}
export default SubSkillPane;