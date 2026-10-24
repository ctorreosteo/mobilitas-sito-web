import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  Bot,
  Lightbulb,
  PartyPopper,
  Rocket,
  Route,
  Tag,
  Target,
  Trophy,
  Users,
  Wrench,
  Zap,
  BarChart3,
} from 'lucide-react'
import WhatsAppIcon from '../../../components/whatsapp/WhatsAppIcon'
import PageShell from '../../../components/site/PageShell'
import FinalCta from '../../../components/site/FinalCta'
import { Counter, Kicker, MaskLines, Reveal, Snap } from '../../../components/home-sections/HomeKit'
import { EASE, MSG_CONSULTO, openWhatsApp } from '../../../components/home-sections/homeMotion'
import { GlassCard, Highlight, ParallaxPhoto, SectionHead } from '../../../components/site/partnership/PartnerKit'
import '../../../styles/pages/partner-robogest.css'

const services = [
  'Programmazione robot',
  'Assistenza tecnica specializzata',
  'Formazione aziendale',
  'Manutenzione ordinaria',
  'Upgrade e ottimizzazione',
  'Consulenza automazione',
]

const values = [
  { name: 'Innovazione', desc: "Sempre all'avanguardia nella robotica" },
  { name: 'Eccellenza', desc: 'Qualità superiore in ogni progetto' },
  { name: 'Formazione', desc: 'Diffusione della conoscenza' },
  { name: 'Affidabilità', desc: 'Assistenza tempestiva e competente' },
]

const stats = [
  { to: 3, suffix: '+', label: 'Anni di esperienza' },
  { to: 10, suffix: '+', label: 'Tecnici specializzati' },
  { to: 50, suffix: '+', label: 'Robot programmati ogni anno' },
]

const benefits = [
  {
    icon: Zap,
    title: 'Priorità nelle Prenotazioni',
    text: (
      <>
        Tutti i dipendenti di Robogest hanno <strong>priorità assoluta</strong> nel prenotare le visite presso il nostro studio. Nessuna lista d'attesa, accesso immediato ai nostri servizi con un trattamento VIP dedicato.
      </>
    ),
  },
  {
    icon: PartyPopper,
    title: 'Eventi Esclusivi',
    text: (
      <>
        I dipendenti Robogest sono <strong>i primi a ricevere inviti</strong> ai nostri eventi esclusivi: workshop, seminari di benessere, sessioni di formazione e molto altro.
      </>
    ),
  },
  {
    icon: Tag,
    title: 'Prezzi Super Agevolati',
    text: (
      <>
        Accesso a <strong>tutti i servizi e prodotti a prezzi super agevolati</strong>. Trattamenti osteopatici, consulenze e prodotti per il benessere a condizioni esclusive.
      </>
    ),
  },
  {
    icon: Route,
    title: 'Percorsi Esclusivi',
    text: (
      <>
        <strong>Percorsi personalizzati</strong> studiati appositamente per i dipendenti Robogest: programmi di benessere aziendale, check-up periodici e piani di prevenzione su misura per garantire il massimo benessere in un ambiente di lavoro tecnologicamente avanzato.
      </>
    ),
  },
]

// Scheda tecnica nell'hero: solo dati presenti nella pagina
const spec = [
  ['Partner', 'Robogest'],
  ['Sede', 'Grugliasco (TO)'],
  ['Settore', 'Robotica industriale'],
  ['Primo evento', '8 Novembre 2024'],
  ['Per', 'I dipendenti di Robogest'],
]

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

// Angoli di mira attorno a un elemento
const Crosshairs = () => (
  <>
    <i className="mx-rb-cross mx-rb-cross--tl" aria-hidden="true" />
    <i className="mx-rb-cross mx-rb-cross--tr" aria-hidden="true" />
    <i className="mx-rb-cross mx-rb-cross--bl" aria-hidden="true" />
    <i className="mx-rb-cross mx-rb-cross--br" aria-hidden="true" />
  </>
)

// Indicatore circolare per i numeri
const Gauge = ({ fill }) => (
  <svg className="mx-rb-gauge" viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="52" className="mx-rb-gauge__track" />
    <motion.circle
      cx="60"
      cy="60"
      r="52"
      className="mx-rb-gauge__val"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: fill }}
      viewport={{ once: true }}
      transition={{ duration: 2.2, ease: EASE }}
    />
    {Array.from({ length: 24 }, (_, i) => (
      <line key={i} x1="60" y1="2" x2="60" y2={i % 6 === 0 ? 12 : 7} transform={`rotate(${i * 15} 60 60)`} />
    ))}
  </svg>
)

const Robogest = () => (
  <PageShell className="mx-rb">
    {/* HERO: blueprint */}
    <section className="mx-rb-hero">
      <div className="mx-rb-grid" aria-hidden="true" />
      <motion.span
        className="mx-rb-scan"
        aria-hidden="true"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{ duration: 5, ease: 'linear', repeat: Infinity, repeatDelay: 1 }}
      />

      <div className="mx-wrap mx-rb-hero__layout">
        <div className="mx-rb-hero__copy mx-pk-fitbox">
          <motion.div {...fade(0.1)}>
            <Kicker>Partnership Esclusiva</Kicker>
          </motion.div>

          <h1 className="mx-h mx-h--xl mx-rb-hero__title">
            <MaskLines
              immediate
              delay={0.2}
              lines={[
                { text: 'Partnership con', className: 'mx-rb-hero__pre' },
                { text: 'Robogest', className: 'mx-pk-name mx-gradient' },
              ]}
            />
          </h1>

          {/* Quota tecnica sotto il nome */}
          <motion.div
            className="mx-rb-dim"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
          >
            <span>Mobilitas × Robogest</span>
          </motion.div>

          <motion.p className="mx-lead mx-rb-hero__lead" {...fade(0.55)}>
            Scopri la nostra partnership strategica con Robogest e come stiamo lavorando insieme per promuovere il benessere nell'industria della robotica
          </motion.p>

          <motion.div className="mx-ctas mx-rb-hero__ctas" {...fade(0.7)}>
            <button type="button" className="mx-btn mx-btn--primary" onClick={() => openWhatsApp(MSG_CONSULTO)}>
              <span>
                <small>Prenota un</small>
                Consulto gratuito
              </span>
              <span className="mx-btn__icon">
                <WhatsAppIcon size={20} strokeWidth={2.4} />
              </span>
            </button>
            <a className="mx-btn mx-btn--ghost" href="#benefici">
              <span>
                <small>Dipendenti Robogest</small>
                Benefici della partnership
              </span>
              <span className="mx-btn__icon">
                <ArrowDown size={20} strokeWidth={2.4} />
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mx-rb-spec"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
        >
          <Crosshairs />
          <div className="mx-rb-spec__head">
            <span className="mx-rb-spec__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>Scheda partnership</span>
          </div>
          <dl className="mx-rb-spec__list">
            {spec.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.9 + i * 0.12 }}
              >
                <dt>{k}</dt>
                <dd>{v}</dd>
              </motion.div>
            ))}
          </dl>
          <div className="mx-rb-spec__foot" aria-hidden="true">
            <Bot size={18} />
            <span className="mx-rb-spec__bar">
              <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2, ease: EASE, delay: 1.5 }} />
            </span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* LA STORIA */}
    <section className="mx-section mx-section--glow mx-rb-sec">
      <div className="mx-wrap">
        <SectionHead
          n="01"
          kicker="La Storia"
          lines={[{ text: 'Come è nata' }, { text: 'la partnership', className: 'mx-gradient' }]}
          lead="Una storia di visione imprenditoriale e innovazione che ha portato a una partnership unica nel settore della robotica industriale"
        />

        <Snap as="div" className="mx-rb-duo">
          <GlassCard icon={Users} title="Una Famiglia di Imprenditori Visionari" tag="Modulo 01 · Visione" className="mx-rb-card">
            La partnership tra Mobilitas e Robogest è nata grazie alla visione di <strong>Mauro Bigelli</strong>, imprenditore titolare di Robogest, e di suo figlio <strong>Mattia Bigelli</strong>. Una famiglia di leader che ha sempre creduto nell'importanza di portare innovazione sulla salute per la loro impresa e i loro dipendenti.
          </GlassCard>
          <GlassCard icon={Lightbulb} title="L'Idea dell'Innovazione" tag="Modulo 02 · Idea" delay={0.08} className="mx-rb-card">
            Mauro e Mattia Bigelli hanno riconosciuto che l'innovazione non riguarda solo la tecnologia robotica, ma anche il benessere delle persone che lavorano con essa. Una visione olistica che unisce l'eccellenza tecnologica alla cura del capitale umano.
          </GlassCard>
        </Snap>

        <div className="mx-rb-event">
          <Reveal className="mx-rb-event__media">
            <ParallaxPhoto base="/partnership/robogest/web/robogest1" alt="Evento di formazione Robogest - 8 Novembre 2024" sizes="(min-width: 900px) 640px, 100vw" />
            <Crosshairs />
            <span className="mx-rb-event__coord" aria-hidden="true">
              REC · 08.11.2024
            </span>
          </Reveal>
          <div className="mx-rb-event__copy">
            <span className="mx-rb-event__date" aria-hidden="true">
              08.11
            </span>
            <h3 className="mx-h mx-h--md">8 Novembre 2024: Il Primo Evento</h3>
            <Reveal>
              <p className="mx-lead">
                L'<strong>8 Novembre 2024</strong> si è tenuto il primo evento di formazione presso Robogest. Durante l'evento il Dr. Ricciardi ha parlato di <strong>sedentarietà, conseguenze sulla salute, consigli per una postura adeguata</strong> e come prevenire problemi e malattie legate al lavoro in ufficio e alla robotica industriale con posture scorrette.
              </p>
            </Reveal>
          </div>
        </div>

        <Highlight icon={Rocket} title="Innovazione tecnologica e benessere umano">
          La partnership con Robogest rappresenta un modello di collaborazione che unisce l'eccellenza nella robotica industriale alla cura del benessere dei dipendenti, dimostrando come l'innovazione tecnologica e la salute possano andare di pari passo.
        </Highlight>
      </div>
    </section>

    {/* CHI È ROBOGEST: il sistema */}
    <section className="mx-section mx-section--deep mx-rb-sec mx-rb-sec--grid">
      <div className="mx-wrap">
        <SectionHead
          n="02"
          kicker="Chi è Robogest"
          lines={[{ text: 'Chi è Robogest,' }, { text: 'cosa fa e i suoi valori', className: 'mx-outline' }]}
          lead="Trasformiamo le idee dell'imprenditore nella lingua dei robot, portando innovazione e automazione nell'industria"
        />

        <Snap as="div" className="mx-rb-duo">
          <GlassCard icon={Bot} title="Trasformiamo le Idee in Robot" className="mx-rb-card">
            Robogest è un'azienda specializzata nella programmazione robotica, assistenza tecnica e formazione. Trasformiamo le idee dell'imprenditore nella lingua dei robot, velocizzando e migliorando la produzione industriale.
          </GlassCard>
          <GlassCard icon={Target} title="La Missione di Robogest" delay={0.08} className="mx-rb-card">
            Offriamo programmazione robot, assistenza tecnica specializzata e formazione continua. Siamo sempre alla ricerca di modi per diffondere la conoscenza e la comprensione dei robot, unita alla loro esperienza pluriennale.
          </GlassCard>
        </Snap>

        <div className="mx-rb-system">
          <Reveal className="mx-rb-panel mx-rb-services">
            <h3 className="mx-h mx-h--sm">
              <Wrench size={20} aria-hidden="true" /> I Servizi di Robogest
            </h3>
            <ul>
              {services.map((s, i) => (
                <li key={s}>
                  <code aria-hidden="true">S-{String(i + 1).padStart(2, '0')}</code>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mx-rb-panel mx-rb-values" delay={0.08}>
            <h3 className="mx-h mx-h--sm">
              <Trophy size={20} aria-hidden="true" /> I Valori di Robogest
            </h3>
            <ul>
              {values.map((v) => (
                <li key={v.name}>
                  <b>{v.name}</b>
                  <span>{v.desc}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* I numeri come strumenti di misura */}
        <Reveal className="mx-rb-numbers">
          <Crosshairs />
          <div className="mx-rb-numbers__intro">
            <h3 className="mx-h mx-h--md">
              <BarChart3 size={24} aria-hidden="true" /> I Numeri di Robogest
            </h3>
            <p className="mx-body">
              Robogest vanta una solida esperienza nel settore della robotica industriale, con risultati che testimoniano la qualità e l'affidabilità dei loro servizi.
            </p>
          </div>
          <div className="mx-rb-numbers__row">
            {stats.map((s) => (
              <div key={s.label} className="mx-rb-meter">
                <div className="mx-rb-meter__dial">
                  <Gauge fill={1} />
                  <span className="mx-rb-meter__num">
                    <Counter to={s.to} suffix={s.suffix} />
                  </span>
                </div>
                <span className="mx-rb-meter__label">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Highlight icon={Bot} title="Robogest: il futuro della robotica industriale">
          Con sede a Grugliasco (TO), Robogest continua a innovare nel settore della robotica industriale, offrendo soluzioni all'avanguardia per l'automazione e il benessere dei dipendenti.
        </Highlight>
      </div>
    </section>

    {/* BENEFICI: i moduli */}
    <section id="benefici" className="mx-section mx-section--glow mx-rb-sec">
      <div className="mx-wrap">
        <SectionHead
          n="03"
          kicker="I Benefici"
          lines={[{ text: 'Benefici della' }, { text: 'partnership', className: 'mx-gradient' }]}
          lead="I vantaggi esclusivi riservati ai dipendenti di Robogest attraverso la nostra partnership"
        />

        <ol className="mx-rb-modules">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal as="li" key={b.title} delay={(i % 2) * 0.08} className={`mx-rb-module ${i === 0 ? 'is-primary' : ''}`}>
                <Crosshairs />
                <div className="mx-rb-module__top">
                  <code>Modulo {String(i + 1).padStart(2, '0')}</code>
                  <span className="mx-rb-module__icon">
                    <Icon size={22} />
                  </span>
                </div>
                <h3 className="mx-h mx-h--md">{b.title}</h3>
                <p className="mx-body">{b.text}</p>
              </Reveal>
            )
          })}
        </ol>

        <Highlight icon={Trophy} title="Una partnership che premia l'eccellenza tecnologica">
          La partnership tra Mobilitas e Robogest rappresenta un modello di collaborazione che unisce l'innovazione tecnologica al benessere dei dipendenti, offrendo vantaggi concreti e misurabili per migliorare la qualità della vita lavorativa e personale.
        </Highlight>
      </div>
    </section>

    <FinalCta kicker="Mobilitas × Robogest" titleLines={[{ text: 'Prenota il tuo' }, { text: 'appuntamento.', className: 'mx-gradient' }]} />
  </PageShell>
)

export default Robogest
