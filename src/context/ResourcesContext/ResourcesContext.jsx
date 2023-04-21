import React, {useContext, createContext} from "react";

export const ResourcesContext = createContext(null);
export const ResourcesDispatchContext = createContext(null);

export default function useResourcesContext() {
  return useContext(ResourcesContext)
} 