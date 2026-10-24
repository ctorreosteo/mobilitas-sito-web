import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { CtaPair, Kicker, MaskLines, Photo, Reveal } from './HomeKit'
import { useParallax } from './homeMotion'

const targetPoints = [
  { title: 'Chi è stanco di dipendere dai farmaci', description: 'e vuole una soluzione duratura' },
  {
    title: 'Chi desidera comprendere meglio il proprio corpo',
    description: 'e affiancare un approccio più attivo e consapevole a quello medico tradizionale.',
  },
  { title: 'Chi è pronto a impegnarsi', description: 'per cambiare le proprie abitudini' },
  { title: 'Chi vuole invecchiare in salute', description: 'e godersi la pensione' },
]

const notTargetPoints = [
  'Chi cerca soluzioni rapide senza voler cambiare nulla',
  'Chi vuole solo "la pillola magica" per risolvere tutto',
  'Chi non è disposto a prendersi responsabilità per la propria salute',
  'Chi si affida solo a soluzioni standard senza voler partecipare attivamente al cambiamento.',
  'Chi accetta il dolore come parte inevitabile della vita',
]

// Le frasi "per chi non è" vengono barrate una alla volta quando entrano in vista
const NotTargetList = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -25% 0px' })

  return (
    <ul className="mx-list" ref={ref}>
      {notTargetPoints.map((point, i) => (
        <li key={point}>
          <span className="mx-list__n">0{i + 1}</span>
          <span className="mx-list__t">
            <span
              className={`mx-strike ${inView ? 'is-on' : ''}`}
              style={{ transitionDelay: `${0.4 + i * 0.25}s` }}
            >
              {point}
            </span>
          </span>
        </li>
      ))}
    </ul>
  )
}

const TargetAudienceSection = () => {
  const [bandRef, bandY] = useParallax(8)
  const [side, setSide] = useState('yes')

  return (
    <section className="mx-section mx-section--glow">
      <div className="mx-wrap">
        <Kicker n="01">Per chi è Mobilitas?</Kicker>

        <h2 className="mx-h mx-h--xl">
          <MaskLines
            lines={[
              { text: 'Non siamo' },
              { text: 'per tutti.', className: 'mx-outline' },
            ]}
          />
        </h2>

        <Reveal className="mx-photo-band">
          <div ref={bandRef} style={{ height: '100%' }}>
            <motion.div style={{ y: bandY, height: '100%' }}>
              <Photo
                name="home4"
                className="mx-parallax-img"
                sizes="(min-width: 1280px) 1200px, 100vw"
                alt="Siamo per chi è pronto a prendere il controllo della propria salute"
              />
            </motion.div>
          </div>
          <div className="mx-photo-band__text">
            <p className="mx-h mx-h--md">
              Siamo per chi è pronto a <span className="mx-accent">prendere il controllo</span> della propria salute.
            </p>
          </div>
        </Reveal>

        <div className="mx-switch" role="tablist" aria-label="Per chi è Mobilitas" data-side={side}>
          <span className="mx-switch__thumb" aria-hidden="true" />
          <button type="button" role="tab" aria-selected={side === 'yes'} onClick={() => setSide('yes')}>
            <Check size={16} strokeWidth={3} />
            Per chi è
          </button>
          <button type="button" role="tab" aria-selected={side === 'no'} onClick={() => setSide('no')}>
            <X size={16} strokeWidth={3} />
            Per chi non è
          </button>
        </div>

        <div className="mx-audience" data-side={side}>
          <Reveal className="mx-panel mx-panel--yes">
            <div className="mx-panel__head">
              <span className="mx-panel__badge">
                <Check size={26} strokeWidth={3} />
              </span>
              <div>
                <h3 className="mx-h mx-h--md">Per chi è Mobilitas</h3>
                <p className="mx-body mx-small">Il tuo profilo ideale</p>
              </div>
            </div>
            <ul className="mx-list">
              {targetPoints.map((point, i) => (
                <li key={point.title}>
                  <span className="mx-list__n">0{i + 1}</span>
                  <span className="mx-list__t">
                    {point.title}
                    <span className="mx-list__d">{point.description}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mx-panel__foot">
              <small>La tua domanda</small>
              "Sei pronto a diventare il leader della tua salute?"
            </div>
          </Reveal>

          <Reveal className="mx-panel mx-panel--no" delay={0.12}>
            <div className="mx-panel__head">
              <span className="mx-panel__badge">
                <X size={26} strokeWidth={3} />
              </span>
              <div>
                <h3 className="mx-h mx-h--md">Per chi non è Mobilitas</h3>
                <p className="mx-body mx-small">Non è il momento giusto</p>
              </div>
            </div>
            <NotTargetList />
            <div className="mx-panel__foot">
              <small>Attenzione</small>
              "Se cerchi scorciatoie, non siamo la soluzione giusta per te"
            </div>
          </Reveal>
        </div>

        <CtaPair inline />
      </div>
    </section>
  )
}

export default TargetAudienceSection
