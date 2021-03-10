import React, { createContext, useContext } from 'react'
import { useProject } from '../hooks'
export const ProjectContext = createContext()
export const ProjectProvider = ({ children }) => {
  const { projects, setProjects } = useProject()

  const values = { projects, setProjects }
  return <ProjectContext.Provider value={values} children={children} />
}
export const useProjectsValue = () => useContext(ProjectContext)
