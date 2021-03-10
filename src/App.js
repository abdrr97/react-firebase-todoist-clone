import React from 'react'
import { Content, Header } from './components/layout'
import { ProjectProvider, SelectedProjectProvider } from './context'
export const App = () => {
  return (
    <SelectedProjectProvider>
      <ProjectProvider>
        <div className='App'>
          <Header />
          <Content />
        </div>
      </ProjectProvider>
    </SelectedProjectProvider>
  )
}
