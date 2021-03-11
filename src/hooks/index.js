import { useState, useEffect } from 'react'
import moment from 'moment'
import { db } from '../firebase'
import { collatedTasksExists } from '../helpers'

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  console.log('use tasks')

  useEffect(() => {
    console.log('use tasks use effect')
    setIsLoading(true)

    let unsubscribe = db
      .collection('tasks')
      .where('userId', '==', '2OcT7Toll5wIxRRWKDQL')
    unsubscribe =
      selectedProject && !collatedTasksExists(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe
    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }))
      setTasks(
        selectedProject === 'NEXT_WEEK'
          ? newTasks.filter(
              (task) =>
                moment(task.date, 'DD/MM/YYYY').diff(moment(), 'days') <= 7 &&
                !task.archived
            )
          : newTasks.filter((task) => !task.archived)
      )
      setArchivedTasks(newTasks.filter((task) => task.archived))
    })
    setIsLoading(false)
  }, [selectedProject])

  return { tasks, archivedTasks, isLoading }
}

export const useProject = () => {
  const [projects, setProjects] = useState([])
  const [isProjectsLoading, setIsProjectsLoading] = useState(true)

  const getProjects = () => {
    setIsProjectsLoading(true)
    db.collection('projects')
      .where('userId', '==', '2OcT7Toll5wIxRRWKDQL')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          docId: project.id,
          ...project.data(),
        }))
        setProjects(allProjects)
      })
    setIsProjectsLoading(false)
  }

  useEffect(() => {
    getProjects()
  }, [])
  return { projects, setProjects, isProjectsLoading }
}
