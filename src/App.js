import React, { useState } from 'react'
import { Content, Header } from './components/layout'
import { ProjectProvider, SelectedProjectProvider } from './context'
export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault)
  return (
    <SelectedProjectProvider>
      <ProjectProvider>
        <main className={darkMode ? 'darkmode' : undefined}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectProvider>
    </SelectedProjectProvider>
  )
}
