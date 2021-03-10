import React from 'react'
import { Content, Header } from './components/layout'
import { ProjectProvider } from './context'
export const App = () => {
  return (
    <ProjectProvider>
      <Header />
      <Content />
    </ProjectProvider>
  )
}
