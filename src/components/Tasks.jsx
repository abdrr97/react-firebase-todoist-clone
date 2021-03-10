import React, { useState, useEffect } from 'react'
import { Checkbox } from './Checkbox'
import { useTasks } from '../hooks'
import { collatedTasks } from '../constants'
import { collatedTasksExists, getTitle, getCollatedTitle } from '../helpers'
import { useSelectedPorjectValue, useProjectsValue } from '../context'

export const Tasks = () => {
  const { selectedProject } = useSelectedPorjectValue()
  const { projects } = useProjectsValue()
  const { tasks } = useTasks(selectedProject)

  let projectName = ''
  if (projects && selectedProject && !collatedTasksExists(selectedProject)) {
    const { name } = getTitle(projects, selectedProject)
    projectName = name
  }

  if (collatedTasksExists(selectedProject) && selectedProject) {
    const { name } = getCollatedTitle(collatedTasks, selectedProject)
    projectName = name
    console.log(name)
  }
  console.log('tasks component')

  useEffect(() => {
    document.title = `${projectName} : React Todoist`
  })
  return (
    <div className='tasks'>
      <h2>{projectName}</h2>

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
