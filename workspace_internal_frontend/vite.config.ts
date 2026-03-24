import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // This forces absolute paths for your assets
  server: {
    host: '0.0.0.0',
    port: 5003,
  },
})