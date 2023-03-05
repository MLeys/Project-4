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

function SkillPane() {
  const ctx = useContext(SkillsContext)
  const skill = ctx.skill;
	const activeSkillInfo = ctx.activeSkillInfo;


	return (
		<Container>
		
		<Grid >
      <Header  as={Segment}  attached="top" to={`/skills/${skill?.name}`} inverted={true} color='blue' >
        {skill.name}
      </Header>
      <SubSkillPortal skill={skill} />
			<SkillAssignCornerBtn />
			
      <Grid.Row className="subSkillDisplayTab-row">
        <SubSkillsTabDisplay />
      </Grid.Row>

 	</Grid>


		</Container>

	)
}
export default SkillPane;