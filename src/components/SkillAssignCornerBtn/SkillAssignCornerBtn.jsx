import { useState, useContext, useEffect } from "react";
import { 
	Icon,
	Label,
	Segment,
	Button
} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";


function SkillAssignCornerBtn({ skill, index }) {
	const [activeIndex, setActiveIndex] = useState(index);
	const [ifAssigned, setIfAssigned] = useState(null);
	const [color, setColor] = useState('orange')
	const [icon, setIcon] = useState('warning sign');
	const [content, setContent] = useState('loading')

	function setAttributes() {
		set
	}
	if (ifAssigned) {
		setColor
	}

	

	const skillCtx = useContext(SkillsContext);
		const loggedUser = skillCtx.loggedUser;
		const assignSkillUser = ctx.assignSkillUser;
		const unAssignSkillUser = ctx.unAssignSkillUser;
		const getSkills = ctx.getSkills;
	// const ifAssigned = skill.usersAssigned.some(user => user._id === loggedUser._id);
	const assignSkillColor = ifAssigned ? 'red' : 'green';
	const assignSkillIcon =  ifAssigned ? 'minus' : 'plus';
	const assignSkillContent = ifAssigned ? 'unassign' : 'assign';

	async function userAssigned() {
		try {
			setIfAssigned(skill?.usersAssigned.some(user => user._id === loggedUser._id));

		} catch (err) {
			console.log(`Error setting userAssigned at load: ${err}`)
		}
	}

	function handleAssignSkillUser() {
		console.log(`ifAssigned= ${ifAssigned}`)
		if (ifAssigned === true) {
			setColor('red')
			setIcon('minus')
			setContent('remove')
			
			unAssignSkillUser(skill);
			getSkills();
		} else if (ifAssigned === false) {
			setColor('green')
			setIcon('plus')
			setContent('learn')
			
			assignSkillUser(skill);
			getSkills();
		} else {
			console.log(`*** Error in handleAssignSkill user (corner btn) ***`)
		}
	};


	
	
	useEffect(() => {
		userAssigned();
  }, []);


	return (
		<>
		

			
			<Label
				key={`sidebar-title-label-${skill._id}`}
				as='a' 
				size='mini' 
				attached='top right' 
				color={assignSkillColor}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					handleAssignSkillUser(skill);
				}}
			> 
				<Icon name={assignSkillIcon} size='small'  />
				{assignSkillContent}
			</Label>
		
		</>
	)
}

export default SkillAssignCornerBtn;