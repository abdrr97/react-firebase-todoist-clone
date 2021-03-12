import React, { useState } from 'react'
import { useSelectedPorjectValue, useProjectsValue } from '../context'
import { IndividualProject } from './IndividualProject'
export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue)
  const { setSelectedProject } = useSelectedPorjectValue()
  const { projects, isProjectsLoading } = useProjectsValue()
  console.log('projects')
  return (
    <>
      {isProjectsLoading && <h1>loading ...</h1>}
      {!isProjectsLoading &&
        projects &&
        projects.map((project) => {
          const { docId, projectId } = project
          console.log(docId)
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
