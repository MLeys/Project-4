import React from 'react';
import { Link, Route, Routes, Navigate} from 'react-router-dom';


import { 
    Segment,
    Card,
    Button,
    Icon,
    Header,
    Grid

} from 'semantic-ui-react';

import SubSkillPortal from '../SubSkillPortal/SubSkillPortal.jsx';
import AddSubSkillForm from '../AddSubSkillForm/AddSubSkillForm.jsx';
import SubSkillPage from '../../pages/SubSkillPage/SubSkillPage';
import SkillPage from '../../pages/SkillPage/SkillPage';
import SubSkillCard from '../SubSkillCard/SubSkillCard';


export default function SubSkillDisplay({skill, liftSubSkills, 
	youTubeSearchResults,	liftYouTubeSearchResults
 }) {


	const subSkills = skill?.subSkills

	return (
		<>
	
			<Segment.Group>
				<Header fluid="true" attached='top'>  Subskills </Header>
				<SubSkillCard skill={skill} subSkills={subSkills} />
			</Segment.Group>		
	
	

		</>

		
	)
}
    

    


