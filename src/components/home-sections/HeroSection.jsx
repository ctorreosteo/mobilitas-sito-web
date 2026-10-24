import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, CheckCircle } from 'lucide-react'
import { CtaPair, MaskLines, Photo, Snap } from './HomeKit'
import { EASE } from './homeMotion'

const benefits = [
  {
    title: 'Dolori e problemi',
    text: 'Elimina finalmente quei dolori che ti trascini da mesi o anni e che ti stanno rubando energia, movimento e libertà.',
  },
  {
    title: 'Energia',
    text: "Non è normale svegliarsi già stanchi. Ritrova la tua energia vera, ogni giorno, quella che ti permette di vivere, non solo sopravvivere.",
  },
  {
    title: 'Controllo totale',
    text: 'Riprendi il controllo del tuo corpo oggi e costruisci una vecchiaia senza farmaci, dipendenze o rimpianti.',
  },
]

const conditions = [
  { label: 'Mal di schiena', to: '/maldischiena' },
  { label: 'Cervicalgia', to: '/cervicalgia' },
  { label: 'Sciatalgia', to: '/sciatalgia' },
  { label: 'Emicrania', to: '/emicrania' },
  { label: 'Vertigini', to: '/vertigini' },
  { label: 'Bruxismo', to: '/bruxismo' },
  { label: 'Reflusso', to: '/reflusso' },
  { label: 'Fibromialgia', to: '/fibromialgia' },
  { label: 'Tunnel carpale', to: '/tunnel-carpale' },
  { label: 'Epicondilite', to: '/epicondilite' },
  { label: 'Colon irritabile', to: '/colon-irritabile' },
  { label: 'Ciclo doloroso', to: '/ciclo-doloroso' },
  { label: 'Menopausa', to: '/menopausa' },
]

const values = ['Metodo scientifico', 'Approccio personalizzato', 'Risultati misurabili', 'Un tocco, una trasformazione']

const fadeUp = (play, delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: play ? { opacity: 1, y: 0 } : undefined,
  transition: { duration: 1, ease: EASE, delay },
})

const Ribbon = ({ children, variant, speed, reverse }) => (
  <div className={`mx-ribbon mx-ribbon--${variant}`}>
    {[0, 1].map((copy) => (
      <div
        key={copy}
        className={`mx-marquee ${reverse ? 'mx-marquee--rev' : ''}`}
        style={{ '--mx-speed': speed }}
        aria-hidden={copy === 1 ? 'true' : undefined}
      >
        {children(copy === 1)}
      </div>
    ))}
  </div>
)

const HeroSection = ({ play = true }) => {
  const { scrollY } = useScroll()
  // Su schermi stretti la foto sta sopra i benefici: niente spostamento verticale
  const narrow = typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
  const photoY = useTransform(scrollY, [0, 800], [0, narrow ? 0 : 120])
  const photoScale = useTransform(scrollY, [0, 800], [1, 1.08])
  const copyY = useTransform(scrollY, [0, 800], [0, -60])

  const moveSpotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx-x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--mx-y', `${e.clientY - r.top}px`)
  }

  return (
    <>
      <section className="mx-hero" onMouseMove={moveSpotlight}>
        <div className="mx-aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mx-hero__grid-lines" aria-hidden="true" />
        <div className="mx-hero__spot" aria-hidden="true" />

        <div className="mx-wrap">
          <div className="mx-hero__layout">
            <motion.div style={{ y: copyY }}>
              <motion.p className="mx-kicker" {...fadeUp(play, 0.2)}>
                <span className="mx-kicker__bar" />
                Un tocco. Una trasformazione.
              </motion.p>

              <h1 className="mx-h mx-h--hero">
                <motion.span className="mx-hero__pre" {...fadeUp(play, 0.3)}>
                  Studio osteopatico specializzato
                </motion.span>
                <MaskLines
                  immediate
                  play={play}
                  delay={0.4}
                  lines={[
                    { text: 'Il più' },
                    { text: 'scelto', className: 'mx-gradient' },
                    { text: 'di Torino.', className: 'mx-outline' },
                  ]}
                />
              </h1>

              <motion.p className="mx-lead mx-hero__sub" {...fadeUp(play, 0.9)}>
                <strong>Riprendi il controllo sulla tua salute</strong> con un approccio scientifico e personalizzato che ti restituisce l'autonomia quotidiana.
              </motion.p>

              <motion.div {...fadeUp(play, 1.05)}>
                <CtaPair />
              </motion.div>

              <motion.div className="mx-trust" {...fadeUp(play, 1.2)}>
                <span className="mx-trust__item">
                  <span className="mx-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} />
                    ))}
                  </span>
                  5.0/5 su Google
                </span>
                <span className="mx-trust__item">
                  <CheckCircle size={16} />
                  Metodo scientifico
                </span>
                <span className="mx-trust__item">
                  <CheckCircle size={16} />
                  Risultati misurabili
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className="mx-arch"
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={play ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
            >
              <div className="mx-arch__halo" aria-hidden="true" />
              <motion.div className="mx-arch__frame" style={{ y: photoY }}>
                <motion.div style={{ scale: photoScale, height: '100%' }}>
                  <Photo
                    name="home7"
                    eager
                    sizes="(min-width: 1024px) 460px, 90vw"
                    alt="Osteopata Mobilitas durante un trattamento nello studio di Torino"
                  />
                </motion.div>
                <p className="mx-arch__caption">Approccio scientifico e personalizzato</p>
              </motion.div>

              <div className="mx-stamp" aria-hidden="true">
                <svg viewBox="0 0 132 132">
                  <defs>
                    <path id="mx-stamp-circle" d="M66,66 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
                  </defs>
                  <text>
                    <textPath href="#mx-stamp-circle">Un tocco · Una trasformazione · </textPath>
                  </text>
                </svg>
                <img src="/pittogramma.png" alt="" />
              </div>

              <motion.div
                className="mx-chip mx-chip--a"
                initial={{ opacity: 0, x: -30 }}
                animate={play ? { opacity: 1, x: 0, y: [0, -10, 0] } : undefined}
                transition={{ opacity: { delay: 1.2, duration: 0.8 }, x: { delay: 1.2, duration: 0.8, ease: EASE }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
              >
                <span className="mx-chip__num">4000+</span>
                <span className="mx-chip__txt">
                  <b>Pazienti</b>
                  soddisfatti
                </span>
              </motion.div>

              <motion.div
                className="mx-chip mx-chip--b"
                initial={{ opacity: 0, x: 30 }}
                animate={play ? { opacity: 1, x: 0, y: [0, 10, 0] } : undefined}
                transition={{ opacity: { delay: 1.4, duration: 0.8 }, x: { delay: 1.4, duration: 0.8, ease: EASE }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
              >
                <span className="mx-chip__num">98%</span>
                <span className="mx-chip__txt">
                  <b>Tasso di successo</b>
                  100% specializzati
                </span>
              </motion.div>
            </motion.div>
          </div>

          <Snap className="mx-benefits">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="mx-benefit"
                initial={{ opacity: 0, y: 30 }}
                animate={play ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 1, ease: EASE, delay: 1.3 + i * 0.12 }}
              >
                <span className="mx-benefit__n">0{i + 1}</span>
                <h3 className="mx-h mx-h--sm">{b.title}</h3>
                <p className="mx-body">{b.text}</p>
              </motion.div>
            ))}
          </Snap>

          <div className="mx-scrollhint">
            <span className="mx-scrollhint__line" />
            Scorri: la colonna si riallinea
          </div>
        </div>
      </section>

      <div className="mx-ribbons">
        <Ribbon variant="line" speed="60s" reverse>
          {(hidden) =>
            [...values, ...values].map((v, i) => (
              <span key={i} className="mx-ribbon__item" aria-hidden={hidden || undefined}>
                {v}
                <span className="mx-ribbon__dot" />
              </span>
            ))
          }
        </Ribbon>
        <Ribbon variant="green" speed="55s">
          {(hidden) =>
            conditions.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="mx-ribbon__item"
                tabIndex={hidden ? -1 : undefined}
              >
                {c.label}
                <span className="mx-ribbon__dot" />
              </Link>
            ))
          }
        </Ribbon>
      </div>
    </>
  )
}

export default HeroSection
