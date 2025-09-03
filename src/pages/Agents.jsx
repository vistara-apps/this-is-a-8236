import React, { useState } from 'react'
import { Bot, Plus, Settings, Play, Pause, MoreVertical, Edit, Trash2, Copy } from 'lucide-react'
import AgentCard from '../components/AgentCard'
import CreateAgentModal from '../components/CreateAgentModal'

const Agents = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Content Writer',
      description: 'Creates engaging blog posts and marketing copy based on provided data and guidelines.',
      status: 'active',
      tasksCompleted: 47,
      successRate: 94,
      lastActive: '2 hours ago',
      model: 'GPT-4',
      dataSources: ['Blog Guidelines', 'Brand Voice Doc'],
    },
    {
      id: 2,
      name: 'Data Analyzer',
      description: 'Processes and analyzes CSV files, generates insights and reports.',
      status: 'active',
      tasksCompleted: 23,
      successRate: 98,
      lastActive: '30 minutes ago',
      model: 'GPT-4',
      dataSources: ['Sales Data', 'Customer Feedback'],
    },
    {
      id: 3,
      name: 'Research Assistant',
      description: 'Conducts market research and competitive analysis using web sources.',
      status: 'paused',
      tasksCompleted: 15,
      successRate: 87,
      lastActive: '1 day ago',
      model: 'GPT-3.5',
      dataSources: ['Industry Reports'],
    },
    {
      id: 4,
      name: 'Email Responder',
      description: 'Drafts professional email responses based on context and company policies.',
      status: 'active',
      tasksCompleted: 89,
      successRate: 96,
      lastActive: '5 minutes ago',
      model: 'GPT-4',
      dataSources: ['Email Templates', 'FAQ Database'],
    },
  ])

  const handleCreateAgent = (agentData) => {
    const newAgent = {
      id: agents.length + 1,
      ...agentData,
      tasksCompleted: 0,
      successRate: 100,
      lastActive: 'Just created',
      status: 'active',
    }
    setAgents([...agents, newAgent])
    setShowCreateModal(false)
  }

  const handleToggleAgent = (id) => {
    setAgents(agents.map(agent => 
      agent.id === id 
        ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
        : agent
    ))
  }

  const handleDeleteAgent = (id) => {
    setAgents(agents.filter(agent => agent.id !== id))
  }

  return (
    <div className="space-y-xl animate-fade-in">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-dark-text">My AI Agents</h2>
          <p className="text-dark-text-secondary mt-1">
            {agents.filter(a => a.status === 'active').length} of {agents.length} agents active
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Agent</span>
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {agents.map((agent) => (
          <AgentCard 
            key={agent.id} 
            agent={agent}
            onToggle={() => handleToggleAgent(agent.id)}
            onDelete={() => handleDeleteAgent(agent.id)}
          />
        ))}
      </div>

      {/* Create Agent Modal */}
      {showCreateModal && (
        <CreateAgentModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateAgent}
        />
      )}
    </div>
  )
}

export default Agents