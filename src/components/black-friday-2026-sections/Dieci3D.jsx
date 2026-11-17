import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

// Elemento firma dell'apertura: il numero 10 pieno, estruso in 3D (strati sovrapposti in profondità, dal verde scuro
// del fianco al verde chiaro della faccia), con un anello che gli gira intorno e lo attraversa.
// Si assembla all'arrivo (gli strati si allontanano), oscilla piano e segue il puntatore su desktop.
// Solo transform: oscillazione e anello sono animazioni CSS ferme fuori schermo; con "riduci movimento" è tutto fermo.
// Decorativo: il testo vero è nel titolo.

const STRATI = 22
const PASSO = 2.6 // px di profondità tra uno strato e l'altro (spessore totale ~55px)

// Colore del fianco: dal verde scuro (dietro) al verde pieno (vicino alla faccia)
const DIETRO = [9, 70, 46]
const DAVANTI = [46, 196, 103]
const coloreStrato = (t) => `rgb(${DIETRO.map((c, k) => Math.round(c + (DAVANTI[k] - c) * t)).join(' ')})`

export default function Dieci3D({ className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref)
  const [built, setBuilt] = useState(false)

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const molla = { stiffness: 90, damping: 18, mass: 0.8 }
  const rotateX = useSpring(useTransform(py, [-1, 1], [12, -12]), molla)
  const rotateY = useSpring(useTransform(px, [-1, 1], [-18, 18]), molla)

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setBuilt(true))
    return () => window.cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    const onMove = (e) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1)
      py.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, px, py])

  return (
    <div
      ref={ref}
      className={`bfx-ten ${built ? 'is-built' : ''} ${inView && !reduce ? 'is-live' : ''} ${className}`}
      aria-hidden="true"
    >
      <span className="bfx-ten__glow" />
      <motion.div className="bfx-ten__tilt" style={{ rotateX, rotateY }}>
        <div className="bfx-ten__spin">
          <div className="bfx-ten__ring">
            <i className="bfx-ten__dot" />
          </div>
          {Array.from({ length: STRATI }, (_, i) => {
            const t = i / (STRATI - 1)
            const fronte = i === STRATI - 1
            return (
              <span
                key={i}
                className={`bfx-ten__layer ${fronte ? 'is-front' : ''}`}
                style={{
                  '--z': `${(i - (STRATI - 1) / 2) * PASSO}px`,
                  '--d': `${(STRATI - 1 - i) * 22}ms`,
                  ...(fronte ? {} : { color: coloreStrato(t) }),
                }}
              >
                10
              </span>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
