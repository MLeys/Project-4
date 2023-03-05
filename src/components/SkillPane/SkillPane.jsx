import { useState, useEffect, useContext } from "react";
import { 
	Segment,
	Card,
	Button,
	Icon,
	Label,
	Grid,
	Header,
	Container,
	Item

} from 'semantic-ui-react';

import SubSkillsTabDisplay from "../SubSkillsTabDisplay/SubSkillsTabDisplay";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";

import SubSkillPortal from '../SubSkillPortal/SubSkillPortal';
import SkillAssignCornerBtn from "../SkillAssignCornerBtn/SkillAssignCornerBtn";

function SkillPane({  handleAddSubSkill, allResources, handleAddResource }) {
  const ctx = useContext(SkillsContext)
  const userSkills = ctx.userSkills;
  const skill = ctx.activeSkill

  const loggedUser = ctx.loggedUser;




	return (
		
		<Grid >
      <Header  as={Segment}  attached="top" to={`/skills/${skill?.name}`} inverted={true} color='black' >
        {skill?.name}
				
      </Header>
      <SubSkillPortal handleAddSubSkill={handleAddSubSkill} skill={skill} />
			<SkillAssignCornerBtn skill={skill} test={skill.name} />
			
      <Grid.Row className="subSkillDisplayTab-row">
				
        <SubSkillsTabDisplay skill={skill}>

        </SubSkillsTabDisplay>
      </Grid.Row>

 	</Grid>

	)
}
export default SkillPane;