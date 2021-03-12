import React, { useState } from 'react'
import moment from 'moment'
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from 'react-icons/fa'

export const TaskDate = ({
  setTaskDate,
  showTaskDate,
  setShowTaskDate,
  setShowProjectOverlay,
}) => {
  const [activeTaskDate, setSctiveTaskDate] = useState('')
  const collatedDateItems = [
    {
      name: 'Today',
      icon: <FaSpaceShuttle />,
      fun: () => {
        setShowTaskDate(false)
        setSctiveTaskDate('Today')
        setTaskDate(moment().format('DD/MM/YYYY'))
      },
    },
    {
      name: 'Tomorrow',
      icon: <FaSun />,
      fun: () => {
        setShowTaskDate(false)
        setSctiveTaskDate('Tomorrow')
        setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'))
      },
    },
    {
      name: 'Next Week',
      icon: <FaRegPaperPlane />,
      fun: () => {
        setShowTaskDate(false)
        setSctiveTaskDate('Next Week')
        setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'))
      },
    },
  ]

  return (
    showTaskDate && (
      <div className='task-date'>
        <ul className='task-date__list'>
          {collatedDateItems.map((item) => {
            const { name, icon, fun } = item
            return (
              <li
                className={activeTaskDate === name ? 'active' : ''}
                key={name}
                onClick={fun}
              >
                <span>{icon}</span>
                <span>{name}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  )
}
