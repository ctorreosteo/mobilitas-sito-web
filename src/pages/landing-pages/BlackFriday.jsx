import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Plus, X } from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import StudiMap from '../../components/studi-map/StudiMap'
import { useParallax } from '../../components/home-sections/homeMotion'
import ClImg from '../../components/condition-landing/ClImg'
import { HeroMedia } from '../../components/condition-landing/Hero'
import { prefetchHeroVideo, useHeroVideo } from '../../components/condition-landing/heroVideo'
import CityMap from '../../components/landing/CityMap'
import StudioCollage from '../../components/landing/StudioCollage'
import { FOTO_STUDIO, creaSceltaFoto } from '../../data/fotoTrattamenti'
import { PREZZO_VISITA, SCADENZA, SCADENZA_TESTO, due, useSeoOfferta } from '../../components/black-friday/offerta'
import CartaBlack from '../../components/black-friday-2026-sections/CartaBlack'
import { Countdown, MazzoVisite, PrezzoGigante, TiltPass } from '../../components/black-friday-2026-sections/BfxKit'
import '../../styles/pages/condition-landing.css'
import '../../styles/pages/cervicalgia.css'
import '../../components/landing/prima-visita-landing.css'
import '../../styles/pages/black-friday-2026.css'

// Landing /black-friday-2026: offerta Black Friday per chi è già paziente. Ci si arriva da quattro ads Meta con
// copioni diversi (il corpo che impara a stare teso; «perché lo facciamo»; «se oggi stai bene» e il tagliando della
// macchina; «rimandi sempre» e la macchia sul vestito): i testi sono generici e riprendono i temi di tutti, senza
// seguirne uno solo. Se cambia o si aggiunge un copione, ricontrollare apertura, «Perché lo facciamo» e «Perché dieci».
// Generica anche nei dolori: tutti, nessuno specifico. Solo l'offerta 10 visite a 450€, da pagare online, con scadenza.
// "Porta un amico" non è più qui (strategia del 16/11/2026): i pazienti ricevono un messaggio con il link personale
// da mandare all'amico, che arriva sull'invito /black-friday-2026-amico.
// Grafica propria (redesign del 16/11/2026, apertura rifatta il 17/11/2026): notte blu; nell'apertura la carta Black
// Friday in 3D (nera, olografica, con il 10 in rilievo) posata sulla foto del trattamento; prezzo a tutta larghezza.
// Stile in styles/pages/black-friday-2026.css (prefisso bfx-), pezzi grafici in components/black-friday-2026-sections.
// Dati comuni con /black-friday-2026-amico (scadenza, prezzi, SEO): components/black-friday/offerta.js.
// Ogni dato dell'offerta (10 visite, 450€, metà prezzo, scadenza) si dice per esteso una volta sola, nella sezione
// dell'offerta con i benefici in elenco; altrove torna solo sui bottoni e sul conto alla rovescia (revisione del
// 17/11/2026: tolti il riepilogo, il percorso in tre fasi e le domande che ripetevano la pagina).

const SLUG = 'black-friday-2026'

// ——— Offerta (se cambia, cambia anche nei testi e nella SEO di questa pagina) ———
const VISITE = 10
const PREZZO_PIENO = 900
const PREZZO_OFFERTA = 450
// Prezzo della visita e scadenza: components/black-friday/offerta.js
// Scadenza stampata sulla carta dell'apertura, «29/11»: dalla stessa data di offerta.js
const SCADENZA_BREVE = SCADENZA.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', timeZone: 'Europe/Rome' })

// ——— Pagamento online ———
// Tutti i bottoni della pagina (apertura, sezioni, barra in basso su telefono) portano alla pagina di pagamento dei
// 450€. DA FARE: incollare qui il link di pagamento (per esempio un Payment Link di Stripe, come quello delle
// landing emicrania e mal di schiena), con la pagina di ritorno dopo il pagamento impostata da Stripe.
// Finché è vuoto, i bottoni non fanno nulla.
const LINK_PAGAMENTO = ''
const pagaOnline = () => {
  if (LINK_PAGAMENTO) window.location.assign(LINK_PAGAMENTO)
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

// Perché dieci visite: un caso per ogni copione delle ads, così ognuno ritrova il suo
const PERCHE_DIECI = [
  {
    title: 'Se hai avuto male per tanto tempo',
    body: 'Il corpo impara a stare teso. Diventa un’abitudine, e un’abitudine non la cambi in un giorno: servono visite, una dopo l’altra.',
  },
  {
    title: 'Se oggi stai bene',
    body: 'È perché insieme abbiamo fatto un ottimo lavoro. Ma la vita di tutti i giorni può far tornare il dolore, e spesso più forte di prima. Pensa al tagliando della macchina: non lo fai perché è rotta, lo fai perché va bene e vuoi che continui così.',
  },
  {
    title: 'Se rimandi sempre al mese prossimo',
    body: 'La rata, le bollette, la spesa: e tu vieni dopo tutto il resto. Ma il dolore non aspetta il mese giusto. È come una macchia sul vestito: se la lavi subito va via, se aspetti si attacca.',
  },
]

// Una visita a confronto con il percorso: ogni riga riprende i testi della pagina e delle ads
const CONFRONTO = [
  { da: 'Lavora su dove fa male', a: <>Lavora sulla <strong>causa</strong></> },
  { da: 'Toglie il dolore di oggi', a: <>Dà al corpo il <strong>tempo</strong> di cambiare abitudine</> },
  { da: 'Rincorri il dolore quando torna', a: <><strong>Previeni</strong> le ricadute</> },
  { da: 'Visite sparse, quando non ce la fai più', a: <>Un percorso <strong>continuo</strong></> },
  { da: 'Dici di no: alla cena, alla passeggiata, al weekend fuori', a: <>Continui a dire di <strong>sì</strong></> },
]

// Cosa ottieni con le 10 visite (non chiamarlo «pacchetto»): i benefici in breve, in elenco (i numeri sono nel prezzo subito sotto)
const BENEFICI = [
  { t: 'Metà prezzo', b: 'ne paghi cinque, le altre cinque sono in omaggio.' },
  { t: 'Un percorso completo', b: 'togli il dolore e lo tieni lontano, invece di rincorrerlo quando torna.' },
  { t: 'Con il tuo osteopata', b: 'lo stesso metodo che conosci, nello studio che preferisci.' },
  { t: 'Al tuo ritmo', b: 'le visite si distribuiscono in base a come stai.' },
  { t: 'Zero pensieri', b: 'paghi una volta online, poi ti chiamiamo noi per le date.' },
]

// Come funziona: i tre passi della sezione panna
const PASSI_OFFERTA = [
  {
    title: 'Paghi online',
    body: 'Con carta, direttamente da questa pagina: le tue visite sono bloccate a metà prezzo.',
  },
  {
    title: 'Fissiamo le visite',
    body: 'La segreteria ti chiama per organizzare con te le date, con il tuo osteopata.',
  },
  {
    title: 'Inizi il percorso',
    body: `Dieci visite, distribuite come ti consiglia il tuo osteopata in base a come stai.`,
  },
]

// Solo le domande a cui la pagina non risponde già altrove (prezzo, perché dieci, dove sono gli studi hanno la loro sezione)
const FAQ = [
  {
    question: (
      <>
        Chi può usare l’<strong>offerta</strong>?
      </>
    ),
    answer: (
      <>
        È pensata per chi è <strong>già nostro paziente</strong>: dieci visite per continuare il lavoro che hai iniziato con
        il tuo osteopata.
      </>
    ),
  },
  {
    question: (
      <>
        Entro <strong>quando</strong> devo decidere?
      </>
    ),
    answer: (
      <>
        Entro <strong>{SCADENZA_TESTO}</strong>: è l’ultimo giorno per pagare online. Le date delle visite le fissi dopo,
        con la segreteria.
      </>
    ),
  },
  {
    question: (
      <>
        Posso pagare <strong>in studio</strong>?
      </>
    ),
    answer: (
      <>
        No, l’offerta si paga <strong>solo online, con carta</strong>, direttamente da questa pagina. Così le tue visite sono
        bloccate subito al prezzo del Black Friday.
      </>
    ),
  },
]

const SEO = {
  path: '/black-friday-2026',
  title: 'Black Friday Mobilitas | 10 visite osteopatiche a metà prezzo | Torino',
  description:
    'Black Friday per i pazienti Mobilitas: 10 visite osteopatiche a 450€ invece di 900€, da pagare online. Fino a domenica 29 novembre.',
  ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_02_orizzontale.jpg',
  ogImageAlt: 'Trattamento osteopatico nello studio Mobilitas di Torino',
}

// ——— Pezzi della pagina ———

// Bottone dell'offerta: porta al pagamento online. tone="light" sulla sezione panna: lì il verde non si usa, il bottone
// diventa blu.
function OffertaCtas({ tone = 'dark', className = '' }) {
  return (
    <div className={`bfx-ctas ${tone === 'light' ? 'is-light' : ''} ${className}`}>
      <button type="button" className="bfx-btn" onClick={pagaOnline}>
        <span className="bfx-btn__txt">
          <small>
            Paghi online · <s>{PREZZO_PIENO}€</s> <b>{PREZZO_OFFERTA}€</b>
          </small>
          Riserva le tue {VISITE} visite
        </span>
        <span className="bfx-btn__arrow" aria-hidden="true">
          <ArrowRight size={18} strokeWidth={2.4} />
        </span>
      </button>
    </div>
  )
}

// Barra fissa in basso su telefono (nascosta da 1024px)
function OffertaDock({ visible }) {
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
            aria-label={`Riserva le ${VISITE} visite del Black Friday: paghi online ${PREZZO_OFFERTA}€ invece di ${PREZZO_PIENO}€`}
          >
            <span className="bfx-dock__price" aria-hidden="true">
              <s>{PREZZO_PIENO}€</s>
              <b>{PREZZO_OFFERTA}€</b>
            </span>
            <span className="bfx-dock__txt">Riserva {VISITE} visite</span>
            <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Lo scontrino del Black Friday: la prima riga (quello che di solito ti vendono) è barrata, il resto è l'offerta.
// Decorativo: i dati sono già nel testo accanto e nel resto della pagina.
function Scontrino() {
  return (
    <div className="bfx-receipt-wrap" aria-hidden="true">
      <TiltPass as="div" className="bfx-receipt">
        <p className="bfx-receipt__head">
          <b>Mobilitas</b>
          <span>Black Friday</span>
        </p>
        <ul className="bfx-receipt__rows">
          <li className="is-struck">
            <span>Cose che non ti servono</span>
            <span>—</span>
          </li>
          <li>
            <span>{VISITE} visite osteopatiche</span>
            <span>{PREZZO_PIENO}€</span>
          </li>
          <li className="is-gift">
            <span>5 visite in omaggio</span>
            <span>−{PREZZO_PIENO - PREZZO_OFFERTA}€</span>
          </li>
        </ul>
        <p className="bfx-receipt__total">
          <span>Totale</span>
          <b>{PREZZO_OFFERTA}€</b>
        </p>
        <p className="bfx-receipt__foot">Valido fino a {SCADENZA_TESTO}</p>
        <span className="bfx-receipt__code" />
      </TiltPass>
    </div>
  )
}

// Ingresso dell'apertura: una sola sequenza all'arrivo, breve, dal basso
const entra = (delay) => ({
  initial: { opacity: 0, transform: 'translateY(16px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay },
})

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
              Dieci visite.
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
                videoTitle="Black Friday Mobilitas: 10 visite a metà prezzo"
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
            Per il Black Friday abbiamo pensato a chi è <strong>già nostro paziente</strong>: un percorso completo con il tuo
            osteopata, per togliere il dolore e <strong>non farlo tornare</strong>.
          </motion.p>
        </div>
      </header>

      {/* ——— L'offerta: i benefici in elenco, 5 + 5 e il prezzo a tutta larghezza (momento di scala) ——— */}
      <section className="bfx-section bfx-deal" aria-labelledby="bfx-deal-t">
        <div className="bfx-wrap">
          <div className="bfx-deal__head">
            <h2 id="bfx-deal-t" className="bfx-h bfx-h2">
              Cosa ottieni <span className="is-green">con le tue {VISITE} visite</span>
            </h2>
            <ul className="bfx-perks">
              {BENEFICI.map((x) => (
                <li key={x.t}>
                  <i className="bfx-perks__ok" aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                  </i>
                  <span>
                    <b>{x.t}</b>: {x.b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <MazzoVisite visite={VISITE} />
        </div>

        <div className="bfx-deal__price">
          <div className="bfx-wrap">
            <p className="bfx-deal__was">
              Di solito <s>{PREZZO_PIENO}€</s>
            </p>
          </div>
          <PrezzoGigante da={PREZZO_PIENO} a={PREZZO_OFFERTA} />
          <div className="bfx-wrap bfx-deal__facts">
            <p>
              <b>{PREZZO_OFFERTA / VISITE}€</b>
              <span>a visita invece di {PREZZO_VISITA}€</span>
            </p>
            <p>
              <b>{risparmio}€</b>
              <span>di risparmio</span>
            </p>
            <Countdown className="bfx-deal__count" />
          </div>
        </div>

        <div className="bfx-wrap">
          <OffertaCtas />
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
          <Scontrino />
        </div>
      </section>

      {/* ——— Perché dieci visite: un caso per ogni copione ——— */}
      <section className="bfx-section bfx-why" aria-labelledby="bfx-why-t">
        <div className="bfx-wrap">
          <h2 id="bfx-why-t" className="bfx-h bfx-h2 bfx-why__title">
            Dieci visite possono sembrare tante.{' '}
            <span className="is-dim">Ma c’è una cosa che forse nessuno ti ha mai spiegato.</span>
          </h2>

          <ol className="bfx-why__list">
            {PERCHE_DIECI.map((item, i) => (
              <li key={item.title} className={`bfx-scene ${i % 2 ? 'is-flip' : ''}`}>
                {fotoPerche[i] && (
                  <figure className="bfx-scene__img">
                    <ClImg src={fotoPerche[i]} alt="" sizes="(min-width: 1000px) 56vw, 100vw" />
                  </figure>
                )}
                <div className="bfx-scene__txt">
                  <span className="bfx-scene__n" aria-hidden="true">
                    {due(i + 1)}
                  </span>
                  <h3 className="bfx-h bfx-h3">{item.title}</h3>
                  <p className="bfx-body">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

        </div>
      </section>

      {/* ——— Cosa cambia: una visita a confronto con un percorso (la colonna del percorso è una carta che si accende) ——— */}
      <section className="bfx-section bfx-change" aria-labelledby="bfx-change-t">
        <div className="bfx-wrap">
          <div className="bfx-change__head">
            <h2 id="bfx-change-t" className="bfx-h bfx-h2">
              Dieci visite non sono un costo in più. <span className="is-green">Sono il percorso completo.</span>
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
              <span className="is-from">Una visita</span>
              <span className="is-to">Un percorso</span>
            </p>
            {CONFRONTO.map((r, i) => (
              <p key={r.da} className="bfx-vs__row" style={{ '--r': i + 2 }}>
                <span className="is-from">
                  <X className="bfx-vs__ico" size={16} strokeWidth={2} aria-hidden="true" />
                  <span>
                    <span className="bfx-sr">Una visita: </span>
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

          <OffertaCtas className="bfx-change__cta" />
        </div>
      </section>

      {/* ——— Come funziona: l'unica sezione panna (cambio di mondo), tre passi dal pagamento al percorso ——— */}
      <section className="bfx-section bfx-friend bfx-how" aria-labelledby="bfx-how-t">
        <div className="bfx-wrap">
          <div className="bfx-friend__head">
            <h2 id="bfx-how-t" className="bfx-h bfx-h2">
              Come funziona: <strong>tre passi, e inizi.</strong>
            </h2>
            <p className="bfx-lead">
              Tu paghi online. <strong>Al resto pensiamo noi.</strong>
            </p>
          </div>

          <ol className="bfx-friend__passes is-three">
            {PASSI_OFFERTA.map((p, i) => (
              <TiltPass key={p.title} as="li" className={`bfx-pass ${i === 0 ? 'is-you' : 'is-friend'}`}>
                <p className="bfx-pass__big" aria-hidden="true">
                  {due(i + 1)}
                </p>
                <h3 className="bfx-h bfx-h4">{p.title}</h3>
                <p className="bfx-body">{p.body}</p>
              </TiltPass>
            ))}
          </ol>

          <OffertaCtas tone="light" />
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
              ascoltano, ti visitano e trattano con le mani.
            </p>
          </div>
          <StudioCollage />
        </div>
      </section>

      {/* ——— Domande frequenti ——— */}
      <section className="bfx-section bfx-faq" aria-labelledby="bfx-faq-t">
        <div className="bfx-wrap bfx-faq__grid">
          <div className="bfx-faq__intro">
            <h2 id="bfx-faq-t" className="bfx-h bfx-h2">
              Tutto quello che ti serve sapere sull’offerta
            </h2>
            <p className="bfx-lead">Risposte semplici, senza giri di parole.</p>
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
            <OffertaCtas className="bfx-faq__cta" />
          </div>
        </div>
      </section>

      {/* ——— Dove siamo ——— */}
      <section className="bfx-section bfx-where" aria-labelledby="bfx-where-t">
        <div className="bfx-wrap">
          <div className="bfx-where__head">
            <div>
              <h2 id="bfx-where-t" className="bfx-h bfx-h2">
                Ci vediamo in studio <span className="is-green">nel cuore di Torino</span>
              </h2>
              <p className="bfx-lead">
                Abbiamo due studi: uno a San Donato, vicino alle fermate Bernini e Principi d’Acaja, e uno in Crocetta, vicino a
                Re Umberto. Scegli quello più comodo per te e tocca “Indicazioni” per arrivarci.
              </p>
            </div>
            <CityMap />
          </div>
          <div className="bfx-where__map">
            <StudiMap tema="notte" />
          </div>
        </div>
      </section>

      {/* Dock mobile: l'offerta sempre a portata di pollice */}
      <OffertaDock visible={showDock} />
    </PageShell>
  )
}
