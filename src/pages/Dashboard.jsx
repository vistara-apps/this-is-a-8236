import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Bot, Database, CheckSquare, TrendingUp, Activity, Clock, Zap } from 'lucide-react'

const Dashboard = () => {
  // Mock data for charts
  const taskData = [
    { name: 'Mon', completed: 12, failed: 2 },
    { name: 'Tue', completed: 19, failed: 1 },
    { name: 'Wed', completed: 8, failed: 3 },
    { name: 'Thu', completed: 15, failed: 1 },
    { name: 'Fri', completed: 22, failed: 0 },
    { name: 'Sat', completed: 18, failed: 2 },
    { name: 'Sun', completed: 14, failed: 1 },
  ]

  const agentPerformanceData = [
    { name: 'Content Writer', value: 85, color: '#3B82F6' },
    { name: 'Data Analyzer', value: 92, color: '#10B981' },
    { name: 'Research Assistant', value: 78, color: '#F59E0B' },
    { name: 'Email Responder', value: 95, color: '#8B5CF6' },
  ]

  const stats = [
    {
      title: 'Active Agents',
      value: '4',
      change: '+2 this month',
      icon: Bot,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Data Sources',
      value: '7',
      change: '+3 this week',
      icon: Database,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Tasks Completed',
      value: '108',
      change: '+12% vs last week',
      icon: CheckSquare,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      title: 'Success Rate',
      value: '94%',
      change: '+2% improvement',
      icon: TrendingUp,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
    },
  ]

  const recentTasks = [
    {
      id: 1,
      agent: 'Content Writer',
      task: 'Generate blog post about AI trends',
      status: 'completed',
      duration: '2m 15s',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      agent: 'Data Analyzer',
      task: 'Process customer feedback CSV',
      status: 'completed',
      duration: '45s',
      timestamp: '3 hours ago',
    },
    {
      id: 3,
      agent: 'Research Assistant',
      task: 'Gather competitor information',
      status: 'running',
      duration: '1m 30s',
      timestamp: '5 minutes ago',
    },
    {
      id: 4,
      agent: 'Email Responder',
      task: 'Draft response to customer inquiry',
      status: 'completed',
      duration: '30s',
      timestamp: '1 hour ago',
    },
  ]

  return (
    <div className="space-y-xl animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-text-secondary text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-dark-text mt-1">{stat.value}</p>
                  <p className="text-xs text-green-400 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {/* Task Completion Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-lg">
            <h3 className="text-lg font-semibold text-dark-text">Task Performance</h3>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-dark-text-secondary">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-dark-text-secondary">Failed</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Bar dataKey="completed" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="failed" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Agent Performance Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-dark-text mb-lg">Agent Performance</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={agentPerformanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {agentPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {agentPerformanceData.map((agent, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: agent.color }}
                ></div>
                <span className="text-xs text-dark-text-secondary truncate">{agent.name}</span>
                <span className="text-xs text-dark-text font-medium">{agent.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card">
        <div className="flex items-center justify-between mb-lg">
          <h3 className="text-lg font-semibold text-dark-text">Recent Tasks</h3>
          <button className="text-accent text-sm font-medium hover:underline">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-dark-surface rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
                  task.status === 'completed' ? 'bg-green-400' : 
                  task.status === 'running' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
                <div>
                  <p className="text-dark-text font-medium">{task.task}</p>
                  <p className="text-dark-text-secondary text-sm">{task.agent}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-dark-text-secondary text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{task.duration}</span>
                </div>
                <p className="text-dark-text-secondary text-xs mt-1">{task.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard