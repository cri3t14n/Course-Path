import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import CourseList from './components/CourseList/CourseList'
import Planner from './components/Planner/Planner'
import LoginPage from './components/LoginPage/LoginPage'
import MainPage from './components/MainPage/MainPage'
import './App.css'

// Expiry timer in minutes for user inactivity
const expiryTimer = 30

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  )
}

function AppRoutes() {
  // Set initial authentication state based on localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    const expiryTime = localStorage.getItem('expiryTime')
    const currentTime = new Date().getTime()
    // Return true if user is authenticated and session hasn't expired
    return storedAuth === 'true' && expiryTime && currentTime < expiryTime
  })

  const navigate = useNavigate() // Hook to programmatically navigate between routes

  // Function to handle login
  const handleLogin = () => {
    const expiryTime = new Date().getTime() + expiryTimer * 60 * 1000
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('expiryTime', expiryTime) 
    setIsAuthenticated(true)
    navigate('/') // Navigate to page after login
  }

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('expiryTime')
    setIsAuthenticated(false)
    navigate('/login') // Navigate to the login page after logout
  };

  // UseEffect to monitor user session and activity
  useEffect(() => {
    const checkSession = () => {
      const storedAuth = localStorage.getItem('isAuthenticated')
      const expiryTime = localStorage.getItem('expiryTime')
      const currentTime = new Date().getTime()
      // Logout if the session has expired
      if (storedAuth === 'true' && expiryTime && currentTime >= expiryTime) {
        handleLogout()
      }
    }

    // Function to reset the session timeout on user activity
    const handleUserActivity = () => {
      const newExpiryTime = new Date().getTime() + expiryTimer * 60 * 1000 
      localStorage.setItem('expiryTime', newExpiryTime) // Update expiry time in localStorage
    }

    checkSession() // Check session expiry on component mount

    // Set up event listeners to detect user activity
    window.addEventListener('mousemove', handleUserActivity)
    window.addEventListener('keydown', handleUserActivity)
    window.addEventListener('scroll', handleUserActivity)

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handleUserActivity)
      window.removeEventListener('keydown', handleUserActivity)
      window.removeEventListener('scroll', handleUserActivity)
    }
  }, [isAuthenticated]) // Re-run effect when it changes

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/planner" element={<Planner />} /> 
            {/* <Route path="*" element={<PageNotFound />} /> Uncomment to add a page not found component */}
          </Routes>
        </>
      ) : (
        // Render login route if user is not authenticated
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} /> 
          <Route path="*" element={<Navigate to="/login" />} /> 
        </Routes>
      )}
    </>
  )
}

export default App
