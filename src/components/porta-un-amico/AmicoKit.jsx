import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { AlarmClock, ArrowRight, CalendarClock, Check, PenLine, Phone } from 'lucide-react'
import ClImg from '../condition-landing/ClImg'
import { SCADENZA_TESTO, due, urgenza, useMancano } from '../black-friday/offerta'
import { EASE } from '../home-sections/homeMotion'
import '../../styles/pages/porta-un-amico.css'

// Pezzi grafici della landing "Porta un amico" (/black-friday-2026-amico). Stile in styles/pages/porta-un-amico.css,
// prefisso pa-. Tutto il 3D è CSS (transform-style: preserve-3d): nessuna libreria in più.
// Con "riduci movimento" gli oggetti restano fermi e leggibili (MotionConfig di PageShell + media query nel CSS).

// ——— Inclinazione al puntatore (desktop): valori molla da -1 a 1 ———
function usePuntatore() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 })
  const onPointerMove = (e) => {
    if (e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width) * 2 - 1)
    y.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }
  return { sx, sy, handlers: { onPointerMove, onPointerLeave } }
}

// ——— Il legame: due anelli 3D intrecciati (tu in verde, il tuo amico in panna) ———
// Ogni anello è un toro in fil di ferro: 30 meridiani + 4 paralleli. Ruota piano e si inclina col puntatore.

const MERIDIANI = 30

function Toro({ lato }) {
  return (
    <div className={`pa-toro pa-toro--${lato}`}>
      {Array.from({ length: MERIDIANI }, (_, i) => (
        <i key={i} style={{ '--a': `${(360 / MERIDIANI) * i}deg` }} />
      ))}
      <b className="is-out" />
      <b className="is-in" />
      <b className="is-top" />
      <b className="is-bot" />
    </div>
  )
}

export function Legame({ className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '120px' })
  const { sx, sy, handlers } = usePuntatore()
  const rotateX = useTransform(sy, [-1, 1], [14, -14])
  const rotateY = useTransform(sx, [-1, 1], [-18, 18])

  return (
    <div ref={ref} className={`pa-legame ${inView ? '' : 'is-paused'} ${className}`} aria-hidden="true" {...handlers}>
      <span className="pa-legame__glow" />
      <motion.div className="pa-legame__tilt" style={{ rotateX, rotateY }}>
        <div className="pa-legame__spin">
          <div className="pa-legame__pose">
            <Toro lato="tu" />
            <Toro lato="amico" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ——— Conto alla rovescia: banner rosso con sveglia che squilla e cifre che scorrono (uguale a /black-friday-2026) ———

function Cifra({ d }) {
  return (
    <span className="pa-cnt__slot">
      <AnimatePresence initial={false}>
        <motion.span
          key={d}
          className="pa-cnt__d"
          initial={{ y: '-105%' }}
          animate={{ y: '0%' }}
          exit={{ y: '105%' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
      <span className="pa-cnt__ghost">{d}</span>
    </span>
  )
}

export function Contatore({ className = '', etichetta = `Fino a ${SCADENZA_TESTO}` }) {
  const mancano = useMancano()
  if (!mancano) {
    return (
      <p className={`pa-cnt is-over ${className}`}>
        <CalendarClock size={18} strokeWidth={2.2} aria-hidden="true" />
        L’offerta Black Friday è terminata
      </p>
    )
  }
  const parti = [
    [String(mancano.giorni), mancano.giorni === 1 ? 'giorno' : 'giorni'],
    [due(mancano.ore), 'ore'],
    [due(mancano.min), 'min'],
    [due(mancano.sec), 'sec'],
  ]
  return (
    <div
      className={`pa-cnt ${className}`}
      role="timer"
      aria-label={`Mancano ${mancano.giorni} giorni e ${mancano.ore} ore alla fine dell’offerta, ${SCADENZA_TESTO}`}
    >
      <span className="pa-cnt__sweep" aria-hidden="true" />
      <span className="pa-cnt__head" aria-hidden="true">
        <span className="pa-cnt__ico">
          <AlarmClock size={20} strokeWidth={2.2} />
        </span>
        <span className="pa-cnt__lbl">
          <small>{urgenza(mancano)}</small>
          <b>{etichetta}</b>
        </span>
      </span>
      <span className="pa-cnt__time" aria-hidden="true">
        {parti.map(([v, u]) => (
          <span key={u} className="pa-cnt__unit">
            <span className="pa-cnt__num">
              {v.split('').map((d, j) => (
                <Cifra key={`${v.length}-${j}`} d={d} />
              ))}
            </span>
            <small>{u}</small>
          </span>
        ))}
      </span>
    </div>
  )
}

// ——— L'invito: il biglietto in 3D, si inclina col puntatore (e col dito, trascinandolo) ———
// Dal punto di vista dell'amico invitato: la sua prima visita e chi lo ha invitato (daChi: nome dal gestionale, o vuoto)

export function Invito({ prezzo, prezzoAmico, scadenza, daChi = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 16, mass: 0.7 })
  const sy = useSpring(y, { stiffness: 150, damping: 16, mass: 0.7 })
  const rotateY = useTransform(sx, [-1, 1], [-16, 16])
  const rotateX = useTransform(sy, [-1, 1], [12, -12])
  const gx = useTransform(sx, [-1, 1], [10, 90])
  const gy = useTransform(sy, [-1, 1], [10, 90])
  const luce = useMotionTemplate`radial-gradient(70% 60% at ${gx}% ${gy}%, rgba(244,244,244,0.16), transparent 60%)`

  const muovi = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set(Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)))
    y.set(Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)))
  }
  const lascia = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={ref}
      className="pa-invito"
      onPointerMove={muovi}
      onPointerLeave={lascia}
      onPointerUp={lascia}
      onPointerCancel={lascia}
    >
      <div className="pa-invito__float">
      <motion.div className="pa-invito__card" style={{ rotateX, rotateY }}>
        <span className="pa-invito__edge" aria-hidden="true" />
        <div className="pa-invito__face">
          <motion.span className="pa-invito__light" style={{ background: luce }} aria-hidden="true" />
          <div className="pa-invito__top">
            <span>Mobilitas</span>
            <span>Invito Black Friday</span>
          </div>
          <div className="pa-invito__you">
            <span className="pa-invito__plus is-price">{prezzoAmico}€</span>
            <span className="pa-invito__you-t">
              la tua prima
              <br />
              visita
            </span>
          </div>
          <p className="pa-invito__was">invece di {prezzo}€</p>
          <div className="pa-invito__rule" aria-hidden="true" />
          <div className="pa-invito__friend">
            <span className="pa-invito__friend-l">{daChi ? 'Ti invita' : 'Porta un amico'}</span>
            <span className="pa-invito__friend-v">
              <b className="is-name">{daChi || 'Black Friday'}</b>
            </span>
          </div>
          <div className="pa-invito__foot">Valido fino a {scadenza}</div>
        </div>
      </motion.div>
      </div>
      <span className="pa-invito__shadow" aria-hidden="true" />
    </div>
  )
}

// ——— Giostra 3D di foto dello studio: gira piano, si trascina col dito o col mouse ———

function FotoGiostra({ src, i, n, rot }) {
  const passo = 360 / n
  const opacity = useTransform(rot, (r) => {
    const c = Math.cos(((r + i * passo) * Math.PI) / 180)
    return 0.28 + 0.72 * Math.max(0, c)
  })
  return (
    <motion.figure className="pa-giostra__item" style={{ '--i': i, '--passo': `${passo}deg`, opacity }}>
      <ClImg src={src} alt="" sizes="(min-width: 1024px) 380px, 260px" draggable={false} />
    </motion.figure>
  )
}

export function Giostra({ foto }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '100px' })
  const ferma = useReducedMotion()
  const [presa, setPresa] = useState(false)
  const rot = useMotionValue(0)
  const transform = useMotionTemplate`translateZ(calc(var(--R) * -1)) rotateX(-6deg) rotateY(${rot}deg)`

  useAnimationFrame((_, delta) => {
    if (!inView || ferma || presa) return
    rot.set(rot.get() - Math.min(delta, 50) * 0.008)
  })

  return (
    <motion.div
      ref={ref}
      className={`pa-giostra ${presa ? 'is-grab' : ''}`}
      onPanStart={() => setPresa(true)}
      onPan={(_, info) => rot.set(rot.get() + info.delta.x * 0.28)}
      onPanEnd={() => setPresa(false)}
      aria-hidden="true"
    >
      <motion.div className="pa-giostra__ring" style={{ transform }}>
        {foto.map((src, i) => (
          <FotoGiostra key={src} src={src} i={i} n={foto.length} rot={rot} />
        ))}
      </motion.div>
    </motion.div>
  )
}

// ——— Nastro dei problemi: due righe che scorrono in versi opposti (ferme e a capo con "riduci movimento") ———

export function Nastro({ problemi }) {
  const meta = Math.ceil(problemi.length / 2)
  const righe = [problemi.slice(0, meta), [...problemi.slice(meta), 'e molto altro']]
  return (
    <div className="pa-nastro">
      {righe.map((riga, r) => (
        <div key={r} className={`pa-nastro__row ${r % 2 ? 'is-rev' : ''}`}>
          <div className="pa-nastro__track">
            {[0, 1].map((copia) => (
              <ul key={copia} className="pa-nastro__list" aria-hidden={copia === 1 ? 'true' : undefined}>
                {riga.map((p) => (
                  <li key={p} className={p === 'e molto altro' ? 'is-more' : ''}>
                    {p}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ——— Illustrazioni di "Come funziona" (decorative: i passi sono già scritti accanto) ———
// Si animano quando entrano nello schermo; con "riduci movimento" mostrano subito lo stato finale (CSS).

function useAcceso() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  return [ref, inView ? 'is-on' : '']
}

// Passo 1: il form che si compila da solo, con la penna
export function IllustraForm() {
  const [ref, on] = useAcceso()
  return (
    <div ref={ref} className={`pa-ill pa-ill--form ${on}`} aria-hidden="true">
      <div className="pa-ill__card">
        <span className="pa-ill__field">
          <small>Nome e cognome</small>
          <i className="pa-ill__type" style={{ '--w': '68%', '--d': '0.2s' }} />
        </span>
        <span className="pa-ill__field">
          <small>Cellulare</small>
          <i className="pa-ill__type" style={{ '--w': '52%', '--d': '1.1s' }} />
        </span>
        <span className="pa-ill__send">
          Richiedi
          <ArrowRight size={13} strokeWidth={2.6} />
        </span>
      </div>
      <span className="pa-ill__pen">
        <PenLine size={22} strokeWidth={1.8} />
      </span>
    </div>
  )
}

// Passo 2: la segreteria chiama e il giorno si accende sul calendario
export function IllustraChiamata() {
  const [ref, on] = useAcceso()
  return (
    <div ref={ref} className={`pa-ill pa-ill--cal ${on}`} aria-hidden="true">
      <div className="pa-ill__card">
        <span className="pa-ill__week">
          {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map((g, i) => (
            <b key={i}>{g}</b>
          ))}
        </span>
        <span className="pa-ill__days">
          {Array.from({ length: 21 }, (_, i) => (
            <i key={i} className={i === 10 ? 'is-pick' : ''}>
              {i === 10 && <Check size={12} strokeWidth={3.2} />}
            </i>
          ))}
        </span>
      </div>
      <span className="pa-ill__phone">
        <span className="pa-ill__wave" />
        <span className="pa-ill__wave is-2" />
        <Phone size={20} strokeWidth={2} />
      </span>
    </div>
  )
}
