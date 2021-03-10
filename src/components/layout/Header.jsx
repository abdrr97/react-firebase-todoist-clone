import React from 'react'
import { FaPizzaSlice } from 'react-icons/fa'
export const Header = () => {
  return (
    <header className='header'>
      <nav>
        <div className='logo'>
          <img
            src='https://raw.githubusercontent.com/karlhadwen/todoist/master/public/images/logo.png'
            alt='todoist react firebase clone'
          />
          todoist
        </div>
        <div className='settings'>
          <ul>
            <li>+</li>
            <li>
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
