import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  Home,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  ShieldCheck,
  Star,
  UserRound,
} from 'lucide-react'
import CartaBlack from '../../components/black-friday-2026-sections/CartaBlack'
import { Countdown } from '../../components/black-friday-2026-sections/BfxKit'
import { PREZZO_VISITA, SCADENZA, useSeoOfferta } from '../../components/black-friday/offerta'
import { RECENSIONI_TOTALI } from '../../data/studi'
import MetodiPagamento from '../../components/checkout/MetodiPagamento'
import { leggiOfferta } from '../../components/checkout/checkoutApi'
import { errori, pulisciCodiceFiscale } from '../../components/checkout/validazione'
import CheckoutShell, { PRIVACY } from '../../components/checkout/CheckoutShell'
import Passi from '../../components/checkout/Passi'
import { salvaRicevuta } from '../../components/checkout/ricevutaSalvata'

// Pagina di pagamento del Black Friday 2026 (/black-friday-2026/pagamento): ci portano tutti i bottoni di
// /black-friday-2026. Dati di fatturazione tutti obbligatori, poi carta, PayPal o PayPal in 3 rate (PayPal).
// Prezzo, scadenza e disponibilità li decide il gestionale (offerta BLACK_FRIDAY_2026): qui si mostrano soltanto.
// A pagamento riuscito il gestionale crea l'ordine (pagina Ordini online), lo collega al paziente col codice
// fiscale e manda l'email di conferma. Dal gestionale locale non si paga mai davvero: pagamento simulato, oppure
// la sandbox di PayPal se il gestionale locale ha le credenziali sandbox. Specifica: docs/integrazioni.md.
// Stile: styles/pages/checkout.css (prefisso ckx-), sopra i colori e i pezzi di black-friday-2026.css (bfx-).
// Solo Montserrat, anche per codice fiscale e numeri.

const OFFERTA = 'BLACK_FRIDAY_2026'
const VISITE = 10
const PREZZO_PIENO = 900
const WHATSAPP = '+39 351 819 8457'
const SCADENZA_BREVE = SCADENZA.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', timeZone: 'Europe/Rome' })
const EASE = [0.16, 1, 0.3, 1]

const SEO = {
  path: '/black-friday-2026/pagamento',
  title: 'Pagamento · Black Friday Mobilitas | 10 visite a metà prezzo',
  description: 'Paga online le tue 10 visite del Black Friday Mobilitas: carta, PayPal o PayPal in 3 rate.',
  ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_02_orizzontale.jpg',
  ogImageAlt: 'Trattamento osteopatico nello studio Mobilitas di Torino',
}

const VUOTO = {
  nome: '',
  cognome: '',
  codiceFiscale: '',
  email: '',
  cellulare: '',
  indirizzo: '',
  cap: '',
  citta: '',
  nazione: 'Italia',
  consensoPrivacy: false,
}

// I campi in tre gruppi, nell'ordine in cui si compilano
const GRUPPI = [
  { id: 'chi', titolo: 'Chi sei', icona: UserRound, campi: ['nome', 'cognome', 'codiceFiscale'] },
  { id: 'contatti', titolo: 'Come ti contattiamo', icona: MessageCircle, campi: ['email', 'cellulare'] },
  { id: 'residenza', titolo: 'Dove abiti', icona: Home, campi: ['indirizzo', 'cap', 'citta', 'nazione'] },
]
const CAMPI = [...GRUPPI.flatMap((g) => g.campi), 'consensoPrivacy']

const euro = (n) => `${Number(n).toLocaleString('it-IT', { minimumFractionDigits: Number.isInteger(Number(n)) ? 0 : 2 })}€`

const entra = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
})

function Campo({ id, label, errore, hint, valido, className = '', children }) {
  return (
    <div className={`ckx-field ${errore ? 'has-err' : ''} ${valido ? 'is-ok' : ''} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <div className="ckx-field__box">
        {children}
        <span className="ckx-field__ok" aria-hidden="true"><Check size={13} strokeWidth={3.2} /></span>
      </div>
      {errore ? (
        <p className="ckx-field__err" id={`${id}-err`} role="alert">{errore}</p>
      ) : hint ? (
        <p className="ckx-field__hint" id={`${id}-hint`}>{hint}</p>
      ) : null}
    </div>
  )
}

// Riepilogo dell'ordine: la carta Black Friday, il conto e le garanzie
function Riepilogo({ offerta }) {
  const importo = offerta?.importo ?? 450
  return (
    <aside className="ckx-sum" aria-label="Riepilogo dell'ordine">
      <div className="ckx-sum__card">
        <CartaBlack visite={VISITE} prezzo={importo} prezzoPieno={PREZZO_PIENO} scadenzaBreve={SCADENZA_BREVE} />
      </div>
      <div className="ckx-sum__head">
        <p className="ckx-eyebrow">Il tuo ordine</p>
        <span className="ckx-save">Risparmi {euro(PREZZO_PIENO - importo)}</span>
      </div>
      <h2 className="ckx-sum__title">{offerta?.nome ?? `Percorso ${VISITE} visite · Black Friday 2026`}</h2>
      <dl className="ckx-ledger">
        <div><dt>{VISITE} visite osteopatiche</dt><dd><s>{euro(PREZZO_PIENO)}</s></dd></div>
        <div className="is-save"><dt>Sconto Black Friday</dt><dd>−{euro(PREZZO_PIENO - importo)}</dd></div>
        <div className="is-total"><dt>Totale<small>una volta sola</small></dt><dd>{euro(importo)}</dd></div>
      </dl>
      <p className="ckx-sum__unit">{euro(importo / VISITE)} a visita invece di {euro(PREZZO_VISITA)}</p>
      <div className="ckx-sum__more">
      <Countdown className="ckx-sum__count" etichetta="L'offerta finisce tra" />
      <ul className="ckx-trust">
        <li><ShieldCheck size={18} aria-hidden="true" /> <span><b>Pagamento protetto da PayPal</b>I dati della carta non passano da noi</span></li>
        <li><Mail size={18} aria-hidden="true" /> <span><b>Conferma subito</b>Ti arriva l'email appena hai pagato</span></li>
        <li><CalendarCheck size={18} aria-hidden="true" /> <span><b>Ti contattiamo noi</b>La segreteria ti chiama, o ti manda su WhatsApp il link per prenotare</span></li>
      </ul>
      <div className="ckx-proof">
        <span className="ckx-proof__stars" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
        </span>
        <span>Oltre <b>{RECENSIONI_TOTALI}</b> recensioni su Google · 2 studi a Torino</span>
      </div>
      </div>
    </aside>
  )
}

export default function CheckoutBlackFriday() {
  useSeoOfferta(SEO)
  const [offerta, setOfferta] = useState(null)
  const [statoOfferta, setStatoOfferta] = useState('carica') // carica | ok | errore
  const [campi, setCampi] = useState(VUOTO)
  const [toccati, setToccati] = useState({})
  const [mostraTutti, setMostraTutti] = useState(false)
  const navigate = useNavigate()
  const campiRef = useRef(campi)
  campiRef.current = campi
  const pagaRef = useRef(null)

  useEffect(() => {
    let vivo = true
    leggiOfferta(OFFERTA).then(
      (o) => {
        if (!vivo) return
        setOfferta(o)
        setStatoOfferta('ok')
      },
      () => vivo && setStatoOfferta('errore'),
    )
    return () => {
      vivo = false
    }
  }, [])

  // Pagamento riuscito: la ricevuta va alla pagina di conferma (sessionStorage), che fa partire le conversioni
  const fatto = (ricevuta) => {
    salvaRicevuta(ricevuta)
    navigate('/black-friday-2026/grazie')
  }

  const err = useMemo(() => errori(campi), [campi])
  const completi = Object.keys(err).length === 0
  const fatti = CAMPI.filter((k) => !err[k]).length
  const mostra = (k) => (mostraTutti || toccati[k] ? err[k] : undefined)
  const valido = (k) => !err[k] && String(campi[k]).trim() !== ''

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setCampi((c) => ({ ...c, [k]: k === 'codiceFiscale' ? pulisciCodiceFiscale(v) : v }))
  }
  const tocca = (k) => () => setToccati((t) => ({ ...t, [k]: true }))
  const props = (k, extra = {}) => ({
    id: `ckx-${k}`,
    name: k,
    value: campi[k],
    onChange: set(k),
    onBlur: tocca(k),
    'aria-invalid': mostra(k) ? true : undefined,
    'aria-describedby': mostra(k) ? `ckx-${k}-err` : undefined,
    required: true,
    ...extra,
  })

  // Porta al primo campo da sistemare (o al pagamento, se è tutto a posto)
  const avanti = () => {
    if (completi) {
      pagaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    setMostraTutti(true)
    const primo = CAMPI.find((k) => err[k])
    const el = document.getElementById(`ckx-${primo}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.setTimeout(() => el?.focus({ preventScroll: true }), 350)
  }

  // Dati per il gestionale, solo se il form è completo; altrimenti mostra gli errori
  const getDati = () => {
    const c = campiRef.current
    if (Object.keys(errori(c)).length) {
      setMostraTutti(true)
      return null
    }
    return {
      nome: c.nome.trim(),
      cognome: c.cognome.trim(),
      codiceFiscale: c.codiceFiscale,
      email: c.email.trim(),
      cellulare: c.cellulare.trim(),
      indirizzo: c.indirizzo.trim(),
      cap: c.cap.trim(),
      citta: c.citta.trim(),
      nazione: c.nazione.trim(),
      consensoPrivacy: c.consensoPrivacy,
    }
  }

  const pronta = statoOfferta === 'ok' && offerta?.disponibile
  const passo = completi ? 1 : 0

  // Su telefono: totale sempre in vista, e un tocco porta al primo dato mancante o al pagamento
  const dock = pronta ? (
    <div className="ckx-dock">
      <span className="ckx-dock__sum">
        <small>Totale</small>
        <b>{euro(offerta.importo)}</b>
        <s>{euro(PREZZO_PIENO)}</s>
      </span>
      <button type="button" className="ckx-dock__btn" onClick={avanti}>
        {completi ? 'Vai al pagamento' : `Completa i dati · ${fatti}/${CAMPI.length}`}
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    </div>
  ) : null

  const campo = (k) => {
    switch (k) {
      case 'nome':
        return <Campo key={k} id="ckx-nome" label="Nome" errore={mostra('nome')} valido={valido('nome')}><input {...props('nome', { autoComplete: 'given-name' })} /></Campo>
      case 'cognome':
        return <Campo key={k} id="ckx-cognome" label="Cognome" errore={mostra('cognome')} valido={valido('cognome')}><input {...props('cognome', { autoComplete: 'family-name' })} /></Campo>
      case 'codiceFiscale':
        return (
          <Campo key={k} id="ckx-codiceFiscale" label="Codice fiscale" errore={mostra('codiceFiscale')} valido={valido('codiceFiscale')} hint="16 caratteri, lo trovi sulla tessera sanitaria" className="is-wide">
            <input {...props('codiceFiscale', { autoComplete: 'off', autoCapitalize: 'characters', spellCheck: false, maxLength: 16, className: 'is-code', placeholder: 'RSSMRA80A01L219X' })} />
          </Campo>
        )
      case 'email':
        return <Campo key={k} id="ckx-email" label="Email" errore={mostra('email')} valido={valido('email')} hint="Ti mandiamo qui la conferma"><input {...props('email', { type: 'email', autoComplete: 'email', inputMode: 'email', placeholder: 'nome@email.it' })} /></Campo>
      case 'cellulare':
        return <Campo key={k} id="ckx-cellulare" label="Cellulare" errore={mostra('cellulare')} valido={valido('cellulare')} hint="Per chiamarti o scriverti su WhatsApp"><input {...props('cellulare', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '333 123 4567' })} /></Campo>
      case 'indirizzo':
        return <Campo key={k} id="ckx-indirizzo" label="Indirizzo di residenza" errore={mostra('indirizzo')} valido={valido('indirizzo')} className="is-wide"><input {...props('indirizzo', { autoComplete: 'street-address', placeholder: 'Via e numero civico' })} /></Campo>
      case 'cap':
        return <Campo key={k} id="ckx-cap" label="CAP" errore={mostra('cap')} valido={valido('cap')}><input {...props('cap', { autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 10, placeholder: '10100' })} /></Campo>
      case 'citta':
        return <Campo key={k} id="ckx-citta" label="Città" errore={mostra('citta')} valido={valido('citta')}><input {...props('citta', { autoComplete: 'address-level2', placeholder: 'Torino' })} /></Campo>
      default:
        return <Campo key={k} id="ckx-nazione" label="Nazione" errore={mostra('nazione')} valido={valido('nazione')} className="is-wide"><input {...props('nazione', { autoComplete: 'country-name' })} /></Campo>
    }
  }

  return (
    <CheckoutShell
      ambiente={offerta?.ambiente}
      dock={pronta}
      after={dock}
    >
        {statoOfferta === 'carica' ? (
          <p className="ckx-state"><Loader2 className="ckx-spin" size={22} aria-hidden="true" /> Preparo il pagamento…</p>
        ) : statoOfferta === 'errore' ? (
          <section className="ckx-state">
            <h1 className="bfx-h ckx-state__title">Non riusciamo a caricare il pagamento</h1>
            <p>Ricarica la pagina tra qualche secondo. Se il problema resta, scrivici su WhatsApp al {WHATSAPP}.</p>
          </section>
        ) : !offerta.disponibile ? (
          <section className="ckx-state">
            <h1 className="bfx-h ckx-state__title">{offerta.motivo || 'Questa offerta non è più disponibile.'}</h1>
            <p>Per qualsiasi dubbio scrivici su WhatsApp al {WHATSAPP}: ti rispondiamo noi.</p>
            <Link to="/" className="ckx-link"><ArrowLeft size={16} aria-hidden="true" /> Torna al sito</Link>
          </section>
        ) : (
          <>
            <motion.div className="ckx-intro" {...entra()}>
              <Passi passo={passo} />
              <h1 className="bfx-h ckx-title">
                Blocca le tue {VISITE} visite a <strong>metà prezzo</strong>
              </h1>
              <p className="ckx-intro__lead">
                Due minuti: i tuoi dati, poi paghi <b>{euro(offerta.importo)}</b> invece di {euro(PREZZO_PIENO)} con carta, PayPal o in 3 rate.
              </p>
            </motion.div>

            <div className="ckx-grid">
              <div className="ckx-col">
                <motion.section className="ckx-panel" aria-labelledby="ckx-step1" {...entra(0.08)}>
                  <div className="ckx-panel__head">
                    <h2 className="ckx-step" id="ckx-step1"><span>1</span> I tuoi dati</h2>
                    <span className="ckx-count" aria-live="polite">
                      <span className="ckx-count__bar"><i style={{ width: `${(fatti / CAMPI.length) * 100}%` }} /></span>
                      {fatti} di {CAMPI.length}
                    </span>
                  </div>
                  <p className="ckx-panel__lead">Servono per la fattura e per collegare l'acquisto alla tua scheda. Tutti obbligatori.</p>

                  {GRUPPI.map((g) => {
                    const Icona = g.icona
                    const ok = g.campi.every((k) => !err[k])
                    return (
                      <div key={g.id} className={`ckx-group ${ok ? 'is-ok' : ''}`} role="group" aria-labelledby={`ckx-g-${g.id}`}>
                        <p className="ckx-group__title" id={`ckx-g-${g.id}`}>
                          <span className="ckx-group__ico"><Icona size={15} aria-hidden="true" /></span>
                          {g.titolo}
                          {ok ? <Check className="ckx-group__ok" size={15} strokeWidth={3} aria-label="completo" /> : null}
                        </p>
                        <div className="ckx-fields">{g.campi.map(campo)}</div>
                      </div>
                    )
                  })}

                  <label className={`ckx-check ${mostra('consensoPrivacy') ? 'has-err' : ''} ${campi.consensoPrivacy ? 'is-on' : ''}`}>
                    <input type="checkbox" id="ckx-consensoPrivacy" checked={campi.consensoPrivacy} onChange={set('consensoPrivacy')} onBlur={tocca('consensoPrivacy')} required />
                    <span className="ckx-check__box" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                    <span>
                      Ho letto l'<a href={PRIVACY} target="_blank" rel="noopener noreferrer">informativa sulla privacy</a> e acconsento al
                      trattamento dei miei dati per gestire l'ordine.
                    </span>
                  </label>
                  {mostra('consensoPrivacy') ? <p className="ckx-field__err" role="alert">{err.consensoPrivacy}</p> : null}
                </motion.section>

                <motion.section ref={pagaRef} className={`ckx-panel ckx-panel--pay ${completi ? 'is-open' : 'is-locked'}`} aria-labelledby="ckx-step2" {...entra(0.16)}>
                  <div className="ckx-panel__head">
                    <h2 className="ckx-step" id="ckx-step2"><span>2</span> Pagamento</h2>
                    <span className="ckx-ssl"><Lock size={13} aria-hidden="true" /> Cifrato</span>
                  </div>
                  {!completi ? (
                    <button type="button" className="ckx-unlock" onClick={avanti}>
                      <span className="ckx-unlock__ico"><Lock size={18} aria-hidden="true" /></span>
                      <span className="ckx-unlock__txt">
                        <b>Mancano {CAMPI.length - fatti} {CAMPI.length - fatti === 1 ? 'dato' : 'dati'} per sbloccare il pagamento</b>
                        <small>Tocca qui: ti porto al primo da completare</small>
                      </span>
                      <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  ) : null}
                  <MetodiPagamento offerta={offerta} getDati={getDati} onFatto={fatto} disabilitato={!completi} />
                  <p className="ckx-fine">
                    <ShieldCheck size={14} aria-hidden="true" /> Pagamento cifrato e gestito da PayPal. Paghi {euro(offerta.importo)} una volta sola, niente abbonamenti.
                  </p>
                </motion.section>

                <p className="ckx-help">
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>Dubbi prima di pagare? Scrivici su WhatsApp al <b>{WHATSAPP}</b>.</span>
                </p>
              </div>

              <motion.div className="ckx-side" {...entra(0.12)}>
                <Riepilogo offerta={offerta} />
              </motion.div>
            </div>
          </>
        )}
    </CheckoutShell>
  )
}
