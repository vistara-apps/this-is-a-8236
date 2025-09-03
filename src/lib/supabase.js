import { createClient } from '@supabase/supabase-js'
import { supabaseConfig } from '../config/env'

// Create Supabase client
export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
)

// Auth helpers
export const auth = {
  // Sign up new user
  signUp: async (email, password, options = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: options.metadata || {}
      }
    })
    return { data, error }
  },

  // Sign in user
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out user
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Get current user
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Reset password
  resetPassword: async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    return { data, error }
  },

  // Update password
  updatePassword: async (password) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    })
    return { data, error }
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // Generic query builder
  from: (table) => supabase.from(table),

  // Users
  users: {
    get: async (userId) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
      return { data, error }
    },

    update: async (userId, updates) => {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
      return { data, error }
    }
  },

  // Agents
  agents: {
    list: async (userId) => {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    get: async (agentId) => {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .single()
      return { data, error }
    },

    create: async (agent) => {
      const { data, error } = await supabase
        .from('agents')
        .insert(agent)
        .select()
        .single()
      return { data, error }
    },

    update: async (agentId, updates) => {
      const { data, error } = await supabase
        .from('agents')
        .update(updates)
        .eq('id', agentId)
        .select()
        .single()
      return { data, error }
    },

    delete: async (agentId) => {
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', agentId)
      return { error }
    }
  },

  // Data Sources
  dataSources: {
    list: async (userId) => {
      const { data, error } = await supabase
        .from('data_sources')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    get: async (dataSourceId) => {
      const { data, error } = await supabase
        .from('data_sources')
        .select('*')
        .eq('id', dataSourceId)
        .single()
      return { data, error }
    },

    create: async (dataSource) => {
      const { data, error } = await supabase
        .from('data_sources')
        .insert(dataSource)
        .select()
        .single()
      return { data, error }
    },

    update: async (dataSourceId, updates) => {
      const { data, error } = await supabase
        .from('data_sources')
        .update(updates)
        .eq('id', dataSourceId)
        .select()
        .single()
      return { data, error }
    },

    delete: async (dataSourceId) => {
      const { error } = await supabase
        .from('data_sources')
        .delete()
        .eq('id', dataSourceId)
      return { error }
    }
  },

  // Tasks
  tasks: {
    list: async (userId, options = {}) => {
      let query = supabase
        .from('tasks')
        .select('*, agents(name)')
        .eq('user_id', userId)

      if (options.agentId) {
        query = query.eq('agent_id', options.agentId)
      }

      if (options.status) {
        query = query.eq('status', options.status)
      }

      if (options.limit) {
        query = query.limit(options.limit)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      return { data, error }
    },

    get: async (taskId) => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*, agents(name)')
        .eq('id', taskId)
        .single()
      return { data, error }
    },

    create: async (task) => {
      const { data, error } = await supabase
        .from('tasks')
        .insert(task)
        .select('*, agents(name)')
        .single()
      return { data, error }
    },

    update: async (taskId, updates) => {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select('*, agents(name)')
        .single()
      return { data, error }
    },

    delete: async (taskId) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
      return { error }
    }
  },

  // Subscriptions
  subscriptions: {
    get: async (userId) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()
      return { data, error }
    },

    create: async (subscription) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert(subscription)
        .select()
        .single()
      return { data, error }
    },

    update: async (subscriptionId, updates) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('id', subscriptionId)
        .select()
        .single()
      return { data, error }
    }
  },

  // Usage Tracking
  usage: {
    get: async (userId, resourceType, periodStart, periodEnd) => {
      const { data, error } = await supabase
        .from('usage_tracking')
        .select('*')
        .eq('user_id', userId)
        .eq('resource_type', resourceType)
        .gte('period_start', periodStart)
        .lte('period_end', periodEnd)
      return { data, error }
    },

    track: async (usage) => {
      const { data, error } = await supabase
        .from('usage_tracking')
        .insert(usage)
        .select()
        .single()
      return { data, error }
    }
  }
}

// Storage helpers
export const storage = {
  // Upload file
  upload: async (bucket, path, file, options = {}) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, options)
    return { data, error }
  },

  // Download file
  download: async (bucket, path) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path)
    return { data, error }
  },

  // Get public URL
  getPublicUrl: (bucket, path) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data.publicUrl
  },

  // Delete file
  remove: async (bucket, paths) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove(paths)
    return { data, error }
  }
}

// Real-time helpers
export const realtime = {
  // Subscribe to table changes
  subscribe: (table, callback, filter = '*') => {
    return supabase
      .channel(`public:${table}`)
      .on('postgres_changes', 
        { event: filter, schema: 'public', table }, 
        callback
      )
      .subscribe()
  },

  // Unsubscribe from channel
  unsubscribe: (channel) => {
    return supabase.removeChannel(channel)
  }
}

export default supabase
