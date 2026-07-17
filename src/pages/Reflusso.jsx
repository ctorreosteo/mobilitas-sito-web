import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  CalendarCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Moon,
  Utensils,
  Pill,
  Wind,
  Users,
  Hand,
  Car,
  Check,
  Coffee,
  Mic,
  Plus,
  ExternalLink,
} from 'lucide-react'
import { RECENSIONI_IMAGES } from '../data/recensioni'
import BookingPopup from '../components/BookingPopup'
import SectionDivider from '../components/SectionDivider'

const HERO_BENEFITS = [
  'Lavoriamo sul diaframma: l’anello che aiuta la valvola a chiudersi',
  'Torni a dormire sdraiato, senza passare la notte semi-seduto',
  'Mangi senza calcoli: meno ansia a tavola, meno dipendenza dalla pastiglia',
]

const RECENSIONI_PREVIEW = RECENSIONI_IMAGES.slice(0, 18)
const RECENSIONI_TOTAL = 830
const GOOGLE_RECENSIONI_URL =
  'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.0802312,7.6577188,17z/data=!4m8!3m7!1s0xfe2e29f381fdc93:0x97eee174cab07ada!8m2!3d45.0802312!4d7.6577188!9m1!1b1!16s%2Fg%2F11kqfhtyvd?entry=ttu'

const PAIN_POINTS = [
  {
    icon: Pill,
    title: 'La pastiglia che apre e chiude la giornata',
    body: 'La prendi da mesi, forse da anni. E sai benissimo che non sta curando niente: spegne il bruciore per qualche ora, poi tutto ricomincia come prima.',
  },
  {
    icon: Moon,
    title: 'La notte semi-seduto',
    body: 'Ti sdrai e l’acido risale. Dormi con due cuscini, quasi in piedi. Ti svegli con la gola che brucia, la bocca amara e la sensazione di non aver riposato.',
  },
  {
    icon: Coffee,
    title: 'La dieta ferrea che non è servita a niente',
    body: 'Hai tolto caffè, vino, cioccolato, pomodoro, sughi. Mangi in bianco da una vita. E il reflusso torna lo stesso, come se non contasse nulla di quello che hai sacrificato.',
  },
  {
    icon: Utensils,
    title: 'Ogni pasto è un calcolo',
    body: 'Non mangi più con piacere: mangi con l’ansia. Cosa posso? A che ora? Quanto? E se stanotte sto male di nuovo?',
  },
  {
    icon: Users,
    title: 'Le rinunce che gli altri non capiscono',
    body: 'Niente pizza con gli amici, niente brindisi, niente caffè dopo pranzo. Mentre loro ordinano quello che vogliono, tu ti accontenti, sorridi e fingi che vada bene così.',
  },
  {
    icon: Mic,
    title: 'Sintomi che non sembrano reflusso',
    body: 'Tosse secca, nodo in gola, voce che va via, a volte un dolore al petto che ti ha fatto pensare al cuore. E nessuno li ha collegati al reflusso.',
  },
]

const BENEFITS = [
  {
    icon: Moon,
    title: 'Tornare a dormire sdraiato',
    body: 'Senza passare le notti semi-seduto con due cuscini.',
  },
  {
    icon: Utensils,
    title: 'Mangiare senza fare calcoli',
    body: 'Sederti a tavola con appetito, non con l’ansia di cosa succederà dopo.',
  },
  {
    icon: Pill,
    title: 'Ridurre la pastiglia quotidiana',
    body: 'Se si affronta la causa, il tampone quotidiano può pesare meno.',
  },
  {
    icon: Wind,
    title: 'Liberare il diaframma',
    body: 'Lavoriamo sulle tensioni che aumentano la pressione sullo stomaco.',
  },
  {
    icon: Users,
    title: 'Riprenderti le cene',
    body: 'Smettere di rinunciare mentre gli altri ordinano.',
  },
  {
    icon: Hand,
    title: 'Affiancare il gastroenterologo',
    body: 'Il percorso medico resta: noi lavoriamo su diaframma, postura e sistema neurovegetativo.',
  },
]

const VISIT_STEPS = [
  {
    title: 'Chiamata con la segreteria',
    body: 'La segreteria ti ascolta, capisce bene il tuo problema e ti assegna l’osteopata più adatto alla tua esigenza.',
  },
  {
    title: 'Accettazione',
    body: 'Quando arrivi in studio, facciamo l’accettazione e compili il modulo necessario prima di iniziare.',
  },
  {
    title: 'Inizio del trattamento',
    body: 'Il dottore raccoglie l’anamnesi: tante domande per capire con precisione l’origine del tuo problema.',
  },
  {
    title: 'Valutazione posturale',
    body: 'L’osteopata effettua un esame obiettivo e una valutazione posturale per capire come si muove il tuo corpo nello spazio e individuare l’origine del problema.',
  },
  {
    title: 'Trattamento manuale',
    body: 'Dopo aver studiato il tuo caso specifico, esegue il trattamento manuale per migliorare la tua problematica.',
  },
  {
    title: 'Consigli finali',
    body: 'L’osteopata ti lascia una serie di indicazioni pratiche per mantenere i risultati ottenuti.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'osteopata-stomaco',
    question: (
      <>
        Ma l’<strong>osteopata</strong> che c’entra con lo <em>stomaco</em>? Non è una{' '}
        <u className="decoration-green/50 underline-offset-2">presa in giro</u>?
      </>
    ),
    answer: (
      <>
        Capisco lo scetticismo: se ti brucia lo stomaco, ti aspetti un{' '}
        <strong className="text-cream">gastroenterologo</strong>, non qualcuno che lavora con le
        mani. Il punto è che la <em>valvola</em> tra stomaco ed esofago{' '}
        <u className="decoration-green/40 underline-offset-2">non lavora da sola</u>. È aiutata
        dal <strong className="text-cream">diaframma</strong>, il muscolo del respiro, che le fa
        da anello intorno. Quando quel muscolo è bloccato — <em>postura chiusa</em>, stress,
        respiro corto — l’anello stringe male e la pressione sulla pancia aumenta: l’acido trova
        la porta socchiusa. Su <strong className="text-cream">diaframma, torace e postura</strong>{' '}
        le mani lavorano eccome. Non sostituiamo il tuo medico né i suoi esami:{' '}
        <em>affianchiamo</em> il percorso lavorando sulla{' '}
        <u className="decoration-green/40 underline-offset-2">parte meccanica</u> che la pastiglia
        e la dieta spesso non toccano. Se hai già fatto gastroscopia e controlli, tanto meglio:
        significa che possiamo concentrarci su{' '}
        <strong className="text-cream">ciò che quegli esami non valutano</strong>.
      </>
    ),
  },
  {
    id: 'pastiglia-anni',
    question: (
      <>
        Prendo già la <strong>pastiglia da anni</strong>. Perché dovrei{' '}
        <em>sprecare</em> tempo e soldi da voi?
      </>
    ),
    answer: (
      <>
        Proprio perché la prendi <u className="decoration-green/40 underline-offset-2">da anni</u>.
        Gli inibitori di pompa e gli antiacidi agiscono sul{' '}
        <strong className="text-cream">contenuto</strong>: riducono l’acidità e danno sollievo
        reale. Ma <em>non cambiano la meccanica</em> che fa risalire l’acido. Continua secondo le
        indicazioni del tuo medico: non siamo qui per toglierti la terapia. Siamo qui per lavorare
        su ciò che la pastiglia <strong className="text-cream">non copre</strong> — diaframma,
        pressione addominale, torace chiuso, sistema nervoso della digestione. Molte persone
        arrivano da noi proprio perché la pastiglia “tiene” ma{' '}
        <u className="decoration-green/40 underline-offset-2">non basta più</u>: notti semi-seduti,
        pasti calcolati, dieta ferrea. Se il tampone quotidiano è diventato l’
        <em>unica strategia</em>, ha senso valutare anche la{' '}
        <strong className="text-cream">causa meccanica</strong>. La prima visita a{' '}
        <strong className="text-cream">49€</strong> serve proprio a capire se c’è qualcosa su cui
        possiamo intervenire, senza promettere miracoli e senza sostituire il gastroenterologo.
      </>
    ),
  },
  {
    id: 'gastroscopia',
    question: (
      <>
        La <strong>gastroscopia</strong> è a posto. Quindi non ho niente e{' '}
        <em>sto esagerando</em>, no?
      </>
    ),
    answer: (
      <>
        <strong className="text-cream">No.</strong> Una gastroscopia nella norma è una buona
        notizia: esclude problemi seri e valuta l’esofago. Ma{' '}
        <u className="decoration-green/40 underline-offset-2">non spiega perché la valvola non tenga</u>
        , non misura il diaframma e non guarda la pressione da fuori. Ecco perché puoi avere esami
        “puliti” e bruciare lo stesso: il problema non è sempre ciò che si vede{' '}
        <em>dentro</em>, ma ciò che comprime da <strong className="text-cream">fuori</strong>.
        pH-impedenzometria e manometria approfondiscono il reflusso in altri modi; noi entriamo sul
        piano <em>meccanico e posturale</em>. Non stai esagerando se la notte ti svegli con la gola
        che brucia, se ogni pasto è un calcolo, se hai rinunciato alle cene. Stai descrivendo una{' '}
        <strong className="text-cream">vita limitata</strong>. E se gli esami hanno escluso
        l’emergenza, è il momento migliore per affrontare la parte che resta:{' '}
        <u className="decoration-green/40 underline-offset-2">
          quella che nessuno ha ancora toccato
        </u>
        .
      </>
    ),
  },
  {
    id: 'dieta-tutto',
    question: (
      <>
        Ho già tolto <strong>TUTTO</strong>. Caffè, vino, pomodoro, vita sociale. E ancora brucio.
        Allora <em>cosa mi resta</em>?
      </>
    ),
    answer: (
      <>
        Ti resta la parte che la dieta{' '}
        <u className="decoration-green/40 underline-offset-2">non risolve</u>. Eliminare cibi
        riduce gli <em>scatenanti</em>, non sempre la <strong className="text-cream">causa</strong>.
        Se hai mangiato in bianco per mesi e il reflusso torna “come se non contasse nulla”, è un
        segnale chiaro: <strong className="text-cream">non era solo nel piatto</strong>. Cena presto
        e cuscino rialzato aiutano la notte, ma sono <em>adattamenti</em>. Noi lavoriamo sul
        diaframma e sulla pressione che può tenere la valvola socchiusa. Non ti chiediamo di
        buttare via i consigli del medico: ti chiediamo di aggiungere un{' '}
        <u className="decoration-green/40 underline-offset-2">pezzo mancante</u>. Molti arrivano
        esausti dalle rinunce e dall’imbarazzo a tavola. L’obiettivo non è venderti un’altra lista
        di divieti: è capire se liberare torace, diaframma e sistema della digestione può ridurre
        il bisogno di <strong className="text-cream">vivere a metà</strong>. Se la dieta ferrea non
        è bastata, è il motivo migliore per valutare la parte meccanica.
      </>
    ),
  },
  {
    id: 'solo-stress',
    question: (
      <>
        Non è solo <strong>stress</strong>? Me l’hanno detto tutti. Quindi dovrei solo{' '}
        <em>“rilassarmi”</em>?
      </>
    ),
    answer: (
      <>
        Lo stress <strong className="text-cream">incide davvero</strong> sulla digestione: non è
        una scusa. Ma “è ansia, mangi leggero” spesso{' '}
        <u className="decoration-green/40 underline-offset-2">chiude la conversazione</u> senza
        risolvere niente. Lo stress si scarica su <em>strutture concrete</em> — diaframma
        bloccato, respiro corto, torace chiuso, sistema nervoso in allarme. Il corpo digerisce
        meglio quando non è in modalità difesa. Noi non neghiamo il fattore emotivo: lo traduciamo
        in qualcosa di <strong className="text-cream">lavorabile</strong> con le mani e con
        consigli su respiro e postura. Se ti hanno solo detto di rilassarti e intanto dormi
        semi-seduto da mesi, <em>non ti hanno ascoltato</em> fino in fondo. Un supporto psicologico
        può aiutare; l’osteopatia affianca lavorando sul pezzo fisico che lo stress lascia sul
        corpo. Non è “tutto nella tua testa”: è anche nella{' '}
        <u className="decoration-green/40 underline-offset-2">meccanica</u> che la testa e il corpo
        condividono.
      </>
    ),
  },
  {
    id: 'prezzo-fregatura',
    question: (
      <>
        <strong>49€</strong> la prima visita: qual è la <em>fregatura</em>? Poi mi rifilate un
        pacchetto da mille euro?
      </>
    ),
    answer: (
      <>
        Nessuna fregatura nascosta nella pagina. La prima visita ha uno{' '}
        <strong className="text-cream">sconto dedicato</strong>: da 90€ a{' '}
        <u className="decoration-green/40 underline-offset-2">49€</u>, dura circa{' '}
        <em>60 minuti</em> tra colloquio, valutazione e primo trattamento. Serve a capire il tuo
        caso — da quanto brucia, cosa lo accende, cosa hai già fatto — e a iniziare un lavoro
        mirato. Le sedute successive si valutano in struttura, in base a quello che emerge:{' '}
        <strong className="text-cream">non vendiamo pacchetti miracolosi</strong> in automatico. Se
        non c’è bisogno di un percorso, te lo diciamo. Se c’è, ne parliamo con chiarezza.
        Affianchiamo il gastroenterologo, <em>non lo sostituiamo</em>; non chiediamo di sospendere
        farmaci senza il tuo medico. La polarizzazione vera è questa: o continui solo a{' '}
        <u className="decoration-green/40 underline-offset-2">tamponare</u>, o valuti anche la{' '}
        <strong className="text-cream">causa meccanica</strong>. La prima visita a 49€ è il modo
        più onesto per decidere, con i fatti sul tuo corpo e non con una promessa da landing page.
      </>
    ),
  },
]

function Reflusso() {
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('primaVisita')
  const [painIndex, setPainIndex] = useState(0)
  const [benefitIndex, setBenefitIndex] = useState(0)
  const [recensioniIndex, setRecensioniIndex] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const painRef = useRef(null)
  const benefitRef = useRef(null)
  const recensioniRef = useRef(null)

  const PAIN_W = 300
  const BENEFIT_W = 280
  const RECENSIONI_W = 280
  const GAP = 16
  const RECENSIONI_SLIDES = RECENSIONI_PREVIEW.length + 1 // + card “tutte le recensioni”
  // Ultima foto del preview oppure card Google: su mobile lo snap spesso si ferma una slide prima
  const showGoogleRecensioniCta = recensioniIndex >= RECENSIONI_PREVIEW.length - 2

  useEffect(() => {
    const prevTitle = document.title
    const pageUrl = `${window.location.origin}/reflusso`
    document.title = 'Reflusso Gastroesofageo: Trattamento Osteopatico a Torino | Mobilitas'

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

    const description =
      'Reflusso gastroesofageo a Torino: approccio osteopatico su diaframma e valvola. Non solo antiacidi — lavora sulla meccanica. Prima visita 49€. Prenota ora.'

    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName(
      'keywords',
      'reflusso gastroesofageo, reflusso torino, osteopata reflusso, pirosi, diaframma, ernia iatale, osteopatia stomaco'
    )
    ensureMetaByProperty('og:title', 'Reflusso Gastroesofageo | Mobilitas Osteopata Torino')
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')
    ensureCanonical(pageUrl)

    return () => {
      document.title = prevTitle
    }
  }, [])

  useEffect(() => {
    const el = painRef.current
    if (!el) return
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / (PAIN_W + GAP))
      setPainIndex(Math.min(Math.max(0, i), PAIN_POINTS.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = benefitRef.current
    if (!el) return
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / (BENEFIT_W + GAP))
      setBenefitIndex(Math.min(Math.max(0, i), BENEFITS.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = recensioniRef.current
    if (!el) return

    const updateFromScroll = () => {
      const children = Array.from(el.children)
      if (!children.length) return

      const viewportCenter = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2
        const dist = Math.abs(childCenter - viewportCenter)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })

      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth)
      const nearEnd = maxScroll > 0 && el.scrollLeft >= maxScroll - 48
      setRecensioniIndex(nearEnd ? children.length - 1 : best)
    }

    el.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)
    updateFromScroll()
    return () => {
      el.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
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

  const scrollTo = (ref, index, width) => {
    const el = ref.current
    if (!el) return
    const cardW = width ?? el.firstElementChild?.offsetWidth ?? 280
    el.scrollTo({ left: index * (cardW + GAP), behavior: 'smooth' })
  }

  const scrollRecensioniTo = (index) => {
    const el = recensioniRef.current
    const next = Math.min(Math.max(0, index), RECENSIONI_SLIDES - 1)
    setRecensioniIndex(next)
    if (!el) return
    const child = el.children[next]
    if (child) {
      const left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2
      el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
      return
    }
    scrollTo(recensioniRef, next, null)
  }

  const CtaPair = ({ className = '', size = 'md' }) => {
    const isLg = size === 'lg'
    const primaryCls = isLg
      ? 'max-w-full min-h-[64px] sm:min-h-[60px] pl-6 sm:pl-8 pr-1.5 text-base sm:text-lg'
      : 'max-w-full min-h-[62px] sm:min-h-[56px] pl-6 sm:pl-7 pr-1.5 text-base sm:text-base'
    const secondaryCls = isLg
      ? 'max-w-full min-h-[64px] sm:min-h-[60px] pl-6 sm:pl-8 pr-1.5 text-base sm:text-lg'
      : 'max-w-full min-h-[62px] sm:min-h-[56px] pl-6 sm:pl-7 pr-1.5 text-base sm:text-base'
    const arrowCls = isLg
      ? 'w-12 h-12 sm:w-12 sm:h-12'
      : 'w-12 h-12 sm:w-11 sm:h-11'
    const iconCls = isLg
      ? 'w-5 h-5 sm:w-5 sm:h-5'
      : 'w-5 h-5 sm:w-[1.15rem] sm:h-[1.15rem]'
    const arrowIconCls = 'w-5 h-5'

    return (
      <div
        className={`flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full px-1 ${className}`}
      >
        <button
          type="button"
          onClick={openConsulto}
          className={`group inline-flex items-center gap-2.5 sm:gap-3 w-fit max-w-full rounded-full font-black uppercase tracking-tight text-blue-dark bg-[linear-gradient(90deg,#3dd968_0%,#72fa93_45%,#a8ffbf_100%)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_34px_-12px_rgba(114,250,147,0.55)] active:translate-y-0 ${primaryCls}`}
        >
          <span className="inline-flex items-center gap-2 sm:gap-2.5 min-w-0">
            <Phone className={`${iconCls} shrink-0`} strokeWidth={2.5} />
            <span className="sm:hidden">Consulto gratuito</span>
            <span className="hidden sm:inline whitespace-nowrap">Consulto telefonico gratuito</span>
          </span>
          <span
            className={`grid place-items-center rounded-full bg-blue-dark text-green shrink-0 ${arrowCls}`}
          >
            <ArrowRight className={arrowIconCls} strokeWidth={2.25} />
          </span>
        </button>
        <button
          type="button"
          onClick={openPrimaVisita}
          className={`group inline-flex items-center gap-2.5 sm:gap-3 w-fit max-w-full rounded-full font-black uppercase tracking-tight text-blue-dark border-2 border-cream bg-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_34px_-12px_rgba(244,244,244,0.35)] active:translate-y-0 ${secondaryCls}`}
        >
          <span className="inline-flex items-center gap-2 sm:gap-2.5 min-w-0 whitespace-nowrap">
            <CalendarCheck className={`${iconCls} shrink-0`} strokeWidth={2.5} />
            Prima visita a 49€
          </span>
          <span
            className={`grid place-items-center rounded-full bg-blue-dark text-cream shrink-0 ${arrowCls}`}
          >
            <ArrowRight className={arrowIconCls} strokeWidth={2.25} />
          </span>
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-dark text-cream font-montserrat overflow-x-hidden">
      {/* ——— OFFERTA ——— */}
      <section className="relative pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <img
            src="/cervicalgia/cerv11.JPG"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.28] scale-105"
          />
          <div className="absolute inset-0 bg-blue-dark/78" />
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(0,21,48,0.85)_0%,rgba(0,37,82,0.68)_40%,rgba(0,58,110,0.62)_70%,rgba(0,26,61,0.85)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(114,250,147,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_40%,rgba(0,80,160,0.28),transparent_55%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-left sm:text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-7 sm:mb-9"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green px-5 py-2.5 sm:py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.22em] shadow-[0_0_24px_rgba(114,250,147,0.25)]">
              Torino · Reflusso
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="text-[2.65rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black leading-[1.02] tracking-[-0.03em] mb-6 sm:mb-8"
          >
            Il reflusso non è
            <br className="hidden sm:block" />{' '}
            solo acidità.
            <br />
            <span className="text-green">È una valvola che non tiene.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-cream/55 text-lg sm:text-lg leading-relaxed max-w-lg sm:mx-auto mb-10 sm:mb-12 font-medium"
          >
            Lavoriamo sul diaframma — l’anello che aiuta la valvola a restare chiusa.
            Affianchiamo il tuo gastroenterologo, non lo sostituiamo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="relative w-full max-w-3xl sm:mx-auto mb-6 sm:mb-12"
          >
            {/* Ambient glow */}
            <div
              className="absolute -inset-6 sm:-inset-10 bg-[radial-gradient(ellipse_at_center,rgba(114,250,147,0.18),transparent_65%)] blur-2xl pointer-events-none"
              aria-hidden
            />

            {/* Offset accent frame */}
            <div
              className="absolute inset-3 sm:inset-4 rounded-[1.15rem] sm:rounded-[1.5rem] border border-green/20 translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 pointer-events-none"
              aria-hidden
            />

            {/* Soft contact + cast shadows under the frame */}
            <div
              className="absolute left-6 right-6 -bottom-3 sm:left-10 sm:right-10 sm:-bottom-4 h-8 sm:h-10 rounded-[100%] bg-black/50 blur-xl pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute left-12 right-12 -bottom-1 sm:left-16 sm:right-16 sm:-bottom-2 h-4 rounded-[100%] bg-black/40 blur-md pointer-events-none"
              aria-hidden
            />

            {/* Gradient border shell */}
            <div className="relative p-[1px] rounded-2xl sm:rounded-[1.35rem] bg-[linear-gradient(145deg,rgba(114,250,147,0.55)_0%,rgba(244,244,244,0.18)_35%,rgba(114,250,147,0.12)_70%,rgba(0,37,82,0.4)_100%)] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7),0_40px_90px_-30px_rgba(0,0,0,0.55),0_8px_24px_-8px_rgba(114,250,147,0.18),0_0_0_1px_rgba(114,250,147,0.08)]">
              <div className="relative overflow-hidden rounded-[calc(1rem-1px)] sm:rounded-[calc(1.35rem-1px)] aspect-[16/9] bg-blue-dark">
                <motion.img
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  src="/cervicalgia/cerv12.JPG"
                  alt="Trattamento osteopatico sul diaframma per il reflusso gastroesofageo - Mobilitas Torino"
                  className="w-full h-full object-cover object-center"
                />
                {/* Soft cinematic overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/55 via-transparent to-blue-dark/15 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-dark/25 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-cream/10 rounded-[inherit] pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex flex-col items-center gap-4 sm:gap-8 w-full min-w-0"
          >
            <ul className="w-full max-w-xl min-w-0 px-4 sm:px-5 space-y-2.5 sm:space-y-3.5 text-left">
              {HERO_BENEFITS.map((benefit, i) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.28 + i * 0.08 }}
                  className="flex items-start gap-3 min-w-0"
                >
                  <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-green shrink-0 shadow-[0_0_20px_rgba(114,250,147,0.25)]">
                    <Check className="w-3.5 h-3.5 text-blue-dark" strokeWidth={3} />
                  </span>
                  <span className="min-w-0 flex-1 text-cream/85 text-base sm:text-base leading-snug font-medium break-words">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-2 sm:gap-5 w-full">
              <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-8">
                <div className="flex items-baseline gap-2.5 sm:gap-3">
                  <span className="text-green font-black text-4xl sm:text-5xl tracking-tight leading-none">
                    49€
                  </span>
                  <span className="text-cream/55 text-sm sm:text-sm font-medium self-end pb-1">
                    prima visita
                  </span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-cream/15" aria-hidden />
                <p className="text-cream/70 text-base sm:text-[15px] font-medium tracking-wide leading-none">
                  Solo <span className="text-cream font-black">15 posti</span> al mese
                </p>
              </div>

              <div className="flex flex-col items-center gap-0 text-cream/70 text-base sm:text-[15px] leading-tight">
                <p className="m-0 inline-flex items-center gap-1.5">
                  <span aria-hidden>📍</span>
                  <span>Via Peyron 54, Torino (San Donato)</span>
                </p>
                <p className="m-0 inline-flex items-center gap-1.5">
                  <span aria-hidden>📍</span>
                  <span>Via Lamarmora 35, Torino (Crocetta)</span>
                </p>
              </div>
            </div>

            <div className="flex justify-center w-full mt-2 sm:mt-0">
              <CtaPair size="lg" />
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider overlap />

      {/* ——— PAIN POINTS ——— */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <img
            src="/cervicalgia/cerv15.JPG"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_40%] opacity-[0.26] scale-105"
          />
          <div className="absolute inset-0 bg-blue-dark/80" />
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(0,21,48,0.88)_0%,rgba(0,37,82,0.72)_40%,rgba(0,58,110,0.65)_70%,rgba(0,26,61,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(114,250,147,0.09),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_0%_80%,rgba(114,250,147,0.06),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-blue-dark to-transparent" />
        </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-8 lg:mb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green px-5 py-2.5 sm:py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.22em] shadow-[0_0_24px_rgba(114,250,147,0.25)] mb-4 sm:mb-5">
              Ti riconosci?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight max-w-2xl mb-4 sm:mb-5">
              Il reflusso ti ha tolto pezzi di vita.
              <span className="text-green"> Non solo lo stomaco.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl">
              Se anche una sola di queste situazioni ti suona familiare, non sei solo —
              e non è “nella tua testa”.
            </p>
          </motion.div>

          <div className="relative z-10">
            <div
              ref={painRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {PAIN_POINTS.map((pain, i) => {
                const Icon = pain.icon
                return (
                  <article
                    key={pain.title}
                    className="flex-shrink-0 w-[280px] sm:w-[300px] snap-center"
                  >
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-[#c47a7a]/35 bg-[#c47a7a]/28 backdrop-blur-md p-5 sm:p-6 shadow-[0_12px_40px_-20px_rgba(196,122,122,0.35)] hover:bg-[#c47a7a]/38 hover:border-[#c47a7a]/50 transition-all duration-500">
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-[#c47a7a]/25 via-transparent to-transparent pointer-events-none"
                        aria-hidden
                      />
                      <span
                        className="absolute top-3.5 right-3.5 grid place-items-center w-9 h-9 rounded-full border border-[#e8b4b4]/45 bg-[#c47a7a]/25 text-[13px] font-black tabular-nums text-[#e8b4b4] select-none pointer-events-none shadow-[0_0_16px_rgba(196,122,122,0.2)]"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="relative">
                        <div className="mb-4 grid place-items-center w-11 h-11 rounded-xl bg-[#c47a7a]/25 border border-[#c47a7a]/40 text-[#e8b4b4]">
                          <Icon className="w-5 h-5" strokeWidth={1.75} />
                        </div>
                        <h3 className="text-cream font-bold text-base sm:text-lg leading-snug mb-2.5 pr-10">
                          {pain.title}
                        </h3>
                        <p className="text-cream/60 text-sm leading-relaxed">
                          {pain.body}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6 px-4">
              <button
                type="button"
                onClick={() => scrollTo(painRef, Math.max(0, painIndex - 1), PAIN_W)}
                className="grid place-items-center w-10 h-10 rounded-full border border-[#c47a7a]/40 bg-[#c47a7a]/20 text-[#e8b4b4] hover:bg-[#c47a7a]/30 transition-colors"
                aria-label="Precedente"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <div className="flex justify-center gap-1.5">
                {PAIN_POINTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollTo(painRef, i, PAIN_W)}
                    className={`rounded-full transition-all duration-300 ${
                      i === painIndex
                        ? 'bg-[#c47a7a]/90 w-5 h-1.5'
                        : 'bg-[#c47a7a]/35 w-1.5 h-1.5 hover:bg-[#c47a7a]/55'
                    }`}
                    aria-label={`Pain ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  scrollTo(painRef, Math.min(PAIN_POINTS.length - 1, painIndex + 1), PAIN_W)
                }
                className="grid place-items-center w-10 h-10 rounded-full border border-[#c47a7a]/40 bg-[#c47a7a]/20 text-[#e8b4b4] hover:bg-[#c47a7a]/30 transition-colors"
                aria-label="Successivo"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
      </section>

      <SectionDivider overlap />

      {/* ——— MECCANISMO + BENEFICI ——— */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green/[0.04] blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-green text-xs font-semibold uppercase tracking-[0.28em] mb-3">
              Il meccanismo
            </p>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-8">
              Perché puoi mangiare in bianco
              <span className="text-green"> e bruciare lo stesso</span>
            </h2>
            <div className="space-y-5 text-cream/70 text-base sm:text-lg leading-relaxed">
              <p>
                Tra stomaco ed esofago c’è una valvola che dovrebbe restare chiusa. Ma non lavora da sola:
                è aiutata dal <strong className="text-cream font-semibold">diaframma</strong>, il muscolo
                del respiro, che le fa da anello intorno.
              </p>
              <p>
                Quando il diaframma è bloccato — postura chiusa, stress, respiro corto — l’anello stringe
                male e la pressione sulla pancia aumenta: l’acido trova la porta socchiusa.
              </p>
              <p className="text-cream/90 font-medium">
                Il problema non è solo cosa metti nello stomaco, ma cosa lo comprime da fuori.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mb-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-cream">
              Cosa cambia quando si lavora sulla causa
            </h3>
          </div>
          <div
            ref={benefitRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {BENEFITS.map((item, i) => {
              const Icon = item.icon
              return (
                <article
                  key={i}
                  className="flex-shrink-0 w-[260px] sm:w-[280px] snap-center"
                >
                  <div className="h-full p-6 rounded-2xl border border-cream/[0.08] bg-cream/[0.02] hover:border-green/25 hover:bg-green/[0.04] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-green mb-5" strokeWidth={1.5} />
                    <h4 className="text-cream font-bold text-base mb-2 leading-snug">{item.title}</h4>
                    <p className="text-cream/50 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="flex justify-center gap-1.5 mt-6">
            {BENEFITS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(benefitRef, i, BENEFIT_W)}
                className={`rounded-full transition-all duration-300 ${
                  i === benefitIndex ? 'bg-green w-5 h-1.5' : 'bg-cream/25 w-1.5 h-1.5 hover:bg-cream/40'
                }`}
                aria-label={`Benefit ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex justify-center mt-12 px-4">
          <CtaPair />
        </div>
      </section>

      <SectionDivider overlap />

      {/* ——— RECENSIONI ——— */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <img
            src="/cervicalgia/cerv9.JPG"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-[0.22] scale-105"
          />
          <div className="absolute inset-0 bg-blue-dark/80" />
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(0,21,48,0.88)_0%,rgba(0,37,82,0.72)_40%,rgba(0,58,110,0.65)_70%,rgba(0,26,61,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(114,250,147,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_100%,rgba(0,80,160,0.22),transparent_60%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green px-5 py-2.5 sm:py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.22em] shadow-[0_0_24px_rgba(114,250,147,0.25)] mb-4 sm:mb-5">
              Recensioni
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4">
              Oltre 830 recensioni.
              <span className="text-green"> Reali.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Non sono frasi di circostanza: sono persone che, come te, cercavano un modo concreto di uscire dal ciclo pastiglia–dieta–bruciore.
            </p>
          </motion.div>
        </div>

        <div
          ref={recensioniRef}
          className="relative z-10 flex items-stretch overflow-x-auto snap-x snap-mandatory gap-4 pb-2 px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {RECENSIONI_PREVIEW.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[260px] sm:w-[300px] snap-center"
            >
              <div className="rounded-2xl overflow-hidden border border-cream/15 bg-blue-dark/50 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.75),0_8px_20px_-12px_rgba(0,37,82,0.55),0_0_0_1px_rgba(114,250,147,0.12)] ring-1 ring-inset ring-cream/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(0,0,0,0.8),0_12px_28px_-12px_rgba(114,250,147,0.2)]">
                <img
                  src={src}
                  alt={`Recensione ${i + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-[260px] sm:w-[300px] snap-center self-stretch">
            <a
              href={GOOGLE_RECENSIONI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full min-h-full flex-col items-center justify-center gap-2.5 rounded-2xl border border-green/35 bg-green/[0.12] px-5 py-5 text-center shadow-[0_18px_40px_-18px_rgba(114,250,147,0.35)] transition-all duration-300 hover:bg-green/20 hover:-translate-y-0.5"
            >
              <span className="grid place-items-center w-10 h-10 rounded-full bg-green text-blue-dark shadow-[0_0_18px_rgba(114,250,147,0.4)]">
                <ExternalLink className="w-4 h-4" strokeWidth={2.25} />
              </span>
              <p className="text-cream font-black text-base leading-snug">
                Leggi tutte le {RECENSIONI_TOTAL} recensioni
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green px-4 py-2 text-blue-dark text-[11px] font-black uppercase tracking-[0.14em]">
                Apri Google Maps
                <ExternalLink className="w-3 h-3" strokeWidth={2.25} />
              </span>
            </a>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-5 mt-8 px-4">
          <div className="flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => scrollRecensioniTo(Math.max(0, recensioniIndex - 1))}
              disabled={recensioniIndex === 0}
              className="group grid place-items-center w-12 h-12 rounded-full bg-cream text-blue-dark shadow-[0_10px_28px_-12px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_32px_-12px_rgba(244,244,244,0.35)] disabled:opacity-35 disabled:pointer-events-none disabled:hover:translate-y-0"
              aria-label="Recensione precedente"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" strokeWidth={2.25} />
            </button>

            <div className="flex flex-col items-center gap-2.5 min-w-[5.5rem]">
              <div className="h-1 w-24 sm:w-28 rounded-full bg-cream/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-green shadow-[0_0_12px_rgba(114,250,147,0.55)] transition-all duration-300 ease-out"
                  style={{
                    width: `${((recensioniIndex + 1) / RECENSIONI_SLIDES) * 100}%`,
                  }}
                />
              </div>
              <p className="text-cream/55 text-[11px] font-bold uppercase tracking-[0.18em] tabular-nums">
                <span className="text-green">
                  {recensioniIndex >= RECENSIONI_PREVIEW.length
                    ? RECENSIONI_TOTAL
                    : String(recensioniIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-cream/30 mx-1.5">/</span>
                {RECENSIONI_TOTAL}
              </p>
            </div>

            {recensioniIndex >= RECENSIONI_SLIDES - 1 ? (
              <a
                href={GOOGLE_RECENSIONI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid place-items-center w-12 h-12 rounded-full bg-green text-blue-dark shadow-[0_10px_28px_-10px_rgba(114,250,147,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_34px_-10px_rgba(114,250,147,0.65)]"
                aria-label="Leggi tutte le recensioni su Google Maps"
              >
                <ExternalLink className="w-5 h-5" strokeWidth={2.25} />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => scrollRecensioniTo(recensioniIndex + 1)}
                className="group grid place-items-center w-12 h-12 rounded-full bg-green text-blue-dark shadow-[0_10px_28px_-10px_rgba(114,250,147,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_34px_-10px_rgba(114,250,147,0.65)]"
                aria-label="Recensione successiva"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
              </button>
            )}
          </div>

          {showGoogleRecensioniCta && (
            <a
              href={GOOGLE_RECENSIONI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.16em] shadow-[0_10px_28px_-10px_rgba(114,250,147,0.55)] hover:brightness-110 transition-all duration-300"
            >
              Leggi tutte su Google Maps
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.25} />
            </a>
          )}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 text-left sm:text-center">
          <p className="text-cream/70 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
            Se ti riconosci in queste storie, non serve aspettare ancora un altro mese di antiacidi.
            <span className="text-cream"> Il passo successivo è semplice:</span> un consulto o la prima visita.
          </p>
          <div className="flex justify-center">
            <CtaPair />
          </div>
        </div>
      </section>

      <SectionDivider overlap />

      {/* ——— PRIMA VISITA ——— */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <img
            src="/cervicalgia/cerv14.JPG"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_40%] opacity-[0.22] scale-105"
          />
          <div className="absolute inset-0 bg-blue-dark/80" />
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(0,21,48,0.88)_0%,rgba(0,37,82,0.72)_40%,rgba(0,58,110,0.65)_70%,rgba(0,26,61,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(114,250,147,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_100%,rgba(0,80,160,0.22),transparent_60%)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-14 lg:mb-20 text-left lg:text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green px-5 py-2.5 sm:py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.22em] shadow-[0_0_24px_rgba(114,250,147,0.25)] mb-4 sm:mb-5">
              Prima visita
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4">
              Cosa succede quando
              <span className="text-green"> vieni</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl lg:mx-auto">
              Dalla chiamata alla segreteria fino ai consigli finali: un percorso chiaro, passo dopo passo.
            </p>
          </motion.div>

          {/* Desktop: serpentine map */}
          <div className="hidden lg:block relative mx-auto max-w-4xl h-[48rem]">
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox="0 0 800 768"
              fill="none"
              aria-hidden
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="visitWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#72fa93" stopOpacity="0.12" />
                  <stop offset="15%" stopColor="#72fa93" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#a8ffbf" stopOpacity="1" />
                  <stop offset="85%" stopColor="#72fa93" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#72fa93" stopOpacity="0.12" />
                </linearGradient>
                <filter id="visitGlow" x="-50%" y="-8%" width="200%" height="116%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* soft under-glow */}
              <path
                d="M260 48
                   C 260 95, 540 115, 540 160
                   C 540 205, 260 225, 260 272
                   C 260 319, 540 339, 540 384
                   C 540 429, 260 449, 260 496
                   C 260 543, 540 563, 540 608
                   C 540 653, 260 673, 260 720"
                stroke="#72fa93"
                strokeWidth="12"
                strokeOpacity="0.14"
                strokeLinecap="round"
                filter="url(#visitGlow)"
              />
              <path
                d="M260 48
                   C 260 95, 540 115, 540 160
                   C 540 205, 260 225, 260 272
                   C 260 319, 540 339, 540 384
                   C 540 429, 260 449, 260 496
                   C 260 543, 540 563, 540 608
                   C 540 653, 260 673, 260 720"
                stroke="url(#visitWave)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M260 48
                   C 260 95, 540 115, 540 160
                   C 540 205, 260 225, 260 272
                   C 260 319, 540 339, 540 384
                   C 540 429, 260 449, 260 496
                   C 260 543, 540 563, 540 608
                   C 540 653, 260 673, 260 720"
                stroke="#72fa93"
                strokeWidth="1.25"
                strokeOpacity="0.4"
                strokeLinecap="round"
                strokeDasharray="1.5 11"
              />
            </svg>

            {/* Nodes locked to wave peaks */}
            {[
              { x: '32.5%', y: '6.25%' },
              { x: '67.5%', y: '20.8%' },
              { x: '32.5%', y: '35.4%' },
              { x: '67.5%', y: '50%' },
              { x: '32.5%', y: '64.6%' },
              { x: '67.5%', y: '79.2%' },
            ].map((pos, i) => (
              <span
                key={`node-${i}`}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 grid place-items-center"
                style={{ left: pos.x, top: pos.y }}
                aria-hidden
              >
                <span className="absolute w-11 h-11 rounded-full bg-green/20 blur-md" />
                <span className="relative w-3.5 h-3.5 rounded-full bg-blue-dark shadow-[0_0_16px_rgba(0,37,82,0.55)] ring-[7px] ring-green" />
              </span>
            ))}

            <ol className="relative h-full list-none m-0 p-0">
              {VISIT_STEPS.map((step, i) => {
                const isLeft = i % 2 === 0
                const tops = ['1%', '15.5%', '30%', '44.5%', '59%', '73.5%']
                return (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="absolute w-[30%]"
                    style={{
                      top: tops[i],
                      left: isLeft ? '0%' : 'auto',
                      right: isLeft ? 'auto' : '0%',
                      textAlign: isLeft ? 'right' : 'left',
                    }}
                  >
                    <span className="inline-flex items-center rounded-full bg-green px-3 py-1 text-blue-dark text-[11px] font-black uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(114,250,147,0.28)] mb-1.5">
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-cream text-[1.35rem] xl:text-2xl font-black leading-[1.2] mb-2.5 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-cream/55 text-[15px] leading-relaxed">
                      {step.body}
                    </p>
                  </motion.li>
                )
              })}
            </ol>
          </div>

          {/* Mobile / tablet: vertical wavy route */}
          <div className="lg:hidden relative">
            <svg
              className="pointer-events-none absolute left-0 top-2 bottom-2 w-16 sm:w-20 h-[calc(100%-1rem)]"
              viewBox="0 0 80 900"
              fill="none"
              aria-hidden
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="visitWaveMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#72fa93" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#72fa93" stopOpacity="1" />
                  <stop offset="100%" stopColor="#72fa93" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M40 10
                   C 62 70, 18 130, 40 190
                   C 62 250, 18 310, 40 370
                   C 62 430, 18 490, 40 550
                   C 62 610, 18 670, 40 730
                   C 62 790, 18 850, 40 890"
                stroke="#72fa93"
                strokeWidth="8"
                strokeOpacity="0.12"
                strokeLinecap="round"
              />
              <path
                d="M40 10
                   C 62 70, 18 130, 40 190
                   C 62 250, 18 310, 40 370
                   C 62 430, 18 490, 40 550
                   C 62 610, 18 670, 40 730
                   C 62 790, 18 850, 40 890"
                stroke="url(#visitWaveMobile)"
                strokeWidth="2.25"
                strokeLinecap="round"
              />
              <path
                d="M40 10
                   C 62 70, 18 130, 40 190
                   C 62 250, 18 310, 40 370
                   C 62 430, 18 490, 40 550
                   C 62 610, 18 670, 40 730
                   C 62 790, 18 850, 40 890"
                stroke="#72fa93"
                strokeWidth="1"
                strokeOpacity="0.35"
                strokeDasharray="2 10"
                strokeLinecap="round"
              />
            </svg>

            <ol className="relative space-y-10 sm:space-y-12 pl-16 sm:pl-20 list-none m-0">
              {VISIT_STEPS.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative"
                >
                  <span className="absolute -left-[3.15rem] sm:-left-[3.85rem] top-2 z-10 grid place-items-center">
                    <span className="absolute w-9 h-9 rounded-full bg-green/25 blur-md" />
                    <span className="relative w-3 h-3 rounded-full bg-blue-dark shadow-[0_0_14px_rgba(0,37,82,0.5)] ring-[5px] ring-green" />
                  </span>

                  <span className="inline-flex items-center rounded-full bg-green px-3 py-1 text-blue-dark text-[11px] font-black uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(114,250,147,0.28)] mb-1">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-cream text-xl sm:text-2xl font-black leading-tight mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-cream/55 text-sm sm:text-[15px] leading-relaxed w-full text-left">
                    {step.body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="mt-14 sm:mt-16 flex justify-center">
            <CtaPair />
          </div>
        </div>
      </section>

      <SectionDivider overlap />

      {/* ——— DOVE SIAMO ——— */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <img
            src="/cervicalgia/cerv16.JPG"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-[0.28] scale-105"
          />
          <div className="absolute inset-0 bg-blue-dark/78" />
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(0,21,48,0.85)_0%,rgba(0,37,82,0.68)_40%,rgba(0,58,110,0.62)_70%,rgba(0,26,61,0.85)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(114,250,147,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_40%,rgba(0,80,160,0.28),transparent_55%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-10 lg:mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green px-5 py-2.5 sm:py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.22em] shadow-[0_0_24px_rgba(114,250,147,0.25)] mb-4 sm:mb-5">
              Dove siamo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4">
              Due studi a
              <span className="text-green"> Torino</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Due posizioni centrali, facili da raggiungere:{' '}
              <span className="text-cream/85">metro, mezzi pubblici e auto</span>.
              Scegli San Donato o Crocetta — quella più comoda per te.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
            {[
              {
                label: 'San Donato — Via Peyron 54',
                title: 'Mobilitas — San Donato, Via Peyron 54',
                src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.274078923546!2d7.65514387704107!3d45.08023495897442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe2e29f381fdc93%3A0x97eee174cab07ada!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Osteopata%20Torino!5e0!3m2!1sit!2sit!4v1760785981478!5m2!1sit!2sit',
              },
              {
                label: 'Crocetta — Via Lamarmora 35',
                title: 'Mobilitas — Crocetta, Via Lamarmora 35',
                src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2818.3024747731265!2d7.666042812749457!3d45.0593748602363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d57f00fa44f%3A0x510e3404feb8af98!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Crocetta!5e0!3m2!1sit!2sit!4v1784309089765!5m2!1sit!2sit',
              },
            ].map((map) => (
              <div
                key={map.label}
                className="rounded-[1.35rem] overflow-hidden border border-cream/10 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.55)] bg-blue-dark/40"
              >
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-cream/10 bg-cream/[0.04]">
                  <span className="inline-flex items-center gap-2 text-cream text-sm font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green shadow-[0_0_10px_rgba(114,250,147,0.8)]" />
                    {map.label}
                  </span>
                  <span className="text-cream/40 text-[11px] font-semibold uppercase tracking-[0.16em]">
                    Mappa
                  </span>
                </div>
                <iframe
                  src={map.src}
                  title={map.title}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="block w-full"
                />
              </div>
            ))}
          </div>

          <p className="text-cream/65 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-center my-10 sm:my-12">
            Entrambe le sedi sono raggiungibili in metro: San Donato con Bernini o Principi d’Acaja, Crocetta con la fermata Crocetta. In auto trovi posto senza problemi.
          </p>

          <div className="p-[1px] rounded-[1.35rem] bg-[linear-gradient(145deg,rgba(244,244,244,0.16)_0%,rgba(244,244,244,0.05)_50%,rgba(114,250,147,0.14)_100%)]">
            <div className="flex items-center gap-4 rounded-[calc(1.35rem-1px)] bg-blue-dark/70 backdrop-blur-md px-5 py-4 sm:px-6 sm:py-5">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-cream/[0.08] border border-cream/15 text-cream shrink-0">
                <Car className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-cream font-bold text-sm sm:text-base leading-snug">
                  Parcheggio vicino a entrambe le sedi
                </p>
                <p className="text-cream/55 text-xs sm:text-sm mt-0.5">
                  Parcheggi nelle vicinanze e strisce blu
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 flex justify-center">
            <CtaPair />
          </div>
        </div>
      </section>

      <SectionDivider overlap />

      {/* ——— FAQ ——— */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <img
            src="/cervicalgia/cerv13.JPG"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-[0.28] scale-105"
          />
          <div className="absolute inset-0 bg-blue-dark/78" />
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(0,21,48,0.85)_0%,rgba(0,37,82,0.68)_40%,rgba(0,58,110,0.62)_70%,rgba(0,26,61,0.85)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(114,250,147,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_40%,rgba(0,80,160,0.28),transparent_55%)]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-10 lg:mb-12 text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green px-5 py-2.5 sm:py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.22em] shadow-[0_0_24px_rgba(114,250,147,0.25)] mb-4 sm:mb-5">
              Domande frequenti
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4">
              Le obiezioni che sentiamo
              <span className="text-green"> prima che qualcuno prenoti.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl">
              Se te le stai facendo anche tu, meglio risponderti qui — con chiarezza, senza giri di parole.
            </p>
          </motion.div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div key={item.id} className="group/card">
                  <div
                    className={`p-[1px] rounded-2xl sm:rounded-[1.25rem] transition-all duration-500 ${
                      isOpen
                        ? 'bg-[linear-gradient(135deg,rgba(114,250,147,0.65)_0%,rgba(114,250,147,0.15)_45%,rgba(244,244,244,0.12)_100%)] shadow-[0_20px_60px_-28px_rgba(114,250,147,0.45)]'
                        : 'bg-[linear-gradient(135deg,rgba(244,244,244,0.18)_0%,rgba(244,244,244,0.05)_50%,rgba(114,250,147,0.12)_100%)] hover:bg-[linear-gradient(135deg,rgba(114,250,147,0.28)_0%,rgba(244,244,244,0.08)_55%,rgba(114,250,147,0.18)_100%)]'
                    }`}
                  >
                    <div
                      className={`relative rounded-[calc(1rem-1px)] sm:rounded-[calc(1.25rem-1px)] backdrop-blur-md transition-colors duration-500 ${
                        isOpen ? 'bg-blue-dark/75' : 'bg-blue-dark/55'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="relative z-10 w-full cursor-pointer bg-transparent text-left px-4 sm:px-6 py-5 sm:py-6 flex items-center gap-3.5 sm:gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green/40"
                      >
                        <span
                          className={`grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-sm font-black tabular-nums shrink-0 transition-all duration-300 ${
                            isOpen
                              ? 'bg-green text-blue-dark shadow-[0_0_24px_rgba(114,250,147,0.35)]'
                              : 'bg-cream/[0.08] text-cream/55 border border-cream/15 group-hover/card:border-green/35 group-hover/card:text-green'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span
                          className={`flex-1 font-bold text-[15px] sm:text-lg leading-snug transition-colors duration-300 [&_strong]:font-black [&_em]:italic [&_em]:font-semibold [&_u]:underline ${
                            isOpen
                              ? 'text-green [&_strong]:text-green [&_em]:text-green/90'
                              : 'text-cream [&_strong]:text-cream'
                          }`}
                        >
                          {item.question}
                        </span>

                        <span
                          className={`grid place-items-center w-10 h-10 rounded-full shrink-0 transition-all duration-300 ${
                            isOpen
                              ? 'bg-green text-blue-dark rotate-45'
                              : 'bg-cream/[0.08] text-cream/60 border border-cream/15 group-hover/card:border-green/35 group-hover/card:text-green'
                          }`}
                          aria-hidden
                        >
                          <Plus className="w-5 h-5" strokeWidth={2.5} />
                        </span>
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden min-h-0">
                          <div className="px-4 sm:px-6 pb-5 sm:pb-6">
                            <div className="h-px w-full bg-gradient-to-r from-green/40 via-cream/10 to-transparent mb-4 sm:mb-5" />
                            <div className="rounded-xl border border-green/15 bg-green/[0.06] px-4 py-4 sm:px-5 sm:py-5">
                              <p className="text-cream/75 text-sm sm:text-[15px] leading-relaxed [&_strong]:text-cream [&_strong]:font-semibold [&_em]:italic [&_em]:text-cream/90 [&_u]:underline [&_u]:decoration-green/50 [&_u]:underline-offset-2">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="mt-10 sm:mt-12 text-cream/65 text-base sm:text-lg leading-relaxed text-left max-w-2xl"
          >
            Se anche una sola di queste risposte ti ha fatto dire “è proprio la mia situazione”,
            non restare fermo sulla pastiglia e sulle rinunce.{' '}
            <span className="text-cream font-semibold">
              Prenota un consulto o la prima visita
            </span>{' '}
            e valutiamo insieme la parte meccanica che finora nessuno ha toccato.
          </motion.p>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <CtaPair />
          </div>
        </div>
      </section>

      <BookingPopup
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        pageContext="reflusso"
        ctaType={bookingCtaType}
      />
    </div>
  )
}

export default Reflusso
