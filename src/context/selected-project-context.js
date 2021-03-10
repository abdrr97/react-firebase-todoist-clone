import React, { createContext, useContext, useState } from 'react'

export const SelectedProjectContext = createContext()

export const SelectedProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState('INBOX')
  const values = { selectedProject, setSelectedProject }

  return <SelectedProjectContext.Provider value={values} children={children} />
}

export const useSelectedPorjectValue = () => useContext(SelectedProjectContext)
