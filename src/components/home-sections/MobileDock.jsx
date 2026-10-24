import React, { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { MessageCircle, Percent } from 'lucide-react'
import { Vertebra } from './SpineProgress'
import { EASE, MSG_CONSULTO, MSG_VISITA, SPINE_COUNT, openWhatsApp, useReadingProgress } from './homeMotion'

// Barra fissa in basso su mobile: le due azioni sempre sotto il pollice,
// e la colonna che si riallinea mentre leggi. Compare dopo l'hero e si fa da parte
// sulla sezione "tieni premuto" e su quella finale, che hanno già le loro CTA.
const overlapsViewport = (el) => {
  if (!el) return false
  const r = el.getBoundingClientRect()
  return r.top < window.innerHeight * 0.8 && r.bottom > window.innerHeight * 0.2
}

const MobileDock = () => {
  const progress = useReadingProgress()
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const final = document.getElementById('mx-final')
    const finalReached = final && final.getBoundingClientRect().top < window.innerHeight * 0.8
    const onTouchSection = overlapsViewport(document.getElementById('mx-touch'))
    setVisible(y > window.innerHeight * 0.9 && !finalReached && !onTouchSection)
  })

  return (
    <motion.nav
      className="mx-dock"
      aria-label="Prenota"
      initial={false}
      animate={{ y: visible ? 0 : 140, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="mx-dock__spine" aria-hidden="true">
        {Array.from({ length: SPINE_COUNT }, (_, i) => (
          <Vertebra key={i} i={i} progress={progress} amp={0.7} size={0.8} />
        ))}
      </div>
      <div className="mx-dock__row">
        <button type="button" className="mx-dock__btn mx-dock__btn--primary" onClick={() => openWhatsApp(MSG_CONSULTO)}>
          <MessageCircle size={18} strokeWidth={2.4} />
          <span className="mx-dock__lbl">
            Consulto
            <small>gratuito</small>
          </span>
        </button>
        <button type="button" className="mx-dock__btn mx-dock__btn--ghost" onClick={() => openWhatsApp(MSG_VISITA)}>
          <Percent size={16} strokeWidth={2.6} />
          <span className="mx-dock__lbl">
            Prima visita
            <small>con sconto</small>
          </span>
        </button>
      </div>
    </motion.nav>
  )
}

export default MobileDock
