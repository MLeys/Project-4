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


function SkillPane() {
  const ctx = useContext(SkillsContext)
	const skills = ctx.skills;
  const skill = ctx.activeSkill?.skil;


	
	return (
		
		
		<Grid >
      <Header  as={Segment}  attached="top" to={`/skills/${skill?.name}`} inverted={true} color='blue' >
        <h1>{skill?.name}</h1>
      </Header>
      <SubSkillPortal skill={skill} />
			<SkillAssignCornerBtn />
			
      <Grid.Row className="subSkillDisplayTab-row">
        <SubSkillsTabDisplay />
      </Grid.Row>

 		</Grid>


	

	)
}
export default SkillPane;