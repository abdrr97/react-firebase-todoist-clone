import React from 'react'
import { FaArchive } from 'react-icons/fa'
import { db } from '../firebase'

export const Checkbox = ({ id, archived }) => {
  const archiveTask = () => {
    db.collection('tasks').doc(id).update({
      archived: archived,
    })
  }
  return (
    <div onClick={archiveTask} className='checkbox-holder'>
      <span className='checkbox'>
        <FaArchive />
      </span>
    </div>
  )
}
