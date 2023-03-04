import { useState, useContext, useEffect } from "react";
import { 
	Icon,
	Label,
	Segment,
	Button
} from 'semantic-ui-react';

import { SkillsContext } from "../../context/SkillsContext/SkillsContext";


function SkillAssignCornerBtn({ skill, index }) {
	const skillCtx = useContext(SkillsContext);
		const loggedUser = skillCtx.loggedUser;
		const assignSkillUser = skillCtx.assignSkillUser;
		const unAssignSkillUser = skillCtx.unAssignSkillUser;
		const getSkills = skillCtx.getSkills;

	const [attributes, setAttributes] = useState({
		color: 'orange',
		icon: 'warning sign',
		content: 'loading',
		assigned: null,
	})
	const [loading, setLoading] = useState(true);


	const ifAssigned = skill?.usersAssigned.some(user => user._id === loggedUser._id)
	const assignColor = ifAssigned ? 'red' : 'green';
	const assignIcon =  ifAssigned ? 'minus' : 'plus';
	const assignContent = ifAssigned ? 'remove2' : 'learn2';

	function loadAttributes() {
		if (loading) {
			if (ifAssigned) {
				console.log(`** ${skill.name} Assigned at load- **`)
				setAttributes({
					...attributes,
					color: 'red',
					icon: 'minus',
					content: 'remove',
					assigned: true
				})
			} else {
				console.log(`** ${skill.name} NOT assigned at load **`)
				setAttributes({
					...attributes,
					color: 'green',
					icon: 'plus',
					content: 'learn',
					assigned: false
				})
			}
			setLoading(false)
		}
	}

	function handleAssignSkillUser() {
		console.log(`===== handleAssign ======`)
		console.log(`${skill.name}-ifAssigned= ${ifAssigned}`)
		console.log(`${skill.name}-${attributes.assigned}`)
		if (attributes.assigned) {
			console.log(`${skill.name}--> Skill UNassigned`)
			unAssignSkillUser(skill);
			setAttributes({
				...attributes,
				color: 'green',
				icon: 'plus',
				content: 'learn',
				assigned: false
			})
			
		} else {		
			assignSkillUser(skill);
			console.log(`${skill.name}--> Skill assigned`)
			setAttributes({
				...attributes,
				color: 'red',
				icon: 'minus',
				content: 'remove',
				assigned: true
			})
		}
		getSkills();
		console.log("^^ End of handleAssign ^^")
	};


	
	
	useEffect(() => {
		loadAttributes();
  }, []);


	return (
		<>
			<Label
				key={`assign-${skill._id}`}
				as='a' 
				size='mini' 
				attached='top right' 
				color={attributes.color}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					handleAssignSkillUser();
				}}
			> 
				<Icon name={attributes.icon} size='small'  />
				{attributes.content}
			</Label>
		
		</>
	)
}

export default SkillAssignCornerBtn;