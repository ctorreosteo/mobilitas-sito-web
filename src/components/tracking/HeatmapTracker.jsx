import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HEATMAP_ENABLED, HEATMAP_LOCALE, isHostLocale, isInIframe, isModalitaVisualizzazione } from './heatmapConfig'
import { avviaPagina, chiudiPagina, disinstalla, installa } from './heatmapClient'

// Heatmap interna. Montato una sola volta in App.jsx, copre tutte le route.
// - ?hm_view=1 dentro un iframe: modalità visualizzazione per il gestionale (codice caricato solo lì)
// - altrimenti registra click e scroll, se acceso da VITE_HEATMAP_ENABLED
const visualizzazione = typeof window !== 'undefined' && isModalitaVisualizzazione() && isInIframe()

const tracciamento =
  typeof window !== 'undefined' &&
  HEATMAP_ENABLED &&
  !isModalitaVisualizzazione() &&
  !isInIframe() &&
  (HEATMAP_LOCALE || !isHostLocale()) &&
  !navigator.globalPrivacyControl

const HeatmapTracker = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (visualizzazione) {
      import('./heatmapViewer').then((m) => m.avviaViewer()).catch(() => {})
      return undefined
    }
    if (!tracciamento) return undefined
    installa()
    return () => disinstalla()
  }, [])

  useEffect(() => {
    if (!tracciamento) return undefined
    avviaPagina(pathname)
    return () => chiudiPagina()
  }, [pathname])

  return null
}

export default HeatmapTracker
