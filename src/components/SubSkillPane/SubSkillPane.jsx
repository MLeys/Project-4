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
import ResourcePortal from "../ResourcePortal/ResourcePortal";

function SubSkillPane() {
	const ctx = useContext(SkillsContext);
	const subCtx = ctx.activeSub;
  
	const subSkill = subCtx.subSkill;
	const resources = subCtx.resources;


	return (
		<>
				<Header attached="top" inverted={true} color='blue' >
					{subSkill?.title}
					<ResourcePortal />
				</Header>
				
		</>
			

			

		


	)
}
export default SubSkillPane;