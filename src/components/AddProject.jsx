import React, { useState } from 'react'
import { db } from '../firebase'
import { generatePushId } from '../helpers'
import { useProjectsValue } from '../context'
import { useAuth } from '../context/auth-context'

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow)
  const [projectName, setProjectName] = useState('')
  const { projects, setProjects } = useProjectsValue()
  const projectId = generatePushId()
  const { currentUser } = useAuth()

  const addProject = () => {
    projectName &&
      db
        .collection('projects')
        .add({
          projectId,
          name: projectName,
          userId: currentUser.uid,
        })
        .then((docRef) => {
          docRef.get().then((doc) => {
            if (doc.exists) {
              setProjects([...projects, { docId: doc.id, ...doc.data() }])
            }
          })
          setProjectName('')
          setShow(false)
        })
  }

  return (
    <div className='add-project'>
      {show && (
        <div className='add-project__input'>
          <input
            className='add-project__name'
            type='text'
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder='Name your project'
          />
          <button
            type='button'
            onClick={addProject}
            className='add-project__submit'
          >
            Add project
          </button>
          <span className='add-project__cancel' onClick={() => setShow(false)}>
            Cancel
          </span>
        </div>
      )}
      <span className='add-project__plus'>+</span>
      <span className='add-project__text' onClick={() => setShow(!show)}>
        Add Project
      </span>
    </div>
  )
}
