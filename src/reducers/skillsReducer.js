import produce from 'immer';

const skillsReducer = produce((draft, action) => {
  switch (action.type) {
    case 'createSkill': {
      draft.push(action.data);
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
      draft[index].usersAssigned.unshift(user);
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
    case 'assignUserToSubSkill': {
      const skillIndex = action.skillIndex;
      const subSkillIndex = action.subSkillIndex;
      const user = action.user;
      draft[skillIndex].subSkills[subSkillIndex].usersAssigned.unshift(user);
      break;
    }
    case 'unAssignUserFromSubSkill': {
      const skillIndex = action.skillIndex;
      const subSkillIndex = action.subSkillIndex;
      const userIndex = action.userIndex;
      draft[skillIndex].subSkills[subSkillIndex].usersAssigned.splice(userIndex, 1);
      break;
    }
    case 'assignResourceToSubSkill': {
      const skillIndex = action.skillIndex;
			console.log(skillIndex, "SKILL INdex in reducer")
      const subSkillIndex = action.subSkillIndex;
			console.log(subSkillIndex, "SKILL INdex in reducer")
      const resource = action.resource;
      draft[skillIndex].subSkills[subSkillIndex].resources.splice(0, 0, resource);
      break;
    }
		case 'assignUserToResource': {
			const updatedResource = action.updatedResource;
			const skillIndex = action.skillIndex;
			const subSkillIndex = action.subSkillIndex;
			const resourceIndex = action.resourceIndex;
			draft[skillIndex].subSkills[subSkillIndex].resources[resourceIndex] = {...updatedResource};
			break;
		}
		case 'unAssignUserFromResource': {
			const updatedResource = action.updatedResource;
			const skillIndex = action.skillIndex;
			const subSkillIndex = action.subSkillIndex;
			const resourceIndex = action.resourceIndex;
			draft[skillIndex].subSkills[subSkillIndex].resources[resourceIndex] = {...updatedResource};
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
    default: {
      throw Error(`Error handling action: ${action.type}`);
    }
  }
});

export default skillsReducer;
``
