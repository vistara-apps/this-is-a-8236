import React, { useState } from 'react'
import { Bot, Play, Pause, MoreVertical, Edit, Trash2, Copy, Settings } from 'lucide-react'

const AgentCard = ({ agent, onToggle, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false)

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-400'
      case 'paused': return 'bg-yellow-400'
      case 'error': return 'bg-red-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Active'
      case 'paused': return 'Paused'
      case 'error': return 'Error'
      default: return 'Unknown'
    }
  }

  return (
    <div className="card hover:shadow-lg transition-shadow relative">
      {/* Status Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-dark-text">{agent.name}</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`}></div>
              <span className="text-xs text-dark-text-secondary">{getStatusText(agent.status)}</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-dark-text-secondary hover:text-dark-text transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-dark-surface border border-gray-600 rounded-lg shadow-modal z-10 min-w-[120px]">
              <button className="w-full px-3 py-2 text-left text-dark-text hover:bg-dark-card flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button className="w-full px-3 py-2 text-left text-dark-text hover:bg-dark-card flex items-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Duplicate</span>
              </button>
              <button className="w-full px-3 py-2 text-left text-dark-text hover:bg-dark-card flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <hr className="border-gray-600" />
              <button 
                onClick={onDelete}
                className="w-full px-3 py-2 text-left text-red-400 hover:bg-dark-card flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-dark-text-secondary text-sm mb-4 line-clamp-2">
        {agent.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-dark-text-secondary">Tasks Completed</p>
          <p className="text-lg font-semibold text-dark-text">{agent.tasksCompleted}</p>
        </div>
        <div>
          <p className="text-xs text-dark-text-secondary">Success Rate</p>
          <p className="text-lg font-semibold text-dark-text">{agent.successRate}%</p>
        </div>
      </div>

      {/* Model & Data Sources */}
      <div className="mb-4">
        <p className="text-xs text-dark-text-secondary mb-2">Model: {agent.model}</p>
        <div className="flex flex-wrap gap-1">
          {agent.dataSources.slice(0, 2).map((source, index) => (
            <span key={index} className="text-xs bg-dark-surface px-2 py-1 rounded text-dark-text-secondary">
              {source}
            </span>
          ))}
          {agent.dataSources.length > 2 && (
            <span className="text-xs bg-dark-surface px-2 py-1 rounded text-dark-text-secondary">
              +{agent.dataSources.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-600">
        <span className="text-xs text-dark-text-secondary">
          Last active: {agent.lastActive}
        </span>
        <button 
          onClick={onToggle}
          className={`flex items-center space-x-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
            agent.status === 'active' 
              ? 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30' 
              : 'bg-green-400/20 text-green-400 hover:bg-green-400/30'
          }`}
        >
          {agent.status === 'active' ? (
            <>
              <Pause className="w-3 h-3" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3" />
              <span>Start</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default AgentCard