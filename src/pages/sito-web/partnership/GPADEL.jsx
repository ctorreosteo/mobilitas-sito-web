import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  BookOpen,
  Handshake,
  Lightbulb,
  MapPin,
  MessageCircle,
  Route,
  Sparkles,
  Star,
  Tag,
  Target,
  Trophy,
} from 'lucide-react'
import PageShell from '../../../components/site/PageShell'
import FinalCta from '../../../components/site/FinalCta'
import { Kicker, MaskLines, Reveal, Snap } from '../../../components/home-sections/HomeKit'
import { EASE, MSG_CONSULTO, openWhatsApp } from '../../../components/home-sections/homeMotion'
import {
  GlassCard,
  Highlight,
  ParallaxPhoto,
  PartnerImg,
  SectionHead,
} from '../../../components/site/partnership/PartnerKit'
import '../../../styles/pages/partner-gpadel.css'

const IMG = '/partnership/gpadel/web'

const story = [
  {
    icon: Handshake,
    title: 'Una Visione Imprenditoriale',
    text: (
      <>
        La partnership tra Mobilitas e GPADEL è nata grazie alla visione innovativa di <strong>Lorenzo Veglia</strong>, Founder e CEO di GPADEL. Un imprenditore che ha sempre creduto nell'importanza di offrire servizi di qualità ai propri clienti.
      </>
    ),
  },
  {
    icon: Lightbulb,
    title: "L'Idea Innovativa",
    text: "Lorenzo voleva portare qualcosa di innovativo all'interno della sua catena di centri padel. Ha avuto l'ottima idea di portare i nostri servizi all'interno delle strutture GPADEL, per offrire un servizio di estrema qualità a tutti i clienti che frequentano i centri.",
  },
  {
    icon: Star,
    title: 'Servizio di Eccellenza',
    text: "L'obiettivo della partnership è quello di offrire ai giocatori di padel un'esperienza completa: non solo campi di alta qualità, ma anche servizi di benessere e prevenzione degli infortuni direttamente disponibili nei centri GPADEL.",
  },
]

const services = [
  'G-Academy - Scuola di padel',
  'G-Shop - Negozio attrezzature',
  'G-Bar - Punto ristoro',
  'Tornei e competizioni',
  'Eventi speciali',
]

const strengths = [
  { name: 'Specializzato', desc: 'Concentrato solo sul padel' },
  { name: 'Dedicato', desc: "Servizi pensati per l'esperienza di gioco" },
  { name: 'Vicino a te', desc: 'Centri in posizioni strategiche' },
]

const benefits = [
  {
    icon: Trophy,
    title: 'Presenza tra i Campi',
    text: (
      <>
        Siamo presenti tra i campi del GPADEL e, con <strong>trattamenti gratuiti</strong>, aiutiamo tutti coloro che sono lì a giocare a stare bene e prevenire il più possibile infortuni. Siamo presenti ad <strong>allenamenti, tornei ed eventi speciali</strong>, garantendo supporto immediato quando serve.
      </>
    ),
  },
  {
    icon: Tag,
    title: 'Prezzi Speciali',
    text: (
      <>
        <strong>Prezzi speciali per tutti i tesserati GPADEL</strong>, sia atleti agonistici sia amatoriali. Accesso a tutti i nostri servizi e trattamenti a condizioni esclusive riservate alla community GPADEL.
      </>
    ),
  },
  {
    icon: BookOpen,
    title: 'Eventi di Formazione',
    text: (
      <>
        <strong>Eventi di formazione ed educazione</strong> su come prevenire infortuni e stare bene nella quotidianità. Workshop, seminari e sessioni pratiche per migliorare la performance e il benessere.
      </>
    ),
  },
  {
    icon: Route,
    title: 'Percorsi su Misura',
    text: (
      <>
        <strong>Percorsi su misura per chi pratica tanto padel</strong>, percorsi pensati anche per tutto l'anno. Programmi personalizzati che accompagnano gli atleti durante tutta la stagione, dalla preparazione alle competizioni, garantendo il massimo benessere e la prevenzione degli infortuni.
      </>
    ),
  },
]

// Campo da padel visto dall'alto (20 × 10 m)
const Court = ({ className }) => (
  <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
    {[
      'M2 2H198V98H2Z',
      'M100 2V98',
      'M30.5 2V98',
      'M169.5 2V98',
      'M30.5 50H169.5',
    ].map((d, i) => (
      <motion.path
        key={d}
        d={d}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.2 + i * 0.15 }}
      />
    ))}
  </svg>
)

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

const TRAJECTORY = 'M-60 560 Q 250 40 560 470 Q 790 170 1060 330'

const GPADEL = () => (
  <PageShell className="mx-gp">
    {/* HERO: il campo */}
    <section className="mx-gp-hero">
      <div className="mx-gp-hero__court" aria-hidden="true">
        <Court className="mx-gp-court" />
      </div>

      {/* Traiettoria della pallina */}
      <svg className="mx-gp-hero__ball" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <motion.path
          id="mx-gp-traj"
          d={TRAJECTORY}
          className="mx-gp-traj"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.6 }}
        />
        <g className="mx-gp-ballshape">
          <circle r="15" />
          <path d="M-11 -9 Q 0 0 -11 9 M11 -9 Q 0 0 11 9" />
          <animateMotion dur="5.5s" repeatCount="indefinite" begin="1.2s" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.6 1">
            <mpath href="#mx-gp-traj" />
          </animateMotion>
        </g>
      </svg>

      <div className="mx-wrap mx-gp-hero__layout">
        <div className="mx-gp-hero__copy mx-pk-fitbox">
          <motion.div {...fade(0.1)}>
            <Kicker>Partnership Esclusiva</Kicker>
          </motion.div>
          <h1 className="mx-h mx-h--xl mx-gp-hero__title">
            <MaskLines
              immediate
              delay={0.2}
              lines={[
                { text: 'Partnership con', className: 'mx-gp-hero__pre' },
                { text: 'GPADEL', className: 'mx-pk-name mx-gradient' },
              ]}
            />
          </h1>
          <motion.p className="mx-lead mx-gp-hero__lead" {...fade(0.55)}>
            Scopri la nostra partnership strategica con GPADEL e come stiamo lavorando insieme per promuovere il benessere nel mondo del padel
          </motion.p>
          <motion.div className="mx-ctas mx-gp-hero__ctas" {...fade(0.7)}>
            <button type="button" className="mx-btn mx-btn--primary" onClick={() => openWhatsApp(MSG_CONSULTO)}>
              <span>
                <small>Prenota un</small>
                Consulto gratuito
              </span>
              <span className="mx-btn__icon">
                <MessageCircle size={20} strokeWidth={2.4} />
              </span>
            </button>
            <a className="mx-btn mx-btn--ghost" href="#benefici">
              <span>
                <small>Tesserati GPADEL</small>
                Benefici della partnership
              </span>
              <span className="mx-btn__icon">
                <ArrowDown size={20} strokeWidth={2.4} />
              </span>
            </a>
          </motion.div>
        </div>

        <motion.figure
          className="mx-gp-glass"
          initial={{ opacity: 0, y: 60, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
        >
          <div className="mx-gp-glass__frame">
            <PartnerImg
              base={`${IMG}/gpadel1`}
              alt="Lorenzo Veglia - Founder e CEO GPADEL"
              sizes="(min-width: 1024px) 420px, 84vw"
              eager
            />
            <span className="mx-gp-glass__mesh" aria-hidden="true" />
          </div>
          <figcaption className="mx-gp-score">
            <span className="mx-gp-score__team">Mobilitas</span>
            <span className="mx-gp-score__x">×</span>
            <span className="mx-gp-score__team">GPADEL</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>

    {/* LA STORIA: il rally */}
    <section className="mx-section mx-section--glow">
      <div className="mx-wrap">
        <SectionHead
          n="01"
          kicker="La Storia"
          lines={[{ text: 'Come è nata' }, { text: 'la partnership', className: 'mx-gradient' }]}
          lead="Una storia di innovazione e visione imprenditoriale che ha portato a una partnership unica nel mondo del padel"
        />

        <div className="mx-gp-rally">
          <svg className="mx-gp-rally__arc" viewBox="0 0 900 90" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M40 80 Q 190 -30 330 80 Q 480 -30 630 80 Q 760 -10 880 50"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 2, ease: EASE }}
            />
          </svg>
          <Snap as="div" className="mx-gp-rally__cards">
            {story.map((s, i) => (
              <GlassCard key={s.title} icon={s.icon} title={s.title} delay={i * 0.1} tag={`Colpo ${i + 1}`} className="mx-gp-shot">
                {s.text}
              </GlassCard>
            ))}
          </Snap>
        </div>

        <div className="mx-gp-feature">
          <Reveal className="mx-gp-feature__media">
            <ParallaxPhoto base={`${IMG}/gpadel2`} alt="Partnership Mobilitas e GPADEL" sizes="(min-width: 900px) 520px, 100vw" className="mx-gp-feature__photo" />
          </Reveal>
          <div className="mx-gp-feature__copy">
            <h3 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Una Partnership' }, { text: 'Strategica', className: 'mx-outline' }]} />
            </h3>
            <Reveal>
              <p className="mx-lead">
                La collaborazione tra Mobilitas e GPADEL rappresenta un modello innovativo nel settore dello sport: unire l'eccellenza delle strutture sportive con servizi di benessere e prevenzione degli infortuni, creando un'esperienza completa per tutti gli appassionati di padel.
              </p>
            </Reveal>
          </div>
        </div>

        <Highlight icon={Handshake} title="Innovazione e qualità al servizio del benessere">
          Grazie alla visione di Lorenzo, oggi tutti i tesserati GPADEL possono accedere ai servizi di Mobilitas direttamente nei centri, trasformando ogni partita in un'opportunità per prendersi cura del proprio benessere.
        </Highlight>
      </div>
    </section>

    {/* CHI È GPADEL */}
    <section className="mx-section mx-section--deep mx-gp-about">
      <Court className="mx-gp-about__court" />
      <div className="mx-wrap">
        <SectionHead
          n="02"
          kicker="Chi è GPADEL"
          stacked
          lines={[
            { text: 'Chi è GPADEL,' },
            { text: 'il primo network', className: 'mx-gradient' },
            { text: 'di centri padel', className: 'mx-gradient' },
            { text: 'in Italia', className: 'mx-outline' },
          ]}
          lead="Divertente, semplice, per tutti. L'azienda è specializzata nel padel e offre un'esperienza unica e completa"
        />

        <Snap as="div" className="mx-gp-about__cards">
          <GlassCard icon={MapPin} title="Il Primo Network di Centri Padel">
            L'azienda è il primo network di centri padel in Italia. Con centri ubicati in posizioni strategiche, facilmente raggiungibili e sempre aperti 7 su 7, GPADEL offre un'esperienza di gioco unica e accessibile a tutti.
          </GlassCard>
          <GlassCard icon={Target} title="Specializzato nel Padel" delay={0.08}>
            La scelta strategica ha permesso di concentrarsi soprattutto sul padel, senza distrazioni. Nei loro centri tutto è progettato per offrire la migliore esperienza di gioco, con campi di alta qualità e servizi dedicati
          </GlassCard>
        </Snap>
      </div>

      {/* Servizi Dedicati: nastro a bordo campo */}
      <div className="mx-gp-services">
        <div className="mx-wrap">
          <h3 className="mx-h mx-h--sm mx-gp-services__title">
            <Trophy size={20} aria-hidden="true" /> Servizi Dedicati
          </h3>
        </div>
        <div className="mx-gp-ribbon">
          <ul className="mx-marquee" style={{ '--mx-speed': '34s' }}>
            {services.map((s) => (
              <li key={s} className="mx-ribbon__item">
                {s}
                <span className="mx-ribbon__dot" />
              </li>
            ))}
          </ul>
          <ul className="mx-marquee" style={{ '--mx-speed': '34s' }} aria-hidden="true">
            {services.map((s) => (
              <li key={s} className="mx-ribbon__item">
                {s}
                <span className="mx-ribbon__dot" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-wrap">
        <h3 className="mx-h mx-h--md mx-gp-strengths__title">
          <Sparkles size={22} aria-hidden="true" /> I Punti di Forza
        </h3>
        <ol className="mx-gp-strengths">
          {strengths.map((v, i) => (
            <Reveal as="li" key={v.name} delay={i * 0.08} className="mx-gp-strength">
              <span className="mx-gp-strength__n" aria-hidden="true">
                {i + 1}
              </span>
              <span className="mx-gp-strength__name">{v.name}</span>
              <span className="mx-body">{v.desc}</span>
            </Reveal>
          ))}
        </ol>

        <Highlight icon={Star} title="GPADEL: divertente, semplice, per tutti">
          Il team trasforma il modo di giocare a padel in Italia, offrendo centri specializzati, servizi dedicati e un'esperienza completa per tutti gli appassionati di questo sport in crescita.
        </Highlight>
      </div>
    </section>

    {/* BENEFICI: il tabellone */}
    <section id="benefici" className="mx-section mx-section--glow mx-gp-benefits">
      <div className="mx-wrap">
        <SectionHead
          n="03"
          kicker="I Benefici"
          lines={[{ text: 'Benefici della' }, { text: 'partnership', className: 'mx-gradient' }]}
          lead="I vantaggi esclusivi riservati a tutti i tesserati GPADEL attraverso la nostra partnership"
        />

        <Reveal className="mx-gp-board">
          <div className="mx-gp-board__head" aria-hidden="true">
            <span className="mx-gp-board__live">
              <i /> Mobilitas × GPADEL
            </span>
            <span className="mx-gp-board__sets">
              {benefits.map((b, i) => (
                <b key={b.title}>{i + 1}</b>
              ))}
            </span>
          </div>
          <ol className="mx-gp-board__rows">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <Reveal as="li" key={b.title} delay={i * 0.08} className="mx-gp-row">
                  <span className="mx-gp-row__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mx-h mx-h--md mx-gp-row__title">
                    <Icon size={22} aria-hidden="true" />
                    {b.title}
                  </h3>
                  <p className="mx-body mx-gp-row__text">{b.text}</p>
                </Reveal>
              )
            })}
          </ol>
        </Reveal>

        <Highlight icon={Trophy} title="Una partnership che premia l'eccellenza sportiva">
          La partnership tra Mobilitas e GPADEL rappresenta un modello innovativo di collaborazione che unisce l'eccellenza sportiva al benessere, offrendo vantaggi concreti e misurabili per migliorare la performance, prevenire gli infortuni e garantire il massimo benessere a tutti gli appassionati di padel.
        </Highlight>
      </div>
    </section>

    <FinalCta kicker="Mobilitas × GPADEL" titleLines={[{ text: 'Prenota il tuo' }, { text: 'appuntamento.', className: 'mx-gradient' }]} />
  </PageShell>
)

export default GPADEL
