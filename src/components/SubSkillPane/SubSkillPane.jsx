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
		<Container className="subSkillPaneContainer">
			<Header  inverted={true} color='blue' >
				{subSkill?.title}
			</Header>
			<ResourcePortal />
				<Container className="resourceBodyContainer">
						THIS IS OTHER INFOMATION - BODY OF RESOURCES

				</Container>
	
			
		</Container>

				
		
			

			

		


	)
}
export default SubSkillPane;