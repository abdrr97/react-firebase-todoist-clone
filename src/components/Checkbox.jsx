import React, { useState } from 'react'
import { db } from '../firebase'

export const Checkbox = ({ id, archived }) => {
  const archiveTask = () => {
    db.collection('tasks').doc(id).update({
      archived: archived,
    })
  }
  return (
    <div onClick={archiveTask} className='checkbox-holder'>
      <span className='checkbox '></span>
    </div>
  )
}
