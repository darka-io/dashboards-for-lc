import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'



// https://vite.dev/config/
export default defineConfig({
  server:{
    allowedHosts:true,
    proxy: {
      '/api': {
        target: "http://localhost:5000",
        changeOrigin: true,
        ws: true,
        secure: true,
      },
    },
    headers: {
      'Cache-Control': 'public, max-age=0',
    },
  },
  plugins: [tanstackRouter({
    target: 'react',
    autoCodeSplitting: true,
  }), react(), tailwindcss()],
})