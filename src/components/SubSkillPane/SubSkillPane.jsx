import { useState, useEffect, useContext } from "react";
import { 
	Segment,
	Label,
	Grid,
	Header,

} from 'semantic-ui-react';

import SubSkillsTabDisplay from "../SubSkillsTabDisplay/SubSkillsTabDisplay";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";



function SubSkillPane({ sub }) {
  const subSkills = useContext(SkillsContext).subSkills


	return (
		
	<Grid >
    <Header  as={Segment}  attached="top" inverted={true} color='blue' >
      {sub?.title}
    </Header>
 


 	</Grid>

	)
}
export default SubSkillPane;