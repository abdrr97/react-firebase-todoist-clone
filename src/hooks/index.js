import { useState, useEffect } from 'react'
import moment from 'moment'
import { db } from '../firebase'
import { collatedTasksExists } from '../helpers'
import { useAuth } from '../context/auth-context'

export const useTasks = (selectedProject) => {
  const { currentUser } = useAuth()
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getTasks = async () => {
      let unsubscribe = await db
        .collection('tasks')
        .where('userId', '==', currentUser.uid)
      unsubscribe =
        selectedProject && !collatedTasksExists(selectedProject)
          ? (unsubscribe = await unsubscribe.where(
              'projectId',
              '==',
              selectedProject
            ))
          : selectedProject === 'TODAY'
          ? (unsubscribe = await unsubscribe.where(
              'date',
              '==',
              moment().format('DD/MM/YYYY')
            ))
          : selectedProject === 'INBOX' || selectedProject === 0
          ? (unsubscribe = await unsubscribe.where('date', '==', ''))
          : unsubscribe

      unsubscribe = await unsubscribe.onSnapshot((snapshot) => {
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
            : selectedProject === 'ARCHIVED'
            ? newTasks.filter((task) => task.archived)
            : newTasks.filter((task) => !task.archived)
        )
        console.log(newTasks)
        setArchivedTasks(newTasks.filter((task) => task.archived))
      })

      return unsubscribe
    }
    setIsLoading(true)
    getTasks()
    setIsLoading(false)
  }, [currentUser, selectedProject])

  return { tasks, archivedTasks, isLoading, setTasks }
}

export const useProject = () => {
  const { currentUser } = useAuth()
  const [projects, setProjects] = useState([])
  const [isProjectsLoading, setIsProjectsLoading] = useState(true)

  const getProjects = async () => {
    setIsProjectsLoading(true)
    await db
      .collection('projects')
      .where('userId', '==', currentUser.uid)
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
    if (!currentUser) return

    getProjects()
  }, [])
  return { projects, setProjects, isProjectsLoading, getProjects }
}
