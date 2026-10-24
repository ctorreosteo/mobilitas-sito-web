import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import BookingPopup from '../BookingPopup'
import { Reveal } from '../home-sections/HomeKit'
import { EASE } from '../home-sections/homeMotion'

const baseFeatures = [
  "Camminata guidata con osteopati",
  "Merenda al sacco fornita da noi",
  "Esercizi di respirazione e stretching",
  "Accesso al gruppo riservato su WhatsApp",
  "Foto e riprese dell'evento in omaggio"
]

export default function OfferSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState('')

  const handlePackageSelection = (packageType) => {
    setSelectedPackage(packageType)
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setSelectedPackage('')
  }

  return (
    <section id="offer-section" className="mx-walk-sec mx-walk-offer">
      <div className="mx-walk-offer__stars" aria-hidden="true" />
      <div className="mx-wrap">
        <Reveal className="mx-walk-head mx-walk-head--center">
          <h2 className="mx-h mx-walk-h2 mx-walk-h2--light">
            Un'offerta <span className="mx-accent">SPECIALE</span>
            <br />
            riservata solo a chi è già nostro cliente
          </h2>
          <p className="mx-walk-lead mx-walk-lead--light">
            Per questa prima edizione della Mobilitas Walk, abbiamo riservato ai nostri pazienti due pacchetti esclusivi,
            pensati per farti vivere l'esperienza nel modo che preferisci.
          </p>
        </Reveal>

        <div className="mx-walk-passes">
          {/* Base */}
          <motion.article
            className="mx-walk-pass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="mx-walk-pass__top">
              <h3 className="mx-h mx-walk-pass__name">🎫 PACCHETTO BASE</h3>
              <div className="mx-walk-pass__price">
                <s>20€</s>
                {" "}
                <b>5€</b>
              </div>
              <p className="mx-walk-pass__tag">La tua prima esperienza Mobilitas Walk</p>
            </div>

            <div className="mx-walk-pass__perf" aria-hidden="true" />

            <ul className="mx-walk-pass__list">
              {baseFeatures.map((feature) => (
                <li key={feature}><Check size={18} strokeWidth={3} /><span>{feature}</span></li>
              ))}
            </ul>

            <p className="mx-walk-pass__for">Per chi vuole solo iniziare, senza impegno. Ma con qualità Mobilitas.</p>
            <motion.button
              type="button"
              onClick={() => handlePackageSelection('base')}
              className="mx-walk-pass__btn"
              whileTap={{ scale: 0.97 }}
            >
              <span>🎫</span>
              <span>Scegli Pacchetto Base</span>
              <ArrowRight size={20} strokeWidth={2.4} />
            </motion.button>
          </motion.article>

          {/* Premium */}
          <motion.article
            className="mx-walk-pass mx-walk-pass--premium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <span className="mx-walk-pass__badge">Il più scelto</span>
            <div className="mx-walk-pass__top">
              <h3 className="mx-h mx-walk-pass__name">🌟 PACCHETTO PREMIUM</h3>
              <div className="mx-walk-pass__price">
                <s>140€</s>
                {" "}
                <b>39€</b>
              </div>
              <p className="mx-walk-pass__tag mx-walk-pass__tag--it">Il pacchetto più scelto dai nostri pazienti!</p>
            </div>

            <div className="mx-walk-pass__perf" aria-hidden="true" />

            <ul className="mx-walk-pass__list">
              <li><Check size={18} strokeWidth={3} /><span>Tutto quello che è incluso nel Pacchetto Base</span></li>
              <li>
                <Check size={18} strokeWidth={3} />
                <span>
                  1 seduta di pressoterapia in studio a prezzo ridotto (
                  <s>60€</s>
                  {" "}
                  <b>34€</b>
                  )
                </span>
              </li>
              <li>
                <Check size={18} strokeWidth={3} />
                <span>
                  1 seduta di pressoterapia in omaggio (
                  <s>60€</s>
                  {" "}
                  <b>0€</b>
                  )
                </span>
              </li>
            </ul>

            <p className="mx-walk-pass__warn">⚠️ Solo 20 pacchetti disponibili con questo prezzo!</p>
            <p className="mx-walk-pass__for">Pensato per chi vuole continuare a sentirsi bene anche dopo la camminata.</p>
            <motion.button
              type="button"
              onClick={() => handlePackageSelection('premium')}
              className="mx-walk-pass__btn mx-walk-pass__btn--premium"
              whileTap={{ scale: 0.97 }}
            >
              <span>⭐</span>
              <span>Scegli Pacchetto Premium</span>
              <ArrowRight size={20} strokeWidth={2.4} />
            </motion.button>
          </motion.article>
        </div>
      </div>

      {/* Booking Popup */}
      <BookingPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        packageType={selectedPackage}
      />
    </section>
  )
}
