import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, CalendarPlus, Check, Clock, Hand, Loader2, MapPin, MessageCircle, Navigation, Search, Shirt, TriangleAlert } from 'lucide-react'
import Dialog from '../ui/Dialog'
import StudiMap from '../studi-map/StudiMap'
import { STUDI } from '../../data/studi'
import { salvaPrenotata } from './richiestaSalvata'
import { prenotataDi } from './whatsappConferma'
import './prenota-visita.css'

// Calendario della prima visita nella pagina di conferma.
// Il paziente sceglie studio, giorno e ora; l'osteopata lo assegna il gestionale (/api/sito/prenotazione).
// tipo 'primaVisita': ha chiesto la visita a 49€, qui la blocca subito.
// tipo 'consulto': ha chiesto la chiamata gratuita, qui gli proponiamo di prendere già la visita scontata.

const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')
const EASE = [0.16, 1, 0.3, 1]

const fmtGiorno = new Intl.DateTimeFormat('it-IT', { weekday: 'short' })
const fmtMese = new Intl.DateTimeFormat('it-IT', { month: 'short' })
const fmtLungo = new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })

// "2026-11-03" va letto come giorno locale, non UTC
const comeData = (iso) => {
  const [a, m, g] = iso.split('-').map(Number)
  return new Date(a, m - 1, g)
}
const dataLunga = (iso) => fmtLungo.format(comeData(iso))
const prima = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const FASCE = [
  { nome: 'Mattina', da: '00:00', a: '13:00' },
  { nome: 'Pomeriggio', da: '13:00', a: '17:00' },
  { nome: 'Sera', da: '17:00', a: '24:00' },
]

// dolore: risultato di doloreDi in data/dolori.js (null = testo generico, senza nominare il problema)
const copyPer = (tipo, dolore) =>
  tipo === 'consulto'
    ? {
        kicker: 'Mentre aspetti la chiamata',
        titolo: <>Vuoi già bloccare la prima visita a <span className="mx-accent">49€</span>?</>,
        testo: (
          <>
            Ti chiamiamo noi per il consulto gratuito{dolore ? <> {dolore.sulTuo}</> : null}. Ma questo mese i posti con lo sconto <s>90€</s> <strong className="mx-pv__green">49€</strong> sono pochi e finiscono in fretta. Se prenoti ora, il prezzo scontato è tuo.
          </>
        ),
      }
    : {
        kicker: 'Ultimo passo · 1 minuto',
        titolo: dolore ? (
          <>Scegli tu giorno e ora della <span className="mx-accent">prima visita {dolore.per}</span></>
        ) : (
          <>Scegli tu giorno e ora della <span className="mx-accent">prima visita</span></>
        ),
        testo: (
          <>
            Così il tuo posto a <strong className="mx-pv__green">49€</strong> è già bloccato{dolore ? <> e inizi subito a lavorare {dolore.sulTuo}</> : null}. I posti scontati di questo mese finiscono in fretta: chi prenota adesso sceglie l'orario che preferisce.
          </>
        ),
      }

const PASSI_VISITA = [
  { icon: MessageCircle, testo: 'Parliamo del tuo problema' },
  { icon: Search, testo: 'Scopri finalmente da dove nasce il tuo dolore' },
  { icon: Hand, testo: 'Facciamo il primo trattamento' },
  { icon: Shirt, testo: 'Vieni con vestiti comodi' },
]

// Link "aggiungi a Google Calendar" con data e ora locali (Europe/Rome)
const googleCalendarUrl = (v, studio, dolore) => {
  const t = (data, ora) => `${data.replaceAll('-', '')}T${ora.replace(':', '')}00`
  const qs = new URLSearchParams({
    action: 'TEMPLATE',
    text: dolore ? `Prima visita osteopatica ${dolore.per} - Mobilitas` : 'Prima visita osteopatica - Mobilitas',
    dates: `${t(v.data, v.ora)}/${t(v.data, v.oraFine)}`,
    ctz: 'Europe/Rome',
    location: `${studio.nome}, Torino`,
    details: 'Prima visita da Mobilitas. Porta vestiti comodi. Per imprevisti: +39 351 819 8457',
  })
  return `https://calendar.google.com/calendar/render?${qs}`
}

// Orari liberi dei due studi, chiesti insieme all'apertura: così ogni studio mostra già il primo posto libero
function useDisponibilita() {
  const [stato, setStato] = useState({})

  const carica = (id) => {
    setStato((s) => ({ ...s, [id]: { ...s[id], caricamento: true, errore: false } }))
    return fetch(`${API_BASE}/api/sito/prenotazione/disponibilita?studio=${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) throw new Error(json.message)
        setStato((s) => ({ ...s, [id]: { giorni: json.data.giorni, caricamento: false } }))
      })
      .catch(() => setStato((s) => ({ ...s, [id]: { ...s[id], caricamento: false, errore: true } })))
  }

  useEffect(() => {
    STUDI.forEach((s) => carica(s.id))
  }, [])

  return [stato, carica]
}

// onPrenotata(visita): la pagina aggiorna i testi intorno (es. il bottone WhatsApp) dopo la prenotazione
export default function PrenotaVisita({ richiesta, dolore = null, onPrenotata }) {
  const tipo = richiesta.tipo === 'consulto' ? 'consulto' : 'primaVisita'
  const copy = copyPer(tipo, dolore)
  const [disponibilita, ricarica] = useDisponibilita()
  const [studioId, setStudioId] = useState(null)
  const [giorno, setGiorno] = useState(null)
  const [ora, setOra] = useState(null)
  const [invio, setInvio] = useState(false)
  const [errore, setErrore] = useState(null)
  const [mappa, setMappa] = useState(null)
  const [prenotata, setPrenotata] = useState(() => prenotataDi(richiesta))

  // Array stabile: StudiMap ricrea la mappa quando cambia la lista degli studi
  const studiMappa = useMemo(() => (mappa ? [mappa] : []), [mappa])
  const studio = STUDI.find((s) => s.id === studioId)
  const giorni = useMemo(() => disponibilita[studioId]?.giorni ?? [], [disponibilita, studioId])
  const orari = useMemo(() => giorni.find((g) => g.data === giorno)?.orari ?? [], [giorni, giorno])

  const scegliStudio = (id) => {
    setStudioId(id)
    setGiorno(disponibilita[id]?.giorni?.[0]?.data ?? null)
    setOra(null)
    setErrore(null)
  }

  // Se gli orari arrivano dopo la scelta dello studio, apri il primo giorno libero
  useEffect(() => {
    if (studioId && !giorno && giorni.length) setGiorno(giorni[0].data)
  }, [studioId, giorno, giorni])

  const prenota = async () => {
    if (!studio || !giorno || !ora || invio) return
    setInvio(true)
    setErrore(null)
    try {
      const res = await fetch(`${API_BASE}/api/sito/prenotazione`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ richiestaId: richiesta.id, token: richiesta.token, studio: studio.id, data: giorno, ora }),
      })
      const json = await res.json()
      if (!json.success) {
        // 409: l'orario è appena stato preso (o la visita è già prenotata): ricarica gli orari
        if (res.status === 409) {
          setOra(null)
          ricarica(studio.id)
        }
        throw new Error(json.message || 'Non siamo riusciti a prenotare. Riprova.')
      }
      const visita = { ...json.data, richiestaId: richiesta.id, studioId: studio.id }
      salvaPrenotata(visita)
      setPrenotata(visita)
      onPrenotata?.(visita)
      if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Schedule')
    } catch (err) {
      setErrore(err.message || 'Non siamo riusciti a prenotare. Riprova.')
    } finally {
      setInvio(false)
    }
  }

  if (prenotata) {
    const s = STUDI.find((x) => x.id === prenotata.studioId) ?? STUDI[0]
    return (
      <motion.section
        className="mx-pv mx-pv--done"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        aria-live="polite"
      >
        <span className="mx-pv__done-check" aria-hidden="true">
          <Check strokeWidth={3.2} />
        </span>
        <p className="mx-pv__kicker">Prima visita prenotata</p>
        <h2 className="mx-pv__title">Ti aspettiamo!</h2>
        <p className="mx-pv__when">
          <CalendarCheck size={20} aria-hidden="true" />
          <span>
            {prima(dataLunga(prenotata.data))}, ore {prenotata.ora}
          </span>
        </p>
        <p className="mx-pv__where">
          <MapPin size={18} aria-hidden="true" />
          <span>
            {s.nome}, Torino <small>({s.quartiere})</small>
          </span>
        </p>
        <div className="mx-pv__done-actions">
          <a className="mx-pv__action" href={googleCalendarUrl(prenotata, s, dolore)} target="_blank" rel="noopener noreferrer">
            <CalendarPlus size={18} aria-hidden="true" /> Aggiungi al calendario
          </a>
          <a className="mx-pv__action" href={s.indicazioniUrl} target="_blank" rel="noopener noreferrer">
            <Navigation size={18} aria-hidden="true" /> Indicazioni
          </a>
        </div>
        <p className="mx-pv__note">
          Il prezzo di <strong className="mx-pv__green">49€</strong> è bloccato: paghi in studio, il giorno della visita. Se hai un imprevisto, scrivici su WhatsApp o chiamaci.
        </p>
      </motion.section>
    )
  }

  return (
    <motion.section
      className="mx-pv"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
      aria-labelledby="mx-pv-title"
    >
      <div className="mx-pv__head">
        <p className="mx-pv__kicker">{copy.kicker}</p>
        <h2 className="mx-pv__title" id="mx-pv-title">
          {copy.titolo}
        </h2>
        <p className="mx-pv__text">{copy.testo}</p>
        <span className="mx-pv__price" aria-label="Prima visita 49 euro invece di 90">
          <s>90€</s>
          <span>49€</span>
        </span>
      </div>

      {/* Cosa succede alla prima visita: chi sa cosa lo aspetta prenota più volentieri (dati delle FAQ della landing) */}
      <div className="mx-pv__visita">
        <p className="mx-pv__visita-t">
          <Clock size={16} aria-hidden="true" /> La prima visita dura circa un'ora
        </p>
        <ol className="mx-pv__visita-steps">
          {PASSI_VISITA.map((passo) => {
            const Icon = passo.icon
            return (
              <li key={passo.testo}>
                <Icon size={18} aria-hidden="true" />
                {passo.testo}
              </li>
            )
          })}
        </ol>
      </div>

      {/* 1. Studio */}
      <p className="mx-pv__step">
        <span>1</span> Scegli lo studio
      </p>
      <div className="mx-pv__studi" role="radiogroup" aria-label="Studio">
        {STUDI.map((s) => {
          const d = disponibilita[s.id]
          const primo = d?.giorni?.[0]
          return (
            <div key={s.id} className={`mx-pv__studio ${studioId === s.id ? 'is-on' : ''}`}>
              <button type="button" role="radio" aria-checked={studioId === s.id} className="mx-pv__studio-btn" onClick={() => scegliStudio(s.id)}>
                <span className="mx-pv__radio" aria-hidden="true">
                  <Check size={14} strokeWidth={3.4} />
                </span>
                <span className="mx-pv__studio-q">{s.quartiere}</span>
                <span className="mx-pv__studio-via">{s.nome}</span>
                <span className="mx-pv__studio-primo">
                  {d?.caricamento && !d?.giorni ? (
                    'Cerco i posti liberi…'
                  ) : primo ? (
                    <>
                      Primo posto: <strong>{fmtGiorno.format(comeData(primo.data))} {comeData(primo.data).getDate()}, {primo.orari[0]}</strong>
                    </>
                  ) : d?.errore ? (
                    'Orari non disponibili'
                  ) : (
                    'Nessun posto libero'
                  )}
                </span>
              </button>
              <button type="button" className="mx-pv__map-btn" onClick={() => setMappa(s)}>
                <MapPin size={14} aria-hidden="true" /> Vedi sulla mappa
              </button>
            </div>
          )
        })}
      </div>

      <AnimatePresence initial={false}>
        {studio && (
          <motion.div
            key="calendario"
            className="mx-pv__cal"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {disponibilita[studio.id]?.caricamento && !giorni.length ? (
              <p className="mx-pv__empty">
                <Loader2 className="mx-pv__spin" size={18} aria-hidden="true" /> Cerco i posti liberi…
              </p>
            ) : disponibilita[studio.id]?.errore && !giorni.length ? (
              <p className="mx-pv__empty">
                Non riusciamo a caricare gli orari.{' '}
                <button type="button" className="mx-pv__link" onClick={() => ricarica(studio.id)}>
                  Riprova
                </button>
              </p>
            ) : !giorni.length ? (
              <p className="mx-pv__empty">In questo studio le prossime tre settimane sono piene. Prova l'altro studio, oppure ti troviamo noi un posto quando ti chiamiamo.</p>
            ) : (
              <>
                {/* 2. Giorno */}
                <p className="mx-pv__step">
                  <span>2</span> Scegli il giorno
                </p>
                <div className="mx-pv__days" role="radiogroup" aria-label="Giorno">
                  {giorni.map((g) => {
                    const d = comeData(g.data)
                    return (
                      <button
                        key={g.data}
                        type="button"
                        role="radio"
                        aria-checked={giorno === g.data}
                        aria-label={`${dataLunga(g.data)}, ${g.orari.length} orari liberi`}
                        className={`mx-pv__day ${giorno === g.data ? 'is-on' : ''}`}
                        onClick={() => {
                          setGiorno(g.data)
                          setOra(null)
                        }}
                      >
                        <span className="mx-pv__day-w">{fmtGiorno.format(d)}</span>
                        <span className="mx-pv__day-n">{d.getDate()}</span>
                        <span className="mx-pv__day-m">{fmtMese.format(d)}</span>
                        <span className="mx-pv__day-c">{g.orari.length === 1 ? 'ultimo posto' : `${g.orari.length} posti`}</span>
                      </button>
                    )
                  })}
                </div>

                {/* 3. Ora */}
                <p className="mx-pv__step">
                  <span>3</span> Scegli l'ora
                </p>
                <div className="mx-pv__fasce">
                  {FASCE.map((f) => {
                    const lista = orari.filter((o) => o >= f.da && o < f.a)
                    if (!lista.length) return null
                    return (
                      <div key={f.nome} className="mx-pv__fascia">
                        <p className="mx-pv__fascia-t">{f.nome}</p>
                        <div className="mx-pv__times" role="radiogroup" aria-label={f.nome}>
                          {lista.map((o) => (
                            <button
                              key={o}
                              type="button"
                              role="radio"
                              aria-checked={ora === o}
                              className={`mx-pv__time ${ora === o ? 'is-on' : ''}`}
                              onClick={() => setOra(o)}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {errore && (
        <p className="mx-pv__error" role="alert">
          <TriangleAlert size={18} aria-hidden="true" /> {errore}
        </p>
      )}

      <div className="mx-pv__confirm">
        <p className="mx-pv__summary" aria-live="polite">
          {studio && giorno && ora ? (
            <>
              <strong>
                {prima(dataLunga(giorno))}, ore {ora}
              </strong>
              <span>
                {studio.nome} ({studio.quartiere})
              </span>
            </>
          ) : (
            <span>{!studio ? 'Scegli lo studio per vedere i posti liberi.' : !ora ? 'Scegli giorno e ora.' : ''}</span>
          )}
        </p>
        <button type="button" className="mx-pv__cta" disabled={!studio || !giorno || !ora || invio} onClick={prenota}>
          {invio ? (
            <>
              <Loader2 className="mx-pv__spin" size={20} aria-hidden="true" /> Sto prenotando…
            </>
          ) : (
            <>
              Prenota la prima visita a 49€
              <span className="mx-pv__cta-icon" aria-hidden="true">
                <ArrowRight size={20} strokeWidth={2.6} />
              </span>
            </>
          )}
        </button>
        <p className="mx-pv__small">Paghi in studio, il giorno della visita. Nessun anticipo online.</p>
      </div>

      <Dialog isOpen={!!mappa} onClose={() => setMappa(null)} title={mappa ? `Mappa ${mappa.nome}` : 'Mappa'} size="lg">
        {mappa && (
          <div className="mx-pv__map">
            <StudiMap studi={studiMappa} />
          </div>
        )}
      </Dialog>
    </motion.section>
  )
}
