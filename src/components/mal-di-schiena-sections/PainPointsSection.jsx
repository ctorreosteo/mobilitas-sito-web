import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import { Heart, Target, Zap, Shield, Clock, CheckCircle } from 'lucide-react'
import { Counter, Reveal } from '../home-sections/HomeKit'
import { EASE } from '../home-sections/homeMotion'

const painPoints = [
  {
    icon: Heart,
    painPoint: "Il dolore ti impedisce di goderti la vita quotidiana",
    empathy: "Sappiamo quanto sia frustrante non riuscire a fare le cose più semplici senza dolore",
    solution: "Il trattamento osteopatico agisce direttamente sulla causa del dolore, non solo sui sintomi, restituendoti la libertà di movimento che meriti"
  },
  {
    icon: Target,
    painPoint: "I farmaci non risolvono il problema alla radice",
    empathy: "È normale sentirsi scoraggiati quando i farmaci alleviano temporaneamente ma il dolore torna sempre",
    solution: "L'osteopata identifica e corregge le disfunzioni strutturali che causano il dolore, offrendo una soluzione duratura senza dipendenza da farmaci"
  },
  {
    icon: Zap,
    painPoint: "Il dolore peggiora con il movimento, oppure se stai tanto tempo nella stessa posizione",
    empathy: "Ti senti limitato nelle tue attività preferite e questo influisce negativamente sulla tua qualità di vita",
    solution: "Il trattamento osteopatico ripristina la mobilità articolare e la funzionalità muscolare, permettendoti di tornare alle tue attività con fiducia"
  },
  {
    icon: Shield,
    painPoint: "Hai paura che il dolore peggiori con il tempo",
    empathy: "È comprensibile preoccuparsi per il futuro quando il dolore sembra peggiorare progressivamente",
    solution: "L'osteopatia previene il peggioramento del problema correggendo le cause alla radice, proteggendo la tua salute a lungo termine"
  },
  {
    icon: Clock,
    painPoint: "Il dolore influisce sul tuo sonno e sulla concentrazione",
    empathy: "Quando il dolore ti tiene sveglio la notte, tutto il resto della tua vita ne risente",
    solution: "Risolvendo le tensioni muscolari e articolari, il trattamento osteopatico migliora la qualità del sonno e la tua capacità di concentrazione"
  }
]

const steps = [
  { n: 1, title: 'Anamnesi', text: 'Analizziamo la tua storia clinica e i sintomi per capire la causa del problema' },
  { n: 2, title: 'Valutazione', text: 'Esaminiamo la tua postura e identifichiamo le disfunzioni strutturali' },
  { n: 3, title: 'Trattamento', text: 'Applichiamo tecniche osteopatiche specifiche per correggere le disfunzioni' },
  { n: 4, title: 'Risultato', text: 'Recuperi la mobilità, elimini il dolore e previeni il ritorno del problema con i nostri consigli personalizzati' },
]

// Una vertebra per problema: rossa finché non arriva la soluzione, poi si allinea e diventa verde.
function PainRow({ item, index }) {
  const ref = useRef(null)
  const solved = useInView(ref, { once: true, margin: '0px 0px -38% 0px' })
  const Icon = item.icon

  return (
    <li className={`mx-mds-vert ${solved ? 'is-solved' : ''}`}>
      <div className="mx-mds-vert__bone" aria-hidden="true">
        <span className="mx-mds-vert__body">
          <Icon size={18} strokeWidth={2.4} />
        </span>
      </div>

      <div className="mx-mds-vert__card">
        <span className="mx-mds-vert__n">L{index + 1}</span>
        <h3 className="mx-h mx-h--sm mx-mds-vert__pain">{item.painPoint}</h3>
        <p className="mx-mds-vert__empathy">{item.empathy}</p>

        <div ref={ref} className="mx-mds-vert__fix">
          <h4 className="mx-mds-vert__fix-title">
            <CheckCircle size={16} strokeWidth={2.6} />
            {index === 0 ? 'La Soluzione' : "La Soluzione dell'Osteopata"}
          </h4>
          <p>{item.solution}</p>
        </div>
      </div>
    </li>
  )
}

export default function PainPointsSection() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] })
  const cord = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })

  return (
    <section className="mx-section mx-mds-pain">
      <div className="mx-wrap">
        <Reveal className="mx-mds-pain__head">
          <h2 className="mx-h mx-h--lg">
            Il Mal di Schiena Sta <span className="mx-mds-hurt">Rovinando le Tue Giornate</span>?
          </h2>
          <p className="mx-lead mx-mds-pain__lead">
            Sappiamo quanto il mal di schiena possa influenzare ogni aspetto della tua vita.
            Ecco perché il trattamento osteopatico è la soluzione che stavi cercando.
          </p>
        </Reveal>

        <div className="mx-mds-stats">
          <Reveal className="mx-mds-stat mx-mds-stat--red" delay={0}>
            <span className="mx-mds-stat__num"><Counter to={30} suffix="%" /></span>
            <p>degli adulti soffre di mal di schiena ricorrente</p>
          </Reveal>
          <Reveal className="mx-mds-stat mx-mds-stat--sky" delay={0.08}>
            <span className="mx-mds-stat__num"><Counter to={70} suffix="%" /></span>
            <p>dei casi di mal di schiena sono causati da problemi muscolo-scheletrici</p>
          </Reveal>
          <Reveal className="mx-mds-stat mx-mds-stat--green" delay={0.16}>
            <span className="mx-mds-stat__num"><Counter to={98} suffix="%" /></span>
            <p>dei nostri pazienti risolve il problema in 1-4 sedute</p>
          </Reveal>
        </div>

        <div className="mx-mds-spine-wrap">
          <div ref={listRef} className="mx-mds-spine">
            <span className="mx-mds-spine__cord" aria-hidden="true">
              <motion.i style={{ scaleY: cord }} />
            </span>
            <ol className="mx-mds-spine__list">
              {painPoints.map((item, index) => (
                <PainRow key={index} item={item} index={index} />
              ))}
            </ol>
          </div>

          <figure className="mx-mds-spine__photo mx-mds-photo-desk" aria-hidden="true">
            <img
              src="/trattamenti/web/schiena_lombare-supino_01_orizzontale-1600.jpg"
              srcSet="/trattamenti/web/schiena_lombare-supino_01_orizzontale-900.jpg 900w, /trattamenti/web/schiena_lombare-supino_01_orizzontale-1600.jpg 1600w"
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <div className="mx-mds-how">
          <figure className="mx-mds-how__photo">
            <img
              src="/trattamenti/web/schiena_lombare-prono_14_orizzontale-1600.jpg"
              srcSet="/trattamenti/web/schiena_lombare-prono_14_orizzontale-900.jpg 900w, /trattamenti/web/schiena_lombare-prono_14_orizzontale-1600.jpg 1600w"
              style={{ objectPosition: '45% 70%' }}
              sizes="(min-width: 1280px) 1180px, 100vw"
              alt="Osteopata Mobilitas durante un trattamento della zona lombare"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <h3 className="mx-h mx-h--lg">
                Come Funziona il <span className="mx-accent">Trattamento Osteopatico</span>
              </h3>
            </figcaption>
          </figure>

          <ol className="mx-mds-steps">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                className={`mx-mds-step ${s.n === 4 ? 'mx-mds-step--end' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              >
                <span className="mx-mds-step__n">{s.n}</span>
                <h4 className="mx-h mx-h--sm">{s.title}</h4>
                <p className="mx-body">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
