import React, { useState } from 'react'
import { FaPizzaSlice, FaUserEdit } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { AddTask } from '../AddTask'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'

export const Header = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const [showShouldMain, setShowShouldMain] = useState(false)
  const [showQuickAddTask, setShowQuickAddTask] = useState(false)

  const handleLogout = async () => {
    setError('')
    try {
      await logout()

      history.push('/log-in')
    } catch (ex) {
      setError(ex.message)
    }
  }

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
            <li>{currentUser.email}</li>
            <li className='settings__edit-profile'>
              <Link to='update-profile'>
                <FaUserEdit />
              </Link>
            </li>
            <li className='settings__edit-profile'>
              <button className='settings__add' onClick={handleLogout}>
                <BiLogOut />
              </button>
            </li>
            <li
              className='settings__add'
              onClick={() => {
                setShowShouldMain(true)
                setShowQuickAddTask(true)
              }}
            >
              +
            </li>
            <li className='settings__darkmode'>
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
      {error && <div className=''>{error}</div>}
      <AddTask
        showAddTaskMain={false}
        showShouldMain={showShouldMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  )
}
