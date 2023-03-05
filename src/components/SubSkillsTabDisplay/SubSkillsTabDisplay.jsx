import { useState, useEffect, useContext } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import { 
	Segment,
	Container,
	Tab,
	Menu,
	Progress,
	Grid,
	Item

} from 'semantic-ui-react';



function SubSkillsTabDisplay() {
	const ctx = useContext(SkillsContext)
	const skill = ctx.skill;
	const subSkills = ctx.activeSkill.subSkills;
	const skillInfo = ctx.activeSkill;
	console.log(skillInfo, "<== skill info subskilldisplaytab")
	console.log(subSkills, "<== subSkills subskilldisplaytab")

	const subPanes = subSkills?.map((sub, index) => ({

    menuItem: (
			<Container as={Grid}>
				<Grid.Row stretched={true}>
					<Grid.Column>
						<Progress 
							inverted={true}
							size='small' 
							color='blue' 
							value='4' 
							total='8' 
							progress='ratio' 
						>
						{sub.title}
						</Progress>
					</Grid.Column>

				</Grid.Row>

			</Container>
			

      

      
			

    ),
		pane: {
			key: `subContent-${sub._id}`,
			content: (
				<>
				{sub.title}fdsaf
				</>
			)

		}
	}));



  return (
    <>
      <Container fluid={true} className='fullScreenHeight'>
        <Tab 
				as={Container}
						
					panes={subPanes} 

      />
      <Segment> End</Segment>
      </Container>
    </>
  );
}

export default SubSkillsTabDisplay;