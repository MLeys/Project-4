import React, {useContext, createContext} from "react";

export const SkillsContext = createContext(null);

export default function useSkillsContext() {
    return useContext(SkillsContext);
}