function SkillsReducer(draft, action) {
	switch (action.type) {
		case 'createSkill': {
			draft.push(action.data)
			break;
		}
		case 'readSkills': {
			return action.data;
				
				
		}
		case 'updateSkill': {
			const index = draft.findIndex((s) => s.id === action.skill.id);
			draft[index] = action.skill;
			break;
			// return (
			//     skills.map((s) => {
			//         if (s.id === action.skill.id) {
			//             return action.skill;
			//         } else {
			//             return s;
			//         }
			//     })
			// )
		}
		case 'deleteSkill': {
			return draft.filter((s) => s.id !== action.id);
		}
		case 'assignSkill': {
			console.log(draft, "DRAFT")
			const skillIndex = action.index;
			console.log(skillIndex, "SKILL INDEX")
			if (draft[skillIndex].usersAssigned.includes(action.user)) {
				draft[skillIndex].usersAssigned.push(action.user)
				break;
			} else {
				console.log(" USER ALREADY ASSIGNED ")
				break;
			}

				
		}

		
		
		default: {
			throw Error (`Error handling action: ${action.type}`)
		}
	}
}

export default SkillsReducer;