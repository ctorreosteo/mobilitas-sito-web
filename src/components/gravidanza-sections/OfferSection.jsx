import { motion } from 'framer-motion'
import { CheckCircle, Calendar, Baby } from 'lucide-react'
import { useState } from 'react'
import BookingPopup from './BookingPopup'
import { RECENSIONI_TOTALI } from '../../data/studi'
import GoogleReviewsLinks from '../GoogleReviewsLinks'
import { EASE } from '../home-sections/homeMotion'
import { MaskLines } from '../home-sections/HomeKit'

// Le stesse fasce del campo "Settimana di gravidanza" del modulo di prenotazione
const WEEK_OPTIONS = [
  { value: '1-4', label: '1-4 settimane' },
  { value: '5-8', label: '5-8 settimane' },
  { value: '9-12', label: '9-12 settimane' },
  { value: '13-16', label: '13-16 settimane' },
  { value: '17-20', label: '17-20 settimane' },
  { value: '21-24', label: '21-24 settimane' },
  { value: '25-28', label: '25-28 settimane' },
  { value: '29-32', label: '29-32 settimane' },
  { value: '33-36', label: '33-36 settimane' },
  { value: '37-40', label: '37-40 settimane' },
]

// Anello delle 40 settimane: dieci archi, si riempie fino alla fascia scelta.
function WeekRing({ index }) {
  const R = 74
  const C = 2 * Math.PI * R
  const seg = C / 10
  const gap = 6
  return (
    <svg className="mx-grav-ring__svg" viewBox="0 0 180 180" aria-hidden="true">
      <defs>
        <linearGradient id="mx-grav-ring-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#72fa93" />
        </linearGradient>
      </defs>
      <g transform="rotate(-90 90 90)">
        {WEEK_OPTIONS.map((w, i) => (
          <circle
            key={w.value}
            cx="90"
            cy="90"
            r={R}
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            stroke={i <= index ? 'url(#mx-grav-ring-g)' : 'rgba(0, 37, 82, 0.09)'}
            strokeDasharray={`${seg - gap} ${C - seg + gap}`}
            strokeDashoffset={-i * seg}
            style={{ transition: `stroke 0.4s ${i * 0.04}s` }}
          />
        ))}
      </g>
    </svg>
  )
}

export default function OfferSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [week, setWeek] = useState('')

  const handleBookingClick = () => {
    setIsPopupOpen(true)
  };

  // Ottieni il nome del mese corrente
  const getCurrentMonthName = () => {
    const months = [
      'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
      'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
    ];
    const today = new Date();
    return months[today.getMonth()];
  };

  const currentMonth = getCurrentMonthName();
  const weekIndex = WEEK_OPTIONS.findIndex((w) => w.value === week)

  return (
    <section id="offer-section" className="mx-grav-sec mx-grav-offer">
      <div className="mx-grav-offer__bg" aria-hidden="true" />
      <div className="mx-wrap">
        <h2 className="mx-h mx-grav-offer__title">
          <MaskLines
            lines={[
              { text: 'LA NOSTRA OFFERTA' },
              { text: `DI ${currentMonth.toUpperCase()} PER TE`, className: 'mx-grav-soft' },
            ]}
          />
        </h2>

        <div className="mx-grav-offer__grid">
          <motion.article
            className="mx-grav-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <span className="mx-grav-card__chip">⚠️ Ultimi posti rimasti</span>

            <h3 className="mx-h mx-grav-card__name">Trattamento Osteopatico per la Gravidanza</h3>

            <div className="mx-grav-price">
              <s>€90</s>
              <b>€69</b>
            </div>

            <p className="mx-grav-card__intro">Il trattamento di un'ora è composto da:</p>
            <ul className="mx-grav-card__list">
              {[
                "Anamnesi generale approfondita per la gravidanza",
                "Trattamento Osteopatico specializzato per la gravidanza",
                "Consigli per il benessere di mamma e bambino"
              ].map((item) => (
                <li key={item}>
                  <CheckCircle size={18} strokeWidth={2.4} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mx-grav-reviews">
              <p>
                Il nostro Studio Mobilitas ha oltre {RECENSIONI_TOTALI} recensioni Google con storie meravigliose sui nostri trattamenti
              </p>
              <GoogleReviewsLinks align="center" variant="light" />
            </div>
          </motion.article>

          <motion.div
            className="mx-grav-ring"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          >
            <p className="mx-grav-ring__label" id="mx-grav-week-label">Settimana di gravidanza</p>

            <div className="mx-grav-ring__stage">
              <WeekRing index={weekIndex} />
              <div className="mx-grav-ring__core">
                <motion.span
                  key={week || 'none'}
                  className="mx-grav-ring__baby"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                >
                  <Baby size={30} strokeWidth={2} />
                </motion.span>
                <b>{weekIndex >= 0 ? WEEK_OPTIONS[weekIndex].label : '1–40'}</b>
              </div>
            </div>

            <div className="mx-grav-weeks" role="radiogroup" aria-labelledby="mx-grav-week-label">
              {WEEK_OPTIONS.map((w) => (
                <button
                  key={w.value}
                  type="button"
                  role="radio"
                  aria-checked={week === w.value}
                  className={week === w.value ? 'is-on' : ''}
                  onClick={() => setWeek(week === w.value ? '' : w.value)}
                >
                  {w.value}
                </button>
              ))}
            </div>

            <motion.button
              type="button"
              onClick={handleBookingClick}
              className="mx-grav-btn mx-grav-btn--full"
              whileTap={{ scale: 0.97 }}
            >
              <Calendar size={20} strokeWidth={2.4} />
              <span>PRENOTA ORA CON SCONTO</span>
            </motion.button>

            <p className="mx-grav-ring__note">
              Dopo che compili il form, la nostra segretaria ti chiamerà per confermare l'appuntamento. Siamo aperti anche il sabato! 🤱
            </p>
          </motion.div>
        </div>

        <div className="mx-grav-limit">
          <p>⚡ Offerta limitata SOLO per QUESTO MESE - Fino ad esaurimento posti</p>
        </div>
      </div>

      {/* Booking Popup */}
      <BookingPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        initialWeek={week}
      />
    </section>
  )
}
