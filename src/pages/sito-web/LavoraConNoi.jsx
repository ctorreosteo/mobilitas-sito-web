import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Coins,
  MapPin,
  Rocket,
  Zap,
} from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import FinalCta from '../../components/site/FinalCta'
import { Kicker, MaskLines, Reveal, ScrollWords, Snap } from '../../components/home-sections/HomeKit'
import { EASE, trackSpotlight, useParallax } from '../../components/home-sections/homeMotion'
import '../../styles/pages/lavora-con-noi.css'

const jobRoles = [
  {
    id: 'osteopata_tirocinante',
    title: 'Osteopata Tirocinante',
    type: 'Tirocinio',
    location: 'In presenza',
    image: '/lavori/osteo_tirocinante.png',
    status: 'open'
  },
  {
    id: 'osteopata_junior',
    title: 'Osteopata Junior',
    type: 'Partita iva',
    location: 'In presenza',
    image: '/lavori/osteo_junior.png',
    status: 'open'
  },
  {
    id: 'osteopata_senior',
    title: 'Osteopata Senior',
    type: 'Partita iva',
    location: 'In presenza',
    image: '/lavori/osteo_senior.png',
    status: 'closed'
  },
  {
    id: 'osteopata_leader',
    title: 'Osteopata Team Leader o Manager',
    type: 'Assunzione',
    location: 'In presenza',
    image: '/lavori/osteo_leader.png',
    status: 'closed'
  },
  {
    id: 'nutrizionista',
    title: 'Nutrizionista',
    type: 'Assunzione',
    location: 'In presenza',
    image: '/lavori/nutrizionista.png',
    status: 'open'
  },
  {
    id: 'segretaria',
    title: 'Segretaria Generale',
    type: 'Assunzione',
    location: 'In presenza',
    image: '/lavori/segretaria.png',
    status: 'closed'
  },
  {
    id: 'commerciale',
    title: 'Commerciale',
    type: 'Partita iva',
    location: 'In presenza',
    image: '/lavori/commerciale.png',
    status: 'closed'
  },
  {
    id: 'pilates',
    title: 'Istruttore Pilates',
    type: 'Partita iva',
    location: 'In presenza',
    image: '/lavori/pilates.png',
    status: 'closed'
  },
  {
    id: 'personal-trainer',
    title: 'Personal Trainer',
    type: 'Partita iva',
    location: 'In presenza',
    image: '/lavori/pt.png',
    status: 'closed'
  },
  {
    id: 'video-maker',
    title: 'Video Maker',
    type: 'Partita iva',
    location: 'In presenza',
    image: '/lavori/video_maker.jpg',
    status: 'closed'
  },
  {
    id: 'social-media-manager',
    title: 'Social Media Manager',
    type: 'Partita iva',
    location: 'In presenza',
    image: '/lavori/smm.png',
    status: 'closed'
  },
  {
    id: 'marketer-full-stack',
    title: 'Marketer Full Stack',
    type: 'Partita iva',
    location: 'In presenza',
    image: '/lavori/marketer.png',
    status: 'closed'
  }
]

const culture = [
  {
    title: 'Team giovane e collaborativo',
    description:
      "Clima meraviglioso, atmosfera familiare e supporto reciproco reale. La collaborazione e l'innovazione sono al centro di tutto.",
  },
  {
    title: 'Leadership positiva',
    description:
      'Niente terrorismo psicologico. Leadership basata su fiducia, rispetto e crescita personale. Solo obiettivi chiari e feedback costruttivi.',
  },
  {
    title: 'Crescita accelerata',
    description:
      'Azienda in forte espansione con opportunità di fare esperienza significativa velocemente. La crescita è tangibile e meritata.',
  },
]

const investments = [
  {
    icon: Coins,
    title: 'Stipendi e compensi sopra la media',
    description: 'Compensi competitivi che riconoscono il valore del tuo lavoro quotidiano.',
  },
  {
    icon: Rocket,
    title: 'Possibilità di crescita professionale e carriera rapida',
    description:
      'Opportunità concrete di sviluppo professionale attraverso il continuo apprendimento e miglioramente di Soft Skills e Hard Skills. E, in aggiunta, spazio di avanzamento di carriera attraverso un sistema meritocratico reale.',
  },
  {
    icon: Building2,
    title: 'Possibilità di assumere ruoli gestionali e direzionali velocemente con meritocrazia',
    description:
      'Sistema meritocratico che premia competenza e risultati, permettendo di raggiungere posizioni di leadership in tempi rapidi.',
  },
  {
    icon: Zap,
    title:
      'Possibilità di entrare in società e/o sviluppare progetti imprenditoriali insieme con know-how, risorse umane e capitali alle spalle',
    description:
      'Opportunità concrete di entrare in società e/o sviluppare progetti imprenditoriali insieme con accesso a competenze, risorse umane qualificate e capitali per realizzare le idee insieme.',
  },
]

const FILTERS = [
  { id: 'all', label: 'Tutte' },
  { id: 'open', label: 'Aperte' },
  { id: 'closed', label: 'Chiuse' },
]

// /lavori/osteo_junior.png -> /lavori/web/osteo_junior-700.jpg (+ 1200)
const webImage = (src, size = 700) => {
  const name = src.replace(/^\/lavori\//, '').replace(/\.\w+$/, '')
  return `/lavori/web/${name}-${size}.jpg`
}

const scrollToBoard = () => {
  document.getElementById('posizioni')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

// Testo "a palette" stile tabellone partenze: le lettere girano e poi si fermano.
// Il testo vero resta per gli screen reader; la parte animata è aria-hidden.
const Flap = ({ text, play, delay = 0, tiles = false, className = '' }) => {
  const [shown, setShown] = useState(text)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (!play) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setSettled(true)
      return undefined
    }
    let frame = 0
    let timer
    const total = 14 + text.length
    const start = setTimeout(() => {
      timer = setInterval(() => {
        frame += 1
        setShown(
          text
            .split('')
            .map((ch, i) => {
              if (ch === ' ' || frame > 6 + i * 0.6) return ch
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join('')
        )
        if (frame >= total) {
          clearInterval(timer)
          setShown(text)
          setSettled(true)
        }
      }, 45)
    }, delay * 1000)
    return () => {
      clearTimeout(start)
      clearInterval(timer)
    }
  }, [play, text, delay])

  return (
    <span className={`mx-flap ${tiles ? 'mx-flap--tiles' : ''} ${settled ? 'is-settled' : ''} ${className}`}>
      <span className="mx-jobs-sr">{text}</span>
      <span aria-hidden="true">
        {tiles
          ? shown.split('').map((ch, i) => (
              <span key={i} className="mx-flap__tile">
                {ch}
              </span>
            ))
          : shown}
      </span>
    </span>
  )
}

const StatusFlap = ({ status, play, delay }) => (
  <span className={`mx-jobs-status ${status === 'open' ? 'is-open' : 'is-closed'}`}>
    <span className="mx-jobs-status__pre">Posizione</span>
    <Flap tiles text={status === 'open' ? 'Aperta' : 'Chiusa'} play={play} delay={delay} />
  </span>
)

// Titolo che si accende parola per parola mentre scorri
const LightWord = ({ progress, range, children }) => {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

const LightTitle = ({ text }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.45'] })
  const words = text.split(' ')
  return (
    <h3 ref={ref} className="mx-h mx-jobs-creed__title">
      {words.map((w, i) => (
        <LightWord key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}>
          {w}
        </LightWord>
      ))}
    </h3>
  )
}

const BoardRow = ({ job, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const open = job.status === 'open'
  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`mx-jobs-row ${open ? 'is-open' : ''}`}
    >
      <Link to={`/lavora-con-noi/${job.id}`} className="mx-jobs-row__link">
        <span className="mx-jobs-row__thumb">
          <img src={webImage(job.image)} alt={job.title} loading="lazy" decoding="async" />
        </span>
        <span className="mx-jobs-row__role">
          <h3 className="mx-h mx-jobs-row__title">
            <Flap text={job.title} play={inView} delay={0.05 * (index % 6)} />
          </h3>
          <span className="mx-jobs-row__meta">
            <span className="mx-jobs-chip">{job.type}</span>
            <span className="mx-jobs-row__loc">
              <MapPin size={14} aria-hidden="true" />
              {job.location}
            </span>
          </span>
        </span>
        <span className="mx-jobs-row__type">{job.type}</span>
        <span className="mx-jobs-row__place">{job.location}</span>
        <StatusFlap status={job.status} play={inView} delay={0.15 + 0.05 * (index % 6)} />
        <span className="mx-jobs-row__go">
          <span>Candidati</span>
          <span className="mx-jobs-row__arrow" aria-hidden="true">
            <ArrowRight size={18} strokeWidth={2.6} />
          </span>
        </span>
      </Link>
    </motion.li>
  )
}

const LavoraConNoi = () => {
  const [bandRef, bandY] = useParallax(8)
  const [filter, setFilter] = useState('all')
  const [heroPlay, setHeroPlay] = useState(false)

  const openJobs = jobRoles.filter((j) => j.status === 'open')
  const closedJobs = jobRoles.filter((j) => j.status !== 'open')
  // Sul tabellone le posizioni aperte vengono prima
  const boardJobs = filter === 'open' ? openJobs : filter === 'closed' ? closedJobs : [...openJobs, ...closedJobs]
  const counts = { all: jobRoles.length, open: openJobs.length, closed: closedJobs.length }

  useEffect(() => {
    const t = setTimeout(() => setHeroPlay(true), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <PageShell className="mx-jobs">
      {/* Hero: titolo enorme + mini tabellone delle posizioni aperte */}
      <section className="mx-jobs-hero">
        <div className="mx-aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mx-hero__grid-lines" aria-hidden="true" />

        <div className="mx-wrap mx-jobs-hero__layout">
          <div className="mx-jobs-hero__copy">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
              <Kicker>Lavora con noi</Kicker>
            </motion.div>
            <h1 className="mx-h mx-jobs-hero__title">
              <MaskLines
                immediate
                delay={0.2}
                lines={[{ text: 'Perché' }, { text: 'lavorare in' }, { text: 'Mobilitas', className: 'mx-gradient' }]}
              />
            </h1>
            <motion.p
              className="mx-lead mx-jobs-hero__lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            >
              In un mercato sempre più competitivo e spesso caratterizzato da ambienti tossici,{' '}
              <strong className="mx-accent">Mobilitas rappresenta un'alternativa reale</strong> a tutto quello che non
              funziona nelle aziende tradizionali.
            </motion.p>
          </div>

          <motion.div
            className="mx-jobs-mini"
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
          >
            <div className="mx-jobs-mini__head">
              <span className="mx-jobs-live" aria-hidden="true" />
              <span>Posizioni aperte</span>
              <span className="mx-jobs-mini__count">
                <Flap tiles text={String(openJobs.length).padStart(2, '0')} play={heroPlay} />
              </span>
            </div>
            <ul className="mx-jobs-mini__list">
              {openJobs.map((job, i) => (
                <li key={job.id}>
                  <Link to={`/lavora-con-noi/${job.id}`} className="mx-jobs-mini__row">
                    <span className="mx-jobs-mini__n">0{i + 1}</span>
                    <span className="mx-jobs-mini__role">
                      <Flap text={job.title} play={heroPlay} delay={0.2 + i * 0.25} />
                      <small>
                        {job.type} · {job.location}
                      </small>
                    </span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <button type="button" className="mx-jobs-mini__all" onClick={scrollToBoard}>
              Tutte le {jobRoles.length} figure professionali
              <ArrowDown size={16} strokeWidth={2.6} aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Manifesto della cultura */}
      <section className="mx-section mx-section--deep">
        <div className="mx-wrap">
          <Kicker n="01">La nostra cultura</Kicker>
          <h2 className="mx-h mx-h--md mx-jobs-creed__intro">
            <MaskLines lines={[{ text: "Un'alternativa perfetta" }, { text: 'al mondo del lavoro tossico', className: 'mx-accent' }]} />
          </h2>

          <ol className="mx-jobs-creed">
            {culture.map((c, i) => (
              <li key={c.title} className="mx-jobs-creed__item">
                <span className="mx-jobs-creed__n" aria-hidden="true">0{i + 1}</span>
                <LightTitle text={c.title} />
                <Reveal className="mx-jobs-creed__text" y={24}>
                  <p className="mx-body">{c.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mx-jobs-band">
            <Reveal className="mx-jobs-band__media">
              <div ref={bandRef} style={{ height: '100%' }}>
                <motion.div style={{ y: bandY, height: '100%' }}>
                  <img
                    className="mx-parallax-img"
                    src="/home/web/home5-1600.jpg"
                    srcSet="/home/web/home5-900.jpg 900w, /home/web/home5-1600.jpg 1600w"
                    sizes="(min-width: 1280px) 820px, 100vw"
                    alt="Un trattamento nello Studio Mobilitas"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </div>
            </Reveal>
            <Reveal className="mx-jobs-band__card" delay={0.15}>
              <span className="mx-jobs-band__icon">
                <Zap size={26} />
              </span>
              <h3 className="mx-h mx-h--md">Il futuro del lavoro</h3>
              <p className="mx-body">
                Unisciti a un team che crede nel talento, nella crescita e nell'innovazione. La tua carriera merita un
                ambiente dove il successo è condiviso.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Investimento */}
      <section className="mx-section mx-section--glow">
        <div className="mx-wrap">
          <Kicker n="02">Cosa ti offriamo</Kicker>
          <h2 className="mx-h mx-h--lg">
            <MaskLines
              lines={[{ text: 'Il tuo successo' }, { text: 'è il nostro' }, { text: 'investimento.', className: 'mx-gradient' }]}
            />
          </h2>

          <Snap className="mx-jobs-invest">
            {investments.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={(i % 2) * 0.08} className="mx-jobs-invest__item" onMouseMove={trackSpotlight}>
                  <div className="mx-jobs-invest__top">
                    <span className="mx-jobs-invest__n" aria-hidden="true">0{i + 1}</span>
                    <span className="mx-card__icon">
                      <Icon size={24} />
                    </span>
                  </div>
                  <h3 className="mx-h mx-h--sm">{item.title}</h3>
                  <p className="mx-body">{item.description}</p>
                </Reveal>
              )
            })}
          </Snap>

          <ScrollWords
            className="mx-manifesto mx-jobs-manifesto"
            parts={[
              'La tua carriera merita un ambiente dove',
              { text: 'il successo è condiviso,', accent: true },
              'dove la crescita è reale e dove',
              { text: 'il futuro si costruisce insieme.', accent: true },
            ]}
          />
        </div>
      </section>

      {/* Tabellone delle posizioni */}
      <section className="mx-section mx-section--deep mx-jobs-boardsec" id="posizioni">
        <div className="mx-wrap">
          <Kicker n="03">Il tabellone</Kicker>
          <div className="mx-jobs-boardhead">
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Figure professionali' }, { text: 'e Posizioni aperte', className: 'mx-outline' }]} />
            </h2>
            <div className="mx-jobs-filter" role="group" aria-label="Filtra le posizioni">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  className={filter === f.id ? 'is-active' : ''}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                  <span>{counts[f.id]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mx-jobs-board">
            <div className="mx-jobs-board__cols" aria-hidden="true">
              <span />
              <span>Ruolo</span>
              <span>Contratto</span>
              <span>Sede</span>
              <span>Stato</span>
              <span />
            </div>
            <ul className="mx-jobs-board__list">
              {boardJobs.map((job, i) => (
                <BoardRow key={job.id} job={job} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCta
        kicker="Il futuro del lavoro"
        titleLines={[{ text: 'Il futuro si' }, { text: 'costruisce' }, { text: 'insieme.', className: 'mx-gradient' }]}
        text="Unisciti a un team che crede nel talento, nella crescita e nell'innovazione."
      >
        <div className="mx-ctas">
          <button type="button" className="mx-btn mx-btn--primary" onClick={scrollToBoard}>
            <span>
              <small>{openJobs.length} posizioni aperte</small>
              Scopri le posizioni
            </span>
            <span className="mx-btn__icon">
              <ArrowDown size={20} strokeWidth={2.4} />
            </span>
          </button>
          <Link to="/influencer" className="mx-btn mx-btn--ghost">
            <span>
              <small>Influencer?</small>
              Collabora con noi
            </span>
            <span className="mx-btn__icon">
              <ArrowUpRight size={20} strokeWidth={2.4} />
            </span>
          </Link>
        </div>
      </FinalCta>
    </PageShell>
  )
}

export default LavoraConNoi
