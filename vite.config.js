import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portofolio-CRUD/',
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://backend-production-ee6da.up.railway.app/api')
  }
})