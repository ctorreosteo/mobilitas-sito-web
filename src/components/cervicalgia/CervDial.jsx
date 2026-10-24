import React from 'react'
import { motion, useTransform } from 'framer-motion'

// "Il raggio di rotazione": la testa vista dall'alto, sopra le spalle.
// progress (MotionValue 0..1): a 0 il collo gira poco e il ventaglio è rosso,
// a 1 il ventaglio è ampio e verde e la testa si gira libera da un lato all'altro.
// sweep: quante oscillazioni fa la testa lungo il percorso (0 = ferma al centro).

const R_FAN = 150
const R_TICK = 182

const polar = (deg, r) => {
  const a = (deg * Math.PI) / 180
  return [Math.sin(a) * r, -Math.cos(a) * r]
}

const fanPath = (range) => {
  const h = range / 2
  const [x1, y1] = polar(-h, R_FAN)
  const [x2, y2] = polar(h, R_FAN)
  return `M0 0 L${x1.toFixed(2)} ${y1.toFixed(2)} A${R_FAN} ${R_FAN} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`
}

const arcPath = (range, r) => {
  const h = range / 2
  const [x1, y1] = polar(-h, r)
  const [x2, y2] = polar(h, r)
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

const ease = (t) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3)

const TICKS = Array.from({ length: 37 }, (_, i) => -90 + i * 5)

const CervDial = ({ progress, minRange = 34, maxRange = 168, sweep = 1.5, className = '' }) => {
  const range = useTransform(progress, (v) => minRange + (maxRange - minRange) * ease(v))
  const yaw = useTransform(progress, (v) => {
    const r = minRange + (maxRange - minRange) * ease(v)
    return sweep ? (r / 2) * 0.92 * Math.sin(v * Math.PI * 2 * sweep) : 0
  })
  const fan = useTransform(range, fanPath)
  const edge = useTransform(range, (r) => arcPath(r, R_FAN))
  const color = useTransform(progress, [0, 0.45, 1], ['#ff6869', '#38bdf8', '#72fa93'])
  const glow = useTransform(progress, [0, 1], [0.12, 0.34])

  return (
    <svg className={`mx-cerv-dial ${className}`} viewBox="-210 -212 420 300" aria-hidden="true">
      <defs>
        <linearGradient id="mx-cerv-dial-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f82d6" />
          <stop offset="55%" stopColor="#14498f" />
          <stop offset="100%" stopColor="#0a2f63" />
        </linearGradient>
      </defs>

      {/* Goniometro */}
      <path d={arcPath(180, R_TICK + 8)} className="mx-cerv-dial__track" />
      {TICKS.map((a) => {
        const long = a % 30 === 0
        const [x1, y1] = polar(a, R_TICK)
        const [x2, y2] = polar(a, long ? R_TICK - 16 : R_TICK - 8)
        return (
          <line
            key={a}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={long ? 'mx-cerv-dial__tick is-long' : 'mx-cerv-dial__tick'}
          />
        )
      })}

      {/* Ventaglio del movimento possibile */}
      <motion.path d={fan} style={{ fill: color, fillOpacity: glow }} />
      <motion.path d={edge} className="mx-cerv-dial__edge" style={{ stroke: color }} />

      {/* Spalle */}
      <path
        d="M-168 52 C-168 18 -118 4 -62 2 L62 2 C118 4 168 18 168 52 C168 74 132 84 96 84 L-96 84 C-132 84 -168 74 -168 52 Z"
        className="mx-cerv-dial__shoulders"
      />

      {/* Sguardo */}
      <motion.g style={{ rotate: yaw }}>
        <circle r={R_FAN + 12} fill="none" stroke="none" />
        <line x1="0" y1="-64" x2="0" y2={-R_FAN + 6} className="mx-cerv-dial__gaze" />
        <motion.circle cx="0" cy={-R_FAN} r="7" style={{ fill: color }} />
      </motion.g>

      {/* Testa vista dall'alto: viso chiaro davanti, capelli dietro */}
      <motion.g style={{ rotate: yaw }}>
        <circle r="84" fill="none" stroke="none" />
        <ellipse cx="-55" cy="-4" rx="9" ry="16" className="mx-cerv-dial__ear" />
        <ellipse cx="55" cy="-4" rx="9" ry="16" className="mx-cerv-dial__ear" />
        <path d="M-13 -54 Q0 -86 13 -54 Z" className="mx-cerv-dial__nose" />
        <ellipse rx="56" ry="61" fill="url(#mx-cerv-dial-head)" className="mx-cerv-dial__head" />
        <path d="M-56 -8 C-56 38 -30 61 0 61 C30 61 56 38 56 -8 C38 6 -38 6 -56 -8 Z" className="mx-cerv-dial__hair" />
        <path d="M-30 -38 Q0 -52 30 -38" className="mx-cerv-dial__brow" />
        <path d="M-22 26 Q0 40 22 26" className="mx-cerv-dial__crown" />
      </motion.g>
    </svg>
  )
}

export default CervDial
