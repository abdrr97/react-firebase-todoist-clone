import React, { useState } from 'react'
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
  FaChevronRight,
} from 'react-icons/fa'
import { useSelectedPorjectValue } from '../../context/selected-project-context'
import { AddProject } from '../AddProject'
import { Projects } from '../Projects'

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedPorjectValue()
  const [active, setActive] = useState('inbox')
  const [showProjects, setShowProjects] = useState(true)

  const sidebarItems = [
    {
      key: 'INBOX',
      name: 'inbox',
      label: ' Inbox',
      icon: <FaInbox />,
    },
    {
      key: 'TODAY',
      name: 'today',
      label: ' Today',
      icon: <FaRegCalendar />,
    },
    {
      key: 'NEXT_WEEK',
      name: 'next_7',
      label: ' Next 7 days',
      icon: <FaRegCalendarAlt />,
    },
    {
      key: 'ARCHIVED',
      name: 'archisved',
      label: ' Archived',
      icon: <FaRegCalendarAlt />,
    },
  ]

  return (
    <div className='sidebar'>
      <ul className='sidebar__generic'>
        {sidebarItems.map((item) => {
          const { key, name, icon, label } = item
          return (
            <li
              key={key}
              className={active === name ? 'active ' + name : undefined}
              onClick={() => {
                setActive(name)
                setSelectedProject(key)
              }}
            >
              <span>{icon}</span>
              <span>{label.toUpperCase()}</span>
            </li>
          )
        })}
      </ul>
      <div
        className='sidebar__middle'
        onClick={() => setShowProjects(!showProjects)}
      >
        <span>
          {showProjects && (
            <FaChevronDown onClick={() => setShowProjects(!showProjects)} />
          )}

          {!showProjects && (
            <FaChevronRight onClick={() => setShowProjects(!showProjects)} />
          )}
        </span>
        <h2>PROJECTS</h2>
      </div>
      <ul className='sidebar__projects'>{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  )
}
