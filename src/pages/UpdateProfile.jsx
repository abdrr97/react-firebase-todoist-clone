import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

const UpdateProfile = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassowrd, setConfirmPassowrd] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const { currentUser, updateEmail, updatePassword } = useAuth()

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    if (password.trim() !== confirmPassowrd.trim()) {
      setPassword('')
      setConfirmPassowrd('')
      return setError('Passwords do not match 😭😭')
    }
    setIsLoading(true)
    setError('')
    const promises = []

    if (email !== currentUser.email) {
      promises.push(updateEmail(email))
    }

    if (password) {
      promises.push(updatePassword(password))
    }

    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        setError('Failed to update profile')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <>
      <div
        className='container d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100 ' style={{ maxWidth: '400px' }}>
          <div className='card'>
            <div className='card-body'>
              <h2 className='text-center mb-4'>Update Profile</h2>

              <form action='' onSubmit={handleUpdateProfile}>
                {error && <div className='alert alert-danger'>{error}</div>}

                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    id='email'
                    name='email'
                    type='email'
                    placeholder='email goes here '
                    className='form-control'
                    value={!email ? currentUser.email : email}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Leave it empty to keep the same'
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password-confirmation'>
                    Password Confirmation
                  </label>
                  <input
                    value={confirmPassowrd}
                    onChange={(event) => setConfirmPassowrd(event.target.value)}
                    id='password-confirmation'
                    name='password-confirmation'
                    type='password'
                    placeholder='Leave it empty to keep the same'
                    className='form-control'
                  />
                </div>

                <button
                  disabled={isLoading}
                  type='submit'
                  className='w-100 btn btn-primary mt-5'
                >
                  {isLoading ? (
                    <div className='d-flex justify-content-center'>
                      <div className='spinner-border' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className='w-100 text-center mt-2'>
            <Link to='/'>Cancel</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile
