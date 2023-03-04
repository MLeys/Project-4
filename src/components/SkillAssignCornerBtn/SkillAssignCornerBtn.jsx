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
	const [color, setColor] = useState('orange');
	const [icon, setIcon] = useState('warning sign');
	const [content, setContent] = useState('loading');
	const [loading, setLoading] = useState(true);

	const skillCtx = useContext(SkillsContext);
		const loggedUser = skillCtx.loggedUser;
		const assignSkillUser = skillCtx.assignSkillUser;
		const unAssignSkillUser = skillCtx.unAssignSkillUser;
		const getSkills = skillCtx.getSkills;


	async function userAssigned() {
		try {
			setIfAssigned(skill?.usersAssigned.some(user => user._id === loggedUser._id));
			setLoading(false)
			if (!loading) {
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
		
			}
		} catch (err) {
			console.log(`Error setting userAssigned at load: ${err}`)
		}
	}




	function handleAssignSkillUser(ifAssigned) {
		console.log(`ifAssigned= ${ifAssigned}`)
		if (ifAssigned) {
			unAssignSkillUser(skill);
			getSkills();
		} else if (ifAssigned) {			
			assignSkillUser(skill);
			getSkills();
		} else {
			console.log(`*** Error in handleAssignSkill user (corner btn) ***`)
		}
	};


	
	
	useEffect(() => {
		userAssigned();
  }, [loading]);


	return (
		<>
			<Label
				key={`assign-${skill._id}`}
				as='a' 
				size='mini' 
				attached='top right' 
				color={color}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					handleAssignSkillUser(ifAssigned);
				}}
			> 
				<Icon name={icon} size='small'  />
				{content}
			</Label>
		
		</>
	)
}

export default SkillAssignCornerBtn;