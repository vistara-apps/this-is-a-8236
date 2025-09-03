import React, { useState } from 'react'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Agents from './pages/Agents'
import DataSources from './pages/DataSources'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'agents':
        return <Agents />
      case 'data-sources':
        return <DataSources />
      case 'tasks':
        return <Tasks />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <DashboardLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  )
}

export default App