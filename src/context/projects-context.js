import React, { createContext, useContext } from 'react'
import { useProject } from '../hooks'

export const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
  const { projects, setProjects, isProjectsLoading } = useProject()
  return (
    <ProjectContext.Provider
      value={{ projects, setProjects, isProjectsLoading }}
      children={children}
    />
  )
}
export const useProjectsValue = () => useContext(ProjectContext)
