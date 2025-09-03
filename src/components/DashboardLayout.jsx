import React from 'react'
import { Bot, Database, Settings, BarChart3, CheckSquare, Plus, Bell, User } from 'lucide-react'

const DashboardLayout = ({ children, currentPage, setCurrentPage }) => {
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'agents', name: 'Agents', icon: Bot },
    { id: 'data-sources', name: 'Data Sources', icon: Database },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <div className="w-64 bg-dark-surface border-r border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="p-xl border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">Task Weaver AI</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-lg space-y-sm">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-lg py-md rounded-md text-left transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-dark-text-secondary hover:text-dark-text hover:bg-dark-card'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-lg border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark-text truncate">Solo Founder</p>
              <p className="text-xs text-dark-text-secondary truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-dark-surface border-b border-gray-700 px-xl py-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-dark-text capitalize">
                {currentPage.replace('-', ' ')}
              </h1>
              <p className="text-dark-text-secondary mt-1">
                {currentPage === 'dashboard' && 'Monitor your AI agents and their performance'}
                {currentPage === 'agents' && 'Create and manage your AI agents'}
                {currentPage === 'data-sources' && 'Connect and manage your data sources'}
                {currentPage === 'tasks' && 'View and track agent tasks'}
                {currentPage === 'settings' && 'Configure your account and billing'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-dark-text-secondary hover:text-dark-text transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Agent</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-xl overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout