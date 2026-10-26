import { motion } from 'framer-motion'
import { HelpCircle, ArrowUp } from 'lucide-react'
import LandingAccordion from '../landing-kit/LandingAccordion'
import { Reveal } from '../home-sections/HomeKit'

export default function FAQSection({ faqs, faqOpen, setFaqOpen }) {
  return (
    <section className="mx-walk-sec mx-walk-faq">
      <div className="mx-wrap mx-walk-faq__grid">
        <Reveal className="mx-walk-head">
          <span className="mx-walk-faq__ic"><HelpCircle size={28} strokeWidth={2.2} /></span>
          <h2 className="mx-h mx-walk-h2">
            Hai ancora qualche dubbio?
          </h2>
          <p className="mx-walk-lead">Abbiamo le risposte che cerchi</p>
        </Reveal>

        <LandingAccordion
          items={faqs.map((f) => ({ q: f.q, a: f.a }))}
          open={faqOpen}
          onToggle={setFaqOpen}
          className="mx-walk-acc mx-acc--noicon"
        />

        <div className="mx-walk-faq__cta">
          <motion.button
            type="button"
            onClick={() => {
              const offerSection = document.getElementById('offer-section');
              if (offerSection) {
                offerSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="mx-walk-btn"
            whileTap={{ scale: 0.97 }}
          >
            <span>Scegli ora il tuo pacchetto</span>
            <span className="mx-walk-btn__ic"><ArrowUp size={20} strokeWidth={2.4} /></span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
