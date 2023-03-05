import { useState, useEffect, useContext } from "react";
import { SkillsContext } from "../../context/SkillsContext/SkillsContext";
import { 
	Segment,
	Container,
	Tab,
	Menu,
	Progress,
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
      <Menu.Item className="sub_pane" key={`pane-${sub.name}-${index}`} >
        <Progress 
          inverted={true}
          size='small' 
          color='blue' 
          value='4' 
          total='8' 
          progress='ratio' 
        >
        <h4 >{sub.title}</h4>
        </Progress>
      </Menu.Item>
    ),
    render: () => (
      <>
        {sub.title}
      </>
    )
	}));



  return (
    <>
      <Container fluid={true} className='fullScreenHeight'>
        <Tab
          menu={{
            id: 'skillTabs',
            fluid: true,
            color: 'green', 
            inverted: true, 
            attached: false, 
            tabular: false, 
            
          }}
          grid ={{ paneWidth: 14, tabWidth: 2 }} 
          panes={'panes'} 
          onTabChange={ (e, data) => handleTabChange(e,data)}
          
          menuPosition='left'
      />
      <Segment> End</Segment>
      </Container>
    </>
  );
}

export default SubSkillsTabDisplay;