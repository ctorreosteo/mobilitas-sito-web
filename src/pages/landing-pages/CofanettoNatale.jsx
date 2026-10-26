import React, { useMemo } from 'react'
import { MotionConfig } from 'framer-motion'
import Header from '../../components/Header'
import OfferSection from '../../components/cofanetto-natale-sections/OfferSection'
import PainPointsSection from '../../components/cofanetto-natale-sections/PainPointsSection'
import SolutionsBenefitsSection from '../../components/cofanetto-natale-sections/SolutionsBenefitsSection'
import FAQSection from '../../components/cofanetto-natale-sections/FAQSection'
import FooterSection from '../../components/cofanetto-natale-sections/FooterSection'
import WhatsAppButtonCofanettoNatale from '../../components/WhatsAppButtonCofanettoNatale'
import '../../styles/mx.css'
import '../../styles/pages/cofanetto-natale.css'

// Concetto: "l'unboxing". Il cofanetto è l'oggetto protagonista: in apertura si scarta da solo
// (il coperchio vola via e il cofanetto vero esce dalla scatola), le offerte sono bigliettini regalo,
// i destinatari etichette appese.
function CofanettoNatale() {
  // Fiocchi, Babbi Natale e alberelli che scendono piano (posizioni casuali come prima)
  const fall = useMemo(() => {
    const make = (n, glyph, minDur, spanDur, maxDelay) =>
      Array.from({ length: n }, () => ({
        glyph,
        left: Math.random() * 90 + 5,
        duration: minDur + Math.random() * spanDur,
        delay: Math.random() * maxDelay,
      }))
    return [...make(5, '❄', 20, 15, 5), ...make(2, '🎅', 30, 10, 8), ...make(3, '🎄', 25, 12, 6)]
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-page mx-xmas">
        <div className="mx-xmas-fall" aria-hidden="true">
          {fall.map((f, i) => (
            <span
              key={i}
              className={f.glyph === '❄' ? 'is-snow' : undefined}
              style={{ left: `${f.left}%`, animationDuration: `${f.duration}s`, animationDelay: `${f.delay}s` }}
            >
              {f.glyph}
            </span>
          ))}
        </div>

        <Header />

        <main className="mx-xmas-main">
          <OfferSection />
          <PainPointsSection />
          <SolutionsBenefitsSection />
          <FAQSection />
        </main>
        <FooterSection />

        <WhatsAppButtonCofanettoNatale />
      </div>
    </MotionConfig>
  )
}

export default CofanettoNatale
