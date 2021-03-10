import { useState, useEffect } from 'react'
import moment from 'moment'
import { firebase } from '../firebase'
import { collatedTasksExists } from '../helpers'

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])

  useEffect(() => {
    console.log('use effect')
    const db = firebase.firestore()

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
      const newTasks = snapshot.docs.map((task) => {
        return {
          id: task.id,
          ...task.data(),
        }
      })

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

    return unsubscribe
  }, [selectedProject])

  return { tasks, archivedTasks }
}

export const useProject = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const db = firebase.firestore()

    db.collection('projects')
      .where('userId', '==', '2OcT7Toll5wIxRRWKDQL')
      // .orderBy('docId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          docId: project.id,
          ...project.data(),
        }))

        if (JSON.stringify(allProjects) !== JSON.stringify(projects))
          setProjects(allProjects)
      })
  }, [projects])
  return { projects, setProjects }
}
