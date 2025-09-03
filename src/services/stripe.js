import { loadStripe } from '@stripe/stripe-js'
import { stripeConfig } from '../config/env'

// Initialize Stripe
let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripeConfig.publishableKey)
  }
  return stripePromise
}

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  BASIC: {
    id: 'basic',
    name: 'Basic',
    price: 15,
    priceId: 'price_basic_monthly', // Replace with actual Stripe price ID
    interval: 'month',
    features: [
      '1 AI Agent',
      '1 Data Source',
      '100 Tasks per month',
      'Email Support',
      'Basic Analytics'
    ],
    limits: {
      agents: 1,
      data_sources: 1,
      tasks_per_month: 100
    }
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 45,
    priceId: 'price_pro_monthly', // Replace with actual Stripe price ID
    interval: 'month',
    features: [
      '5 AI Agents',
      '5 Data Sources',
      '1,000 Tasks per month',
      'Priority Support',
      'Advanced Analytics',
      'Custom Prompts',
      'API Access'
    ],
    limits: {
      agents: 5,
      data_sources: 5,
      tasks_per_month: 1000
    },
    popular: true
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 99,
    priceId: 'price_premium_monthly', // Replace with actual Stripe price ID
    interval: 'month',
    features: [
      'Unlimited AI Agents',
      'Unlimited Data Sources',
      'Unlimited Tasks',
      '24/7 Priority Support',
      'Advanced Analytics',
      'Custom Integrations',
      'White-label Options',
      'Dedicated Account Manager'
    ],
    limits: {
      agents: -1, // unlimited
      data_sources: -1, // unlimited
      tasks_per_month: -1 // unlimited
    }
  }
}

// Stripe service class
class StripeService {
  constructor() {
    this.stripe = null
    this.initialized = false
  }

  // Initialize Stripe
  async initialize() {
    if (!this.initialized) {
      this.stripe = await getStripe()
      this.initialized = true
    }
    return this.stripe
  }

  // Create checkout session
  async createCheckoutSession(priceId, customerId = null, successUrl = null, cancelUrl = null) {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          customerId,
          successUrl: successUrl || `${window.location.origin}/dashboard?success=true`,
          cancelUrl: cancelUrl || `${window.location.origin}/settings/billing?canceled=true`
        })
      })

      const session = await response.json()

      if (!response.ok) {
        throw new Error(session.error || 'Failed to create checkout session')
      }

      return {
        success: true,
        data: session,
        error: null
      }
    } catch (error) {
      console.error('Create checkout session error:', error)
      return {
        success: false,
        data: null,
        error: {
          code: 'CHECKOUT_ERROR',
          message: error.message || 'Failed to create checkout session'
        }
      }
    }
  }

  // Redirect to checkout
  async redirectToCheckout(sessionId) {
    try {
      await this.initialize()
      
      const { error } = await this.stripe.redirectToCheckout({
        sessionId
      })

      if (error) {
        throw error
      }

      return {
        success: true,
        error: null
      }
    } catch (error) {
      console.error('Redirect to checkout error:', error)
      return {
        success: false,
        error: {
          code: 'REDIRECT_ERROR',
          message: error.message || 'Failed to redirect to checkout'
        }
      }
    }
  }

  // Subscribe to plan
  async subscribeToPlan(planId, customerId = null) {
    try {
      const plan = SUBSCRIPTION_PLANS[planId.toUpperCase()]
      if (!plan) {
        throw new Error('Invalid plan selected')
      }

      // Create checkout session
      const sessionResult = await this.createCheckoutSession(plan.priceId, customerId)
      
      if (!sessionResult.success) {
        throw new Error(sessionResult.error.message)
      }

      // Redirect to checkout
      const redirectResult = await this.redirectToCheckout(sessionResult.data.id)
      
      if (!redirectResult.success) {
        throw new Error(redirectResult.error.message)
      }

      return {
        success: true,
        error: null
      }
    } catch (error) {
      console.error('Subscribe to plan error:', error)
      return {
        success: false,
        error: {
          code: 'SUBSCRIPTION_ERROR',
          message: error.message || 'Failed to subscribe to plan'
        }
      }
    }
  }

  // Create customer portal session
  async createPortalSession(customerId, returnUrl = null) {
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          returnUrl: returnUrl || `${window.location.origin}/settings/billing`
        })
      })

      const session = await response.json()

      if (!response.ok) {
        throw new Error(session.error || 'Failed to create portal session')
      }

      return {
        success: true,
        data: session,
        error: null
      }
    } catch (error) {
      console.error('Create portal session error:', error)
      return {
        success: false,
        data: null,
        error: {
          code: 'PORTAL_ERROR',
          message: error.message || 'Failed to create portal session'
        }
      }
    }
  }

  // Redirect to customer portal
  async redirectToPortal(customerId) {
    try {
      const sessionResult = await this.createPortalSession(customerId)
      
      if (!sessionResult.success) {
        throw new Error(sessionResult.error.message)
      }

      // Redirect to portal
      window.location.href = sessionResult.data.url

      return {
        success: true,
        error: null
      }
    } catch (error) {
      console.error('Redirect to portal error:', error)
      return {
        success: false,
        error: {
          code: 'PORTAL_REDIRECT_ERROR',
          message: error.message || 'Failed to redirect to customer portal'
        }
      }
    }
  }

  // Get subscription plans
  getSubscriptionPlans() {
    return Object.values(SUBSCRIPTION_PLANS)
  }

  // Get plan by ID
  getPlan(planId) {
    return SUBSCRIPTION_PLANS[planId.toUpperCase()] || null
  }

  // Get plan by price ID
  getPlanByPriceId(priceId) {
    return Object.values(SUBSCRIPTION_PLANS).find(plan => plan.priceId === priceId) || null
  }

  // Format price for display
  formatPrice(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Calculate usage cost
  calculateUsageCost(usage, plan) {
    // For now, all plans are flat rate
    // In the future, you could implement usage-based billing here
    return 0
  }

  // Check if plan has feature
  planHasFeature(planId, feature) {
    const plan = this.getPlan(planId)
    return plan ? plan.features.includes(feature) : false
  }

  // Get plan limits
  getPlanLimits(planId) {
    const plan = this.getPlan(planId)
    return plan ? plan.limits : null
  }

  // Check if usage is within limits
  isWithinLimits(planId, resourceType, currentUsage) {
    const limits = this.getPlanLimits(planId)
    if (!limits) return false

    const limit = limits[resourceType]
    if (limit === -1) return true // unlimited

    return currentUsage < limit
  }
}

// Export singleton instance
export const stripeService = new StripeService()
export default stripeService
