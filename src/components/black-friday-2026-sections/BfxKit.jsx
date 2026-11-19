import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useSpring } from 'framer-motion'
import { AlarmClock, Check, Gift, Moon } from 'lucide-react'
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

// I dieci trattamenti in due gruppi: «Li paghi» (cinque carte) + «In omaggio» (cinque carte verdi in un riquadro regalo).
// Le carte in omaggio si girano e diventano verdi quando il gruppo entra nello schermo. Il numero del trattamento è su
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
            <b>{meta} trattamenti</b> li paghi
          </span>
        </p>
        <ol className="bfx-deck__list" aria-label={`${meta} trattamenti che paghi`}>
          {numeri(1).map((n) => (
            <li key={n} className="bfx-vcard">
              <span className="bfx-vcard__in" aria-hidden="true">
                <span className="bfx-vcard__face is-front">
                  <b>{due(n)}</b>
                </span>
              </span>
              <span className="bfx-sr">Trattamento {n}</span>
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
            <b>{meta} trattamenti</b> in omaggio
          </span>
        </p>
        <ol className="bfx-deck__list" aria-label={`${meta} trattamenti in omaggio`}>
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
              <span className="bfx-sr">Trattamento {n}, in omaggio</span>
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
// fatti = [{ k: 'A trattamento', v: '45€', prima: '90€', t: 'testo piccolo accanto' }, …] (prima e t facoltativi)
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
          <span>Black Friday</span> I tuoi {visite} trattamenti
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

// Grafico «Il dolore smette di tornare» (sezione «Cosa ottieni»): illustrativo, senza numeri. In grigio i trattamenti
// sparsi (il dolore cala e poi torna, a dente di sega); in verde dieci trattamenti di fila (cala e resta giù), un punto
// per trattamento. Le linee si disegnano quando il grafico entra in vista; con «riduci movimento» sono già ferme.
const W = 360
const H = 150
const PUNTI_PERCORSO = [30, 60, 56, 78, 84, 98, 103, 112, 115, 119].map((y, i) => [14 + i * 37, y])
const SPARSE =
  'M0 26 L20 98 C44 92 72 62 94 26 L114 98 C138 92 166 62 188 26 L208 98 C232 92 260 62 282 26 L302 98 C324 93 346 70 360 48'

// Curva morbida che passa per tutti i punti (Catmull-Rom tradotta in Bézier)
function curva(p) {
  let d = `M${p[0][0]} ${p[0][1]}`
  for (let i = 0; i < p.length - 1; i++) {
    const [a, b, c, e] = [p[i - 1] ?? p[i], p[i], p[i + 1], p[i + 2] ?? p[i + 1]]
    const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6]
    const c2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${c[0]} ${c[1]}`
  }
  return d
}
const PERCORSO = curva(PUNTI_PERCORSO)

export function GraficoRicadute() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const visto = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const on = reduce || visto

  return (
    <figure className="bfx-graph" ref={ref}>
      <div className="bfx-graph__plot">
        <span className="bfx-graph__axis is-y" aria-hidden="true">Dolore</span>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="bfx-graph-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#72fa93" stopOpacity="0.22" />
              <stop offset="1" stopColor="#72fa93" stopOpacity="0" />
            </linearGradient>
            {/* Le linee si scoprono da sinistra a destra (così il tratteggio grigio resta tratteggiato) */}
            <clipPath id="bfx-graph-clip">
              <motion.rect
                x="-10"
                y="-20"
                height={H + 40}
                initial={reduce ? false : { width: 0 }}
                animate={{ width: on ? W + 20 : 0 }}
                transition={{ duration: 1.8, ease: [0.45, 0, 0.25, 1] }}
              />
            </clipPath>
          </defs>
          {[38, 76, 114].map((y) => (
            <line key={y} className="bfx-graph__grid" x1="0" x2={W} y1={y} y2={y} />
          ))}
          <g clipPath="url(#bfx-graph-clip)">
            <path className="bfx-graph__sparse" d={SPARSE} />
            <path
              className="bfx-graph__area"
              d={`${PERCORSO} L${PUNTI_PERCORSO.at(-1)[0]} ${H} L${PUNTI_PERCORSO[0][0]} ${H} Z`}
            />
            <path className="bfx-graph__path" d={PERCORSO} />
          </g>
        </svg>
        {/* I punti sono in HTML, così restano tondi anche se il grafico si allarga */}
        {PUNTI_PERCORSO.map(([x, y], i) => (
          <motion.i
            key={x}
            className={`bfx-graph__dot ${i === PUNTI_PERCORSO.length - 1 ? 'is-last' : ''}`}
            style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={on ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.16, ease: EASE_OUT }}
            aria-hidden="true"
          />
        ))}
        <span className="bfx-graph__axis is-x" aria-hidden="true">Tempo</span>
      </div>
      <figcaption className="bfx-graph__legend">
        <span className="is-sparse">Trattamenti sparsi: il dolore se ne va e poi torna</span>
        <span className="is-path">{PUNTI_PERCORSO.length} trattamenti di fila: se ne va e resta lontano</span>
      </figcaption>
    </figure>
  )
}

// «La prevenzione»: un anno da dicembre a novembre, un appuntamento al mese (illustrativo: i trattamenti non scadono e
// il ritmo lo decide l'osteopata). Dieci mesi segnati, agosto libero per le ferie e novembre, quando si ricomincia.
const MESI = [
  ['D', 'Dicembre', 1], ['G', 'Gennaio', 1], ['F', 'Febbraio', 1], ['M', 'Marzo', 1], ['A', 'Aprile', 1],
  ['M', 'Maggio', 1], ['G', 'Giugno', 1], ['L', 'Luglio', 1], ['A', 'Agosto', 0], ['S', 'Settembre', 1],
  ['O', 'Ottobre', 1], ['N', 'Novembre', 0],
]

export function AnnoVisite() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const on = useInView(ref, { once: true, margin: '0px 0px -15% 0px' }) || reduce
  let n = 0
  return (
    <div className="bfx-year" ref={ref}>
      <ol className="bfx-year__months" aria-hidden="true">
        {MESI.map(([l, nome, si]) => {
          const i = si ? n++ : -1
          return (
            <li key={nome} className={si ? 'is-on' : ''}>
              <motion.span
                className="bfx-year__dot"
                initial={reduce || !si ? false : { scale: 0.4, opacity: 0 }}
                animate={on ? { scale: 1, opacity: 1 } : undefined}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: EASE_OUT }}
              >
                {si ? <Check size={12} strokeWidth={3.4} /> : null}
              </motion.span>
              <small>{l}</small>
            </li>
          )
        })}
      </ol>
      <p className="bfx-year__cap">Un appuntamento al mese, anche quando stai bene</p>
    </div>
  )
}

// «La coccola»: l'interruttore «Non disturbare» che si accende quando entra in vista
export function NonDisturbare() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const on = useInView(ref, { once: true, margin: '0px 0px -20% 0px' }) || reduce
  return (
    <div className={`bfx-dnd ${on ? 'is-on' : ''}`} ref={ref} aria-hidden="true">
      <span className="bfx-dnd__ico">
        <Moon size={18} strokeWidth={2.2} />
      </span>
      <span className="bfx-dnd__txt">
        <b>Non disturbare</b>
        <small>{on ? 'Attivo: è il tuo momento' : 'Spento'}</small>
      </span>
      <span className="bfx-dnd__switch">
        <i />
      </span>
    </div>
  )
}
