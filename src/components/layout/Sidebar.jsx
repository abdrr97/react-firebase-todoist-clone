import React from 'react'
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa'

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul className='sidebar__generic'>
        <li className='inbox'>
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li className='today'>
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li className='next_7'>
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next Week</span>
        </li>
      </ul>
      <div className='sidebar__middle'>
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className='sidebar__projects'>
        <li>Projects will be here !</li>
      </ul>
      app project component here !!!
    </div>
  )
}
