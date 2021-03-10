import React from 'react'
import { Checkbox } from '../Checkbox'
import { useTasks } from '../../hooks'

export const Tasks = () => {
  let projectName = ''
  const { tasks } = useTasks('1')

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
