function SkillsReducer(skills, action) {
    switch (action.type) {
        case 'createSkill': {
            return [...skills, action.data ];
        }
        case 'readSkills': {
            throw Error (`${action.type} - NOT CREATED YET`)
        }
        case 'updateSkill': {
            return (
                skills.map((s) => {
                    if (s.id === action.skill.id) {
                        return action.skill;
                    } else {
                        return s;
                    }
                })
            )
        }
        case 'deleteSkill': {
            return skills.filter((s) => s.id !== action.id);
        }
        default: {
            throw Error (`Error handling action: ${action.type}`)
        }
    }
}

export default SkillsReducer;