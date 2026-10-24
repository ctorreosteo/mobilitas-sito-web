import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Heart, Award, Zap } from 'lucide-react'
import { CtaPair, Kicker, MaskLines, Photo, Reveal, Snap } from './HomeKit'
import { useParallax, trackSpotlight } from './homeMotion'

const values = [
  {
    icon: Shield,
    title: 'Estrema responsabilità',
    description: 'La salute del paziente è la nostra responsabilità, ci assumiamo il controllo di ogni aspetto per portarlo al miglior risultato possibile',
  },
  {
    icon: Heart,
    title: 'Empatia autentica',
    description: 'Non ci limitiamo ad ascoltare, comprendiamo il vissuto del paziente e lo accompagniamo nel suo percorso',
  },
  {
    icon: Award,
    title: 'Eccellenza quotidiana',
    description: 'La formazione e il miglioramento costante sono il nostro mantra per offrire sempre il meglio',
  },
  {
    icon: Zap,
    title: 'Essere dei leader',
    description: 'Siamo i primi a trattare i nostri corpi come un tempio, migliorando giorno dopo giorno e incarnando i principi e valori',
  },
]

const mission = [
  {
    label: 'La nostra visione',
    text: 'Un mondo in cui le persone camminano senza paura di muoversi, lavorano con energia e vivono con gioia.',
  },
  {
    label: 'Il nostro impegno',
    text: 'Liberare le persone dal dolore, prevenire anziché curare, diffondere una cultura del benessere.',
  },
  {
    label: 'La nostra causa',
    text: 'Un mondo senza dolori evitabili, una società più consapevole e responsabile del proprio benessere.',
  },
]

const BioSection = () => {
  const [aRef, aY] = useParallax(6)
  const [bRef, bY] = useParallax(10)

  return (
    <>
      <section className="mx-section mx-section--glow">
        <div className="mx-wrap">
          <Kicker n="06">Chi siamo</Kicker>
          <h2 className="mx-h mx-h--xl">
            <MaskLines lines={[{ text: 'Non siamo' }, { text: 'semplici' }, { text: 'osteopati.', className: 'mx-outline' }]} />
          </h2>
          <Reveal>
            <p className="mx-lead" style={{ marginTop: 36, maxWidth: 820 }}>
              Siamo <strong>coach del benessere, leader del cambiamento, catalizzatori di trasformazioni reali.</strong>
            </p>
          </Reveal>

          <div className="mx-collage">
            <div className="mx-collage__a" ref={aRef}>
              <motion.div style={{ y: aY, height: '100%' }}>
                <Photo name="home8" className="mx-parallax-img" sizes="(min-width: 1280px) 900px, 72vw" alt="Coach del benessere, leader del cambiamento" />
              </motion.div>
            </div>
            <div className="mx-collage__b" ref={bRef}>
              <motion.div style={{ y: bY, height: '100%' }}>
                <Photo name="home3" className="mx-parallax-img" sizes="(min-width: 1280px) 620px, 50vw" alt="Un nuovo modo di vivere la salute" />
              </motion.div>
            </div>
            <span className="mx-collage__label">Noi siamo la guida, tu sei il protagonista.</span>
          </div>

          <Reveal>
            <p className="mx-manifesto" style={{ marginTop: 'clamp(72px, 9vw, 130px)' }}>
              Ogni giorno ci alziamo con una missione chiara e potente:{' '}
              <span className="mx-accent">restituire alle persone il diritto di vivere senza dolore</span>, di sentirsi libere nel proprio corpo, di riprendersi in mano la propria salute.
            </p>
          </Reveal>

          <Reveal className="mx-mission">
            {mission.map((m) => (
              <div key={m.label}>
                <span className="mx-mission__label">{m.label}</span>
                <p className="mx-body" style={{ color: 'var(--cream)' }}>{m.text}</p>
              </div>
            ))}
          </Reveal>

          <h3 className="mx-h mx-h--md" style={{ marginTop: 'clamp(72px, 9vw, 120px)' }}>
            I nostri principi guida
          </h3>
          <Snap className="mx-values">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <Reveal key={v.title} delay={i * 0.08} className="mx-card" onMouseMove={trackSpotlight}>
                  <span className="mx-card__icon">
                    <Icon size={24} />
                  </span>
                  <h4 className="mx-h mx-h--sm">{v.title}</h4>
                  <p className="mx-body">{v.description}</p>
                </Reveal>
              )
            })}
          </Snap>
        </div>
      </section>

      <section className="mx-final" id="mx-final">
        <span className="mx-final__ring" aria-hidden="true" />
        <span className="mx-final__ring" aria-hidden="true" />
        <span className="mx-final__ring" aria-hidden="true" />
        <div className="mx-wrap">
          <Reveal>
            <img className="mx-final__logo" src="/pittogramma.png" alt="" />
          </Reveal>
          <Kicker>Un nuovo modo di vivere la salute</Kicker>
          <h2 className="mx-h mx-h--xl">
            <MaskLines lines={[{ text: 'Un tocco.' }, { text: 'Una trasformazione.', className: 'mx-gradient' }]} />
          </h2>
          <Reveal>
            <p className="mx-lead" style={{ margin: '36px auto 0', maxWidth: 720 }}>
              Entrare a fare un percorso in Mobilitas significa fare una scelta diversa. Significa smettere di delegare la propria salute a terzi e prenderne il controllo, giorno dopo giorno.{' '}
              <strong>Noi siamo la guida, tu sei il protagonista.</strong>
            </p>
          </Reveal>
          <CtaPair />
        </div>
      </section>
    </>
  )
}

export default BioSection
