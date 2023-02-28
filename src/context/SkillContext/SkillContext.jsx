import React, {useContext, createContext} from "react";

export const SkillContext = createContext(null);

export default function useSkillContext() {
    return useContext(SkillContext);
}