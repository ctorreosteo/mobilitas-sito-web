import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Permette connessioni da qualsiasi IP
      port: 5173,      // Porta specifica
      // Proxy /api verso backend HQ: in dev le chiamate vanno a localhost:5173/api/... e Vite le inoltra a localhost:8080/api/...
      proxy: {
        // Recensioni: sola lettura e pubbliche, si leggono dal gestionale di produzione (VITE_API_BASE),
        // così il carosello si vede anche senza il gestionale acceso in locale.
        // Senza VITE_API_BASE vanno al gestionale locale come il resto.
        '/api/sito/recensioni': {
          target: env.VITE_API_BASE || 'http://localhost:8080',
          changeOrigin: true,
        },
        // Tutto il resto (form, calendario, prenotazioni) resta sul gestionale locale: niente richieste vere per sbaglio
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
  }
})
