import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    // Ensure process.env is available for build-time checks
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // Prevent build errors from undefined globals
    global: 'globalThis'
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
    ]
  }
})
