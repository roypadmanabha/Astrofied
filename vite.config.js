import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://astrofied.netlify.app'
    })
  ],
  // Relative base path ensures compatibility across all hosting platforms (Netlify, GH Pages, etc.)
  base: './',
})
