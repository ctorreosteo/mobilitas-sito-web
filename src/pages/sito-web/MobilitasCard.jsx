import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
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
  Star,
  CreditCard,
  Check,
  Phone,
  MessageCircle,
  RotateCcw,
} from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import { Counter, Kicker, MaskLines, Reveal } from '../../components/home-sections/HomeKit'
import { EASE, useParallax } from '../../components/home-sections/homeMotion'
import '../../styles/pages/card.css'

// Concetto: la tessera è l'oggetto protagonista. In apertura una card fisica che
// si inclina seguendo il dito/cursore con un riflesso che la attraversa; i modi per
// guadagnare punti si "timbrano" sulla card; i vantaggi stanno in un portafoglio.

const WHATSAPP_CARD =
  'https://wa.me/393518198457?text=Ciao%2C%20vorrei%20fare%20la%20tessera%20Mobilitas%20Card.%20Quando%20la%20posso%20fare%3F%20Grazie'

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

// ---------- La tessera fisica che si inclina ----------
const PhysicalCard = () => {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 140, damping: 16 })
  const sy = useSpring(py, { stiffness: 140, damping: 16 })
  const rotateY = useTransform(sx, [0, 1], [-18, 18])
  const rotateX = useTransform(sy, [0, 1], [14, -14])
  const shineX = useTransform(sx, [0, 1], ['0%', '100%'])
  const shineY = useTransform(sy, [0, 1], ['0%', '100%'])
  const glare = useTransform([shineX, shineY], ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.28), transparent 55%)`)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)))
    py.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)))
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className="mx-card-stage" onPointerMove={onMove} onPointerLeave={reset} onPointerUp={reset}>
      <motion.div
        className="mx-card-float"
        initial={{ opacity: 0, y: 80, rotateZ: -8 }}
        animate={{ opacity: 1, y: 0, rotateZ: -4 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
      >
        <motion.div className="mx-card-phys" style={{ rotateX, rotateY }} role="img" aria-label="Mobilitas Card, la tessera fedeltà">
          <svg className="mx-card-phys__waves" viewBox="0 0 400 250" preserveAspectRatio="none" aria-hidden="true">
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
          <span className="mx-card-phys__member">Member Card</span>
          <img className="mx-card-phys__logo" src="/card/web/logo-verde-900.png" alt="" />
          <span className="mx-card-phys__chip" aria-hidden="true" />
          <span className="mx-card-phys__program">Programma fedeltà</span>
          <motion.span className="mx-card-phys__glare" style={{ background: glare }} aria-hidden="true" />
          <span className="mx-card-phys__sweep" aria-hidden="true" />
        </motion.div>
        <span className="mx-card-phys__shadow" aria-hidden="true" />
      </motion.div>
    </div>
  )
}

// ---------- Tessera digitale (mock dell'app) ----------
const DigitalCard = ({ credits, level, levelIcon: LevelIcon, prizeLabel = 'Prossimo premio', prize, variant = 'gold', countUp = false }) => (
  <div className={`mx-card-digital mx-card-digital--${variant}`}>
    <div className="mx-card-digital__top">
      <span className="mx-card-digital__brand">Mobilitas</span>
      <span className="mx-card-digital__ico">
        <CreditCard size={16} />
      </span>
    </div>
    <span className="mx-card-digital__label">Crediti Attuali</span>
    <span className="mx-card-digital__credits">{countUp ? <Counter to={credits} /> : credits}</span>
    <div className="mx-card-digital__level">
      <div>
        <span className="mx-card-digital__label">Livello</span>
        <b>{level}</b>
      </div>
      <span className="mx-card-digital__badge">
        <LevelIcon size={26} />
      </span>
    </div>
    <div className="mx-card-digital__prize">
      <span className="mx-card-digital__label">{prizeLabel}</span>
      <b>{prize}</b>
    </div>
  </div>
)

// ---------- Timbri: i modi per guadagnare punti ----------
const StampBoard = () => {
  const [on, setOn] = useState([])
  const toggle = (i) => setOn((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]))
  const all = on.length === earnWays.length

  return (
    <div className="mx-card-stamps">
      <div className="mx-card-stamps__head">
        <h3 className="mx-h mx-h--md">Come guadagnare punti</h3>
        <p className="mx-small mx-card-stamps__hint">Tocca un'attività per timbrarla sulla tua card</p>
      </div>
      <div className="mx-card-stamps__buttons">
        <ul>
          {earnWays.map((w, i) => {
            const Icon = w.icon
            const active = on.includes(i)
            return (
              <li key={w.text}>
                <button type="button" className={`mx-card-way ${active ? 'is-on' : ''}`} aria-pressed={active} onClick={() => toggle(i)}>
                  <span className="mx-card-way__icon">
                    <Icon size={20} />
                  </span>
                  <span className="mx-card-way__text">{w.text}</span>
                  <span className="mx-card-way__tick">{active ? <Check size={16} strokeWidth={3} /> : '+'}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={`mx-card-board ${all ? 'is-full' : ''}`} aria-live="polite">
        <div className="mx-card-board__head">
          <img src="/card/web/logo-verde-900.png" alt="Mobilitas" />
          <span>
            {on.length}/{earnWays.length}
          </span>
        </div>
        <div className="mx-card-board__slots">
          {earnWays.map((w, i) => {
            const Icon = w.icon
            const active = on.includes(i)
            return (
              <span key={w.text} className={`mx-card-slot ${active ? 'is-on' : ''}`} title={w.text}>
                <motion.span
                  className="mx-card-slot__stamp"
                  initial={false}
                  animate={active ? { scale: 1, rotate: -8, opacity: 1 } : { scale: 1.8, rotate: 10, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Icon size={22} />
                </motion.span>
              </span>
            )
          })}
        </div>
        <div className="mx-card-board__bar">
          <motion.i animate={{ scaleX: on.length / earnWays.length }} transition={{ duration: 0.6, ease: EASE }} />
        </div>
        {on.length > 0 && (
          <button type="button" className="mx-card-board__reset" onClick={() => setOn([])}>
            <RotateCcw size={14} /> Azzera
          </button>
        )}
      </div>
    </div>
  )
}

const MobilitasCard = () => {
  const [pRef, pY] = useParallax(8)

  return (
    <PageShell className="mx-cardp">
      {/* Apertura: la tessera */}
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
              Trasforma ogni momento di benessere in <strong className="mx-accent">crediti preziosi</strong>. Un programma
              fedeltà che premia la tua dedizione alla salute.
            </motion.p>
            <motion.div
              className="mx-ctas mx-card-hero__ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            >
              <a className="mx-btn mx-btn--primary" href="#richiedi">
                <span>
                  <small>Mobilitas Card</small>
                  Richiedi la tua Card
                </span>
                <span className="mx-btn__icon">
                  <ArrowDown size={20} strokeWidth={2.4} />
                </span>
              </a>
            </motion.div>
          </div>

          <PhysicalCard />
        </div>
      </header>

      {/* 01 Cos'è */}
      <section className="mx-section mx-section--deep">
        <div className="mx-wrap">
          <div className="mx-card-what">
            <div>
              <Kicker n="01">Cos'è</Kicker>
              <h2 className="mx-h mx-h--lg">
                <MaskLines lines={[{ text: 'La tua tessera' }, { text: 'fedeltà digitale', className: 'mx-gradient' }]} />
              </h2>
              <Reveal>
                <p className="mx-lead mx-card-what__text">
                  Una tessera targata Mobilitas che ti permette di raccogliere punti per ogni trattamento o percorso che fai
                  nel nostro studio. Si possono guadagnare punti anche portando amici/parenti o partecipando ad eventi
                  specifici organizzati dal nostro studio.
                </p>
              </Reveal>
            </div>

            <Reveal className="mx-card-what__visual">
              <div className="mx-card-photo" ref={pRef}>
                <motion.div style={{ y: pY, height: '100%' }}>
                  <img
                    className="mx-parallax-img"
                    src="/card/web/card-1248.jpg"
                    srcSet="/card/web/card-800.jpg 800w, /card/web/card-1248.jpg 1248w"
                    sizes="(min-width: 1000px) 560px, 92vw"
                    alt="Mobilitas Card"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </div>
              <div className="mx-card-what__digital">
                <DigitalCard credits={2450} countUp level="Gold" levelIcon={Crown} prize="Trattamento omaggio" />
              </div>
            </Reveal>
          </div>

          <StampBoard />
        </div>
      </section>

      {/* 02 I vantaggi: il portafoglio */}
      <section className="mx-section mx-section--glow mx-card-wallet-sec">
        <div className="mx-wrap mx-card-wallet-grid">
          <div className="mx-card-wallet-intro">
            <Kicker n="02">I Vantaggi</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'I tuoi Credits' }, { text: 'ti sbloccano', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-card-wallet-intro__text">
                Accumula punti e accedi a vantaggi esclusivi pensati per il tuo benessere
              </p>
            </Reveal>
          </div>

          <ul className="mx-card-wallet">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <li key={b.title} className={`mx-card-pass mx-card-pass--${i + 1}`} style={{ '--i': i }}>
                  <div className="mx-card-pass__top">
                    <span className="mx-card-pass__icon">
                      <Icon size={24} />
                    </span>
                    <span className="mx-card-pass__n">0{i + 1}</span>
                  </div>
                  <h3 className="mx-h mx-h--md">{b.title}</h3>
                  <p className="mx-body">{b.description}</p>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mx-wrap">
          <h3 className="mx-h mx-h--md mx-card-stats-title">I numeri del programma</h3>
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
      </section>

      {/* 03 Come ottenerla */}
      <section className="mx-section mx-section--deep mx-card-get" id="richiedi">
        <div className="mx-wrap">
          <div className="mx-card-get__grid">
            <div>
              <Kicker n="03">Come Ottenerla</Kicker>
              <h2 className="mx-h mx-h--lg">
                <MaskLines lines={[{ text: 'Richiedi la tua' }, { text: 'Mobilitas Card', className: 'mx-gradient' }]} />
              </h2>
              <Reveal>
                <p className="mx-lead mx-card-get__text">
                  Vieni a trovarci nel nostro studio e richiedi la tua Mobilitas Card. Il nostro team ti spiegherà tutti i
                  dettagli del programma fedeltà e ti aiuterà a iniziare subito a guadagnare i tuoi primi punti.
                </p>
              </Reveal>

              <Reveal className="mx-card-bring">
                <h3 className="mx-h mx-h--sm">Cosa portare:</h3>
                <ul>
                  {toBring.map((t, i) => (
                    <li key={t}>
                      <span className="mx-card-bring__n">0{i + 1}</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mx-ctas mx-card-get__ctas">
                <a className="mx-btn mx-btn--primary" href={WHATSAPP_CARD} target="_blank" rel="noopener noreferrer">
                  <span>
                    <small>Mobilitas Card</small>
                    Scrivici su WhatsApp
                  </span>
                  <span className="mx-btn__icon">
                    <MessageCircle size={20} strokeWidth={2.4} />
                  </span>
                </a>
                <a className="mx-btn mx-btn--ghost" href="tel:393518198457">
                  <span>
                    <small>Telefono</small>
                    Chiamaci ora
                  </span>
                  <span className="mx-btn__icon">
                    <Phone size={20} strokeWidth={2.4} />
                  </span>
                </a>
              </Reveal>
            </div>

            <Reveal className="mx-card-get__visual" delay={0.1}>
              <DigitalCard variant="starter" credits={0} level="Starter" levelIcon={Star} prize="Inizia a guadagnare!" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Chiusura */}
      <section className="mx-final mx-card-final">
        <span className="mx-final__ring" aria-hidden="true" />
        <span className="mx-final__ring" aria-hidden="true" />
        <span className="mx-final__ring" aria-hidden="true" />
        <div className="mx-wrap">
          <Kicker>Non aspettare</Kicker>
          <h2 className="mx-h mx-h--xl">
            <MaskLines lines={[{ text: 'Inizia oggi il tuo' }, { text: 'percorso di', className: 'mx-outline' }, { text: 'benessere', className: 'mx-gradient' }]} />
          </h2>
          <Reveal>
            <p className="mx-lead" style={{ margin: '36px auto 0', maxWidth: 720 }}>
              Non aspettare. Vieni a richiedere la tua Mobilitas Card e inizia subito a guadagnare punti con ogni
              trattamento e percorso di benessere.
            </p>
          </Reveal>
          <div className="mx-ctas">
            <a className="mx-btn mx-btn--primary" href={WHATSAPP_CARD} target="_blank" rel="noopener noreferrer">
              <span>
                <small>Mobilitas Card</small>
                Richiedi la tua Card
              </span>
              <span className="mx-btn__icon">
                <ArrowUpRight size={20} strokeWidth={2.4} />
              </span>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

export default MobilitasCard
