import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import GpadelInfortuniPopup from '../../components/GpadelInfortuniPopup'
import GuideBook from '../../components/gpadel/GuideBook'
import PageShell from '../../components/site/PageShell'
import { EASE } from '../../components/home-sections/homeMotion'
import '../../styles/pages/gpadel-lm.css'

const guideItems = [
  'Le 3 cause più sottovalutate che ti stanno avvicinando a un infortunio senza che tu te ne accorga',
  'I 4 infortuni che rovinano più spesso i padelisti (e come prevenirli)',
  'La routine di riscaldamento che i migliori usano per non farsi MAI male (e che l’amatore ignora completamente)',
  'Il più grande errore che commettono i padelisti quando si fanno male (e che li blocca più a lungo del dolore stesso)',
]

// Punteggio del padel: ogni contenuto della guida è un punto verso il game
const SCORES = ['15', '30', '40', 'Game']

const fade = (delay, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

// Pallina che rimbalza sul campo
const Ball = () => (
  <span className="mx-gpl-ball" aria-hidden="true">
    <svg viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" />
      <path d="M6 9 Q 20 20 6 31 M34 9 Q 20 20 34 31" />
    </svg>
    <i />
  </span>
)

const CtaLabel = () => (
  <>
    <span className="mx-gpl-cta__txt">
      <span className="mx-gpl-cta__main">Scarica la guida gratis</span>
      <span className="mx-gpl-cta__sub">(offerta per te)</span>
    </span>
    <span className="mx-btn__icon">
      <Download size={20} strokeWidth={2.6} />
    </span>
  </>
)

export default function LmGPadelInfortuni() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [showDock, setShowDock] = useState(false)
  const heroCtaRef = useRef(null)
  const endCtaRef = useRef(null)

  const handleOpenPopup = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  // Barra fissa su mobile: compare quando la CTA dell'hero esce dallo schermo
  useEffect(() => {
    const hero = heroCtaRef.current
    const end = endCtaRef.current
    if (!hero || !('IntersectionObserver' in window)) return
    const seen = { hero: true, end: false }
    const update = () => setShowDock(!seen.hero && !seen.end && hero.getBoundingClientRect().top < 0)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) seen.hero = e.isIntersecting
        if (e.target === end) seen.end = e.isIntersecting
      })
      update()
    })
    io.observe(hero)
    if (end) io.observe(end)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Header />

      <PageShell className="mx-gpl">
        {/* HERO: il campo di notte, la guida in mezzo al campo */}
        <section className="mx-gpl-hero">
          <div className="mx-gpl-arena" aria-hidden="true">
            <span className="mx-gpl-arena__light mx-gpl-arena__light--l" />
            <span className="mx-gpl-arena__light mx-gpl-arena__light--r" />
          </div>

          <div className="mx-wrap mx-gpl-hero__grid">
            <div className="mx-gpl-hero__head">
              <motion.div {...fade(0.05, 12)} className="mx-gpl-badge">
                <span className="mx-gpl-badge__dot" />
                <span>Offerta GPADEL</span>
              </motion.div>
              <motion.h1 className="mx-h mx-gpl-title" {...fade(0.15)}>
                L’Errore che Tutti i Padelisti Commettono Prima di Farsi Male Seriamente
                <span className="mx-gpl-title__sub mx-gradient">
                  (E Come Evitarlo Subito)
                </span>
              </motion.h1>
            </div>

            <div className="mx-gpl-hero__offer">
              {/* Il campo: vetri di fondo e pavimento in prospettiva, sotto la guida */}
              <div className="mx-gpl-court" aria-hidden="true">
                <div className="mx-gpl-court__glass" />
                <div className="mx-gpl-court__floor">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M1 1H99V99H1Z" />
                    <path d="M1 34H99" />
                    <path d="M50 34V99" />
                  </svg>
                </div>
              </div>
              <motion.div
                className="mx-gpl-stage"
                initial={{ opacity: 0, y: 50, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.25 }}
              >
                <GuideBook eager />
                <Ball />
              </motion.div>

              <motion.div className="mx-gpl-board" {...fade(0.45)}>
                <span className="mx-gpl-board__old">
                  40€
                  <motion.i
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 1.1 }}
                  />
                </span>
                <span className="mx-gpl-board__mid">per te che arrivi dal GPADEL è</span>
                <span className="mx-gpl-board__free" aria-label="GRATIS">
                  {'GRATIS'.split('').map((ch, i) => (
                    <motion.span
                      key={i}
                      aria-hidden="true"
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 1.35 + i * 0.07 }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              </motion.div>

              <motion.div className="mx-gpl-hero__action" {...fade(0.6)}>
                <button
                  ref={heroCtaRef}
                  type="button"
                  onClick={handleOpenPopup}
                  className="mx-btn mx-btn--primary mx-gpl-cta"
                >
                  <CtaLabel />
                </button>
                <p className="mx-gpl-note">Te la invieremo entro 48 ore lavorative dopo aver effettuato controllato manualmente che si tratti di una richiesta vera.</p>
              </motion.div>
            </div>

            <motion.p className="mx-lead mx-gpl-hero__lead" {...fade(0.35)}>
              Scopri i 4 errori più comuni che portano migliaia di padelisti a farsi male ogni stagione (spesso senza nemmeno accorgersene). In questa guida troverai le cause nascoste degli infortuni, una routine preventiva efficace e i segnali da non ignorare per giocare meglio, più a lungo e senza dolori. <strong className="mx-gpl-hero__punch">Prima ti informi, meno ti fermi.</strong> Ti diverti di più e stai meglio!
            </motion.p>
          </div>
        </section>

        {/* La rete: separa l'hero dal contenuto della guida */}
        <div className="mx-gpl-net" aria-hidden="true" />

        {/* COSA TROVI NELLA GUIDA: quattro punti fino al game */}
        <section className="mx-section mx-gpl-guide">
          <div className="mx-wrap">
            <div className="mx-gpl-guide__head">
              <h2 className="mx-h mx-h--lg">Cosa trovi nella guida</h2>
            </div>

            <ol className="mx-gpl-points">
              {guideItems.map((text, i) => (
                <motion.li
                  key={i}
                  className={`mx-gpl-point ${i === guideItems.length - 1 ? 'is-game' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                  transition={{ duration: 0.9, ease: EASE, delay: (i % 2) * 0.08 }}
                >
                  <span className="mx-gpl-point__score" data-score={SCORES[i]} aria-hidden="true" />
                  <p className="mx-gpl-point__text">{text}</p>
                </motion.li>
              ))}
            </ol>

            <motion.div
              className="mx-gpl-match"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: EASE }}
            >
              <GuideBook className="mx-gpl-book--mini" sizes="120px" alt="" />
              <div className="mx-gpl-match__price" aria-hidden="true">
                <s>40€</s>
                <b>GRATIS</b>
              </div>
              <button
                ref={endCtaRef}
                type="button"
                onClick={handleOpenPopup}
                className="mx-btn mx-btn--primary mx-gpl-cta"
              >
                <CtaLabel />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Barra fissa mobile */}
        <div className={`mx-gpl-dock ${showDock ? 'is-on' : ''}`} aria-hidden={!showDock}>
          <button type="button" className="mx-gpl-dock__btn" onClick={handleOpenPopup} tabIndex={showDock ? 0 : -1}>
            <span className="mx-gpl-dock__free" aria-hidden="true">GRATIS</span>
            <span className="mx-gpl-cta__main">Scarica la guida gratis</span>
            <Download size={18} strokeWidth={2.6} />
          </button>
        </div>
      </PageShell>

      <Footer />

      {/* Gpadel Infortuni Popup */}
      <GpadelInfortuniPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </>
  )
}
