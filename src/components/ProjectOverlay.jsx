import React from 'react'
import { useProjectsValue } from '../context'
export const ProjectOverlay = ({
  setProjectName,
  projectName,
  showProjectOverlay,
  setShowProjectOverlay,
  setSelectdProjectName,
}) => {
  const { projects } = useProjectsValue()
  return (
    projects &&
    showProjectOverlay && (
      <div className='project-overlay'>
        <ul className='project-overlay__list'>
          {projects.map((project) => {
            const { name, projectId } = project
            return (
              <li
                className={projectName === projectId ? 'active' : ''}
                key={projectId}
                onClick={() => {
                  setProjectName(projectId)
                  setSelectdProjectName(name)
                  setShowProjectOverlay(false)
                }}
              >
                <span className='project-overlay__dot'>•</span>
                <span className='sidebar__project-name'>{name}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  )
}
