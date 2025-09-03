import React, { useState } from 'react'
import { User, CreditCard, Bell, Shield, Key, Download, Trash2 } from 'lucide-react'
import BillingSettings from '../components/BillingSettings'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'api', name: 'API Keys', icon: Key },
  ]

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="space-y-lg">
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Solo Founder"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="founder@example.com"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    defaultValue="My Startup"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Time Zone
                  </label>
                  <select className="input-field">
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC+0 (GMT)</option>
                  </select>
                </div>
              </div>
              <button className="btn-primary mt-lg">
                Save Changes
              </button>
            </div>
          </div>
        )
      
      case 'billing':
        return <BillingSettings />
      
      case 'notifications':
        return (
          <div className="space-y-lg">
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-lg">
                  <div>
                    <h4 className="text-dark-text font-medium">Task Completion</h4>
                    <p className="text-dark-text-secondary text-sm">Get notified when agents complete tasks</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-lg">
                  <div>
                    <h4 className="text-dark-text font-medium">Task Failures</h4>
                    <p className="text-dark-text-secondary text-sm">Get notified when agents fail to complete tasks</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-lg">
                  <div>
                    <h4 className="text-dark-text font-medium">Weekly Reports</h4>
                    <p className="text-dark-text-secondary text-sm">Receive weekly performance summaries</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'security':
        return (
          <div className="space-y-lg">
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-4">Security Settings</h3>
              <div className="space-y-lg">
                <div className="card">
                  <h4 className="text-dark-text font-medium mb-4">Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                    <button className="btn-primary">
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="text-dark-text font-medium mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-dark-text">Secure your account with 2FA</p>
                      <p className="text-dark-text-secondary text-sm">Currently disabled</p>
                    </div>
                    <button className="btn-secondary">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'api':
        return (
          <div className="space-y-lg">
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-4">API Keys</h3>
              <p className="text-dark-text-secondary mb-lg">
                Manage your API keys for integrating with external services.
              </p>
              
              <div className="space-y-4">
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-dark-text font-medium">OpenAI API Key</h4>
                      <p className="text-dark-text-secondary text-sm">Used for powering your AI agents</p>
                    </div>
                    <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full">
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="password"
                      value="sk-••••••••••••••••••••••••••••••••••••"
                      readOnly
                      className="input-field flex-1"
                    />
                    <button className="btn-secondary">
                      Update
                    </button>
                  </div>
                </div>
                
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-dark-text font-medium">Webhook URL</h4>
                      <p className="text-dark-text-secondary text-sm">Receive task completion notifications</p>
                    </div>
                    <span className="text-xs bg-gray-400/20 text-gray-400 px-2 py-1 rounded-full">
                      Optional
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="url"
                      placeholder="https://your-app.com/webhooks/taskweaver"
                      className="input-field flex-1"
                    />
                    <button className="btn-secondary">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="space-y-xl animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-dark-text">Settings</h2>
        <p className="text-dark-text-secondary mt-1">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-xl">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-dark-text-secondary hover:text-dark-text hover:bg-dark-card'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default Settings