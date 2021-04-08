import React from 'react'
import { Content, Header } from '../components/layout'

const Dashboard = () => {
  return (
    <>
      <main className='w-100' style={{ maxWidth: '400px' }}>
        <Header />
        <Content />
      </main>
    </>
  )
}

export default Dashboard
