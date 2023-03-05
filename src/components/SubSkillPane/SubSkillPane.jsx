import { useState, useEffect, useContext } from "react";
import { 
	Segment,
	Label,
	Grid,
	Header,
	Tab

} from 'semantic-ui-react';

import SubSkillsTabDisplay from "../SubSkillsTabDisplay/SubSkillsTabDisplay";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";



function SubSkillPane({ sub }) {
	const subCtx = useContext(SkillsContext)
  const subSkills = subCtx.subSkills;
	const subSkill = subCtx.subSkill;
	const resources = subCtx.resources;


	return (
		
			
				<Header  as={Segment}  attached="top" inverted={true} color='blue' >
					{sub?.title}fdfaf
				</Header>
			

		


	)
}
export default SubSkillPane;