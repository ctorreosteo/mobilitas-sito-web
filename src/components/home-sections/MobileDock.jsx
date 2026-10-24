import React, { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Percent } from 'lucide-react'
import WhatsAppIcon from '../whatsapp/WhatsAppIcon'
import { Vertebra } from './SpineProgress'
import { EASE, MSG_CONSULTO, MSG_VISITA, SPINE_COUNT, openWhatsApp, useReadingProgress } from './homeMotion'

// Barra fissa in basso su mobile: le due azioni sempre sotto il pollice,
// e la colonna che si riallinea mentre leggi. Entra al primo scroll verso il basso
// e da lì resta sempre visibile.
const MobileDock = () => {
  const progress = useReadingProgress()
  const { scrollY } = useScroll()
  const [shown, setShown] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (!shown && y > scrollY.getPrevious() && y > 10) setShown(true)
  })

  return (
    <motion.nav
      className="mx-dock"
      aria-label="Prenota"
      initial={false}
      animate={{ y: shown ? 0 : 140, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ pointerEvents: shown ? 'auto' : 'none' }}
      aria-hidden={!shown || undefined}
    >
      <div className="mx-dock__spine" aria-hidden="true">
        {Array.from({ length: SPINE_COUNT }, (_, i) => (
          <Vertebra key={i} i={i} progress={progress} amp={0.7} size={0.8} />
        ))}
      </div>
      <div className="mx-dock__row">
        <button type="button" className="mx-dock__btn mx-dock__btn--primary" onClick={() => openWhatsApp(MSG_CONSULTO)}>
          <WhatsAppIcon size={18} strokeWidth={2.4} />
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
