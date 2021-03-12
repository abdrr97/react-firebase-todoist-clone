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
  const [project, setProject] = useState('')
  const [showMain, setShowMain] = useState(showShouldMain)
  const [showProjectOverlay, setShowProjectOverlay] = useState(false)
  const [showTaskDate, setShowTaskDate] = useState(false)

  const { selectedProject } = useSelectedPorjectValue()

  const addTask = () => {
    const projectId = project || selectedProject
    let collatedDate = ''
    if (projectId) {
      collatedDate = moment().format('DD/MM/YYYY')
    } else if (projectId === 'NEXT_WEEK') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY')
    }
    return (
      task &&
      projectId &&
      db
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
          setProject('')
          setShowMain('')
          setShowProjectOverlay(false)
        })
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
      {/* showQuickAddTask */}
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
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            showTaskDate={showTaskDate}
            setShowProjectOverlay={setShowProjectOverlay}
          />

          <TaskDate
            setTaskDate={setTaskDate}
            setShowProjectOverlay={setShowProjectOverlay}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
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
            <FaRegListAlt />
          </span>
          <span
            onClick={() => {
              setShowProjectOverlay(false)
              setShowTaskDate(!showTaskDate)
            }}
            className='add-task__date'
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  )
}
