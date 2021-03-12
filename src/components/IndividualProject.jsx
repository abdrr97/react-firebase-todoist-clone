import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useProjectsValue, useSelectedPorjectValue } from '../context'
import { db } from '../firebase'

export const IndividualProject = ({ project }) => {
  const { name, docId } = project
  const [showConfirm, setShowConfirm] = useState(false)
  const { setSelectedProject, selectedProject } = useSelectedPorjectValue()
  const { projects, setProjects } = useProjectsValue()

  const deleteProject = async () => {
    await db
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setSelectedProject('INBOX')
        setProjects(projects.filter((p) => p.projectId !== selectedProject))
      })
  }
  return (
    <>
      <span className='sidebar__dot'>•</span>
      <span className='sidebar__project-name'>{name}</span>
      <span
        onClick={() => setShowConfirm(!showConfirm)}
        role='button'
        className='sidebar__project-delete'
      >
        {showConfirm && (
          <div className='project-delete-modal'>
            <div className='project-delete-modal__inner'>
              <p>Are you sure you want to delete this project</p>
              <button onClick={deleteProject}>delete</button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowConfirm(!showConfirm)
                }}
                tabIndex={0}
                role='button'
                aria-label='Cancel adding project, do not delete'
              >
                Cancel
              </span>
            </div>
          </div>
        )}
        <FaTrashAlt />
      </span>
    </>
  )
}
