import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   // host: '0.0.0.0',
  //   // port : 3000,
  //   proxy: {
  //      // "/api/v1": 'http://localhost:8000', // Your server's address/
  //   },
  // },
})
