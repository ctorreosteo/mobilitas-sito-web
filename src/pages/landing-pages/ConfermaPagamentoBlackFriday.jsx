import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, CalendarHeart, Check, CreditCard, Mail, MapPin, MessageCircle, PhoneCall, Printer, Sparkles, TrainFront } from 'lucide-react'
import CheckoutShell from '../../components/checkout/CheckoutShell'
import Passi from '../../components/checkout/Passi'
import CartaBlack from '../../components/black-friday-2026-sections/CartaBlack'
import { leggiRicevuta, segnaTracciata } from '../../components/checkout/ricevutaSalvata'
import { SCADENZA, useSeoOfferta } from '../../components/black-friday/offerta'
import { STUDI } from '../../data/studi'

// Conferma del pagamento Black Friday 2026 (/black-friday-2026/grazie). Ci porta /black-friday-2026/pagamento dopo
// un pagamento riuscito, con la ricevuta in sessionStorage (components/checkout/ricevutaSalvata.js).
// Con la ricevuta: ricevuta a scontrino e, una volta sola per ordine e solo per i pagamenti veri, le conversioni
// (Meta Purchase, Google Ads se CONVERSIONE_GOOGLE_ADS è impostata). Senza ricevuta (link diretto, altro browser,
// dopo un giorno): un ringraziamento generico, senza dati e senza conversioni.

const VISITE = 10
const WHATSAPP = '+39 351 819 8457'
const EASE = [0.16, 1, 0.3, 1]
const SCADENZA_BREVE = SCADENZA.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', timeZone: 'Europe/Rome' })
const WA_LINK = (testo) => `https://wa.me/393518198457?text=${encodeURIComponent(testo)}`

// Conversione Google Ads dell'acquisto: azione «Acquisto» da creare in Google Ads (Obiettivi → Conversioni), poi
// incollare qui l'etichetta, es. 'AW-16532564533/AbCdEfGhIjKlMnOp'. Finché è vuota la conversione non parte.
const CONVERSIONE_GOOGLE_ADS = ''

const PAGATO_CON = { CARTA: 'con carta', PAYPAL: 'con il conto', PAYPAL_RATE: 'in 3 rate' }
const euro = (n) => `${Number(n).toLocaleString('it-IT', { minimumFractionDigits: Number.isInteger(Number(n)) ? 0 : 2 })}€`

const SEO = {
  path: '/black-friday-2026/grazie',
  title: 'Pagamento riuscito · Black Friday Mobilitas',
  description: 'Le tue 10 visite del Black Friday Mobilitas sono confermate.',
  ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_02_orizzontale.jpg',
  ogImageAlt: 'Trattamento osteopatico nello studio Mobilitas di Torino',
}

function traccia() {
  // Si rilegge dal browser: se le conversioni sono già partite per questo ordine (anche un istante prima), niente
  const r = leggiRicevuta()
  if (!r || r.tracciata || r.ambiente !== 'LIVE' || typeof window === 'undefined') return
  segnaTracciata()
  const valore = Number(r.importo)
  const id = `ordine-${r.numero}`
  if (window.fbq) {
    window.fbq('track', 'Purchase', { value: valore, currency: 'EUR', content_name: 'Black Friday 2026 10 visite' }, { eventID: id })
  }
  if (CONVERSIONE_GOOGLE_ADS && window.gtag) {
    window.gtag('event', 'conversion', { send_to: CONVERSIONE_GOOGLE_ADS, value: valore, currency: 'EUR', transaction_id: id })
  }
}

const PASSI = [
  { icona: PhoneCall, titolo: 'Ti contattiamo noi', testo: 'Nei prossimi giorni la segreteria ti chiama, oppure ti manda su WhatsApp il link per prenotarti.' },
  { icona: CalendarHeart, titolo: 'Fissiamo le date', testo: 'Le visite si organizzano con il tuo osteopata, come ti consiglia in base a come stai.' },
  { icona: Sparkles, titolo: 'Inizi il percorso', testo: `Dieci visite in uno dei nostri due studi a Torino, quello più comodo per te.` },
]

const dataOra = (iso) =>
  iso ? new Date(iso).toLocaleString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : null

// Coriandoli nei colori di marca: una volta sola all'arrivo, mai con «riduci movimento»
function Coriandoli() {
  const pezzi = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        x: (i * 37) % 100,
        dx: ((i * 53) % 60) - 30,
        r: (i * 97) % 720,
        d: 0.1 + ((i * 13) % 10) / 14,
        t: 2.2 + ((i * 7) % 10) / 6,
        c: ['#72fa93', '#f4f4f4', '#38bdf8', '#72fa93', '#ffffff'][i % 5],
        f: i % 3,
      })),
    [],
  )
  return (
    <div className="ckx-ok-confetti" aria-hidden="true">
      {pezzi.map((p, i) => (
        <i
          key={i}
          data-f={p.f}
          style={{ left: `${p.x}%`, background: p.c, '--dx': `${p.dx}vw`, '--r': `${p.r}deg`, animationDelay: `${p.d}s`, animationDuration: `${p.t}s` }}
        />
      ))}
    </div>
  )
}

function Scontrino({ r }) {
  return (
    <div className="ckx-ok-ticket" role="group" aria-label={`Ricevuta dell'ordine ${r.numero}`}>
      <div className="ckx-ok-ticket__head">
        <img src="/pittogramma.png" alt="" />
        <span>
          <small>Ricevuta</small>
          Studio Mobilitas
        </span>
        <b className="ckx-ok-ticket__paid"><Check size={13} strokeWidth={3} /> Pagato</b>
      </div>
      <div className="ckx-ok-ticket__num">
        <small>Ordine</small>
        <b>n. {r.numero}</b>
      </div>
      <dl className="ckx-ok-ticket__rows">
        <div><dt>Cosa</dt><dd>{r.descrizione}</dd></div>
        <div><dt>Intestato a</dt><dd>{r.nome}</dd></div>
        {r.pagatoIl ? <div><dt>Pagato il</dt><dd>{dataOra(r.pagatoIl)}</dd></div> : null}
        <div><dt>Pagamento</dt><dd>{r.metodoPagamento}{PAGATO_CON[r.pagatoCon] ? `, ${PAGATO_CON[r.pagatoCon]}` : ''}</dd></div>
      </dl>
      <div className="ckx-ok-ticket__cut" aria-hidden="true" />
      <div className="ckx-ok-ticket__total">
        <span>Totale pagato</span>
        <b>{euro(r.importo)}</b>
      </div>
      <div className="ckx-ok-ticket__foot">
        <span className="ckx-ok-barcode" aria-hidden="true" />
        <small><Mail size={12} aria-hidden="true" /> Copia inviata a {r.email}</small>
      </div>
    </div>
  )
}

function Percorso() {
  return (
    <section className="ckx-ok-path" aria-labelledby="ckx-ok-path-t">
      <p className="ckx-eyebrow" id="ckx-ok-path-t">Cosa succede ora</p>
      <ol>
        {PASSI.map((p, i) => {
          const Icona = p.icona
          return (
            <motion.li key={p.titolo} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}>
              <span className="ckx-ok-path__ico"><Icona size={20} aria-hidden="true" /><em>{i + 1}</em></span>
              <b>{p.titolo}</b>
              <span>{p.testo}</span>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}

function Studi() {
  return (
    <section className="ckx-ok-studi" aria-labelledby="ckx-ok-studi-t">
      <p className="ckx-eyebrow" id="ckx-ok-studi-t">I nostri studi a Torino</p>
      <div className="ckx-ok-studi__grid">
        {STUDI.map((s) => (
          <a key={s.id} className="ckx-ok-studio" href={s.indicazioniUrl} target="_blank" rel="noopener noreferrer">
            <span className="ckx-ok-studio__ico"><MapPin size={18} aria-hidden="true" /></span>
            <span className="ckx-ok-studio__txt">
              <b>{s.nome}</b>
              <small>{s.quartiere}</small>
              {s.comeArrivare?.find((c) => c.tipo === 'metro') ? (
                <small className="ckx-ok-studio__metro"><TrainFront size={13} aria-hidden="true" /> {s.comeArrivare.find((c) => c.tipo === 'metro').testo}</small>
              ) : null}
            </span>
            <span className="ckx-ok-studio__go">Indicazioni <ArrowUpRight size={14} aria-hidden="true" /></span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default function ConfermaPagamentoBlackFriday() {
  useSeoOfferta(SEO)
  const reduce = useReducedMotion()
  const [ricevuta] = useState(leggiRicevuta)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    if (ricevuta) traccia()
  }, [ricevuta])

  const entra = (delay = 0) => (reduce ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE, delay } })

  return (
    <CheckoutShell ambiente={ricevuta?.ambiente}>
      <section className={`ckx-ok ${ricevuta ? 'is-paid' : ''}`}>
        {ricevuta && !reduce ? <Coriandoli /> : null}

        <motion.div className="ckx-ok-hero" {...entra()}>
          <Passi passo={3} className="is-center" />
          <span className="ckx-ok-badge" aria-hidden="true">
            <i /><i /><i />
            <motion.span
              initial={reduce ? false : { scale: 0.3, rotate: -40, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.9, bounce: 0.45, delay: 0.2 }}
            >
              <Check size={44} strokeWidth={2.8} />
            </motion.span>
          </span>
          {ricevuta ? (
            <>
              <p className="ckx-eyebrow">Pagamento riuscito{ricevuta.stato === 'IN_VERIFICA' ? ' · in accredito' : ''}</p>
              <h1 className="bfx-h ckx-ok-title">
                Grazie {ricevuta.nome},<br /><strong>le tue {VISITE} visite sono bloccate.</strong>
              </h1>
              <p className="ckx-ok-lead">
                Ti abbiamo mandato la conferma a <span className="ckx-ok-mail"><Mail size={15} aria-hidden="true" /> {ricevuta.email}</span>
                <br />Se non la trovi, guarda nello spam.
              </p>
            </>
          ) : (
            <>
              <p className="ckx-eyebrow">Black Friday · {VISITE} visite</p>
              <h1 className="bfx-h ckx-ok-title">
                Grazie,<br /><strong>ci vediamo presto.</strong>
              </h1>
              <p className="ckx-ok-lead">
                Se hai appena pagato, ti abbiamo mandato l'email di conferma con il numero dell'ordine: guarda anche nello spam.
              </p>
            </>
          )}
        </motion.div>

        {ricevuta ? (
          <motion.div className="ckx-ok-grid" {...entra(0.2)}>
            <div className="ckx-ok-pass">
              <div className="ckx-ok-pass__card">
                <CartaBlack visite={VISITE} prezzo={ricevuta.importo} prezzoPieno={900} scadenzaBreve={SCADENZA_BREVE} />
                <span className="ckx-ok-stamp" aria-hidden="true">Pagata</span>
              </div>
              <p className="ckx-ok-pass__cap">
                <b>La tua carta Black Friday è attiva.</b> {VISITE} visite con il tuo osteopata, al prezzo bloccato.
              </p>
              <div className="ckx-ok-actions">
                <button type="button" className="ckx-pill is-ghost" onClick={() => window.print()}>
                  <Printer size={16} aria-hidden="true" /> Stampa la ricevuta
                </button>
                <a className="ckx-pill" href={WA_LINK(`Ciao, ho appena pagato le ${VISITE} visite del Black Friday (ordine n. ${ricevuta.numero}).`)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} aria-hidden="true" /> Scrivici su WhatsApp
                </a>
              </div>
            </div>
            <Scontrino r={ricevuta} />
          </motion.div>
        ) : (
          <motion.div className="ckx-done__actions" {...entra(0.2)}>
            <a className="ckx-pill" href={WA_LINK(`Ciao, ho pagato le ${VISITE} visite del Black Friday sul sito e vorrei una conferma.`)} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} aria-hidden="true" /> Scrivici su WhatsApp
            </a>
            <Link className="ckx-pill is-ghost" to="/black-friday-2026/pagamento">
              <CreditCard size={16} aria-hidden="true" /> Non ho ancora pagato
            </Link>
          </motion.div>
        )}

        <Percorso />
        <Studi />

        <p className="ckx-ok-help">
          Dubbi? Scrivici su WhatsApp al <b>{WHATSAPP}</b>
          <span aria-hidden="true">·</span>
          <Link to="/" className="ckx-link"><ArrowLeft size={15} aria-hidden="true" /> Torna al sito</Link>
        </p>
      </section>
    </CheckoutShell>
  )
}
