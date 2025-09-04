import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/AuthGuard'
import DashboardLayout from './components/DashboardLayout'
import ErrorBoundary from './components/ErrorBoundary'
import Dashboard from './pages/Dashboard'
import Agents from './pages/Agents'
import DataSources from './pages/DataSources'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { validateEnv } from './config/env'

function App() {
  // Validate environment variables on app start
  React.useEffect(() => {
    try {
      validateEnv()
    } catch (error) {
      console.warn('Environment validation warning:', error)
    }
  }, [])

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <AuthGuard>
                <DashboardLayout>
                  <Navigate to="/dashboard" replace />
                </DashboardLayout>
              </AuthGuard>
            } />
            
            <Route path="/dashboard" element={
              <AuthGuard>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </AuthGuard>
            } />
            
            <Route path="/agents" element={
              <AuthGuard>
                <DashboardLayout>
                  <Agents />
                </DashboardLayout>
              </AuthGuard>
            } />
            
            <Route path="/data-sources" element={
              <AuthGuard>
                <DashboardLayout>
                  <DataSources />
                </DashboardLayout>
              </AuthGuard>
            } />
            
            <Route path="/tasks" element={
              <AuthGuard>
                <DashboardLayout>
                  <Tasks />
                </DashboardLayout>
              </AuthGuard>
            } />
            
            <Route path="/settings" element={
              <AuthGuard>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </AuthGuard>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1F2937',
                color: '#F9FAFB',
                border: '1px solid #374151'
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#F9FAFB'
                }
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#F9FAFB'
                }
              }
            }}
          />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
