import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  CalendarCheck,
  Star,
  Sparkles,
  CheckCircle2,
  ArrowRight,
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
  X,
  Pill,
  Laptop,
  Hand,
  Search,
  Gauge,
  Target,
  ArrowDown,
  Scale,
  Shirt,
  Banknote,
  MapPin,
  Clock,
  UserCheck,
  ChevronDown,
} from 'lucide-react'
import { RECENSIONI_IMAGES } from '../data/recensioni'
import BookingPopup from '../components/BookingPopup'
import WhatsAppButton from '../components/WhatsAppButton'

// Allineamento default di tutti i testi della pagina
const PAGE_TEXT_ALIGN = 'text-left'

const RECENSIONI_COUNT = RECENSIONI_IMAGES.length
const RECENSIONI_SEGMENTS = 6
const RECENSIONI_SEGMENT_SIZE = Math.ceil(RECENSIONI_COUNT / RECENSIONI_SEGMENTS)

const BENEFITS = [
  <>Svegliarti al <em>mattino</em> senza quella <strong>rigidità</strong> al collo che ti fa iniziare la giornata già <em>stanco e irritato</em>.</>,
  <>Girare la testa <em>liberamente</em> mentre guidi, lavori o ti alleni, senza <strong>fitte</strong> improvvise o <em>blocchi</em> dolorosi.</>,
  <>Liberarti dal <strong>mal di testa</strong> che parte dal collo e ti rovina <em>concentrazione</em>, lavoro e serate.</>,
  <>Tornare a lavorare al computer o usare il telefono per ore senza sentire il collo che si <strong>indurisce</strong> e si <em>infiamma</em>.</>,
  <>Dormire tutta la notte senza svegliarti per il dolore al collo o trovare una <strong>posizione</strong> che <em>non faccia male</em>.</>,
  <>Sentire finalmente il collo <em>leggero e libero</em>, senza quella <strong>tensione costante</strong> che ti fa sentire la testa pesante <em>tutto il giorno</em>.</>,
]

const PAIN_IMAGES = [
  '/cervicalgia/cerv1.JPG',
  '/cervicalgia/cerv2.JPG',
  '/cervicalgia/cerv3.JPG',
  '/cervicalgia/cerv4.JPG',
  '/cervicalgia/cerv5.JPG',
  '/cervicalgia/cerv7.JPG',
  '/cervicalgia/cerv8.JPG',
  '/cervicalgia/cerv9.JPG',
]

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

function Cervicalgia() {
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('primaVisita') // 'consulto' | 'primaVisita'
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [activeRecensioneIndex, setActiveRecensioneIndex] = useState(0)
  const [recensioniCarouselHeight, setRecensioniCarouselHeight] = useState(null)
  const [painIndex, setPainIndex] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const carouselRef = useRef(null)
  const painCarouselRef = useRef(null)
  const CARD_WIDTH = 320
  const GAP = 16
  const PAIN_CARD_WIDTH = 300
  const PAIN_GAP = 16
  const activeRecensioneIndexRef = useRef(0)
  const activeRecensioneObserverRef = useRef(null)

  // SEO – metadata ottimizzati per Google e social (cervicalgia / dolore cervicale)
  useEffect(() => {
    const prevTitle = document.title
    const pageUrl = `${window.location.origin}/cervicalgia`
    const ogImage = `${window.location.origin}/cervicalgia/cerv10.JPG`

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

  const goToSlide = (segmentIndex) => {
    setCarouselIndex(segmentIndex)
    if (carouselRef.current) {
      const scrollLeft = segmentIndex * RECENSIONI_SEGMENT_SIZE * (CARD_WIDTH + GAP)
      carouselRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }

  const handleRecensioneImgLoad = (index) => {
    if (index !== activeRecensioneIndexRef.current) return
    if (!carouselRef.current) return
    const cardEl = carouselRef.current.querySelector(`[data-recensione-card="${index}"]`)
    if (!cardEl) return
    const h = cardEl.offsetHeight
    if (h > 0) setRecensioniCarouselHeight(h)
  }

  // Keep carousel height perfectly in sync with the active card (grow + shrink)
  useEffect(() => {
    const root = carouselRef.current
    if (!root) return

    // cleanup previous observer
    if (activeRecensioneObserverRef.current) {
      activeRecensioneObserverRef.current.disconnect()
      activeRecensioneObserverRef.current = null
    }

    const cardEl = root.querySelector(`[data-recensione-card="${activeRecensioneIndex}"]`)
    if (!cardEl) return

    const measure = () => {
      const h = cardEl.offsetHeight
      if (h > 0) setRecensioniCarouselHeight(h)
    }

    measure()

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => measure())
      ro.observe(cardEl)
      activeRecensioneObserverRef.current = ro
      return () => ro.disconnect()
    }
  }, [activeRecensioneIndex])

  const goToPainSlide = (index) => {
    setPainIndex(index)
    if (painCarouselRef.current) {
      painCarouselRef.current.scrollTo({
        left: index * (PAIN_CARD_WIDTH + PAIN_GAP),
        behavior: 'smooth',
      })
    }
  }

  // Sync segment dot with scroll position (user scroll) - recensioni
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const segmentWidth = RECENSIONI_SEGMENT_SIZE * (CARD_WIDTH + GAP)
    let raf = 0

    const getClosestCardIndexToCenter = () => {
      const centerX = el.scrollLeft + el.clientWidth / 2
      // Approximate index first, then clamp.
      const approx = Math.round((centerX - CARD_WIDTH / 2) / (CARD_WIDTH + GAP))
      return Math.min(RECENSIONI_COUNT - 1, Math.max(0, approx))
    }

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const index = getClosestCardIndexToCenter()
        activeRecensioneIndexRef.current = index
        setActiveRecensioneIndex(index)

        const segment = Math.min(
          RECENSIONI_SEGMENTS - 1,
          Math.floor(el.scrollLeft / segmentWidth)
        )
        setCarouselIndex(Math.max(0, segment))
      })
    }
    el.addEventListener('scroll', onScroll)
    // prima misura/indice (quando possibile)
    requestAnimationFrame(() => {
      const index = getClosestCardIndexToCenter()
      activeRecensioneIndexRef.current = index
      setActiveRecensioneIndex(index)
    })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      el.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Sync pain carousel dot with scroll position
  useEffect(() => {
    const el = painCarouselRef.current
    if (!el) return
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / (PAIN_CARD_WIDTH + PAIN_GAP))
      setPainIndex(Math.min(Math.max(0, index), PAIN_POINTS.length - 1))
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`min-h-screen bg-blue-dark text-cream font-montserrat [&_*]:font-montserrat overflow-x-hidden ${PAGE_TEXT_ALIGN}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background: blue gradient + subtle green glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-dark via-[#001a3d] to-blue-dark" />
          <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full bg-green/5 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full bg-green/5 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(114,250,147,0.06),transparent)]" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy + CTAs (su mobile: titolo → immagine → sottotitolo e resto) */}
              <div className={`flex flex-col ${PAGE_TEXT_ALIGN} order-2 lg:order-1`}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green bg-green mb-3 lg:mb-6 w-fit self-start"
                >
                  <Sparkles className="w-4 h-4 text-blue-dark" />
                  <span className="text-sm font-black text-blue-dark uppercase tracking-wider">
                    Dolore cervicale
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.25rem] font-black leading-tight text-cream mb-6"
                >
                  Abbiamo una sola <span className="text-green font-black">Missione</span>.
                  <br />
                  <span className="block lg:hidden py-1">
                    <motion.span
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-flex justify-center w-full"
                      aria-hidden
                    >
                      <ArrowDown className="w-6 h-6 text-green" strokeWidth={2.5} />
                    </motion.span>
                  </span>
                  <span className="text-green font-black">Risolvere</span> il tuo dolore cervicale in maniera completamente{' '}
                  <span className="text-green font-black">naturale</span> e in{' '}
                  <span className="text-green font-black">poche sedute</span>.
                </motion.h1>

                {/* Video hero solo su mobile: tra titolo e sottotitolo */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:hidden mb-8"
                >
                  <div className="relative max-w-md mx-auto">
                    <div className="absolute -inset-2 rounded-3xl bg-green/20 blur-2xl" />
                    <div className="relative rounded-2xl overflow-hidden aspect-video bg-blue-dark">
                      {STREAM_IFRAME_SRC ? (
                        <iframe
                          src={STREAM_IFRAME_SRC}
                          title="Trattamento osteopatico per dolore cervicale - Mobilitas Torino"
                          className="absolute inset-0 w-full h-full object-cover pointer-events-auto border-0 block scale-[1.04] origin-center"
                          style={{ border: 'none', outline: 'none' }}
                          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <img
                          src="/cervicalgia/cerv11.JPG"
                          alt="Trattamento osteopatico per dolore cervicale - Mobilitas Torino"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="text-lg sm:text-xl text-cream/90 mb-8 max-w-xl mx-auto lg:mx-0"
                >
                  <em>Nessun farmaco. Nessun intervento.</em>
                  <br />
                  Un gran trattamento <strong>osteopatico</strong> specifico per te con <strong>risultati concreti</strong>.
                </motion.p>

                {/* Urgency */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="mb-8"
                >
                  <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-4 px-4 py-3 rounded-xl bg-green/15 border border-green/30">
                    <span className="text-cream font-bold text-base sm:text-sm sm:font-normal sm:text-cream/90">Solo</span>
                    <span className="text-green font-black text-2xl sm:text-xl">15 posti</span>
                    <span className="text-cream font-bold text-base sm:text-sm sm:font-normal sm:text-cream/90">ogni mese con lo sconto</span>
                    <div className="flex items-baseline gap-2 ml-auto">
                      <span className="text-red-400 font-bold text-xl sm:text-2xl line-through">90€</span>
                      <span className="text-green font-black text-2xl sm:text-3xl">49€</span>
                    </div>
                  </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <button
                    onClick={openConsulto}
                    className="group inline-flex items-center justify-center gap-2 text-lg bg-green text-blue-dark font-black py-4 px-8 rounded-2xl shadow-lg hover:shadow-green/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Phone className="w-5 h-5" />
                    Prenota un consulto telefonico gratuito
                  </button>
                  <button
                    onClick={openPrimaVisita}
                    className="group inline-flex items-center justify-center gap-2 text-lg bg-transparent border-2 border-green text-green font-bold py-4 px-8 rounded-2xl hover:bg-green/15 transition-all duration-300"
                  >
                    <CalendarCheck className="w-5 h-5" />
                    Prenota prima visita con sconto
                  </button>
                </motion.div>
              </div>

              {/* Right: Video hero (nascosto su mobile, visibile da lg) */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden lg:block order-1 lg:order-2"
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-3xl bg-green/20 blur-2xl" />
                  <div className="relative rounded-2xl overflow-hidden aspect-video bg-blue-dark">
                    {STREAM_IFRAME_SRC ? (
                      <iframe
                        src={STREAM_IFRAME_SRC}
                        title="Trattamento osteopatico per dolore cervicale - Mobilitas Torino"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-auto border-0 block scale-[1.04] origin-center"
                        style={{ border: 'none', outline: 'none' }}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img
                        src="/cervicalgia/cerv12.JPG"
                        alt="Trattamento osteopatico per dolore cervicale - Mobilitas Torino"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recensioni carousel */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 lg:mt-20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-green" />
                <h2 className="text-xl font-bold text-cream">
                  Siamo lo studio osteopatico con <span className="text-green">più recensioni d'Italia</span>
                </h2>
              </div>
              <div className="relative">
                <div
                  className="transition-[height] duration-300 ease-out overflow-hidden"
                  style={{ height: recensioniCarouselHeight ? `${recensioniCarouselHeight}px` : 'auto' }}
                >
                  <div
                    ref={carouselRef}
                    className="flex items-start overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                  <style>{`
                    .cervicalgia-carousel::-webkit-scrollbar { display: none; }
                  `}</style>
                  {RECENSIONI_IMAGES.map((src, i) => (
                    <div
                      key={i}
                      className="cervicalgia-carousel flex-shrink-0 w-[280px] sm:w-[320px] snap-center"
                      data-recensione-card={i}
                    >
                      <div className="rounded-2xl overflow-hidden border border-green/20 bg-blue-dark/80 shadow-xl">
                        <img
                          src={src}
                          alt={`Recensione ${i + 1}`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          onLoad={() => handleRecensioneImgLoad(i)}
                        />
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  {Array.from({ length: RECENSIONI_SEGMENTS }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === carouselIndex ? 'bg-green w-6' : 'bg-cream/40 hover:bg-cream/60'
                      }`}
                      aria-label={`Vai a segmento ${i + 1}`}
                    />
                  ))}
                </div>
                <div className={`${PAGE_TEXT_ALIGN} mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2`}>
                  <p className="text-cream/60 text-sm">
                    Scorri per vedere alcune delle 700+ recensioni ufficiali
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Benefit bullets */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 lg:mt-24"
            >
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-cream mb-8 ${PAGE_TEXT_ALIGN}`}>
                I <span className="text-green">benefici</span> del trattamento osteopatico per il{' '}
                <span className="text-green">dolore cervicale</span>
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mb-10 lg:mb-12"
              >
                <div className="relative max-w-2xl overflow-hidden rounded-2xl border border-green/20 shadow-xl">
                  <img
                    src="/cervicalgia/cerv13.JPG"
                    alt="Trattamento osteopatico per il benessere del collo e della postura"
                    className="w-full aspect-[16/10] sm:aspect-[21/9] object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
              <ul className="space-y-4 max-w-3xl pl-4 lg:pl-0">
                {BENEFITS.map((text, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                    className="flex gap-2 items-start group"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green/20 border border-green/40 flex items-center justify-center mt-0.5 group-hover:bg-green/30 transition-colors">
                      <CheckCircle2 className="w-3 h-3 text-green" />
                    </span>
                    <span className="text-cream/95 text-base sm:text-lg leading-relaxed">
                      {text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTAs fine sezione */}
            <div className="mt-16 lg:mt-20 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openConsulto}
                className="group inline-flex items-center justify-center gap-2 text-lg bg-green text-blue-dark font-black py-4 px-8 rounded-2xl shadow-lg hover:shadow-green/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <Phone className="w-5 h-5" />
                Prenota un consulto telefonico gratuito
              </button>
              <button
                onClick={openPrimaVisita}
                className="group inline-flex items-center justify-center gap-2 text-lg bg-transparent border-2 border-green text-green font-bold py-4 px-8 rounded-2xl hover:bg-green/15 transition-all duration-300"
              >
                <CalendarCheck className="w-5 h-5" />
                Prenota prima visita con sconto
              </button>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-dark to-transparent pointer-events-none"
          aria-hidden
        />
      </section>

      {/* Pain + Agitate Section */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-blue-dark border-t border-green/10">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Pain points */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-20 lg:mb-28"
          >
            <p className="text-green text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Ti riconosci?
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-cream leading-tight max-w-2xl mb-10 lg:mb-12">
              Il dolore cervicale non è solo un fastidio.
              <br />
              <span className="text-green">È qualcosa che può rovinare le tue giornate!</span>
            </h2>
            <div className="relative -mx-4 sm:-mx-6 lg:-mx-0">
              <div
                ref={painCarouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 scroll-smooth px-4 sm:px-6 lg:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`
                  .pain-carousel::-webkit-scrollbar { display: none; }
                `}</style>
                {PAIN_POINTS.map((pain, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    className="pain-carousel flex-shrink-0 w-[280px] sm:w-[300px] snap-center"
                  >
                    <div className="group h-full rounded-2xl border border-green/20 bg-green/5 p-5 hover:border-green/40 hover:bg-green/10 transition-all duration-300 flex flex-col">
                      <span className="text-green/50 font-black text-base sm:text-sm tabular-nums mb-2">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-green font-bold text-base sm:text-lg leading-snug mb-1 min-h-[2.75rem] sm:min-h-[3rem] flex-shrink-0">
                        {pain.title}
                      </h3>
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-green/20 mb-3 flex-shrink-0">
                        <img
                          src={PAIN_IMAGES[i]}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/60 via-transparent to-transparent" />
                      </div>
                      <p className="text-cream/70 text-sm sm:text-sm leading-relaxed line-clamp-3">
                        {pain.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center gap-1.5 mt-5 lg:mt-6 flex-wrap">
                {PAIN_POINTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPainSlide(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === painIndex ? 'bg-green w-5 h-2' : 'bg-cream/30 w-2 h-2 hover:bg-cream/50'
                    }`}
                    aria-label={`Pain ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Agitate */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-green/30 bg-gradient-to-br from-green/10 to-transparent p-8 lg:p-12 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green/20 border border-green/40">
                  <AlertTriangle className="w-5 h-5 text-green" />
                </span>
                <p className="text-green text-sm font-semibold uppercase tracking-[0.2em]">
                  Se lo ignori
                </p>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-cream leading-tight mb-8 max-w-2xl">
                Il dolore raramente resta uguale.
                <br />
                <span className="text-green">Diventa più <strong>frequente</strong>, più intenso, più limitante.</span>
              </h3>
              <div className="mb-8 max-w-2xl overflow-hidden rounded-2xl border border-green/20 shadow-xl">
                <img
                  src="/cervicalgia/cerv14.JPG"
                  alt="Dolore cervicale che peggiora nel tempo - Mobilitas Torino"
                  className="w-full aspect-[16/10] sm:aspect-[21/9] object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="space-y-6 max-w-3xl">
                <p className="text-cream/90 text-base lg:text-lg leading-relaxed">
                  Quello che oggi è un fastidio dopo una giornata al computer può trasformarsi in <strong>rigidità costante</strong>. Il collo si irrigidisce, i muscoli restano in tensione e i movimenti diventano sempre più limitati. Con il tempo il dolore può irradiarsi verso spalle, scapole e braccia.
                </p>
                <p className="text-cream/90 text-base lg:text-lg leading-relaxed">
                  Molte persone si adattano al dolore senza accorgersene. Questo crea ulteriori compensi e il problema tende a <strong>cronicizzarsi</strong>. Quando il dolore diventa cronico, recuperare richiede molto più tempo. <span className="text-green font-semibold">Intervenire presto</span> significa evitare che un problema gestibile condizioni ogni giorno la tua vita.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTAs fine sezione */}
          <div className="mt-16 lg:mt-20 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openConsulto}
              className="group inline-flex items-center justify-center gap-2 text-lg bg-green text-blue-dark font-black py-4 px-8 rounded-2xl shadow-lg hover:shadow-green/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <Phone className="w-5 h-5" />
              Prenota un consulto telefonico gratuito
            </button>
            <button
              onClick={openPrimaVisita}
              className="group inline-flex items-center justify-center gap-2 text-lg bg-transparent border-2 border-green text-green font-bold py-4 px-8 rounded-2xl hover:bg-green/15 transition-all duration-300"
            >
              <CalendarCheck className="w-5 h-5" />
              Prenota prima visita con sconto
            </button>
          </div>
        </div>
      </section>

      {/* Trattamento osteopatico - Benefici */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-blue-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-green/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className={`${PAGE_TEXT_ALIGN} mb-16 lg:mb-20`}
          >
            <p className="text-green text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Trattamento osteopatico
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-cream leading-tight max-w-4xl mx-auto mb-6">
              Quando il dolore cervicale viene trattato nel <strong className="text-green">modo giusto</strong>
            </h2>
            <p className="text-cream/80 text-lg lg:text-xl max-w-2xl mx-auto">
              Questi sono i cambiamenti che puoi aspettarti.
            </p>
          </motion.div>

          {/* Mobile: carosello orizzontale benefici */}
          <div className="lg:hidden -mx-4 sm:-mx-6 px-4 sm:px-6">
            <div
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                .benefits-carousel-mobile::-webkit-scrollbar { display: none; }
              `}</style>
              {TREATMENT_BENEFITS.map((item, i) => {
                const Icon = item.icon
                const isFirst = i === 0
                return (
                  <div
                    key={i}
                    className="benefits-carousel-mobile flex-shrink-0 w-[85vw] max-w-[320px] snap-center"
                  >
                    <div className={`group h-full w-full rounded-2xl border p-5 flex flex-col ${
                      isFirst
                        ? 'border-green/30 bg-gradient-to-br from-green/15 to-green/5'
                        : 'border-green/20 bg-green/5 hover:border-green/40 hover:bg-green/10'
                    } transition-all duration-300`}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className={`rounded-xl border flex items-center justify-center flex-shrink-0 ${
                          isFirst ? 'w-12 h-12 rounded-2xl bg-green/20 border-green/40' : 'w-11 h-11 rounded-xl bg-green/20 border-green/40'
                        }`}>
                          <Icon className={isFirst ? 'w-6 h-6 text-green' : 'w-5 h-5 text-green'} />
                        </div>
                        <span className="text-green/40 font-black text-xs tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-green/20 mb-3 flex-shrink-0">
                        <img
                          src={PAIN_IMAGES[i % PAIN_IMAGES.length]}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-green font-bold text-base leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-cream/80 text-sm leading-relaxed flex-1 min-h-0">
                        {item.body}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop: Bento grid - primo beneficio in evidenza, poi 8 in griglia */}
          <div className="hidden lg:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {/* Hero card - Leggerezza (span 4 on lg) */}
            {TREATMENT_BENEFITS.slice(0, 1).map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                  className="col-span-2 lg:col-span-4"
                >
                  <div className="group h-full rounded-3xl border border-green/30 bg-gradient-to-br from-green/15 to-green/5 p-6 lg:p-8 hover:border-green/50 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green/20 border border-green/40 flex items-center justify-center">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-green/50 font-black text-sm tabular-nums">01</span>
                      <h3 className="text-green font-bold text-xl sm:text-2xl mt-1 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-cream/90 text-base sm:text-lg leading-relaxed max-w-3xl">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
            {/* Resto benefici - 8 card */}
            {TREATMENT_BENEFITS.slice(1).map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: (i + 1) * 0.05 }}
                  className="flex"
                >
                  <div className="group h-full w-full rounded-2xl border border-green/20 bg-green/5 p-5 lg:p-6 hover:border-green/40 hover:bg-green/10 transition-all duration-300 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-green/20 border border-green/40 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-green" />
                      </div>
                      <span className="text-green/40 font-black text-xs tabular-nums">
                        {String(i + 2).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-green font-bold text-base lg:text-lg leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-cream/80 text-sm leading-relaxed flex-1">
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTAs fine sezione */}
          <div className="mt-16 lg:mt-20 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openConsulto}
              className="group inline-flex items-center justify-center gap-2 text-lg bg-green text-blue-dark font-black py-4 px-8 rounded-2xl shadow-lg hover:shadow-green/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <Phone className="w-5 h-5" />
              Prenota un consulto telefonico gratuito
            </button>
            <button
              onClick={openPrimaVisita}
              className="group inline-flex items-center justify-center gap-2 text-lg bg-transparent border-2 border-green text-green font-bold py-4 px-8 rounded-2xl hover:bg-green/15 transition-all duration-300"
            >
              <CalendarCheck className="w-5 h-5" />
              Prenota prima visita con sconto
            </button>
          </div>
        </div>
      </section>

      {/* Domande frequenti */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-blue-dark border-t border-green/10 overflow-hidden font-montserrat">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(114,250,147,0.06),transparent_45%)]" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[400px] bg-green/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[300px] bg-green/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className={`${PAGE_TEXT_ALIGN} mb-12 lg:mb-16`}
          >
            <p className="text-green text-sm font-semibold uppercase tracking-[0.22em] mb-4">
              Domande frequenti
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-cream leading-tight max-w-4xl mb-6">
              Tutto quello che ti serve sapere, prima di prenotare
            </h2>
            <p className="text-cream/75 text-base lg:text-lg max-w-3xl">
              Risposte chiare su costi, durata, dove siamo e come funziona la prima visita. Zero giri di parole.
            </p>
            <div className="mt-8 max-w-2xl overflow-hidden rounded-2xl border border-green/20 shadow-xl">
              <img
                src="/cervicalgia/cerv15.JPG"
                alt="Prima visita osteopatica - Mobilitas Torino"
                className="w-full aspect-[16/10] sm:aspect-[21/9] object-cover object-center"
                loading="lazy"
              />
            </div>
          </motion.div>

          <div className="max-w-3xl space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const Icon = item.icon
              const isOpen = openFaqIndex === index
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className={`rounded-2xl border overflow-hidden transition-colors ${
                    isOpen ? 'border-green/35 bg-green/5' : 'border-cream/10 bg-blue-dark/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="group w-full bg-transparent text-left px-5 sm:px-6 py-5 sm:py-6 flex items-center gap-4 sm:gap-5 transition-colors hover:bg-green/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green/40 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-dark font-montserrat"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green/15 border border-green/30 flex items-center justify-center text-green group-hover:bg-green/20 group-hover:border-green/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="flex-1 text-cream font-semibold text-base sm:text-lg leading-snug pr-4 font-montserrat">
                      {item.question}
                    </span>
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-green/10 border border-green/20 flex items-center justify-center text-green transition-colors duration-300 group-hover:bg-green/15 group-hover:border-green/30">
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="inline-flex items-center justify-center"
                      >
                        <ChevronDown className="w-4 h-4 block" />
                      </motion.span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-[4.25rem] sm:pl-[4.5rem] pr-5 sm:pr-6 pb-5 sm:pb-6">
                          <p className="text-cream/70 text-sm sm:text-base leading-relaxed font-montserrat">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`${PAGE_TEXT_ALIGN} mt-10 text-cream/55 text-sm`}
          >
            Altre domande?{' '}
            <button
              type="button"
              onClick={openConsulto}
              className="bg-transparent border-0 p-0 text-green font-medium hover:underline underline-offset-2 cursor-pointer"
            >
              Durante la consulenza telefonica gratuita
            </button>{' '}
            ti rispondiamo a tutto.
          </motion.p>
        </div>
      </section>

      {/* Dove siamo */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden font-montserrat border-t border-cream/5">
        {/* Sfondo: blu aziendale (#002552) con leggera profondità e glow */}
        <div className="absolute inset-0 bg-blue-dark" />
        <div className="absolute inset-0 bg-[linear-gradient(165deg,#002552_0%,#001f48_40%,#001a3d_100%)]" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[min(90vw,720px)] h-[420px] bg-[radial-gradient(ellipse_80%_60%,rgba(114,250,147,0.12)_0%,transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[320px] bg-[radial-gradient(ellipse,rgba(114,250,147,0.08)_0%,transparent_65%)]" />
          <div className="absolute top-1/2 left-0 w-[280px] h-[280px] bg-[radial-gradient(ellipse,rgba(0,37,82,0.4)_0%,transparent_60%)]" />
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(114,250,147,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(114,250,147,0.03)_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* 1. Label + titolo + paragrafo (mobile: primo; desktop: colonna sinistra, in alto) */}
            <div className={`${PAGE_TEXT_ALIGN} order-1 lg:order-1`}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-cream/5 border border-cream/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
              >
                <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_10px_rgba(114,250,147,0.5)]" />
                <span className="text-cream/90 text-xs font-semibold uppercase tracking-[0.22em]">Dove siamo</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4"
              >
                <span className="text-cream">Vieni a trovarci</span>
                <span className="block mt-2 text-green">
                  nel cuore di Torino
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="text-cream/70 text-base lg:text-lg leading-relaxed mb-0 lg:mb-8 max-w-xl"
              >
                Lo studio si trova in una posizione strategica, comodo con mezzi pubblici e parcheggio nelle vicinanze.
              </motion.p>
            </div>

            {/* 2. Mappa (mobile: secondo, dopo il paragrafo; desktop: colonna destra) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="order-2 lg:order-2 -mt-10 lg:mt-0"
            >
              {/* Cornice: padding con gradient = bordo sfumato */}
              <div className="p-[1px] rounded-2xl lg:rounded-[1.5rem] bg-gradient-to-br from-green/40 via-cream/15 to-green/30 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(114,250,147,0.1)]">
                <div className="relative rounded-[calc(1rem-1px)] lg:rounded-[calc(1.5rem-1px)] overflow-hidden bg-blue-dark">
                  <div className="absolute inset-0 bg-gradient-to-t from-green/5 via-transparent to-transparent pointer-events-none z-10 rounded-[calc(1rem-1px)] lg:rounded-[calc(1.5rem-1px)]" />
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.274078923546!2d7.65514387704107!3d45.08023495897442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe2e29f381fdc93%3A0x97eee174cab07ada!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Osteopata%20Torino!5e0!3m2!1sit!2sit!4v1760785981478!5m2!1sit!2sit"
                    title="Mobilitas - Studio Osteopatico, Via Peyron 54 Torino"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block w-full rounded-[calc(1rem-1px)] lg:rounded-[calc(1.5rem-1px)]"
                  />
                </div>
              </div>
            </motion.div>

            {/* 3. Indirizzo + mezzi + CTA (mobile: terzo; desktop: colonna sinistra, sotto il paragrafo) */}
            <div className={`${PAGE_TEXT_ALIGN} order-3 lg:order-1`}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="space-y-3 mb-8"
              >
                <a
                  href="https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.08023495897442,7.65514387704107,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-cream/[0.06] border border-cream/10 hover:bg-cream/[0.09] hover:border-green/25 transition-all duration-300 group"
                >
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green/25 to-green/10 border border-green/30 flex items-center justify-center text-green shadow-[0_0_20px_rgba(114,250,147,0.15)] group-hover:shadow-[0_0_24px_rgba(114,250,147,0.22)] transition-shadow">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <span className="font-semibold text-cream group-hover:text-cream/95">Via Peyron 54, Torino</span>
                  <ArrowRight className="w-4 h-4 text-green/80 group-hover:translate-x-1 group-hover:text-green transition-all flex-shrink-0 ml-auto" />
                </a>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-cream/[0.04] border border-cream/5">
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-cream/10 border border-cream/10 flex items-center justify-center text-cream/80 text-xl" aria-hidden>🚇</span>
                  <span className="text-cream/75">Metro: Bernini o Principi d'Acaja</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-cream/[0.04] border border-cream/5">
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-cream/10 border border-cream/10 flex items-center justify-center text-cream/80 text-xl" aria-hidden>🚗</span>
                  <span className="text-cream/75">2 parcheggi vicini + strisce blu</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  type="button"
                  onClick={openConsulto}
                  className="group inline-flex items-center justify-center gap-2 text-lg bg-green text-blue-dark font-black py-4 px-8 rounded-2xl shadow-lg hover:shadow-green/30 transition-all duration-300 hover:scale-[1.02] font-montserrat"
                >
                  <Phone className="w-5 h-5" />
                  Prenota un consulto telefonico gratuito
                </button>
                <button
                  type="button"
                  onClick={openPrimaVisita}
                  className="group inline-flex items-center justify-center gap-2 text-lg bg-transparent border-2 border-green text-green font-bold py-4 px-8 rounded-2xl hover:bg-green/15 transition-all duration-300 font-montserrat"
                >
                  <CalendarCheck className="w-5 h-5" />
                  Prenota prima visita con sconto
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Il bivio: sintomo vs causa */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-blue-dark border-t border-green/10 overflow-hidden font-montserrat">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(114,250,147,0.08),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(114,250,147,0.06),transparent_40%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] bg-green/5 rounded-full blur-[140px]" />
          <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(114,250,147,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(114,250,147,0.25)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className={`${PAGE_TEXT_ALIGN} mb-12 lg:mb-16`}
          >
            <p className="text-green text-sm font-semibold uppercase tracking-[0.22em] mb-4">
              Cosa scegli?
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-cream leading-tight max-w-4xl mx-auto mb-6">
              Il problema non è “cosa fare oggi”.
              <br />
              <span className="text-green">È quale strada scegli per uscirne.</span>
            </h2>
            <p className="text-cream/75 text-base lg:text-lg max-w-3xl mx-auto">
              Le persone che soffrono di dolore cervicale hanno due strade: La via tradizionale obbligat al corpo a convivere con il <strong>sintomo</strong>... Noi invece sistemiamo le <strong>cause</strong> che alimentano la tensione sulla cervicale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Strada “Loro” */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-red/20 to-transparent blur-xl" />
              <div className="relative h-full rounded-[26px] border border-red/20 bg-red/5 p-6 sm:p-7 overflow-hidden">
                <div className="absolute top-0 right-0 w-56 h-56 bg-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

                <div className="relative flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-red/20 border border-red/40">
                      <XCircle className="w-5 h-5 text-red" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-red/90 font-black uppercase tracking-wider text-sm">Strada A</p>
                      <h3 className="text-cream font-black text-xl sm:text-2xl leading-tight mt-0">
                        Spegnere il sintomo
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red/30 bg-red/10 text-red text-xs font-semibold">
                    sollievo breve
                    <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                    ritorno
                  </span>
                </div>

                {/* Flow */}
                <div className="relative pl-4">
                  <div className="absolute left-1.5 top-1.5 bottom-1.5 w-px bg-gradient-to-b from-red/50 via-red/25 to-transparent" />
                  <div className="space-y-3">
                    {LORO_ITEMS.map((item, i) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: i * 0.06 }}
                          className="relative"
                        >
                          <div className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-blue-dark border border-red/40 flex items-center justify-center">
                            <span className="text-red text-[10px] font-black tabular-nums">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="rounded-2xl border border-red/20 bg-blue-dark/25 p-4 hover:bg-blue-dark/35 transition-colors">
                            <div className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-red/20 border border-red/40 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-red" />
                              </span>
                              <div className="min-w-0">
                                <p className="text-cream font-bold text-sm sm:text-base leading-snug">
                                  {item.title}
                                </p>
                                <p className="text-cream/60 text-xs sm:text-sm leading-relaxed mt-1">
                                  {item.body}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-red/25 bg-red/10 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red/20 border border-red/40">
                      <AlertTriangle className="w-5 h-5 text-red" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-cream font-bold text-sm">Il limite</p>
                      <p className="text-cream/60 text-xs sm:text-sm leading-relaxed mt-1">
                        Ti dà respiro, ma spesso non cambia ciò che genera la rigidità: la cervicale resta <strong>“sotto carico”</strong> e il problema tende a ripresentarsi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Strada “Noi” */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-green/30 to-transparent blur-xl" />
              <div className="relative h-full rounded-[26px] border border-green/25 bg-gradient-to-br from-green/10 to-transparent p-6 sm:p-7 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-green/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

                <div className="relative flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-green/20 border border-green/40">
                      <CheckCircle2 className="w-5 h-5 text-green" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-green/90 font-black uppercase tracking-wider text-sm">Strada B</p>
                      <h3 className="text-cream font-black text-xl sm:text-2xl leading-tight mt-0">
                        Togliere la causa
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/30 bg-green/10 text-green text-xs font-semibold">
                    progressivo
                    <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                    stabile
                  </span>
                </div>

                {/* Flow */}
                <div className="relative pl-4">
                  <div className="absolute left-1.5 top-1.5 bottom-1.5 w-px bg-gradient-to-b from-green/70 via-green/25 to-transparent" />
                  <div className="space-y-3">
                    {NOI_ITEMS.map((item, i) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: i * 0.06 }}
                          className="relative"
                        >
                          <div className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-blue-dark border border-green/50 flex items-center justify-center">
                            <span className="text-green text-[10px] font-black tabular-nums">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="rounded-2xl border border-green/25 bg-blue-dark/25 p-4 hover:bg-blue-dark/35 hover:border-green/40 transition-colors">
                            <div className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-green/20 border border-green/40 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-green" />
                              </span>
                              <div className="min-w-0">
                                <p className="text-cream font-bold text-sm sm:text-base leading-snug">
                                  {item.title}
                                </p>
                                <p className="text-cream/75 text-xs sm:text-sm leading-relaxed mt-1">
                                  {item.body}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-green/25 bg-green/10 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-green/20 border border-green/40">
                      <ShieldCheck className="w-5 h-5 text-green" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-cream font-bold text-sm">Il vantaggio</p>
                      <p className="text-cream/75 text-xs sm:text-sm leading-relaxed mt-1">
                        Non inseguiamo il dolore: rimettiamo in equilibrio le strutture che lo alimentano, così il collo torna a <strong>muoversi</strong> e a reggere la giornata senza “andare in allarme”.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Micro-CTA */}
          {/* Micro-CTA rimosso su richiesta */}

          {/* CTAs fine sezione */}
          <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openConsulto}
              className="group inline-flex items-center justify-center gap-2 text-lg bg-green text-blue-dark font-black py-4 px-8 rounded-2xl shadow-lg hover:shadow-green/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <Phone className="w-5 h-5" />
              Prenota un consulto telefonico gratuito
            </button>
            <button
              onClick={openPrimaVisita}
              className="group inline-flex items-center justify-center gap-2 text-lg bg-transparent border-2 border-green text-green font-bold py-4 px-8 rounded-2xl hover:bg-green/15 transition-all duration-300"
            >
              <CalendarCheck className="w-5 h-5" />
              Prenota prima visita con sconto
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        <BookingPopup
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          pageContext="cervicalgia"
          ctaType={bookingCtaType}
        />
      </AnimatePresence>
      <WhatsAppButton />
    </div>
  )
}

export default Cervicalgia
