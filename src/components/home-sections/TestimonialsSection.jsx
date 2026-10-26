import React from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'
import { RECENSIONI_IMAGES } from '../../data/recensioni'
import { RECENSIONI_TOTALI } from '../../data/studi'
import GoogleReviewsLinks from '../GoogleReviewsLinks'
import { Counter, Kicker, MaskLines, Photo, Reveal } from './HomeKit'
import { EASE, useParallax } from './homeMotion'

const stats = [
  { to: 4000, suffix: '+', label: 'Pazienti soddisfatti' },
  { to: 98, suffix: '%', label: 'Tasso di successo' },
  { to: 85, suffix: '%', label: 'Riduzione farmaci' },
  { to: 3, suffix: ' anni', label: 'Media durata risultati' },
]

const half = Math.ceil(RECENSIONI_IMAGES.length / 2)
const reviewRows = [RECENSIONI_IMAGES.slice(0, half), RECENSIONI_IMAGES.slice(half)]

const ReviewRow = ({ images, reverse, speed }) => (
  <div className="mx-reviews__row">
    {[0, 1].map((copy) => (
      <div
        key={copy}
        className={`mx-marquee ${reverse ? 'mx-marquee--rev' : ''}`}
        style={{ '--mx-speed': speed }}
        aria-hidden={copy === 1 ? 'true' : undefined}
      >
        {images.map((src, i) => (
          <div key={src} className="mx-review" style={{ '--mx-tilt': `${((i % 3) - 1) * 1.5}deg` }}>
            <img src={src} alt={copy === 0 ? `Recensione Google ${i + 1}` : ''} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
    ))}
  </div>
)

const steps = [
  {
    title: 'Non sai se possiamo esserti di aiuto?',
    text: 'Un consulto gratuito per capire come possiamo aiutarti a raggiungere i tuoi obiettivi di salute e benessere.',
    cta: 'Prenota un consulto gratuito',
  },
  {
    title: 'Inizia la trasformazione',
    text: 'Il tuo percorso personalizzato con un primo trattamento con sconto speciale. Un investimento nella tua salute di oggi e futura.',
    cta: 'Prima visita con sconto',
  },
  {
    title: 'Raggiungi i tuoi obiettivi',
    text: 'Unisciti alle centinaia di persone che hanno già trasformato la loro vita. La tua storia di successo inizia oggi.',
  },
]

const TestimonialsSection = () => {
  const [photoRef, photoY] = useParallax(8)

  return (
    <section className="mx-section mx-section--glow">
      <div className="mx-wrap">
        <Kicker n="04">Storie di trasformazione</Kicker>
        <div className="mx-split" style={{ marginTop: 0, alignItems: 'end' }}>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: 'Non siamo solo' }, { text: 'numeri,' }, { text: 'siamo storie.', className: 'mx-gradient' }]} />
          </h2>
          <Reveal>
            <p className="mx-lead">
              Ogni persona che entra da noi ha una storia. <strong>Scopri le storie di chi ha scelto di riprendere il controllo.</strong>
            </p>
          </Reveal>
        </div>

        <div className="mx-stats">
          {stats.map((s) => (
            <div key={s.label} className="mx-stat">
              <span className="mx-stat__num">
                <Counter to={s.to} suffix={s.suffix} />
              </span>
              <span className="mx-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="mx-google">
          <Reveal className="mx-google__score">
            <span className="mx-google__big">
              <Counter to={5} decimals={1} />
            </span>
            <span className="mx-google__meta">
              <span className="mx-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </span>
              <span className="mx-body mx-small" style={{ display: 'block', marginTop: 8 }}>
                su Google · oltre {RECENSIONI_TOTALI} storie vere
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mx-h mx-h--md">Leggi le storie vere dei nostri clienti</h3>
            <p className="mx-body" style={{ marginTop: 14, maxWidth: 620 }}>
              Non credere solo alle nostre parole. <strong>Leggi le recensioni autentiche</strong> di chi ha già scelto di riprendere il controllo della propria salute su Google.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-reviews">
        <ReviewRow images={reviewRows[0]} speed="160s" />
        <ReviewRow images={reviewRows[1]} speed="180s" reverse />
      </div>

      <div className="mx-wrap">
        <Reveal className="mx-reviews__cta">
          <p className="mx-body">Leggi tutte le recensioni dei nostri due studi su Google</p>
          <GoogleReviewsLinks align="center" />
        </Reveal>

        <div style={{ marginTop: 'clamp(110px, 14vw, 200px)' }}>
          <Kicker>Il teatro della trasformazione</Kicker>
          <div className="mx-split" style={{ marginTop: 0, alignItems: 'center' }}>
            <div>
              <h3 className="mx-h mx-h--lg">
                <MaskLines lines={[{ text: 'La tua storia' }, { text: 'inizia qui.', className: 'mx-outline' }]} />
              </h3>
              <Reveal>
                <p className="mx-body" style={{ marginTop: 28 }}>
                  Il trattamento osteopatico diventa il teatro in cui possiamo educare le persone e condurle a prendere nuove scelte, per vivere ogni singolo giorno in salute. Ogni grande cambiamento inizia con un primo passo. Nel teatro della trasformazione, <span className="mx-accent"><strong style={{ color: 'inherit' }}>scegli il tuo percorso verso la libertà.</strong></span>
                </p>
              </Reveal>
            </div>
            <Reveal>
              <div ref={photoRef} style={{ borderRadius: 32, overflow: 'hidden', aspectRatio: '4 / 3.2' }}>
                <motion.div style={{ y: photoY, height: '100%' }}>
                  <Photo
                    name="home5"
                    className="mx-parallax-img"
                    sizes="(min-width: 900px) 600px, 100vw"
                    alt="Il trattamento osteopatico diventa il teatro della trasformazione"
                  />
                </motion.div>
              </div>
            </Reveal>
          </div>

          <div className="mx-journey">
            <div className="mx-journey__track" aria-hidden="true">
              <motion.i
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                transition={{ duration: 1.8, ease: EASE }}
              />
            </div>
            {steps.map((step, i) => (
              <Reveal key={step.title} className="mx-step" delay={0.2 + i * 0.25}>
                <span className="mx-step__dot">0{i + 1}</span>
                <h4 className="mx-h mx-h--sm">{step.title}</h4>
                <p className="mx-body">{step.text}</p>
                {step.cta ? (
                  <a className="mx-link" href="/contatti">
                    {step.cta}
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <p className="mx-body" style={{ marginTop: 20 }}>
                    <span className="mx-stars" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={16} />
                      ))}
                    </span>
                    <strong>5.0/5</strong> · <span className="mx-accent">oltre {RECENSIONI_TOTALI} persone</span> hanno raccontato come la loro vita sia cambiata con il nostro aiuto
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
