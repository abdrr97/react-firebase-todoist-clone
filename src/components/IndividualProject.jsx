import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useProjectsValue, useSelectedPorjectValue } from '../context'
import { db } from '../firebase'

export const IndividualProject = ({ project }) => {
  const { name, docId } = project
  const [showConfirm, setShowConfirm] = useState(false)
  const { setSelectedProject } = useSelectedPorjectValue()
  const { projects, setProjects } = useProjectsValue()
  const deleteProject = () => {
    db.collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects])
        setSelectedProject('INBOX')
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
              <span onClick={() => setShowConfirm(!showConfirm)}>cancel</span>
            </div>
          </div>
        )}
        <FaTrashAlt />
      </span>
    </>
  )
}
