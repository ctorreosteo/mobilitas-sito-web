// Configurazione condivisa della heatmap interna (tracker + modalità visualizzazione).
// Specifiche complete: docs/heatmap/SPEC.md

const env = import.meta.env

const API_BASE = env.DEV ? '' : (env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

export const HEATMAP_ENDPOINT = `${API_BASE}/api/sito/eventi`

// Interruttore generale: spento finché non c'è l'ok privacy e il backend in produzione.
export const HEATMAP_ENABLED = env.VITE_HEATMAP_ENABLED === 'true'

// Quota di sessioni tracciate (0–1). Default: tutte.
const sample = Number.parseFloat(env.VITE_HEATMAP_SAMPLE ?? '1')
export const HEATMAP_SAMPLE = Number.isFinite(sample) ? Math.min(Math.max(sample, 0), 1) : 1

// In locale il tracker resta spento, salvo VITE_HEATMAP_LOCALE=true (per le prove).
export const HEATMAP_LOCALE = env.VITE_HEATMAP_LOCALE === 'true'

// Identificativo della build: cambia a ogni deploy, serve a capire se la pagina è cambiata nel periodo.
export const HEATMAP_BUILD = env.VITE_HM_BUILD || 'dev'

// Pagine mai tracciate.
export const PAGINE_ESCLUSE = new Set(['/login'])

// Origini da cui il gestionale può inviare i dati da disegnare in modalità visualizzazione.
const ORIGINI_VIEWER = new Set([
  'https://hq.studiomobilitas.it',
  'https://app.studiomobilitas.it',
  ...(env.VITE_HEATMAP_VIEWER_ORIGINS ?? '').split(',').map((o) => o.trim()).filter(Boolean),
])

export function origineViewerAmmessa(origin) {
  if (ORIGINI_VIEWER.has(origin)) return true
  try {
    const { hostname } = new URL(origin)
    return hostname === 'localhost' || hostname === '127.0.0.1'
  } catch {
    return false
  }
}

// Stessi breakpoint del sito (vedi docs/heatmap/SPEC.md §Dispositivo).
export function dispositivoDa(larghezza) {
  if (larghezza < 640) return 'mobile'
  if (larghezza < 1024) return 'tablet'
  return 'desktop'
}

const PAGINA_VALIDA = /^\/[a-z0-9\-/]*$/

// Solo il percorso, minuscolo, senza slash finale. Mai la query string (es. ?code= di "porta un amico").
export function normalizzaPagina(pathname) {
  let p = (pathname || '/').toLowerCase()
  if (p.length > 1) p = p.replace(/\/+$/, '')
  if (p.length > 255 || !PAGINA_VALIDA.test(p)) return null
  if (PAGINE_ESCLUSE.has(p)) return null
  return p
}

export function isHostLocale(hostname = window.location.hostname) {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.')
  )
}

export function isModalitaVisualizzazione() {
  return new URLSearchParams(window.location.search).get('hm_view') === '1'
}

export function isInIframe() {
  try {
    return window.self !== window.top
  } catch {
    return true
  }
}
