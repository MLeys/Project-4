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

function SubSkillPane() {
	const ctx = useContext(SkillsContext);
	const subCtx = ctx.activeSub;
	const subSkill = subCtx.subSkill;
	const resources = subCtx.resources;

	


	return (
		<Segment.Group className="subSkillPaneContainer">sdfada
				<AddResourceDisplay />fdaf
						THIS IS OTHER INFOMATION - BODY OF RESOURCES START
		</Segment.Group>
	)
}
export default SubSkillPane;