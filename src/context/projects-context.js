import React, { createContext, useContext } from 'react'
import { useProject } from '../hooks'

export const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
  const { projects, setProjects, isProjectsLoading, getProjects } = useProject()
  return (
    <ProjectContext.Provider
      value={{ projects, setProjects, isProjectsLoading, getProjects }}
      children={children}
    />
  )
}
export const useProjectsValue = () => useContext(ProjectContext)
