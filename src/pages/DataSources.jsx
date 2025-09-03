import React, { useState } from 'react'
import { Database, Plus, Upload, Globe, FileText, Table, Link, Trash2, Eye } from 'lucide-react'
import DataSourceConfigForm from '../components/DataSourceConfigForm'

const DataSources = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [dataSources, setDataSources] = useState([
    {
      id: 1,
      name: 'Blog Guidelines',
      type: 'document',
      description: 'Company blog writing guidelines and style guide',
      status: 'connected',
      lastSync: '2 hours ago',
      size: '2.3 MB',
      agents: ['Content Writer'],
    },
    {
      id: 2,
      name: 'Sales Data',
      type: 'csv',
      description: 'Q4 sales performance data and customer analytics',
      status: 'connected',
      lastSync: '30 minutes ago',
      size: '5.7 MB',
      agents: ['Data Analyzer'],
    },
    {
      id: 3,
      name: 'Customer Feedback API',
      type: 'api',
      description: 'Live customer feedback from support system',
      status: 'syncing',
      lastSync: 'Syncing...',
      size: 'Live',
      agents: ['Data Analyzer', 'Email Responder'],
    },
    {
      id: 4,
      name: 'FAQ Database',
      type: 'text',
      description: 'Frequently asked questions and standard responses',
      status: 'connected',
      lastSync: '1 day ago',
      size: '1.2 MB',
      agents: ['Email Responder'],
    },
  ])

  const getTypeIcon = (type) => {
    switch(type) {
      case 'document': return FileText
      case 'csv': return Table
      case 'api': return Link
      case 'text': return FileText
      default: return Database
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'connected': return 'text-green-400'
      case 'syncing': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const handleCreateDataSource = (dataSourceData) => {
    const newDataSource = {
      id: dataSources.length + 1,
      ...dataSourceData,
      status: 'connected',
      lastSync: 'Just now',
      agents: [],
    }
    setDataSources([...dataSources, newDataSource])
    setShowCreateForm(false)
  }

  const handleDeleteDataSource = (id) => {
    setDataSources(dataSources.filter(ds => ds.id !== id))
  }

  return (
    <div className="space-y-xl animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-dark-text">Data Sources</h2>
          <p className="text-dark-text-secondary mt-1">
            {dataSources.filter(ds => ds.status === 'connected').length} of {dataSources.length} sources connected
          </p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Data Source</span>
        </button>
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {dataSources.map((dataSource) => {
          const TypeIcon = getTypeIcon(dataSource.type)
          return (
            <div key={dataSource.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <TypeIcon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text">{dataSource.name}</h3>
                    <span className={`text-xs ${getStatusColor(dataSource.status)} capitalize`}>
                      {dataSource.status}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteDataSource(dataSource.id)}
                  className="text-dark-text-secondary hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-dark-text-secondary text-sm mb-4 line-clamp-2">
                {dataSource.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-dark-text-secondary">Type:</span>
                  <span className="text-dark-text capitalize">{dataSource.type}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-dark-text-secondary">Size:</span>
                  <span className="text-dark-text">{dataSource.size}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-dark-text-secondary">Last Sync:</span>
                  <span className="text-dark-text">{dataSource.lastSync}</span>
                </div>
              </div>

              {dataSource.agents.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-dark-text-secondary mb-2">Used by agents:</p>
                  <div className="flex flex-wrap gap-1">
                    {dataSource.agents.map((agent, index) => (
                      <span key={index} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                <button className="flex items-center space-x-1 text-accent text-xs hover:underline">
                  <Eye className="w-3 h-3" />
                  <span>View Details</span>
                </button>
                <button className="text-xs text-dark-text-secondary hover:text-dark-text">
                  Configure
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Create Data Source Form */}
      {showCreateForm && (
        <DataSourceConfigForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateDataSource}
        />
      )}
    </div>
  )
}

export default DataSources