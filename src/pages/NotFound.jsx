import React from 'react'

const NotFound = () => {
  return (
    <div
      className='container d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='container-fluid text-center'>
        <div className='container'>
          <h1 className='display-1'>404 Not Found</h1>
          <p className='lead'>
            Sorry but the page you're looking for doesn't exists
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
