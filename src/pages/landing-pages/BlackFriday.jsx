import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  CalendarClock,
  CalendarHeart,
  CheckCircle2,
  Gift,
  HeartHandshake,
  HelpCircle,
  MapPin,
  Plus,
  Sparkles,
  Tag,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import StudiMap from '../../components/studi-map/StudiMap'
import RecensioniDolore from '../../components/recensioni-tag/RecensioniDolore'
import { Kicker, MaskLines, Reveal, Snap } from '../../components/home-sections/HomeKit'
import { EASE, useParallax } from '../../components/home-sections/homeMotion'
import ClImg from '../../components/condition-landing/ClImg'
import { HeroMedia } from '../../components/condition-landing/Hero'
import { prefetchHeroVideo, useHeroVideo } from '../../components/condition-landing/heroVideo'
import CityMap from '../../components/landing/CityMap'
import StudioCollage from '../../components/landing/StudioCollage'
import FotoVentaglio from '../../components/landing/collage/FotoVentaglio'
import FotoDoppia from '../../components/landing/collage/FotoDoppia'
import { FOTO_STUDIO, creaSceltaFoto } from '../../data/fotoTrattamenti'
import '../../styles/pages/condition-landing.css'
import '../../styles/pages/cervicalgia.css'
import '../../components/landing/prima-visita-landing.css'
import '../../components/landing/visita-ctas.css'
import '../../styles/pages/black-friday.css'

// Landing dell'offerta Black Friday per chi è già paziente (arrivo dall'ad Meta recitato).
// Generica: tutti i dolori, nessun dolore specifico. Duplicata da /stitichezza (stessa grafica, classi mx-cerv-* e
// mx-pvl-*), ma con le sezioni dell'offerta: 10 visite a metà prezzo, "porta un amico" e scadenza.
// Le parti nuove hanno il prefisso mx-bf- (styles/pages/black-friday.css).

const SLUG = 'black-friday'

// ——— Offerta (se cambia, cambia anche nei testi e nella SEO di questa pagina) ———
const VISITE = 10
const PREZZO_PIENO = 900
const PREZZO_OFFERTA = 450
const PREZZO_VISITA = 90
const PRIMA_VISITA_AMICO = 49
// Fine dell'offerta: domenica 29 novembre 2026, a mezzanotte (ora italiana)
const SCADENZA = new Date('2026-11-29T23:59:59+01:00')
const SCADENZA_TESTO = 'domenica 29 novembre'

// ——— Percorso dei bottoni: ancora da definire ———
// Quando si decide dove portano (popup, form, WhatsApp, calendario...), si collegano qui: tutti i bottoni della
// pagina (apertura, sezioni, barra in basso su telefono) chiamano queste due funzioni.
const riservaVisite = () => {}
const portaUnAmico = () => {}

// Video dell'apertura dal gestionale (codice stabile, non l'UID Cloudflare). Finché non c'è, l'apertura mostra la foto.
// Con audio come l'ad: parte muto e la pillola «Tocca per ascoltare» lo fa ripartire con l'audio.
const heroVideo = prefetchHeroVideo('BLACK_FRIDAY_VSL')

const IMMAGINI = {
  hero: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
  band: '/trattamenti/schiena_lombare-prono_03_orizzontale',
  perche: '/trattamenti/anca_flessa-supino_07_orizzontale',
}

// La valutazione in piedi, come nelle landing della prima visita
const FOTO_VALUTAZIONE = '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale'

// ——— Contenuti ———

const PERCHE_DIECI = [
  {
    icon: CalendarClock,
    title: 'Se hai avuto male per tanto tempo',
    body: 'Il corpo impara a stare teso. Diventa un’abitudine, e un’abitudine non la cambi in un giorno: servono visite, una dopo l’altra.',
  },
  {
    icon: AlertTriangle,
    title: 'Se invece oggi stai bene',
    body: 'Lavoro, sedia, stress, sport: la vita di tutti i giorni può far tornare il dolore. E spesso più forte di prima.',
  },
]

const PASSI_PERCORSO = [
  {
    k: '01',
    t: 'Sciogliere la tensione',
    b: 'Le prime visite lavorano sul dolore e sulla tensione che il corpo si porta dietro da tempo.',
  },
  {
    k: '02',
    t: 'Cambiare l’abitudine',
    b: 'Il corpo impara un nuovo modo di stare, più libero e meno rigido. Come ogni abitudine, serve ripetere.',
  },
  {
    k: '03',
    t: 'Non far tornare il dolore',
    b: 'Le ultime visite mantengono il risultato e ti proteggono dalle ricadute. Il tuo osteopata ti dice come distribuirle, in base a come stai.',
  },
]

const COSA_CAMBIA = [
  <>
    Lavorare sulla <strong>causa</strong>, non solo su dove fa male
  </>,
  <>
    Dare al corpo il <strong>tempo</strong> di cambiare abitudine
  </>,
  <>
    <strong>Prevenire</strong> le ricadute, invece di rincorrere il dolore
  </>,
  <>
    Un percorso <strong>continuo</strong>, non visite sparse quando non ce la fai più
  </>,
  <>
    Tutto il percorso a <strong>metà prezzo</strong>: {PREZZO_OFFERTA / VISITE}€ a visita
  </>,
]

// "Qualunque sia il suo problema": i problemi che trattiamo (le landing dei dolori)
const PROBLEMI = [
  'Mal di schiena',
  'Cervicalgia',
  'Sciatalgia',
  'Ernia del disco',
  'Emicrania',
  'Vertigini',
  'Bruxismo',
  'Acufeni',
  'Reflusso',
  'Stitichezza',
  'Colon irritabile',
  'Fibromialgia',
  'Tendinite',
  'Tunnel carpale',
  'Fascite plantare',
  'Scoliosi',
  'Ciclo doloroso',
  'Menopausa',
]

const RIEPILOGO = [
  {
    title: `${VISITE} visite a ${PREZZO_OFFERTA}€`,
    body: `Invece di ${PREZZO_PIENO}€: metà prezzo, ${PREZZO_OFFERTA / VISITE}€ a visita.`,
  },
  {
    title: 'Porti un amico? Una visita gratis per te',
    body: `Oltre alle tue ${VISITE}.`,
  },
  {
    title: `Il tuo amico paga la prima visita ${PRIMA_VISITA_AMICO}€`,
    body: `Invece di ${PREZZO_VISITA}€, qualunque sia il suo problema.`,
  },
  {
    title: `Valida fino a ${SCADENZA_TESTO}`,
    body: 'Dopo, l’offerta Black Friday non è più disponibile.',
  },
]

const FAQ = [
  {
    icon: Users,
    question: (
      <>
        Chi può usare l’<strong>offerta</strong>?
      </>
    ),
    answer: (
      <>
        È pensata per chi è <strong>già nostro paziente</strong>. Se non sei mai venuto da noi, puoi venire con un amico che
        è già paziente: per te la prima visita costa <strong>49€ invece di 90€</strong>.
      </>
    ),
  },
  {
    icon: CalendarHeart,
    question: (
      <>
        Fino a <strong>quando</strong> posso prenderla?
      </>
    ),
    answer: (
      <>
        Fino a <strong>{SCADENZA_TESTO}</strong>. Dopo questa data l’offerta Black Friday non è più disponibile.
      </>
    ),
  },
  {
    icon: Banknote,
    question: (
      <>
        Quanto <strong>risparmio</strong> davvero?
      </>
    ),
    answer: (
      <>
        Dieci visite di solito costano <strong>{PREZZO_PIENO}€</strong>. Con il Black Friday le paghi{' '}
        <strong>{PREZZO_OFFERTA}€</strong>: <strong>{PREZZO_OFFERTA / VISITE}€ a visita</strong> invece di {PREZZO_VISITA}€.
        Risparmi {PREZZO_PIENO - PREZZO_OFFERTA}€, la metà.
      </>
    ),
  },
  {
    icon: HelpCircle,
    question: (
      <>
        Dieci visite non sono <strong>troppe</strong>?
      </>
    ),
    answer: (
      <>
        Possono sembrare tante. Ma se hai avuto male per tanto tempo, il corpo ha imparato a <strong>stare teso</strong> e non
        cambia in un giorno. E se oggi stai bene, la vita di tutti i giorni può far <strong>tornare il dolore</strong>, spesso
        più forte. Dieci visite sono il tempo per cambiare l’abitudine e non farlo tornare.
      </>
    ),
  },
  {
    icon: UserPlus,
    question: (
      <>
        Come funziona <strong>“porta un amico”</strong>?
      </>
    ),
    answer: (
      <>
        Porta da noi un amico, un familiare o un collega. Lui paga la sua prima visita{' '}
        <strong>
          {PRIMA_VISITA_AMICO}€ invece di {PREZZO_VISITA}€
        </strong>
        , e tu ricevi <strong>una visita gratis</strong>, oltre alle tue {VISITE}.
      </>
    ),
  },
  {
    icon: HeartHandshake,
    question: (
      <>
        Il mio amico ha un <strong>problema diverso</strong> dal mio: va bene?
      </>
    ),
    answer: (
      <>
        Sì. Qualunque sia il suo problema, da noi c’è l’<strong>osteopata specializzato</strong> anche per lui: scegliamo il
        professionista con più esperienza nel suo caso.
      </>
    ),
  },
  {
    icon: MapPin,
    question: 'Dove si fanno le visite?',
    answer: (
      <>
        Nei nostri <strong>due studi a Torino</strong>: in <strong>Via Peyron 54</strong> (San Donato) e in{' '}
        <strong>Via Lamarmora 35</strong> (Crocetta). Ci arrivi comodo in metro (fermate Bernini per Via Peyron, Re Umberto per
        Via Lamarmora) e in auto.
      </>
    ),
  },
]

const SEO = {
  path: '/black-friday',
  title: 'Black Friday Mobilitas | 10 visite osteopatiche a metà prezzo | Torino',
  description:
    'Black Friday per i pazienti Mobilitas: 10 visite osteopatiche a 450€ invece di 900€. Porta un amico: per te una visita gratis, per lui la prima visita a 49€. Fino a domenica 29 novembre.',
  ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_02_orizzontale.jpg',
  ogImageAlt: 'Trattamento osteopatico nello studio Mobilitas di Torino',
}

// ——— Pezzi della pagina ———

// SEO dell'offerta: titolo, descrizione, Open Graph e canonical. Pagina a tempo e per chi arriva dall'ad:
// noindex, così non resta su Google dopo la scadenza. Alla chiusura rimette i valori di prima.
function useSeoOfferta(seo) {
  useEffect(() => {
    const origin = window.location.origin
    const prima = []
    const imposta = (attr, key, content) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
      }
      prima.push([tag, tag.getAttribute('content')])
      tag.setAttribute('content', content)
    }
    const titoloPrima = document.title
    document.title = seo.title
    imposta('name', 'description', seo.description)
    imposta('name', 'robots', 'noindex, follow')
    imposta('property', 'og:title', seo.title)
    imposta('property', 'og:description', seo.description)
    imposta('property', 'og:type', 'website')
    imposta('property', 'og:url', `${origin}${seo.path}`)
    imposta('property', 'og:image', `${origin}${seo.ogImage}`)
    imposta('property', 'og:image:alt', seo.ogImageAlt)
    imposta('property', 'og:locale', 'it_IT')
    imposta('name', 'twitter:card', 'summary_large_image')
    imposta('name', 'twitter:title', seo.title)
    imposta('name', 'twitter:description', seo.description)
    imposta('name', 'twitter:image', `${origin}${seo.ogImage}`)

    let canonical = document.querySelector('link[rel="canonical"]')
    const canonicalPrima = canonical?.getAttribute('href')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${origin}${seo.path}`)

    return () => {
      document.title = titoloPrima
      prima.forEach(([tag, content]) => (content == null ? tag.remove() : tag.setAttribute('content', content)))
      if (canonicalPrima) canonical.setAttribute('href', canonicalPrima)
      else canonical.remove()
    }
  }, [seo])
}

// Tempo che manca alla scadenza, aggiornato ogni secondo (null = offerta finita)
function useMancano(scadenza) {
  const calcola = () => {
    const ms = scadenza.getTime() - Date.now()
    if (ms <= 0) return null
    const s = Math.floor(ms / 1000)
    return { giorni: Math.floor(s / 86400), ore: Math.floor((s % 86400) / 3600), min: Math.floor((s % 3600) / 60), sec: s % 60 }
  }
  const [mancano, setMancano] = useState(calcola)
  useEffect(() => {
    const timer = window.setInterval(() => setMancano(calcola()), 1000)
    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scadenza])
  return mancano
}

const due = (n) => String(n).padStart(2, '0')

function ContoAllaRovescia({ className = '' }) {
  const mancano = useMancano(SCADENZA)
  if (!mancano) {
    return (
      <p className={`mx-bf-count is-over ${className}`}>
        <CalendarClock size={16} strokeWidth={2.4} aria-hidden="true" />
        L’offerta Black Friday è terminata
      </p>
    )
  }
  const parti = [
    [mancano.giorni, mancano.giorni === 1 ? 'giorno' : 'giorni'],
    [due(mancano.ore), 'ore'],
    [due(mancano.min), 'min'],
    [due(mancano.sec), 'sec'],
  ]
  return (
    <div className={`mx-bf-count ${className}`} role="timer" aria-label={`Mancano ${mancano.giorni} giorni e ${mancano.ore} ore alla fine dell’offerta`}>
      <span className="mx-bf-count__lbl">
        <CalendarClock size={15} strokeWidth={2.4} aria-hidden="true" />
        Fino a {SCADENZA_TESTO}
      </span>
      <span className="mx-bf-count__time" aria-hidden="true">
        {parti.map(([v, u]) => (
          <span key={u} className="mx-bf-count__unit">
            <b>{v}</b>
            <small>{u}</small>
          </span>
        ))}
      </span>
    </div>
  )
}

// Bottoni dell'offerta (stessa grafica dei bottoni della prima visita, visita-ctas.css)
function OffertaCtas({ className = '' }) {
  return (
    <div className={`mx-ctas mx-vc-ctas ${className}`}>
      <button type="button" className="mx-btn mx-btn--primary mx-vc-btn mx-vc-btn--main" onClick={riservaVisite}>
        <span className="mx-vc-btn__label">
          <small>
            Black Friday · <s>{PREZZO_PIENO}€</s> {PREZZO_OFFERTA}€
          </small>
          Riserva le tue {VISITE} visite
        </span>
        <span className="mx-btn__icon">
          <Gift size={20} strokeWidth={2.4} />
        </span>
      </button>
      <button type="button" className="mx-btn mx-btn--ghost mx-vc-btn mx-vc-btn--sub" onClick={portaUnAmico}>
        <span className="mx-vc-btn__label">Porta un amico</span>
        <span className="mx-btn__icon">
          <UserPlus size={18} strokeWidth={2.4} />
        </span>
      </button>
    </div>
  )
}

// Barra fissa in basso su telefono (stessa della prima visita, nascosta da 1024px)
function OffertaDock({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="mx-vc-dock mx-bf-dock"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <button
            type="button"
            className="mx-vc-dock__btn is-primary"
            onClick={riservaVisite}
            aria-label={`Riserva le ${VISITE} visite del Black Friday a ${PREZZO_OFFERTA}€ invece di ${PREZZO_PIENO}€`}
          >
            <span className="mx-vc-dock__price" aria-hidden="true">
              <s>{PREZZO_PIENO}€</s>
              <b>{PREZZO_OFFERTA}€</b>
            </span>
            <span className="mx-vc-dock__txt">
              <small>{VISITE} visite</small>
              Riserva ora
            </span>
            <ArrowRight size={18} strokeWidth={2.6} className="mx-vc-dock__arrow" aria-hidden="true" />
          </button>
          <button type="button" className="mx-vc-dock__btn is-ghost" onClick={portaUnAmico} aria-label="Porta un amico">
            <UserPlus size={17} strokeWidth={2.4} />
            <small>Amico</small>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Titolo a due righe { main, accent } con l'effetto delle sezioni della cervicalgia
const Titolo = ({ title, className = 'mx-h mx-h--lg' }) => (
  <h2 className={className}>
    <MaskLines lines={[{ text: title.main }, ...(title.accent ? [{ text: title.accent, className: 'mx-gradient' }] : [])]} />
  </h2>
)

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
  const fotoPercorso = [{ src: prendi(IMMAGINI.perche) }, { src: prendi(undefined, true) }].filter((f) => f.src)
  const fotoAmico = Array.from({ length: 6 }, () => prendi()).filter(Boolean).map((src) => ({ src }))
  const fotoFaq = [prendi(undefined, true), prendi(undefined, true)].filter(Boolean).map((src) => ({ src }))

  const ctas = <OffertaCtas />
  const risparmio = PREZZO_PIENO - PREZZO_OFFERTA

  return (
    <PageShell className={`mx-cerv mx-pvl mx-bf mx-pvl--${SLUG}`}>
      {/* ——— Apertura ——— */}
      <header className="mx-cerv-hero">
        <div className="mx-cerv-hero__rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mx-wrap mx-cerv-hero__grid">
          <motion.div
            className="mx-cerv-hero__badge"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Sparkles size={15} strokeWidth={2.4} />
            Black Friday · Per i nostri pazienti
          </motion.div>

          <h1 className="mx-h mx-cerv-hero__title">
            <motion.span
              className="mx-cerv-hero__mission"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
            >
              Dieci visite, ne paghi solo cinque.
            </motion.span>
            <br />
            <motion.span
              className="mx-cerv-hero__promise mx-accent"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            >
              Le altre cinque sono in omaggio.
            </motion.span>
          </h1>

          <motion.div
            className="mx-cerv-hero__media"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          >
            <HeroMedia
              video={video}
              loading={loading}
              videoTitle="Black Friday Mobilitas: 10 visite a metà prezzo"
              audio
              fallback={{ src: fotoHero, alt: 'Trattamento osteopatico nello studio Mobilitas' }}
            />
            <span className="mx-cerv-hero__arc" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="mx-cerv-hero__offer mx-bf-hero__offer"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <p className="mx-cerv-offer">
              <span className="mx-cerv-offer__seats">{VISITE} visite</span>
              <span className="mx-cerv-offer__lbl">a metà prezzo</span>
              <span className="mx-cerv-offer__price">
                <s>{PREZZO_PIENO}€</s>
                <b>{PREZZO_OFFERTA}€</b>
              </span>
            </p>
            <ContoAllaRovescia />
          </motion.div>

          <motion.div
            className="mx-cerv-hero__ctas"
            ref={heroCtaRef}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.38 }}
          >
            {ctas}
          </motion.div>

          <motion.p
            className="mx-lead mx-cerv-hero__sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          >
            Sei già un nostro paziente, e per il Black Friday abbiamo pensato a te: un percorso di{' '}
            <strong>{VISITE} visite</strong> a <strong>metà prezzo</strong>, per togliere il dolore e{' '}
            <strong>non farlo tornare</strong>. E se porti un amico, per te c’è <strong>una visita in più, gratis</strong>.
          </motion.p>
        </div>
      </header>

      {/* ——— Recensioni (generiche: l'offerta vale per tutti i dolori) ——— */}
      <section className="mx-section mx-section--deep mx-cerv-proof">
        <RecensioniDolore dolore={null} />
        <div className="mx-wrap">
          <Reveal>
            <p className="mx-lead mx-pvl-closing">
              Sono persone come te, che hanno scelto di <strong>non fermarsi</strong> alla prima visita. Con {VISITE} visite a{' '}
              <strong>metà prezzo</strong>, questo è il momento giusto per fare lo stesso.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ——— L'offerta: 5 visite pagate + 5 in omaggio, prezzo pieno e prezzo Black Friday ——— */}
      <section className="mx-section mx-section--glow mx-bf-offer">
        <div className="mx-wrap">
          <div className="mx-pvl-head">
            <Kicker>L’offerta Black Friday</Kicker>
            <Titolo title={{ main: `${VISITE} visite a ${PREZZO_OFFERTA}€.`, accent: 'La metà del prezzo.' }} />
            <Reveal>
              <p className="mx-lead mx-pvl-intro">
                Di solito {VISITE} visite costano <strong>{PREZZO_PIENO}€</strong>. Per il Black Friday ne paghi solo cinque: le
                altre cinque sono <strong>in omaggio</strong>.
              </p>
            </Reveal>
          </div>

          <div className="mx-bf-offer__grid">
            <Reveal className="mx-bf-tokens">
              <ol className="mx-bf-tokens__list" aria-label={`${VISITE} visite: 5 pagate e 5 in omaggio`}>
                {Array.from({ length: VISITE }, (_, i) => {
                  const omaggio = i >= VISITE / 2
                  return (
                    <motion.li
                      key={i}
                      className={`mx-bf-token ${omaggio ? 'is-gift' : ''}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-10% 0px' }}
                      transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                    >
                      <span className="mx-bf-token__n">{due(i + 1)}</span>
                      {omaggio ? <Gift size={20} strokeWidth={2.2} aria-hidden="true" /> : <CheckCircle2 size={20} strokeWidth={2.2} aria-hidden="true" />}
                      <small>{omaggio ? 'Omaggio' : 'Paghi'}</small>
                    </motion.li>
                  )
                })}
              </ol>
              <p className="mx-bf-tokens__legend">
                <span>
                  <i className="is-paid" aria-hidden="true" /> 5 visite pagate
                </span>
                <span>
                  <i className="is-gift" aria-hidden="true" /> 5 visite in omaggio
                </span>
              </p>
            </Reveal>

            <Reveal className="mx-bf-price" delay={0.1}>
              <div className="mx-bf-price__row">
                <span className="mx-bf-price__lbl">Di solito</span>
                <s className="mx-bf-price__old">{PREZZO_PIENO}€</s>
              </div>
              <div className="mx-bf-price__row is-main">
                <span className="mx-bf-price__lbl">
                  <Tag size={16} strokeWidth={2.4} aria-hidden="true" />
                  Black Friday
                </span>
                <b className="mx-bf-price__new">{PREZZO_OFFERTA}€</b>
              </div>
              <ul className="mx-bf-price__facts">
                <li>
                  <b>{PREZZO_OFFERTA / VISITE}€</b> a visita invece di {PREZZO_VISITA}€
                </li>
                <li>
                  <b>{risparmio}€</b> di risparmio
                </li>
              </ul>
              <ContoAllaRovescia className="mx-bf-price__count" />
            </Reveal>
          </div>
          {ctas}
        </div>
      </section>

      {/* ——— Perché dieci visite (il "Ti riconosci?" della stitichezza) ——— */}
      <section className="mx-section mx-section--deep mx-cerv-pain">
        <div className="mx-wrap">
          <Kicker>Perché dieci visite</Kicker>
          <h2 className="mx-h mx-h--lg mx-cerv-pain__title">
            Dieci visite possono sembrare tante.
            <br />
            <span className="mx-cerv-pain__hit">Ma c’è una cosa che forse nessuno ti ha mai spiegato.</span>
          </h2>

          <Snap as="ol" className="mx-cerv-pains mx-bf-pains">
            {PERCHE_DIECI.map((item, i) => {
              const src = fotoPerche[i]
              return (
                <li key={item.title} className="mx-cerv-painc">
                  <div className="mx-cerv-painc__img">
                    {src ? (
                      <ClImg src={src} alt="" sizes="(min-width: 900px) 40vw, 84vw" />
                    ) : (
                      <span className="mx-pvl-painc__icon" aria-hidden="true">
                        <item.icon size={56} strokeWidth={1.4} />
                      </span>
                    )}
                    <span className="mx-cerv-painc__n">{due(i + 1)}</span>
                  </div>
                  <h3 className="mx-h mx-h--sm">{item.title}</h3>
                  <p className="mx-body">{item.body}</p>
                </li>
              )
            })}
          </Snap>

          {/* Come si usano le dieci visite: spiegazione, passaggi e foto */}
          <div className="mx-cerv-agitate">
            <Reveal className="mx-cerv-agitate__copy">
              <p className="mx-cerv-agitate__label">
                <span aria-hidden="true">
                  <Sparkles size={16} strokeWidth={2.4} />
                </span>
                Perché un percorso
              </p>
              <h3 className="mx-h mx-h--md mx-cerv-agitate__title">
                Non è una visita in più.
                <br />
                <span className="mx-cerv-escalate">È il tempo che serve al corpo per cambiare.</span>
              </h3>
              <div className="mx-cerv-agitate__text">
                <p className="mx-body">
                  Una visita toglie il dolore di oggi. Un <strong>percorso</strong> cambia il modo in cui il corpo sta, e lo
                  protegge da quello di domani. Per questo le visite sono dieci.
                </p>
              </div>
              <ol className="mx-pvl-steps">
                {PASSI_PERCORSO.map((s) => (
                  <li key={s.k}>
                    <span className="mx-pvl-steps__n">{s.k}</span>
                    <span>
                      <b>{s.t}</b>
                      {s.b}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
            {fotoPercorso.length > 1 ? (
              <FotoDoppia foto={fotoPercorso} className="mx-pvl-agitate__photos" />
            ) : (
              fotoPercorso[0] && (
                <Reveal className="mx-cerv-photo mx-cerv-agitate__photo" delay={0.1}>
                  <ClImg src={fotoPercorso[0].src} alt="" sizes="(min-width: 1000px) 520px, 92vw" />
                </Reveal>
              )
            )}
          </div>
          {ctas}
        </div>
      </section>

      {/* ——— Cosa cambia: foto + risultati numerati ——— */}
      <section className="mx-section mx-section--glow mx-cerv-benefits">
        <div className="mx-wrap">
          <div className="mx-cerv-ben__head">
            <Kicker>Cosa cambia con un percorso</Kicker>
            <Titolo title={{ main: 'Dieci visite non sono un costo in più.', accent: 'Sono il percorso completo.' }} />
          </div>
          <Reveal className="mx-cerv-ben">
            <div className="mx-cerv-ben__photo" ref={benRef}>
              <motion.div style={{ y: benY, height: '100%' }}>
                {fotoBen && <ClImg src={fotoBen} alt="" sizes="(min-width: 1000px) 440px, 92vw" />}
              </motion.div>
              <span className="mx-cerv-ben__tag">
                <span>Una visita</span>
                <ArrowRight size={14} aria-hidden="true" />
                <b>Un percorso</b>
              </span>
            </div>
            <ol className="mx-cerv-ben__list mx-pvl-ben__list">
              {COSA_CAMBIA.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-12% 0px' }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                >
                  <span className="mx-cerv-ben__n" aria-hidden="true">
                    {due(i + 1)}
                  </span>
                  <span className="mx-pvl-ben__txt">{r}</span>
                </motion.li>
              ))}
            </ol>
          </Reveal>
        </div>
        <div className="mx-wrap">{ctas}</div>
      </section>

      {/* ——— Porta un amico ——— */}
      <section className="mx-section mx-section--deep mx-bf-friend">
        <div className="mx-wrap">
          <div className="mx-pvl-head">
            <Kicker>Porta un amico</Kicker>
            <Titolo title={{ main: 'E adesso,', accent: 'la parte che preferisco.' }} />
            <Reveal>
              <p className="mx-lead mx-pvl-intro">
                Hai un amico, un familiare o un collega che ha male da qualche parte? <strong>Portalo da noi</strong>: ci
                guadagnate tutti e due.
              </p>
            </Reveal>
          </div>

          <div className="mx-bf-friend__cards">
            <Reveal as="article" className="mx-bf-gift is-you">
              <span className="mx-bf-gift__who">
                <Gift size={16} strokeWidth={2.4} aria-hidden="true" />
                Per te
              </span>
              <p className="mx-bf-gift__big">+1</p>
              <h3 className="mx-h mx-h--sm">Una visita gratis, oltre alle tue {VISITE}</h3>
              <p className="mx-body">
                {VISITE + 1} visite in tutto, sempre a {PREZZO_OFFERTA}€.
              </p>
            </Reveal>
            <Reveal as="article" className="mx-bf-gift is-friend" delay={0.1}>
              <span className="mx-bf-gift__who">
                <UserPlus size={16} strokeWidth={2.4} aria-hidden="true" />
                Per il tuo amico
              </span>
              <p className="mx-bf-gift__big">
                <s>{PREZZO_VISITA}€</s> {PRIMA_VISITA_AMICO}€
              </p>
              <h3 className="mx-h mx-h--sm">La sua prima visita a {PRIMA_VISITA_AMICO}€</h3>
              <p className="mx-body">Qualunque sia il suo problema, da noi c’è l’osteopata specializzato anche per lui.</p>
            </Reveal>
          </div>

          {fotoAmico.length === 6 && <FotoVentaglio foto={fotoAmico} className="mx-bf-friend__photos" />}

          <Reveal className="mx-bf-problems">
            <p className="mx-bf-problems__t">Qualunque sia il suo problema, per esempio:</p>
            <ul className="mx-bf-problems__list">
              {PROBLEMI.map((p) => (
                <li key={p}>{p}</li>
              ))}
              <li className="is-more">e molto altro</li>
            </ul>
          </Reveal>
          {ctas}
        </div>
      </section>

      {/* ——— Riepilogo dell'offerta ——— */}
      <section className="mx-section mx-section--glow mx-cerv-roads mx-pvl-visit mx-bf-recap">
        <div className="mx-wrap">
          <Kicker>Quindi</Kicker>
          <Titolo title={{ main: 'Tutta l’offerta', accent: 'in un colpo d’occhio' }} />
          <div className="mx-pvl-visit__grid">
            <Reveal className="mx-cerv-photo mx-pvl-visit__photos" delay={0.1}>
              <ClImg
                src={FOTO_VALUTAZIONE}
                alt="L’osteopata valuta la postura del paziente in piedi"
                sizes="(min-width: 1000px) 420px, 92vw"
                style={{ objectPosition: '42% 35%' }}
              />
            </Reveal>
            <Reveal>
              <article className="mx-panel mx-panel--yes mx-cerv-road is-b mx-pvl-visit__panel">
                <div className="mx-panel__head">
                  <span className="mx-panel__badge">
                    <CheckCircle2 size={24} />
                  </span>
                  <div>
                    <p className="mx-cerv-road__tag">Black Friday · Per i nostri pazienti</p>
                    <h3 className="mx-h mx-h--md">Cosa ricevi</h3>
                  </div>
                </div>
                <ul className="mx-list">
                  {RIEPILOGO.map((s, i) => (
                    <li key={s.title}>
                      <span className="mx-list__n">{due(i + 1)}</span>
                      <span className="mx-list__t">
                        {s.title}
                        <span className="mx-list__d">{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <ContoAllaRovescia className="mx-bf-recap__count" />
              </article>
            </Reveal>
          </div>
          {ctas}
        </div>
      </section>

      {/* ——— Chi ti tratta ——— */}
      <section className="mx-section mx-section--deep mx-pvl-team">
        <div className="mx-wrap mx-pvl-team__grid">
          <div className="mx-pvl-team__copy">
            <span className="mx-pvl-team__icon" aria-hidden="true">
              <UserCheck size={26} />
            </span>
            <Kicker>Chi ti tratta</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Lo stesso metodo' }, { text: 'che conosci già', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-pvl-intro">
                Sei già stato da noi: sai come lavoriamo. Tutti i nostri osteopati usano lo <strong>stesso metodo</strong>:
                ascoltano, ti visitano e trattano con le mani. E per il tuo amico scegliamo l’osteopata con{' '}
                <strong>più esperienza</strong> nel suo problema.
              </p>
            </Reveal>
          </div>
          <StudioCollage />
        </div>
      </section>

      {/* ——— Domande frequenti ——— */}
      <section className="mx-section mx-section--glow mx-cerv-faq">
        <div className="mx-wrap mx-cerv-faq__grid">
          <div className="mx-cerv-faq__intro">
            <Kicker>Domande frequenti</Kicker>
            <h2 className="mx-h mx-h--lg">Tutto quello che ti serve sapere sull’offerta</h2>
            <p className="mx-lead mx-cerv-faq__lead">Risposte semplici, senza giri di parole.</p>
            {fotoFaq.length === 2 && <FotoDoppia foto={fotoFaq} className="mx-pvl-faq__photos" />}
          </div>
          <div>
            <ul className="mx-cerv-faq__list">
              {FAQ.map((item, index) => {
                const Icon = item.icon
                const isOpen = openFaq === index
                return (
                  <li key={index} className={`mx-cerv-faq__item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="mx-cerv-faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`mx-bf-faq-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span className="mx-cerv-faq__icon" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <span className="mx-cerv-faq__qt">{item.question}</span>
                      <span className="mx-cerv-faq__plus" aria-hidden="true">
                        <Plus size={18} strokeWidth={2.4} />
                      </span>
                    </button>
                    <div className="mx-cerv-faq__a" id={`mx-bf-faq-${index}`} role="region">
                      <div>
                        <p className="mx-body">{item.answer}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="mx-body mx-pvl-faq__closing">
              Dieci visite a {PREZZO_OFFERTA}€ e, se porti un amico, una visita gratis per te.{' '}
              <strong>Riserva le tue {VISITE} visite a metà prezzo</strong> entro {SCADENZA_TESTO}: ci vediamo in studio da
              Mobilitas!
            </p>
          </div>
        </div>
      </section>

      {/* ——— Dove siamo ——— */}
      <section className="mx-section mx-section--deep mx-cerv-where">
        <div className="mx-wrap">
          <div className="mx-pvl-where__head">
            <div>
              <Kicker>Dove siamo</Kicker>
              <h2 className="mx-h mx-h--lg">
                <MaskLines lines={[{ text: 'Ci vediamo in studio' }, { text: 'nel cuore di Torino', className: 'mx-gradient' }]} />
              </h2>
              <p className="mx-lead mx-pvl-intro">
                Abbiamo due studi: uno a San Donato, vicino alle fermate Bernini e Principi d’Acaja, e uno in Crocetta, vicino a
                Re Umberto. Scegli quello più comodo per te e tocca “Indicazioni” per arrivarci.
              </p>
            </div>
            <Reveal delay={0.1}>
              <CityMap />
            </Reveal>
          </div>
          <Reveal className="mx-cerv-where__map" delay={0.1}>
            <StudiMap />
          </Reveal>
        </div>
        <div className="mx-wrap">{ctas}</div>
      </section>

      {/* Dock mobile: l'offerta sempre a portata di pollice */}
      <OffertaDock visible={showDock} />
    </PageShell>
  )
}
