import React, { useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion'
import { MessageCircle, RotateCcw, Fingerprint } from 'lucide-react'
import { Vertebra } from './SpineProgress'
import { Kicker } from './HomeKit'
import { EASE, MSG_CONSULTO, buzz, openWhatsApp } from './homeMotion'

// "Un tocco. Una trasformazione." preso alla lettera:
// tieni premuto e la colonna si raddrizza vertebra per vertebra (con un piccolo
// scatto tattile per ognuna, dove il telefono lo supporta). Se lasci prima, torna storta.
const COUNT = 18
const HOLD_SECONDS = 1.8
const RING = 2 * Math.PI * 52

const TouchSpineSection = () => {
  const progress = useMotionValue(0)
  const [done, setDone] = useState(false)
  const [holding, setHolding] = useState(false)
  const anim = useRef(null)
  const lastStep = useRef(0)

  const dashOffset = useTransform(progress, [0, 1], [RING, 0])
  const glow = useTransform(progress, [0, 1], [0, 1])
  const percent = useTransform(progress, (v) => `${Math.round(v * 100)}%`)

  useMotionValueEvent(progress, 'change', (v) => {
    const step = Math.floor(v * COUNT)
    if (step > lastStep.current) buzz(8)
    lastStep.current = step
  })

  const start = () => {
    if (done) return
    setHolding(true)
    anim.current?.stop()
    anim.current = animate(progress, 1, {
      duration: HOLD_SECONDS * (1 - progress.get()),
      ease: 'linear',
      onComplete: () => {
        setHolding(false)
        setDone(true)
        buzz([30, 60, 140])
      },
    })
  }

  const stop = () => {
    if (done || !holding) return
    setHolding(false)
    anim.current?.stop()
    anim.current = animate(progress, 0, { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] })
  }

  const reset = () => {
    setDone(false)
    anim.current?.stop()
    anim.current = animate(progress, 0, { duration: 1.2, ease: EASE })
  }

  const onKeyDown = (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
      e.preventDefault()
      start()
    }
  }

  const onKeyUp = (e) => {
    if (e.key === ' ' || e.key === 'Enter') stop()
  }

  return (
    <section id="mx-touch" className={`mx-touch ${done ? 'is-done' : ''}`}>
      <motion.div className="mx-touch__glow" style={{ opacity: glow }} aria-hidden="true" />

      <div className="mx-wrap mx-touch__layout">
        <div className="mx-touch__copy">
          <Kicker>Prova tu</Kicker>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={done ? 'done' : 'idle'}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {done ? (
                <>
                  <h2 className="mx-h mx-h--lg">
                    Un tocco.
                    <br />
                    <span className="mx-gradient">Una trasformazione.</span>
                  </h2>
                  <p className="mx-body mx-touch__text">
                    Il tuo corpo può guarire, se lo metti nelle condizioni giuste. <strong>Il primo passo è un consulto gratuito.</strong>
                  </p>
                </>
              ) : (
                <>
                  <h2 className="mx-h mx-h--lg">
                    Questo è il tuo
                    <br />
                    corpo, <span className="mx-outline">oggi.</span>
                  </h2>
                  <p className="mx-body mx-touch__text">
                    Tensioni accumulate e compensazioni lo tirano fuori asse. <strong>Tieni premuto e guarda cosa succede.</strong>
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mx-touch__stage" aria-hidden="true">
          <div className="mx-touch__spine">
            {Array.from({ length: COUNT }, (_, i) => (
              <Vertebra key={i} i={i} count={COUNT} progress={progress} vertical amp={1.7} size={2} />
            ))}
          </div>
          <motion.span className="mx-touch__pct">{percent}</motion.span>
        </div>

        <div className="mx-touch__action">
          {done ? (
            <motion.div
              className="mx-touch__done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              <button type="button" className="mx-btn mx-btn--primary" onClick={() => openWhatsApp(MSG_CONSULTO)}>
                <span>
                  <small>Inizia la tua</small>
                  Consulto gratuito
                </span>
                <span className="mx-btn__icon">
                  <MessageCircle size={20} strokeWidth={2.4} />
                </span>
              </button>
              <button type="button" className="mx-touch__again" onClick={reset}>
                <RotateCcw size={15} />
                Rifallo
              </button>
            </motion.div>
          ) : (
            <>
              <button
                type="button"
                className={`mx-hold ${holding ? 'is-holding' : ''}`}
                aria-label="Tieni premuto per riallineare la colonna"
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture?.(e.pointerId)
                  start()
                }}
                onPointerUp={stop}
                onPointerCancel={stop}
                onLostPointerCapture={stop}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onContextMenu={(e) => e.preventDefault()}
              >
                <svg viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r="52" className="mx-hold__track" />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="52"
                    className="mx-hold__ring"
                    style={{ strokeDasharray: RING, strokeDashoffset: dashOffset }}
                  />
                </svg>
                <Fingerprint size={40} strokeWidth={1.6} />
              </button>
              <p className="mx-hold__label">{holding ? 'Non mollare…' : 'Tieni premuto'}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default TouchSpineSection
