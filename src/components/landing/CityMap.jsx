import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE } from '../home-sections/homeMotion'
import { STUDI } from '../../data/studi'
import './city-map.css'

// Mappa illustrata di Torino: la metro M1 con Bernini, Principi d'Acaja e Re Umberto e i due studi vicini.
// Si disegna quando entra nello schermo (linea, poi i segnaposto che cadono).
export default function CityMap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const draw = (delay) => ({
    initial: { pathLength: 0 },
    animate: inView ? { pathLength: 1 } : { pathLength: 0 },
    transition: { duration: 1.6, ease: EASE, delay },
  })
  const drop = (delay) => ({
    initial: { y: -40, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 },
    transition: { type: 'spring', stiffness: 260, damping: 16, delay },
  })

  return (
    <div className="mx-city" ref={ref}>
      <svg viewBox="0 0 600 440" className="mx-city__svg" aria-hidden="true">
        <defs>
          <pattern id="mx-city-grid" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <path d="M34 0 L0 0 0 34" fill="none" stroke="rgba(244,244,244,0.07)" strokeWidth="1" />
          </pattern>
          <radialGradient id="mx-city-pinglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#72fa93" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#72fa93" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="440" fill="url(#mx-city-grid)" />
        {/* fiume */}
        <motion.path
          d="M560 -10 C 520 80, 540 150, 500 220 C 470 280, 500 350, 470 450"
          fill="none"
          stroke="rgba(56,189,248,0.35)"
          strokeWidth="16"
          strokeLinecap="round"
          {...draw(0)}
        />
        {/* metro */}
        <motion.path
          d="M20 150 L 300 130 C 330 128, 346 140, 350 170 L 362 330 L 380 450"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="0"
          {...draw(0.2)}
        />
        <g className="mx-city__stop">
          {/* Da ovest verso il centro: prima Bernini, poi Principi d'Acaja */}
          <circle cx="104" cy="144" r="7" />
          <text x="104" y="126" textAnchor="middle">Bernini</text>
          <circle cx="212" cy="136" r="7" />
          <text x="212" y="118" textAnchor="middle">Principi d'Acaja</text>
          {/* Re Umberto: la fermata vicina allo studio di Via Lamarmora */}
          <circle cx="356" cy="250" r="7" />
          <text x="372" y="255" textAnchor="start">Re Umberto</text>
        </g>
        <text className="mx-city__line" x="30" y="176">M1</text>

        {/* Via Peyron 54 */}
        <motion.g {...drop(0.9)}>
          <circle cx="150" cy="74" r="46" fill="url(#mx-city-pinglow)" />
          <path className="mx-city__pin" d="M150 78 C 150 78, 130 56, 130 42 A 20 20 0 1 1 170 42 C 170 56, 150 78, 150 78 Z" />
          <circle cx="150" cy="42" r="7" fill="#002552" />
        </motion.g>
        {/* Via Lamarmora 35, a due passi dalla fermata Re Umberto */}
        <motion.g {...drop(1.15)}>
          <circle cx="280" cy="286" r="46" fill="url(#mx-city-pinglow)" />
          <path className="mx-city__pin" d="M280 290 C 280 290, 260 268, 260 254 A 20 20 0 1 1 300 254 C 300 268, 280 290, 280 290 Z" />
          <circle cx="280" cy="254" r="7" fill="#002552" />
        </motion.g>
      </svg>

      <motion.span className="mx-city__label mx-city__label--a" {...drop(1.1)}>
        <b>{STUDI[0].nome}</b>
        <small>{STUDI[0].zona}</small>
      </motion.span>
      <motion.span className="mx-city__label mx-city__label--b" {...drop(1.35)}>
        <b>{STUDI[1].nome}</b>
        <small>{STUDI[1].zona}</small>
      </motion.span>
    </div>
  )
}
