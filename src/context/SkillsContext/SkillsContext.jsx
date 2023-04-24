import React, {useContext, createContext, useEffect, useState} from "react";
import { useImmerReducer } from 'use-immer';

import skillsReducer from "../../reducers/skillsReducer";

import userService from "../../utils/userService";
import * as skillsApi from "../../utils/skillApi.js";

async function getSkillsFromServer(){
  const response = await skillsApi.getAll(userService.getUser()._id);
  return await response.skills
}


export const SkillsContext = createContext(null);
export const SkillsDispatchContext = createContext(null);


export function useSkillsContext() {
  return useContext(SkillsContext)
} 

export function SkillsProvider({ children }) {
  const [skills, dispatch] = useImmerReducer(skillsReducer, null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInitialSkills() {
      const initialSkills = await getSkillsFromServer();
      dispatch({ type: 'INITIALIZE_SKILLS', payload: initialSkills });
      setIsLoading(false);
    }

    fetchInitialSkills();
  }, [dispatch]);


  return (
    !isLoading && (
      <SkillsContext.Provider value={skills}>
        <SkillsDispatchContext.Provider value={dispatch}>
          {children}
        </SkillsDispatchContext.Provider>
      </SkillsContext.Provider>
    )
  );
}

export function useSkills() {
  return useContext(SkillsContext);
}

export function useSkillsDispatch() {
  return useContext(SkillsDispatchContext);
}

