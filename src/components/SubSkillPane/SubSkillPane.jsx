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
	const subSkill = subCtx.subSkill;
	const resources = subCtx.resources;

	


	return (
		<Container className="subSkillPaneContainer">
				<Header  inverted={true} color='purple' as='h2' >
					{subSkill?.title}
				</Header>
				<AddResourceDisplay />
				<ResourceDisplay />
		</Container>
	)
}
export default SubSkillPane;