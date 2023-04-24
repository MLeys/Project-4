import React, {useContext, createContext, useEffect, useState} from "react";
import { useImmerReducer } from 'use-immer';

import skillsReducer from "../../reducers/skillsReducer";

import userService from "../../utils/userService";
import * as skillsApi from "../../utils/skillApi.js";

import { getSkillsFromServer } from "../../App";

export const SkillsContext = createContext(null);
export const SkillsDispatchContext = createContext(null);

export function useSkillsContext() {
  return useContext(SkillsContext)
} 

export function SkillsProvider({ children, loggedUser }) {
  const [skills, dispatch] = useImmerReducer(skillsReducer, null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loggedUser) {
      setIsLoading(false);
      return;
    }
  
    const fetchSkills = async () => {
      setIsLoading(true);
      try {
        const response = await getSkillsFromServer();
        dispatch({ type: 'INITIALIZE_SKILLS', payload: response });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setIsLoading(false);
      }
    };
  
    fetchSkills();
  }, [loggedUser]);


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
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  return context;
}

export function useSkillsDispatch() {
  return useContext(SkillsDispatchContext);
}

