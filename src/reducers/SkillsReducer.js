function skillsReducer(draft, action) {
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
			// return draft.filter((s) => s.id !== action.id);
			const updatedSkills = draft.filter((skill, index) => index !== action.index);
      return updatedSkills;
		}
		case 'assignSkill': {
			const index = action.index;
			const user = action.user;
			draft[index].usersAssigned.splice(0, 0, user);
			break;				
		}
		case 'unAssignSkill': {
			const skillIndex = action.skillIndex;
			const userIndex = action.userIndex;
			draft[skillIndex].usersAssigned.splice(userIndex, 1);
			break;
		}
		case 'createSubSkill': {
			const skillIndex = action.skillIndex;
			const newSub = action.data.subSkills.at(-1)
			draft[skillIndex].subSkills.splice(0,0, newSub);
			break;
		}
		case 'addResource': {
			const skillIndex = action.skillIndex
			const subIndex = action.subIndex
			const skill = draft[action.skillIndex]
			const subSkill = skill.subSkills[action.subIndex]
			draft[skillIndex].subSkills[subIndex].resources.splice(0,0, action.resource)
			break;
		}
		case 'assignSub': {
			const skillIndex = action.skillIndex;
			const subIndex = action.subIndex;
			const user = action.user;
			draft[index].usersAssigned.splice(0,0,user);
			break;
		}
		case 'unAssignSub': {
			const skillIndex = action.skillIndex;
			const subIndex = action.subIndex;
			const userIndex = action.userIndex;
			draft[skillIndex].usersAssigned.splice(userIndex, 1);
			break;
		}
		default: {
			throw Error (`Error handling action: ${action.type}`)
		}
	}
}

export default skillsReducer;