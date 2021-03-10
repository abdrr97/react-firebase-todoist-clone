import { collatedTasks } from '../constants'

export const collatedTasksExists = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject)
