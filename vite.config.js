import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Use root base for Netlify and local dev, but /Astrofied/ for GitHub Pages
  // Netlify sets the NETLIFY environment variable to true
  base: process.env.NETLIFY ? '/' : '/Astrofied/',
})
