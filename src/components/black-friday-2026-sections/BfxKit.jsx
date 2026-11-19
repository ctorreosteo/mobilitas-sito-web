import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useSpring } from 'framer-motion'
import { AlarmClock, BellOff, Briefcase, Check, ChevronLeft, ChevronRight, Flower2, Leaf, Mail, Moon, Snowflake, Sun, Users } from 'lucide-react'
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

// Banner del prezzo (sezione «L’offerta», sopra la spiegazione; senza la carta, che è già nell’apertura): un biglietto nero come la carta Black
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

// Grafico del dolore (carta «Il tuo problema» del carosello di «Cosa ottieni»): piccolo, illustrativo, senza numeri. In grigio i trattamenti
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
        <span className="is-sparse">Trattamenti sparsi</span>
        <span className="is-path">{PUNTI_PERCORSO.length} di fila</span>
      </figcaption>
    </figure>
  )
}

// «La prevenzione»: le quattro stagioni, tutte con la spunta: ti curi tutto l'anno (senza dire ogni quanto: i
// trattamenti si fanno quando si vuole)
const STAGIONI = [
  { Icona: Flower2, nome: 'Primavera' },
  { Icona: Sun, nome: 'Estate' },
  { Icona: Leaf, nome: 'Autunno' },
  { Icona: Snowflake, nome: 'Inverno' },
]

export function TuttoLAnno() {
  return (
    <ul className="bfx-seasons" aria-label="Tutto l’anno">
      {STAGIONI.map((x) => (
        <li key={x.nome}>
          <x.Icona size={20} strokeWidth={2} aria-hidden="true" />
          <span>{x.nome}</span>
        </li>
      ))}
    </ul>
  )
}

// «Il tuo tempo»: le notifiche che di solito ti rubano il tempo (lavoro, famiglia, email); quando la carta arriva al
// centro del carosello si accende «Non disturbare» e si spengono una dopo l'altra. Riparte ogni volta che la carta
// torna al centro. Con «riduci movimento» è già tutto spento. Decorativa: il senso è già nel testo della carta.
const NOTIFICHE = [
  { Icona: Briefcase, app: 'Lavoro', testo: 'La riunione è stata spostata' },
  { Icona: Users, app: 'Famiglia', testo: '12 nuovi messaggi' },
  { Icona: Mail, app: 'Email', testo: 'Urgente: rispondi entro oggi' },
]

export function TempoPerTe({ attiva = true }) {
  const reduce = useReducedMotion()
  const [zitto, setZitto] = useState(false)

  useEffect(() => {
    if (reduce || !attiva) return undefined
    const t = setTimeout(() => setZitto(true), 900)
    return () => {
      clearTimeout(t)
      setZitto(false)
    }
  }, [attiva, reduce])

  const on = reduce || zitto
  return (
    <div className={`bfx-quiet ${on ? 'is-on' : ''}`} aria-hidden="true">
      <ul className="bfx-quiet__list">
        {NOTIFICHE.map((n, i) => (
          <li key={n.app} style={{ '--i': i }}>
            <span className="bfx-quiet__app">
              <n.Icona size={16} strokeWidth={2.2} />
            </span>
            <span className="bfx-quiet__txt">
              <b>{n.app}</b>
              <small>{n.testo}</small>
            </span>
            <BellOff className="bfx-quiet__off" size={16} strokeWidth={2.2} />
          </li>
        ))}
      </ul>
      <div className={`bfx-dnd ${on ? 'is-on' : ''}`}>
        <span className="bfx-dnd__ico">
          <Moon size={18} strokeWidth={2.2} />
        </span>
        <span className="bfx-dnd__txt">
          <b>Non disturbare</b>
          <small>{on ? 'Attivo: ora pensi solo a te' : 'Spento'}</small>
        </span>
        <span className="bfx-dnd__switch">
          <i />
        </span>
      </div>
    </div>
  )
}

// «Cosa ottieni»: le tre carte dei benefici come la scelta del personaggio in un videogioco. La carta attiva al centro,
// illuminata; le altre due ai lati, più piccole, ruotate e in penombra. Si cambia con lo swipe (o trascinando col mouse),
// con le frecce, toccando una carta di lato o i nomi sotto (frecce della tastiera comprese). Girano da sole ogni
// «intervallo» ms mentre il carosello è in vista; si fermano sotto il puntatore o il dito, e per sempre dopo la prima
// scelta. Con «riduci movimento» niente giro automatico e niente animazioni.
// voci = [{ id, tag, titolo, testo, visual, tema: 'is-main' | 'is-green' | 'is-ink', decoro }]; visual può essere una
// funzione (attiva) => disegno, per i disegni che si animano quando la carta arriva al centro
export function CaroselloBenefici({ voci, intervallo = 5000 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const visibile = useInView(ref, { margin: '-15% 0px -15% 0px' })
  const [attiva, setAttiva] = useState(0)
  const [fermo, setFermo] = useState(false)
  const [sopra, setSopra] = useState(false)
  const n = voci.length
  const auto = !reduce && !fermo && !sopra && visibile

  const scegli = (i) => {
    setFermo(true)
    setAttiva(((i % n) + n) % n)
  }

  useEffect(() => {
    if (!auto) return undefined
    const t = setTimeout(() => setAttiva((a) => (a + 1) % n), intervallo)
    return () => clearTimeout(t)
  }, [auto, attiva, n, intervallo])

  // Distanza dalla carta attiva, sul giro: −1 a sinistra, 0 al centro, 1 a destra
  const distanza = (i) => {
    let d = i - attiva
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
  }

  const tasti = (e) => {
    if (e.key === 'ArrowRight') scegli(attiva + 1)
    else if (e.key === 'ArrowLeft') scegli(attiva - 1)
  }

  const molla = reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }

  return (
    <div
      ref={ref}
      className="bfx-sel"
      role="region"
      aria-roledescription="carosello"
      aria-label="I tre benefici"
      onPointerEnter={() => setSopra(true)}
      onPointerLeave={() => setSopra(false)}
    >
      <div className="bfx-sel__stage">
        <button type="button" className="bfx-sel__arrow is-prev" onClick={() => scegli(attiva - 1)} aria-label="Beneficio precedente">
          <ChevronLeft size={22} strokeWidth={2.4} />
        </button>

        <motion.div
          className="bfx-sel__track"
          drag={reduce ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          dragMomentum={false}
          onDragEnd={(e, info) => {
            if (info.offset.x < -40 || info.velocity.x < -400) scegli(attiva + 1)
            else if (info.offset.x > 40 || info.velocity.x > 400) scegli(attiva - 1)
          }}
        >
          {voci.map((v, i) => {
            const d = distanza(i)
            const centro = d === 0
            return (
              <motion.article
                key={v.id}
                id={`bfx-sel-${v.id}`}
                className={`bfx-sel__card ${v.tema} ${centro ? 'is-active' : ''}`}
                role="tabpanel"
                aria-hidden={!centro}
                initial={false}
                animate={{
                  x: `${d * 74}%`,
                  scale: centro ? 1 : 0.8,
                  rotateY: d * -24,
                  opacity: centro ? 1 : 0.45,
                }}
                transition={molla}
                style={{ zIndex: centro ? 2 : 1 }}
                onTap={() => !centro && scegli(i)}
              >
                {v.decoro}
                <p className="bfx-sel__tag">{v.tag}</p>
                <h3 className="bfx-h bfx-h4">{v.titolo}</h3>
                <p className="bfx-sel__p">{v.testo}</p>
                <div className="bfx-sel__visual">{typeof v.visual === 'function' ? v.visual(centro) : v.visual}</div>
              </motion.article>
            )
          })}
        </motion.div>

        <button type="button" className="bfx-sel__arrow is-next" onClick={() => scegli(attiva + 1)} aria-label="Beneficio successivo">
          <ChevronRight size={22} strokeWidth={2.4} />
        </button>
      </div>

      {/* I «nomi dei personaggi»: la barra sotto quello attivo si riempie mentre le carte girano da sole */}
      <div className="bfx-sel__picks" role="tablist" aria-label="Scegli il beneficio" onKeyDown={tasti}>
        {voci.map((v, i) => {
          const on = i === attiva
          return (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`bfx-sel-${v.id}`}
              tabIndex={on ? 0 : -1}
              className={`bfx-sel__pick ${on ? 'is-on' : ''}`}
              onClick={() => scegli(i)}
            >
              <small>{due(i + 1)}</small>
              {v.tag}
              <span className="bfx-sel__bar" aria-hidden="true">
                {on && <i key={`${attiva}-${auto}`} className={auto ? 'is-running' : ''} style={{ '--t': `${intervallo}ms` }} />}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
