import produce from 'immer';

const skillsReducer = produce((draft, action) => {
  switch (action.type) {
    case 'createInitial': {
      console.log(action.data, 'data in reducer for creating initial skills')
    }
		case 'INITIALIZE_SKILLS':{
			return action.payload;
		}
    
    case 'createSkill': {
      draft.splice(0,0,action.data);
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
      const updatedSkills = draft.filter((skill, index) => index !== action.index);
      return updatedSkills;
    }
    case 'assignSkill': {
      const index = action.index;
      const user = action.user;
      draft[index].usersAssigned.splice(0,0, user);
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
      const newSub = action.data.subSkills.at(-1);
      draft[skillIndex].subSkills.unshift(newSub);
      break;
    }
    case 'updateSubSkill': {
      const subSkill = action.subSkill;
      // console.log(subSkill, "subskill from response in reducer")
      // console.log(action.subSkill.parentSkill[0], ' parentskill')
      const skillIndex = draft.findIndex((s) => s._id === subSkill.parentSkill[0])
      if (skillIndex === -1) {
        console.error(`Skill with ID ${action.subSkill.parentSkill} not found.`);
        break;
      }
    
      const subSkillIndex = draft[skillIndex].subSkills.findIndex((s) => s._id === subSkill._id);
    
      if (subSkillIndex === -1) {
        console.error(`Subskill with ID ${subSkill.id} not found.`);
        break;
      }

      draft[skillIndex].subSkills[subSkillIndex] = ({
        ...draft[skillIndex].subSkills[subSkillIndex],
        ...subSkill
      })
      ;
      console.log(draft[skillIndex].subSkills[subSkillIndex], "--- updated subskill")
      break;
    }
    // case 'assignUserToSubSkill': {
    //   const subSkill = action.subSkill;
    //   const user = action.user;
    //   const skillIndex = draft.findIndex((s) => s._id === subSkill.parentSkill[0])
    //   if (skillIndex === -1) {
    //     console.error(`Skill with ID ${action.parentSkill} not found.`);
    //     break;
    //   }
    
    //   const subSkillIndex = draft[skillIndex].subSkills.findIndex((s) => s._id === subSkill._id);
    
    //   if (subSkillIndex === -1) {
    //     console.error(`Subskill with ID ${subSkill.id} not found.`);
    //     break;
    //   }

    //   draft[skillIndex].subSkills[subSkillIndex]?.usersAssigned.splice(0,0, user)
    //   break;
    // }
    case 'unAssignUserFromSubSkill': {
      const skillIndex = action.skillIndex;
      const subSkillIndex = action.subSkillIndex;
      const userIndex = action.userIndex;
      draft[skillIndex].subSkills[subSkillIndex].usersAssigned.splice(userIndex, 1);
      break;
    }
    case 'assignUserToResource': {
      const user = action.user;
      const skillIndex = action.skillIndex;
      const subSkillIndex = action.subSkillIndex;
			const resources = draft[skillIndex].subSkills[subSkillIndex].resources;
			const resourceIndex = resources.findIndex((r) => r._id === action.resource._id)

      // Ensure usersAssigned is an array of objects, and add the user.
      const resource = draft[skillIndex].subSkills[subSkillIndex].resources[resourceIndex];
      resource.usersAssigned = resource?.usersAssigned.map((u) => (typeof u === 'string' ? { _id: user } : user));
      resource.usersAssigned.splice(0, 0, user);

      break;
    }
    case 'unAssignUserFromResource': {
      const skillIndex = action.skillIndex;
      const subSkillIndex = action.subSkillIndex;
      const resourceIndex = action.resourceIndex;
      const user = action.user;

      // Ensure usersAssigned is an array of objects, and remove the user.
      const resource = draft[skillIndex].subSkills[subSkillIndex].resources[resourceIndex];
      resource.usersAssigned = resource?.usersAssigned.map((user) => (typeof user === 'string' ? { _id: user } : user));
      resource.usersAssigned = resource?.usersAssigned.filter((foundUser) => foundUser._id !== user._id);

      break;
    }
		
    case 'deleteResource': {
      const skillIndex = action.skillIndex;
      const subIndex = action.subIndex;
      const resourceId = action.resourceId;

      if (!draft[skillIndex]) {
        console.error(`Skill with index ${skillIndex} not found.`);
        break;
      }

      const skill = draft[skillIndex];

      if (!skill.subSkills || !skill.subSkills[subIndex]) {
        console.error(`SubSkill with index ${subIndex} not found.`);
        break;
      }

      const subSkill = skill.subSkills[subIndex];

      subSkill.resources = subSkill.resources.filter(resource => resource._id !== resourceId);
      break;
    }
    case 'assignResourceToSubSkill': {
      const skillIndex = action.skillIndex;
      const subSkillIndex = action.subSkillIndex;
      const resource = action.resource;
      const user = action.user;

      if (!draft[skillIndex].subSkills[subSkillIndex]) {
        console.error(`Skill with index ${skillIndex} ans subskill index: ${subSkillIndex} not found. - assign resource to sub`);
        break;
      }
      
      draft[skillIndex].subSkills[subSkillIndex].resources.splice(0,0, resource)
      break;
    }

    default: {
      throw Error(`Error handling action: ${action.type}`);
    }
  }
});

export default skillsReducer;
