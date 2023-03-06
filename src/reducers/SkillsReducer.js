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
		}
		case 'deleteSkill': {
			return draft.filter((s) => s.id !== action.id);
		}
		case 'assignSkill': {
			// console.log("Reducer(assignSkill): ", action)
			const index = action.index;
			const user = action.user;
			draft[index].usersAssigned.splice(0,0,user);
			break;				
		}
		case 'unAssignSkill': {
			// console.log("Reducer(unAssignSkill): ", action)
			const skillIndex = action.skillIndex;
			const userIndex = action.userIndex;
			draft[skillIndex].usersAssigned.splice(userIndex, 1);
			break;
		}
		case 'createSubSkill': {
			console.log(action.data, "=== data")
			const skillIndex = action.skillIndex;
			const newSub = action.data.subSkills.at(-1)
			draft[skillIndex].subSkills.splice(0,0, newSub);
			break;
		}

	
		default: {
			throw Error (`Error handling action: ${action.type}`)
		}
	}
}

export default SkillsReducer;