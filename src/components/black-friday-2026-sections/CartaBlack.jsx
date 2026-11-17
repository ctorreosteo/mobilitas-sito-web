import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

// Elemento firma dell'apertura di /black-friday-2026: la carta Black Friday. Nera, in metallo spazzolato, con un
// riflesso olografico verde e il 10 in rilievo: è quello che il paziente compra (10 visite, 5 in omaggio, 450€).
// Stesso linguaggio del biglietto 3D di /black-friday-2026-amico (AmicoKit → Invito): CSS 3D, nessuna libreria.
// Entra ruotando e si posa; poi galleggia, un lampo di luce la attraversa e su desktop si inclina col puntatore
// (la luce segue il puntatore). Con "riduci movimento" è ferma nella posa finale.
// Decorativa: prezzo, scadenza e offerta sono già nel titolo, nel bottone e nel conto alla rovescia.

export default function CartaBlack({ visite, prezzo, prezzoPieno, scadenzaBreve, className = '' }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const molla = { stiffness: 120, damping: 18, mass: 0.7 }
  const sx = useSpring(x, molla)
  const sy = useSpring(y, molla)
  const rotateY = useTransform(sx, [-1, 1], [-14, 14])
  const rotateX = useTransform(sy, [-1, 1], [10, -10])
  const gx = useTransform(sx, [-1, 1], [15, 85])
  const gy = useTransform(sy, [-1, 1], [10, 90])
  const luce = useMotionTemplate`radial-gradient(60% 70% at ${gx}% ${gy}%, rgba(234, 255, 240, 0.2), transparent 65%)`
  const holo = useMotionTemplate`${gx}% ${gy}%`

  // Puntatore su tutta la finestra (solo desktop): la carta "guarda" il mouse
  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    const onMove = (e) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1)
      y.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, x, y])

  return (
    <div className={`bfx-card ${className}`} aria-hidden="true">
      <span className="bfx-card__glow" />
      <motion.div
        className="bfx-card__enter"
        initial={reduce ? false : { opacity: 0, rotateY: -75, rotateX: 25, y: 80, scale: 0.86 }}
        animate={{ opacity: 1, rotateY: 0, rotateX: 0, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 70, damping: 14, mass: 1, delay: 0.35 }}
      >
        <div className="bfx-card__float">
          <div className="bfx-card__pose">
            <motion.div className="bfx-card__body" style={{ rotateX, rotateY }}>
              <span className="bfx-card__edge is-3" />
              <span className="bfx-card__edge is-2" />
              <span className="bfx-card__edge is-1" />
              <div className="bfx-card__face">
                <motion.span className="bfx-card__holo" style={{ backgroundPosition: holo }} />
                <motion.span className="bfx-card__light" style={{ background: luce }} />
                <span className="bfx-card__sweep" />

                <div className="bfx-card__top">
                  <b>Mobilitas</b>
                  <span>Black Friday</span>
                </div>

                <div className="bfx-card__mid">
                  <span className="bfx-card__chip">
                    <i />
                  </span>
                  <span className="bfx-card__ten">{visite}</span>
                  <span className="bfx-card__unit">
                    visite
                    <em>5 + 5 in omaggio</em>
                  </span>
                </div>

                <div className="bfx-card__bot">
                  <span className="bfx-card__price">
                    <b>{prezzo}€</b>
                    <s>{prezzoPieno}€</s>
                  </span>
                  <span className="bfx-card__exp">
                    <small>Valida fino al</small>
                    {scadenzaBreve}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <span className="bfx-card__shadow" />
    </div>
  )
}
