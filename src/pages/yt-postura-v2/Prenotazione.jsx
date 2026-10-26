import React, { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useDragControls, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FASCE_ORARIE, PAGINA_CONFERMA, costruisciRichiesta, inviaRichiesta } from './richiesta'

// Modulo di prenotazione della landing /yt-postura-v2 (foglio dal basso su mobile, scheda centrata su desktop).
// Invia la stessa richiesta del popup condiviso per "yt-postura" (vedi richiesta.js). Il popup condiviso non viene toccato.
// Versione compatta e scura (23/10/2026): tutto il modulo sta in uno schermo di telefono, senza scorrere.

const _MOTION = motion

// «consulto» è l'unica modalità usata dalla pagina (telefonata gratuita, CT_GRATUITA).
// «primaVisita» (lista d'attesa) resta qui com'era, ma nessun pulsante la apre: la lista non è configurata.
const TESTI = {
  consulto: {
    sopra: 'Percorso posturale · 299€',
    title: 'Inizia il percorso',
    subtext: 'Ti chiamiamo noi, gratis. Non paghi niente in anticipo.',
    cta: 'Richiedi la telefonata gratuita',
  },
  primaVisita: {
    sopra: 'Lista d’attesa',
    title: 'Mettiti in lista',
    subtext: 'Oggi non paghi. Ti richiamiamo noi il prima possibile.',
    cta: 'Mettiti in lista',
  },
}

// Nomi brevi sui bottoni delle fasce (nella richiesta va sempre il testo completo di richiesta.js).
const NOME_BREVE = { 'pausa-pranzo': 'Pranzo', qualsiasi: 'Qualsiasi orario' }
const dettaglioFascia = (f) => (f.ore ? `Ti chiamiamo tra le ${f.ore.replace(' – ', ' e le ')}.` : 'Va bene qualsiasi orario.')

const VUOTO = { nome: '', cognome: '', cellulare: '', orarioChiamata: '' }

function controlla(form) {
  const e = {}
  if (!form.nome.trim()) e.nome = 'Scrivi il tuo nome.'
  if (!form.cognome.trim()) e.cognome = 'Scrivi il tuo cognome.'
  const cifre = form.cellulare.replace(/\D/g, '')
  if (!cifre) e.cellulare = 'Serve un numero per richiamarti.'
  else if (cifre.length < 8) e.cellulare = 'Il numero sembra incompleto.'
  if (!form.orarioChiamata) e.orarioChiamata = 'Scegli quando chiamarti.'
  return e
}

// Curve e tempi (skill di Emil Kowalski): entrata a curva «drawer», uscita più rapida.
const CURVA = [0.32, 0.72, 0, 1]

export default function Prenotazione({ isOpen, onClose, ctaType = 'primaVisita' }) {
  const navigate = useNavigate()
  const riduci = useReducedMotion()
  const testi = TESTI[ctaType] ?? TESTI.primaVisita
  const id = useId()
  const [form, setForm] = useState(VUOTO)
  const [errori, setErrori] = useState({})
  const [tentato, setTentato] = useState(false)
  const [invio, setInvio] = useState(false)
  const [erroreRete, setErroreRete] = useState(null)
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 39.99rem)').matches : false
  )
  const foglioRef = useRef(null)
  const trascina = useDragControls()
  const primoCampoRef = useRef(null)
  const prima = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 39.99rem)')
    const cambia = () => setMobile(mq.matches)
    mq.addEventListener('change', cambia)
    return () => mq.removeEventListener('change', cambia)
  }, [])

  // Apertura: blocca lo scorrimento della pagina, porta il fuoco nel modulo, Esc chiude, il fuoco resta dentro.
  // Su telefono il fuoco va al foglio e non al primo campo: la tastiera non si apre da sola e il modulo si vede tutto.
  useEffect(() => {
    if (!isOpen) return
    prima.current = document.activeElement
    const html = document.documentElement
    const overflowPrima = html.style.overflow
    html.style.overflow = 'hidden'
    const telefono = window.matchMedia('(max-width: 39.99rem)').matches
    const t = window.setTimeout(
      () => (telefono ? foglioRef.current : primoCampoRef.current)?.focus({ preventScroll: true }),
      riduci ? 0 : 180
    )
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        chiudi()
      }
      if (e.key === 'Tab' && foglioRef.current) {
        const f = foglioRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
        if (!f.length) return
        const primo = f[0]
        const ultimo = f[f.length - 1]
        if (e.shiftKey && (document.activeElement === primo || document.activeElement === foglioRef.current)) {
          e.preventDefault()
          ultimo.focus()
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault()
          primo.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      html.style.overflow = overflowPrima
      if (prima.current && typeof prima.current.focus === 'function') prima.current.focus({ preventScroll: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const chiudi = () => {
    if (invio) return
    setForm(VUOTO)
    setErrori({})
    setTentato(false)
    setErroreRete(null)
    onClose()
  }

  const aggiorna = (campo, valore) => {
    const dopo = { ...form, [campo]: valore }
    setForm(dopo)
    if (tentato) setErrori(controlla(dopo))
  }

  const invia = async (e) => {
    e.preventDefault()
    setTentato(true)
    const trovati = controlla(form)
    setErrori(trovati)
    if (Object.keys(trovati).length) {
      const primoErrato = foglioRef.current?.querySelector('[aria-invalid="true"]')
      const bersaglio = primoErrato?.matches('fieldset') ? primoErrato.querySelector('input') : primoErrato
      bersaglio?.focus()
      return
    }
    setInvio(true)
    setErroreRete(null)
    try {
      await inviaRichiesta(costruisciRichiesta(form, ctaType))
      setInvio(false)
      setForm(VUOTO)
      onClose()
      navigate(PAGINA_CONFERMA)
    } catch (err) {
      console.error('API richieste:', err)
      setErroreRete(err.message || 'Si è verificato un errore. Riprova più tardi.')
      setInvio(false)
    }
  }

  // Trascinamento verso il basso per chiudere (solo mobile): soglia o velocità, come nei fogli nativi.
  const fineTrascinamento = (_e, info) => {
    if (info.offset.y > 120 || info.velocity.y > 600) chiudi()
  }

  const nascosto = mobile ? { y: '100%' } : { opacity: 0, scale: 0.97, y: 12 }
  const visibile = mobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }
  const errore = (campo) => (tentato ? errori[campo] : undefined)
  const fascia = FASCE_ORARIE.find((f) => f.value === form.orarioChiamata)

  const contenuto = (
    <AnimatePresence>
      {isOpen && (
        <div className="ytp-pop" key="ytp-pop">
          <motion.div
            className="ytp-pop__fondo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.24 } }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            onClick={chiudi}
            aria-hidden="true"
          />
          <motion.div
            ref={foglioRef}
            className="ytp-pop__foglio"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-titolo`}
            aria-describedby={`${id}-sotto`}
            tabIndex={-1}
            initial={nascosto}
            animate={{ ...visibile, transition: { duration: mobile ? 0.42 : 0.28, ease: CURVA } }}
            exit={{ ...nascosto, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
            drag={mobile && !invio ? 'y' : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.06, bottom: 0.7 }}
            dragListener={false}
            dragControls={trascina}
            onDragEnd={fineTrascinamento}
          >
            {/* Il trascinamento parte solo da maniglia e testata: i campi restano liberi. */}
            <div className="ytp-pop__maniglia" aria-hidden="true" onPointerDown={(e) => mobile && trascina.start(e)} />
            <header className="ytp-pop__testa" onPointerDown={(e) => mobile && !e.target.closest('button') && trascina.start(e)}>
              <p className="ytp-pop__sopra">{testi.sopra}</p>
              {/* misura su uno span interno: il foglio globale riduce gli h2 su mobile con !important */}
              <h2 className="ytp-pop__titolo" id={`${id}-titolo`}>
                <span>{testi.title}</span>
              </h2>
              <p className="ytp-pop__sotto" id={`${id}-sotto`}>
                {testi.subtext}
              </p>
              <button type="button" className="ytp-pop__chiudi" onClick={chiudi} disabled={invio} aria-label="Chiudi">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <form className="ytp-pop__form" onSubmit={invia} noValidate>
              <div className="ytp-pop__riga2">
                <Campo
                  id={`${id}-nome`}
                  label="Nome"
                  errore={errore('nome')}
                  inputRef={primoCampoRef}
                  value={form.nome}
                  onChange={(v) => aggiorna('nome', v)}
                  autoComplete="given-name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                />
                <Campo
                  id={`${id}-cognome`}
                  label="Cognome"
                  errore={errore('cognome')}
                  value={form.cognome}
                  onChange={(v) => aggiorna('cognome', v)}
                  autoComplete="family-name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                />
              </div>
              <Campo
                id={`${id}-cellulare`}
                label="Cellulare"
                errore={errore('cellulare')}
                value={form.cellulare}
                onChange={(v) => aggiorna('cellulare', v)}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="333 123 4567"
                enterKeyHint="done"
              />

              <fieldset
                className="ytp-pop__fasce"
                aria-invalid={errore('orarioChiamata') ? 'true' : undefined}
                aria-describedby={`${id}-fasce-info`}
              >
                <legend className="ytp-pop__legenda">Quando ti chiamiamo?</legend>
                <div className="ytp-pop__chips">
                  {FASCE_ORARIE.map((f) => (
                    <label key={f.value} className="ytp-pop__chip">
                      <input
                        type="radio"
                        name={`${id}-orario`}
                        value={f.value}
                        checked={form.orarioChiamata === f.value}
                        onChange={() => aggiorna('orarioChiamata', f.value)}
                        aria-label={f.testo}
                      />
                      <span aria-hidden="true">{NOME_BREVE[f.value] ?? f.nome}</span>
                    </label>
                  ))}
                </div>
                {/* Una sola riga riservata: orari della fascia scelta, oppure l'errore. Niente salti di altezza. */}
                <p
                  className={`ytp-pop__info${errore('orarioChiamata') ? ' is-err' : ''}`}
                  id={`${id}-fasce-info`}
                  aria-live="polite"
                >
                  {errore('orarioChiamata') ?? (fascia ? dettaglioFascia(fascia) : ' ')}
                </p>
              </fieldset>

              {erroreRete ? (
                <p className="ytp-pop__rete" role="alert">
                  {erroreRete}
                </p>
              ) : null}
              <button type="submit" className="ytp-pop__invia" disabled={invio}>
                {invio ? (
                  <>
                    <span className="ytp-pop__spin" aria-hidden="true" />
                    Invio in corso…
                  </>
                ) : (
                  testi.cta
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return typeof document !== 'undefined' ? createPortal(contenuto, document.body) : null
}

// Campo con etichetta dentro il riquadro (sempre visibile, in alto): metà altezza rispetto a etichetta + campo.
function Campo({ id, label, errore, inputRef, value, onChange, type = 'text', ...resto }) {
  return (
    <div className={`ytp-pop__campo${errore ? ' is-err' : ''}`}>
      <label className="ytp-pop__label" htmlFor={id}>
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={errore ? 'true' : undefined}
        aria-describedby={errore ? `${id}-err` : undefined}
        required
        {...resto}
      />
      {errore ? (
        <p className="ytp-pop__errore" id={`${id}-err`}>
          {errore}
        </p>
      ) : null}
    </div>
  )
}
