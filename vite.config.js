import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to validate build environment
    {
      name: 'validate-build-env',
      buildStart() {
        // Only warn about missing env vars, don't fail the build
        const requiredVars = [
          'VITE_SUPABASE_URL',
          'VITE_SUPABASE_ANON_KEY', 
          'VITE_OPENAI_API_KEY',
          'VITE_STRIPE_PUBLISHABLE_KEY'
        ]
        
        const missing = requiredVars.filter(key => !process.env[key])
        
        if (missing.length > 0) {
          console.warn('⚠️  Build Warning: Missing environment variables:', missing)
          console.warn('   These should be configured in your deployment environment.')
          console.warn('   The app will still build but may not function correctly without them.')
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    // Ensure process.env is available for build-time checks
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // Prevent build errors from undefined globals
    global: 'globalThis',
    // Fix potential issues with Node.js globals in browser
    'process.env': {}
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'react-hot-toast'],
          charts: ['recharts'],
          forms: ['react-hook-form'],
          supabase: ['@supabase/supabase-js'],
          utils: ['date-fns', 'uuid', 'zustand']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'terser',
    target: 'es2020'
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'lucide-react',
      'react-hot-toast',
      'recharts',
      'react-hook-form',
      'date-fns',
      'uuid',
      'zustand'
    ],
    exclude: ['openai']
  }
})
