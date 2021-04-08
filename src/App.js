import React, { lazy, Suspense } from 'react'
import { ProjectProvider, SelectedProjectProvider } from './context'
import { AuthProvider } from './context/auth-context'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import Dashboard from './pages/Dashboard'

const Signup = lazy(() => import('./pages/SignUp'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const UpdateProfile = lazy(() => import('./pages/UpdateProfile'))

export const App = () => {
  return (
    <AuthProvider>
      <SelectedProjectProvider>
        <ProjectProvider>
          <Router>
            <Suspense fallback={<p>Loading...</p>}>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <Route path='/sign-up' component={Signup} />
                <Route path='/log-in' component={Login} />
                <Route path='/update-profile' component={UpdateProfile} />
                <Route path='/forgot-password' component={ForgotPassword} />
                <Route path='*' component={NotFound} />
              </Switch>
            </Suspense>
          </Router>
        </ProjectProvider>
      </SelectedProjectProvider>
    </AuthProvider>
  )
}
