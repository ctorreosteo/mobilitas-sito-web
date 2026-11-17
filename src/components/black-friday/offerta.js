import { useEffect, useState } from 'react'

// Dati e hook comuni alle landing del Black Friday 2026: /black-friday-2026 (10 visite a 450€, da pagare online) e
// /black-friday-2026-amico (l'invito per l'amico, dal link personale che il paziente riceve per messaggio).
// Se cambia l'offerta, cambiala qui e nei testi delle due pagine.

// Fine dell'offerta: domenica 29 novembre 2026, a mezzanotte (ora italiana)
export const SCADENZA = new Date('2026-11-29T23:59:59+01:00')
export const SCADENZA_TESTO = 'domenica 29 novembre'

// Prezzo pieno di una visita e prima visita dell'amico (porta un amico)
export const PREZZO_VISITA = 90
export const PRIMA_VISITA_AMICO = 49

// Porta un amico: ogni paziente può invitare al massimo 3 amici, quindi al massimo 3 visite gratis per lui
export const MAX_AMICI = 3

// "Qualunque sia il suo problema": i problemi che trattiamo (le landing dei dolori)
export const PROBLEMI = [
  'Mal di schiena',
  'Cervicalgia',
  'Sciatalgia',
  'Ernia del disco',
  'Emicrania',
  'Vertigini',
  'Bruxismo',
  'Acufeni',
  'Reflusso',
  'Stitichezza',
  'Colon irritabile',
  'Fibromialgia',
  'Tendinite',
  'Tunnel carpale',
  'Fascite plantare',
  'Scoliosi',
  'Ciclo doloroso',
  'Menopausa',
]

export const due = (n) => String(n).padStart(2, '0')

// SEO dell'offerta: titolo, descrizione, Open Graph e canonical. Pagine a tempo: noindex, così non restano su
// Google dopo la scadenza. Alla chiusura rimette i valori di prima.
// seo = { path, title, description, ogImage, ogImageAlt }
export function useSeoOfferta(seo) {
  useEffect(() => {
    const origin = window.location.origin
    const prima = []
    const imposta = (attr, key, content) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
      }
      prima.push([tag, tag.getAttribute('content')])
      tag.setAttribute('content', content)
    }
    const titoloPrima = document.title
    document.title = seo.title
    imposta('name', 'description', seo.description)
    imposta('name', 'robots', 'noindex, follow')
    imposta('property', 'og:title', seo.title)
    imposta('property', 'og:description', seo.description)
    imposta('property', 'og:type', 'website')
    imposta('property', 'og:url', `${origin}${seo.path}`)
    imposta('property', 'og:image', `${origin}${seo.ogImage}`)
    imposta('property', 'og:image:alt', seo.ogImageAlt)
    imposta('property', 'og:locale', 'it_IT')
    imposta('name', 'twitter:card', 'summary_large_image')
    imposta('name', 'twitter:title', seo.title)
    imposta('name', 'twitter:description', seo.description)
    imposta('name', 'twitter:image', `${origin}${seo.ogImage}`)

    let canonical = document.querySelector('link[rel="canonical"]')
    const canonicalPrima = canonical?.getAttribute('href')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${origin}${seo.path}`)

    return () => {
      document.title = titoloPrima
      prima.forEach(([tag, content]) => (content == null ? tag.remove() : tag.setAttribute('content', content)))
      if (canonicalPrima) canonical.setAttribute('href', canonicalPrima)
      else canonical.remove()
    }
  }, [seo])
}

// Tempo che manca alla scadenza, aggiornato ogni secondo (null = offerta finita)
export function useMancano(scadenza = SCADENZA) {
  const calcola = () => {
    const ms = scadenza.getTime() - Date.now()
    if (ms <= 0) return null
    const s = Math.floor(ms / 1000)
    return { giorni: Math.floor(s / 86400), ore: Math.floor((s % 86400) / 3600), min: Math.floor((s % 3600) / 60), sec: s % 60 }
  }
  const [mancano, setMancano] = useState(calcola)
  useEffect(() => {
    const timer = window.setInterval(() => setMancano(calcola()), 1000)
    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scadenza])
  return mancano
}
