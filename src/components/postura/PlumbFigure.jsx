import React from 'react'
import { motion, useTransform } from 'framer-motion'

// "Il filo a piombo": una figura di profilo (guarda a destra) accanto al filo.
// progress 0..1 guida le tre fasi del metodo:
//   Valuta (0 → 0.33): la linea di scansione scende, la deviazione della testa è evidenziata
//   Correggi (0.33 → 0.66): la colonna si raddrizza e la testa torna sopra le spalle
//   Consolida (0.66 → 1): la figura resta allineata e si accende di verde

const LINE_X = 150

// Colonna dal cranio al sacro: prima (testa avanti, schiena a C) e dopo (curve morbide)
const BAD = [
  [186, 104], [176, 121], [165, 138], [152, 156], [139, 175], [130, 195],
  [127, 215], [129, 235], [135, 255], [143, 273], [150, 290], [155, 305],
]
const GOOD = [
  [157, 100], [155, 118], [152, 136], [149, 155], [147, 175], [146, 195],
  [147, 215], [149, 235], [152, 255], [155, 272], [156, 289], [155, 305],
]
const HEAD = { bad: [204, 70, 14], good: [158, 62, 0] } // x, y, inclinazione
const KNEE = { bad: [163, 366], good: [153, 366] }
const ANKLE = { bad: [151, 412], good: [152, 412] }

const clamp = (v) => Math.min(1, Math.max(0, v))
const smooth = (t) => t * t * (3 - 2 * t)
const lerp = (a, b, t) => a + (b - a) * t
const alignOf = (v) => smooth(clamp((v - 0.3) / 0.36))

const pointsAt = (t) => BAD.map(([x, y], i) => [lerp(x, GOOD[i][0], t), lerp(y, GOOD[i][1], t)])

// Catmull-Rom -> curve di Bézier
const curve = (pts) => {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

const Vertebra = ({ i, progress, color }) => {
  const x = useTransform(progress, (v) => {
    const pts = pointsAt(alignOf(v))
    return pts[i][0]
  })
  const y = useTransform(progress, (v) => pointsAt(alignOf(v))[i][1])
  const rotate = useTransform(progress, (v) => {
    const pts = pointsAt(alignOf(v))
    const a = pts[Math.max(0, i - 1)]
    const b = pts[Math.min(pts.length - 1, i + 1)]
    return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI - 90
  })
  const w = 13 + i * 0.9
  return (
    <motion.g style={{ x, y }}>
      <motion.rect
        x={-w / 2}
        y={-3.6}
        width={w}
        height={7.2}
        rx={3.4}
        style={{ rotate, fill: color }}
      />
    </motion.g>
  )
}

const PlumbFigure = ({ progress, className = '' }) => {
  const spine = useTransform(progress, (v) => curve(pointsAt(alignOf(v))))
  const color = useTransform(progress, [0, 0.3, 0.55, 0.75], ['#ff6869', '#ff6869', '#f4f4f4', '#72fa93'])
  const halo = useTransform(progress, [0.62, 0.85], [0, 1])
  const scanY = useTransform(progress, [0, 0.3], [18, 418])
  const scanO = useTransform(progress, [0, 0.03, 0.27, 0.32], [0, 1, 1, 0])
  const devO = useTransform(progress, [0.25, 0.55], [1, 0])

  const headX = useTransform(progress, (v) => lerp(HEAD.bad[0], HEAD.good[0], alignOf(v)))
  const headY = useTransform(progress, (v) => lerp(HEAD.bad[1], HEAD.good[1], alignOf(v)))
  const headR = useTransform(progress, (v) => lerp(HEAD.bad[2], HEAD.good[2], alignOf(v)))

  const neck = useTransform(progress, (v) => {
    const t = alignOf(v)
    const hx = lerp(HEAD.bad[0], HEAD.good[0], t)
    const hy = lerp(HEAD.bad[1], HEAD.good[1], t)
    const [sx, sy] = pointsAt(t)[0]
    return `M${(hx - 6).toFixed(1)} ${(hy + 26).toFixed(1)} Q${((hx + sx) / 2 - 4).toFixed(1)} ${((hy + sy) / 2 + 8).toFixed(1)} ${sx.toFixed(1)} ${sy.toFixed(1)}`
  })

  const legs = useTransform(progress, (v) => {
    const t = alignOf(v)
    const [px, py] = pointsAt(t)[11]
    const kx = lerp(KNEE.bad[0], KNEE.good[0], t)
    const ax = lerp(ANKLE.bad[0], ANKLE.good[0], t)
    return `M${px.toFixed(1)} ${(py + 14).toFixed(1)} L${kx.toFixed(1)} ${KNEE.bad[1]} L${ax.toFixed(1)} ${ANKLE.bad[1]} L${(ax + 22).toFixed(1)} ${ANKLE.bad[1] + 2}`
  })

  const pelvisX = useTransform(progress, (v) => pointsAt(alignOf(v))[11][0])
  const pelvisR = useTransform(progress, (v) => lerp(-16, -4, alignOf(v)))

  // Spalla: avanti e chiusa prima, sopra il filo dopo
  const shoulderX = useTransform(progress, (v) => lerp(172, 152, alignOf(v)))
  const shoulderY = useTransform(progress, (v) => lerp(156, 146, alignOf(v)))

  // Deviazione: distanza orizzontale tra filo e orecchio
  const devPath = useTransform(headX, (hx) => `M${LINE_X} 70 H${hx.toFixed(1)}`)

  return (
    <svg className={`mx-post-fig ${className}`} viewBox="40 0 240 430" aria-hidden="true">
      <defs>
        <radialGradient id="mx-post-fig-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#72fa93" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#72fa93" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.ellipse cx="152" cy="220" rx="120" ry="210" fill="url(#mx-post-fig-halo)" style={{ opacity: halo }} />

      {/* Righello */}
      {Array.from({ length: 22 }, (_, i) => (
        <line key={i} x1="52" x2={i % 5 === 0 ? 66 : 60} y1={20 + i * 19} y2={20 + i * 19} className="mx-post-fig__rule" />
      ))}

      {/* Filo a piombo */}
      <line x1={LINE_X} y1="6" x2={LINE_X} y2="404" className="mx-post-fig__line" />
      <path d={`M${LINE_X} 404 l-7 6 l7 16 l7 -16 Z`} className="mx-post-fig__bob" />
      <circle cx={LINE_X} cy="6" r="3.5" className="mx-post-fig__bob" />

      {/* Scansione (Valuta) */}
      <motion.g style={{ y: scanY, opacity: scanO }}>
        <line x1="60" x2="270" y1="0" y2="0" className="mx-post-fig__scan" />
        <rect x="60" y="-26" width="210" height="26" className="mx-post-fig__scanfill" />
      </motion.g>

      {/* Deviazione della testa */}
      <motion.g style={{ opacity: devO }}>
        <motion.path d={devPath} className="mx-post-fig__dev" />
        <circle cx={LINE_X} cy="70" r="3" className="mx-post-fig__devdot" />
      </motion.g>

      {/* Gambe e bacino */}
      <motion.path d={legs} className="mx-post-fig__limb" />
      <motion.g style={{ x: pelvisX, y: 312 }}>
        <motion.ellipse rx="22" ry="12" style={{ rotate: pelvisR }} className="mx-post-fig__pelvis" />
      </motion.g>

      {/* Colonna */}
      <motion.path d={spine} className="mx-post-fig__cord" style={{ stroke: color }} />
      {BAD.map((_, i) => (
        <Vertebra key={i} i={i} progress={progress} color={color} />
      ))}

      {/* Spalla */}
      <motion.circle r="9" cx={shoulderX} cy={shoulderY} className="mx-post-fig__joint" />

      {/* Collo e testa */}
      <motion.path d={neck} className="mx-post-fig__neck" />
      <motion.g style={{ x: headX, y: headY }}>
        <motion.g style={{ rotate: headR }}>
          <circle r="27" className="mx-post-fig__head" />
          <path d="M25 -2 l9 6 l-9 4 Z" className="mx-post-fig__nose" />
          <circle cx="-3" cy="2" r="5" className="mx-post-fig__ear" />
        </motion.g>
      </motion.g>
    </svg>
  )
}

export default PlumbFigure
