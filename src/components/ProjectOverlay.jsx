import React from 'react'
import { useProjectsValue } from '../context'
export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
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
                key={projectId}
                onClick={() => {
                  setProject(projectId)
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
