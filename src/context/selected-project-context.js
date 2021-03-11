import React, { createContext, useContext, useState } from 'react'

export const SelectedProjectContext = createContext()

export const SelectedProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState('INBOX')
  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
      children={children}
    />
  )
}

export const useSelectedPorjectValue = () => useContext(SelectedProjectContext)
