import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowUp,
  ArrowRight,
  Stethoscope,
  HeartPulse,
  ScanLine,
  PartyPopper,
  Users,
  Gift,
  Search,
  Zap,
  Crown,
  Backpack,
  Phone,
  RefreshCw,
  Store,
  Coins,
  Sparkles,
  Check,
} from 'lucide-react'
import WhatsAppIcon from '../../components/whatsapp/WhatsAppIcon'
import PageShell from '../../components/site/PageShell'
import { Counter, Kicker, MaskLines, Reveal, Snap } from '../../components/home-sections/HomeKit'
import { EASE, useParallax } from '../../components/home-sections/homeMotion'
import '../../styles/pages/card.css'

// Concetto: "la tua card, col tuo nome". In apertura scrivi il tuo nome e lo vedi
// inciso sulla tessera, che si inclina col dito/cursore e si gira per mostrare i
// vantaggi; il nome torna nella chiusura e nel messaggio WhatsApp di richiesta.

const WHATSAPP_NUMBER = '393518198457'
const PHONE_HREF = 'tel:+393518198457'
const NAME_MAX = 22

const whatsappCardUrl = (name) => {
  const intro = name ? `Ciao, sono ${name}, vorrei` : 'Ciao, vorrei'
  const text = `${intro} fare la tessera Mobilitas Card. Quando la posso fare? Grazie`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

const earnWays = [
  { icon: Stethoscope, text: 'Trattamenti osteopatici' },
  { icon: HeartPulse, text: 'Percorsi di benessere' },
  { icon: ScanLine, text: 'Check posturali' },
  { icon: PartyPopper, text: 'Partecipazione a eventi' },
  { icon: Users, text: 'Inviti ad amici e parenti' },
]

const benefits = [
  { icon: Gift, title: 'Trattamenti Omaggio', description: 'Usa i tuoi Credits per accedere a trattamenti osteopatici completamente gratuiti' },
  { icon: Search, title: 'Check Gratuiti', description: 'Check posturali periodici gratuiti per monitorare il tuo benessere' },
  { icon: PartyPopper, title: 'Eventi Riservati', description: 'Accesso esclusivo a workshop, seminari e eventi speciali' },
  { icon: Zap, title: 'Posti Prioritari', description: "Priorità nelle liste d'attesa per prenotazioni immediate" },
  { icon: Crown, title: 'Sessioni VIP', description: 'Trattamenti esclusivi con osteopati senior e specialisti' },
  { icon: Backpack, title: 'Premi Fisici', description: 'Magliette premium, zaino Mobilitas Walkers e altri gadget esclusivi' },
]

const toBring = ['Documento di identità', 'Tessera sanitaria', 'Numero di telefono e email']

// ---------- SEO ----------
const useCardSeo = () => {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Mobilitas Card | Programma fedeltà dello Studio Osteopatico Mobilitas Torino'

    const setMeta = (attr, key, content) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const description =
      'Mobilitas Card: il programma fedeltà dello Studio Osteopatico Mobilitas di Torino. Raccogli crediti con trattamenti, percorsi, check posturali, eventi e inviti, e sbloccali in trattamenti omaggio, check gratuiti, eventi riservati e premi.'
    const pageUrl = `${window.location.origin}/carta-fedelta`

    setMeta('name', 'description', description)
    setMeta('name', 'robots', 'index, follow')
    setMeta('property', 'og:title', 'Mobilitas Card | Programma fedeltà Mobilitas')
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', pageUrl)
    setMeta('property', 'og:site_name', 'Mobilitas – Studio Osteopatico Torino')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', pageUrl)

    return () => {
      document.title = previousTitle
    }
  }, [])
}

// ---------- La tessera: si inclina, si gira, porta il tuo nome ----------
// onFlip assente: card solo decorativa (niente bottone)
const MemberCard = ({ name, flipped = false, onFlip, size = 'hero' }) => {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 140, damping: 16 })
  const sy = useSpring(py, { stiffness: 140, damping: 16 })
  const rotateY = useTransform(sx, [0, 1], [-16, 16])
  const rotateX = useTransform(sy, [0, 1], [12, -12])
  const glare = useTransform([sx, sy], ([x, y]) => `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.3), transparent 55%)`)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)))
    py.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)))
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  const shownName = name || 'Il tuo nome'
  const Face = onFlip ? 'button' : 'span'
  const faceProps = onFlip
    ? {
        type: 'button',
        onClick: onFlip,
        'aria-label': flipped ? 'Mostra il fronte della card' : 'Gira la card per vedere i vantaggi',
        'aria-pressed': flipped,
      }
    : { 'aria-hidden': true }

  return (
    <div className={`mx-cc mx-cc--${size}`} onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div className="mx-cc__tilt" style={{ rotateX, rotateY }}>
        <Face className={`mx-cc__flip ${flipped ? 'is-flipped' : ''}`} {...faceProps}>
          {/* Fronte */}
          <span className="mx-cc__face mx-cc__front" aria-hidden={flipped}>
            <svg className="mx-cc__waves" viewBox="0 0 400 250" preserveAspectRatio="none" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <path
                  key={i}
                  d={`M -20 ${150 + i * 4} C 80 ${40 + i * 9}, 180 ${250 - i * 6}, 260 ${110 + i * 5} S 380 ${60 + i * 7}, 430 ${120 + i * 3}`}
                  fill="none"
                  stroke="rgba(114,250,147,0.5)"
                  strokeWidth="0.6"
                />
              ))}
            </svg>
            <span className="mx-cc__chip" />
            <span className="mx-cc__member">Member Card</span>
            <img className="mx-cc__logo" src="/card/web/logo-verde-900.png" alt="" />
            <span className={`mx-cc__name ${name ? '' : 'is-placeholder'}`}>{shownName}</span>
            <span className="mx-cc__program">Programma fedeltà</span>
            <motion.span className="mx-cc__glare" style={{ background: glare }} />
            <span className="mx-cc__sweep" />
          </span>

          {/* Retro: i vantaggi */}
          <span className="mx-cc__face mx-cc__back" aria-hidden={!flipped}>
            <span className="mx-cc__stripe" />
            <span className="mx-cc__back-title">I tuoi vantaggi</span>
            <span className="mx-cc__perks">
              {benefits.map((b) => {
                const Icon = b.icon
                return (
                  <span key={b.title} className="mx-cc__perk">
                    <Icon size={16} />
                    {b.title}
                  </span>
                )
              })}
            </span>
            <span className="mx-cc__signature">
              <small>Firma</small>
              <i>{shownName}</i>
            </span>
            <img className="mx-cc__mark" src="/pittogramma.png" alt="" />
          </span>
        </Face>
      </motion.div>
      <span className="mx-cc__shadow" aria-hidden="true" />
    </div>
  )
}

// ---------- Come funziona: una moneta-credito percorre i tre passi ----------
const HowItWorks = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })
  const along = useTransform(progress, [0, 1], ['0%', '100%'])
  const fill = useTransform(progress, [0, 1], [0, 1])

  const steps = [
    {
      icon: Store,
      title: 'Richiedila in studio',
      body: <p className="mx-body">Vieni a trovarci nel nostro studio e richiedi la tua Mobilitas Card.</p>,
    },
    {
      icon: Coins,
      title: 'Accumula crediti',
      body: (
        <ul className="mx-card-ways">
          {earnWays.map((w) => {
            const Icon = w.icon
            return (
              <li key={w.text}>
                <Icon size={16} />
                {w.text}
              </li>
            )
          })}
        </ul>
      ),
    },
    {
      icon: Sparkles,
      title: 'Sblocca i vantaggi',
      body: (
        <>
          <p className="mx-body">Accumula punti e accedi a vantaggi esclusivi pensati per il tuo benessere</p>
          <a className="mx-link mx-card-steps__link" href="#vantaggi">
            Scopri i vantaggi
            <ArrowRight size={16} />
          </a>
        </>
      ),
    },
  ]

  return (
    <div className="mx-card-steps" ref={ref}>
      <div className="mx-card-steps__track" aria-hidden="true">
        <motion.i className="mx-card-steps__fill" style={{ '--p': fill }} />
        <motion.span className="mx-card-steps__coin" style={{ '--along': along }}>
          <Coins size={18} strokeWidth={2.4} />
        </motion.span>
      </div>
      <ol className="mx-card-steps__list">
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <Reveal as="li" key={s.title} className="mx-card-step" delay={i * 0.12}>
              <span className="mx-card-step__dot">
                <Icon size={22} />
              </span>
              <span className="mx-card-step__n">0{i + 1}</span>
              <h3 className="mx-h mx-h--sm">{s.title}</h3>
              {s.body}
            </Reveal>
          )
        })}
      </ol>
    </div>
  )
}

const MobilitasCard = () => {
  useCardSeo()
  const [name, setName] = useState('')
  const [flipped, setFlipped] = useState(false)
  const [pRef, pY] = useParallax(8)

  const cleanName = name.trim()
  const requestUrl = whatsappCardUrl(cleanName)

  return (
    <PageShell className="mx-cardp">
      {/* Apertura: la tua card, col tuo nome */}
      <header className="mx-card-hero">
        <div className="mx-aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mx-wrap mx-card-hero__grid">
          <div className="mx-card-hero__copy">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
              <Kicker>Programma fedeltà</Kicker>
            </motion.div>
            <h1 className="mx-h mx-card-hero__title">
              <MaskLines immediate delay={0.2} lines={[{ text: 'Mobilitas', className: 'mx-gradient' }, { text: 'Card.' }]} />
            </h1>
            <motion.p
              className="mx-lead mx-card-hero__lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            >
              Trasforma ogni momento di benessere in <strong className="mx-accent">crediti preziosi</strong>. Un programma fedeltà
              che premia la tua dedizione alla salute.
            </motion.p>
          </div>

          <motion.div
            className="mx-card-hero__stage"
            initial={{ opacity: 0, y: 70, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          >
            <MemberCard name={cleanName} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
            <button type="button" className="mx-card-fliphint" onClick={() => setFlipped((f) => !f)}>
              <RefreshCw size={15} />
              {flipped ? 'Torna al fronte' : 'Tocca la card per girarla'}
            </button>
          </motion.div>

          <motion.form
            className="mx-card-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            onSubmit={(e) => {
              e.preventDefault()
              window.open(requestUrl, '_blank')
            }}
          >
            <label className="mx-card-name__label" htmlFor="mx-card-name-input">
              Scrivi il tuo nome e guarda la tua card
            </label>
            <div className="mx-card-name__row">
              <input
                id="mx-card-name-input"
                className="mx-card-name__input"
                type="text"
                value={name}
                maxLength={NAME_MAX}
                autoComplete="name"
                placeholder="Es. Giulia Rossi"
                onChange={(e) => {
                  setName(e.target.value)
                  setFlipped(false)
                }}
              />
              <button type="submit" className="mx-btn mx-btn--primary mx-card-name__cta">
                <span>
                  <small>Su WhatsApp</small>
                  Richiedi la tua Card
                </span>
                <span className="mx-btn__icon">
                  <WhatsAppIcon size={20} strokeWidth={2.4} />
                </span>
              </button>
            </div>
            <p className="mx-card-name__note">Il nome resta sul tuo dispositivo: lo usiamo solo nel messaggio WhatsApp, se decidi di inviarlo.</p>
          </motion.form>
        </div>
      </header>

      {/* 01 Cos'è */}
      <section className="mx-section mx-section--deep">
        <div className="mx-wrap mx-card-what">
          <div>
            <Kicker n="01">Cos'è</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'La tua tessera' }, { text: 'fedeltà digitale', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-card-what__text">
                Una tessera targata Mobilitas che ti permette di raccogliere punti per ogni trattamento o percorso che fai nel
                nostro studio. Si possono guadagnare punti anche portando amici/parenti o partecipando ad eventi specifici
                organizzati dal nostro studio.
              </p>
            </Reveal>
          </div>
          <Reveal className="mx-card-photo" ref={pRef}>
            <motion.div style={{ y: pY, height: '100%' }}>
              <img
                className="mx-parallax-img"
                src="/card/web/card-1248.jpg"
                srcSet="/card/web/card-800.jpg 800w, /card/web/card-1248.jpg 1248w"
                sizes="(min-width: 1000px) 560px, 92vw"
                alt="La Mobilitas Card in mano"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* 02 Come funziona */}
      <section className="mx-section mx-section--glow">
        <div className="mx-wrap">
          <Kicker n="02">Come funziona</Kicker>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: 'Come guadagnare' }, { text: 'punti.', className: 'mx-outline' }]} />
          </h2>
          <HowItWorks />
        </div>
      </section>

      {/* 03 I vantaggi */}
      <section className="mx-section mx-section--deep" id="vantaggi">
        <div className="mx-wrap">
          <div className="mx-split" style={{ marginTop: 0, alignItems: 'end' }}>
            <div>
              <Kicker n="03">I Vantaggi</Kicker>
              <h2 className="mx-h mx-h--lg">
                <MaskLines lines={[{ text: 'I tuoi Credits' }, { text: 'ti sbloccano', className: 'mx-gradient' }]} />
              </h2>
            </div>
            <Reveal>
              <p className="mx-lead">Accumula punti e accedi a vantaggi esclusivi pensati per il tuo benessere</p>
            </Reveal>
          </div>

          <Snap as="ul" className="mx-card-tickets">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <Reveal as="li" key={b.title} className={`mx-card-ticket ${i === benefits.length - 1 ? 'is-featured' : ''}`} delay={(i % 3) * 0.08}>
                  <span className="mx-card-ticket__stub">
                    <span className="mx-card-ticket__n">0{i + 1}</span>
                    <Icon size={26} />
                  </span>
                  <span className="mx-card-ticket__body">
                    <h3 className="mx-h mx-h--sm">{b.title}</h3>
                    <p className="mx-body">{b.description}</p>
                  </span>
                </Reveal>
              )
            })}
          </Snap>

          <div className="mx-card-numbers">
            <h3 className="mx-h mx-h--sm">I numeri del programma</h3>
            <div className="mx-stats mx-card-stats">
              <div className="mx-stat">
                <span className="mx-stat__num">
                  <Counter to={500} suffix="+" />
                </span>
                <span className="mx-stat__label">Crediti guadagnati al mese</span>
              </div>
              <div className="mx-stat">
                <span className="mx-stat__num">
                  <Counter to={95} suffix="%" />
                </span>
                <span className="mx-stat__label">Soddisfazione clienti</span>
              </div>
              <div className="mx-stat">
                <span className="mx-stat__num">
                  24<em>/7</em>
                </span>
                <span className="mx-stat__label">Accesso ai vantaggi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Richiedila: il nome torna qui */}
      <section className="mx-section mx-section--glow mx-card-get" id="richiedi">
        <div className="mx-wrap mx-card-get__grid">
          <div>
            <Kicker n="04">Come Ottenerla</Kicker>
            <h2 className="mx-h mx-h--lg">
              {cleanName ? (
                <>
                  Ti aspettiamo,
                  <br />
                  <span className="mx-gradient mx-card-get__name">{cleanName}.</span>
                </>
              ) : (
                <MaskLines lines={[{ text: 'Richiedi la tua' }, { text: 'Mobilitas Card', className: 'mx-gradient' }]} />
              )}
            </h2>
            <Reveal>
              <p className="mx-lead mx-card-get__text">
                Vieni a trovarci nel nostro studio e richiedi la tua Mobilitas Card. Il nostro team ti spiegherà tutti i dettagli del
                programma fedeltà e ti aiuterà a iniziare subito a guadagnare i tuoi primi punti.
              </p>
            </Reveal>

            <Reveal className="mx-card-bring">
              <h3 className="mx-h mx-h--sm">Cosa portare:</h3>
              <ul>
                {toBring.map((t) => (
                  <li key={t}>
                    <span className="mx-card-bring__tick">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mx-ctas mx-card-get__ctas">
              <a className="mx-btn mx-btn--primary" href={requestUrl} target="_blank" rel="noopener noreferrer">
                <span>
                  <small>Mobilitas Card</small>
                  Scrivici su WhatsApp
                </span>
                <span className="mx-btn__icon">
                  <WhatsAppIcon size={20} strokeWidth={2.4} />
                </span>
              </a>
              <a className="mx-btn mx-btn--ghost" href={PHONE_HREF}>
                <span>
                  <small>Telefono</small>
                  Chiamaci ora
                </span>
                <span className="mx-btn__icon">
                  <Phone size={20} strokeWidth={2.4} />
                </span>
              </a>
            </Reveal>

            <Reveal>
              <p className="mx-body mx-card-get__closing">
                Non aspettare. Vieni a richiedere la tua Mobilitas Card e inizia subito a guadagnare punti con ogni trattamento e
                percorso di benessere.
              </p>
            </Reveal>
          </div>

          <Reveal className="mx-card-get__visual" delay={0.1}>
            <MemberCard name={cleanName} size="small" />
            {!cleanName && (
              <a className="mx-link mx-card-get__personalize" href="#mx-card-name-input">
                <ArrowUp size={16} />
                Mettici il tuo nome
              </a>
            )}
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}

export default MobilitasCard
