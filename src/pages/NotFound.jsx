import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MotionConfig, motion, useSpring } from 'framer-motion'
import { Home, ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButtonSito from '../components/WhatsAppButtonSito'
import { Vertebra } from '../components/home-sections/SpineProgress'
import { EASE, buzz } from '../components/home-sections/homeMotion'
import '../styles/mx.css'
import '../styles/pages/notfound.css'

const COUNT = 24

// Le tre cifre, fuori asse come vertebre disallineate
const DIGITS = [
  { ch: '4', rotate: -9, y: -10, x: 6 },
  { ch: '0', rotate: 7, y: 16, x: 0 },
  { ch: '4', rotate: -4, y: -4, x: -8 },
]

const LINKS = [
  { to: '/chi-siamo', label: 'Chi siamo' },
  { to: '/testimonianze', label: 'Testimonianze' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contatti', label: 'Contatti' },
]

const fade = (delay, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
})

const NotFound = () => {
  const progress = useSpring(0, { stiffness: 55, damping: 13 })
  const [aligned, setAligned] = useState(false)

  const realign = () => {
    if (aligned) return
    setAligned(true)
    progress.set(1)
    buzz([12, 40, 12])
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden mx-404-root">
      {/* Header */}
      <Header />

      <MotionConfig reducedMotion="user">
        <main className={`mx-page mx-404page ${aligned ? 'is-aligned' : ''}`}>
          <div className="mx-404__grid" aria-hidden="true" />
          <div className="mx-404__glow" aria-hidden="true" />

          <div className="mx-wrap mx-404__wrap">
            {/* 404 fuori asse */}
            <h1 className="mx-404__num" aria-label="404">
              {DIGITS.map((d, i) => (
                <motion.span
                  key={i}
                  className="mx-404__digit"
                  initial={{ opacity: 0, y: 60, rotate: 0 }}
                  animate={aligned
                    ? { opacity: 1, y: 0, x: 0, rotate: 0 }
                    : { opacity: 1, y: d.y, x: d.x, rotate: d.rotate }}
                  transition={aligned
                    ? { type: 'spring', stiffness: 260, damping: 14, delay: 0.25 + i * 0.08 }
                    : { duration: 1.1, ease: EASE, delay: 0.1 + i * 0.1 }}
                >
                  {d.ch}
                </motion.span>
              ))}
            </h1>

            {/* La colonna: tocca per riallinearla */}
            <motion.button
              type="button"
              className="mx-404-spine"
              onClick={realign}
              aria-label="Riallinea la colonna"
              whileTap={{ scale: 0.97 }}
              {...fade(0.4, 16)}
            >
              <span className="mx-404-spine__col">
                {Array.from({ length: COUNT }, (_, i) => (
                  <Vertebra key={i} i={i} count={COUNT} progress={progress} amp={2.6} size={2.3} />
                ))}
              </span>
              <span className="mx-404-spine__hint">
                <Sparkles size={14} />
                {aligned ? 'Allineata. La pagina però non c’è comunque.' : 'Tocca la colonna per riallinearla'}
              </span>
            </motion.button>

            {/* Message */}
            <motion.div className="mx-404__msg" {...fade(0.55)}>
              <h2 className="mx-h mx-404__title">
                Oops! Pagina non trovata
              </h2>
              <p className="mx-404__text">
                La pagina che stai cercando non esiste o è stata spostata.
                <span className="mx-404__text2">
                  Non ti preoccupare, possiamo aiutarti a trovare quello che cerchi!
                </span>
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="mx-ctas mx-404__ctas" {...fade(0.7)}>
              <Link
                to="/"
                className="mx-btn mx-btn--primary"
                onClick={() => window.scrollTo(0, 0)}
              >
                <span>Torna alla Home</span>
                <span className="mx-btn__icon"><Home size={20} strokeWidth={2.4} /></span>
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="mx-btn mx-btn--ghost"
              >
                <span>Torna Indietro</span>
                <span className="mx-btn__icon"><ArrowLeft size={20} strokeWidth={2.4} /></span>
              </button>
            </motion.div>

            {/* Altre strade */}
            <motion.nav className="mx-404__links" aria-label="Pagine utili" {...fade(0.85)}>
              {LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="mx-404__link" onClick={() => window.scrollTo(0, 0)}>
                  {l.label}
                  <ArrowUpRight size={16} strokeWidth={2.4} />
                </Link>
              ))}
            </motion.nav>
          </div>
        </main>
      </MotionConfig>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButtonSito />
    </div>
  )
}

export default NotFound
