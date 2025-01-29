import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  define: {
    // eslint-disable-next-line no-undef
    'process.env': process.env, // Optional for additional env support
  },
  server: {
    port:  3000, 
    host: '0.0.0.0', 
    allowedHosts: ['*']
  },
  plugins:
  [react()]
})
