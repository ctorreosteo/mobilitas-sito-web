import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Phone,
  CalendarCheck,
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
  Scale,
  Shirt,
  Banknote,
  MapPin,
  Clock,
  UserCheck,
  Plus,
  TrainFront,
  Car,
  Check,
  X,
} from 'lucide-react'
import BookingPopup from '../components/BookingPopup'
import WhatsAppFab from '../components/whatsapp/WhatsAppFab'
import PageShell from '../components/site/PageShell'
import { Kicker, MaskLines, Reveal, Snap } from '../components/home-sections/HomeKit'
import { EASE, useParallax } from '../components/home-sections/homeMotion'
import CervDial from '../components/cervicalgia/CervDial'
import CervReviews from '../components/cervicalgia/CervReviews'
import '../styles/pages/cervicalgia.css'

// Concetto: "Il raggio di rotazione". Il dolore cervicale si misura in quanto
// riesci a girare la testa: la pagina mostra la testa vista dall'alto con il
// ventaglio del movimento possibile, che scorrendo passa da stretto e rosso
// (collo bloccato) ad ampio e verde (collo libero).

const BENEFITS = [
  <>Svegliarti al <em>mattino</em> senza quella <strong>rigidità</strong> al collo che ti fa iniziare la giornata già <em>stanco e irritato</em>.</>,
  <>Girare la testa <em>liberamente</em> mentre guidi, lavori o ti alleni, senza <strong>fitte</strong> improvvise o <em>blocchi</em> dolorosi.</>,
  <>Liberarti dal <strong>mal di testa</strong> che parte dal collo e ti rovina <em>concentrazione</em>, lavoro e serate.</>,
  <>Tornare a lavorare al computer o usare il telefono per ore senza sentire il collo che si <strong>indurisce</strong> e si <em>infiamma</em>.</>,
  <>Dormire tutta la notte senza svegliarti per il dolore al collo o trovare una <strong>posizione</strong> che <em>non faccia male</em>.</>,
  <>Sentire finalmente il collo <em>leggero e libero</em>, senza quella <strong>tensione costante</strong> che ti fa sentire la testa pesante <em>tutto il giorno</em>.</>,
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

const PAIN_POINTS = [
  { title: 'La giornata inizia già con il collo bloccato', body: <>Ti svegli rigido, con <strong>fitte dalla cervicale</strong>. Inizi la giornata con la sensazione che qualcosa non funzioni.</> },
  { title: 'Il mal di testa che parte dal collo', body: <>Pressione dietro la nuca che sale verso tempie e occhi. Il sollievo è solo <em>temporaneo</em>.</> },
  { title: 'Guidare diventa un incubo', body: <>Controllare l'angolo morto o <strong>girare la testa</strong> diventa limitato e doloroso. Finisci per muovere tutto il busto.</> },
  { title: 'Lavorare al computer ti distrugge il collo', body: <>Dopo poche ore collo indurito, spalle alte. A fine giornata la <strong>rigidità</strong> resta per ore.</> },
  { title: 'Il dolore che scende verso spalle e braccia', body: <>Tensione continua, <strong>formicolii</strong> o debolezza. Anche i movimenti semplici diventano meno fluidi.</> },
  { title: 'Dormire bene diventa difficile', body: <>Nessuna posizione comoda; ti svegli per il dolore o al mattino sei più <strong>rigido</strong> di quando sei andato a letto.</> },
  { title: 'La testa sembra pesare il doppio', body: <>Tenerla dritta è faticoso; <strong>pressione costante</strong> su collo e spalle, muscoli che non si rilassano.</> },
  { title: 'La paura che il dolore peggiori', body: <>Il fastidio diventa più frequente. Il dolore rovina <strong>movimenti e serenità</strong>.</> },
]

const TREATMENT_BENEFITS = [
  { icon: Wind, title: 'Leggerezza immediata', body: <>Sensazione di collo e spalle <strong>libere</strong>: la testa torna a poggiare su una struttura stabile, senza quella tensione costante che la faceva pesante tutto il giorno.</> },
  { icon: Move, title: 'Muovere il collo con naturalezza', body: <>Girare la testa mentre guidi, guardare di lato diventa un gesto <strong>semplice e fluido</strong>, senza fitte che costringevano a muovere tutto il busto.</> },
  { icon: Brain, title: 'Meno mal di testa da cervicale', body: <>Quando le tensioni del collo si riducono, diminuiscono anche le <strong>pressioni</strong> dietro la nuca, alle tempie o dietro gli occhi.</> },
  { icon: Moon, title: 'Sonno di qualità', body: <>Dormire senza dolore al collo permette al corpo di <strong>riposare davvero</strong>. Ci si sveglia più riposati e senza quella rigidità mattutina.</> },
  { icon: Monitor, title: 'Computer e telefono più tollerabili', body: <>Il collo sostiene la testa senza andare subito in <strong>affaticamento</strong>; si riduce quella tensione crescente nel corso della giornata.</> },
  { icon: Lightbulb, title: 'Migliore concentrazione', body: <>Quando il dolore cervicale diminuisce, la mente smette di essere disturbata dalla <strong>tensione fisica</strong> costante.</> },
  { icon: Layers, title: 'Spalle e scapole più rilassate', body: <>Quando la cervicale torna a funzionare meglio, anche tutta la <strong>parte alta della schiena</strong> tende a rilassarsi.</> },
  { icon: Activity, title: 'Libertà nei movimenti quotidiani', body: <>Lavorare, guidare, allenarsi senza dover continuamente pensare al <strong>dolore</strong>.</> },
  { icon: ShieldCheck, title: 'Controllo del proprio corpo', body: <>Tornare a vivere senza la paura che il collo possa <strong>bloccarsi</strong> o far male da un momento all'altro.</> },
]

const LORO_ITEMS = [
  { icon: Pill, title: 'Antidolorifici', body: <>Il dolore si attenua per qualche ora o giorno, ma <strong>rigidità e tensioni</strong> restano. Quando l'effetto finisce, il problema torna.</> },
  { icon: Laptop, title: 'Esercizi trovati online', body: <>Spesso troppo generici o non adatti alla causa. Possono aumentare l'<strong>irritazione</strong> della zona.</> },
  { icon: Hand, title: 'Massaggi o trattamenti non mirati', body: <>Rilassamento momentaneo, ma non modificano le <strong>disfunzioni</strong> alla base del problema.</> },
]

const NOI_ITEMS = [
  { icon: Search, title: 'Analisi del corpo nel suo insieme', body: <>Non lavoriamo solo dove senti dolore: capiamo quali <strong>strutture</strong> creano la tensione sulla cervicale.</> },
  { icon: Hand, title: 'Trattamento manuale mirato', body: <>Lavoriamo su articolazioni, muscoli e tessuti che limitano il movimento, <strong>liberando le rigidità</strong>.</> },
  { icon: Gauge, title: 'Equilibrio e mobilità progressiva', body: <>Il corpo ritrova un <strong>equilibrio naturale</strong>; la tensione si riduce e la mobilità del collo migliora.</> },
  { icon: Target, title: 'Risultato duraturo', body: <>L'obiettivo non è far passare il dolore per qualche giorno, ma far <strong>funzionare meglio</strong> il corpo.</> },
]

const FAQ_ITEMS = [
  {
    icon: Scale,
    question: 'Qual è la differenza tra osteopata e fisioterapista?',
    answer: <>Il fisioterapista lavora principalmente in ambito <strong>riabilitazione</strong>, magari dopo eventi traumatici, e spesso con esercizi e macchinari. L'osteopata lavora solamente in maniera manuale su tutto il <strong>sistema corpo</strong>, andando alla <strong>radice</strong> dei problemi e aiutandoti anche a prevenirli lavorando sulla tua postura e le tue abitudini quotidiane. L'approccio è più globale: non solo dove fa male, ma perché fa male e si risolvere il tutto alla fonte.</>,
  },
  {
    icon: Shirt,
    question: 'Come mi devo vestire?',
    answer: <>Puoi venire in <strong>abiti normali e comodi</strong> (stile abbigliamento sportivo da palestra), che si possano eventualmente togliere facilmente. L'importante è che tu ti senta a tuo agio.</>,
  },
  {
    icon: Banknote,
    question: 'Quanto costano le sedute?',
    answer: <>La prima visita ha uno sconto dedicato: <strong>da 90€ a 49€</strong>. Per le sedute successive il costo dipende dall'eventuale percorso; abbiamo <strong>formule per risparmiare</strong> e ne parliamo direttamente in struttura.</>,
  },
  {
    icon: MapPin,
    question: 'Dove si trova lo studio?',
    answer: <>Ci troviamo in <strong>Via Peyron 54 a Torino</strong>. Siamo raggiungibili con mezzi pubblici (anche metropolitana) e in auto. Ti inviamo le indicazioni precise quando prenoti l'appuntamento.</>,
  },
  {
    icon: Clock,
    question: 'Quanto dura una visita?',
    answer: <>La prima visita dura circa <strong>60 minuti</strong> (colloquio, valutazione e primo trattamento). I trattamenti successivi circa <strong>40-55 minuti</strong>, a seconda del problema e delle tecniche utilizzate.</>,
  },
  {
    icon: UserCheck,
    question: 'Con chi farò la visita?',
    answer: <>Durante la chiamata ti assegneremo l'<strong>osteopata più adeguato</strong> al tuo caso, il più <strong>specializzato</strong> per il tuo problema. Tutti i nostri osteopati sono qualificati e lavorano con lo <strong>stesso metodo</strong>.</>,
  },
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

// Coppia di CTA della campagna: aprono il popup di prenotazione
const CervCtas = ({ onConsulto, onVisita, className = '' }) => (
  <div className={`mx-ctas mx-cerv-ctas ${className}`}>
    <button type="button" className="mx-btn mx-btn--primary mx-cerv-btn" onClick={onConsulto}>
      <span className="mx-cerv-btn__label">Prenota un consulto telefonico gratuito</span>
      <span className="mx-btn__icon">
        <Phone size={20} strokeWidth={2.4} />
      </span>
    </button>
    <button type="button" className="mx-btn mx-btn--ghost mx-cerv-btn" onClick={onVisita}>
      <span className="mx-cerv-btn__label">Prenota prima visita con sconto</span>
      <span className="mx-btn__icon">
        <CalendarCheck size={20} strokeWidth={2.4} />
      </span>
    </button>
  </div>
)

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
              Quando il dolore cervicale viene trattato nel <strong className="mx-accent">modo giusto</strong>
            </h2>
            <p className="mx-lead mx-cerv-turn__lead">Questi sono i cambiamenti che puoi aspettarti.</p>
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
                Muovere il collo con naturalezza
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

  const ctas = <CervCtas onConsulto={openConsulto} onVisita={openPrimaVisita} />

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
              <span className="mx-accent">Risolvere</span> il tuo dolore cervicale in maniera completamente{' '}
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
            <em>Nessun farmaco. Nessun intervento.</em>
            <br />
            Un gran trattamento <strong>osteopatico</strong> specifico per te con <strong>risultati concreti</strong>.
          </motion.p>
        </div>
      </header>

      {/* ——— Recensioni ——— */}
      <section className="mx-section mx-section--deep mx-cerv-proof">
        <div className="mx-wrap">
          <Reveal>
            <CervReviews />
          </Reveal>
        </div>
      </section>

      {/* ——— Benefici ——— */}
      <section className="mx-section mx-section--glow mx-cerv-benefits">
        <div className="mx-wrap mx-cerv-benefits__grid">
          <div className="mx-cerv-benefits__copy">
            <h2 className="mx-h mx-h--lg">
              I <span className="mx-accent">benefici</span> del trattamento osteopatico per il{' '}
              <span className="mx-accent">dolore cervicale</span>
            </h2>
            <ul className="mx-cerv-checks">
              {BENEFITS.map((text, i) => (
                <Reveal as="li" key={i} delay={i * 0.05} y={24}>
                  <span className="mx-cerv-checks__tick" aria-hidden="true">
                    <CheckCircle2 size={18} strokeWidth={2.4} />
                  </span>
                  <span className="mx-cerv-checks__text">{text}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal className="mx-cerv-photo mx-cerv-benefits__photo" ref={benRef}>
            <motion.div style={{ y: benY, height: '100%' }}>
              <img
                className="mx-parallax-img"
                src={webImg(FOTO_BENEFICI, 1600)}
                style={{ objectPosition: '22% 50%' }}
                srcSet={srcSetOf(FOTO_BENEFICI)}
                sizes="(min-width: 1000px) 520px, 92vw"
                alt="Trattamento osteopatico per il benessere del collo e della postura"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
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
            <span className="mx-cerv-pain__hit">È qualcosa che può rovinare le tue giornate!</span>
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
                Se lo ignori
              </p>
              <h3 className="mx-h mx-h--md mx-cerv-agitate__title">
                Il dolore raramente resta uguale.
                <br />
                <span className="mx-cerv-escalate">
                  Diventa più <strong>frequente</strong>, più intenso, più limitante.
                </span>
              </h3>
              <div className="mx-cerv-agitate__text">
                <p className="mx-body">
                  Quello che oggi è un fastidio dopo una giornata al computer può trasformarsi in <strong>rigidità costante</strong>. Il collo si irrigidisce, i muscoli restano in tensione e i movimenti diventano sempre più limitati. Con il tempo il dolore può irradiarsi verso spalle, scapole e braccia.
                </p>
                <p className="mx-body">
                  Molte persone si adattano al dolore senza accorgersene. Questo crea ulteriori compensi e il problema tende a <strong>cronicizzarsi</strong>. Quando il dolore diventa cronico, recuperare richiede molto più tempo. <span className="mx-accent mx-cerv-semi">Intervenire presto</span> significa evitare che un problema gestibile condizioni ogni giorno la tua vita.
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
              Le persone che soffrono di dolore cervicale hanno due strade: La via tradizionale obbligat al corpo a convivere con il <strong>sintomo</strong>... Noi invece sistemiamo le <strong>cause</strong> che alimentano la tensione sulla cervicale.
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
                  <h3 className="mx-h mx-h--md">Spegnere il sintomo</h3>
                </div>
              </div>
              <p className="mx-cerv-road__flow">
                sollievo breve
                <ArrowRight size={14} />
                ritorno
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
                    Ti dà respiro, ma spesso non cambia ciò che genera la rigidità: la cervicale resta <strong>“sotto carico”</strong> e il problema tende a ripresentarsi.
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
                progressivo
                <ArrowRight size={14} />
                stabile
              </p>
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
                    Non inseguiamo il dolore: rimettiamo in equilibrio le strutture che lo alimentano, così il collo torna a <strong>muoversi</strong> e a reggere la giornata senza “andare in allarme”.
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
              Risposte chiare su costi, durata, dove siamo e come funziona la prima visita. Zero giri di parole.
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
              Altre domande?{' '}
              <button type="button" onClick={openConsulto}>
                Durante la consulenza telefonica gratuita
              </button>{' '}
              ti rispondiamo a tutto.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Dove siamo ——— */}
      <section className="mx-section mx-section--glow mx-cerv-where">
        <div className="mx-wrap mx-cerv-where__grid">
          <div className="mx-cerv-where__copy">
            <Kicker>Dove siamo</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Vieni a trovarci' }, { text: 'nel cuore di Torino', className: 'mx-gradient' }]} />
            </h2>
            <p className="mx-lead mx-cerv-where__lead">
              Lo studio si trova in una posizione strategica, comodo con mezzi pubblici e parcheggio nelle vicinanze.
            </p>
            <div className="mx-cerv-where__rows">
              <a
                className="mx-cerv-where__row is-link"
                href="https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.08023495897442,7.65514387704107,17z"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mx-cerv-where__ic">
                  <MapPin size={20} />
                </span>
                <span className="mx-cerv-where__txt">Via Peyron 54, Torino</span>
                <ArrowRight size={18} className="mx-cerv-where__go" />
              </a>
              <div className="mx-cerv-where__row">
                <span className="mx-cerv-where__ic">
                  <TrainFront size={20} />
                </span>
                <span className="mx-cerv-where__txt">Metro: Bernini o Principi d'Acaja</span>
              </div>
              <div className="mx-cerv-where__row">
                <span className="mx-cerv-where__ic">
                  <Car size={20} />
                </span>
                <span className="mx-cerv-where__txt">2 parcheggi vicini + strisce blu</span>
              </div>
            </div>
          </div>
          <Reveal className="mx-cerv-where__map" delay={0.1}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.274078923546!2d7.65514387704107!3d45.08023495897442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe2e29f381fdc93%3A0x97eee174cab07ada!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Osteopata%20Torino!5e0!3m2!1sit!2sit!4v1760785981478!5m2!1sit!2sit"
              title="Mobilitas - Studio Osteopatico, Via Peyron 54 Torino"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
        <div className="mx-wrap">{ctas}</div>
      </section>

      {/* Dock mobile: la prenotazione sempre a portata di pollice */}
      <AnimatePresence>
        {showDock && !showBooking && (
          <motion.div
            className="mx-cerv-dock"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button type="button" className="mx-cerv-dock__btn is-primary" onClick={openConsulto}>
              <Phone size={18} strokeWidth={2.4} />
              <span>Prenota un consulto telefonico gratuito</span>
            </button>
            <button
              type="button"
              className="mx-cerv-dock__btn is-ghost"
              onClick={openPrimaVisita}
              aria-label="Prenota prima visita con sconto"
            >
              <s>90€</s>
              <b>49€</b>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
        bubbleText="Hai qualche dubbio o domanda prima di venire da noi? Scrivici un messaggio e saremo lieti di chiarire tutto quanto!"
        bubbleId="cervicalgia"
      />
    </PageShell>
  )
}

export default Cervicalgia
