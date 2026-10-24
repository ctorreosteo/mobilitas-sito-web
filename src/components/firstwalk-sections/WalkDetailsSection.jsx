import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Clock, Route, Timer, Ruler, TrendingUp, Calendar, ArrowDown } from 'lucide-react'
import { Reveal } from '../home-sections/HomeKit'
import { EASE } from '../home-sections/homeMotion'

const stats = [
  { icon: Timer, label: "Durata", value: "3 ore" },
  { icon: Ruler, label: "Distanza", value: "4,5 km" },
  { icon: TrendingUp, label: "Difficoltà", value: "Facile" },
  { icon: Calendar, label: "Data", value: "4 ottobre" }
]

const timeline = [
  { time: "15:00", title: "Ritrovo", description: "Punto di partenza - Parcheggio gratuito disponibile" },
  { time: "15:15", title: "Partenza", description: "Inizio della camminata guidata" },
  { time: "16:30", title: "Pausetta", description: "Moment di relax e ristoro" },
  { time: "18:00", title: "Arrivo", description: "Rientro al punto di partenza" }
]

const route = [
  { text: 'Partenza da Superga', tone: 'green' },
  { text: 'Sentiero panoramico attraverso la natura', tone: 'sky' },
  { text: 'Pausa merenda con vista', tone: 'navy' },
  { text: 'Rientro attraverso il sentiero', tone: 'green' },
]

// Il programma come un sentiero: la traccia si disegna mentre scorri
// e un puntino-camminatore la percorre da una tappa all'altra.
function TrailProgram() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const top = useTransform(p, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="mx-walk-prog">
      <div className="mx-walk-prog__rail" aria-hidden="true">
        <svg viewBox="0 0 40 400" preserveAspectRatio="none">
          <path d="M20 0 C 36 60, 4 110, 20 160 S 36 260, 20 300 S 4 370, 20 400" className="mx-walk-prog__ghost" />
          <motion.path
            d="M20 0 C 36 60, 4 110, 20 160 S 36 260, 20 300 S 4 370, 20 400"
            className="mx-walk-prog__path"
            style={{ pathLength: p }}
          />
        </svg>
        <motion.span className="mx-walk-prog__walker" style={{ top }} />
      </div>

      <ol className="mx-walk-prog__list">
        {timeline.map((item) => (
          <li key={item.time}>
            <span className="mx-walk-prog__time">{item.time}</span>
            <div>
              <h4 className="mx-h mx-walk-prog__t">{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function WalkDetailsSection() {
  return (
    <section className="mx-walk-sec mx-walk-details">
      <div className="mx-wrap">
        <Reveal className="mx-walk-head mx-walk-head--center">
          <h2 className="mx-h mx-walk-h2 mx-walk-h2--xl">
            Dettagli della
            <span className="mx-walk-details__block">Camminata</span>
          </h2>
          <p className="mx-walk-lead">
            Tutto quello che devi sapere per vivere al meglio la tua esperienza nella natura
          </p>
        </Reveal>

        <ul className="mx-walk-signs">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.li
                key={stat.label}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 1.5 : -1.5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: index * 0.07 }}
              >
                <Icon size={20} strokeWidth={2.2} />
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </motion.li>
            )
          })}
        </ul>

        <div className="mx-walk-details__grid">
          <Reveal className="mx-walk-panel">
            <div className="mx-walk-panel__head">
              <span className="mx-walk-panel__ic"><Clock size={22} strokeWidth={2.2} /></span>
              <h3 className="mx-h mx-walk-panel__t">Programma della Giornata</h3>
            </div>

            <TrailProgram />

            <div className="mx-walk-start">
              <h4 className="mx-h mx-walk-start__t">📍 Punto di Partenza e arrivo</h4>
              <p className="mx-walk-start__place">Superga</p>
              <p className="mx-walk-start__note">Parcheggio gratuito disponibile</p>
            </div>
          </Reveal>

          <Reveal className="mx-walk-panel" delay={0.1}>
            <div className="mx-walk-panel__head">
              <span className="mx-walk-panel__ic"><Route size={22} strokeWidth={2.2} /></span>
              <h3 className="mx-h mx-walk-panel__t">Itinerario</h3>
            </div>

            <figure className="mx-walk-map">
              <img
                src="/itinerario.jpg"
                srcSet="/firstwalk/web/itinerario-900.jpg 900w, /itinerario.jpg 1280w"
                sizes="(min-width: 1024px) 560px, 92vw"
                alt="Mappa dell'itinerario della camminata"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <div className="mx-walk-route">
              <h4 className="mx-h mx-walk-route__t">🗺️ Percorso</h4>
              <ul>
                {route.map((r) => (
                  <li key={r.text}>
                    <i className={`is-${r.tone}`} />
                    {r.text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mx-walk-center">
          <motion.button
            type="button"
            onClick={() => {
              const offerSection = document.getElementById('offer-section');
              if (offerSection) {
                offerSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="mx-walk-btn"
            whileTap={{ scale: 0.97 }}
          >
            <span>Scegli ora il tuo pacchetto</span>
            <span className="mx-walk-btn__ic"><ArrowDown size={20} strokeWidth={2.4} /></span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
