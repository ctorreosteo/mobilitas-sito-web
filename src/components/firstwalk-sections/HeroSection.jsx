import { motion } from 'framer-motion'
import { Users, Utensils, Heart, Gift, Star, ChevronDown, Clock, ArrowDown } from 'lucide-react'
import { EASE } from '../home-sections/homeMotion'

// Curve di livello disegnate a mano: la "carta" su cui corre il sentiero
const CONTOURS = [
  'M-20 120 C 80 60, 160 160, 260 110 S 420 40, 520 120',
  'M-20 170 C 90 110, 170 210, 270 160 S 430 90, 520 170',
  'M-20 225 C 100 165, 180 260, 280 215 S 440 145, 520 225',
  'M-20 285 C 110 230, 190 315, 290 275 S 450 205, 520 285',
  'M-20 350 C 120 300, 200 375, 300 340 S 460 270, 520 350',
  'M-20 420 C 130 375, 210 440, 310 410 S 470 340, 520 420',
  'M-20 495 C 140 455, 220 510, 320 485 S 480 415, 520 495',
  'M-20 575 C 150 540, 230 585, 330 565 S 490 495, 520 575',
]

const TRAIL = 'M30 600 C 90 540, 60 470, 140 440 S 260 430, 250 350 S 330 250, 420 230 S 470 140, 470 80'

export default function HeroSection() {
  const scrollToOffers = () => {
    const offersSection = document.getElementById('offer-section');
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mx-walk-hero" id="walk-hero">
      <svg className="mx-walk-hero__map" viewBox="0 0 500 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {CONTOURS.map((d, i) => (
          <path key={i} d={d} className="mx-walk-contour" />
        ))}
        <motion.path
          d={TRAIL}
          className="mx-walk-trail"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, ease: EASE, delay: 0.4 }}
        />
        <circle cx="30" cy="600" r="9" className="mx-walk-pin mx-walk-pin--start" />
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 2.8 }}
          style={{ transformOrigin: '470px 80px' }}
        >
          <circle cx="470" cy="80" r="14" className="mx-walk-pin" />
          <circle cx="470" cy="80" r="5" fill="#002552" />
        </motion.g>
      </svg>

      <div className="mx-wrap mx-walk-hero__inner">
        <motion.p
          className="mx-walk-badge"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Star size={14} strokeWidth={2.4} />
          Solo per pazienti Mobilitas
        </motion.p>

        <h1 className="mx-h mx-walk-hero__title">
          <span className="mx-mask">
            <motion.span initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}>
              MOBILITAS
            </motion.span>
          </span>
          <span className="mx-mask">
            <motion.span initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}>
              1<sup>st</sup> WALK
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="mx-walk-hero__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        >
          Il tuo primo passo verso una nuova energia
        </motion.p>

        <motion.div
          className="mx-walk-date"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
        >
          <span className="mx-walk-date__day">
            <Clock size={18} strokeWidth={2.4} />
            <span>4 OTTOBRE 2025</span>
          </span>
          <span className="mx-walk-date__sep" aria-hidden="true">•</span>
          <span className="mx-walk-date__deal">PACCHETTO PREMIUM IN OFFERTA SOLO PER 20 PERSONE</span>
        </motion.div>

        <motion.div
          className="mx-walk-hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
        >
          <motion.button type="button" onClick={scrollToOffers} className="mx-walk-btn" whileTap={{ scale: 0.97 }}>
            <span>Scegli ora il tuo pacchetto</span>
            <span className="mx-walk-btn__ic"><ArrowDown size={20} strokeWidth={2.4} /></span>
          </motion.button>
        </motion.div>

        <motion.p
          className="mx-walk-hero__desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
        >
          Unisciti a noi per una camminata rigenerante nella natura, pensata per risvegliare il corpo e liberare la mente.
          <br />
          <b>È un'esperienza esclusiva riservata ai pazienti Mobilitas.</b>
        </motion.p>

        <ul className="mx-walk-feats">
          {[
            { icon: Users, text: "Camminata guidata con il Team Mobilitas" },
            { icon: Utensils, text: "Merenda inclusa" },
            { icon: Heart, text: "Esperienza per il tuo benessere e la tua salute" },
            { icon: Gift, text: "Offerta speciale solo per pazienti" }
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.li
                key={feature.text}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.75 + index * 0.08 }}
              >
                <span className="mx-walk-feats__ic"><Icon size={20} strokeWidth={2.2} /></span>
                <span>{feature.text}</span>
              </motion.li>
            )
          })}
        </ul>

        <div className="mx-walk-hero__hint">
          <ChevronDown size={18} strokeWidth={2.4} />
          <span>Scorri per scoprire</span>
        </div>
      </div>
    </section>
  )
}
