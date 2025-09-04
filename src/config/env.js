// Environment configuration
export const env = {
  // Supabase
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  
  // OpenAI
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  
  // Stripe
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  
  // App
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Task Weaver AI',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Environment
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  IS_DEV: import.meta.env.NODE_ENV === 'development',
  IS_PROD: import.meta.env.NODE_ENV === 'production',
}

// Validate required environment variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'OPENAI_API_KEY',
  'STRIPE_PUBLISHABLE_KEY'
]

export const validateEnv = () => {
  const missing = requiredEnvVars.filter(key => !env[key])
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing)
    
    // Only throw error in production runtime, not during build
    if (env.IS_PROD && typeof window !== 'undefined') {
      console.error('Missing required environment variables in production:', missing)
      // Don't throw error, just warn - let the app handle missing configs gracefully
    }
  }
  
  return missing.length === 0
}

// Build-time validation (only warns, doesn't break build)
export const validateBuildEnv = () => {
  const missing = requiredEnvVars.filter(key => !env[key])
  
  if (missing.length > 0) {
    console.warn('⚠️  Build Warning: Missing environment variables:', missing)
    console.warn('   These should be configured in your deployment environment.')
    console.warn('   The app will still build but may not function correctly without them.')
  }
  
  return missing.length === 0
}

// Export individual configs for convenience
export const supabaseConfig = {
  url: env.SUPABASE_URL,
  anonKey: env.SUPABASE_ANON_KEY,
}

export const openaiConfig = {
  apiKey: env.OPENAI_API_KEY,
}

export const stripeConfig = {
  publishableKey: env.STRIPE_PUBLISHABLE_KEY,
}

export const appConfig = {
  url: env.APP_URL,
  name: env.APP_NAME,
  version: env.APP_VERSION,
}
