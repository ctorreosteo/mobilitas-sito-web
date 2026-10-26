import { useEffect, useState } from 'react'

// In dev: '' così la chiamata va a /api/... e il proxy Vite la inoltra al backend locale.
// In prod: base completa del backend HQ (CORS pubblico abilitato per studiomobilitas.it).
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

// Avvia subito il fetch (va chiamata a livello di modulo nella pagina, prima del mount)
// per ridurre il tempo a primo frame. codice = codice stabile del video nel gestionale:
// non hardcodare l'UID Cloudflare.
export function prefetchHeroVideo(codice) {
  return fetch(`${API_BASE}/api/sito/video/codice/${codice}`, {
    priority: 'high',
  })
    .then((res) => {
      if (res.status === 404) return null
      return res.ok ? res.json() : null
    })
    .then((json) => (json?.data?.cloudflareUid ? json.data : null))
    .catch(() => null)
}

function ensureCloudflarePreconnect() {
  const origins = ['https://iframe.videodelivery.net', 'https://videodelivery.net']
  origins.forEach((href) => {
    if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

function preloadHeroPoster(url) {
  if (!url || document.querySelector(`link[rel="preload"][href="${url}"]`)) return
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = url
  document.head.appendChild(link)
}

export function useHeroVideo(heroVideoPromise) {
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ensureCloudflarePreconnect()
    let cancelled = false
    heroVideoPromise.then((data) => {
      if (cancelled) return
      if (data?.anteprimaUrl) preloadHeroPoster(data.anteprimaUrl)
      setVideo(data)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [heroVideoPromise])

  return { video, loading }
}

// URL del player Cloudflare: autoplay muto in loop, senza controlli, letterbox blu aziendale
export const heroVideoSrc = (video) =>
  video
    ? `https://iframe.videodelivery.net/${video.cloudflareUid}?autoplay=true&muted=true&loop=true&controls=false&preload=auto&letterboxColor=%23002552&poster=${encodeURIComponent(video.anteprimaUrl ?? '')}`
    : ''
