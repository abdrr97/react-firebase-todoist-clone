import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

const SignUp = () => {
  const [email, setEmail] = useState('abdrr97@gmail.com')
  const [password, setPassword] = useState('password')
  const [confirmPassowrd, setConfirmPassowrd] = useState('password')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const history = useHistory()

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (password.trim() !== confirmPassowrd.trim()) {
      return setError('Passwords do not match 😭😭')
    }

    try {
      setError('')
      setIsLoading(true)
      await signup(email, password)
      history.push('/')
    } catch (ex) {
      setError(`${ex.message} 😢😢`)
    }
    setIsLoading(false)
  }
  return (
    <>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4'>Sign Up</h2>

            <form action='' onSubmit={handleSignUp}>
              {error && <div className='alert alert-danger'>{error}</div>}

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Enter your email here'
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Enter your password here'
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
                  required
                  id='password-confirmation'
                  name='password-confirmation'
                  type='password'
                  placeholder='ReWrite your password'
                  className='form-control'
                />
              </div>

              <button
                disabled={isLoading}
                type='submit'
                className='w-100 btn btn-primary mt-5'
              >
                {!isLoading && 'Sign Up'}
                {isLoading && (
                  <div className='d-flex justify-content-center'>
                    <div className='spinner-border' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className='w-100 text-center mt-2'>
          Already Have an Account? <Link to='/log-in'>Log in</Link>
        </div>
      </div>
    </>
  )
}

export default SignUp
