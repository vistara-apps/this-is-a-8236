import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../lib/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initializing, setInitializing] = useState(true)

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { session, error } = await auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          return
        }

        if (session?.user && mounted) {
          setUser(session.user)
          await loadUserProfile(session.user.id)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        if (mounted) {
          setLoading(false)
          setInitializing(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      setLoading(true)

      if (session?.user) {
        setUser(session.user)
        await loadUserProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
      }

      setLoading(false)
    })

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [])

  // Load user profile from database
  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await db.users.get(userId)
      
      if (error) {
        console.error('Error loading user profile:', error)
        return
      }

      setProfile(data)
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  // Sign up
  const signUp = async (email, password, options = {}) => {
    try {
      setLoading(true)
      const { data, error } = await auth.signUp(email, password, options)

      if (error) {
        toast.error(error.message)
        return { data: null, error }
      }

      if (data.user && !data.user.email_confirmed_at) {
        toast.success('Please check your email to confirm your account')
      }

      return { data, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error('An unexpected error occurred')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign in
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await auth.signIn(email, password)

      if (error) {
        toast.error(error.message)
        return { data: null, error }
      }

      toast.success('Welcome back!')
      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error('An unexpected error occurred')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await auth.signOut()

      if (error) {
        toast.error(error.message)
        return { error }
      }

      toast.success('Signed out successfully')
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('An unexpected error occurred')
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    try {
      const { data, error } = await auth.resetPassword(email)

      if (error) {
        toast.error(error.message)
        return { data: null, error }
      }

      toast.success('Password reset email sent')
      return { data, error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      toast.error('An unexpected error occurred')
      return { data: null, error }
    }
  }

  // Update password
  const updatePassword = async (password) => {
    try {
      const { data, error } = await auth.updatePassword(password)

      if (error) {
        toast.error(error.message)
        return { data: null, error }
      }

      toast.success('Password updated successfully')
      return { data, error: null }
    } catch (error) {
      console.error('Update password error:', error)
      toast.error('An unexpected error occurred')
      return { data: null, error }
    }
  }

  // Update profile
  const updateProfile = async (updates) => {
    try {
      if (!user) {
        throw new Error('No user logged in')
      }

      const { data, error } = await db.users.update(user.id, updates)

      if (error) {
        toast.error(error.message)
        return { data: null, error }
      }

      setProfile(data)
      toast.success('Profile updated successfully')
      return { data, error: null }
    } catch (error) {
      console.error('Update profile error:', error)
      toast.error('An unexpected error occurred')
      return { data: null, error }
    }
  }

  // Check if user is authenticated
  const isAuthenticated = !!user

  // Check if user has completed profile setup
  const hasProfile = !!profile

  // Get subscription tier
  const getSubscriptionTier = () => {
    return profile?.subscription_tier || 'basic'
  }

  // Check subscription limits
  const checkSubscriptionLimits = (resourceType) => {
    const tier = getSubscriptionTier()
    
    const limits = {
      basic: {
        agents: 1,
        data_sources: 1,
        tasks_per_month: 100
      },
      pro: {
        agents: 5,
        data_sources: 5,
        tasks_per_month: 1000
      },
      premium: {
        agents: -1, // unlimited
        data_sources: -1, // unlimited
        tasks_per_month: -1 // unlimited
      }
    }

    return limits[tier]?.[resourceType] || 0
  }

  const value = {
    // State
    user,
    profile,
    loading,
    initializing,
    isAuthenticated,
    hasProfile,

    // Actions
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    loadUserProfile,

    // Utilities
    getSubscriptionTier,
    checkSubscriptionLimits
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
