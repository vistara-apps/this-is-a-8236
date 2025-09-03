import React, { useState } from 'react'
import { X, Upload, Link, FileText, Database, Globe } from 'lucide-react'

const DataSourceConfigForm = ({ onClose, onSubmit }) => {
  const [selectedType, setSelectedType] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    config: {},
  })

  const dataSourceTypes = [
    {
      id: 'fileUpload',
      name: 'File Upload',
      description: 'Upload documents, PDFs, CSV files',
      icon: Upload,
      color: 'text-blue-400',
    },
    {
      id: 'apiInput',
      name: 'API Connection',
      description: 'Connect to REST APIs or webhooks',
      icon: Link,
      color: 'text-green-400',
    },
    {
      id: 'textInput',
      name: 'Text Input',
      description: 'Paste or type text content directly',
      icon: FileText,
      color: 'text-purple-400',
    },
    {
      id: 'url',
      name: 'Web URL',
      description: 'Scrape content from web pages',
      icon: Globe,
      color: 'text-cyan-400',
    },
  ]

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setFormData(prev => ({ ...prev, type }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleConfigChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      config: { ...prev.config, [field]: value }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const renderConfigForm = () => {
    switch(selectedType) {
      case 'fileUpload':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p className="text-dark-text mb-2">Drop files here or click to upload</p>
              <p className="text-dark-text-secondary text-sm">Supports PDF, DOCX, TXT, CSV files up to 10MB</p>
              <input
                type="file"
                multiple
                className="hidden"
                accept=".pdf,.docx,.txt,.csv"
                onChange={(e) => handleConfigChange('files', e.target.files)}
              />
              <button
                type="button"
                className="mt-4 btn-secondary"
                onClick={() => document.querySelector('input[type="file"]').click()}
              >
                Choose Files
              </button>
            </div>
          </div>
        )
      
      case 'apiInput':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                API Endpoint URL
              </label>
              <input
                type="url"
                placeholder="https://api.example.com/data"
                className="input-field"
                onChange={(e) => handleConfigChange('url', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Authentication Method
              </label>
              <select 
                className="input-field"
                onChange={(e) => handleConfigChange('authMethod', e.target.value)}
              >
                <option value="">Select authentication</option>
                <option value="none">No Authentication</option>
                <option value="apikey">API Key</option>
                <option value="bearer">Bearer Token</option>
                <option value="basic">Basic Auth</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                API Key / Token
              </label>
              <input
                type="password"
                placeholder="Enter your API key or token"
                className="input-field"
                onChange={(e) => handleConfigChange('credentials', e.target.value)}
              />
            </div>
          </div>
        )
      
      case 'textInput':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Text Content
              </label>
              <textarea
                rows={10}
                placeholder="Paste or type your content here..."
                className="input-field resize-none"
                onChange={(e) => handleConfigChange('content', e.target.value)}
              />
            </div>
          </div>
        )
      
      case 'url':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Website URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                className="input-field"
                onChange={(e) => handleConfigChange('url', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Scraping Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => handleConfigChange('includeImages', e.target.checked)}
                  />
                  <span className="text-dark-text text-sm">Include images</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => handleConfigChange('includeLinks', e.target.checked)}
                  />
                  <span className="text-dark-text text-sm">Include links</span>
                </label>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-surface rounded-xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-xl border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-dark-text">Add Data Source</h2>
              <p className="text-dark-text-secondary text-sm">Connect your data to train your agents</p>
            </div>
          </div>
          <button onClick={onClose} className="text-dark-text-secondary hover:text-dark-text">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-xl space-y-lg overflow-y-auto max-h-[70vh]">
          {!selectedType ? (
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-4">Choose Data Source Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataSourceTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleTypeSelect(type.id)}
                      className="p-6 border border-gray-600 rounded-lg hover:border-accent transition-colors text-left"
                    >
                      <Icon className={`w-8 h-8 ${type.color} mb-3`} />
                      <h4 className="font-semibold text-dark-text mb-2">{type.name}</h4>
                      <p className="text-dark-text-secondary text-sm">{type.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-lg">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedType('')}
                  className="text-accent hover:underline text-sm"
                >
                  ← Back to types
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Data Source Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Company Knowledge Base"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what this data source contains..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

              {renderConfigForm()}
            </div>
          )}
        </form>

        {selectedType && (
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
              disabled={!formData.name}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Data Source
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DataSourceConfigForm