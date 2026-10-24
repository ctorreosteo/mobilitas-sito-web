import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Footprints, Zap, Check, MessageCircle, Users } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import { Kicker, MaskLines, Reveal } from '../../components/home-sections/HomeKit'
import { EASE } from '../../components/home-sections/homeMotion'
import '../../styles/pages/fitness.css'

// Concetto: energia e ritmo. Linee di velocità, un metronomo che batte,
// Walk e Running come due pannelli opposti (lento / veloce), chiusura su verde pieno.

const WHATSAPP_FITNESS =
  'https://wa.me/393518198457?text=Ciao%21%20Sono%20interessato%20a%20Mobilitas%20Fitness%20Club.%20Vorrei%20saperne%20di%20più%20sulle%20attività%20proposte.%20Grazie'

const activities = [
  {
    key: 'walk',
    icon: Footprints,
    word: 'Walk',
    title: 'Mobilitas Walk',
    tempo: 'Ritmo lento',
    text: 'Camminate di gruppo per tutti i livelli. Un modo dolce e piacevole per muoversi, socializzare e godersi la natura insieme ad altre persone.',
    features: ['Per tutti i livelli di fitness', 'Ritmi naturali e rilassanti', 'Momenti di condivisione'],
  },
  {
    key: 'run',
    icon: Zap,
    word: 'Run',
    title: 'Mobilitas Running',
    tempo: 'Ritmo veloce',
    text: 'Gruppo di corsa per chi vuole sfidarsi e migliorare le proprie performance. Insieme si va più lontano e si superano i propri limiti.',
    features: ['Training progressivi', 'Obiettivi condivisi', 'Motivazione di gruppo'],
  },
]

const ribbonWords = ['Mobilitas Walk', 'Mobilitas Running', 'Movimento', 'Community', 'Stare insieme']

// Barre che battono come un metronomo (decorative)
const Beat = ({ bars = 12, className = '' }) => (
  <span className={`mx-fit-beat ${className}`} aria-hidden="true">
    {Array.from({ length: bars }, (_, i) => (
      <i key={i} style={{ animationDelay: `${(i % 6) * -0.12}s` }} />
    ))}
  </span>
)

const FitnessHero = () => {
  const { scrollY } = useScroll()
  const xA = useTransform(scrollY, [0, 700], [0, -160])
  const xB = useTransform(scrollY, [0, 700], [0, 120])

  return (
    <header className="mx-fit-hero">
      <div className="mx-fit-speed" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} style={{ top: `${8 + i * 10.5}%`, animationDelay: `${i * -0.37}s`, animationDuration: `${1.6 + (i % 3) * 0.55}s` }} />
        ))}
      </div>

      <div className="mx-wrap mx-fit-hero__inner">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
          <Kicker>Fitness Club</Kicker>
        </motion.div>

        <h1 className="mx-fit-hero__title">
          <motion.span className="mx-fit-hero__l1" style={{ x: xA }}>
            <MaskLines immediate delay={0.2} lines={[{ text: 'Mobilitas', className: 'mx-gradient' }]} />
          </motion.span>
          <motion.span className="mx-fit-hero__l2" style={{ x: xB }}>
            <MaskLines immediate delay={0.32} lines={[{ text: 'Fitness', className: 'mx-outline' }, { text: 'Club', className: 'mx-outline' }]} />
          </motion.span>
        </h1>

        <div className="mx-fit-hero__foot">
          <motion.p
            className="mx-lead mx-fit-hero__lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          >
            Una community di persone che amano <strong className="mx-accent">prendersi cura della propria salute e benessere</strong>{' '}
            attraverso attività fisiche condivise e momenti di connessione.
          </motion.p>

          <motion.div
            className="mx-fit-hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          >
            <a href="#activities" className="mx-btn mx-btn--primary">
              <span>
                <small>Walk · Running</small>
                Scopri le Attività
              </span>
              <span className="mx-btn__icon">
                <ArrowDown size={20} strokeWidth={2.4} />
              </span>
            </a>
            <Beat bars={16} className="mx-fit-hero__beat" />
          </motion.div>
        </div>
      </div>

      <div className="mx-ribbons mx-fit-ribbons" aria-hidden="true">
        <div className="mx-ribbon mx-ribbon--green">
          {[0, 1].map((copy) => (
            <div key={copy} className="mx-marquee" style={{ '--mx-speed': '26s' }}>
              {[...ribbonWords, ...ribbonWords].map((w, i) => (
                <span key={i} className="mx-ribbon__item">
                  {w}
                  <span className="mx-ribbon__dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

// "+" che ruota mentre scorri
const PlusSpin = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 180])
  return (
    <motion.span ref={ref} className="mx-fit-plus" style={{ rotate }} aria-hidden="true">
      +
    </motion.span>
  )
}

const ActivityPanel = ({ a, i }) => {
  const Icon = a.icon
  return (
    <Reveal as="article" delay={i * 0.1} className={`mx-fit-panel mx-fit-panel--${a.key}`}>
      <span className="mx-fit-panel__word" aria-hidden="true">{a.word}</span>
      <div className="mx-fit-panel__lines" aria-hidden="true">
        {Array.from({ length: 5 }, (_, k) => (
          <span key={k} style={{ top: `${18 + k * 15}%`, animationDelay: `${k * -0.5}s` }} />
        ))}
      </div>

      <div className="mx-fit-panel__head">
        <span className="mx-fit-panel__icon">
          <Icon size={28} strokeWidth={2.2} />
        </span>
        <span className="mx-fit-panel__tempo">
          <Beat bars={8} className={`mx-fit-beat--${a.key}`} />
          {a.tempo}
        </span>
      </div>

      <h3 className="mx-h mx-h--lg mx-fit-panel__title">{a.title}</h3>
      <p className="mx-body mx-fit-panel__text">{a.text}</p>

      <ul className="mx-fit-panel__list">
        {a.features.map((f) => (
          <li key={f}>
            <span className="mx-fit-panel__check">
              <Check size={16} strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

const MobilitasFitness = () => {
  return (
    <PageShell className="mx-fit">
      <FitnessHero />

      {/* Cos'è */}
      <section className="mx-section mx-section--deep">
        <div className="mx-wrap">
          <Kicker n="01">Cos'è</Kicker>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: 'Mobilitas' }, { text: 'Fitness Club', className: 'mx-gradient' }]} />
          </h2>

          <div className="mx-fit-what">
            <div className="mx-fit-what__statements">
              <Reveal className="mx-fit-statement">
                <span className="mx-fit-statement__icon">
                  <Users size={22} />
                </span>
                <p className="mx-body">
                  Insieme di attività proposte da noi per creare una <strong className="mx-accent">community di persone</strong>{' '}
                  che amano prendersi cura della propria salute e benessere.
                </p>
              </Reveal>
              <Reveal delay={0.08} className="mx-fit-statement">
                <span className="mx-fit-statement__icon">
                  <Footprints size={22} />
                </span>
                <p className="mx-body">
                  Un modo per <strong className="mx-accent">stare insieme</strong>, condividere momenti di movimento e
                  costruire relazioni significative attraverso l'attività fisica.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="mx-fit-equation">
              <h3 className="mx-fit-equation__title">
                <span>Movimento</span>
                <PlusSpin />
                <span className="mx-accent">Community</span>
              </h3>
              <p className="mx-body mx-fit-equation__text">
                Perché allenarsi da soli è noioso. Insieme è più divertente, motivante e sostenibile nel tempo.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Le attività */}
      <section id="activities" className="mx-section mx-section--glow mx-fit-activities">
        <div className="mx-wrap">
          <Kicker n="02">Le Nostre Attività</Kicker>
          <div className="mx-split" style={{ marginTop: 0, alignItems: 'end' }}>
            <h2 className="mx-h mx-h--xl">
              <MaskLines lines={[{ text: 'Due modi per' }, { text: 'muoverti' }, { text: 'insieme.', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead">
                Scegli l'attività che fa per te e unisciti alla nostra community di persone che vogliono stare bene divertendosi.
              </p>
            </Reveal>
          </div>

          <div className="mx-fit-panels">
            {activities.map((a, i) => (
              <ActivityPanel key={a.key} a={a} i={i} />
            ))}
            <span className="mx-fit-vs" aria-hidden="true">oppure</span>
          </div>
        </div>
      </section>

      {/* Chiusura su verde pieno */}
      <section className="mx-fit-final">
        <div className="mx-fit-final__track" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} style={{ animationDelay: `${i * -0.6}s` }} />
          ))}
        </div>
        <div className="mx-wrap mx-fit-final__inner">
          <Kicker>Unisciti alla community</Kicker>
          <h2 className="mx-h mx-h--xl mx-fit-final__title">
            <MaskLines lines={[{ text: 'Pronto a' }, { text: 'muoverti' }, { text: 'con noi?' }]} />
          </h2>
          <Reveal>
            <p className="mx-lead mx-fit-final__text">
              Unisciti alla community Mobilitas Fitness Club e scopri come l'attività fisica diventa più divertente e
              sostenibile quando la fai insieme ad altre persone.
            </p>
          </Reveal>
          <Reveal className="mx-ctas">
            <a className="mx-btn mx-fit-final__btn" href={WHATSAPP_FITNESS} target="_blank" rel="noopener noreferrer">
              <span className="mx-fit-final__btn-icon-l">
                <MessageCircle size={22} strokeWidth={2.4} />
              </span>
              <span>
                <small>Scrivici su WhatsApp</small>
                per maggiori informazioni
              </span>
              <span className="mx-btn__icon">
                <ArrowUpRight size={20} strokeWidth={2.4} />
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}

export default MobilitasFitness
