import React, { useState } from 'react'
import { X, CheckSquare, Bot, FileText, Code, Zap } from 'lucide-react'

const TaskInputForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    agentId: '',
    agentName: '',
    description: '',
    inputData: '',
    taskType: 'textPrompt',
  })

  const agents = [
    { id: 1, name: 'Content Writer', description: 'Creates engaging content' },
    { id: 2, name: 'Data Analyzer', description: 'Processes and analyzes data' },
    { id: 3, name: 'Research Assistant', description: 'Conducts research tasks' },
    { id: 4, name: 'Email Responder', description: 'Drafts email responses' },
  ]

  const taskTypes = [
    {
      id: 'textPrompt',
      name: 'Text Prompt',
      description: 'Simple text-based instruction',
      icon: FileText,
    },
    {
      id: 'structured',
      name: 'Structured Task',
      description: 'Task with specific parameters',
      icon: Code,
    },
  ]

  const quickPrompts = [
    'Summarize the main points from the provided document',
    'Generate a professional email response',
    'Analyze the uploaded data and provide insights',
    'Create a list of action items from the meeting notes',
    'Research and compare competitor features',
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      ...(field === 'agentId' && { agentName: agents.find(a => a.id === parseInt(value))?.name || '' })
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleQuickPrompt = (prompt) => {
    setFormData(prev => ({ ...prev, inputData: prompt }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-surface rounded-xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-xl border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-dark-text">Create New Task</h2>
              <p className="text-dark-text-secondary text-sm">Assign a task to one of your agents</p>
            </div>
          </div>
          <button onClick={onClose} className="text-dark-text-secondary hover:text-dark-text">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-xl space-y-lg overflow-y-auto max-h-[70vh]">
          {/* Agent Selection */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-3">
              Select Agent *
            </label>
            <div className="grid grid-cols-1 gap-3">
              {agents.map((agent) => (
                <label key={agent.id} className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-accent transition-colors">
                  <input
                    type="radio"
                    name="agent"
                    value={agent.id}
                    checked={formData.agentId === agent.id.toString()}
                    onChange={(e) => handleInputChange('agentId', e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="ml-3 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-dark-text font-medium">{agent.name}</p>
                      <p className="text-dark-text-secondary text-sm">{agent.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Task Type */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-3">
              Task Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {taskTypes.map((type) => {
                const Icon = type.icon
                return (
                  <label key={type.id} className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-accent transition-colors">
                    <input
                      type="radio"
                      name="taskType"
                      value={type.id}
                      checked={formData.taskType === type.id}
                      onChange={(e) => handleInputChange('taskType', e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <div className="ml-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon className="w-4 h-4 text-accent" />
                        <p className="text-dark-text font-medium">{type.name}</p>
                      </div>
                      <p className="text-dark-text-secondary text-sm">{type.description}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Task Description *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the task"
              className="input-field"
              required
            />
          </div>

          {/* Task Input */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Task Instructions *
            </label>
            <textarea
              value={formData.inputData}
              onChange={(e) => handleInputChange('inputData', e.target.value)}
              placeholder="Provide detailed instructions for the agent..."
              rows={6}
              className="input-field resize-none"
              required
            />
          </div>

          {/* Quick Prompts */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-3">
              Quick Prompts
            </label>
            <div className="grid grid-cols-1 gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-left p-3 bg-dark-card rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-dark-text text-sm">{prompt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {formData.taskType === 'structured' && (
            <div className="bg-dark-card p-4 rounded-lg">
              <h4 className="text-dark-text font-medium mb-3">Additional Parameters</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-dark-text-secondary mb-1">
                    Output Length
                  </label>
                  <select className="w-full bg-dark-surface border border-gray-600 rounded px-3 py-2 text-dark-text text-sm">
                    <option>Short (< 100 words)</option>
                    <option>Medium (100-500 words)</option>
                    <option>Long (> 500 words)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-dark-text-secondary mb-1">
                    Priority
                  </label>
                  <select className="w-full bg-dark-surface border border-gray-600 rounded px-3 py-2 text-dark-text text-sm">
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-xl border-t border-gray-600">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-dark-text-secondary hover:text-dark-text"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.agentId || !formData.description || !formData.inputData}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskInputForm