import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Asegura que Vercel sepa dónde buscar los archivos generados
  },
  server: {
    port: 3000,
    open: true
  }
})
