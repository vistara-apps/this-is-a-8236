import React, { useState } from 'react'
import { Check, CreditCard, Download, Calendar } from 'lucide-react'

const BillingSettings = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro')

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$15',
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        '1 AI Agent',
        '1 Data Source',
        '100 Tasks/month',
        'Email Support',
        'Basic Analytics',
      ],
      current: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$45',
      period: 'month',
      description: 'Most popular for growing businesses',
      features: [
        '5 AI Agents',
        '5 Data Sources',
        '1,000 Tasks/month',
        'Priority Support',
        'Advanced Analytics',
        'Custom Integrations',
      ],
      current: true,
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$99',
      period: 'month',
      description: 'For power users and teams',
      features: [
        'Unlimited AI Agents',
        'Unlimited Data Sources',
        'Unlimited Tasks',
        '24/7 Support',
        'Advanced Analytics',
        'Custom Integrations',
        'White-label Options',
      ],
      current: false,
    },
  ]

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: '$45.00',
      status: 'paid',
      invoice: 'INV-2024-001',
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: '$45.00',
      status: 'paid',
      invoice: 'INV-2023-012',
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: '$45.00',
      status: 'paid',
      invoice: 'INV-2023-011',
    },
  ]

  return (
    <div className="space-y-xl">
      {/* Current Subscription */}
      <div>
        <h3 className="text-lg font-semibold text-dark-text mb-4">Current Subscription</h3>
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-dark-text font-medium text-lg">Pro Plan</h4>
              <p className="text-dark-text-secondary">$45/month • Next billing: January 15, 2024</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-secondary">
                Manage
              </button>
              <button className="text-red-400 text-sm hover:underline">
                Cancel
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-dark-text">4/5</p>
              <p className="text-dark-text-secondary text-sm">Agents Used</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-text">7/5</p>
              <p className="text-dark-text-secondary text-sm">Data Sources</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-dark-text">387/1000</p>
              <p className="text-dark-text-secondary text-sm">Tasks This Month</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">23</p>
              <p className="text-dark-text-secondary text-sm">Days Remaining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Plans */}
      <div>
        <h3 className="text-lg font-semibold text-dark-text mb-4">Upgrade Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`card relative ${plan.popular ? 'ring-2 ring-primary' : ''} ${
                plan.current ? 'bg-primary/5 border-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h4 className="text-dark-text font-semibold text-lg">{plan.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-dark-text">{plan.price}</span>
                  <span className="text-dark-text-secondary">/{plan.period}</span>
                </div>
                <p className="text-dark-text-secondary text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-dark-text text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.current 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'btn-primary'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-semibold text-dark-text mb-4">Payment Method</h3>
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <p className="text-dark-text font-medium">•••• •••• •••• 4242</p>
                <p className="text-dark-text-secondary text-sm">Expires 12/25</p>
              </div>
            </div>
            <button className="btn-secondary">
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h3 className="text-lg font-semibold text-dark-text mb-4">Billing History</h3>
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 text-dark-text-secondary text-sm font-medium">Date</th>
                  <th className="text-left py-3 text-dark-text-secondary text-sm font-medium">Amount</th>
                  <th className="text-left py-3 text-dark-text-secondary text-sm font-medium">Status</th>
                  <th className="text-left py-3 text-dark-text-secondary text-sm font-medium">Invoice</th>
                  <th className="text-right py-3 text-dark-text-secondary text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700">
                    <td className="py-4 text-dark-text">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-dark-text">{item.amount}</td>
                    <td className="py-4">
                      <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full capitalize">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-dark-text">{item.invoice}</td>
                    <td className="py-4 text-right">
                      <button className="text-accent text-sm hover:underline flex items-center space-x-1 ml-auto">
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingSettings