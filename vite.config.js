import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permette connessioni da qualsiasi IP
    port: 5173,      // Porta specifica
    // Proxy /api verso backend HQ: in dev le chiamate vanno a localhost:5173/api/... e Vite le inoltra a localhost:8080/api/...
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Assicura che il build sia ottimizzato per SPA
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Configurazione per SPA - importante per il routing
  base: '/',
})
