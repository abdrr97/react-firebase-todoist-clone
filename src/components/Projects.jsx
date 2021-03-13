import React, { useState } from 'react'
import { useSelectedPorjectValue, useProjectsValue } from '../context'
import { IndividualProject } from './IndividualProject'
import Skeleton from 'react-loading-skeleton'

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue)
  const { setSelectedProject } = useSelectedPorjectValue()
  const { projects, isProjectsLoading } = useProjectsValue()
  return (
    <>
      {isProjectsLoading && <Skeleton count={5} className='sidebar__project' />}
      {!isProjectsLoading &&
        projects &&
        projects.map((project) => {
          const { docId, projectId } = project
          return (
            <li
              key={projectId}
              data-doc-id={docId}
              className={
                active === projectId
                  ? 'active sidebar__project'
                  : 'sidebar__project'
              }
              onClick={() => {
                setActive(projectId)
                setSelectedProject(projectId)
              }}
              role='button'
            >
              <IndividualProject project={project} />
            </li>
          )
        })}
    </>
  )
}
