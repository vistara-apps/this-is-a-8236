import React, { useState } from 'react'
import { X, Bot, Database, Settings, Upload } from 'lucide-react'

const CreateAgentModal = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    model: 'GPT-4',
    persona: '',
    dataSources: [],
    outputFormat: 'text',
  })

  const models = [
    { id: 'GPT-4', name: 'GPT-4', description: 'Most capable model for complex tasks' },
    { id: 'GPT-3.5', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for simpler tasks' },
  ]

  const outputFormats = [
    { id: 'text', name: 'Plain Text', description: 'Simple text output' },
    { id: 'markdown', name: 'Markdown', description: 'Formatted markdown output' },
    { id: 'json', name: 'JSON', description: 'Structured data output' },
    { id: 'code', name: 'Code', description: 'Code snippets and scripts' },
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const isStepValid = () => {
    switch(step) {
      case 1: return formData.name && formData.description
      case 2: return formData.model && formData.persona
      case 3: return formData.outputFormat
      default: return false
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-surface rounded-xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-xl border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-dark-text">Create New Agent</h2>
              <p className="text-dark-text-secondary text-sm">Step {step} of 3</p>
            </div>
          </div>
          <button onClick={onClose} className="text-dark-text-secondary hover:text-dark-text">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-xl pt-lg">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum <= step ? 'bg-primary text-white' : 'bg-gray-600 text-gray-400'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    stepNum < step ? 'bg-primary' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-xl overflow-y-auto max-h-[60vh]">
          {step === 1 && (
            <div className="space-y-lg animate-slide-up">
              <div>
                <h3 className="text-lg font-semibold text-dark-text mb-2">Basic Information</h3>
                <p className="text-dark-text-secondary">Let's start with the basics about your AI agent.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Agent Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Content Writer, Data Analyzer"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what this agent will do and its main purpose..."
                  rows={4}
                  className="input-field resize-none"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-lg animate-slide-up">
              <div>
                <h3 className="text-lg font-semibold text-dark-text mb-2">Agent Configuration</h3>
                <p className="text-dark-text-secondary">Configure how your agent will behave and process tasks.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-3">
                  AI Model *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {models.map((model) => (
                    <label key={model.id} className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-accent transition-colors">
                      <input
                        type="radio"
                        name="model"
                        value={model.id}
                        checked={formData.model === model.id}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <div className="ml-3">
                        <p className="text-dark-text font-medium">{model.name}</p>
                        <p className="text-dark-text-secondary text-sm">{model.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Agent Persona & Behavior *
                </label>
                <textarea
                  value={formData.persona}
                  onChange={(e) => handleInputChange('persona', e.target.value)}
                  placeholder="You are a helpful assistant that... (define the agent's personality, tone, and behavior)"
                  rows={4}
                  className="input-field resize-none"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-lg animate-slide-up">
              <div>
                <h3 className="text-lg font-semibold text-dark-text mb-2">Output Configuration</h3>
                <p className="text-dark-text-secondary">Configure how your agent will format and deliver results.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-3">
                  Output Format *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {outputFormats.map((format) => (
                    <label key={format.id} className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-accent transition-colors">
                      <input
                        type="radio"
                        name="outputFormat"
                        value={format.id}
                        checked={formData.outputFormat === format.id}
                        onChange={(e) => handleInputChange('outputFormat', e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <div className="ml-3">
                        <p className="text-dark-text font-medium">{format.name}</p>
                        <p className="text-dark-text-secondary text-sm">{format.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-dark-card p-4 rounded-lg">
                <h4 className="text-dark-text font-medium mb-2">Summary</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-dark-text-secondary">Name:</span> <span className="text-dark-text">{formData.name}</span></p>
                  <p><span className="text-dark-text-secondary">Model:</span> <span className="text-dark-text">{formData.model}</span></p>
                  <p><span className="text-dark-text-secondary">Output:</span> <span className="text-dark-text">{outputFormats.find(f => f.id === formData.outputFormat)?.name}</span></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-xl border-t border-gray-600">
          <button
            onClick={handlePrevious}
            disabled={step === 1}
            className="px-4 py-2 text-dark-text-secondary hover:text-dark-text disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-dark-text-secondary hover:text-dark-text"
            >
              Cancel
            </button>
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Agent
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAgentModal