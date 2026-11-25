import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlarmClock, ArrowRight, Gift, Infinity as Infinito, MessageCircle, Plus, Repeat, UserRoundCheck } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import ClImg from '../../components/condition-landing/ClImg'
import { HeroMedia } from '../../components/condition-landing/Hero'
import { prefetchHeroVideo, useHeroVideo } from '../../components/condition-landing/heroVideo'
import { FOTO_STUDIO, creaSceltaFoto } from '../../data/fotoTrattamenti'
import { PREZZO_VISITA, SCADENZA, SCADENZA_TESTO, due, useMancano, useSeoOfferta } from '../../components/black-friday/offerta'
import CartaBlack from '../../components/black-friday-2026-sections/CartaBlack'
import { BannerPrezzo, CaroselloBenefici, Countdown, GraficoRicadute, TempoPerTe, TuttoLAnno } from '../../components/black-friday-2026-sections/BfxKit'
import '../../styles/pages/condition-landing.css'
import '../../styles/pages/cervicalgia.css'
import '../../components/landing/prima-visita-landing.css'
import '../../styles/pages/black-friday-2026.css'

// Landing /black-friday-2026: offerta Black Friday per chi è già paziente. Ci si arriva da quattro ads Meta con
// copioni diversi (il corpo che impara a stare teso; «perché lo facciamo»; «se oggi stai bene» e il tagliando della
// macchina; «rimandi sempre» e la macchia sul vestito): i testi sono generici e riprendono i temi di tutti, senza
// seguirne uno solo. Se cambia o si aggiunge un copione, ricontrollare apertura e «Cosa ottieni».
// Tolti il 19/11/2026: la sezione «Perché lo facciamo» e il disegno 5 + 5 (le carte «li paghi / in omaggio»).
// Struttura dal 19/11/2026 (decisa da Riccardo): apertura · l'offerta (biglietto nero del prezzo, senza la carta che è
// già nell'apertura, poi la spiegazione
// in un pannello chiaro: quattro regole e tre passi) · i benefici (tre schede) · le FAQ. Dal 19/11/2026 (sempre Riccardo)
// i benefici vengono prima dell'offerta: apertura · benefici · offerta · FAQ. Tolte «Perché dieci» (schede
// «Ti riconosci?»), «Cosa cambia» (confronto), «Come funziona» come sezione a sé (ora è nell'offerta) e «Lo stesso metodo».
// Generica anche nei dolori: tutti, nessuno specifico. Solo l'offerta 10 trattamenti a 450€, da pagare online, con scadenza.
// "Porta un amico" non è più qui (strategia del 16/11/2026): i pazienti ricevono un messaggio con il link personale
// da mandare all'amico, che arriva sull'invito /black-friday-2026-amico.
// Grafica propria (redesign del 16/11/2026, apertura rifatta il 17/11/2026): notte blu; nell'apertura la carta Black
// Friday in 3D (nera, olografica, con il 10 in rilievo) posata sulla foto del trattamento.
// Stile in styles/pages/black-friday-2026.css (prefisso bfx-), pezzi grafici in components/black-friday-2026-sections.
// Dati comuni con /black-friday-2026-amico (scadenza, prezzi, SEO): components/black-friday/offerta.js.
// Revisione del 18/11/2026: niente commerciale, si paga subito online, quindi la pagina deve dire tutto quello che
// serve per decidere (cosa comprende, durata delle sedute, i trattamenti non scadono, sono personali, come si paga, fattura,
// cosa succede dopo): sta nella sezione «Prima di pagare». I numeri dell'offerta si dicono per esteso una volta sola,
// nel banner del prezzo; altrove la pagina parla dei benefici, legati alle leve delle ads (schede «Ti riconosci?»).
// Si paga sul nostro sito, poi si prenota quando si vuole (dal 19/11/2026: ti contattiamo noi, oppure scrivi tu su WhatsApp): i trattamenti non scadono.
// Niente sezione «Dove siamo» con le mappe: sono già pazienti, sanno dove siamo (tolta il 18/11/2026).
// Dal 19/11/2026 nei testi si parla di «trattamenti», mai di «visite» (anche nelle grafiche); nel codice i nomi
// (VISITE, PREZZO_VISITA…) sono rimasti quelli di prima.

const SLUG = 'black-friday-2026'

// ——— Offerta (se cambia, cambia anche nei testi e nella SEO di questa pagina) ———
const VISITE = 10
const PREZZO_PIENO = 900
const PREZZO_OFFERTA = 450
// Prezzo del singolo trattamento e scadenza: components/black-friday/offerta.js
// Scadenza stampata sulla carta dell'apertura, «29/11»: dalla stessa data di offerta.js
const SCADENZA_BREVE = SCADENZA.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', timeZone: 'Europe/Rome' })

// ——— Pagamento online ———
// Tutti i bottoni della pagina (apertura, sezioni, barra in basso su telefono) portano alla pagina di pagamento
// /black-friday-2026/pagamento (CheckoutBlackFriday.jsx): dati di fatturazione, poi carta, PayPal o PayPal in 3 rate.
// Sulla landing le 3 rate non si nominano (richiesta di Riccardo del 19/11/2026): si dice solo «online, sul nostro sito».
const PAGINA_PAGAMENTO = '/black-friday-2026/pagamento'

// Dopo il pagamento si prenota subito: in autonomia, oppure chiamando la segreteria (numero del sito, come nel menu)
const TELEFONO = { href: 'tel:+393518198457', testo: '351 819 8457' }
const WHATSAPP = { href: 'https://wa.me/393518198457?text=' + encodeURIComponent('Ciao, ho una domanda sui 10 trattamenti del Black Friday.') }
// Al tocco del bottone: una pioggia di coriandoli verdi parte dal bottone, una vibrazione leggera (Android) e dopo un
// attimo si va al pagamento. Con «riduci movimento» si va subito, senza festa.
const vaiLento = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function coriandoli(x, y) {
  const colori = ['#72fa93', '#f4f4f4', '#c9ffd8', '#2fbf63', '#b4ffc7']
  for (let i = 0; i < 52; i++) {
    const el = document.createElement('i')
    el.className = 'bfx-coriandolo'
    el.setAttribute('aria-hidden', 'true')
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.background = colori[i % colori.length]
    el.style.width = `${6 + Math.random() * 7}px`
    el.style.height = `${9 + Math.random() * 9}px`
    if (i % 4 === 0) el.style.borderRadius = '50%'
    document.body.appendChild(el)
    const ang = Math.random() * Math.PI * 2
    const dist = 90 + Math.random() * 200
    const dx = Math.cos(ang) * dist
    const dy = Math.sin(ang) * dist * 0.75 - 70
    const giro = (Math.random() - 0.5) * 900
    const anim = el.animate(
      [
        { transform: 'translate(-50%, -50%) rotate(0deg) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${giro * 0.6}deg) scale(1)`, opacity: 1, offset: 0.45 },
        { transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy + 160}px)) rotate(${giro}deg) scale(0.5)`, opacity: 0 },
      ],
      { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    )
    anim.onfinish = () => el.remove()
  }
}

const usePagaOnline = () => {
  const navigate = useNavigate()
  const inCorsa = useRef(false)
  return (e) => {
    if (inCorsa.current) return
    if (!vaiLento() || !e?.currentTarget) {
      navigate(PAGINA_PAGAMENTO)
      return
    }
    inCorsa.current = true
    const r = e.currentTarget.getBoundingClientRect()
    coriandoli(r.left + r.width / 2, r.top + r.height / 2)
    navigator.vibrate?.(14)
    setTimeout(() => navigate(PAGINA_PAGAMENTO), 480)
  }
}

// Bottone «magnetico» (solo mouse): si sposta un poco verso il puntatore e torna a posto quando esci
const calamita = {
  onPointerMove: (e) => {
    if (e.pointerType !== 'mouse' || !vaiLento()) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    el.style.translate = `${dx * 7}px ${dy * 5}px`
  },
  onPointerLeave: (e) => {
    e.currentTarget.style.translate = ''
  },
}

// Video dell'apertura dal gestionale (codice stabile, non l'UID Cloudflare). Finché non c'è, l'apertura mostra la foto.
// Con audio come l'ad: parte muto e la pillola «Tocca per ascoltare» lo fa ripartire con l'audio.
const heroVideo = prefetchHeroVideo('BLACK_FRIDAY_VSL')

const IMMAGINI = {
  hero: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
}

// La valutazione in piedi, come nelle landing della prima visita
const FOTO_VALUTAZIONE = '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale'

// ——— Contenuti ———

// Cosa ottieni con i 10 trattamenti (non chiamarlo «pacchetto»): i tre benefici scelti da Riccardo il 19/11/2026, in un
// carosello stile «scegli il personaggio» (BfxKit → CaroselloBenefici), dal 19/11/2026 al posto delle tre schede grandi.
// Testi corti. Problema (il dolore che torna) · Prevenzione (tutto l'anno, a un prezzo accessibile; mai «uno al mese»:
// i trattamenti si fanno quando si vuole) · Il tuo tempo (staccare dallo stress; «coccola» è solo il nome interno del
// marketing, sulla pagina non si usa). Solo colori del brand (blu notte, verde, panna), ma ogni carta ha il suo mondo:
// blu con il grafico · verde con le stagioni e il prezzo · notte profonda con luna e le notifiche (lavoro, famiglia,
// email) che si spengono con «Non disturbare».
const BENEFICI = [
  {
    id: 'problema',
    tema: 'is-main',
    tag: 'Il tuo problema',
    titolo: 'Non aspettare che il dolore torni',
    testo: (
      <>
        Lavori sulla causa con continuità, invece di <strong>ripartire da capo</strong> ogni volta che il dolore torna.
      </>
    ),
    visual: <GraficoRicadute />,
  },
  {
    id: 'prevenzione',
    tema: 'is-green',
    tag: 'La prevenzione',
    titolo: 'Il tagliando del tuo corpo',
    testo: (
      <>
        Non aspetti il guasto: ti prendi cura di te <strong>in ogni stagione</strong>, non solo quando qualcosa fa male. E
        a metà del prezzo di sempre.
      </>
    ),
    visual: (
      <>
        <TuttoLAnno />
        <p className="bfx-sel__price">
          <b>{PREZZO_OFFERTA / VISITE}€</b>
          <s>{PREZZO_VISITA}€</s>
          <span>a trattamento, tutto l’anno</span>
        </p>
      </>
    ),
  },
  {
    id: 'tempo',
    tema: 'is-ink',
    tag: 'Il tuo tempo',
    titolo: 'Per una volta, la priorità sei tu',
    testo: (
      <>
        Niente lavoro, niente telefono, niente da gestire: un momento in cui l’unica cosa da fare è{' '}
        <strong>pensare a te</strong>.
      </>
    ),
    visual: (attiva) => <TempoPerTe attiva={attiva} />,
    decoro: (
      <span className="bfx-sel__sky" aria-hidden="true">
        <i className="bfx-sel__moon" />
      </span>
    ),
  },
]

// Come funziona: tre passi in fila (nel pannello chiaro della sezione dell'offerta), la prenotazione è nel secondo
const PASSI_OFFERTA = [
  { title: 'Paghi sul nostro sito', body: 'Due minuti, con carta o PayPal. L’email di conferma arriva subito.' },
  {
    title: 'Prenoti in tutta comodità',
    body: (
      <>
        Ti contattiamo noi per fissare i trattamenti, oppure scrivici tu al{' '}
        <a className="bfx-steps__tel" href={WHATSAPP.href} target="_blank" rel="noopener noreferrer">
          {TELEFONO.testo}
        </a>
        . Li prenoti quando ti è più comodo e con la frequenza che desideri.
      </>
    ),
  },
  {
    title: 'Inizi il tuo percorso',
    body: 'Al primo incontro il tuo osteopata fa il punto su come stai e costruisce con te un piano su misura: per lavorare su un fastidio, per prevenire o semplicemente per stare meglio. Con 10 trattamenti hai il tempo di prenderti cura di te con continuità.',
  },
]

// L'offerta spiegata (sotto il biglietto): le quattro cose da sapere prima di pagare, confermate da Riccardo il
// 19/11/2026. Il tuo osteopata se vuoi, oppure uno nuovo (anche nelle FAQ) · frequenza libera · nessuna scadenza ·
// l'unica data è quella del pagamento.
const REGOLE = [
  {
    Icona: UserRoundCheck,
    t: 'Con il tuo osteopata, se vuoi',
    b: 'Chi ti segue già conosce la tua storia: riparti da lì, non da zero. Se preferisci, puoi sceglierne un altro.',
  },
  { Icona: Repeat, t: 'Con la frequenza che desideri', b: 'Più ravvicinati quando serve, più distanziati per mantenerti: decidi tu, con il consiglio del tuo osteopata.' },
  { Icona: Infinito, t: 'Nessuna scadenza', b: 'Restano tuoi finché non li hai usati tutti, anche l’anno prossimo.' },
  { Icona: AlarmClock, t: `L’offerta termina ${SCADENZA_TESTO}`, b: `È l’unica data da ricordare: dopo, ogni trattamento torna a ${PREZZO_VISITA}€.` },
]

// Prima di pagare: le domande scelte da Riccardo il 19/11/2026 (le altre sono state tolte). Fatti confermati: il tuo
// osteopata o un altro se preferisci, si paga entro il 29 novembre, i trattamenti non scadono, frequenza libera.
const FAQ = [
  {
    question: <>Con <strong>quale osteopata</strong> farò le visite?</>,
    answer: (
      <>
        Con chi ti ha <strong>sempre seguito</strong>: conosce già la tua storia, quindi non riparti da zero. Se
        preferisci, puoi scegliere <strong>un altro</strong> dei nostri osteopati.
      </>
    ),
  },
  {
    question: <>Entro quando devo <strong>pagare</strong>?</>,
    answer: (
      <>
        Entro <strong>{SCADENZA_TESTO}</strong>: è l’unica scadenza dell’offerta. Dopo, ogni trattamento torna a{' '}
        {PREZZO_VISITA}€. Quelli che hai acquistato, invece, puoi farli quando vuoi, anche molto più avanti.
      </>
    ),
  },
  {
    question: <>I trattamenti hanno una <strong>scadenza</strong>?</>,
    answer: (
      <>
        <strong>No, non scadono.</strong> Restano tuoi finché non li hai usati tutti.
      </>
    ),
  },
  {
    question: <>Ogni quanto posso fare i <strong>trattamenti</strong>?</>,
    answer: (
      <>
        <strong>Quando vuoi tu</strong>, con la frequenza che desideri: più ravvicinati quando serve, più distanziati per
        mantenerti. Il tuo osteopata ti consiglia il ritmo adatto a come stai, ma l’ultima parola è tua.
      </>
    ),
  },
  {
    question: <>Come si <strong>paga</strong>?</>,
    answer: (
      <>
        <strong>Solo online, sul nostro sito</strong>, con carta o PayPal. Paghi una volta sola, niente abbonamenti. In
        studio l’offerta non si può pagare.
      </>
    ),
  },
  {
    question: <>Cosa succede <strong>dopo</strong> il pagamento?</>,
    answer: (
      <>
        Ti arriva subito l’<strong>email di conferma</strong> con il numero dell’ordine (se non la trovi, guarda nello spam).
        Poi <strong>ti contattiamo noi</strong> per fissare il primo trattamento. Se preferisci, scrivici tu su WhatsApp
        al{' '}
        <a className="bfx-link" href={WHATSAPP.href} target="_blank" rel="noopener noreferrer">
          {TELEFONO.testo}
        </a>
        .
      </>
    ),
  },
  {
    question: <>E se per un po’ <strong>non posso venire</strong>?</>,
    answer: (
      <>
        Nessun problema: i trattamenti <strong>non scadono</strong>, restano lì ad aspettarti. Se avevi già un appuntamento,
        avvisa la segreteria al{' '}
        <a className="bfx-link" href={TELEFONO.href}>
          {TELEFONO.testo}
        </a>{' '}
        per spostarlo, e riprendi quando torni.
      </>
    ),
  },
]

const SEO = {
  path: '/black-friday-2026',
  title: 'Black Friday Mobilitas | 10 trattamenti osteopatici a metà prezzo | Torino',
  description:
    'Black Friday per i pazienti Mobilitas: 10 trattamenti osteopatici a 450€ invece di 900€, da pagare sul sito. Fino a domenica 29 novembre.',
  ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_02_orizzontale.jpg',
  ogImageAlt: 'Trattamento osteopatico nello studio Mobilitas di Torino',
}

// ——— Pezzi della pagina ———

// Bottone dell'offerta: porta al pagamento online. Testo in prima persona, polarizzante («Sì, voglio…»): chi lo tocca
// sceglie i trattamenti in omaggio. tone="light" sulla sezione panna: lì il verde non si usa, il bottone diventa blu.
// «nota» è la riga piccola sotto: di base il prezzo (apertura e offerta); più giù un beneficio, così il prezzo non si
// ripete a ogni sezione.
const TESTO_BOTTONE = 'Sì, voglio 5 trattamenti in omaggio'

function OffertaCtas({ tone = 'dark', className = '', nota }) {
  const pagaOnline = usePagaOnline()
  return (
    <div className={`bfx-ctas ${tone === 'light' ? 'is-light' : ''} ${className}`}>
      <button type="button" className="bfx-btn" onClick={pagaOnline} {...calamita}>
        <span className="bfx-btn__shine" aria-hidden="true" />
        <span className="bfx-btn__gift" aria-hidden="true">
          <Gift size={20} strokeWidth={2.3} />
        </span>
        <span className="bfx-btn__txt">
          <b>{TESTO_BOTTONE}</b>
          <small>
            {nota ?? (
              <>
                <b>{PREZZO_OFFERTA}€</b> <s>{PREZZO_PIENO}€</s> · paghi sul sito
              </>
            )}
          </small>
        </span>
        <span className="bfx-btn__arrow" aria-hidden="true">
          <ArrowRight size={20} strokeWidth={2.6} />
        </span>
      </button>
    </div>
  )
}

// Barra fissa in basso su telefono (nascosta da 1024px): a sinistra il prezzo e il tempo che resta, a destra il bottone.
// Tutta la barra è un unico bottone, così si tocca facilmente.
function OffertaDock({ visible }) {
  const mancano = useMancano()
  const pagaOnline = usePagaOnline()
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="bfx-dock"
          initial={{ transform: 'translateY(110%)', opacity: 0 }}
          animate={{ transform: 'translateY(0%)', opacity: 1 }}
          exit={{ transform: 'translateY(110%)', opacity: 0, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0.12 }}
        >
          <button
            type="button"
            className="bfx-dock__main"
            onClick={pagaOnline}
            aria-label={`Sì, voglio i ${VISITE} trattamenti del Black Friday, 5 in omaggio: paghi sul sito ${PREZZO_OFFERTA}€ invece di ${PREZZO_PIENO}€, fino a ${SCADENZA_TESTO}`}
          >
            <span className="bfx-dock__info" aria-hidden="true">
              <span className="bfx-dock__price">
                <b>{PREZZO_OFFERTA}€</b>
                <s>{PREZZO_PIENO}€</s>
              </span>
              {mancano ? (
                <span className="bfx-dock__timer">
                  <i className="bfx-dock__dot" />
                  <span className="bfx-dock__lbl">Scade tra</span> {mancano.giorni}g {due(mancano.ore)}:{due(mancano.min)}:{due(mancano.sec)}
                </span>
              ) : (
                <span className="bfx-dock__sub">{VISITE} trattamenti, metà prezzo</span>
              )}
            </span>
            <span className="bfx-dock__cta" aria-hidden="true">
              Sì, li voglio
              <span className="bfx-dock__arrow">
                <ArrowRight size={18} strokeWidth={2.6} />
              </span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Ingresso dell'apertura: una sola sequenza all'arrivo, breve, dal basso
const entra = (delay) => ({
  initial: { opacity: 0, transform: 'translateY(16px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay },
})

// ——— Animazioni allo scorrere (dal 19/11/2026) ———
// Ogni elemento con data-rivela entra in scena quando arriva nello schermo: riceve la classe is-in una volta sola, e il
// CSS (black-friday-2026.css, «Coreografia allo scorrere») fa il resto. La pagina riceve is-rivela prima del primo
// disegno, così senza JavaScript o con «riduci movimento» tutto resta visibile e fermo.
function useRivela() {
  useLayoutEffect(() => {
    const pagina = document.querySelector('.mx-page.bfx')
    if (!pagina) return undefined
    const elementi = pagina.querySelectorAll('[data-rivela]')
    if (typeof IntersectionObserver === 'undefined') return undefined
    pagina.classList.add('is-rivela')
    const io = new IntersectionObserver(
      (voci) => {
        voci.forEach((v) => {
          // Entra quando arriva nello schermo, o subito se è già sopra (pagina ricaricata a metà)
          if (v.isIntersecting || v.boundingClientRect.top < 0) {
            v.target.classList.add('is-in')
            io.unobserve(v.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    elementi.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      pagina.classList.remove('is-rivela')
    }
  }, [])
}

// Il biglietto del prezzo si inclina verso il puntatore, con un riflesso che lo segue (solo mouse, niente se si è
// chiesto di ridurre il movimento)
function useInclina() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof window.matchMedia !== 'function') return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let raf = 0
    const muovi = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${(0.5 - y) * 7}deg`)
        el.style.setProperty('--ry', `${(x - 0.5) * 9}deg`)
        el.style.setProperty('--mx', `${x * 100}%`)
        el.style.setProperty('--my', `${y * 100}%`)
        el.classList.add('is-tilt')
      })
    }
    const esci = () => {
      cancelAnimationFrame(raf)
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.classList.remove('is-tilt')
    }
    el.addEventListener('pointermove', muovi)
    el.addEventListener('pointerleave', esci)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', muovi)
      el.removeEventListener('pointerleave', esci)
    }
  }, [])
  return ref
}

// Luce che segue il mouse sul blu della pagina (solo mouse): un alone verde tenue, sotto i contenuti
function useAurora() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof window.matchMedia !== 'function') return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let raf = 0
    const muovi = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--ax', `${e.clientX}px`)
        el.style.setProperty('--ay', `${e.clientY}px`)
        el.classList.add('is-on')
      })
    }
    const esci = () => el.classList.remove('is-on')
    window.addEventListener('pointermove', muovi, { passive: true })
    document.documentElement.addEventListener('pointerleave', esci)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', muovi)
      document.documentElement.removeEventListener('pointerleave', esci)
    }
  }, [])
  return ref
}

// ——— Pagina ———

export default function BlackFriday() {
  useSeoOfferta(SEO)
  useRivela()
  const tiltRef = useInclina()
  const auroraRef = useAurora()
  const { video, loading } = useHeroVideo(heroVideo)
  const [openFaq, setOpenFaq] = useState(null)
  const [showDock, setShowDock] = useState(false)
  const heroCtaRef = useRef(null)

  // Dock mobile: compare quando i bottoni dell'apertura escono dallo schermo
  useEffect(() => {
    const el = heroCtaRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(([entry]) => {
      setShowDock(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Foto senza ripetizioni (come nelle landing della prima visita): zone di tutto il corpo, perché l'offerta vale per
  // tutti i dolori
  const prendi = creaSceltaFoto(SLUG, [FOTO_VALUTAZIONE, ...FOTO_STUDIO.map((f) => `/trattamenti/${f.nome}`)])
  const fotoHero = !loading && !video ? prendi(IMMAGINI.hero) : null
  const fotoFaq = prendi(undefined, true)

  const risparmio = PREZZO_PIENO - PREZZO_OFFERTA

  // I tre conti del banner del prezzo
  const fatti = [
    { k: 'A trattamento', v: `${PREZZO_OFFERTA / VISITE}€`, prima: `${PREZZO_VISITA}€` },
    { k: 'Risparmi', v: `${risparmio}€`, t: 'restano a te' },
    { k: 'Pagamento', v: 'Online', t: 'sul nostro sito' },
  ]

  return (
    <PageShell className={`bfx mx-pvl--${SLUG}`}>
      <div className="bfx-aurora" ref={auroraRef} aria-hidden="true" />
      {/* ——— Apertura: titolo enorme, la foto del trattamento e la carta Black Friday che ci si posa sopra ——— */}
      <header className="bfx-hero">
        <div className="bfx-hero__bg" aria-hidden="true" />
        {/* Luci d'atmosfera che si muovono piano dietro l'apertura */}
        <div className="bfx-hero__aurora" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="bfx-wrap bfx-hero__grid">
          <motion.p className="bfx-tag" {...entra(0)}>
            <span className="bfx-tag__dot" aria-hidden="true" />
            Black Friday · Per i nostri pazienti
          </motion.p>

          <h1 className="bfx-hero__title">
            <motion.span className="bfx-hero__l1" {...entra(0.05)}>
              <span className="bfx-hero__num">10</span> trattamenti.
            </motion.span>
            <motion.span className="bfx-hero__l2" {...entra(0.12)}>
              Ne paghi solo cinque.
            </motion.span>
          </h1>

          <div className="bfx-hero__stage">
            <motion.div
              className="bfx-hero__media"
              initial={{ opacity: 0, transform: 'translateY(24px) scale(0.97)' }}
              animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            >
              <HeroMedia
                video={video}
                loading={loading}
                videoTitle="Black Friday Mobilitas: 10 trattamenti a metà prezzo"
                audio
                fallback={{ src: fotoHero, alt: 'Trattamento osteopatico nello studio Mobilitas' }}
              />
            </motion.div>
            <CartaBlack
              className="bfx-hero__card"
              visite={VISITE}
              prezzo={PREZZO_OFFERTA}
              prezzoPieno={PREZZO_PIENO}
              scadenzaBreve={SCADENZA_BREVE}
            />
          </div>

          <motion.p className="bfx-lead bfx-hero__sub" {...entra(0.22)}>
            <strong>Solo per chi è già nostro paziente.</strong> Paghi oggi metà prezzo e usi i trattamenti quando ti
            servono: non scadono mai. <strong>Il prezzo lo blocchi ora, il quando lo decidi tu.</strong>
          </motion.p>

          <motion.div className="bfx-hero__offer" ref={heroCtaRef} {...entra(0.28)}>
            <OffertaCtas />
            <Countdown className="bfx-hero__count" />
          </motion.div>
        </div>
      </header>

      {/* ——— I benefici: tre schede, ognuna con il suo mondo ——— */}
      <section className="bfx-section bfx-benefits" aria-labelledby="bfx-benefits-t" data-rivela="sezione">
        <div className="bfx-wrap">
          <div className="bfx-deal__head" data-rivela="testa">
            <h2 id="bfx-benefits-t" className="bfx-h bfx-h2">
              Cosa ottieni <span className="is-green">con i tuoi {VISITE} trattamenti</span>
            </h2>
            <p className="bfx-lead">
              Tre motivi per <strong>non rimandare più</strong>. Scorri le carte e scegli il tuo.
            </p>
          </div>

          <div data-rivela="sale">
            <CaroselloBenefici voci={BENEFICI} />
          </div>
        </div>
      </section>

      {/* ——— L'offerta: il biglietto nero del prezzo, sotto la spiegazione (le quattro regole e i tre passi) ——— */}
      <section className="bfx-section bfx-deal" aria-labelledby="bfx-deal-t" data-rivela="sezione">
        <div className="bfx-wrap">
          <div className="bfx-deal__head" data-rivela="testa">
            <h2 id="bfx-deal-t" className="bfx-h bfx-h2">
              La nostra proposta <span className="is-green">per te</span>
            </h2>
            <p className="bfx-lead">
              Un prezzo che blocchi oggi, <strong>10 trattamenti da usare quando vuoi</strong>. Niente asterischi: ecco
              tutto quello che c’è da sapere.
            </p>
          </div>

          <div className="bfx-tilt-stage" data-rivela="biglietto">
            <div className="bfx-tilt" ref={tiltRef}>
              <BannerPrezzo
                da={PREZZO_PIENO}
                a={PREZZO_OFFERTA}
                visite={VISITE}
                fatti={fatti}
                nota="Paghi sul nostro sito una volta sola, niente abbonamenti."
              />
              <span className="bfx-tilt__glare" aria-hidden="true" />
            </div>
          </div>

          <div className="bfx-friend bfx-explain" data-rivela="pannello">
            <h3 className="bfx-h bfx-h3 bfx-explain__t">Come funziona l’offerta</h3>
            <ul className="bfx-rules" data-rivela="lista">
              {REGOLE.map((x) => (
                <li key={x.t}>
                  <span className="bfx-rules__ico" aria-hidden="true">
                    <x.Icona size={20} strokeWidth={2.2} />
                  </span>
                  <b>{x.t}</b>
                  <span>{x.b}</span>
                </li>
              ))}
            </ul>

            <div className="bfx-explain__steps">
              <h3 className="bfx-h bfx-h3 bfx-explain__t">Tre passi, e inizi</h3>
              <ol className="bfx-steps" data-rivela="passi">
                {PASSI_OFFERTA.map((p, i) => (
                  <li key={p.title}>
                    <span className="bfx-steps__n" aria-hidden="true">
                      {due(i + 1)}
                    </span>
                    <h4 className="bfx-h bfx-h4">{p.title}</h4>
                    <p className="bfx-body">{p.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bfx-deal__close bfx-deal__close--vetro" data-rivela="sale">
            <OffertaCtas />
            <Countdown />
          </div>
        </div>
      </section>

      {/* ——— Prima di pagare: tutto quello che serve sapere (niente commerciale, quindi tutto scritto qui) ——— */}
      <section className="bfx-section bfx-faq" aria-labelledby="bfx-faq-t" data-rivela="sezione">
        <div className="bfx-wrap bfx-faq__grid">
          <div className="bfx-faq__intro" data-rivela="testa">
            <h2 id="bfx-faq-t" className="bfx-h bfx-h2">
              Prima di pagare: <span className="is-green">tutto quello che vuoi sapere</span>
            </h2>
            {/* Il contatto come una scheda di vetro: tutta la scheda apre WhatsApp */}
            <a className="bfx-faq__chat" href={WHATSAPP.href} target="_blank" rel="noopener noreferrer">
              <span className="bfx-faq__chat-ico" aria-hidden="true">
                <MessageCircle size={22} strokeWidth={2.2} />
              </span>
              <span className="bfx-faq__chat-txt">
                <small>Hai ancora un dubbio?</small>
                <span>
                  Scrivici su WhatsApp al <b>{TELEFONO.testo}</b>: ti rispondiamo noi.
                </span>
              </span>
              <span className="bfx-faq__chat-go" aria-hidden="true">
                <ArrowRight size={18} strokeWidth={2.4} />
              </span>
            </a>
            {fotoFaq && (
              <figure className="bfx-faq__photo">
                <ClImg src={fotoFaq} alt="" sizes="(min-width: 1000px) 420px, 100vw" />
              </figure>
            )}
          </div>
          <div>
            <ul className="bfx-faq__list" data-rivela="lista">
              {FAQ.map((item, index) => {
                const isOpen = openFaq === index
                return (
                  <li key={index} className={`bfx-faq__item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="bfx-faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`bfx-faq-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span className="bfx-faq__n" aria-hidden="true">
                        {due(index + 1)}
                      </span>
                      <span className="bfx-faq__qt">{item.question}</span>
                      <span className="bfx-faq__plus" aria-hidden="true">
                        <Plus size={20} strokeWidth={1.8} />
                      </span>
                    </button>
                    <div className="bfx-faq__a" id={`bfx-faq-${index}`} role="region">
                      <div>
                        <p className="bfx-body">{item.answer}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <OffertaCtas className="bfx-faq__cta" nota="Paghi una volta sola, sul nostro sito" />
          </div>
        </div>
      </section>

      {/* Dock mobile: l'offerta sempre a portata di pollice */}
      <OffertaDock visible={showDock} />
    </PageShell>
  )
}
