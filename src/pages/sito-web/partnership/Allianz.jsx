import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Check, Coins, Handshake, MessageCircle, ShieldCheck, Trophy } from 'lucide-react'
import PageShell from '../../../components/site/PageShell'
import FinalCta from '../../../components/site/FinalCta'
import { Kicker, MaskLines, Reveal } from '../../../components/home-sections/HomeKit'
import { EASE, MSG_CONSULTO, openWhatsApp } from '../../../components/home-sections/homeMotion'
import { ParallaxPhoto, SectionHead } from '../../../components/site/partnership/PartnerKit'
import '../../../styles/pages/partner-allianz.css'

const advantages = [
  'Prezzi specifici e convenzionati per clienti Allianz',
  'Accesso diretto ai nostri servizi di osteopatia',
  'Trattamenti di benessere a condizioni privilegiate',
  'Nessuna procedura complessa, convenzione diretta',
]

const steps = [
  {
    step: '1',
    title: 'Verifica la tua polizza Allianz',
    description: 'Assicurati di essere cliente Allianz Assicurazioni per usufruire della convenzione',
  },
  {
    step: '2',
    title: 'Prenota il tuo appuntamento',
    description: 'Contattaci per prenotare la tua visita presso il nostro studio',
  },
  {
    step: '3',
    title: 'Presenta la tua polizza',
    description: 'Al momento del pagamento, presenta la documentazione della tua polizza Allianz per usufruire dei prezzi convenzionati',
  },
  {
    step: '4',
    title: 'Goditi il benessere',
    description: 'Ricevi i nostri trattamenti osteopatici e servizi di benessere con i prezzi specifici della convenzione',
  },
]

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

const SHIELD = 'M100 8 L182 38 V104 C182 158 146 196 100 214 C54 196 18 158 18 104 V38 Z'

// Scudo generico disegnato a tratto, con anelli di "copertura"
const ShieldEmblem = () => (
  <div className="mx-al-emblem" aria-hidden="true">
    <span className="mx-al-emblem__ring" />
    <span className="mx-al-emblem__ring" />
    <span className="mx-al-emblem__ring" />
    <svg viewBox="0 0 200 222" className="mx-al-emblem__shield">
      <defs>
        <linearGradient id="mx-al-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#72fa93" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <motion.path
        d={SHIELD}
        className="mx-al-emblem__fill"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      />
      <motion.path
        d={SHIELD}
        className="mx-al-emblem__stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.3 }}
      />
    </svg>
    <motion.img
      src="/pittogramma.png"
      alt=""
      className="mx-al-emblem__logo"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 1.3 }}
    />
  </div>
)

const Allianz = () => (
  <PageShell className="mx-al">
    {/* HERO: la copertura */}
    <section className="mx-al-hero">
      <div className="mx-al-hero__glow" aria-hidden="true" />
      <div className="mx-wrap mx-al-hero__inner mx-pk-fitbox">
        <ShieldEmblem />

        <motion.div {...fade(0.1)}>
          <Kicker>Convenzione Diretta</Kicker>
        </motion.div>
        <h1 className="mx-h mx-h--xl mx-al-hero__title">
          <MaskLines
            immediate
            delay={0.2}
            lines={[
              { text: 'Convenzione con', className: 'mx-al-hero__pre' },
              { text: 'Allianz', className: 'mx-pk-name mx-al-hero__name mx-al-hero__name--a' },
              { text: 'Assicurazioni', className: 'mx-pk-name mx-al-hero__name mx-gradient' },
            ]}
          />
        </h1>
        <motion.p className="mx-lead mx-al-hero__lead" {...fade(0.55)}>
          Convenzione diretta con prezzi specifici per i clienti Allianz Assicurazioni
        </motion.p>
        <motion.div className="mx-ctas mx-al-hero__ctas" {...fade(0.7)}>
          <button type="button" className="mx-btn mx-btn--primary" onClick={() => openWhatsApp(MSG_CONSULTO)}>
            <span>
              <small>Prenota un</small>
              Consulto gratuito
            </span>
            <span className="mx-btn__icon">
              <MessageCircle size={20} strokeWidth={2.4} />
            </span>
          </button>
          <a className="mx-btn mx-btn--ghost" href="#come-funziona">
            <span>
              <small>Come Funziona</small>
              Come utilizzare la convenzione
            </span>
            <span className="mx-btn__icon">
              <ArrowDown size={20} strokeWidth={2.4} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>

    {/* LA CONVENZIONE: copertura */}
    <section className="mx-section mx-section--glow">
      <div className="mx-wrap">
        <SectionHead
          n="01"
          kicker="La Convenzione"
          lines={[{ text: 'Convenzione diretta' }, { text: 'con Allianz', className: 'mx-gradient' }]}
          lead="Una convenzione diretta che offre prezzi specifici e vantaggiosi per i clienti Allianz Assicurazioni"
        />

        <div className="mx-al-cover">
          <Reveal className="mx-al-core">
            <span className="mx-al-core__badge" aria-hidden="true">
              <Handshake size={26} />
            </span>
            <h3 className="mx-h mx-h--md">Convenzione Diretta</h3>
            <p className="mx-body">
              Abbiamo stipulato una <strong>convenzione diretta con Allianz Assicurazioni</strong> che offre <strong>prezzi specifici e vantaggiosi</strong> per tutti i clienti Allianz che desiderano usufruire dei nostri servizi di osteopatia e benessere.
            </p>
          </Reveal>

          <div className="mx-al-perks">
            <h3 className="mx-h mx-h--sm mx-al-perks__title">
              <Coins size={20} aria-hidden="true" /> Vantaggi della Convenzione
            </h3>
            <ul>
              {advantages.map((a, i) => (
                <Reveal as="li" key={a} delay={i * 0.1} y={24} className="mx-al-perk">
                  <ShieldCheck size={22} aria-hidden="true" />
                  <span>{a}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-al-calm">
          <ParallaxPhoto base="/home/web/home5" alt="Un trattamento osteopatico nello Studio Mobilitas" sizes="100vw" className="mx-al-calm__photo" />
          <Reveal className="mx-al-calm__text">
            <Trophy size={26} aria-hidden="true" />
            <h3 className="mx-h mx-h--md">Convenzione diretta per il tuo benessere</h3>
            <p className="mx-lead">
              Grazie alla convenzione diretta con Allianz Assicurazioni, tutti i clienti possono accedere ai nostri servizi di osteopatia e benessere con prezzi specifici e vantaggiosi.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    {/* COME FUNZIONA: percorso tranquillo */}
    <section id="come-funziona" className="mx-section mx-section--deep">
      <div className="mx-wrap">
        <SectionHead
          n="02"
          kicker="Come Funziona"
          lines={[{ text: 'Come utilizzare' }, { text: 'la convenzione', className: 'mx-gradient' }]}
          lead="Passaggi semplici per accedere ai nostri servizi con la convenzione Allianz"
        />

        <div className="mx-al-path">
          <motion.span
            className="mx-al-path__line"
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 2.4, ease: EASE }}
          />
          <ol className="mx-al-path__list">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.step} delay={0.1} className={`mx-al-step ${i % 2 ? 'is-right' : ''}`}>
              <span className="mx-al-step__dot" aria-hidden="true">
                {i === steps.length - 1 ? <Check size={20} strokeWidth={3} /> : s.step}
              </span>
              <div className="mx-al-step__card">
                <span className="mx-al-step__n">Passo {s.step}</span>
                <h3 className="mx-h mx-h--sm">{s.title}</h3>
                <p className="mx-body">{s.description}</p>
              </div>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>

    <FinalCta
      kicker="Mobilitas × Allianz"
      titleLines={[{ text: 'Prenota il tuo' }, { text: 'appuntamento.', className: 'mx-gradient' }]}
      text="Contattaci per prenotare la tua visita presso il nostro studio"
    />
  </PageShell>
)

export default Allianz
