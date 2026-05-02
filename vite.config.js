import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  assetsInclude: ['**/*.aiff'],
  // Relative base path ensures compatibility across all hosting platforms (Netlify, GH Pages, etc.)
  base: './',
})
