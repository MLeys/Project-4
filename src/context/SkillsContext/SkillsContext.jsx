import React, {useContext, createContext, useReducer} from "react";
import { useImmerReducer } from 'use-immer';

import skillsReducer from "../../reducers/skillsReducer";

import userService from "../../utils/userService";
import * as skillsApi from "../../utils/skillApi.js";

const response = await skillsApi.getAll(userService.getUser()._id);
const initialSkills = await response.skills


export const SkillsContext = createContext(null);
export const SkillsDispatchContext = createContext(null);


export function useSkillsContext() {
  return useContext(SkillsContext)
} 

export function SkillsProvider({ children }) {
  const [skills, dispatch] = useImmerReducer(
    skillsReducer,
    initialSkills
  );

  return (
    <SkillsContext.Provider value={skills}>
      <SkillsDispatchContext.Provider value={dispatch}>
        {children}
      </SkillsDispatchContext.Provider>
    </SkillsContext.Provider>
  );
}

export function useSkills() {
  return useContext(SkillsContext);
}

export function useSkillsDispatch() {
  return useContext(SkillsDispatchContext);
}

