import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, animate, motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, MapPin, Quote, ShieldCheck, X } from 'lucide-react'
import { STUDI } from '../../data/studi'
import GoogleReviewsLinks from '../GoogleReviewsLinks'
import './recensioni-tag.css'

// In dev la chiamata passa dal proxy Vite; in prod va al backend HQ (CORS pubblico per studiomobilitas.it).
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

const QUARTIERE = Object.fromEntries(STUDI.map((s) => [s.nome, s.quartiere]))

// Colori degli avatar senza foto, come quelli di Google
const AVATAR_COLORI = ['#1a73e8', '#e8453c', '#f9ab00', '#34a853', '#a142f4', '#e8710a', '#12b5cb', '#d01884']

// useGrouping 'always': in italiano Intl non separa le migliaia sotto le 5 cifre (1247 → 1.247)
const numero = new Intl.NumberFormat('it-IT', { useGrouping: 'always' })
const decimale = new Intl.NumberFormat('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

const rtf = new Intl.RelativeTimeFormat('it', { numeric: 'auto' })
function quando(iso) {
  const giorni = Math.round((new Date(iso) - Date.now()) / 86_400_000)
  if (giorni > -7) return rtf.format(giorni, 'day')
  if (giorni > -30) return rtf.format(Math.round(giorni / 7), 'week')
  if (giorni > -365) return rtf.format(Math.round(giorni / 30), 'month')
  return rtf.format(Math.round(giorni / 365), 'year')
}

const GoogleG = ({ className }) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
)

const Stelle = ({ n = 5 }) => (
  <span className="mx-rt__stars" role="img" aria-label={`${n} stelle su 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className={i < n ? 'is-on' : ''}>
        <path d="M12 17.3l6.2 3.7-1.6-7 5.4-4.7-7.1-.6L12 2 9.1 8.7 2 9.3l5.4 4.7-1.6 7z" />
      </svg>
    ))}
  </span>
)

function Avatar({ autore, fotoUrl }) {
  const [rotta, setRotta] = useState(false)
  if (fotoUrl && !rotta) {
    return <img className="mx-rt__avatar" src={fotoUrl} alt="" referrerPolicy="no-referrer" loading="lazy" onError={() => setRotta(true)} />
  }
  const colore = AVATAR_COLORI[[...autore].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORI.length]
  return (
    <span className="mx-rt__avatar" style={{ background: colore }} aria-hidden="true">
      {autore[0]}
    </span>
  )
}

// Evidenzia nel testo le parole del dolore della landing (es. collo, cervicale)
function Evidenziato({ testo, evidenzia }) {
  if (!evidenzia) return testo
  return testo.split(evidenzia).map((parte, i) => (i % 2 ? <mark key={i}>{parte}</mark> : parte))
}

function Intestazione({ r }) {
  const quartiere = QUARTIERE[r.studio]
  return (
    <div className="mx-rt__who">
      <Avatar autore={r.autore} fotoUrl={r.fotoUrl} />
      <div className="mx-rt__meta">
        <b>{r.autore}</b>
        <span>
          {quando(r.data)}
          {quartiere && (
            <>
              {' · '}
              <MapPin size={11} aria-hidden="true" /> {quartiere}
            </>
          )}
        </span>
      </div>
      <GoogleG className="mx-rt__g" />
    </div>
  )
}

function Card({ r, i, evidenzia, onApri }) {
  const testo = useRef(null)
  const [tagliato, setTagliato] = useState(false)
  // "Leggi tutta" solo se il testo supera le righe visibili
  useLayoutEffect(() => {
    const el = testo.current
    setTagliato(el.scrollHeight > el.clientHeight + 1)
  }, [r.testo])
  return (
    <motion.li
      className="mx-rt__card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Intestazione r={r} />
      <Stelle n={r.valutazione} />
      <p className="mx-rt__text" ref={testo}>
        <Evidenziato testo={r.testo} evidenzia={evidenzia} />
      </p>
      {tagliato && (
        <button type="button" className="mx-rt__more" onClick={onApri}>
          Leggi tutta la recensione
        </button>
      )}
    </motion.li>
  )
}

// Senza tag non chiede nulla (serve alla riserva, che si carica solo quando serve)
function useRecensioni(tags, limite) {
  const chiave = tags.join(',')
  const [stato, setStato] = useState({ caricamento: !!chiave, recensioni: [] })
  useEffect(() => {
    if (!chiave) {
      setStato({ caricamento: false, recensioni: [] })
      return undefined
    }
    setStato((s) => ({ ...s, caricamento: true }))
    const ctrl = new AbortController()
    const qs = new URLSearchParams([...chiave.split(',').map((t) => ['tag', t]), ['limite', String(limite)]])
    const carica = () =>
      fetch(`${API_BASE}/api/sito/recensioni?${qs}`, { signal: ctrl.signal }).then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
    // Un secondo tentativo dopo 3s: il backend può essere in riavvio (deploy, o devtools in locale)
    carica()
      .catch((e) => {
        if (e.name === 'AbortError') throw e
        return new Promise((r) => setTimeout(r, 3000)).then(carica)
      })
      .then((json) => setStato({ caricamento: false, recensioni: json?.data ?? [] }))
      .catch((e) => e.name !== 'AbortError' && setStato({ caricamento: false, recensioni: [] }))
    return () => ctrl.abort()
  }, [chiave, limite])
  return stato
}

// Totale recensioni Google delle sedi (gestionale → Google Business), null finché non arriva o se manca
function useTotali() {
  const [totali, setTotali] = useState(null)
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${API_BASE}/api/sito/recensioni/totali`, { signal: ctrl.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => json?.data?.totale > 0 && setTotali(json.data))
      .catch(() => {})
    return () => ctrl.abort()
  }, [])
  return totali
}

// Il numero sale da zero quando il tabellone entra nello schermo
function Contatore({ valore }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true, margin: '-10% 0px' })
  useEffect(() => {
    if (!visto) return
    const ctrl = animate(0, valore, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = numero.format(Math.round(v))),
    })
    return () => ctrl.stop()
  }, [visto, valore])
  return (
    <span ref={ref} aria-label={numero.format(valore)}>
      0
    </span>
  )
}

function Tabellone({ totali }) {
  return (
    <div className="mx-rt__score">
      <div className="mx-rt__score-top">
        <GoogleG className="mx-rt__score-g" />
        {totali.media != null && <b>{decimale.format(totali.media)}</b>}
        <Stelle />
      </div>
      <p className="mx-rt__score-n">
        <Contatore valore={totali.totale} />
      </p>
      <p className="mx-rt__score-l">recensioni Google tra le nostre due sedi</p>
      <ul className="mx-rt__score-sedi">
        {totali.studi.map((s) => (
          <li key={s.studio}>
            <span>
              {s.studio} <small>{QUARTIERE[s.studio]}</small>
            </span>
            <b>{numero.format(s.totale)}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Ordine casuale (Fisher-Yates), deciso una volta per lista arrivata
function mescolate(lista) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

/**
 * Carosello di recensioni Google filtrate per tag dolore del gestionale (es. TAG_DOLORE_CERVICALGIA).
 * Card tutte della stessa altezza: il testo lungo si apre per intero in un pannello.
 * Con `evidenzia` restano solo le recensioni che nominano il problema (il tag del gestionale può venire
 * dal motivo della chiamata e non dal testo): ne chiede `limite` al gestionale e ne mostra al massimo `massimo`.
 * `mescola`: ordine casuale. `riserva` ({ tags, titolo, sottotitolo, evidenzia }): se le recensioni che passano
 * il filtro sono meno di `minimo`, mostra al loro posto quelle dei tag di riserva, mescolate e filtrate ed evidenziate
 * con le parole della riserva (poche recensioni su un dolore convincono meno di tante recensioni generiche).
 * Se il gestionale non risponde o non ci sono recensioni, il componente non mostra nulla.
 */
export default function RecensioniTag({
  tags,
  titolo,
  sottotitolo,
  evidenzia,
  mescola = false,
  riserva = null,
  minimo = 3,
  limite = 60,
  massimo = 30,
  className = '',
}) {
  const principali = useRecensioni(tags, limite)
  const filtrate = useMemo(() => {
    const lista = evidenzia ? principali.recensioni.filter((r) => evidenzia.test(r.testo)) : principali.recensioni
    return mescola ? mescolate(lista) : lista
  }, [principali.recensioni, evidenzia, mescola])
  const usaRiserva = !!riserva && !principali.caricamento && filtrate.length < minimo
  const diRiserva = useRecensioni(usaRiserva ? riserva.tags : [], limite)
  const mescolateRiserva = useMemo(() => {
    const parole = riserva?.evidenzia
    return mescolate(parole ? diRiserva.recensioni.filter((r) => parole.test(r.testo)) : diRiserva.recensioni)
  }, [diRiserva.recensioni, riserva?.evidenzia])
  const totali = useTotali()

  const caricamento = principali.caricamento || (usaRiserva && diRiserva.caricamento)
  const recensioni = (usaRiserva ? mescolateRiserva : filtrate).slice(0, massimo)
  const testa = usaRiserva ? riserva : { titolo, sottotitolo }
  const parole = usaRiserva ? (riserva.evidenzia ?? null) : evidenzia
  const track = useRef(null)
  const [pos, setPos] = useState(0)
  const [aperta, setAperta] = useState(null)

  useEffect(() => {
    if (!aperta) return
    const onKey = (e) => e.key === 'Escape' && setAperta(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aperta])

  if (!caricamento && !recensioni.length) return null

  const onScroll = () => {
    const el = track.current
    const max = el.scrollWidth - el.clientWidth
    setPos(max > 0 ? el.scrollLeft / max : 0)
  }

  const scorri = (dir) => {
    const el = track.current
    const card = el.querySelector('.mx-rt__card')
    const passo = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * passo * Math.max(1, Math.floor(el.clientWidth / passo)), behavior: 'smooth' })
  }

  return (
    <div className={`mx-rt ${className}`}>
      <div className="mx-rt__head">
        <div className="mx-rt__titles">
          {!totali && (
            <div className="mx-rt__badge">
              <GoogleG className="mx-rt__badge-g" />
              <Stelle />
              <span>Recensioni Google</span>
            </div>
          )}
          <h2 className="mx-h mx-rt__title">{testa.titolo}</h2>
          {testa.sottotitolo && <p className="mx-rt__sub">{testa.sottotitolo}</p>}
          <p className="mx-rt__real">
            <span className="mx-rt__real-ic" aria-hidden="true">
              <ShieldCheck size={20} strokeWidth={2.2} />
            </span>
            <span>
              <b>Storie reali di pazienti veri</b>, passati dagli studi Mobilitas.
              <small>Recensioni pubblicate su Google dai pazienti, riportate parola per parola.</small>
            </span>
          </p>
        </div>
        {totali && <Tabellone totali={totali} />}
      </div>

      <div className="mx-rt__viewport">
        <ul className="mx-rt__track" ref={track} onScroll={onScroll}>
          {caricamento
            ? Array.from({ length: 4 }, (_, i) => <li key={i} className="mx-rt__card is-skeleton" aria-hidden="true" />)
            : recensioni.map((r, i) => (
                <Card key={`${r.autore}-${r.data}-${i}`} r={r} i={i} evidenzia={parole} onApri={() => setAperta(r)} />
              ))}
        </ul>
      </div>

      <div className="mx-rt__foot">
        <div className="mx-rt__bar" aria-hidden="true">
          <i style={{ transform: `translateX(${pos * 300}%)` }} />
        </div>
        <div className="mx-rt__arrows">
          <button type="button" onClick={() => scorri(-1)} aria-label="Recensioni precedenti">
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <button type="button" onClick={() => scorri(1)} aria-label="Recensioni successive">
            <ArrowRight size={18} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      <GoogleReviewsLinks
        align="center"
        className="mx-rt__links"
        totali={totali && Object.fromEntries(totali.studi.map((s) => [s.studio, s.totale]))}
      />

      {/* Portal: dentro .mx-wrap (z-index: 2) il pannello resterebbe sotto la barra del sito */}
      {createPortal(
        <AnimatePresence>
          {aperta && (
            <motion.div
              className="mx-rt mx-rt__modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAperta(null)}
            >
              <motion.div
                className="mx-rt__sheet"
                role="dialog"
                aria-modal="true"
                aria-label={`Recensione di ${aperta.autore}`}
                initial={{ y: 40, scale: 0.97 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 40, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <button type="button" className="mx-rt__close" onClick={() => setAperta(null)} aria-label="Chiudi" autoFocus>
                  <X size={20} />
                </button>
                <Intestazione r={aperta} />
                <Stelle n={aperta.valutazione} />
                <Quote className="mx-rt__quote" size={40} aria-hidden="true" />
                <p className="mx-rt__full">
                  <Evidenziato testo={aperta.testo} evidenzia={parole} />
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
