import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, Phone } from 'lucide-react'
import { EASE } from '../home-sections/homeMotion'
import './visita-ctas.css'

// Bottoni delle landing della prima visita (cervicalgia, osteopata Torino...): aprono il popup di prenotazione.
// Verde e animato sempre la prima visita a 49€; il consulto gratuito è il secondario, più piccolo.
export function VisitaCtas({ onVisita, onConsulto, className = '' }) {
  return (
    <div className={`mx-ctas mx-vc-ctas ${className}`}>
      <button type="button" className="mx-btn mx-btn--primary mx-vc-btn mx-vc-btn--main" onClick={onVisita}>
        <span className="mx-vc-btn__label">
          <small>
            Sconto prima visita · <s>90€</s> 49€
          </small>
          Prenota la prima visita
        </span>
        <span className="mx-btn__icon">
          <CalendarCheck size={20} strokeWidth={2.4} />
        </span>
      </button>
      <button type="button" className="mx-btn mx-btn--ghost mx-vc-btn mx-vc-btn--sub" onClick={onConsulto}>
        <span className="mx-vc-btn__label">Consulto telefonico gratuito</span>
        <span className="mx-btn__icon">
          <Phone size={18} strokeWidth={2.4} />
        </span>
      </button>
    </div>
  )
}

// Barra fissa in basso su telefono: la prenotazione sempre a portata di pollice (nascosta da 1024px)
export function VisitaDock({ visible, onVisita, onConsulto }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="mx-vc-dock"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <button
            type="button"
            className="mx-vc-dock__btn is-primary"
            onClick={onVisita}
            aria-label="Prenota la prima visita scontata a 49€ invece di 90€"
          >
            <span className="mx-vc-dock__price" aria-hidden="true">
              <s>90€</s>
              <b>49€</b>
            </span>
            <span className="mx-vc-dock__txt">
              <small>Prima visita</small>
              Prenota ora
            </span>
            <ArrowRight size={18} strokeWidth={2.6} className="mx-vc-dock__arrow" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="mx-vc-dock__btn is-ghost"
            onClick={onConsulto}
            aria-label="Prenota un consulto telefonico gratuito"
          >
            <Phone size={17} strokeWidth={2.4} />
            <small>Gratis</small>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
