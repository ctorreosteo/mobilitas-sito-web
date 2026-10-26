import { motion } from 'framer-motion'
import { Heart, Users, Star, ArrowRight, Sparkles } from 'lucide-react'
import { Reveal } from '../home-sections/HomeKit'
import { EASE } from '../home-sections/homeMotion'

export default function ClosingSection() {
  const scrollToOffers = () => {
    const offersSection = document.getElementById('offer-section');
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mx-walk-sec mx-walk-close">
      <div className="mx-wrap mx-walk-close__inner">
        <Reveal>
          <h2 className="mx-h mx-walk-close__title">
            <span className="mx-walk-close__line">Mobilitas 1<sup>st</sup> Walk</span>
            <span className="mx-walk-close__line mx-walk-mark mx-walk-mark--sky">E vogliamo che tu ci sia.</span>
          </h2>
        </Reveal>

        <div className="mx-walk-close__msgs">
          <Reveal className="mx-walk-close__msg">
            <span className="mx-walk-close__ic"><Heart size={22} strokeWidth={2.2} /></span>
            <p>
              Mobilitas Walk non è solo una camminata. È il nostro modo di continuare a prenderci cura di te,
              fuori dallo studio, con lo stesso impegno e la stessa attenzione di sempre.
            </p>
          </Reveal>
          <Reveal className="mx-walk-close__msg" delay={0.08}>
            <span className="mx-walk-close__ic"><Users size={22} strokeWidth={2.2} /></span>
            <p>
              Se sei già stato nostro paziente, sai cosa intendiamo. E ora vogliamo offrirti un'occasione nuova:
              stare meglio, muoverti, respirare… e farlo insieme.
            </p>
          </Reveal>
        </div>

        <div className="mx-walk-close__box">
          <span className="mx-walk-close__star"><Star size={24} strokeWidth={2.2} /></span>
          {['Sarà il primo evento di tanti.', 'Ma questa prima edizione non tornerà mai più.', 'Per questo sarà un bel ricordo partecipare insieme!'].map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.18 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <div className="mx-walk-close__sign">
          <p><Sparkles size={18} /> <span>Ci vediamo alla camminata,</span></p>
          <p className="mx-walk-close__team">Il team Mobilitas</p>
        </div>

        <motion.button type="button" onClick={scrollToOffers} className="mx-walk-btn mx-walk-btn--green" whileTap={{ scale: 0.97 }}>
          <span>Unisciti a noi</span>
          <span className="mx-walk-btn__ic"><ArrowRight size={20} strokeWidth={2.4} /></span>
        </motion.button>
      </div>
    </section>
  )
}
