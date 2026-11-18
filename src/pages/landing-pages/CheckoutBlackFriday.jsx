import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, CalendarCheck, Check, FlaskConical, Loader2, Lock, Mail, Phone, ShieldCheck } from 'lucide-react'
import CartaBlack from '../../components/black-friday-2026-sections/CartaBlack'
import { Countdown } from '../../components/black-friday-2026-sections/BfxKit'
import { PREZZO_VISITA, SCADENZA, useSeoOfferta } from '../../components/black-friday/offerta'
import MetodiPagamento from '../../components/checkout/MetodiPagamento'
import { leggiOfferta } from '../../components/checkout/checkoutApi'
import { errori, pulisciCodiceFiscale } from '../../components/checkout/validazione'
import '../../styles/pages/black-friday-2026.css'
import '../../styles/pages/checkout.css'

// Pagina di pagamento del Black Friday 2026 (/black-friday-2026/pagamento): ci portano tutti i bottoni di
// /black-friday-2026. Dati di fatturazione tutti obbligatori, poi carta, PayPal o PayPal in 3 rate (PayPal).
// Prezzo, scadenza e disponibilità li decide il gestionale (offerta BLACK_FRIDAY_2026): qui si mostrano soltanto.
// A pagamento riuscito il gestionale crea l'ordine (pagina Ordini online), lo collega al paziente col codice
// fiscale e manda l'email di conferma. Dal gestionale locale non si paga mai davvero: pagamento simulato, oppure
// la sandbox di PayPal se il gestionale locale ha le credenziali sandbox. Specifica: docs/integrazioni.md.
// Stile: styles/pages/checkout.css (prefisso ckx-), sopra i colori e i pezzi di black-friday-2026.css (bfx-).

const OFFERTA = 'BLACK_FRIDAY_2026'
const VISITE = 10
const PREZZO_PIENO = 900
const PRIVACY = 'https://www.iubenda.com/privacy-policy/67925714'
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

const euro = (n) => `${Number(n).toLocaleString('it-IT', { minimumFractionDigits: Number.isInteger(Number(n)) ? 0 : 2 })}€`

// Il metodo è sempre PayPal; qui come ha pagato su PayPal
const PAGATO_CON = { CARTA: 'con carta', PAYPAL: 'con il conto', PAYPAL_RATE: 'in 3 rate' }

function Campo({ id, label, errore, hint, className = '', children }) {
  return (
    <div className={`ckx-field ${errore ? 'has-err' : ''} ${className}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {errore ? (
        <p className="ckx-field__err" id={`${id}-err`} role="alert">{errore}</p>
      ) : hint ? (
        <p className="ckx-field__hint" id={`${id}-hint`}>{hint}</p>
      ) : null}
    </div>
  )
}

// Riepilogo dell'ordine: la carta Black Friday, il conto e le garanzie
function Riepilogo({ offerta, compatto }) {
  const importo = offerta?.importo ?? 450
  return (
    <aside className={`ckx-sum ${compatto ? 'is-compact' : ''}`} aria-label="Riepilogo dell'ordine">
      {!compatto ? (
        <div className="ckx-sum__card">
          <CartaBlack visite={VISITE} prezzo={importo} prezzoPieno={PREZZO_PIENO} scadenzaBreve={SCADENZA_BREVE} />
        </div>
      ) : null}
      <p className="ckx-eyebrow">Il tuo ordine</p>
      <h2 className="ckx-sum__title">{offerta?.nome ?? `Percorso ${VISITE} visite · Black Friday 2026`}</h2>
      <dl className="ckx-ledger">
        <div><dt>{VISITE} visite osteopatiche</dt><dd><s>{euro(PREZZO_PIENO)}</s></dd></div>
        <div className="is-save"><dt>Sconto Black Friday</dt><dd>−{euro(PREZZO_PIENO - importo)}</dd></div>
        <div className="is-total"><dt>Totale</dt><dd>{euro(importo)}</dd></div>
      </dl>
      <p className="ckx-sum__unit">
        {euro(importo / VISITE)} a visita invece di {euro(PREZZO_VISITA)}
      </p>
      {!compatto ? (
        <>
          <Countdown className="ckx-sum__count" etichetta="L'offerta finisce tra" />
          <ul className="ckx-trust">
            <li><ShieldCheck size={18} aria-hidden="true" /> Pagamento protetto da PayPal: i dati della carta non passano da noi</li>
            <li><Mail size={18} aria-hidden="true" /> Email di conferma appena hai pagato</li>
            <li><CalendarCheck size={18} aria-hidden="true" /> La segreteria ti chiama, o ti manda su WhatsApp il link per prenotare le visite</li>
          </ul>
        </>
      ) : null}
    </aside>
  )
}

function Ricevuta({ ricevuta }) {
  const reduce = useReducedMotion()
  return (
    <motion.section
      className="ckx-done"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      aria-live="polite"
    >
      <motion.span
        className="ckx-done__check"
        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.7, bounce: 0.35, delay: 0.15 }}
        aria-hidden="true"
      >
        <Check size={38} strokeWidth={2.6} />
      </motion.span>
      <p className="ckx-eyebrow">Pagamento riuscito{ricevuta.stato === 'IN_VERIFICA' ? ' · in accredito' : ''}</p>
      <h1 className="bfx-h ckx-done__title">
        Grazie {ricevuta.nome}, <strong>le tue {VISITE} visite sono bloccate.</strong>
      </h1>
      <p className="ckx-done__lead">
        Ti abbiamo mandato la conferma a <b>{ricevuta.email}</b>. Se non la trovi, guarda nello spam.
      </p>
      <dl className="ckx-ledger ckx-done__ledger">
        <div><dt>Ordine</dt><dd>n. {ricevuta.numero}</dd></div>
        <div><dt>Pagamento</dt><dd>{ricevuta.metodoPagamento}{PAGATO_CON[ricevuta.pagatoCon] ? `, ${PAGATO_CON[ricevuta.pagatoCon]}` : ''}</dd></div>
        <div className="is-total"><dt>Totale pagato</dt><dd>{euro(ricevuta.importo)}</dd></div>
      </dl>
      <ol className="ckx-next">
        <li><span>1</span><div><b>Ti contattiamo noi</b>Nei prossimi giorni la segreteria ti chiama, oppure ti manda su WhatsApp il link per prenotarti.</div></li>
        <li><span>2</span><div><b>Fissiamo le date</b>Le visite si organizzano con il tuo osteopata, come ti consiglia.</div></li>
        <li><span>3</span><div><b>Inizi il percorso</b>Dieci visite, nei nostri studi di Via Peyron 54 e Via Lamarmora 35.</div></li>
      </ol>
      <Link to="/" className="ckx-link"><ArrowLeft size={16} aria-hidden="true" /> Torna al sito</Link>
    </motion.section>
  )
}

export default function CheckoutBlackFriday() {
  useSeoOfferta(SEO)
  const [offerta, setOfferta] = useState(null)
  const [statoOfferta, setStatoOfferta] = useState('carica') // carica | ok | errore
  const [campi, setCampi] = useState(VUOTO)
  const [toccati, setToccati] = useState({})
  const [mostraTutti, setMostraTutti] = useState(false)
  const [ricevuta, setRicevuta] = useState(null)
  const campiRef = useRef(campi)
  campiRef.current = campi

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

  useEffect(() => {
    if (ricevuta) window.scrollTo({ top: 0, behavior: 'smooth' })
    // Acquisto nel Meta Pixel solo per i pagamenti veri
    if (ricevuta && ricevuta.ambiente === 'LIVE' && typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', { value: Number(ricevuta.importo), currency: 'EUR', content_name: 'Black Friday 2026 10 visite' })
    }
  }, [ricevuta])

  const err = useMemo(() => errori(campi), [campi])
  const completi = Object.keys(err).length === 0
  const mostra = (k) => (mostraTutti || toccati[k] ? err[k] : undefined)

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

  const prova = offerta && offerta.ambiente !== 'LIVE'

  return (
    <div className="bfx ckx">
      <header className="ckx-top">
        <div className="ckx-wrap ckx-top__in">
          <Link to="/black-friday-2026" className="ckx-link"><ArrowLeft size={16} aria-hidden="true" /> Torna all'offerta</Link>
          <span className="ckx-brand">Studio Mobilitas</span>
          <span className="ckx-secure"><Lock size={14} aria-hidden="true" /> Pagamento sicuro</span>
        </div>
      </header>

      {prova ? (
        <div className="ckx-test" role="note">
          <FlaskConical size={16} aria-hidden="true" />
          {offerta.ambiente === 'SANDBOX'
            ? 'Ambiente di prova PayPal (sandbox): usa le carte e i conti di prova, nessun pagamento è reale.'
            : 'Pagamento simulato dal gestionale locale: nessun pagamento è reale.'}
        </div>
      ) : null}

      <main className="ckx-wrap ckx-main">
        {ricevuta ? (
          <Ricevuta ricevuta={ricevuta} />
        ) : statoOfferta === 'carica' ? (
          <p className="ckx-state"><Loader2 className="ckx-spin" size={22} aria-hidden="true" /> Preparo il pagamento…</p>
        ) : statoOfferta === 'errore' ? (
          <section className="ckx-state">
            <h1 className="bfx-h ckx-state__title">Non riusciamo a caricare il pagamento</h1>
            <p>Ricarica la pagina tra qualche secondo. Se il problema resta, scrivici su WhatsApp al +39 351 819 8457.</p>
          </section>
        ) : !offerta.disponibile ? (
          <section className="ckx-state">
            <h1 className="bfx-h ckx-state__title">{offerta.motivo || 'Questa offerta non è più disponibile.'}</h1>
            <p>Per qualsiasi dubbio scrivici su WhatsApp al +39 351 819 8457: ti rispondiamo noi.</p>
            <Link to="/" className="ckx-link"><ArrowLeft size={16} aria-hidden="true" /> Torna al sito</Link>
          </section>
        ) : (
          <div className="ckx-grid">
            <div className="ckx-col">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
                <p className="ckx-eyebrow">Black Friday · ultimo passo</p>
                <h1 className="bfx-h ckx-title">
                  Blocca le tue {VISITE} visite a <strong>metà prezzo</strong>
                </h1>
              </motion.div>

              <div className="ckx-mobile-sum">
                <Riepilogo offerta={offerta} compatto />
              </div>

              <section className="ckx-panel" aria-labelledby="ckx-step1">
                <h2 className="ckx-step" id="ckx-step1"><span>1</span> I tuoi dati</h2>
                <p className="ckx-panel__lead">Servono per la fattura e per collegare l'acquisto alla tua scheda. Tutti i campi sono obbligatori.</p>
                <div className="ckx-fields">
                  <Campo id="ckx-nome" label="Nome" errore={mostra('nome')}>
                    <input {...props('nome', { autoComplete: 'given-name' })} />
                  </Campo>
                  <Campo id="ckx-cognome" label="Cognome" errore={mostra('cognome')}>
                    <input {...props('cognome', { autoComplete: 'family-name' })} />
                  </Campo>
                  <Campo id="ckx-codiceFiscale" label="Codice fiscale" errore={mostra('codiceFiscale')} hint="16 caratteri, lo trovi sulla tessera sanitaria" className="is-wide">
                    <input {...props('codiceFiscale', { autoComplete: 'off', autoCapitalize: 'characters', spellCheck: false, maxLength: 16, className: 'is-mono' })} />
                  </Campo>
                  <Campo id="ckx-email" label="Email" errore={mostra('email')} hint="Ti mandiamo qui la conferma">
                    <input {...props('email', { type: 'email', autoComplete: 'email', inputMode: 'email' })} />
                  </Campo>
                  <Campo id="ckx-cellulare" label="Cellulare" errore={mostra('cellulare')} hint="Qui la segreteria ti chiama o ti scrive su WhatsApp">
                    <input {...props('cellulare', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '333 123 4567' })} />
                  </Campo>
                  <Campo id="ckx-indirizzo" label="Indirizzo di residenza" errore={mostra('indirizzo')} className="is-wide">
                    <input {...props('indirizzo', { autoComplete: 'street-address', placeholder: 'Via e numero civico' })} />
                  </Campo>
                  <Campo id="ckx-cap" label="CAP" errore={mostra('cap')}>
                    <input {...props('cap', { autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 10 })} />
                  </Campo>
                  <Campo id="ckx-citta" label="Città" errore={mostra('citta')}>
                    <input {...props('citta', { autoComplete: 'address-level2' })} />
                  </Campo>
                  <Campo id="ckx-nazione" label="Nazione" errore={mostra('nazione')} className="is-wide">
                    <input {...props('nazione', { autoComplete: 'country-name' })} />
                  </Campo>
                </div>
                <label className={`ckx-check ${mostra('consensoPrivacy') ? 'has-err' : ''}`}>
                  <input
                    type="checkbox"
                    checked={campi.consensoPrivacy}
                    onChange={set('consensoPrivacy')}
                    onBlur={tocca('consensoPrivacy')}
                    required
                  />
                  <span className="ckx-check__box" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                  <span>
                    Ho letto l'
                    <a href={PRIVACY} target="_blank" rel="noopener noreferrer">informativa sulla privacy</a>
                    {' '}e acconsento al trattamento dei miei dati per gestire l'ordine.
                  </span>
                </label>
                {mostra('consensoPrivacy') ? <p className="ckx-field__err" role="alert">{err.consensoPrivacy}</p> : null}
              </section>

              <section className={`ckx-panel ${completi ? '' : 'is-locked'}`} aria-labelledby="ckx-step2">
                <h2 className="ckx-step" id="ckx-step2"><span>2</span> Pagamento</h2>
                {!completi ? (
                  <button type="button" className="ckx-unlock" onClick={() => setMostraTutti(true)}>
                    <Lock size={16} aria-hidden="true" />
                    Completa i tuoi dati qui sopra per pagare
                  </button>
                ) : null}
                <MetodiPagamento offerta={offerta} getDati={getDati} onFatto={setRicevuta} disabilitato={!completi} />
                <p className="ckx-fine">
                  <Lock size={13} aria-hidden="true" /> Pagamento cifrato e gestito da PayPal. Paghi {euro(offerta.importo)} una volta sola, niente abbonamenti.
                </p>
              </section>

              <p className="ckx-help">
                <Phone size={15} aria-hidden="true" />
                <span>Dubbi prima di pagare? Scrivici su WhatsApp al <b>+39 351 819 8457</b>.</span>
              </p>
            </div>

            <div className="ckx-side">
              <Riepilogo offerta={offerta} />
            </div>
          </div>
        )}
      </main>

      <footer className="ckx-foot">
        <div className="ckx-wrap">
          Studio Mobilitas · Via Peyron 54 e Via Lamarmora 35, Torino ·{' '}
          <a href={PRIVACY} target="_blank" rel="noopener noreferrer">Privacy</a>
        </div>
      </footer>
    </div>
  )
}
