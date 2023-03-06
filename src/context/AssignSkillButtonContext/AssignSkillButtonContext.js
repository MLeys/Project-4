import React, {useContext, createContext} from "react";

export const AssignSkillButtonContext = createContext(null);

export default function useAssignSkillContext() {
  return useContext(AssignSkillButtonContext)
} 