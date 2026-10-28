import { useRef } from 'react'
import { useScroll, useSpring, useTransform } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1]

const WHATSAPP_NUMBER = '393518198457'
export const MSG_CONSULTO = 'Ciao, vorrei effettuare una breve consulenza conoscitiva telefonica per comprendere se potete essermi di aiuto. Quando ci sarebbe posto? Grazie'
export const MSG_VISITA = 'Ciao, vorrei effettuare una prima visita con sconto. Quando ci sarebbe posto? Grazie'

export const openWhatsApp = (text) => {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank')
}

// Piccola vibrazione dove supportata (Android); su iOS non fa nulla
export const buzz = (pattern) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(pattern)
}

export const SPINE_COUNT = 24

// Avanzamento di lettura della pagina, ammorbidito (guida la colonna)
export const useReadingProgress = () => {
  const { scrollYProgress } = useScroll()
  return useSpring(scrollYProgress, { stiffness: 70, damping: 20, mass: 0.5 })
}

// Parallasse verticale per un'immagine alta il 120% del contenitore (vedi .mx-parallax-img)
export const useParallax = (percent = 8) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${percent}%`, `${percent}%`])
  return [ref, y]
}

// Luce che segue il mouse dentro una card (.mx-card)
export const trackSpotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx-cx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--mx-cy', `${e.clientY - r.top}px`)
}
