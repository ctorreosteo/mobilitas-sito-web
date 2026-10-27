import { useEffect, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { Check, Phone, Mail } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import WhatsAppIcon from '../../components/whatsapp/WhatsAppIcon'
import { EASE } from '../../components/home-sections/homeMotion'
import CervDial from '../../components/cervicalgia/CervDial'
import RecensioniDolore from '../../components/recensioni-tag/RecensioniDolore'
import PrenotaVisita from '../../components/prenota-visita/PrenotaVisita'
import { leggiRichiesta } from '../../components/prenota-visita/richiestaSalvata'
import { doloreDi } from '../../data/dolori'
import { prenotataDi, whatsappConferma } from '../../components/prenota-visita/whatsappConferma'
import '../../styles/pages/cervicalgia.css'

// Conferma della campagna cervicalgia: il "raggio di rotazione" della landing
// si apre tutto e diventa verde, con la spunta al posto della testa.

const BURST = Array.from({ length: 12 }, (_, i) => -84 + i * (168 / 11))

export default function ThankYouCervicalgia() {
  const seal = useMotionValue(0)
  // Richiesta appena inviata dal form (senza, ad es. aprendo il link a mano, niente calendario).
  // Il dolore si nomina solo se la richiesta viene davvero dalla landing: altrimenti testo generico.
  const [richiesta] = useState(leggiRichiesta)
  const dolore = doloreDi(richiesta?.pageContext)
  const conCalendario = !!(richiesta?.id && richiesta?.token)
  const [prenotata, setPrenotata] = useState(() => prenotataDi(richiesta))
  // Con il calendario WhatsApp è l'aiuto secondario ("nessun orario va bene?"), non un'alternativa alla prenotazione
  const wa = whatsappConferma({ dolore, conCalendario, prenotata })
  const messaggioWhatsApp =
    wa?.messaggio ??
    (dolore
      ? `Ciao, ho appena inviato la richiesta ${dolore.per}. Quando mi richiamate?`
      : 'Ciao, ho appena inviato la richiesta per la prima visita / consulto. Quando mi richiamate?')

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead')
    }
  }, [])

  // Google Ads conversion tracking (lead on confirmation page)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-16532564533/0OVwCJWk4oscELXUq8s9',
      })
      console.log('Conversion tracked: LEAD - Cervicalgia')
    }
  }, [])

  useEffect(() => {
    const controls = animate(seal, 1, { duration: 1.8, ease: EASE, delay: 0.25 })
    return () => controls.stop()
  }, [seal])

  return (
    <PageShell className="mx-cerv">
      <section className="mx-cerv-ty">
        <div className="mx-wrap mx-cerv-ty__inner">
          {/* Sigillo: il collo libero */}
          <motion.div
            className="mx-cerv-ty__seal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <CervDial progress={seal} sweep={0} />
            {BURST.map((deg, i) => {
              const a = (deg * Math.PI) / 180
              const r = 46 + (i % 3) * 7
              return (
                <motion.span
                  key={deg}
                  className="mx-cerv-ty__burst"
                  aria-hidden="true"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                  animate={{
                    x: `${Math.sin(a) * r * 3.2}px`,
                    y: `${-Math.cos(a) * r * 3.2}px`,
                    opacity: [0, 1, 0],
                    scale: [0.4, 1.4, 0.6],
                  }}
                  transition={{ duration: 1.3, ease: 'easeOut', delay: 1.55 + (i % 4) * 0.04 }}
                />
              )
            })}
            <motion.span
              className="mx-cerv-ty__check"
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 1.45 }}
              aria-hidden="true"
            >
              <Check strokeWidth={3.4} />
            </motion.span>
          </motion.div>

          <motion.h1
            className="mx-h mx-cerv-ty__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
          >
            <span className="mx-accent">Richiesta ricevuta!</span>
          </motion.h1>

          {conCalendario && <PrenotaVisita richiesta={richiesta} dolore={dolore} onPrenotata={setPrenotata} />}

          <ol className="mx-cerv-ty__steps">
            <motion.li
              className="mx-cerv-ty__step is-done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            >
              <span className="mx-cerv-ty__node" aria-hidden="true">
                <Check size={22} strokeWidth={3} />
              </span>
              <p className="mx-lead mx-cerv-ty__lead mx-cerv-ty__body">
                La tua <strong>richiesta</strong>{dolore ? ` ${dolore.per}` : ''} è stata <strong className="is-green">registrata</strong>.{' '}
                {prenotata ? (
                  <>
                    La tua <strong>prima visita</strong> è prenotata: ti aspettiamo in studio.
                  </>
                ) : conCalendario ? (
                  <>
                    Scegli <strong>qui sopra</strong> giorno e ora: è il modo più veloce. Se non lo fai, ti chiamiamo noi al <strong>numero</strong> che ci hai indicato.
                  </>
                ) : (
                  <>
                    Ti contatteremo al <strong>numero</strong> che ci hai indicato.
                  </>
                )}
              </p>
            </motion.li>

            <motion.li
              className="mx-cerv-ty__step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            >
              <span className="mx-cerv-ty__node" aria-hidden="true">
                <Phone size={20} strokeWidth={2.4} />
              </span>
              <div className="mx-cerv-ty__contacts mx-cerv-ty__body">
                <a href="tel:+393518198457" className="mx-cerv-ty__contact">
                  <span>
                    <Phone size={16} />
                  </span>
                  +39 351 819 8457
                </a>
                <a href="mailto:studio@studiomobilitas.it" className="mx-cerv-ty__contact">
                  <span>
                    <Mail size={16} />
                  </span>
                  studio@studiomobilitas.it
                </a>
              </div>
            </motion.li>

            <motion.li
              className="mx-cerv-ty__step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
            >
              <span className="mx-cerv-ty__node" aria-hidden="true">
                <WhatsAppIcon size={22} />
              </span>
              <motion.a
                href={`https://wa.me/393518198457?text=${encodeURIComponent(messaggioWhatsApp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mx-cerv-ty__wa ${wa ? 'is-secondario' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {wa?.etichetta ?? "Scrivici su WhatsApp per saltare la lista d'attesa"}
                <span className="mx-cerv-ty__wa-icon">
                  <WhatsAppIcon size={22} />
                </span>
              </motion.a>
            </motion.li>
          </ol>
        </div>
      </section>

      {/* Recensioni dal gestionale: sul dolore cervicale se la richiesta viene dalla landing, a caso altrimenti */}
      <section className="mx-section mx-section--deep mx-cerv-ty__reviews">
        <RecensioniDolore dolore={dolore} />
      </section>
    </PageShell>
  )
}
