import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useScroll } from 'framer-motion'
import { Calendar } from 'lucide-react'
import VSLSection from '../../components/gravidanza-sections/VSLSection'
import PainPointsSection from '../../components/gravidanza-sections/PainPointsSection'
import BenefitsSection from '../../components/gravidanza-sections/BenefitsSection'
import FAQSection from '../../components/gravidanza-sections/FAQSection'
import OfferSection from '../../components/gravidanza-sections/OfferSection'
import FooterSection from '../../components/gravidanza-sections/FooterSection'
import '../../styles/mx.css'
import '../../styles/pages/gravidanza.css'

// Concetto: "il tempo dell'attesa". Pagina chiara e morbida, aria d'alba; il momento firma
// è l'anello delle 40 settimane nell'offerta: scegli la tua fascia e il modulo la ritrova già compilata.

// Barra "Prenota" fissa su mobile, tra l'apertura e l'offerta
function StickyBook() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('grav-hero')
    const offer = document.getElementById('offer-section')
    let heroGone = false
    let offerIn = false
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) heroGone = !e.isIntersecting && e.boundingClientRect.top < 0
        if (e.target === offer) offerIn = e.isIntersecting
      })
      setShow(heroGone && !offerIn)
    })
    if (hero) io.observe(hero)
    if (offer) io.observe(offer)
    return () => io.disconnect()
  }, [])

  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="mx-grav-sticky"
          initial={{ y: 110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 110, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        >
          <button type="button" className="mx-grav-btn mx-grav-btn--full" onClick={scrollToOffer}>
            <Calendar size={18} strokeWidth={2.4} />
            <span>PRENOTA ORA CON SCONTO</span>
            <span className="mx-grav-sticky__price" aria-hidden="true"><s>€90</s> €69</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Gravidanza() {
  const { scrollYProgress } = useScroll()

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-page mx-grav">
        {/* Progress Bar */}
        <motion.div className="mx-grav-progress" style={{ scaleX: scrollYProgress }} />

        <VSLSection />
        <PainPointsSection />
        <BenefitsSection />
        <OfferSection />
        <FAQSection />
        <FooterSection />
        <StickyBook />
      </div>
    </MotionConfig>
  )
}
