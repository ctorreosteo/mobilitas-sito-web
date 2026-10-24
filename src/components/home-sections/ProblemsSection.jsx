import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeartCrack, Shield, Zap, Sparkles } from 'lucide-react'
import { CtaPair, Kicker, MaskLines, Photo, Reveal, ScrollWords, Snap } from './HomeKit'
import { EASE, trackSpotlight } from './homeMotion'

const problems = [
  {
    title: 'Farmaci che non curano, ma ti rendono dipendente',
    description: 'Ti danno un sollievo momentaneo, mentre nel frattempo il tuo corpo grida aiuto. Non risolvono il problema, lo nascondono, fino a quando diventa troppo grande per essere ignorato.',
    pain: 'Ti senti intrappolato in un ciclo infinito di dipendenza',
  },
  {
    title: 'Una società che ti spinge a ignorare il tuo benessere',
    description: 'Ti vendono stili di vita frenetici, ti fanno credere che puoi mangiare male, dormire poco e non muoverti... E poi ti propongono soluzioni rapide e costose per i danni che hai causato a te stesso.',
    pain: "Ti senti in colpa per non riuscire a 'stare al passo'",
  },
  {
    title: 'Un percorso frammentato, senza una vera guida',
    description: 'Dopo diversi tentativi, hai girato tra specialisti senza mai ottenere una visione completa del tuo problema. Ti manca qualcuno che ti segua davvero e ti aiuti a ritrovare equilibrio. Così finisci per convivere con il dolore, anche se dentro di te sai che meriti di meglio.',
    pain: 'Ti senti invisibile e senza speranza',
  },
  {
    title: "Il dolore che diventa la tua 'normalità'",
    description: 'Hai iniziato ad accettare il dolore come parte inevitabile della vita. Ti svegli con la schiena rigida, vai a letto con il mal di testa, e hai dimenticato come ci si sente a stare davvero bene.',
    pain: 'Hai smesso di credere che possa esistere una vita senza dolore',
  },
]

const powers = [
  {
    icon: Shield,
    title: 'Tu hai il controllo',
    text: 'Le tue abitudini quotidiane influenzano in modo diretto la qualità del tuo corpo, del tuo recupero e della tua energia.',
  },
  {
    icon: Zap,
    title: 'Il cambiamento è possibile',
    text: 'Con il giusto approccio, anche dolori cronici e disturbi ricorrenti possono migliorare in modo misurabile.',
  },
  {
    icon: Sparkles,
    title: 'La salute è una scelta',
    text: 'Non delegarla ad antidolorifici o rimedi temporanei: il tuo corpo può guarire, se lo metti nelle condizioni giuste.',
  },
]

// La foto si apre come un sipario mentre scorri
const RevealPhoto = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(14% 18% 14% 18% round 48px)', 'inset(0% 0% 0% 0% round 36px)']
  )
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])

  return (
    <motion.div ref={ref} className="mx-reveal-photo" style={{ clipPath }}>
      <motion.div style={{ scale, height: '100%' }}>
        <Photo name="home1" className="mx-parallax-img" alt="Ma c'è una verità che nessuno ti ha mai detto" />
      </motion.div>
      <div className="mx-reveal-photo__quote">
        <p className="mx-h mx-h--md">
          Ogni sintomo è un <span className="mx-accent">segnale</span>, non un punto di arrivo.
        </p>
      </div>
    </motion.div>
  )
}

const ProblemsSection = () => {
  return (
    <section className="mx-section mx-section--deep">
      <div className="mx-wrap">
        <Kicker n="02">I problemi della società moderna</Kicker>
        <h2 className="mx-h mx-h--lg" style={{ marginBottom: 48 }}>
          <MaskLines lines={[{ text: 'Ti riconosci in' }, { text: 'questa realtà?', className: 'mx-gradient' }]} />
        </h2>

        <ScrollWords
          className="mx-manifesto"
          parts={[
            'Viviamo in un mondo che ci ha abituati ad accettare il dolore come parte inevitabile della vita.',
            { text: 'Ma tu non devi accettarlo.', accent: true },
          ]}
        />

        <Snap as="ol" className="mx-problems">
          {problems.map((p, i) => (
            <motion.li
              key={p.title}
              className="mx-problem"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: EASE }}
            >
              <span className="mx-problem__n">0{i + 1}</span>
              <div>
                <h3 className="mx-h mx-h--md">{p.title}</h3>
                <p className="mx-body">{p.description}</p>
              </div>
              <p className="mx-problem__pain">
                <HeartCrack size={18} />
                {p.pain}
              </p>
            </motion.li>
          ))}
        </Snap>

        <div className="mx-truth">
          <Kicker n="03">Il momento del cambiamento</Kicker>
          <h3 className="mx-h mx-h--md" style={{ color: 'var(--muted)' }}>
            Ma c'è una verità che nessuno ti ha mai detto
          </h3>

          <p className="mx-h mx-h--xl mx-truth__statement">
            Il dolore non è una{' '}
            <span className="mx-truth__strike">
              condanna.
              <motion.i
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              />
            </span>
            <br />
            <span className="mx-gradient">È un segnale.</span>
          </p>

          <Reveal>
            <p className="mx-lead" style={{ marginTop: 40, maxWidth: 760 }}>
              Un segnale che indica la necessità di cambiare, di evolvere, di prendersi cura di sé in modo profondo e duraturo.
            </p>
          </Reveal>

          <RevealPhoto />

          <div className="mx-split">
            <Reveal>
              <h4 className="mx-h mx-h--lg">
                Il tuo <span className="mx-accent">potere</span>
              </h4>
              <p className="mx-lead" style={{ marginTop: 18 }}>
                La fortuna è che la scelta è nelle tue mani.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-body">
                Rigidità, infiammazioni, dolori cronici: sono spesso il risultato di tensioni accumulate e compensazioni che il corpo non riesce più a gestire.
              </p>
              <p className="mx-body" style={{ marginTop: 18 }}>
                Con il giusto <strong>approccio manuale</strong>, è possibile agire sulla causa e non solo sul sintomo (migliorando la mobilità, riducendo il dolore e prevenendo peggioramenti futuri).
              </p>
            </Reveal>
          </div>

          <Snap className="mx-cards3">
            {powers.map((p, i) => {
              const Icon = p.icon
              return (
                <Reveal key={p.title} delay={i * 0.1} className="mx-card" onMouseMove={trackSpotlight}>
                  <span className="mx-card__icon">
                    <Icon size={24} />
                  </span>
                  <h4 className="mx-h mx-h--sm">{p.title}</h4>
                  <p className="mx-body">{p.text}</p>
                </Reveal>
              )
            })}
          </Snap>

          <CtaPair inline />
        </div>
      </div>
    </section>
  )
}

export default ProblemsSection
