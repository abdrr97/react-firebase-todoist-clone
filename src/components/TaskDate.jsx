import React, { useEffect } from 'react'
import moment from 'moment'
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from 'react-icons/fa'

export const TaskDate = ({
  setTaskDate,
  showTaskDate,
  setShowTaskDate,
  setShowProjectOverlay,
}) => {
  return (
    showTaskDate && (
      <div className='task-date'>
        <ul className='task-date__list'>
          <li
            onClick={() => {
              setShowTaskDate(false)
              setTaskDate(moment().format('DD/MM/YYYY'))
            }}
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Today</span>
          </li>
          <li
            onClick={() => {
              setShowTaskDate(false)
              setTaskDate(moment().format('DD/MM/YYYY'))
            }}
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </li>
          <li
            onClick={() => {
              setShowTaskDate(false)
              setTaskDate(moment().format('DD/MM/YYYY'))
            }}
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Tomorrow</span>
          </li>
        </ul>
      </div>
    )
  )
}
