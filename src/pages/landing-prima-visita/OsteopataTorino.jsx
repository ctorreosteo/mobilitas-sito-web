import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Brain,
  Bone,
  BicepsFlexed,
  Footprints,
  Soup,
  Wind,
  Venus,
  Stethoscope,
  MapPin,
} from 'lucide-react'
import { STUDI } from '../../data/studi'
import { PAROLE_GENERICHE, TAG_RECENSIONI_GENERICHE } from '../../data/dolori'
import PageShell from '../../components/site/PageShell'
import BookingPopup from '../../components/BookingPopup'
import StudiMap from '../../components/studi-map/StudiMap'
import CityMap from '../../components/landing/CityMap'
import FotoVentaglio from '../../components/landing/collage/FotoVentaglio'
import FotoDoppia from '../../components/landing/collage/FotoDoppia'
import RecensioniTag from '../../components/recensioni-tag/RecensioniTag'
import { VisitaCtas, VisitaDock } from '../../components/landing/VisitaCtas'
import { Kicker, MaskLines, Reveal } from '../../components/home-sections/HomeKit'
import { EASE } from '../../components/home-sections/homeMotion'
import '../../styles/pages/osteopata-torino.css'

// Concetto: "Torino, a portata di mano". Chi cerca un osteopata su Google vuole capire in un attimo
// se siamo affidabili, vicini e veloci da prenotare. In apertura: conto alla rovescia dell'offerta,
// foto dello studio con i due indirizzi, prezzo e prenotazione. Momenti firma: la mappa del corpo
// ("dove ti fa male?" → l'area si accende) e la mappa di Torino con i due studi e la metro.

// Foto dello studio (versioni ottimizzate di /home/homeN.png)
const homeImages = ['home7', 'home4', 'home1', 'home2', 'home5', 'home8', 'home3']

const bodyAreas = [
  {
    icon: Brain,
    region: 'head',
    title: "Testa, Collo e Sistema Nervoso",
    problems: [
      "Cervicalgia", "Emicrania", "Mal di testa tensivo", "Vertigini", "Acufeni",
      "Colpo di frusta", "Dolori mandibolari (ATM)", "Bruxismo", "Click mandibolare",
      "Difficoltà di concentrazione", "Ansia somatizzata", "Disturbi del sonno",
      "Tensione da postura al PC", "Cefalea da stress", "Tensione cranica nei bambini",
      "Nebbia mentale", "Irritabilità nei neonati"
    ]
  },
  {
    icon: Bone,
    region: 'spine',
    title: "Schiena, Bacino e Postura",
    problems: [
      "Lombalgia", "Dorsalgia", "Sciatalgia", "Ernia del disco", "Dolore al coccige",
      "Dolore pelvico cronico", "Mal di schiena da postura", "Problemi posturali",
      "Asimmetrie bacino/spalle", "Tensioni posturali da ansia", "Postura curva da terza età",
      "Rigidità articolare mattutina", "Dolore dopo cadute", "Instabilità da fermi",
      "Dolori dopo uso di bastoni", "Recupero post-operatorio", "Tensioni lombari in gravidanza"
    ]
  },
  {
    icon: BicepsFlexed,
    region: 'arms',
    title: "Arti Superiori",
    problems: [
      "Epicondilite", "Tunnel carpale", "Formicolii a braccia e mani", "Dolori articolari diffusi",
      "Dolore alla spalla", "Mani deboli o doloranti", "Rigidità articolare del braccio",
      "Dolore durante l'allenamento", "Dolore da supporti tecnologici"
    ]
  },
  {
    icon: Footprints,
    region: 'legs',
    title: "Arti Inferiori",
    problems: [
      "Dolore al ginocchio", "Fascite plantare", "Piedi gonfi", "Dolori di crescita alle gambe",
      "Anche rigide o artrosiche", "Difficoltà a camminare", "Salite e discese faticose",
      "Edemi agli arti inferiori", "Debolezza posturale nel passo", "Dolori alle gambe in gravidanza"
    ]
  },
  {
    icon: Soup,
    region: 'belly',
    title: "Sistema Digestivo e Gastrointestinale",
    problems: [
      "Reflusso gastrico", "Gonfiore addominale", "Colon irritabile", "Stitichezza",
      "Diarrea ricorrente", "Pancia gonfia o dura", "Digestione lenta", "Irritabilità intestinale da stress",
      "Problemi digestivi legati alla postura", "Malassorbimento posturale", "Dolori addominali ciclici"
    ]
  },
  {
    icon: Wind,
    region: 'chest',
    title: "Sistema Respiratorio e Diaframma",
    problems: [
      "Fiato corto", "Diaframma rigido", "Difficoltà respiratorie", "Respirazione superficiale da stress",
      "Respiro bloccato in gravidanza", "Asma funzionale", "Oppressione toracica da postura",
      "Affaticamento nel parlare", "Difficoltà a respirare profondamente"
    ]
  },
  {
    icon: Venus,
    region: 'pelvis',
    title: "Area Donna e Sistema Uro-Ginecologico",
    problems: [
      "Dolori mestruali", "Ciclo irregolare", "Sindrome premestruale acuta", "Endometriosi (supporto sintomatico)",
      "Dispareunia", "Tensioni pelviche", "Difficoltà nel concepimento", "Diastasi addominale post-parto",
      "Rigidità del bacino post-parto", "Incontinenza urinaria", "Inestetismi da ritenzione",
      "Dolori legati a scarpe con tacco"
    ]
  }
]

// Foto dei trattamenti in versione web (public/trattamenti/web, larghe 900 e 1600 px)
const webImg = (nome, w = 900) => `/trattamenti/web/${nome}_orizzontale-${w}.jpg`

// Collage "un trattamento per ogni zona" (foto sovrapposte, poco spazio): le stesse aree della mappa del corpo
const FOTO_ZONE = [
  { nome: 'collo_presa-cervicale-supino_02', pos: '45% 45%', zona: 'Collo', alt: 'Trattamento osteopatico del collo' },
  { nome: 'schiena_lombare-prono_14', pos: '45% 55%', zona: 'Schiena', alt: 'Trattamento osteopatico della schiena' },
  { nome: 'pancia_addome-supino_08', pos: '50% 55%', zona: 'Pancia', alt: "Trattamento osteopatico dell'addome" },
  { nome: 'spalla_scapola-decubito-laterale_06', pos: '50% 60%', zona: 'Spalle', alt: 'Trattamento osteopatico di spalla e scapola' },
  { nome: 'gamba_ginocchio-supino_01', pos: '55% 55%', zona: 'Gambe', alt: 'Trattamento osteopatico del ginocchio' },
  { nome: 'anca_flessa-supino_06', pos: '45% 70%', zona: 'Bacino', alt: "Trattamento osteopatico dell'anca e del bacino" },
]

// Osteopati diversi per specializzazioni diverse (accanto all'elenco)
const FOTO_TEAM = [
  { nome: 'spalla_supino-con-bambino_01', pos: '35% 40%', etichetta: 'Pediatria', alt: 'Osteopata Mobilitas con una mamma e il suo bambino' },
  { nome: 'gamba_gamba-tesa-sollevata_01', pos: '75% 50%', etichetta: 'Sport', alt: 'Osteopata Mobilitas lavora sulla gamba di uno sportivo' },
  { nome: 'schiena_lombare-prono_03', pos: '45% 55%', etichetta: 'Postura', alt: 'Osteopata Mobilitas tratta la schiena di un paziente' },
]

// Due foto sovrapposte accanto alle domande frequenti
const FOTO_FAQ = [
  { nome: 'pancia_addome-dettaglio-mani_01', pos: '50% 50%', alt: "Le mani dell'osteopata durante il trattamento" },
  { nome: 'collo_presa-cervicale-supino_16', pos: '40% 50%', alt: 'Trattamento osteopatico del collo nello studio Mobilitas' },
]

const specializations = [
  "Gravidanza e Pediatria",
  "Geriatria e Terza Età",
  "Postura e Lavori Pesanti",
  "Sport e Performance",
  "Postura e Lavoro Sedentario",
  "E tutto quello che ti serve!"
]

const faqs = [
  {
    question: "Dove si trovano gli studi?",
    answer: "Abbiamo due studi a Torino: in Via Peyron 54 (San Donato) e in Via Lamarmora 35 (Crocetta). Via Peyron è comoda con la metro (fermate Bernini o Principi d'Acaja) e ha 2 parcheggi vicini e strisce blu; Via Lamarmora è a due passi dalla metro Re Umberto, con parcheggi vicini e strisce blu. Quando prenoti ti mandiamo le indicazioni precise."
  },
  {
    question: "Quanto dura un trattamento osteopatico?",
    answer: "Il trattamento completo dura circa 1 ora. Ti consigliamo di arrivare 10 minuti prima dell'orario fissato per completare l'accettazione e permetterci di iniziare puntualmente la tua visita."
  },
  {
    question: "Come devo vestirmi per la visita?",
    answer: "Ti consigliamo di indossare un abbigliamento comodo, preferibilmente sportivo come quello che useresti per andare in palestra. L'importante è che tu ti senta a tuo agio e che i vestiti permettano all'osteopata di valutare la tua postura e di eseguire i test necessari."
  },
  {
    question: "Con quale osteopata farò la visita?",
    answer: "Durante la chiamata con la nostra segreteria, analizzeremo insieme i tuoi bisogni e le tue esigenze specifiche. In base alla tua problematica, ti assegneremo l'osteopata più indicato per il tuo caso, garantendoti un trattamento personalizzato e mirato."
  },
  {
    question: "Quali sono gli orari di apertura?",
    answer: "Siamo aperti dal lunedì al venerdì dalle 8:00 alle 21:00 e il sabato dalle 9:00 alle 18:00. La domenica siamo chiusi."
  },
  {
    question: "Quanto costa la prima visita?",
    answer: "La prima visita con valutazione posturale e trattamento osteopatico è in offerta a 49€ (prezzo originale 90€). Questa offerta include un'anamnesi completa, la valutazione posturale e il trattamento osteopatico specializzato per la tua problematica."
  },
  {
    question: "Serve la prescrizione medica?",
    answer: "No, non è necessaria la prescrizione medica per accedere ai trattamenti osteopatici. Puoi prenotare direttamente contattando la nostra segreteria o compilando il form di prenotazione online."
  },
  {
    question: "Quante sedute servono per risolvere il problema?",
    answer: "Il numero di sedute necessarie varia in base alla problematica e alla risposta individuale al trattamento. Durante la prima visita, dopo la valutazione, l'osteopata ti fornirà un piano di trattamento personalizzato con una stima delle sedute necessarie per il tuo caso specifico."
  }
]


const pad = (n) => String(n).padStart(2, '0')

// ---------- Conto alla rovescia ----------
const Countdown = ({ timeLeft, compact = false }) => (
  <span className={`mx-ot-timer ${compact ? 'mx-ot-timer--compact' : ''}`} role="timer" aria-live="off">
    <b>{pad(timeLeft.hours)}h</b>
    <i>:</i>
    <b>{pad(timeLeft.minutes)}m</b>
    <i>:</i>
    <b>{pad(timeLeft.seconds)}s</b>
  </span>
)

// ---------- Mappa del corpo ----------
const BodyFigure = ({ active, onPick }) => {
  const on = (r) => (active === r ? 'is-on' : '')
  const pick = (r) => () => onPick(bodyAreas.findIndex((a) => a.region === r))
  return (
    <svg className="mx-ot-body" viewBox="0 0 200 440" role="img" aria-label="Mappa del corpo">
      <defs>
        <radialGradient id="mx-ot-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#72fa93" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#72fa93" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* braccia */}
      <g className={`mx-ot-body__part ${on('arms')}`} onClick={pick('arms')}>
        <path d="M58 104 C 40 112, 34 150, 30 190 C 27 222, 24 246, 22 262 C 21 270, 32 272, 34 264 C 40 238, 46 214, 52 190 C 56 172, 60 150, 64 132 Z" />
        <path d="M142 104 C 160 112, 166 150, 170 190 C 173 222, 176 246, 178 262 C 179 270, 168 272, 166 264 C 160 238, 154 214, 148 190 C 144 172, 140 150, 136 132 Z" />
      </g>
      {/* gambe */}
      <g className={`mx-ot-body__part ${on('legs')}`} onClick={pick('legs')}>
        <path d="M70 262 C 66 310, 68 360, 72 420 C 73 430, 92 430, 92 420 C 94 370, 96 320, 98 276 Z" />
        <path d="M130 262 C 134 310, 132 360, 128 420 C 127 430, 108 430, 108 420 C 106 370, 104 320, 102 276 Z" />
      </g>
      {/* busto */}
      <path className="mx-ot-body__torso" d="M62 98 C 80 90, 120 90, 138 98 C 146 140, 142 190, 136 236 C 134 256, 132 270, 128 280 L 72 280 C 68 270, 66 256, 64 236 C 58 190, 54 140, 62 98 Z" />
      {/* torace / diaframma */}
      <g className={`mx-ot-body__part ${on('chest')}`} onClick={pick('chest')}>
        <path d="M70 108 C 84 102, 116 102, 130 108 C 134 128, 132 150, 128 166 C 112 172, 88 172, 72 166 C 68 150, 66 128, 70 108 Z" />
      </g>
      {/* addome */}
      <g className={`mx-ot-body__part ${on('belly')}`} onClick={pick('belly')}>
        <path d="M74 174 C 90 180, 110 180, 126 174 C 128 196, 128 214, 126 228 C 110 234, 90 234, 74 228 C 72 214, 72 196, 74 174 Z" />
      </g>
      {/* bacino */}
      <g className={`mx-ot-body__part ${on('pelvis')}`} onClick={pick('pelvis')}>
        <path d="M74 236 C 90 242, 110 242, 126 236 C 128 252, 126 266, 122 278 L 78 278 C 74 266, 72 252, 74 236 Z" />
      </g>
      {/* testa e collo */}
      <g className={`mx-ot-body__part ${on('head')}`} onClick={pick('head')}>
        <ellipse cx="100" cy="46" rx="25" ry="29" />
        <path d="M90 72 L 110 72 L 112 96 L 88 96 Z" />
      </g>
      {/* colonna: le vertebre */}
      <g className={`mx-ot-body__spine ${on('spine')}`} onClick={pick('spine')}>
        {Array.from({ length: 16 }, (_, i) => (
          <rect key={i} x={100 - (5 + i * 0.35)} y={78 + i * 12.4} width={10 + i * 0.7} height="8" rx="3" />
        ))}
      </g>
    </svg>
  )
}

const BodyMap = () => {
  const [active, setActive] = useState(0)
  const area = bodyAreas[active]
  const Icon = area.icon
  const tabsRef = useRef(null)

  // Porta in vista la scheda selezionata nella fila scorrevole (telefono)
  useEffect(() => {
    const el = tabsRef.current?.querySelector(`[data-i="${active}"]`)
    const row = tabsRef.current
    if (el && row && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: el.offsetLeft - 24, behavior: 'smooth' })
    }
  }, [active])

  return (
    <div className="mx-ot-bodymap">
      <div className="mx-ot-bodymap__tabs-wrap">
        <div className="mx-ot-bodymap__tabs" ref={tabsRef} role="tablist" aria-label="Aree del corpo">
          {bodyAreas.map((a, i) => {
            const TabIcon = a.icon
            return (
              <button
                key={a.title}
                data-i={i}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`mx-ot-bodymap__tab ${active === i ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <TabIcon size={18} />
                <span>{a.title}</span>
              </button>
            )
          })}
        </div>
        <span className="mx-ot-hint mx-ot-hint--mobile">
          ← Scorri per vedere tutte le aree →
        </span>
      </div>

      <div className="mx-ot-bodymap__stage">
        <div className="mx-ot-bodymap__figure">
          <BodyFigure active={area.region} onPick={setActive} />
        </div>

        <div className="mx-ot-bodymap__panel" role="tabpanel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="mx-ot-bodymap__head">
                <span className="mx-ot-bodymap__icon"><Icon size={24} /></span>
                <span className="mx-ot-bodymap__n">{pad(active + 1)} / {pad(bodyAreas.length)}</span>
              </div>
              <h3 className="mx-h mx-h--md">{area.title}</h3>
              <ul className="mx-ot-bodymap__list">
                {area.problems.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ---------- Mappa di Torino: i due studi ----------

const OsteopataTorino = () => {
  const [currentMonth, setCurrentMonth] = useState('')
  // Popup di prenotazione comune alle landing: prima visita a 49€ o consulto gratuito
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('primaVisita') // 'consulto' | 'primaVisita'
  const carouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [openFAQIndex, setOpenFAQIndex] = useState(null)
  const heroCtaRef = useRef(null)
  const heroCtaInView = useInView(heroCtaRef, { margin: '0px 0px -40px 0px' })
  const [scrolledPastTop, setScrolledPastTop] = useState(false)

  // Check carousel scroll position
  useEffect(() => {
    const el = carouselRef.current
    const checkScroll = () => {
      if (el) {
        const { scrollLeft, scrollWidth, clientWidth } = el
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

        // Calculate which image is currently visible
        const imageWidth = el.scrollWidth / homeImages.length
        const newIndex = Math.round(scrollLeft / imageWidth)
        setCurrentImageIndex(Math.min(newIndex, homeImages.length - 1))
      }
    }

    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true })
      checkScroll() // Initial check
      window.addEventListener('resize', checkScroll)
    }

    return () => {
      if (el) el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    // Get current month name in Italian
    const months = [
      'GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE', 'MAGGIO', 'GIUGNO',
      'LUGLIO', 'AGOSTO', 'SETTEMBRE', 'OTTOBRE', 'NOVEMBRE', 'DICEMBRE'
    ]
    setCurrentMonth(months[new Date().getMonth()])
  }, [])

  // Il dock compare solo dopo aver lasciato la prima schermata
  useEffect(() => {
    const onScroll = () => setScrolledPastTop(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Countdown to tomorrow night midnight (00:00:00 of day after tomorrow)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const tomorrowNightMidnight = new Date(now)
      // Add 2 days to go to tomorrow night's midnight (not tonight's)
      tomorrowNightMidnight.setDate(tomorrowNightMidnight.getDate() + 2)
      tomorrowNightMidnight.setHours(0, 0, 0, 0)

      const difference = tomorrowNightMidnight - now

      if (difference > 0) {
        const totalHours = Math.floor(difference / (1000 * 60 * 60))
        const hours = totalHours
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ hours, minutes, seconds })
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  // SEO metadata for Osteopata Torino landing page (keyword-optimized)
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Osteopata Torino | Studio Osteopatico Mobilitas: Mal di Schiena, Cervicale, Emicrania'

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

    const description = 'Cerchi un osteopata a Torino? Mobilitas è lo studio osteopatico specializzato in mal di schiena, cervicale, sciatalgia, emicrania e postura. Valutazione + trattamento prima visita a 49€. Prenota online o via WhatsApp.'
    const pageUrl = `${window.location.origin}/osteopata-torino`

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName('keywords', 'osteopata torino, studio osteopatico torino, osteopatia torino, mal di schiena torino, cervicale torino, sciatalgia torino, emicrania torino, postura torino, trattamento osteopatico, prima visita 49€')

    // Open Graph
    ensureMetaByProperty('og:title', 'Osteopata Torino | Studio Osteopatico Mobilitas')
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')

    // Canonical
    ensureCanonical(pageUrl)

    return () => {
      document.title = previousTitle
    }
  }, [])

  const openPrimaVisita = () => {
    setBookingCtaType('primaVisita')
    setShowBooking(true)
  }
  const openConsulto = () => {
    setBookingCtaType('consulto')
    setShowBooking(true)
  }

  const showDock = scrolledPastTop && !heroCtaInView && !showBooking
  const ctas = <VisitaCtas onVisita={openPrimaVisita} onConsulto={openConsulto} />

  return (
    <PageShell className="mx-ot">

      {/* ============ APERTURA ============ */}
      <header className="mx-ot-hero">
        <div className="mx-aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="mx-wrap mx-ot-hero__grid">
          {/* Offerta a tempo: posti e conto alla rovescia */}
          <motion.div
            className="mx-ot-live"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="mx-ot-live__dot" aria-hidden="true" />
            <span className="mx-ot-live__txt">
              <span>4 posti rimasti,</span> <span>l'offerta scade tra:</span>
            </span>
            <Countdown timeLeft={timeLeft} />
          </motion.div>

          <div className="mx-ot-hero__copy">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
              <Kicker>Studio Osteopatico Torino</Kicker>
            </motion.div>
            <h1 className="mx-h mx-ot-hero__title">
              <MaskLines
                immediate
                delay={0.15}
                lines={[
                  { text: 'Qualche dolore o problema che desideri ' },
                  { text: 'risolvere velocemente?', className: 'mx-gradient' },
                ]}
              />
            </h1>
          </div>

          {/* Foto dello studio con i due indirizzi */}
          <motion.div
            className="mx-ot-hero__media"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          >
            <div className="mx-ot-photos">
              {canScrollLeft && (
                <button type="button" onClick={() => scrollCarousel('left')} className="mx-ot-photos__nav mx-ot-photos__nav--l" aria-label="Scorri a sinistra">
                  <ChevronLeft size={22} />
                </button>
              )}
              {canScrollRight && (
                <button type="button" onClick={() => scrollCarousel('right')} className="mx-ot-photos__nav mx-ot-photos__nav--r" aria-label="Scorri a destra">
                  <ChevronRight size={22} />
                </button>
              )}
              <div ref={carouselRef} className="mx-ot-photos__track">
                {homeImages.map((name, index) => (
                  <div key={name} className="mx-ot-photos__slide">
                    <img
                      src={`/home/web/${name}-900.jpg`}
                      srcSet={`/home/web/${name}-900.jpg 900w, /home/web/${name}-1600.jpg 1600w`}
                      sizes="(min-width: 1024px) 560px, 88vw"
                      alt={`Mobilitas ${index + 1}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : undefined}
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              <div className="mx-ot-photos__pins" aria-hidden="true">
                {STUDI.map((s) => (
                  <span key={s.id} className="mx-ot-photos__pin">
                    <MapPin size={13} strokeWidth={2.6} />
                    {s.nome}
                  </span>
                ))}
              </div>
            </div>
            <div className="mx-ot-photos__foot">
              <div className="mx-ot-photos__dots" aria-hidden="true">
                {homeImages.map((name, index) => (
                  <i key={name} className={index === currentImageIndex ? 'is-on' : ''} />
                ))}
              </div>
              <p className="mx-ot-hint mx-ot-hint--mobile">
                Scorri per vedere tutte le immagini
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mx-ot-hero__offer"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          >
            <p className="mx-ot-price">
              <span className="mx-ot-price__row">
                Da <s className="mx-ot-price__old">90€</s> a <b className="mx-ot-price__new">49€</b>
              </span>{' '}
              <span className="mx-ot-price__month">in offerta per {currentMonth.toLowerCase()}</span> <span aria-hidden="true">👇🏼</span>
            </p>

            <div ref={heroCtaRef}>
              <VisitaCtas onVisita={openPrimaVisita} onConsulto={openConsulto} className="mx-ot-hero__ctas" />
            </div>
          </motion.div>

          <motion.div
            className="mx-ot-hero__more"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          >
            <p className="mx-lead mx-ot-hero__lead">
              <strong className="mx-gradient">Mobilitas</strong> è lo studio osteopatico più scelto di Torino.
              Da noi trovi l'osteopata giusto per te, specializzato per la tua problematica!
            </p>
            <ul className="mx-ot-benefits">
              {[
                "Anamnesi completa e valutazione posturale",
                "Trattamento osteopatico specializzato per te",
                "Consigli per prevenire ricadute",
              ].map((benefit) => (
                <li key={benefit}>
                  <span className="mx-ot-benefits__tick"><Check size={14} strokeWidth={3} /></span>
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </header>

      {/* ============ RECENSIONI ============ */}
      {/* Recensioni Google dal gestionale (come la landing cervicalgia): chi cerca un osteopata può avere qualsiasi
          problema, quindi recensioni a caso con le parole dei dolori evidenziate */}
      <section className="mx-section mx-section--deep mx-ot-reviews">
        <div className="mx-wrap">
          <RecensioniTag
            tags={TAG_RECENSIONI_GENERICHE}
            evidenzia={PAROLE_GENERICHE}
            mescola
            titolo={
              <>
                Lo studio osteopatico più scelto, richiesto e <span className="mx-accent">recensito di Torino</span>
              </>
            }
            sottotitolo="Recensioni Google a 5 stelle di pazienti dei nostri studi di Torino."
          />
        </div>
      </section>

      {/* ============ PROBLEMI: la mappa del corpo ============ */}
      <section className="mx-section mx-section--glow mx-ot-problems">
        <div className="mx-wrap">
          <Kicker n="01">Problemi che Risolviamo</Kicker>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: 'Quali sono i problemi che' }, { text: 'trattiamo e risolviamo?', className: 'mx-gradient' }]} />
          </h2>
          <Reveal>
            <p className="mx-lead mx-ot-problems__lead">
              Abbiamo Osteopati specializzati per ogni area del corpo, trattiamo ogni tipo di problema con approcci osteopatici mirati e personalizzati 💪🏼
            </p>
          </Reveal>

          {/* Un trattamento per ogni zona del corpo: foto sovrapposte e ruotate come quelle delle FAQ,
              su telefono due file da tre, su desktop un ventaglio in una fila. Niente scritte sulle foto
              (coprirebbero le persone): i nomi delle zone sono sotto e portano davanti la foto scelta */}
          <FotoVentaglio
            foto={FOTO_ZONE.map((f) => ({ src: `/trattamenti/${f.nome}_orizzontale`, pos: f.pos, alt: f.alt, etichetta: f.zona }))}
            nomi
          />

          <Reveal>
            <BodyMap />
          </Reveal>

          {/* Ogni osteopata con la sua specializzazione */}
          <Reveal className="mx-ot-spec">
            <div className="mx-ot-spec__intro">
              <span className="mx-ot-spec__icon"><Stethoscope size={26} /></span>
              <h3 className="mx-h mx-h--md">Ogni Osteopata con la Sua Specializzazione</h3>
              <p className="mx-body">
                Non un osteopata generico, ma il professionista giusto per te. Ogni membro del nostro team si dedica a una specifica area, garantendoti il trattamento più mirato ed efficace per la tua problematica:
              </p>
            </div>
            {/* Le foto tra il testo e i riquadri: spezzano la lettura (su desktop sotto il testo, a sinistra) */}
            <div className="mx-ot-team">
              {FOTO_TEAM.map((f) => (
                <figure key={f.nome} className="mx-ot-team__item">
                  <div className="mx-ot-team__photo">
                    <img src={webImg(f.nome)} style={{ objectPosition: f.pos }} alt={f.alt} loading="lazy" decoding="async" />
                  </div>
                  <figcaption>{f.etichetta}</figcaption>
                </figure>
              ))}
            </div>
            <ol className="mx-ot-spec__list">
              {specializations.map((s, i) => (
                <li key={s} className={i === specializations.length - 1 ? 'is-last' : ''}>
                  <span>{pad(i + 1)}</span>
                  {s}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>{ctas}</Reveal>
        </div>
      </section>

      {/* ============ DOVE SIAMO: Torino e i due studi ============ */}
      <section className="mx-section mx-section--deep mx-ot-where">
        <div className="mx-wrap mx-ot-where__grid">
          <div className="mx-ot-where__copy">
            <Kicker n="02">Dove Siamo</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Vieni a trovarci' }, { text: 'nel cuore di Torino', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-ot-where__lead">
                Due studi, a San Donato e in Crocetta: scegli il più comodo per te e apri le indicazioni con un clic.
              </p>
            </Reveal>
          </div>

          <Reveal className="mx-ot-where__visual" delay={0.1}>
            <CityMap />
          </Reveal>

          <Reveal className="mx-ot-where__map">
            <StudiMap />
          </Reveal>

          <Reveal className="mx-ot-where__cta">{ctas}</Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mx-section mx-section--glow mx-ot-faq">
        <div className="mx-wrap mx-ot-faq__grid">
          <div className="mx-ot-faq__head">
            <Kicker n="03">Domande Frequenti</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Hai domande?' }, { text: 'Abbiamo le risposte', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-ot-faq__lead">
                Tutto quello che vuoi sapere sul nostro studio e sui trattamenti osteopatici
              </p>
            </Reveal>
            <FotoDoppia
              foto={FOTO_FAQ.map((f) => ({ src: `/trattamenti/${f.nome}_orizzontale`, pos: f.pos, alt: f.alt }))}
              className="mx-ot-faq__photos"
            />
          </div>

          <div className="mx-ot-faq__list">
            {faqs.map((faq, index) => {
              const open = openFAQIndex === index
              return (
                <div key={faq.question} className={`mx-ot-faq__item ${open ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFAQIndex(open ? null : index)}
                    className="mx-ot-faq__q"
                    aria-expanded={open}
                  >
                    <span className="mx-ot-faq__n">{pad(index + 1)}</span>
                    <h3 className="mx-h mx-h--sm">{faq.question}</h3>
                    <ChevronDown className="mx-ot-faq__chev" size={20} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="mx-ot-faq__a"
                      >
                        <p className="mx-body">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          <Reveal className="mx-ot-faq__cta">{ctas}</Reveal>
        </div>
      </section>

      {/* Dock su telefono: la prenotazione sempre a portata di pollice (lo stesso della landing cervicalgia) */}
      <VisitaDock visible={showDock} onVisita={openPrimaVisita} onConsulto={openConsulto} />

      <AnimatePresence>
        <BookingPopup
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          pageContext="osteopata-torino"
          ctaType={bookingCtaType}
        />
      </AnimatePresence>
    </PageShell>
  )
}

export default OsteopataTorino
