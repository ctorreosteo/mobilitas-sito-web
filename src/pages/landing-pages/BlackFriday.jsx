import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Gift, Plus, X } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import { useParallax } from '../../components/home-sections/homeMotion'
import ClImg from '../../components/condition-landing/ClImg'
import { HeroMedia } from '../../components/condition-landing/Hero'
import { prefetchHeroVideo, useHeroVideo } from '../../components/condition-landing/heroVideo'
import StudioCollage from '../../components/landing/StudioCollage'
import { FOTO_STUDIO, creaSceltaFoto } from '../../data/fotoTrattamenti'
import { PREZZO_VISITA, SCADENZA, SCADENZA_TESTO, due, useMancano, useSeoOfferta } from '../../components/black-friday/offerta'
import CartaBlack from '../../components/black-friday-2026-sections/CartaBlack'
import { AnnoVisite, BannerPrezzo, Countdown, GraficoRicadute, MazzoVisite, NonDisturbare } from '../../components/black-friday-2026-sections/BfxKit'
import '../../styles/pages/condition-landing.css'
import '../../styles/pages/cervicalgia.css'
import '../../components/landing/prima-visita-landing.css'
import '../../styles/pages/black-friday-2026.css'

// Landing /black-friday-2026: offerta Black Friday per chi è già paziente. Ci si arriva da quattro ads Meta con
// copioni diversi (il corpo che impara a stare teso; «perché lo facciamo»; «se oggi stai bene» e il tagliando della
// macchina; «rimandi sempre» e la macchia sul vestito): i testi sono generici e riprendono i temi di tutti, senza
// seguirne uno solo. Se cambia o si aggiunge un copione, ricontrollare apertura, «Perché lo facciamo» e «Perché dieci».
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
// I trattamenti si prenotano subito dopo il pagamento: da soli, oppure chiamando la segreteria.
// Niente sezione «Dove siamo» con le mappe: sono già pazienti, sanno dove siamo (tolta il 18/11/2026).
// Dal 19/11/2026 nei testi si parla di «trattamenti», mai di «visite» (anche nelle grafiche); nel codice i nomi
// (VISITE, MazzoVisite…) sono rimasti quelli di prima.

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
const PAGINA_PAGAMENTO = '/black-friday-2026/pagamento'

// Dopo il pagamento si prenota subito: in autonomia, oppure chiamando la segreteria (numero del sito, come nel menu)
const TELEFONO = { href: 'tel:+393518198457', testo: '351 819 8457' }
const WHATSAPP = { href: 'https://wa.me/393518198457?text=' + encodeURIComponent('Ciao, ho una domanda sui 10 trattamenti del Black Friday.') }
const usePagaOnline = () => {
  const navigate = useNavigate()
  return () => navigate(PAGINA_PAGAMENTO)
}

// Video dell'apertura dal gestionale (codice stabile, non l'UID Cloudflare). Finché non c'è, l'apertura mostra la foto.
// Con audio come l'ad: parte muto e la pillola «Tocca per ascoltare» lo fa ripartire con l'audio.
const heroVideo = prefetchHeroVideo('BLACK_FRIDAY_VSL')

const IMMAGINI = {
  hero: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
  band: '/trattamenti/schiena_lombare-prono_03_orizzontale',
}

// La valutazione in piedi, come nelle landing della prima visita
const FOTO_VALUTAZIONE = '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale'

// ——— Contenuti ———

// Perché dieci trattamenti: una scheda per ogni copione delle ads, così ognuno ritrova il suo. «gain» è il beneficio, in
// evidenza sotto il racconto.
const PERCHE_DIECI = [
  {
    tab: 'Ho male da tanto',
    title: 'Se hai avuto male per tanto tempo',
    body: 'Il corpo impara a stare teso. Diventa un’abitudine, e un’abitudine non la cambi in un giorno: servono trattamenti, uno dopo l’altro.',
    gain: (
      <>
        <b>Con dieci trattamenti</b> il corpo ha il tempo di imparare un modo nuovo di stare, più sciolto. E il dolore smette di
        essere la tua normalità.
      </>
    ),
  },
  {
    tab: 'Oggi sto bene',
    title: 'Se oggi stai bene',
    body: 'È perché insieme abbiamo fatto un ottimo lavoro. Ma la vita di tutti i giorni può far tornare il dolore, spesso più forte di prima. È come il tagliando della macchina: non lo fai perché è rotta, lo fai perché va bene e vuoi che continui così.',
    gain: (
      <>
        <b>Con dieci trattamenti</b> tieni il risultato che hai ottenuto, invece di ricominciare da capo quando il dolore torna.
      </>
    ),
  },
  {
    tab: 'Rimando sempre',
    title: 'Se rimandi sempre al mese prossimo',
    body: 'La rata, le bollette, la spesa: e tu vieni dopo tutto il resto. Ma il dolore non aspetta il mese giusto. È come una macchia sul vestito: se la lavi subito va via, se aspetti si attacca.',
    gain: (
      <>
        <b>Oggi ti costa la metà</b>, anche in tre rate, e i trattamenti non scadono: li blocchi adesso, prima che il dolore si
        attacchi, e li usi con calma.
      </>
    ),
  },
]

// Un trattamento a confronto con il percorso: ogni riga riprende i testi della pagina e delle ads
const CONFRONTO = [
  { da: 'Lavora su dove fa male', a: <>Lavora sulla <strong>causa</strong></> },
  { da: 'Toglie il dolore di oggi', a: <>Dà al corpo il <strong>tempo</strong> di cambiare abitudine</> },
  { da: 'Rincorri il dolore quando torna', a: <><strong>Previeni</strong> le ricadute</> },
  { da: 'Trattamenti sparsi, quando non ce la fai più', a: <>Un percorso <strong>continuo</strong></> },
  { da: 'Dici di no: alla cena, alla passeggiata, al weekend fuori', a: <>Continui a dire di <strong>sì</strong></> },
]

// Cosa ottieni con i 10 trattamenti (non chiamarlo «pacchetto»): i tre benefici scelti da Riccardo il 19/11/2026,
// ciascuno con il suo disegno. Problema (il dolore che torna, con il grafico) · Prevenzione (tutto l'anno, a un
// prezzo accessibile: «il tagliando» delle ads) · Coccola (un'ora al mese per staccare dallo stress).
// Il prezzo in cifre qui non c'è: lo mostrano subito dopo il mazzo 5 + 5 e il biglietto.

// Come funziona: tre passi in fila, la prenotazione è dentro il secondo
const PASSI_OFFERTA = [
  { title: 'Paghi online', body: 'Due minuti, con carta o PayPal, anche in 3 rate. L’email di conferma arriva subito.' },
  {
    title: 'Prenoti',
    body: (
      <>
        Anche subito: da solo, oppure chiamando la segreteria al{' '}
        <a className="bfx-steps__tel" href={TELEFONO.href}>
          {TELEFONO.testo}
        </a>
        .
      </>
    ),
  },
  { title: 'Inizi il percorso', body: 'Gli altri trattamenti li fissi con il tuo osteopata, in base a come stai. Non scadono.' },
]

// Prima di pagare: tutto quello che il paziente deve sapere, perché non parla con nessuno prima di pagare.
// Fatti confermati da Riccardo il 18/11/2026: i trattamenti non scadono, sono personali (non si dividono con familiari).
// Non scrivere che la fattura è detraibile. Durata delle sedute: come in data/faqPrimaVisita.jsx.
const FAQ = [
  {
    question: <>Chi può usare l’<strong>offerta</strong>?</>,
    answer: (
      <>
        È pensata per chi è <strong>già nostro paziente</strong>: dieci trattamenti per continuare il lavoro che hai iniziato con
        il tuo osteopata.
      </>
    ),
  },
  {
    question: <>Cosa <strong>comprende</strong>?</>,
    answer: (
      <>
        <strong>Dieci trattamenti osteopatici</strong> con il tuo osteopata, in uno dei nostri due studi a Torino: scegli tu
        quello più comodo. Ogni seduta dura circa <strong>40-55 minuti</strong>, in base al problema.
      </>
    ),
  },
  {
    question: <>Entro quando devo <strong>usare</strong> i trattamenti?</>,
    answer: (
      <>
        <strong>I trattamenti non scadono.</strong> Li distribuisci con il tuo osteopata, in base a come stai. La data del{' '}
        {SCADENZA_TESTO.replace('domenica ', '')} vale solo per pagarli a metà prezzo.
      </>
    ),
  },
  {
    question: <>Posso dividerli con un <strong>familiare</strong>?</>,
    answer: (
      <>
        No: i dieci trattamenti sono <strong>personali</strong>, li usi solo tu.
      </>
    ),
  },
  {
    question: <>Come si <strong>paga</strong>?</>,
    answer: (
      <>
        <strong>Solo online</strong>, con carta o PayPal, anche <strong>in 3 rate senza interessi</strong> con PayPal. Paghi
        una volta sola, niente abbonamenti. In studio l’offerta non si può pagare.
      </>
    ),
  },
  {
    question: <>Ricevo la <strong>fattura</strong>?</>,
    answer: (
      <>
        Sì, <strong>intestata a te</strong>: per questo, al pagamento, ti chiediamo codice fiscale e indirizzo.
      </>
    ),
  },
  {
    question: <>Cosa succede <strong>dopo</strong> il pagamento?</>,
    answer: (
      <>
        Ti arriva subito l’<strong>email di conferma</strong> con il numero dell’ordine (se non la trovi, guarda nello spam).
        Poi <strong>prenoti il primo trattamento</strong>: da solo, oppure chiamando la segreteria al{' '}
        <a className="bfx-link" href={TELEFONO.href}>
          {TELEFONO.testo}
        </a>
        .
      </>
    ),
  },
  {
    question: <>Entro quando devo <strong>decidere</strong>?</>,
    answer: (
      <>
        Entro <strong>{SCADENZA_TESTO}</strong>: è l’ultimo giorno per pagare online. Dopo, l’offerta Black Friday non è più
        disponibile.
      </>
    ),
  },
]

const SEO = {
  path: '/black-friday-2026',
  title: 'Black Friday Mobilitas | 10 trattamenti osteopatici a metà prezzo | Torino',
  description:
    'Black Friday per i pazienti Mobilitas: 10 trattamenti osteopatici a 450€ invece di 900€, da pagare online. Fino a domenica 29 novembre.',
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
      <button type="button" className="bfx-btn" onClick={pagaOnline}>
        <span className="bfx-btn__shine" aria-hidden="true" />
        <span className="bfx-btn__gift" aria-hidden="true">
          <Gift size={20} strokeWidth={2.3} />
        </span>
        <span className="bfx-btn__txt">
          <b>{TESTO_BOTTONE}</b>
          <small>
            {nota ?? (
              <>
                <b>{PREZZO_OFFERTA}€</b> <s>{PREZZO_PIENO}€</s> · paghi online
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
            aria-label={`Sì, voglio i ${VISITE} trattamenti del Black Friday, 5 in omaggio: paghi online ${PREZZO_OFFERTA}€ invece di ${PREZZO_PIENO}€, fino a ${SCADENZA_TESTO}`}
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

// Perché dieci trattamenti: tre schede, una per situazione. Il paziente tocca quella in cui si riconosce.
function Situazioni({ foto }) {
  const [attiva, setAttiva] = useState(0)
  const tabsRef = useRef(null)
  const s = PERCHE_DIECI[attiva]

  // Frecce sinistra/destra tra le schede (come nei tab standard)
  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const n = (attiva + (e.key === 'ArrowRight' ? 1 : -1) + PERCHE_DIECI.length) % PERCHE_DIECI.length
    setAttiva(n)
    tabsRef.current?.querySelectorAll('[role="tab"]')[n]?.focus()
  }

  return (
    <div className="bfx-situ">
      <div className="bfx-situ__tabs" role="tablist" aria-label="La tua situazione" ref={tabsRef} onKeyDown={onKeyDown}>
        {PERCHE_DIECI.map((x, i) => (
          <button
            key={x.tab}
            type="button"
            role="tab"
            id={`bfx-situ-tab-${i}`}
            aria-selected={i === attiva}
            aria-controls="bfx-situ-panel"
            tabIndex={i === attiva ? 0 : -1}
            className="bfx-situ__tab"
            onClick={() => setAttiva(i)}
          >
            {i === attiva && (
              <motion.i
                layoutId="bfx-situ-pill"
                className="bfx-situ__pill"
                transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
              />
            )}
            <span>{x.tab}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={attiva}
          id="bfx-situ-panel"
          role="tabpanel"
          aria-labelledby={`bfx-situ-tab-${attiva}`}
          className="bfx-situ__panel"
          initial={{ opacity: 0, transform: 'translateY(8px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(-6px)', transition: { duration: 0.15 } }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          {foto[attiva] && (
            <figure className="bfx-situ__img">
              <ClImg src={foto[attiva]} alt="" sizes="(min-width: 900px) 440px, 100vw" />
            </figure>
          )}
          <div className="bfx-situ__txt">
            <h3 className="bfx-h bfx-h3">{s.title}</h3>
            <p className="bfx-body">{s.body}</p>
            <p className="bfx-situ__gain">
              <i className="bfx-perks__ok" aria-hidden="true">
                <Check size={14} strokeWidth={3} />
              </i>
              <span>{s.gain}</span>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ——— Pagina ———

export default function BlackFriday() {
  useSeoOfferta(SEO)
  const { video, loading } = useHeroVideo(heroVideo)
  const [openFaq, setOpenFaq] = useState(null)
  const [showDock, setShowDock] = useState(false)
  const heroCtaRef = useRef(null)
  const [benRef, benY] = useParallax(8)

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
  const fotoBen = prendi(IMMAGINI.band)
  const fotoPerche = PERCHE_DIECI.map(() => prendi())
  const fotoFaq = prendi(undefined, true)

  const risparmio = PREZZO_PIENO - PREZZO_OFFERTA

  // I tre conti del banner del prezzo
  const fatti = [
    { k: 'A trattamento', v: `${PREZZO_OFFERTA / VISITE}€`, prima: `${PREZZO_VISITA}€` },
    { k: 'Risparmi', v: `${risparmio}€`, t: 'restano a te' },
    { k: 'Con PayPal', v: '3 rate', t: 'senza interessi' },
  ]

  return (
    <PageShell className={`bfx mx-pvl--${SLUG}`}>
      {/* ——— Apertura: titolo enorme, la foto del trattamento e la carta Black Friday che ci si posa sopra ——— */}
      <header className="bfx-hero">
        <div className="bfx-hero__bg" aria-hidden="true" />
        <div className="bfx-wrap bfx-hero__grid">
          <motion.p className="bfx-tag" {...entra(0)}>
            <span className="bfx-tag__dot" aria-hidden="true" />
            Black Friday · Per i nostri pazienti
          </motion.p>

          <h1 className="bfx-hero__title">
            <motion.span className="bfx-hero__l1" {...entra(0.05)}>
              Dieci trattamenti.
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

          <motion.div className="bfx-hero__offer" ref={heroCtaRef} {...entra(0.22)}>
            <OffertaCtas />
            <Countdown className="bfx-hero__count" />
          </motion.div>

          <motion.p className="bfx-lead bfx-hero__sub" {...entra(0.28)}>
            Per il Black Friday abbiamo pensato a chi è <strong>già nostro paziente</strong>: dieci trattamenti con il tuo osteopata,
            per togliere il dolore e <strong>non farlo tornare</strong>. Paghi online, prenoti subito e i trattamenti non scadono.
          </motion.p>
        </div>
      </header>

      {/* ——— L'offerta: i benefici in elenco, 5 + 5, il banner del prezzo e poi il conto alla rovescia ——— */}
      <section className="bfx-section bfx-deal" aria-labelledby="bfx-deal-t">
        <div className="bfx-wrap">
          <div className="bfx-deal__head">
            <h2 id="bfx-deal-t" className="bfx-h bfx-h2">
              Cosa ottieni <span className="is-green">con i tuoi {VISITE} trattamenti</span>
            </h2>
            <p className="bfx-lead">
              Dieci trattamenti, <strong>tre cose che rimandi da troppo tempo</strong>. Quest’anno smetti di rimandarle.
            </p>
          </div>

          <div className="bfx-gains">
            <article className="bfx-gain is-main">
              <p className="bfx-gain__eyebrow">Il tuo problema</p>
              <h3 className="bfx-h bfx-h3">Non aspettare che il dolore torni</h3>
              <p className="bfx-body">
                Quando stai meglio è facile fermarsi. Ed è proprio lì che il dolore torna. Con dieci trattamenti continui a
                lavorare sulla causa: <strong>il problema lo chiudi, non lo rimandi</strong>.
              </p>
              <GraficoRicadute />
            </article>

            <article className="bfx-gain">
              <p className="bfx-gain__eyebrow">La prevenzione</p>
              <h3 className="bfx-h bfx-h4">Ti curi tutto l’anno, non solo quando hai male</h3>
              <p className="bfx-gain__p">
                Come il tagliando della macchina: sistemi le piccole cose prima che diventino un fermo. E lo fai{' '}
                <strong>al prezzo più basso dell’anno</strong>.
              </p>
              <AnnoVisite />
            </article>

            <article className="bfx-gain">
              <p className="bfx-gain__eyebrow">La coccola</p>
              <h3 className="bfx-h bfx-h4">Un’ora al mese solo per te</h3>
              <p className="bfx-gain__p">
                Niente lavoro, niente telefono, niente cose da fare per gli altri. Stacchi dallo stress e per un’ora{' '}
                <strong>pensi solo al tuo benessere</strong>.
              </p>
              <NonDisturbare />
            </article>
          </div>

          <MazzoVisite visite={VISITE} />

          <div className="bfx-deal__offer">
            <BannerPrezzo
              da={PREZZO_PIENO}
              a={PREZZO_OFFERTA}
              visite={VISITE}
              fatti={fatti}
              nota="Paghi online una volta sola, niente abbonamenti. I trattamenti non scadono."
            />
            <div className="bfx-deal__close">
              <OffertaCtas />
              <Countdown />
            </div>
          </div>
        </div>
      </section>

      {/* ——— Perché lo facciamo (dal copione «Perché lo facciamo?») ——— */}
      <section className="bfx-section bfx-why-us" aria-labelledby="bfx-why-us-t">
        <div className="bfx-wrap bfx-why-us__inner">
          <h2 id="bfx-why-us-t" className="bfx-why-us__q">
            Perché lo facciamo?
          </h2>
          <p className="bfx-why-us__a">
            Al Black Friday, di solito, ti vendono cose <span className="is-dim">che non ti servono.</span>{' '}
            <span className="is-green">Noi vogliamo darti qualcosa che ti fa stare bene.</span>
          </p>
          <p className="bfx-lead bfx-why-us__b">
            Niente da mettere in un cassetto: <strong>tempo per il tuo corpo</strong>, con l’osteopata che già ti conosce.
          </p>
        </div>
      </section>

      {/* ——— Perché dieci trattamenti: tre schede, una per copione ——— */}
      <section className="bfx-section bfx-why" aria-labelledby="bfx-why-t">
        <div className="bfx-wrap">
          <div className="bfx-why__head">
            <h2 id="bfx-why-t" className="bfx-h bfx-h2 bfx-why__title">
              Dieci trattamenti possono sembrare tanti.{' '}
              <span className="is-dim">Ma c’è una cosa che forse nessuno ti ha mai spiegato.</span>
            </h2>
            <p className="bfx-lead">Ti riconosci in una di queste situazioni? Tocca la tua.</p>
          </div>
          <Situazioni foto={fotoPerche} />
        </div>
      </section>

      {/* ——— Cosa cambia: un trattamento a confronto con un percorso (la colonna del percorso è una carta che si accende) ——— */}
      <section className="bfx-section bfx-change" aria-labelledby="bfx-change-t">
        <div className="bfx-wrap">
          <div className="bfx-change__head">
            <h2 id="bfx-change-t" className="bfx-h bfx-h2">
              Dieci trattamenti non sono un costo in più. <span className="is-green">Sono il percorso completo.</span>
            </h2>
            {fotoBen && (
              <div className="bfx-change__photo" ref={benRef}>
                <motion.div style={{ y: benY, height: '100%' }}>
                  <ClImg src={fotoBen} alt="" sizes="(min-width: 1000px) 480px, 100vw" />
                </motion.div>
              </div>
            )}
          </div>

          <div className="bfx-vs" style={{ '--righe': CONFRONTO.length + 1 }}>
            <motion.span
              className="bfx-vs__card"
              aria-hidden="true"
              initial={{ opacity: 0, transform: 'translateY(24px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            />
            <p className="bfx-vs__row is-head" style={{ '--r': 1 }} aria-hidden="true">
              <span className="is-from">Un trattamento</span>
              <span className="is-to">Un percorso</span>
            </p>
            {CONFRONTO.map((r, i) => (
              <p key={r.da} className="bfx-vs__row" style={{ '--r': i + 2 }}>
                <span className="is-from">
                  <X className="bfx-vs__ico" size={16} strokeWidth={2} aria-hidden="true" />
                  <span>
                    <span className="bfx-sr">Un trattamento: </span>
                    {r.da}
                  </span>
                </span>
                <span className="is-to">
                  <i className="bfx-vs__ok" aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                  </i>
                  <span>
                    <span className="bfx-sr">Un percorso: </span>
                    {r.a}
                  </span>
                </span>
              </p>
            ))}
          </div>

          <OffertaCtas className="bfx-change__cta" nota="I trattamenti non scadono" />
        </div>
      </section>

      {/* ——— Come funziona: l'unica sezione panna (cambio di mondo), tre passi in fila ——— */}
      <section className="bfx-section bfx-friend bfx-how" aria-labelledby="bfx-how-t">
        <div className="bfx-wrap">
          <div className="bfx-how__head">
            <h2 id="bfx-how-t" className="bfx-h bfx-h2">
              Come funziona: <strong>tre passi, e inizi.</strong>
            </h2>
            <p className="bfx-lead">Fai tutto da qui, in pochi minuti, senza aspettare nessuno.</p>
          </div>

          <ol className="bfx-steps">
            {PASSI_OFFERTA.map((p, i) => (
              <li key={p.title}>
                <span className="bfx-steps__n" aria-hidden="true">
                  {due(i + 1)}
                </span>
                <h3 className="bfx-h bfx-h4">{p.title}</h3>
                <p className="bfx-body">{p.body}</p>
              </li>
            ))}
          </ol>

          <OffertaCtas tone="light" nota="Paghi online e prenoti subito" />
        </div>
      </section>

      {/* ——— Prima di pagare: tutto quello che serve sapere (niente commerciale, quindi tutto scritto qui) ——— */}
      <section className="bfx-section bfx-faq" aria-labelledby="bfx-faq-t">
        <div className="bfx-wrap bfx-faq__grid">
          <div className="bfx-faq__intro">
            <h2 id="bfx-faq-t" className="bfx-h bfx-h2">
              Prima di pagare: <span className="is-green">tutto quello che devi sapere</span>
            </h2>
            <p className="bfx-lead">
              Hai ancora un dubbio? Scrivici su WhatsApp al{' '}
              <a className="bfx-link" href={WHATSAPP.href} target="_blank" rel="noopener noreferrer">
                {TELEFONO.testo}
              </a>
              : ti rispondiamo noi.
            </p>
            {fotoFaq && (
              <figure className="bfx-faq__photo">
                <ClImg src={fotoFaq} alt="" sizes="(min-width: 1000px) 420px, 100vw" />
              </figure>
            )}
          </div>
          <div>
            <ul className="bfx-faq__list">
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
                      <span>{item.question}</span>
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
            <OffertaCtas className="bfx-faq__cta" nota="Paghi una volta sola, anche in 3 rate" />
          </div>
        </div>
      </section>

      {/* ——— Chi ti tratta ——— */}
      <section className="bfx-section bfx-team" aria-labelledby="bfx-team-t">
        <div className="bfx-wrap bfx-team__grid">
          <div>
            <h2 id="bfx-team-t" className="bfx-h bfx-h2">
              Lo stesso metodo <span className="is-green">che conosci già</span>
            </h2>
            <p className="bfx-lead">
              Sei già stato da noi: sai come lavoriamo. Tutti i nostri osteopati usano lo <strong>stesso metodo</strong>:
              ascoltano, ti valutano e ti trattano con le mani.
            </p>
          </div>
          <StudioCollage />
        </div>
      </section>

      {/* Dock mobile: l'offerta sempre a portata di pollice */}
      <OffertaDock visible={showDock} />
    </PageShell>
  )
}
