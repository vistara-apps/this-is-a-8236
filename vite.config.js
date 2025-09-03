import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
    chunkSizeWarningLimit: 1000
  }
})
