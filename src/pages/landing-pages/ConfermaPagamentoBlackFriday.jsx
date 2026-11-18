import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Check, CreditCard, MessageCircle } from 'lucide-react'
import CheckoutShell from '../../components/checkout/CheckoutShell'
import Passi from '../../components/checkout/Passi'
import { leggiRicevuta, segnaTracciata } from '../../components/checkout/ricevutaSalvata'
import { useSeoOfferta } from '../../components/black-friday/offerta'

// Conferma del pagamento Black Friday 2026 (/black-friday-2026/grazie). Ci porta /black-friday-2026/pagamento dopo
// un pagamento riuscito, con la ricevuta in sessionStorage (components/checkout/ricevutaSalvata.js).
// Con la ricevuta: ricevuta a scontrino e, una volta sola per ordine e solo per i pagamenti veri, le conversioni
// (Meta Purchase, Google Ads se CONVERSIONE_GOOGLE_ADS è impostata). Senza ricevuta (link diretto, altro browser,
// dopo un giorno): un ringraziamento generico, senza dati e senza conversioni.

const VISITE = 10
const WHATSAPP = '+39 351 819 8457'
const EASE = [0.16, 1, 0.3, 1]

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

const prossimiPassi = (
  <ol className="ckx-next">
    <li><span>1</span><div><b>Ti contattiamo noi</b>Nei prossimi giorni la segreteria ti chiama, oppure ti manda su WhatsApp il link per prenotarti.</div></li>
    <li><span>2</span><div><b>Fissiamo le date</b>Le visite si organizzano con il tuo osteopata, come ti consiglia.</div></li>
    <li><span>3</span><div><b>Inizi il percorso</b>Dieci visite, nei nostri studi di Via Peyron 54 e Via Lamarmora 35.</div></li>
  </ol>
)

export default function ConfermaPagamentoBlackFriday() {
  useSeoOfferta(SEO)
  const reduce = useReducedMotion()
  const [ricevuta] = useState(leggiRicevuta)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    if (ricevuta) traccia()
  }, [ricevuta])

  return (
    <CheckoutShell ambiente={ricevuta?.ambiente}>
      <Passi passo={3} className="is-center" />
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
          <Check size={40} strokeWidth={2.6} />
        </motion.span>

        {ricevuta ? (
          <>
            <p className="ckx-eyebrow">Pagamento riuscito{ricevuta.stato === 'IN_VERIFICA' ? ' · in accredito' : ''}</p>
            <h1 className="bfx-h ckx-done__title">
              Grazie {ricevuta.nome}, <strong>le tue {VISITE} visite sono bloccate.</strong>
            </h1>
            <p className="ckx-done__lead">
              Ti abbiamo mandato la conferma a <b>{ricevuta.email}</b>. Se non la trovi, guarda nello spam.
            </p>
            <div className="ckx-receipt">
              <div className="ckx-receipt__top">
                <span>Ordine</span>
                <b>n. {ricevuta.numero}</b>
              </div>
              <dl className="ckx-ledger">
                <div><dt>{ricevuta.descrizione}</dt><dd /></div>
                <div><dt>Pagamento</dt><dd>{ricevuta.metodoPagamento}{PAGATO_CON[ricevuta.pagatoCon] ? `, ${PAGATO_CON[ricevuta.pagatoCon]}` : ''}</dd></div>
                <div className="is-total"><dt>Totale pagato</dt><dd>{euro(ricevuta.importo)}</dd></div>
              </dl>
            </div>
          </>
        ) : (
          <>
            <p className="ckx-eyebrow">Black Friday · 10 visite</p>
            <h1 className="bfx-h ckx-done__title">
              Grazie, <strong>ci vediamo presto.</strong>
            </h1>
            <p className="ckx-done__lead">
              Se hai appena pagato, ti abbiamo mandato l'email di conferma con il numero dell'ordine: guarda anche nello spam.
              Per qualsiasi dubbio scrivici su WhatsApp al <b>{WHATSAPP}</b>.
            </p>
            <div className="ckx-done__actions">
              <a className="ckx-pill" href={`https://wa.me/393518198457?text=${encodeURIComponent('Ciao, ho pagato le 10 visite del Black Friday sul sito e vorrei una conferma.')}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} aria-hidden="true" /> Scrivici su WhatsApp
              </a>
              <Link className="ckx-pill is-ghost" to="/black-friday-2026/pagamento">
                <CreditCard size={16} aria-hidden="true" /> Non ho ancora pagato
              </Link>
            </div>
          </>
        )}

        {prossimiPassi}
        <Link to="/" className="ckx-link"><ArrowLeft size={16} aria-hidden="true" /> Torna al sito</Link>
      </motion.section>
    </CheckoutShell>
  )
}
