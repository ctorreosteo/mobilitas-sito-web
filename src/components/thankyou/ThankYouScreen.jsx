import { MotionConfig, motion } from 'framer-motion'
import { Check, Clock, Mail, Phone } from 'lucide-react'
import WhatsAppIcon from '../whatsapp/WhatsAppIcon'
import { EASE } from '../home-sections/homeMotion'
import '../../styles/mx.css'
import '../../styles/pages/thankyou.css'

// Schermata di conferma condivisa da /conferma e /conferma-richiesta: ci arriva chi ha compilato un form, non chi ha pagato.
// Il tracciamento (fbq Lead) resta nelle singole pagine.

const fade = (delay, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
})

// Coriandoli a forma di vertebra che esplodono dal segno di spunta
const BITS = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2 + (i % 2 ? 0.12 : -0.08)
  const dist = 92 + (i % 3) * 34
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist * 0.9,
    r: (angle * 180) / Math.PI + 90,
    c: ['#72fa93', '#38bdf8', '#f4f4f4'][i % 3],
    w: i % 3 === 2 ? 6 : 8,
    h: i % 3 === 0 ? 18 : 12,
  }
})

const Burst = () => (
  <div className="mx-ty-burst" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={`r${i}`}
        className="mx-ty-burst__ring"
        initial={{ scale: 0.6, opacity: 0.7 }}
        animate={{ scale: 2.6, opacity: 0 }}
        transition={{ duration: 2.2, ease: 'easeOut', delay: 0.5 + i * 0.35, repeat: 2, repeatDelay: 1.4 }}
      />
    ))}
    {BITS.map((b, i) => (
      <motion.i
        key={i}
        style={{ background: b.c, width: b.w, height: b.h }}
        initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
        animate={{ x: b.x, y: b.y, scale: 1, rotate: b.r, opacity: [1, 1, 0] }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.45 + (i % 4) * 0.03, opacity: { duration: 1.9, delay: 0.5, times: [0, 0.6, 1] } }}
      />
    ))}
    <motion.span
      className="mx-ty-burst__core"
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 13, delay: 0.1 }}
    >
      <svg viewBox="0 0 48 48">
        <motion.path
          d="M13 25 L21 33 L36 16"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
        />
      </svg>
    </motion.span>
  </div>
)

// children: blocco facoltativo sotto il messaggio iniziale (es. il calendario della prima visita).
// Con il calendario WhatsApp diventa il bottone secondario: l'azione principale è prenotare.
// waEtichetta: testo del bottone WhatsApp (vedi prenota-visita/whatsappConferma.js).
// recensioni: sezione a tutta larghezza in fondo alla pagina.
const ThankYouScreen = ({ subtitle, registered, confirmItem, timeItem, onWhatsApp, waEtichetta, children, recensioni }) => (
  <MotionConfig reducedMotion="user">
    <div className="mx-page mx-ty">
      <div className="mx-ty__glow" aria-hidden="true" />
      {/* Header e footer arrivano dal Layout del sito (App.jsx): qui niente logo e niente <main> */}
      <div className="mx-ty__wrap">
        {/* Success */}
        <Burst />

        <motion.h1 className="mx-h mx-ty__title" {...fade(0.25)}>
          GRAZIE!
        </motion.h1>

        <motion.h2 className="mx-ty__subtitle" {...fade(0.4)}>
          {subtitle}
        </motion.h2>

        <motion.p className="mx-ty__registered" {...fade(0.5)}>
          {registered}
        </motion.p>

        {children}

        {/* WhatsApp Button */}
        <motion.div className="mx-ty__cta" {...fade(0.6)}>
          <button type="button" className={`mx-btn ${children ? 'mx-btn--ghost' : 'mx-btn--primary'} mx-ty__wa`} onClick={onWhatsApp}>
            <span>{waEtichetta ?? 'Scrivici su Whatsapp per velocizzare'}</span>
            <span className="mx-btn__icon">
              <WhatsAppIcon size={22} />
            </span>
          </button>
        </motion.div>

        {/* Prossimi passi */}
        <motion.section className="mx-ty-next" {...fade(0.75)}>
          <div className="mx-ty-next__head">
            <span className="mx-ty-next__clock"><Clock size={20} strokeWidth={2.4} /></span>
            <h3 className="mx-h mx-ty-next__title">
              Prossimi Passi
            </h3>
          </div>

          <p className="mx-ty-next__lead">
            <strong>Entro 24 ore lavorative</strong> la nostra segretaria ti contatterà per:
          </p>

          <ul className="mx-ty-next__list">
            {[confirmItem, 'Fornirti tutte le informazioni necessarie', timeItem].map((t, i) => (
              <li key={i}>
                <span className="mx-ty-next__n"><Check size={14} strokeWidth={3.2} /></span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {/* Contact Info */}
          <div className="mx-ty-next__contacts">
            <a href="tel:+393518198457" className="mx-ty-chip">
              <Phone size={18} />
              <span>+39 3518198457</span>
            </a>
            <a href="mailto:studio@studiomobilitas.it" className="mx-ty-chip">
              <Mail size={18} />
              <span>studio@studiomobilitas.it</span>
            </a>
          </div>
        </motion.section>

        {/* Additional Info */}
        <motion.div className="mx-ty-tip" {...fade(0.9)}>
          <p>
            💡 <strong>Consiglio:</strong> tieni il telefono a portata di mano, ti chiamiamo noi. E salva in rubrica il nostro numero +39 351 819 8457: così puoi scriverci su WhatsApp quando vuoi.
          </p>
        </motion.div>
      </div>
      {recensioni && <section className="mx-ty__reviews">{recensioni}</section>}
    </div>
  </MotionConfig>
)

export default ThankYouScreen
