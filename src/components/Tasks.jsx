import React, { useEffect, useState } from 'react'
import { Checkbox } from './Checkbox'
import { useTasks } from '../hooks'
import { collatedTasks } from '../constants'
import { collatedTasksExists, getTitle, getCollatedTitle } from '../helpers'
import { useSelectedPorjectValue, useProjectsValue } from '../context'

export const Tasks = () => {
  const { selectedProject } = useSelectedPorjectValue()
  const { projects } = useProjectsValue()
  const { tasks, isLoading } = useTasks(selectedProject)
  const [projectName, setProjectName] = useState('')
  console.log('tasks')
  useEffect(() => {
    console.log('tasks use effect')

    if (collatedTasksExists(selectedProject) && selectedProject) {
      const { name } = getCollatedTitle(collatedTasks, selectedProject)
      setProjectName(name)
    }

    if (
      projects &&
      projects.length > 0 &&
      selectedProject &&
      !collatedTasksExists(selectedProject)
    ) {
      const { name } = getTitle(projects, selectedProject)
      setProjectName(name)
    }
    document.title = `${projectName}: Todoist`
  }, [projectName, projects, selectedProject])
  return (
    <div className='tasks'>
      <h2>{projectName}</h2>
      {isLoading && <h1>loading ...</h1>}
      <ul className='tasks__list'>
        {tasks.map((task) => {
          const { id, description } = task
          return (
            <li key={id}>
              <Checkbox id={id} />
              <span> {description}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
