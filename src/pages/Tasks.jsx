import React, { useState } from 'react'
import { CheckSquare, Plus, Play, Pause, RefreshCw, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import TaskInputForm from '../components/TaskInputForm'

const Tasks = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      agentId: 1,
      agentName: 'Content Writer',
      description: 'Generate blog post about AI trends in 2024',
      status: 'completed',
      inputData: 'Write a comprehensive blog post about AI trends in 2024, focusing on practical applications for businesses.',
      outputData: 'Generated a 2,500-word blog post covering machine learning automation, AI ethics, and business integration strategies...',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:15:00Z',
      duration: '15m 23s',
      feedback: null,
    },
    {
      id: 2,
      agentId: 2,
      agentName: 'Data Analyzer',
      description: 'Analyze Q4 sales performance data',
      status: 'running',
      inputData: 'Process the uploaded Q4 sales CSV file and provide insights on performance trends.',
      outputData: null,
      createdAt: '2024-01-15T11:30:00Z',
      updatedAt: '2024-01-15T11:30:00Z',
      duration: '5m 12s',
      feedback: null,
    },
    {
      id: 3,
      agentId: 3,
      agentName: 'Research Assistant',
      description: 'Gather competitor pricing information',
      status: 'failed',
      inputData: 'Research pricing strategies of top 5 competitors in the SaaS space.',
      outputData: null,
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:05:00Z',
      duration: '5m 0s',
      feedback: null,
      error: 'Unable to access competitor websites. Rate limiting detected.',
    },
    {
      id: 4,
      agentId: 4,
      agentName: 'Email Responder',
      description: 'Draft response to customer inquiry about billing',
      status: 'pending',
      inputData: 'Customer is asking about upgrading their subscription plan and wants to know about pricing.',
      outputData: null,
      createdAt: '2024-01-15T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z',
      duration: null,
      feedback: null,
    },
  ])

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return CheckCircle
      case 'running': return RefreshCw
      case 'failed': return AlertCircle
      case 'pending': return Clock
      default: return Clock
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-400'
      case 'running': return 'text-blue-400'
      case 'failed': return 'text-red-400'
      case 'pending': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusBg = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-400/20'
      case 'running': return 'bg-blue-400/20'
      case 'failed': return 'bg-red-400/20'
      case 'pending': return 'bg-yellow-400/20'
      default: return 'bg-gray-400/20'
    }
  }

  const handleCreateTask = (taskData) => {
    const newTask = {
      id: tasks.length + 1,
      ...taskData,
      status: 'pending',
      outputData: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      duration: null,
      feedback: null,
    }
    setTasks([newTask, ...tasks])
    setShowCreateForm(false)
    
    // Simulate task execution
    setTimeout(() => {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === newTask.id 
            ? { ...task, status: 'running', updatedAt: new Date().toISOString() }
            : task
        )
      )
      
      // Complete after another delay
      setTimeout(() => {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === newTask.id 
              ? { 
                  ...task, 
                  status: 'completed', 
                  outputData: 'Task completed successfully. Generated output based on provided input.',
                  updatedAt: new Date().toISOString(),
                  duration: '2m 34s'
                }
              : task
          )
        )
      }, 3000)
    }, 1000)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const getTaskStats = () => {
    const completed = tasks.filter(t => t.status === 'completed').length
    const running = tasks.filter(t => t.status === 'running').length
    const failed = tasks.filter(t => t.status === 'failed').length
    const pending = tasks.filter(t => t.status === 'pending').length
    
    return { completed, running, failed, pending, total: tasks.length }
  }

  const stats = getTaskStats()

  return (
    <div className="space-y-xl animate-fade-in">
      {/* Header & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-dark-text">Tasks</h2>
          <div className="flex items-center space-x-4 mt-2 text-sm">
            <span className="text-green-400">{stats.completed} completed</span>
            <span className="text-blue-400">{stats.running} running</span>
            <span className="text-yellow-400">{stats.pending} pending</span>
            <span className="text-red-400">{stats.failed} failed</span>
          </div>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Task</span>
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const StatusIcon = getStatusIcon(task.status)
          return (
            <div key={task.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getStatusBg(task.status)}`}>
                    <StatusIcon className={`w-5 h-5 ${getStatusColor(task.status)} ${task.status === 'running' ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-dark-text">{task.description}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBg(task.status)} ${getStatusColor(task.status)} capitalize`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-dark-text-secondary text-sm mb-2">
                      Agent: <span className="text-accent">{task.agentName}</span>
                    </p>
                    <p className="text-dark-text-secondary text-sm">
                      {task.inputData}
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs text-dark-text-secondary">
                  <p>Created: {formatDate(task.createdAt)}</p>
                  {task.duration && <p>Duration: {task.duration}</p>}
                </div>
              </div>

              {task.outputData && (
                <div className="mt-4 p-4 bg-dark-surface rounded-lg">
                  <h4 className="text-dark-text font-medium mb-2">Output:</h4>
                  <p className="text-dark-text-secondary text-sm">{task.outputData}</p>
                </div>
              )}

              {task.error && (
                <div className="mt-4 p-4 bg-red-400/10 border border-red-400/20 rounded-lg">
                  <h4 className="text-red-400 font-medium mb-2">Error:</h4>
                  <p className="text-red-400 text-sm">{task.error}</p>
                </div>
              )}

              {task.status === 'completed' && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600">
                  <div className="flex items-center space-x-4">
                    <button className="text-accent text-sm hover:underline">
                      View Full Output
                    </button>
                    <button className="text-accent text-sm hover:underline">
                      Copy Result
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-green-400 text-sm hover:underline">
                      👍 Good
                    </button>
                    <button className="text-red-400 text-sm hover:underline">
                      👎 Needs Improvement
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Create Task Form */}
      {showCreateForm && (
        <TaskInputForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </div>
  )
}

export default Tasks