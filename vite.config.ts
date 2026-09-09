import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssr: {
    // react-helmet-async (usado por vite-react-ssg <Head>) debe empaquetarse para el SSR.
    noExternal: ['react-helmet-async'],
  },
})
