function SkillsReducer(draft, action) {
    switch (action.type) {
        case 'createSkill': {
            draft.push(action.data)
            break;
        }
        case 'readSkills': {
            throw Error (`${action.type} - NOT CREATED YET`)
            
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
        default: {
            throw Error (`Error handling action: ${action.type}`)
        }
    }
}

export default SkillsReducer;