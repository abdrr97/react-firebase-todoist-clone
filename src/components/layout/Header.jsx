import React, { useState } from 'react'
import { FaPizzaSlice } from 'react-icons/fa'
import { AddTask } from '../AddTask'
export const Header = ({ darkMode, setDarkMode }) => {
  const [showShouldMain, setShowShouldMain] = useState(false)
  const [showQuickAddTask, setShowQuickAddTask] = useState(false)

  return (
    <header className='header'>
      <nav>
        <div className='logo'>
          <img
            src='https://raw.githubusercontent.com/karlhadwen/todoist/master/public/images/logo.png'
            alt='todoist react firebase clone'
          />
        </div>
        <div className='settings'>
          <ul>
            <li
              className='settings__add'
              onClick={() => {
                setShowShouldMain(true)
                setShowQuickAddTask(true)
              }}
            >
              +
            </li>
            <li
              className='settings__darkmode'
              onClick={() => setDarkMode(!darkMode)}
            >
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
      <AddTask
        showAddTaskMain={false}
        showShouldMain={showShouldMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  )
}
