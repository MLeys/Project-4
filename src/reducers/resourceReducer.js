function resourcesReducer(draft, action) {
	switch (action.type) {
		case 'createResource': {
			draft.push(action.data)
			break;
		}
		case 'readResources': {
			return action.data;	
		}
		case 'updateResource': {
			const index = draft.findIndex((s) => s.id === action.skill.id);
			draft[index] = action.skill;
			break;
		}
		case 'deleteResource': {
			return draft.filter((s) => s.id !== action.id);
		}
		case 'assignResource': {
			// console.log("Reducer(assignSkill): ", action)
			const index = action.index;
			const user = action.user;
			draft[index].usersAssigned.splice(0,0,user);
			break;				
		}
		case 'unAssignResource': {
			// console.log("Reducer(unAssignSkill): ", action)
			const skillIndex = action.skillIndex;
			const userIndex = action.userIndex;
			draft[skillIndex].usersAssigned.splice(userIndex, 1);
			break;
		}

		case 'addResource': {
			console.log(action.resource, "resource in reducer for addResource")
			const skillIndex = action.skillIndex
			const subIndex = action.subIndex
			const skill = draft[action.skillIndex]
			console.log(skill, "SFASDDSFA SKILL")
			const subSkill = skill.subSkills[action.subIndex]
			draft[skillIndex].subSkills[subIndex].resources.splice(0,0, action.resource)
			

			
			break;
		}

	
		default: {
			throw Error (`Error handling action: ${action.type}`)
		}
	}
}

export default resourcesReducer;