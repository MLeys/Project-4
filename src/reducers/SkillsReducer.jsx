function SkillsReducer(skills, action) {
    if (action.type === 'createSkill') {
        return [...skills, action.data ];

    } else if (action.type === 'updateSkill') {
        return (
            skills.map((s) => {
                if (s.id === action.skill.id) {
                    return action.skill;
                } else {
                    return s;
                }
            })
        )

    } else if (action.type === 'deleteSkill') {
        return skills.filter((s) => s.id !== action.id);

    } else {
        throw Error (`Error handling action: ${action.type}`)
    }
}

export default SkillsReducer;