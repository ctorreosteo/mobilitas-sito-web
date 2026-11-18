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

// Le dieci visite in due gruppi: «Le paghi» (cinque carte) + «In omaggio» (cinque carte verdi in un riquadro regalo).
// Le carte in omaggio si girano e diventano verdi quando il gruppo entra nello schermo. Il numero della visita è su
// entrambe le facce: nessun testo resta nascosto.
export function MazzoVisite({ visite = 10 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '0px 0px -18% 0px' })
  const girate = reduce || inView
  const meta = visite / 2
  const numeri = (da) => Array.from({ length: meta }, (_, i) => da + i)

  return (
    <div ref={ref} className={`bfx-deck ${girate ? 'is-flipped' : ''}`}>
      <div className="bfx-deck__group">
        <p className="bfx-deck__tag">
          <Check size={14} strokeWidth={3} aria-hidden="true" />
          <span>
            <b>{meta} visite</b> le paghi
          </span>
        </p>
        <ol className="bfx-deck__list" aria-label={`${meta} visite che paghi`}>
          {numeri(1).map((n) => (
            <li key={n} className="bfx-vcard">
              <span className="bfx-vcard__in" aria-hidden="true">
                <span className="bfx-vcard__face is-front">
                  <b>{due(n)}</b>
                </span>
              </span>
              <span className="bfx-sr">Visita {n}</span>
            </li>
          ))}
        </ol>
      </div>

      <span className="bfx-deck__plus" aria-hidden="true">
        +
      </span>

      <div className="bfx-deck__group is-gift">
        <p className="bfx-deck__tag">
          <Gift size={15} strokeWidth={2.4} aria-hidden="true" />
          <span>
            <b>{meta} visite</b> in omaggio
          </span>
        </p>
        <ol className="bfx-deck__list" aria-label={`${meta} visite in omaggio`}>
          {numeri(meta + 1).map((n, i) => (
            <li key={n} className="bfx-vcard is-gift" style={{ '--d': `${i * 110 + 150}ms` }}>
              <span className="bfx-vcard__in" aria-hidden="true">
                <span className="bfx-vcard__face is-front">
                  <b>{due(n)}</b>
                </span>
                <span className="bfx-vcard__face is-back">
                  <b>{due(n)}</b>
                  <Gift size={16} strokeWidth={2.2} />
                </span>
              </span>
              <span className="bfx-sr">Visita {n}, in omaggio</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

// Banner del prezzo (sezione «Cosa ottieni», prima del conto alla rovescia): un biglietto nero come la carta Black
// Friday, con il prezzo che scende dal pieno a quello dell'offerta quando entra nello schermo, lo sconto in un bollino
// e, oltre una linea di luce, i tre conti che contano. Di base (e con "riduci movimento") mostra subito il prezzo.
// fatti = [{ k: 'A visita', v: '45€', prima: '90€', t: 'testo piccolo accanto' }, …] (prima e t facoltativi)
export function BannerPrezzo({ da, a, visite, fatti = [], nota }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const vicino = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [valore, setValore] = useState(a)

  useEffect(() => {
    if (!vicino || reduce) return undefined
    const controls = animate(da, a, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setValore(Math.round(v)),
    })
    return () => controls.stop()
  }, [vicino, reduce, da, a])

  const sconto = Math.round((1 - a / da) * 100)

  return (
    <div ref={ref} className="bfx-ticket">
      <span className="bfx-ticket__sweep" aria-hidden="true" />
      <div className="bfx-ticket__main">
        <p className="bfx-ticket__eyebrow">
          <span>Black Friday</span> Le tue {visite} visite
        </p>
        <p className="bfx-ticket__price" aria-label={`${a}€ invece di ${da}€`}>
          <s aria-hidden="true">{da}€</s>
          <b aria-hidden="true">
            {valore}
            <small>€</small>
          </b>
          <span className="bfx-ticket__badge" aria-hidden="true">
            −{sconto}%
          </span>
        </p>
        {nota ? <p className="bfx-ticket__note">{nota}</p> : null}
      </div>
      <span className="bfx-ticket__cut" aria-hidden="true" />
      <ul className="bfx-ticket__facts">
        {fatti.map((f) => (
          <li key={f.k}>
            <small>{f.k}</small>
            <span className="bfx-ticket__fact">
              <b>{f.v}</b>
              {f.prima ? <s>{f.prima}</s> : null}
              {f.t ? <span>{f.t}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
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
