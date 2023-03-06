function AssignSkillReducer(draft, action) {
	switch (action.type) {

		case 'assign': {
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


	
		default: {
			throw Error (`Error handling action: ${action.type}`)
		}
	}
}

export default AssignSkillReducer;