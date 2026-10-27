import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  AlertTriangle,
  Wind,
  Move,
  Brain,
  Moon,
  Monitor,
  Lightbulb,
  Layers,
  Activity,
  ShieldCheck,
  XCircle,
  Pill,
  Laptop,
  Hand,
  Search,
  Gauge,
  Target,
  Plus,
  Check,
  X,
} from 'lucide-react'
import BookingPopup from '../../components/BookingPopup'
import StudiMap from '../../components/studi-map/StudiMap'
import WhatsAppFab from '../../components/whatsapp/WhatsAppFab'
import PageShell from '../../components/site/PageShell'
import { Kicker, MaskLines, Reveal, Snap } from '../../components/home-sections/HomeKit'
import { EASE, useParallax } from '../../components/home-sections/homeMotion'
import CervDial from '../../components/cervicalgia/CervDial'
import RecensioniTag from '../../components/recensioni-tag/RecensioniTag'
import { VisitaCtas, VisitaDock } from '../../components/landing/VisitaCtas'
import StudioCollage from '../../components/landing/StudioCollage'
import { DOLORI } from '../../data/dolori'
import { FAQ_PRIMA_VISITA as FAQ_ITEMS } from '../../data/faqPrimaVisita'
import '../../styles/pages/cervicalgia.css'

// Concetto: "Il raggio di rotazione". Il dolore cervicale si misura in quanto
// riesci a girare la testa: la pagina mostra la testa vista dall'alto con il
// ventaglio del movimento possibile, che scorrendo passa da stretto e rosso
// (collo bloccato) ad ampio e verde (collo libero).

// Benefici come "prima → dopo": il problema barrato, il risultato in grande.
// Recensioni del carosello: tag dolore del gestionale e parole evidenziate (le stesse della pagina di conferma)
const { tags: TAG_RECENSIONI, parole: PAROLE_DOLORE } = DOLORI.cervicalgia

const BENEFITS = [
  { prima: 'Collo bloccato al mattino', dopo: 'Ti svegli sciolto' },
  { prima: 'Fitte quando giri la testa', dopo: 'La testa gira libera' },
  { prima: 'Mal di testa che parte dal collo', dopo: 'Testa leggera' },
  { prima: 'Collo duro al computer', dopo: 'Lavori tranquillo' },
  { prima: 'Notti a cercare la posizione', dopo: 'Dormi tutta la notte' },
  { prima: 'Testa pesante tutto il giorno', dopo: 'Collo libero' },
]

// Foto delle card "dolore": nome del file in public/trattamenti/web e posizione del ritaglio
const PAIN_IMAGES = [
  { nome: 'collo_presa-cervicale-supino_18_orizzontale', pos: '18% 50%' },
  { nome: 'collo_allungamento-cervicale-supino_02_orizzontale', pos: '50% 50%' },
  { nome: 'collo_cervicale-e-spalle-supino_02_orizzontale', pos: '0% 50%' },
  { nome: 'collo_presa-cervicale-supino_08_orizzontale', pos: '50% 50%' },
  { nome: 'collo_presa-cervicale-supino_25_orizzontale', pos: '12% 50%' },
  { nome: 'atm_presa-mandibolare-esterna_01_orizzontale', pos: '50% 50%' },
  { nome: 'collo_presa-cervicale-supino_30_orizzontale', pos: '20% 50%' },
  { nome: 'atm_mandibola-con-guanto_02_orizzontale', pos: '50% 50%' },
]

const FOTO_HERO = 'collo_presa-cervicale-supino_26_orizzontale'
const FOTO_BENEFICI = 'collo_presa-cervicale-supino_19_orizzontale'
const FOTO_AGITATE = 'collo_cervicale-e-spalle-supino_04_orizzontale'
const FOTO_FAQ = 'collo_presa-cervicale-supino_14_orizzontale'
// Foto dentro il carosello dei cambiamenti: dopo la scheda indicata da "dopo" (su desktop occupano due colonne)
const FOTO_CAMBIAMENTI = [
  {
    dopo: 2,
    nome: 'collo_presa-cervicale-supino_17_orizzontale',
    pos: '30% 50%',
    etichetta: 'Trattamento osteopatico',
    testo: 'Solo con le mani, senza macchinari',
    alt: 'Osteopata Mobilitas tratta il collo del paziente con le mani',
  },
  {
    dopo: 6,
    nome: 'spalla_scapola-decubito-laterale_05_orizzontale',
    pos: '50% 60%',
    etichetta: 'Su misura',
    testo: 'Ogni seduta è pensata per te',
    alt: 'Trattamento osteopatico di spalla e scapola su paziente sdraiata sul fianco',
  },
]

// Mosaico della Strada B: valutazione, trattamento, mani sul collo (la Strada A resta senza foto, per contrasto)
const FOTO_STRADA_B = [
  { nome: 'spalla_valutazione-in-piedi_01_orizzontale', pos: '42% 35%', etichetta: 'Valutazione', alt: "L'osteopata valuta postura e spalle del paziente in piedi" },
  { nome: 'collo_presa-cervicale-supino_09_orizzontale', pos: '40% 50%', etichetta: 'Trattamento', alt: 'Trattamento osteopatico del collo con le mani' },
  { nome: 'collo_presa-cervicale-supino_31_orizzontale', pos: '30% 50%', etichetta: 'Con le mani', alt: 'Osteopata Mobilitas tratta la cervicale del paziente sdraiato' },
]

const PAIN_POINTS = [
  { title: 'Ti svegli già con il collo bloccato', body: <>Apri gli occhi e il collo è rigido, con <strong>fitte alla cervicale</strong>. La giornata parte già storta.</> },
  { title: 'Il mal di testa che parte dal collo', body: <>Senti una pressione dietro la nuca che sale fino alle tempie e agli occhi. Passa per un po', poi <em>torna</em>.</> },
  { title: 'Guidare diventa un incubo', body: <>Per guardare l'angolo morto devi <strong>girare la testa</strong>, ma fa male e non ci arrivi. Così giri tutto il busto.</> },
  { title: 'Lavorare al computer ti distrugge il collo', body: <>Dopo poche ore il collo è duro e le spalle salgono verso le orecchie. A fine giornata la <strong>rigidità</strong> non se ne va.</> },
  { title: 'Il dolore che scende su spalle e braccia', body: <>Senti il collo sempre teso, <strong>formicolii</strong> o il braccio debole. Anche i gesti semplici diventano faticosi.</> },
  { title: 'Non riesci più a dormire bene', body: <>Non trovi una posizione comoda. Ti svegli per il dolore, oppure la mattina sei più <strong>rigido</strong> di quando sei andato a letto.</> },
  { title: 'La testa sembra pesare il doppio', body: <>Tenerla dritta è una fatica. Senti <strong>un peso continuo</strong> su collo e spalle e i muscoli non si sciolgono mai.</> },
  { title: 'La paura che il dolore peggiori', body: <>Il dolore arriva sempre più spesso. Ti toglie la voglia di <strong>muoverti</strong> e la tranquillità.</> },
]

const TREATMENT_BENEFITS = [
  { icon: Wind, title: 'Subito più leggero', body: <>Collo e spalle si <strong>sciolgono</strong>. La testa smette di pesare come un macigno e non senti più quella tensione tutto il giorno.</> },
  { icon: Move, title: 'Giri la testa senza pensarci', body: <>In macchina o quando qualcuno ti chiama, girarti torna un gesto <strong>semplice</strong>. Senza fitte e senza girare tutto il busto.</> },
  { icon: Brain, title: 'Meno mal di testa da cervicale', body: <>Quando il collo si scioglie, cala anche la <strong>pressione</strong> dietro la nuca, sulle tempie e dietro gli occhi.</> },
  { icon: Moon, title: 'Finalmente dormi bene', body: <>Senza dolore al collo il corpo <strong>riposa davvero</strong>. Ti svegli riposato e senza il collo bloccato.</> },
  { icon: Monitor, title: 'Computer e telefono senza fatica', body: <>Il collo regge la testa senza <strong>stancarsi</strong> subito. La tensione non sale più ora dopo ora.</> },
  { icon: Lightbulb, title: 'Testa più lucida', body: <>Quando il collo fa meno male, smetti di pensare sempre al <strong>dolore</strong>. E ti concentri meglio.</> },
  { icon: Layers, title: 'Spalle e scapole più rilassate', body: <>Quando la cervicale sta meglio, si rilassa anche tutta la <strong>parte alta della schiena</strong>.</> },
  { icon: Activity, title: 'Libero di muoverti ogni giorno', body: <>Lavori, guidi e fai sport senza pensare sempre al <strong>dolore</strong>.</> },
  { icon: ShieldCheck, title: 'Basta paura del torcicollo', body: <>Torni a vivere senza la paura che il collo si <strong>blocchi</strong> o faccia male all'improvviso.</> },
]

const LORO_ITEMS = [
  { icon: Pill, title: 'Antidolorifici', body: <>Il dolore cala per qualche ora o qualche giorno, ma <strong>collo duro e tensioni</strong> restano. Quando l'effetto finisce, il dolore torna.</> },
  { icon: Laptop, title: 'Esercizi presi da internet', body: <>Sono uguali per tutti e spesso non c'entrano con il tuo problema. Possono anche <strong>peggiorare</strong> il dolore.</> },
  { icon: Hand, title: 'Massaggi generici', body: <>Ti rilassano sul momento, ma non sistemano <strong>quello che causa</strong> il dolore.</> },
]

const NOI_ITEMS = [
  { icon: Search, title: 'Guardiamo tutto il corpo', body: <>Non lavoriamo solo dove ti fa male. Cerchiamo <strong>cosa tira</strong> e mette sotto sforzo la cervicale.</> },
  { icon: Hand, title: 'Lavoriamo con le mani, dove serve', body: <>Trattiamo articolazioni, muscoli e tessuti che bloccano il movimento e <strong>sciogliamo le rigidità</strong>.</> },
  { icon: Gauge, title: 'Meglio a ogni seduta', body: <>Il corpo ritrova il suo <strong>equilibrio</strong>. La tensione cala e il collo si muove sempre meglio.</> },
  { icon: Target, title: 'Un risultato che dura', body: <>Non vogliamo solo far passare il dolore per qualche giorno. Vogliamo che il tuo corpo <strong>funzioni meglio</strong>.</> },
]


// Cloudflare Stream: video ID dalla dashboard; customer code in .env come VITE_CLOUDFLARE_STREAM_CUSTOMER_CODE
// loop=true: quando il video finisce riparte da capo in automatico (loop infinito)
const STREAM_VIDEO_ID = '6ce867ac62c039c989cad30f7699d750'
const STREAM_CUSTOMER_CODE = import.meta.env.VITE_CLOUDFLARE_STREAM_CUSTOMER_CODE ?? ''
const STREAM_IFRAME_SRC = STREAM_CUSTOMER_CODE
  ? `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${STREAM_VIDEO_ID}/iframe?autoplay=true&muted=true&controls=false&letterboxColor=%23002552&loop=true`
  : ''

// Foto dei trattamenti in versione web (public/trattamenti/web, larghe 900 e 1600 px)
const webImg = (nome, w = 900) => `/trattamenti/web/${nome}-${w}.jpg`
const srcSetOf = (nome) => `${webImg(nome, 900)} 900w, ${webImg(nome, 1600)} 1600w`

// Scena firmata: la testa gira sempre di più mentre scorri
const TurnScene = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 })
  const before = useTransform(progress, [0.3, 0.48], [1, 0])
  const after = useTransform(progress, [0.52, 0.7], [0, 1])
  const glow = useTransform(progress, [0, 1], [0.25, 1])

  return (
    <section className="mx-cerv-turn" ref={ref} aria-labelledby="mx-cerv-turn-title">
      <div className="mx-cerv-turn__pin">
        <motion.div className="mx-cerv-turn__glow" style={{ opacity: glow }} aria-hidden="true" />
        <div className="mx-wrap mx-cerv-turn__grid">
          <div className="mx-cerv-turn__copy">
            <Kicker>Trattamento osteopatico</Kicker>
            <h2 className="mx-h mx-cerv-turn__title" id="mx-cerv-turn-title">
              Quando la cervicale viene trattata nel <strong className="mx-accent">modo giusto</strong>
            </h2>
            <p className="mx-lead mx-cerv-turn__lead">Ecco cosa cambia, giorno dopo giorno.</p>
          </div>
          <div className="mx-cerv-turn__stage">
            <CervDial progress={progress} className="mx-cerv-turn__dial" />
            <div className="mx-cerv-turn__caption">
              <motion.span className="mx-cerv-turn__state is-before" style={{ opacity: before }}>
                <X size={16} strokeWidth={3} />
                Guidare diventa un incubo
              </motion.span>
              <motion.span className="mx-cerv-turn__state is-after" style={{ opacity: after }}>
                <Check size={16} strokeWidth={3} />
                Giri la testa senza pensarci
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cervicalgia() {
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('primaVisita') // 'consulto' | 'primaVisita'
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [road, setRoad] = useState('b')
  const [showDock, setShowDock] = useState(false)
  const heroCtaRef = useRef(null)
  const [agRef, agY] = useParallax(8)
  const [benRef, benY] = useParallax(8)

  // SEO – metadata ottimizzati per Google e social (cervicalgia / dolore cervicale)
  useEffect(() => {
    const prevTitle = document.title
    const pageUrl = `${window.location.origin}/cervicalgia`
    const ogImage = `${window.location.origin}/trattamenti/og/${FOTO_HERO}.jpg`

    document.title = 'Cervicalgia e Dolore Cervicale: Cura a Torino | Mobilitas Osteopata'

    const ensureMetaByName = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const ensureMetaByProperty = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const ensureCanonical = (href) => {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }

    const description = 'Cervicalgia e dolore cervicale: trattamento osteopatico a Torino. Risoluzione naturale, mal di testa da cervicale, rigidità collo, vertigini. Prima visita 49€. Solo 15 posti al mese. Prenota ora.'

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName('keywords', 'cervicalgia, dolore cervicale, cervicale torino, osteopata cervicale torino, mal di testa da cervicale, rigidità collo, cervicale cronica, vertigini da cervicale, trattamento cervicale torino, osteopatia cervicale, dolore al collo torino, fisioterapia cervicale torino, cura cervicale, blocchi cervicali, infiammazione cervicale')

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    ensureMetaByProperty('og:title', 'Cervicalgia e Dolore Cervicale: Cura a Torino | Mobilitas Osteopata')
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:image', ogImage)
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')
    ensureMetaByProperty('og:locale', 'it_IT')
    ensureMetaByProperty('og:image:width', '1200')
    ensureMetaByProperty('og:image:height', '630')

    // Twitter Card
    ensureMetaByName('twitter:card', 'summary_large_image')
    ensureMetaByName('twitter:title', 'Cervicalgia e Dolore Cervicale: Cura a Torino | Mobilitas')
    ensureMetaByName('twitter:description', description)
    ensureMetaByName('twitter:image', ogImage)

    // Canonical (evita contenuti duplicati)
    ensureCanonical(pageUrl)

    // JSON-LD: servizio medico per rich snippet e Knowledge Panel
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'Trattamento Cervicalgia e Dolore Cervicale | Mobilitas Torino',
      description: description,
      url: pageUrl,
      mainEntity: {
        '@type': 'MedicalCondition',
        name: 'Cervicalgia',
        alternateName: ['dolore cervicale', 'cervicale infiammata', 'dolore al collo'],
      },
      about: {
        '@type': 'MedicalTherapy',
        name: 'Trattamento osteopatico per cervicalgia',
      },
      publisher: {
        '@type': 'MedicalBusiness',
        name: 'Mobilitas – Studio Osteopatico',
        address: { '@type': 'PostalAddress', streetAddress: 'Via Peyron 54', addressLocality: 'Torino', addressCountry: 'IT' },
        url: window.location.origin,
      },
    }
    let scriptLd = document.querySelector('script[type="application/ld+json"][data-page="cervicalgia"]')
    if (!scriptLd) {
      scriptLd = document.createElement('script')
      scriptLd.setAttribute('type', 'application/ld+json')
      scriptLd.setAttribute('data-page', 'cervicalgia')
      document.head.appendChild(scriptLd)
    }
    scriptLd.textContent = JSON.stringify(jsonLd)

    return () => {
      document.title = prevTitle
      const toRemove = document.querySelector('script[type="application/ld+json"][data-page="cervicalgia"]')
      if (toRemove) toRemove.remove()
    }
  }, [])

  const openConsulto = () => {
    setBookingCtaType('consulto')
    setShowBooking(true)
  }
  const openPrimaVisita = () => {
    setBookingCtaType('primaVisita')
    setShowBooking(true)
  }

  // Dock mobile: compare quando le CTA dell'apertura escono dallo schermo
  useEffect(() => {
    const el = heroCtaRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(([entry]) => {
      setShowDock(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const ctas = <VisitaCtas onConsulto={openConsulto} onVisita={openPrimaVisita} />

  return (
    <PageShell className="mx-cerv">
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
            Dolore cervicale
          </motion.div>

          <h1 className="mx-h mx-cerv-hero__title">
            <motion.span
              className="mx-cerv-hero__mission"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
            >
              Abbiamo una sola <span className="mx-accent">Missione</span>.
            </motion.span>
            <br />
            <span className="mx-cerv-hero__arrow" aria-hidden="true">
              <ArrowDown size={20} strokeWidth={2.6} />
            </span>
            <motion.span
              className="mx-cerv-hero__promise"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            >
              <span className="mx-accent">Risolvere</span> il tuo dolore cervicale in modo{' '}
              <span className="mx-accent">naturale</span> e in <span className="mx-accent">poche sedute</span>.
            </motion.span>
          </h1>

          <motion.div
            className="mx-cerv-hero__media"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          >
            <div className="mx-cerv-hero__frame">
              {STREAM_IFRAME_SRC ? (
                <iframe
                  src={STREAM_IFRAME_SRC}
                  title="Trattamento osteopatico per dolore cervicale - Mobilitas Torino"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={webImg(FOTO_HERO, 1600)}
                  style={{ objectPosition: '50% 60%' }}
                  srcSet={srcSetOf(FOTO_HERO)}
                  sizes="(min-width: 1024px) 620px, 92vw"
                  alt="Trattamento osteopatico per dolore cervicale - Mobilitas Torino"
                  decoding="async"
                />
              )}
            </div>
            <span className="mx-cerv-hero__arc" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="mx-cerv-hero__offer"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <p className="mx-cerv-offer">
              <span className="mx-cerv-offer__lbl">Solo</span>
              <span className="mx-cerv-offer__seats">15 posti</span>
              <span className="mx-cerv-offer__lbl">ogni mese con lo sconto</span>
              <span className="mx-cerv-offer__price">
                <s>90€</s>
                <b>49€</b>
              </span>
            </p>
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
            <em>Niente farmaci. Niente operazioni.</em>
            <br />
            Solo un trattamento <strong>osteopatico</strong> fatto su misura per te, con <strong>risultati</strong> che senti davvero.
          </motion.p>
        </div>
      </header>

      {/* ——— Recensioni ——— */}
      <section className="mx-section mx-section--deep mx-cerv-proof">
        <div className="mx-wrap">
          {/* Prova: recensioni Google dal gestionale, filtrate per tag cervicalgia */}
          <RecensioniTag
            tags={TAG_RECENSIONI}
            evidenzia={PAROLE_DOLORE}
            titolo={
              <>
                Chi aveva il <span className="mx-accent">dolore cervicale</span>, oggi scrive così
              </>
            }
            sottotitolo="Recensioni Google a 5 stelle di persone venute da noi per la cervicale, nei nostri studi di Torino."
          />
        </div>
      </section>

      {/* ——— Benefici ——— */}
      <section className="mx-section mx-section--glow mx-cerv-benefits">
        <div className="mx-wrap">
          <div className="mx-cerv-ben__head">
            <Kicker>Cosa cambia dopo il trattamento</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Dal collo bloccato' }, { text: 'al collo libero.', className: 'mx-gradient' }]} />
            </h2>
          </div>
          <Reveal className="mx-cerv-ben">
            <div className="mx-cerv-ben__photo" ref={benRef}>
              <motion.div style={{ y: benY, height: '100%' }}>
                <img
                  src={webImg(FOTO_BENEFICI, 1600)}
                  style={{ objectPosition: '22% 50%' }}
                  srcSet={srcSetOf(FOTO_BENEFICI)}
                  sizes="(min-width: 1000px) 440px, 92vw"
                  alt="Trattamento osteopatico per il dolore cervicale"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              <span className="mx-cerv-ben__tag">
                <span>Prima</span>
                <ArrowRight size={14} aria-hidden="true" />
                <b>Dopo</b>
              </span>
            </div>
            <ol className="mx-cerv-ben__list">
              {BENEFITS.map((b, i) => (
                <motion.li
                  key={b.dopo}
                  initial="off"
                  whileInView="on"
                  viewport={{ once: true, margin: '-12% 0px' }}
                  transition={{ staggerChildren: 0.18, delayChildren: i * 0.08 }}
                >
                  <span className="mx-cerv-ben__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mx-cerv-ben__prima">
                    <motion.s
                      variants={{ off: { backgroundSize: '0% 2px' }, on: { backgroundSize: '100% 2px' } }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      {b.prima}
                    </motion.s>
                  </span>
                  <motion.span
                    className="mx-cerv-ben__dopo"
                    variants={{ off: { opacity: 0, x: -14 }, on: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    {b.dopo}
                  </motion.span>
                </motion.li>
              ))}
            </ol>
          </Reveal>
        </div>
        <div className="mx-wrap">{ctas}</div>
      </section>

      {/* ——— Ti riconosci? ——— */}
      <section className="mx-section mx-section--deep mx-cerv-pain">
        <div className="mx-wrap">
          <Kicker>Ti riconosci?</Kicker>
          <h2 className="mx-h mx-h--lg mx-cerv-pain__title">
            Il dolore cervicale non è solo un fastidio.
            <br />
            <span className="mx-cerv-pain__hit">Può rovinarti le giornate!</span>
          </h2>

          <Snap as="ol" className="mx-cerv-pains">
            {PAIN_POINTS.map((pain, i) => (
              <li key={pain.title} className="mx-cerv-painc">
                <div className="mx-cerv-painc__img">
                  <img
                    src={webImg(PAIN_IMAGES[i].nome)}
                    style={{ objectPosition: PAIN_IMAGES[i].pos }}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="mx-cerv-painc__n">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mx-h mx-h--sm">{pain.title}</h3>
                <p className="mx-body">{pain.body}</p>
              </li>
            ))}
          </Snap>

          {/* Se lo ignori */}
          <div className="mx-cerv-agitate">
            <Reveal className="mx-cerv-agitate__copy">
              <p className="mx-cerv-agitate__label">
                <span aria-hidden="true">
                  <AlertTriangle size={16} strokeWidth={2.4} />
                </span>
                Se fai finta di niente
              </p>
              <h3 className="mx-h mx-h--md mx-cerv-agitate__title">
                Il dolore quasi mai resta com'è.
                <br />
                <span className="mx-cerv-escalate">
                  Torna più <strong>spesso</strong>, fa più male, ti blocca di più.
                </span>
              </h3>
              <div className="mx-cerv-agitate__text">
                <p className="mx-body">
                  Oggi è un fastidio che arriva dopo una giornata al computer. Domani può diventare un <strong>collo sempre rigido</strong>. I muscoli restano tesi e ti muovi sempre meno. Col tempo il dolore può scendere verso spalle, scapole e braccia.
                </p>
                <p className="mx-body">
                  Molte persone si abituano al dolore senza accorgersene. Il corpo inizia a muoversi storto per non sentirlo e il problema <strong>diventa cronico</strong>. A quel punto, per stare meglio serve molto più tempo. <span className="mx-accent mx-cerv-semi">Agire subito</span> vuol dire fermare un problema piccolo, prima che ti condizioni la vita ogni giorno.
                </p>
              </div>
            </Reveal>
            <Reveal className="mx-cerv-photo mx-cerv-agitate__photo" ref={agRef} delay={0.1}>
              <motion.div style={{ y: agY, height: '100%' }}>
                <img
                  className="mx-parallax-img"
                  src={webImg(FOTO_AGITATE, 1600)}
                  style={{ objectPosition: '0% 50%' }}
                  srcSet={srcSetOf(FOTO_AGITATE)}
                  sizes="(min-width: 1000px) 520px, 92vw"
                  alt="Dolore cervicale che peggiora nel tempo - Mobilitas Torino"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </Reveal>
          </div>
          {ctas}
        </div>
      </section>

      {/* ——— Il raggio di rotazione (scena firmata) ——— */}
      <TurnScene />

      {/* ——— I cambiamenti ——— */}
      <section className="mx-section mx-section--deep mx-cerv-changes">
        <div className="mx-wrap">
          <Snap as="ul" className="mx-cerv-bento">
            {TREATMENT_BENEFITS.map((item, i) => {
              const Icon = item.icon
              return (
                <li key={item.title} className={`mx-card mx-cerv-bento__item ${i === 0 ? 'is-featured' : ''}`}>
                  <div className="mx-cerv-bento__top">
                    <span className="mx-card__icon">
                      <Icon size={i === 0 ? 28 : 22} />
                    </span>
                    <span className="mx-cerv-bento__n">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="mx-h mx-h--sm">{item.title}</h3>
                    <p className="mx-body">{item.body}</p>
                  </div>
                </li>
              )
            }).flatMap((card, i) => {
              const foto = FOTO_CAMBIAMENTI.find((f) => f.dopo === i)
              if (!foto) return [card]
              return [
                card,
                <li key={foto.nome} className="mx-cerv-bento__photo">
                  <img src={webImg(foto.nome)} style={{ objectPosition: foto.pos }} alt={foto.alt} loading="lazy" decoding="async" />
                  <div className="mx-cerv-bento__photo-txt">
                    <span>{foto.etichetta}</span>
                    <p>{foto.testo}</p>
                  </div>
                </li>,
              ]
            })}
          </Snap>
          {ctas}
        </div>
      </section>

      {/* ——— Il bivio ——— */}
      <section className="mx-section mx-section--glow mx-cerv-roads">
        <div className="mx-wrap">
          <Kicker>Cosa scegli?</Kicker>
          <h2 className="mx-h mx-h--lg">
            Il problema non è “cosa fare oggi”.
            <br />
            <span className="mx-accent">È quale strada scegli per uscirne.</span>
          </h2>
          <Reveal>
            <p className="mx-lead mx-cerv-roads__intro">
              Chi soffre di cervicale ha davanti due strade. La prima è quella di sempre: spegni il <strong>dolore</strong> per un po' e impari a conviverci. La seconda è la nostra: sistemiamo le <strong>cause</strong> che tengono in tensione il collo.
            </p>
          </Reveal>

          <div className="mx-switch" data-side={road === 'a' ? 'no' : 'yes'} role="tablist" aria-label="Strada A o Strada B">
            <span className="mx-switch__thumb" aria-hidden="true" style={{ transform: road === 'a' ? 'translateX(0)' : 'translateX(100%)', background: road === 'a' ? 'var(--red)' : 'var(--green)' }} />
            <button type="button" role="tab" aria-selected={road === 'a'} onClick={() => setRoad('a')}>
              <XCircle size={16} />
              Strada A
            </button>
            <button type="button" role="tab" aria-selected={road === 'b'} onClick={() => setRoad('b')}>
              <CheckCircle2 size={16} />
              Strada B
            </button>
          </div>

          <div className="mx-audience mx-cerv-roads__panels" data-road={road}>
            <article className="mx-panel mx-panel--no mx-cerv-road is-a">
              <div className="mx-panel__head">
                <span className="mx-panel__badge">
                  <XCircle size={24} />
                </span>
                <div>
                  <p className="mx-cerv-road__tag">Strada A</p>
                  <h3 className="mx-h mx-h--md">Spegnere il dolore</h3>
                </div>
              </div>
              <p className="mx-cerv-road__flow">
                sollievo breve
                <ArrowRight size={14} />
                il dolore torna
              </p>
              <ul className="mx-list">
                {LORO_ITEMS.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title}>
                      <span className="mx-list__n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="mx-cerv-road__icon" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <span className="mx-list__t">
                        {item.title}
                        <span className="mx-list__d">{item.body}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
              <div className="mx-panel__foot mx-cerv-road__foot">
                <AlertTriangle size={20} aria-hidden="true" />
                <div>
                  <p className="mx-cerv-road__foot-t">Il limite</p>
                  <p className="mx-cerv-road__foot-d">
                    Ti fa respirare per un po', ma non tocca quello che rende il collo rigido. La cervicale resta <strong>“sotto sforzo”</strong> e il dolore torna.
                  </p>
                </div>
              </div>
            </article>

            <article className="mx-panel mx-panel--yes mx-cerv-road is-b">
              <div className="mx-panel__head">
                <span className="mx-panel__badge">
                  <CheckCircle2 size={24} />
                </span>
                <div>
                  <p className="mx-cerv-road__tag">Strada B</p>
                  <h3 className="mx-h mx-h--md">Togliere la causa</h3>
                </div>
              </div>
              <p className="mx-cerv-road__flow">
                meglio a ogni seduta
                <ArrowRight size={14} />
                risultato che dura
              </p>
              <div className="mx-cerv-road__photos">
                {FOTO_STRADA_B.map((f, i) => (
                  <motion.figure
                    key={f.nome}
                    className="mx-cerv-road__photo"
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                  >
                    <img src={webImg(f.nome)} style={{ objectPosition: f.pos }} alt={f.alt} loading="lazy" decoding="async" />
                    <figcaption>{f.etichetta}</figcaption>
                  </motion.figure>
                ))}
              </div>
              <ul className="mx-list">
                {NOI_ITEMS.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title}>
                      <span className="mx-list__n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="mx-cerv-road__icon" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <span className="mx-list__t">
                        {item.title}
                        <span className="mx-list__d">{item.body}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
              <div className="mx-panel__foot mx-cerv-road__foot">
                <ShieldCheck size={20} aria-hidden="true" />
                <div>
                  <p className="mx-cerv-road__foot-t">Il vantaggio</p>
                  <p className="mx-cerv-road__foot-d">
                    Non rincorriamo il dolore: sistemiamo quello che lo provoca. Così il collo torna a <strong>muoversi</strong> e regge tutta la giornata senza “andare in tilt”.
                  </p>
                </div>
              </div>
            </article>
          </div>
          {ctas}
        </div>
      </section>

      {/* ——— Domande frequenti ——— */}
      <section className="mx-section mx-section--deep mx-cerv-faq">
        <div className="mx-wrap mx-cerv-faq__grid">
          <div className="mx-cerv-faq__intro">
            <Kicker>Domande frequenti</Kicker>
            <h2 className="mx-h mx-h--lg">Tutto quello che ti serve sapere, prima di prenotare</h2>
            <p className="mx-lead mx-cerv-faq__lead">
              Quanto costa, quanto dura, dove siamo e come funziona la prima visita. Risposte semplici, senza giri di parole.
            </p>
            <div className="mx-cerv-photo mx-cerv-faq__photo">
              <img
                src={webImg(FOTO_FAQ, 1600)}
                style={{ objectPosition: '40% 55%' }}
                srcSet={srcSetOf(FOTO_FAQ)}
                sizes="(min-width: 1000px) 460px, 92vw"
                alt="Prima visita osteopatica - Mobilitas Torino"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div>
            <ul className="mx-cerv-faq__list">
              {FAQ_ITEMS.map((item, index) => {
                const Icon = item.icon
                const isOpen = openFaqIndex === index
                return (
                  <li key={item.question} className={`mx-cerv-faq__item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="mx-cerv-faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`mx-cerv-faq-${index}`}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    >
                      <span className="mx-cerv-faq__icon" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <span className="mx-cerv-faq__qt">{item.question}</span>
                      <span className="mx-cerv-faq__plus" aria-hidden="true">
                        <Plus size={18} strokeWidth={2.4} />
                      </span>
                    </button>
                    <div className="mx-cerv-faq__a" id={`mx-cerv-faq-${index}`} role="region">
                      <div>
                        <p className="mx-body">{item.answer}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="mx-cerv-faq__more">
              Hai altre domande?{' '}
              <button type="button" onClick={openConsulto}>
                Nel consulto telefonico gratuito
              </button>{' '}
              ti rispondiamo su tutto.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Dove siamo ——— */}
      <section className="mx-section mx-section--glow mx-cerv-where">
        <div className="mx-wrap">
          <div className="mx-cerv-where__head">
            <div>
              <Kicker>Dove siamo</Kicker>
              <h2 className="mx-h mx-h--lg">
                <MaskLines lines={[{ text: 'Vieni a trovarci' }, { text: 'nel cuore di Torino', className: 'mx-gradient' }]} />
              </h2>
            </div>
            <p className="mx-lead mx-cerv-where__lead">
              Abbiamo due studi: uno a San Donato e uno in Crocetta. Scegli quello più comodo per te e tocca “Indicazioni” per arrivarci.
            </p>
          </div>
          <StudioCollage />
          <Reveal className="mx-cerv-where__map" delay={0.1}>
            <StudiMap />
          </Reveal>
        </div>
        <div className="mx-wrap">{ctas}</div>
      </section>

      {/* Dock mobile: la prenotazione sempre a portata di pollice */}
      <VisitaDock visible={showDock && !showBooking} onVisita={openPrimaVisita} onConsulto={openConsulto} />

      <AnimatePresence>
        <BookingPopup
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          pageContext="cervicalgia"
          ctaType={bookingCtaType}
        />
      </AnimatePresence>
      <WhatsAppFab
        message="Ciao, vorrei avere maggiori informazioni sul trattamento osteopatico per la cervicalgia"
        bubbleText="Hai un dubbio prima di venire da noi? Scrivici qui e ti spieghiamo tutto."
        bubbleId="cervicalgia"
      />
    </PageShell>
  )
}

export default Cervicalgia
