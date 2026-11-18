import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useSpring } from 'framer-motion'
import { AlarmClock, Check, Gift } from 'lucide-react'
import { SCADENZA_TESTO, due, urgenza, useMancano } from '../black-friday/offerta'

// Pezzi grafici della sola landing /black-friday-2026 (stile in styles/pages/black-friday-2026.css, prefisso bfx-).
// I dati dell'offerta restano in components/black-friday/offerta.js, comune con /black-friday-2026-amico.

const EASE_OUT = [0.23, 1, 0.32, 1]

// Cifra che scorre quando cambia (come nel contatore di /black-friday-2026-amico)
function Cifra({ d }) {
  return (
    <span className="bfx-count__slot">
      <AnimatePresence initial={false}>
        <motion.span
          key={d}
          className="bfx-count__d"
          initial={{ y: '-105%' }}
          animate={{ y: '0%' }}
          exit={{ y: '105%' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
      <span className="bfx-count__ghost">{d}</span>
    </span>
  )
}

// Conto alla rovescia fino alla scadenza dell'offerta: banner rosso con sveglia che squilla, perché si noti.
// Stesso banner di /black-friday-2026-amico (AmicoKit → Contatore).
export function Countdown({ className = '', etichetta = `Fino a ${SCADENZA_TESTO}` }) {
  const mancano = useMancano()
  if (!mancano) {
    return <p className={`bfx-count is-over ${className}`}>L’offerta Black Friday è terminata</p>
  }
  const parti = [
    [String(mancano.giorni), mancano.giorni === 1 ? 'giorno' : 'giorni'],
    [due(mancano.ore), 'ore'],
    [due(mancano.min), 'min'],
    [due(mancano.sec), 'sec'],
  ]
  return (
    <div
      className={`bfx-count ${className}`}
      role="timer"
      aria-label={`Mancano ${mancano.giorni} giorni e ${mancano.ore} ore alla fine dell’offerta, ${SCADENZA_TESTO}`}
    >
      <span className="bfx-count__sweep" aria-hidden="true" />
      <span className="bfx-count__head" aria-hidden="true">
        <span className="bfx-count__ico">
          <AlarmClock size={20} strokeWidth={2.2} />
        </span>
        <span className="bfx-count__txt">
          <small>{urgenza(mancano)}</small>
          <b>{etichetta}</b>
        </span>
      </span>
      <span className="bfx-count__time" aria-hidden="true">
        {parti.map(([v, u]) => (
          <span key={u} className="bfx-count__u">
            <b>
              {v.split('').map((d, j) => (
                <Cifra key={`${v.length}-${j}`} d={d} />
              ))}
            </b>
            <small>{u}</small>
          </span>
        ))}
      </span>
    </div>
  )
}

// Le dieci visite come dieci carte: le ultime cinque si girano e diventano verdi ("in omaggio") quando il mazzo
// entra nello schermo. Il numero della visita è su entrambe le facce: nessun testo resta nascosto.
export function MazzoVisite({ visite = 10 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '0px 0px -18% 0px' })
  const girate = reduce || inView
  const meta = visite / 2
  return (
    <div ref={ref} className={`bfx-deck ${girate ? 'is-flipped' : ''}`}>
      <ol className="bfx-deck__list" aria-label={`${visite} visite: ${meta} le paghi, ${meta} sono in omaggio`}>
        {Array.from({ length: visite }, (_, i) => {
          const omaggio = i >= meta
          return (
            <li
              key={i}
              className={`bfx-vcard ${omaggio ? 'is-gift' : ''}`}
              style={{ '--d': `${Math.max(0, i - meta) * 110 + 120}ms` }}
            >
              <span className="bfx-vcard__in" aria-hidden="true">
                <span className="bfx-vcard__face is-front">
                  <b>{due(i + 1)}</b>
                  {omaggio ? <i className="bfx-vcard__pip" /> : <Check size={18} strokeWidth={2.2} />}
                </span>
                {omaggio && (
                  <span className="bfx-vcard__face is-back">
                    <b>{due(i + 1)}</b>
                    <Gift size={18} strokeWidth={2.2} />
                  </span>
                )}
              </span>
              <span className="bfx-sr">
                Visita {i + 1}: {omaggio ? 'in omaggio' : 'la paghi'}
              </span>
            </li>
          )
        })}
      </ol>
      <p className="bfx-deck__legend">
        <span>
          <i aria-hidden="true" /> {meta} le paghi
        </span>
        <span>
          <i className="is-gift" aria-hidden="true" /> {meta} in omaggio
        </span>
      </p>
    </div>
  )
}

// Prezzo a tutta larghezza: quando sta per entrare nello schermo scende dal prezzo pieno a quello dell'offerta.
// Di base (e con "riduci movimento") mostra subito il prezzo giusto.
export function PrezzoGigante({ da, a }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const vicino = useInView(ref, { once: true, margin: '0px 0px 15% 0px' })
  const [valore, setValore] = useState(a)

  useEffect(() => {
    if (!vicino || reduce) return undefined
    const controls = animate(da, a, {
      duration: 1.5,
      ease: EASE_OUT,
      onUpdate: (v) => setValore(Math.round(v)),
    })
    return () => controls.stop()
  }, [vicino, reduce, da, a])

  return (
    <p ref={ref} className="bfx-mega" aria-label={`${a}€`}>
      <span className="bfx-mega__n" aria-hidden="true">
        {valore}
      </span>
      <span className="bfx-mega__eur" aria-hidden="true">
        €
      </span>
    </p>
  )
}

// Pass inclinabile: segue il puntatore in 3D (solo mouse, solo senza "riduci movimento")
export function TiltPass({ as = 'article', className = '', children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const molla = { stiffness: 220, damping: 22 }
  const rotateX = useSpring(0, molla)
  const rotateY = useSpring(0, molla)
  const Tag = motion[as]

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
  }
  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </Tag>
  )
}
