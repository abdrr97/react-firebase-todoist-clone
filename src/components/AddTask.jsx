import React, { useState } from 'react'
import { FaRegCalendarAlt, FaPlus, FaMinus, FaRegListAlt } from 'react-icons/fa'
import moment from 'moment'
import { db } from '../firebase'
import { useSelectedPorjectValue } from '../context'
import { ProjectOverlay } from './ProjectOverlay'
import { TaskDate } from './TaskDate'

export const AddTask = ({
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [projectName, setProjectName] = useState('')
  const [selectdProjectName, setSelectdProjectName] = useState('')
  const [showMain, setShowMain] = useState(showShouldMain)
  const [showProjectOverlay, setShowProjectOverlay] = useState(false)
  const [showTaskDate, setShowTaskDate] = useState(false)

  const { selectedProject } = useSelectedPorjectValue()
  const projectOverlayProps = {
    projectName,
    setProjectName,
    showProjectOverlay,
    showTaskDate,
    setShowProjectOverlay,
    setSelectdProjectName,
  }
  const taskDateProps = {
    setTaskDate,
    setShowProjectOverlay,
    showTaskDate,
    setShowTaskDate,
  }
  const addTask = async () => {
    const projectId = projectName || selectedProject
    let collatedDate = ''
    if (projectId) {
      collatedDate = moment().format('DD/MM/YYYY')
    } else if (projectId === 'NEXT_WEEK') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY')
    }
    return (
      task &&
      projectId &&
      (await db
        .collection('tasks')
        .add({
          archived: false,
          userId: '2OcT7Toll5wIxRRWKDQL',
          date: taskDate || collatedDate,
          projectId,
          description: task,
        })
        .then(() => {
          setTask('')
          setTaskDate('')
          setProjectName('')
          setSelectdProjectName('')
          setShowMain('')
          setShowProjectOverlay(false)
        }))
    )
  }

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
    >
      {showAddTaskMain && (
        <div
          className='add-task__shallow'
          onClick={() => setShowMain(!showMain)}
        >
          <span className='add-task__plus'>
            {!showMain ? <FaPlus /> : <FaMinus />}
          </span>
          <span className='add-task__text' onClick={addTask}>
            Add Task
          </span>
        </div>
      )}
      {(showMain || showQuickAddTask) && (
        <div className='add-task__main'>
          {showQuickAddTask && (
            <div className=''>
              <h2 className='header'>Quick Add Task</h2>
              <span
                className='add-task__cancel-x'
                onClick={() => {
                  setShowMain(false)
                  setShowProjectOverlay(false)
                  setShowQuickAddTask(false)
                }}
              >
                ✖
              </span>
            </div>
          )}
          <ProjectOverlay {...projectOverlayProps} />
          <TaskDate {...taskDateProps} />
          <input
            type='text'
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className='add-task__content'
          />

          <button
            onClick={() => addTask()}
            type='button'
            className='add-task__submit'
          >
            Add Task
          </button>
          {taskDate && <div className='selected-task-date'>{taskDate}</div>}
          {projectName && (
            <div className='selected-task-date'>{selectdProjectName}</div>
          )}
          {!showQuickAddTask && (
            <span
              className='add-task__cancel'
              onClick={() => {
                setShowMain(false)
                setShowProjectOverlay(false)
              }}
            >
              Cancel
            </span>
          )}
          <span
            onClick={() => {
              setShowProjectOverlay(!showProjectOverlay)
              setShowTaskDate(false)
            }}
            className='add-task__project'
          >
            <FaRegListAlt className={showProjectOverlay && 'icon-active'} />
          </span>
          <span
            onClick={() => {
              setShowProjectOverlay(false)
              setShowTaskDate(!showTaskDate)
            }}
            className='add-task__date'
          >
            <FaRegCalendarAlt className={showTaskDate && 'icon-active'} />
          </span>
        </div>
      )}
    </div>
  )
}
