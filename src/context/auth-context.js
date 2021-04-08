import React, { useContext, useState, useEffect } from 'react'

import { auth } from '../firebase'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    return auth.signOut()
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  const updateEmail = (email) => {
    return currentUser.updateEmail(email)
  }
  const updatePassword = (password) => {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  const values = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }
  return (
    <AuthContext.Provider value={values} children={!isLoading && children} />
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
