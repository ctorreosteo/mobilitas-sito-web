import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Activity, Utensils, Moon, Brain, Heart, CheckCircle } from 'lucide-react'
import { CtaPair, Kicker, MaskLines, Reveal } from './HomeKit'
import { EASE } from './homeMotion'

const pillars = [
  {
    icon: Activity,
    title: 'Movimento',
    subtitle: 'La vita è movimento, la morte è immobilità',
    description: "Aiutiamo i nostri pazienti a riconquistare libertà di movimento, fluidità e forza. L'inattività è il nemico numero uno da combattere.",
    benefits: ['Libertà di movimento', 'Forza e resistenza', 'Postura corretta', 'Mobilità articolare'],
  },
  {
    icon: Utensils,
    title: 'Alimentazione',
    subtitle: 'Il nostro carburante',
    description: 'Ciò che mettiamo nel nostro corpo determina come ci sentiamo e funzioniamo. Guidiamo verso scelte alimentari consapevoli e sostenibili.',
    benefits: ['Energia costante', 'Recupero ottimale', 'Peso ideale', 'Digestione perfetta'],
  },
  {
    icon: Moon,
    title: 'Sonno',
    subtitle: 'Il potere del recupero',
    description: 'Un sonno di qualità è il segreto per rigenerarsi e per una vita senza tensioni e dolori. Costruiamo routine di riposo che rigenerano corpo e mente.',
    benefits: ['Riposo profondo', 'Rigenerazione cellulare', 'Mente lucida', 'Energia mattutina'],
  },
  {
    icon: Brain,
    title: 'Stress',
    subtitle: "Gestione dello stress: l'equilibrio interiore",
    description: 'Lo stress cronico è uno dei maggiori nemici della salute. Offriamo strumenti pratici per imparare a gestirlo in modo efficace.',
    benefits: ['Calma interiore', 'Focus mentale', 'Relazioni migliori', 'Pace emotiva'],
  },
  {
    icon: Heart,
    title: 'Relazioni',
    subtitle: 'Il supporto emotivo e sociale',
    description: 'Le relazioni sane sono fondamentali per il benessere. Lavoriamo per migliorare la qualità delle tue connessioni umane.',
    benefits: ['Relazioni autentiche', 'Supporto emotivo', 'Comunicazione efficace', 'Benessere sociale'],
  },
]

const PillarBody = ({ pillar }) => (
  <>
    <p className="mx-body mx-pillar-panel__sub">{pillar.subtitle}</p>
    <p className="mx-body">{pillar.description}</p>
    <div className="mx-tags">
      {pillar.benefits.map((b) => (
        <span key={b} className="mx-tag">
          <CheckCircle size={15} />
          {b}
        </span>
      ))}
    </div>
  </>
)

const ServicesOverviewSection = () => {
  const [active, setActive] = useState(0)
  const pillar = pillars[active]
  const Icon = pillar.icon

  return (
    <section className="mx-section mx-section--deep">
      <div className="mx-wrap">
        <Kicker n="05">Il nostro approccio olistico</Kicker>
        <div className="mx-split" style={{ marginTop: 0, alignItems: 'end' }}>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: 'I 5 pilastri' }, { text: 'della salute.', className: 'mx-gradient' }]} />
          </h2>
          <Reveal>
            <p className="mx-lead">
              Non ci limitiamo a trattare i sintomi. <strong>Il nostro approccio tocca ogni area della vita</strong> per garantire risultati concreti e duraturi.
            </p>
          </Reveal>
        </div>

        <div className="mx-pillars">
          <ul className="mx-pillars__list" role="tablist" aria-label="I 5 pilastri della salute">
            {pillars.map((p, i) => (
              <li key={p.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="mx-pillar-panel"
                  className={`mx-pillar-btn ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                >
                  <small>0{i + 1}</small>
                  {p.title}
                </button>
                <AnimatePresence initial={false}>
                  {i === active && (
                    <motion.div
                      className="mx-pillar-inline"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <div className="mx-pillar-inline__inner">
                        <PillarBody pillar={p} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="mx-pillar-panel" id="mx-pillar-panel" role="tabpanel" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="mx-pillar-panel__icon">
                  <Icon size={32} />
                </span>
                <h3 className="mx-h mx-h--md">{pillar.title}</h3>
                <PillarBody pillar={pillar} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Reveal className="mx-quote">
          <p className="mx-h mx-h--md">
            "Non ti offriamo scorciatoie, ti offriamo una strada <span className="mx-accent">chiara e sicura</span> per stare bene davvero."
          </p>
          <p className="mx-body" style={{ marginTop: 18 }}>
            La salute non è qualcosa che ottieni da altri, è qualcosa che costruisci ogni giorno.
          </p>
        </Reveal>

        <CtaPair inline />
      </div>
    </section>
  )
}

export default ServicesOverviewSection
