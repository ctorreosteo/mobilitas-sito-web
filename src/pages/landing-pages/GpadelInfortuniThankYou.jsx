import { motion } from 'framer-motion'
import { Check, Mail, ShieldCheck } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PageShell from '../../components/site/PageShell'
import WhatsAppIcon from '../../components/whatsapp/WhatsAppIcon'
import { EASE } from '../../components/home-sections/homeMotion'
import GuideBook from '../../components/gpadel/GuideBook'
import '../../styles/pages/gpadel-lm.css'

const PHOTO = '/landing-pages/web/lm-gpadel-foto1'

const fade = (delay, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
})

const benefits = [
  {
    title: 'Risoluzione dei dolori acuti o cronici',
    text: ' che ti porti dietro da tempo, senza magari neanche accorgertene perché ti ci sei abituato',
  },
  {
    title: 'Prevenzione degli infortuni più comuni',
    text: ' nel padel: riduce il rischio di lesioni a spalla, gomito e caviglia attraverso il riequilibrio posturale e la mobilità articolare',
  },
  {
    title: 'Recupero più rapido dopo le partite',
    text: ': migliora la circolazione e riduce l\'accumulo di tensioni muscolari, permettendoti di giocare più spesso senza dolori',
  },
  {
    title: 'Miglioramento delle performance',
    text: ': ottimizza la postura e la coordinazione, rendendo i tuoi movimenti più fluidi e potenti',
  },
  {
    title: 'Gestione del carico di gioco',
    text: ': aiuta il corpo a gestire meglio lo stress ripetitivo tipico del padel, prevenendo sovraccarichi e infiammazioni',
  },
]

export default function GpadelInfortuniThankYou() {
  const handleRequestTreatment = () => {
    // Navigate to contact page or open WhatsApp
    const message = encodeURIComponent("Ciao, dopo aver richiesto la guida gratuita per gli infortuni nel padel, vorrei prenotare il trattamento osteopatico scontato a 39€ per GPADEL. Quando avete posto? Grazie!");
    window.open(`https://wa.me/393518198457?text=${message}`, '_blank');
  }

  return (
    <>
      <Header />
      <PageShell className="mx-gpl mx-gpl-ty">
        {/* SUCCESSO: punto vinto, la guida è in arrivo */}
        <section className="mx-gpl-ty__hero">
          <div className="mx-gpl-arena mx-gpl-arena--soft" aria-hidden="true">
            <span className="mx-gpl-arena__light mx-gpl-arena__light--l" />
            <span className="mx-gpl-arena__light mx-gpl-arena__light--r" />
            <div className="mx-gpl-arena__glass" />
          </div>

          <div className="mx-wrap mx-gpl-ty__grid">
            <div className="mx-gpl-ty__copy">
              <div className="mx-gpl-ty__titlerow">
                <motion.span
                  className="mx-gpl-ty__seal"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 64 64">
                    <motion.circle
                      cx="32" cy="32" r="29"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                    />
                    <motion.path
                      d="M20 33 L28.5 41.5 L45 24"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.55, ease: EASE, delay: 0.95 }}
                    />
                  </svg>
                </motion.span>

                {/* Title */}
                <motion.h1 className="mx-h mx-gpl-ty__title" {...fade(0.2)}>
                  Richiesta inviata con successo!
                </motion.h1>
              </div>

              {/* Description: i passaggi, uno dopo l'altro */}
              <ol className="mx-gpl-steps">
                <motion.li className="mx-gpl-step is-done" {...fade(0.45, 16)}>
                  <span className="mx-gpl-step__dot"><Check size={16} strokeWidth={3} /></span>
                  <p>
                    La tua richiesta è stata registrata correttamente nel nostro sistema.
                  </p>
                </motion.li>
                <motion.li className="mx-gpl-step is-now" {...fade(0.6, 16)}>
                  <span className="mx-gpl-step__dot"><ShieldCheck size={16} strokeWidth={2.4} /></span>
                  <p>
                    La nostra segreteria farà un <strong>controllo manuale</strong> per verificare che si tratti di una richiesta vera.
                  </p>
                </motion.li>
                <motion.li className="mx-gpl-step" {...fade(0.75, 16)}>
                  <span className="mx-gpl-step__dot"><Mail size={16} strokeWidth={2.4} /></span>
                  <p>
                    Dopo la verifica, ti invieremo la <strong>guida gratuita via email</strong> entro 48 ore lavorative.
                  </p>
                </motion.li>
              </ol>
            </div>

            <motion.div
              className="mx-gpl-ty__visual"
              initial={{ opacity: 0, y: 40, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
              aria-hidden="true"
            >
              <GuideBook sizes="(min-width: 1024px) 300px, 1px" alt="" />
              <span className="mx-gpl-ty__badge"><Mail size={28} strokeWidth={2.4} /></span>
            </motion.div>
          </div>
        </section>

        {/* NEL FRATTEMPO: lo sconto GPADEL */}
        <section className="mx-section mx-gpl-ty__offer">
          <div className="mx-wrap">
            <motion.div
              className="mx-gpl-deal"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 1, ease: EASE }}
            >
              <div className="mx-gpl-deal__body">
                <h2 className="mx-h mx-h--lg mx-gpl-deal__title">
                  Nel frattempo...
                </h2>

                <p className="mx-gpl-deal__intro">
                  Se ti fa piacere, puoi usufruire della <strong className="mx-gpl-deal__hl">scontistica GPADEL</strong>
                </p>

                <div className="mx-gpl-deal__price">
                  <span className="mx-gpl-deal__old">90€</span>
                  <span className="mx-gpl-deal__new">39€</span>
                </div>

                <p className="mx-gpl-deal__what">
                  Per un nostro trattamento osteopatico specializzato
                </p>

                <button
                  type="button"
                  onClick={handleRequestTreatment}
                  className="mx-btn mx-btn--primary mx-gpl-deal__cta"
                >
                  <span>Richiedi il trattamento scontato</span>
                  <span className="mx-btn__icon">
                    <WhatsAppIcon size={20} />
                  </span>
                </button>
              </div>

              <div className="mx-gpl-deal__photo">
                <img
                  src={`${PHOTO}-1600.jpg`}
                  srcSet={`${PHOTO}-900.jpg 900w, ${PHOTO}-1600.jpg 1600w`}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  alt="Trattamento osteopatico per padelisti"
                  width="1600"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

            {/* Benefits */}
            <div className="mx-gpl-ty__benefits">
              <h3 className="mx-h mx-h--md">
                I benefici del trattamento osteopatico per chi pratica Padel anche amatoriale)
              </h3>

              <ol className="mx-gpl-blist">
                {benefits.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                    transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
                  >
                    <span className="mx-gpl-blist__n">{i + 1}</span>
                    <p>
                      <strong>{b.title}</strong>{b.text}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Contact Info */}
            <p className="mx-gpl-ty__contact">
              Hai domande? Contattaci al <a href="tel:+393518198457"><strong>+39 3518198457</strong></a> o via email a <a href="mailto:studio@studiomobilitas.it"><strong>studio@studiomobilitas.it</strong></a>
            </p>
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  )
}
