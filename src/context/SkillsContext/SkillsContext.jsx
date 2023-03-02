import React, {useContext, createContext} from "react";
import { useImmerReducer} from 'use-immer';

export const SkillsContext = createContext(null);
export const SkillsDispatchContext = createContext(null);

export function SkillsProvider({ children }) {
	const [skills, dispatch] = useImmerReducer(skillsReducer, null);

	return (
		<SkillsContext.Provider value={skills}>
			<SkillsDispatchContext.Provider value={dispatch}>
				{ children }
			</SkillsDispatchContext.Provider>
		</SkillsContext.Provider>
	);
}

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

export function useSkills() {
	return useContext(SkillsContext);
}

export function useSkillsDispatch() {
	return useContext(SkillsDispatchContext);
}

