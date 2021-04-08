import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
const Login = () => {
  const [email, setEmail] = useState('abdrr97@gmail.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const history = useHistory()

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setIsLoading(true)
      await login(email, password)

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
            <h2 className='text-center mb-4'>Log In</h2>

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

              <button
                disabled={isLoading}
                type='submit'
                className='w-100 btn btn-primary mt-3'
              >
                {!isLoading && 'Login'}
                {isLoading && (
                  <div className='d-flex justify-content-center'>
                    <div className='spinner-border' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  </div>
                )}
              </button>
            </form>
            <div className='w-100 text-center mt-2'>
              <Link to='/forgot-password'>Forgot Password</Link>
            </div>
          </div>
        </div>
        <div className='w-100 text-center mt-2'>
          Don't have an account ? <Link to='/sign-up'>Sign Up</Link>
        </div>
      </div>
    </>
  )
}

export default Login
