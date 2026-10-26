import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useScroll } from 'framer-motion'
import { Footprints } from 'lucide-react'
import HeroSection from '../../components/firstwalk-sections/HeroSection'
import ProblemSection from '../../components/firstwalk-sections/ProblemSection'
import WhySection from '../../components/firstwalk-sections/WhySection'
import ExperienceSection from '../../components/firstwalk-sections/ExperienceSection'
import WalkDetailsSection from '../../components/firstwalk-sections/WalkDetailsSection'
import OfferSection from '../../components/firstwalk-sections/OfferSection'
import FAQSection from '../../components/firstwalk-sections/FAQSection'
import ClosingSection from '../../components/firstwalk-sections/ClosingSection'
import '../../styles/mx.css'
import '../../styles/pages/first-walk.css'

// Concetto: "il sentiero". Carta topografica, una traccia verde che si disegna in apertura
// e il programma della giornata percorso da un camminatore mentre scorri.

const faqs = [
  {
    q: "Devo essere allenato per partecipare?",
    a: "Assolutamente no. La camminata è pensata per tutti, anche per chi non si muove da tempo. È un'esperienza dolce, accessibile e guidata passo dopo passo."
  },
  {
    q: "Quanto dura l'evento?",
    a: "Circa 3-4 ore. Il ritrovo è previsto nel primo pomeriggio, la camminata dura qualche ora con pausa merenda inclusa, e si conclude con stretching e respirazione."
  },
  {
    q: "Cosa devo portare?",
    a: "Solo abbigliamento comodo e scarpe da camminata o da ginnastica. Pensiamo noi alla merenda, alla guida e all'organizzazione. Se ti fa piacere, porta un amico o parente!"
  },
  {
    q: "E se piove?",
    a: "In caso di maltempo grave l'evento sarà posticipato. Se si tratta solo di nuvole o qualche goccia, partiamo comunque con la giusta attrezzatura. Se tu non dovessi essere disponibile per la data nuova, verrai rimborsato senza problemi."
  },
  {
    q: "Posso venire da solo/a?",
    a: "Certo! Molti dei nostri pazienti partecipano da soli e poi si trovano benissimo. È un'occasione anche per conoscere nuove persone in un contesto rilassato e accogliente."
  },
  {
    q: "Posso invitare qualcuno?",
    a: "Sì, puoi portare amici o familiari. E ti daremo pure un bonus extra!"
  }
]

// Bottone fisso su mobile tra l'apertura e l'offerta
function StickyPick() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('walk-hero')
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

  const scrollToOffers = () => {
    const offersSection = document.getElementById('offer-section');
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="mx-walk-sticky"
          initial={{ y: 110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 110, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        >
          <button type="button" className="mx-walk-btn mx-walk-btn--green" onClick={scrollToOffers}>
            <span>Scegli ora il tuo pacchetto</span>
            <span className="mx-walk-btn__ic"><Footprints size={18} strokeWidth={2.4} /></span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function FirstWalk() {
  const [faqOpen, setFaqOpen] = useState(null)
  const { scrollYProgress } = useScroll()

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-page mx-walk">
        {/* Progress Bar */}
        <motion.div className="mx-walk-progress" style={{ scaleX: scrollYProgress }} />

        <HeroSection />
        <ProblemSection />
        <WhySection />
        <ExperienceSection />
        <WalkDetailsSection />
        <OfferSection />
        <FAQSection faqs={faqs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        <ClosingSection />
        <StickyPick />
      </div>
    </MotionConfig>
  )
}
