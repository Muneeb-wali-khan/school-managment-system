import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api/v1': {
  //       // target: 'http://localhost:3000', // Change this to match your backend server's URL
  //       target: 'https://school-managment-system-pi.vercel.app', // Change this to match your backend server's URL
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
})
