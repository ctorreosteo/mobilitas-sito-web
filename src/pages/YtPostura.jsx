import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Phone,
  CalendarCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Repeat,
  Clock,
  Archive,
  Dumbbell,
  Camera,
  ScanSearch,
  Car,
  Check,
  Plus,
  ExternalLink,
} from 'lucide-react'
import { RECENSIONI_IMAGES } from '../data/recensioni'
import BookingPopup from '../components/BookingPopup'
import SectionDivider from '../components/SectionDivider'

// In dev: '' così la chiamata va a /api/... e il proxy Vite la inoltra al backend locale.
// In prod: base completa del backend HQ (CORS pubblico abilitato per studiomobilitas.it).
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
const HERO_VIDEO_CODICE = 'YT_POSTURA_VSL'

// Avvia subito il fetch (prima del mount) per ridurre il tempo a primo frame.
const heroVideoPromise = fetch(`${API_BASE}/api/sito/video/codice/${HERO_VIDEO_CODICE}`, {
  priority: 'high',
})
  .then((res) => {
    if (res.status === 404) return null
    return res.ok ? res.json() : null
  })
  .then((json) => (json?.data?.cloudflareUid ? json.data : null))
  .catch(() => null)

function ensureCloudflarePreconnect() {
  const origins = ['https://iframe.videodelivery.net', 'https://videodelivery.net']
  origins.forEach((href) => {
    if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

function preloadHeroPoster(url) {
  if (!url || document.querySelector(`link[rel="preload"][href="${url}"]`)) return
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = url
  document.head.appendChild(link)
}

function useVideoYtPosturaVsl() {
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ensureCloudflarePreconnect()
    let cancelled = false
    heroVideoPromise.then((data) => {
      if (cancelled) return
      if (data?.anteprimaUrl) preloadHeroPoster(data.anteprimaUrl)
      setVideo(data)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return { video, loading }
}

const HERO_BENEFITS = [
  <>
    <strong className="font-bold">Visita posturale specifica</strong>
  </>,
  <>
    <strong className="font-bold">3 trattamenti osteopatici mirati</strong>, per la postura che vuoi
  </>,
  <>
    <strong className="font-bold">App</strong>: un supporto ogni giorno, così non torni indietro
  </>,
]

const RECENSIONI_PREVIEW = RECENSIONI_IMAGES.slice(0, 18)
const RECENSIONI_TOTAL = 900
const GOOGLE_RECENSIONI_URL =
  'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.0802312,7.6577188,17z/data=!4m8!3m7!1s0xfe2e29f381fdc93:0x97eee174cab07ada!8m2!3d45.0802312!4d7.6577188!9m1!1b1!16s%2Fg%2F11kqfhtyvd?entry=ttu'

const PAIN_POINTS = [
  {
    icon: Camera,
    title: 'In foto sembri più stanco di come ti senti',
    body: 'Ti vedi di lato, in una vetrina o in una foto, e non ti piaci. La schiena è chiusa, la testa sta davanti alle spalle, e sembri più vecchio di come ti senti dentro. Non è la luce della foto. È la posizione in cui stai tutto il giorno, anche quando non ci pensi.',
  },
  {
    icon: Clock,
    title: 'La sera brucia sempre nello stesso punto',
    body: 'Verso sera, in mezzo alla schiena, senti quel bruciore che ormai conosci. Quei muscoli non sono il problema: stanno tenendo su una schiena che non si apre più. Il massaggio ti fa stare bene. Poi passano due o tre giorni, e sei da capo.',
  },
  {
    icon: Repeat,
    title: 'Ti raddrizzi, e non resta',
    body: 'Apri le spalle e tiri indietro la testa. Per un minuto funziona. Appena torni al telefono o al lavoro, il corpo ricade. Per lui quella è la posizione più comoda, perché è quella che ha imparato. Voler stare dritto non basta, se una parte della schiena non si muove più.',
  },
  {
    icon: Archive,
    title: 'Hai già comprato un sacco di cose',
    body: 'Il correttore, il cuscino nuovo, la sedia, il plantare. Finché li usi, un po’ ti tengono. Appena li togli, torni come prima. Non è che hai sbagliato a provarci. Hai sistemato il pezzo di sopra, mentre il motivo stava più sotto.',
  },
  {
    icon: ScanSearch,
    title: 'Ti hanno detto una parola, e poi basta',
    body: 'Sul foglio degli esami c’è scritto che il collo è diventato dritto, oppure «scoliosi», oppure qualcuno ti ha detto che hai una gamba più corta. E lì si sono fermati. Quasi nessuno ti ha spiegato se è l’osso, che non si cambia, oppure il corpo che si è messo storto per stare in equilibrio. Sono due cose diverse, e cambia tutto.',
  },
  {
    icon: Dumbbell,
    title: 'Ti alleni, ma torni sempre uguale',
    body: 'Fai palestra, ginnastica, nuoto o addominali. Diventi più forte, e questo va bene. Però se sotto c’è una zona che non si muove, l’esercizio le gira intorno. Alleni il corpo così com’è. Non gli insegni a stare in un altro modo.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Prima cambia la postura. Poi arriva il dolore',
    b: 'Prima del dolore, il petto non si apre, la testa non sta sopra le spalle e il bacino non è dritto. Quello che senti arriva dopo.',
  },
  {
    k: '02',
    t: 'Fa male in un punto. Il motivo è un altro',
    b: 'Il bruciore in mezzo alla schiena è il muscolo che ti regge tutto il giorno. Il collo duro sorregge una schiena chiusa. Se fa male sempre dallo stesso lato, carichi sempre da lì.',
  },
  {
    k: '03',
    t: 'Non ti manca la voglia. Ti manca il movimento',
    b: 'Se schiena e costole non si aprono, stare dritto non ha un appoggio. Ci resti un attimo, poi ricadi. Quando quel movimento torna, resti dritto senza pensarci.',
  },
  {
    k: '04',
    t: 'L’osso resta così. Quello che si muove, se aspetti, si blocca',
    b: 'Se la curva è diventata osso, resta. Te lo diciamo subito. Schiena, costole, bacino, anche e piedi, quasi sempre, si muovono ancora. Si lavora lì. Più aspetti, più si irrigidiscono.',
  },
]

const BENEFITS = [
  {
    icon: Camera,
    image: '/cervicalgia/cerv11.JPG',
    imageClassName: 'object-[center_28%]',
    alt: 'Lavoro su collo e spalle in studio',
    eyebrow: 'La foto di lato',
    title: 'In foto torni a sembrare te',
    body: 'Testa sopra le spalle, petto più aperto. Quell’aria stanca che vedi di lato si attenua. Molte volte non sono gli anni. È la posizione in cui stai tutto il giorno, anche quando non ci pensi.',
  },
  {
    icon: Clock,
    image: '/maldischiena/maldischiena2.JPG',
    imageClassName: 'object-center',
    alt: 'Trattamento osteopatico sulla schiena',
    eyebrow: 'Il bruciore della sera',
    title: 'Quel punto può mollare',
    body: 'Il bruciore in mezzo alla schiena è il muscolo che ti regge fino a sera. Se la schiena ricomincia a sostenersi da sola, quel muscolo non deve più stare teso tutto il giorno. Il fastidio che conoscevi a memoria si fa vedere meno spesso.',
  },
  {
    icon: Repeat,
    image: '/maldischiena/maldischiena1.JPG',
    imageClassName: 'object-center',
    alt: 'Visita posturale in studio a Torino',
    eyebrow: 'Ti tiri su, e ricadi',
    title: 'Stai dritto senza tenerti su',
    body: 'Oggi ci resti un minuto, poi il corpo ricade. Quando schiena e costole si riaprono, stare dritto ha un appoggio. Non lo tieni con la volontà. Ci arrivi, e ci resti più a lungo.',
  },
  {
    icon: Archive,
    image: '/maldischiena/maldischiena6.JPG',
    imageClassName: 'object-center',
    alt: 'Seduta in studio per la postura',
    eyebrow: 'Correttore, cuscino, sedia',
    title: 'Li togli, e non ricadi',
    body: 'Finché li usi, un po’ ti tengono. Appena li togli, torni come prima. Se la schiena si riapre e il bacino torna dritto, il lavoro lo fa il corpo. Il pezzo esterno smette di essere l’unico modo per stare su.',
  },
  {
    icon: ScanSearch,
    image: '/maldischiena/maldischiena3.JPG',
    imageClassName: 'object-center',
    alt: 'Valutazione di schiena e bacino',
    eyebrow: 'La parola sul referto',
    title: 'Sai se è osso o posizione',
    body: 'Curva dell’osso o corpo inclinato. Scoliosi vera o schiena messa storta. Gamba corta o bacino girato. Si lavora solo sulla seconda. Alla prima visita te lo diciamo, con i tuoi esami in mano.',
  },
  {
    icon: Dumbbell,
    image: '/maldischiena/maldischiena4.JPG',
    imageClassName: 'object-center',
    alt: 'Trattamento osteopatico sulla schiena',
    eyebrow: 'Ti alleni, e torni uguale',
    title: 'In palestra, il lavoro resta',
    body: 'Palestra, nuoto, ginnastica: continua. Diventare più forte serve. Su una schiena che si apre e su un bacino dritto, quello che alleni resta. Su una zona ferma, lo perdi appena smetti.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    <strong className="font-bold">Prima visita</strong>: ti diciamo cosa si muove ancora, e cosa è osso
  </>,
  <>
    <strong className="font-bold">3 sedute</strong>: solo su quella parte, non su un programma uguale per tutti
  </>,
  <>
    <strong className="font-bold">App</strong>: pochi esercizi, così a casa non torni dov’eri
  </>,
  <>
    <strong className="font-bold">299€</strong> invece di 600€. Oggi non paghi niente
  </>,
]

const ENTRY_DOORS = [
  {
    id: 'lista',
    kicker: 'Tiene il posto',
    title: 'Mettiti in lista',
    lead: 'Per chi si è già riconosciuto. Il percorso sta per partire, e il posto del mese va a chi lascia nome e numero prima.',
    points: [
      'Oggi non paghi. Lasci nome e numero, e basta.',
      'Ti richiamiamo noi e ti confermiamo 299€ invece di 600€.',
      'Se il mese è pieno, il posto è di chi è arrivato prima di te.',
    ],
  },
  {
    id: 'consulto',
    kicker: 'Se ti resta un dubbio',
    title: 'Fatti dire se è il tuo caso',
    lead: 'Una telefonata gratis. Non per convincerti: per dirti se la tua situazione si può risolvere con questo percorso.',
    points: [
      'Ti richiamiamo noi. Non è una visita e non è un video.',
      'Se non ha senso farlo così, te lo diciamo. Non ti vendiamo niente.',
      'Se invece sì, da quella telefonata entri in lista.',
    ],
  },
]

const AFTER_ENTRY = [
  {
    k: '01',
    t: 'Lasci nome e numero',
    b: 'Dalla lista o dalla telefonata. In tutti e due i casi oggi non parte nessun pagamento.',
  },
  {
    k: '02',
    t: 'Ti richiamiamo noi',
    b: 'Sede, prezzo, e se questo mese c’è ancora posto. Non resti ad aspettare una mail.',
  },
  {
    k: '03',
    t: 'In studio, prima la verità',
    b: 'Ti guardiamo in piedi. Se è osso, te lo diciamo. Se si muove, partono le 3 sedute e l’app.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'lista-attesa',
    question: (
      <>
        Quale dei due <strong>bottoni</strong> è il mio?
      </>
    ),
    answer: (
      <>
        Se hai già capito che è il tuo caso, premi il verde: ti mette in lista. Il percorso sta per
        partire, ogni mese i posti sono pochi e li prende chi si iscrive prima. Se invece ti resta
        un dubbio, premi l’altro: è una telefonata gratis, ti richiamiamo e ti diciamo se ha senso
        farlo così. In nessuno dei due paghi oggi.
      </>
    ),
  },
  {
    id: 'raddrizzare',
    question: (
      <>
        Mi <strong>raddrizzate</strong>?
      </>
    ),
    answer: (
      <>
        No, e non fidarti di chi te lo promette prima ancora di averti visto. Una parte della curva
        può essere diventata osso, e quella non si cambia con le mani. Si lavora sulla parte che si
        muove ancora: le ossa della schiena, le costole, il bacino. Quanto migliori si vede strada
        facendo, non il giorno in cui lasci il numero.
      </>
    ),
  },
  {
    id: 'referto',
    question: (
      <>
        Nel referto c’è <em>scoliosi</em>, o mi hanno detto che ho una gamba corta.
      </>
    ),
    answer: (
      <>
        Sono le due frasi che chiudono il discorso troppo presto. La scoliosi vera è dell’osso: la
        curva resta anche quando ti pieghi in avanti, e si vede sulla lastra. Molte volte, invece,
        il corpo si è solo inclinato per stare in equilibrio, e quando ti chini la storta si
        riduce. Di solito parte dal bacino, da un’anca o da come appoggi il piede. Anche «ho una
        gamba più corta» quasi sempre non è vero: le gambe sono uguali, ed è il bacino che si è
        girato. La gamba davvero più corta si misura con una lastra, e sono i casi pochi. La visita
        serve proprio a questo, con i tuoi esami in mano.
      </>
    ),
  },
  {
    id: 'gia-provato',
    question: (
      <>
        Faccio già <em>palestra</em>, posturale o fisioterapia.
      </>
    ),
    answer: (
      <>
        Continua pure, perché diventare più forte serve, e il sollievo che senti è vero. Il punto è
        un altro: se una zona è ferma, l’esercizio le gira intorno, e il massaggio scioglie il
        muscolo che sta facendo il lavoro al posto suo. Non tocca il motivo per cui quel muscolo si
        affatica. Qui si comincia rimettendo in movimento quella zona. Poi l’app ti aiuta a tenere
        quello che si è mosso, nei giorni in cui non sei in studio.
      </>
    ),
  },
  {
    id: 'estetica',
    question: (
      <>
        Non ho dolore. Mi dà fastidio solo <strong>come mi vedo</strong>.
      </>
    ),
    answer: (
      <>
        È il momento migliore per guardarci, perché c’è ancora più spazio per lavorare. Una schiena
        che si chiude, una testa che sta avanti o un bacino inclinato, oggi, sono la schiena dura,
        il fiato corto e il dolore di domani. Non è solo una questione di specchio. È lo stesso
        problema, visto prima che inizi a farti male.
      </>
    ),
  },
  {
    id: 'cosa-include',
    question: (
      <>
        Cosa c’è nei <strong>299€</strong>?
      </>
    ),
    answer: (
      <>
        C’è una prima visita, in cui capiamo il tuo caso. Poi ci sono 3 sedute con l’osteopata,
        fatte su quello che abbiamo trovato, non su un programma uguale per tutti. E c’è l’app, con
        un piano semplice da seguire a casa. Il prezzo pieno è 600€, il percorso è 299€. Oggi non
        paghi: o entri in lista, o chiedi la telefonata. Il prezzo te lo confermiamo quando ti
        richiamiamo.
      </>
    ),
  },
  {
    id: 'app',
    question: <>L’app è un altro video da guardare?</>,
    answer: (
      <>
        No. Dopo la visita trovi pochi esercizi e delle video lezioni scelte sulla tua situazione,
        non due movimenti presi a caso da internet. Li fai a casa o in pausa, quando puoi. L’app non
        sostituisce le 3 sedute. Serve perché, nelle ore in cui nessuno ti mette le mani addosso, il
        corpo non torni da solo nella posizione di prima.
      </>
    ),
  },
  {
    id: 'red-flags',
    question: (
      <>
        Quando devo andare prima dal <strong>medico</strong>?
      </>
    ),
    answer: (
      <>
        Vai prima dal medico se non controlli più la pipì o le feci. Se un braccio o una gamba
        diventa più debole di giorno in giorno. Se il dolore di notte cresce e stai perdendo peso.
        Se hai la febbre insieme al dolore.         Se in poche settimane un lato del corpo è diventato molto
        più storto. Se il mal di testa arriva all’improvviso, fortissimo, e insieme non vedi bene, non
        parli bene o non hai forza. In questi casi, prima il medico. Poi, se serve, si vede il
        resto.
      </>
    ),
  },
]

const AMBIENT_ORBS = [
  { left: '7%', top: '12%', size: 'h-20 w-20', delay: 0, duration: 7.5 },
  { left: '88%', top: '19%', size: 'h-16 w-16', delay: 0.6, duration: 9.2 },
  { left: '18%', top: '54%', size: 'h-14 w-14', delay: 1.2, duration: 8.4 },
  { left: '82%', top: '66%', size: 'h-24 w-24', delay: 0.2, duration: 10.2 },
  { left: '50%', top: '87%', size: 'h-16 w-16', delay: 1.7, duration: 8.8 },
]
const _MOTION = motion

function YtPostura() {
  const { video: heroVideo } = useVideoYtPosturaVsl()
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('primaVisita')
  const [painIndex, setPainIndex] = useState(0)
  const [recensioniIndex, setRecensioniIndex] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [heroVideoCover, setHeroVideoCover] = useState(true)
  const painRef = useRef(null)
  const recensioniRef = useRef(null)
  const heroVideoSrc = heroVideo
    ? `https://iframe.videodelivery.net/${heroVideo.cloudflareUid}?autoplay=true&muted=true&loop=true&controls=false&preload=auto&letterboxColor=%23002552&poster=${encodeURIComponent(heroVideo.anteprimaUrl ?? '')}`
    : ''
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.15 })
  const pageGlowY = useTransform(scrollYProgress, [0, 1], ['0%', '42%'])
  const pageGlowRotate = useTransform(scrollYProgress, [0, 1], [0, 14])
  const heroMediaY = useTransform(scrollYProgress, [0, 0.24], [0, 46])
  const heroMediaRotateX = useTransform(scrollYProgress, [0, 0.2], [0, -4.8])
  const heroMediaScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.06])
  const titleGlowX = useTransform(scrollYProgress, [0, 1], ['-22%', '24%'])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.25 })
  const spotlightY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.25 })

  const PAIN_W = 300
  const RECENSIONI_W = 280
  const GAP = 16
  const RECENSIONI_SLIDES = RECENSIONI_PREVIEW.length + 1 // + card “tutte le recensioni”
  // Ultima foto del preview oppure card Google: su mobile lo snap spesso si ferma una slide prima
  const showGoogleRecensioniCta = recensioniIndex >= RECENSIONI_PREVIEW.length - 2

  useEffect(() => {
    if (!heroVideo) return
    setHeroVideoCover(true)
    const timer = window.setTimeout(() => setHeroVideoCover(false), 500)
    return () => window.clearTimeout(timer)
  }, [heroVideo])

  // SEO locale – metadata + JSON-LD ottimizzati per Google (Torino / San Donato / Crocetta)
  useEffect(() => {
    const prevTitle = document.title
    const origin = window.location.origin
    const pageUrl = `${origin}/yt-postura`
    const ogImage = `${origin}/maldischiena/maldischiena1.JPG`

    const title =
      'Perché torni storto appena smetti di pensarci? | Mobilitas Torino'
    document.title = title

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
      'Ti tiri su e dopo un minuto sei di nuovo giù. Non è pigrizia: una parte del corpo non si muove più, e il resto si sposta per tenerla su. Qui ti spieghiamo perché, con parole semplici. Poi scegli: lista d’attesa a 299€ invece di 600€, oppure una telefonata gratis. Oggi non paghi.'

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    ensureMetaByName(
      'keywords',
      [
        'percorso posturale torino',
        'osteopata postura torino',
        'valutazione posturale torino',
        'trattamento osteopatico postura',
        'postura collo schiena torino',
        'testa avanti osteopata',
        'mal di schiena postura torino',
        'app esercizi posturali',
        'osteopata san donato torino',
        'osteopata crocetta torino',
        'studio osteopatico mobilitas',
      ].join(', ')
    )
    ensureMetaByName('author', 'Mobilitas – Studio Osteopatico Torino')
    ensureMetaByName('geo.region', 'IT-TO')
    ensureMetaByName('geo.placename', 'Torino, San Donato, Crocetta')
    // Coordinate sede principale (San Donato); Crocetta è nel JSON-LD department
    ensureMetaByName('geo.position', '45.0802312;7.6577188')
    ensureMetaByName('ICBM', '45.0802312, 7.6577188')

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    ensureMetaByProperty('og:title', title)
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:image', ogImage)
    ensureMetaByProperty('og:image:alt', 'Percorso posturale – Studio Mobilitas Torino')
    ensureMetaByProperty('og:image:width', '1200')
    ensureMetaByProperty('og:image:height', '630')
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')
    ensureMetaByProperty('og:locale', 'it_IT')

    // Twitter Card
    ensureMetaByName('twitter:card', 'summary_large_image')
    ensureMetaByName('twitter:title', 'Perché torni storto appena smetti di pensarci? | Mobilitas')
    ensureMetaByName('twitter:description', description)
    ensureMetaByName('twitter:image', ogImage)
    ensureMetaByName('twitter:image:alt', 'Percorso posturale – Mobilitas Torino')

    ensureCanonical(pageUrl)

    const businessShared = {
      '@type': 'MedicalBusiness',
      name: 'Mobilitas – Studio Osteopatico',
      url: origin,
      telephone: '+393518198457',
      email: 'studio@studiomobilitas.it',
      image: `${origin}/logo_blu.png`,
      priceRange: '€€',
      medicalSpecialty: 'Osteopathic',
      areaServed: [
        { '@type': 'City', name: 'Torino' },
        { '@type': 'AdministrativeArea', name: 'Piemonte' },
      ],
      sameAs: [
        'https://www.facebook.com/studiomobilitas',
        'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.0802312,7.6577188,17z',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: String(RECENSIONI_TOTAL),
        bestRating: '5',
        worstRating: '1',
      },
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalWebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: title,
          description,
          inLanguage: 'it-IT',
          isPartOf: { '@id': `${origin}/#website` },
          about: { '@id': `${pageUrl}#condition` },
          mainEntity: { '@id': `${pageUrl}#service` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: ogImage,
          },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'meta[name="description"]'],
          },
        },
        {
          '@type': 'MedicalCondition',
          '@id': `${pageUrl}#condition`,
          name: 'Disturbi posturali',
          alternateName: [
            'Testa in avanti',
            'Ipercifosi',
            'Spalle chiuse',
            'Iperlordosi',
            'Atteggiamento scoliotico',
            'Dolore posturale',
          ],
          associatedAnatomy: {
            '@type': 'AnatomicalStructure',
            name: 'Colonna vertebrale, bacino e cingolo scapolare',
          },
        },
        {
          '@type': 'MedicalTherapy',
          '@id': `${pageUrl}#service`,
          name: 'Percorso posturale',
          description:
            'Una prima visita per capire cosa si muove ancora, 3 sedute dall’osteopata su quella parte, e un’app con un piano semplice. 299 euro invece di 600. Oggi non si paga: lista d’attesa oppure telefonata gratuita.',
          url: pageUrl,
          provider: { '@id': `${origin}/#organization` },
          offers: {
            '@type': 'Offer',
            price: '299',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/PreOrder',
            url: pageUrl,
            name: 'Percorso posturale: visita, 3 trattamenti e app',
          },
        },
        {
          ...businessShared,
          '@id': `${origin}/#organization`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Via Peyron 54',
            addressLocality: 'Torino',
            addressRegion: 'Piemonte',
            postalCode: '10143',
            addressCountry: 'IT',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 45.0802312,
            longitude: 7.6577188,
          },
          hasMap:
            'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.0802312,7.6577188,17z',
          department: [
            {
              '@type': 'MedicalBusiness',
              '@id': `${origin}/#sede-san-donato`,
              name: 'Mobilitas – San Donato',
              telephone: '+393518198457',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Via Peyron 54',
                addressLocality: 'Torino',
                addressRegion: 'Piemonte',
                postalCode: '10143',
                addressCountry: 'IT',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.0802312,
                longitude: 7.6577188,
              },
            },
            {
              '@type': 'MedicalBusiness',
              '@id': `${origin}/#sede-crocetta`,
              name: 'Mobilitas – Crocetta',
              telephone: '+393518198457',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Via Lamarmora 35',
                addressLocality: 'Torino',
                addressRegion: 'Piemonte',
                postalCode: '10128',
                addressCountry: 'IT',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.0593749,
                longitude: 7.6660428,
              },
            },
          ],
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Percorso posturale',
              item: pageUrl,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Posso già prenotare?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Sta per partire. Col bottone verde ti metti in lista. Non paghi ora. La segreteria ti richiama il prima possibile. Ogni mese prendiamo poche persone. I posti vanno a chi si iscrive prima.',
              },
            },
            {
              '@type': 'Question',
              name: 'Il video mostra un pezzo. Il percorso guarda tutto?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Sì. Collo, schiena e spalle spesso sono la stessa storia: le ore di ogni giorno. La visita guarda te. Le 3 sedute seguono quella.',
              },
            },
            {
              '@type': 'Question',
              name: 'Cosa c’è nei 299 euro?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Tre cose. Una prima visita. 3 sedute dall’osteopata. L’app, con un piano preciso fatto per te. Il prezzo pieno è 600 euro. Oggi non paghi: ti metti in lista.',
              },
            },
            {
              '@type': 'Question',
              name: 'Ho già fatto fisioterapia o posturale.',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Bene. Continua. Se una zona è bloccata, l’esercizio spesso le gira intorno. Noi prima la sblocchiamo. Poi l’app ti aiuta a tenerla quando non sei in studio.',
              },
            },
            {
              '@type': 'Question',
              name: 'Mi raddrizzate?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Non è una soluzione magica. È per chi è stanco di rimandare. Una parte può restare così. Lavoriamo su quello che si muove ancora. Quanto migliori, lo vedi strada facendo.',
              },
            },
            {
              '@type': 'Question',
              name: 'Come funziona l’app?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Dopo la visita hai un piano preciso: video lezioni e videocorsi fatti per te. Li guardi a casa o in pausa. L’app non sostituisce le 3 sedute. Serve a non restare solo fuori studio.',
              },
            },
            {
              '@type': 'Question',
              name: 'Quando devo andare prima dal medico?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Se non controlli pipì o feci. Se un braccio o una gamba perde forza ogni giorno. Se il dolore di notte cresce e perdi peso. Se hai febbre. Se da poche settimane un lato è molto più storto. In quei casi, prima il medico.',
              },
            },
          ],
        },
      ],
    }

    let scriptLd = document.querySelector('script[type="application/ld+json"][data-page="yt-postura"]')
    if (!scriptLd) {
      scriptLd = document.createElement('script')
      scriptLd.setAttribute('type', 'application/ld+json')
      scriptLd.setAttribute('data-page', 'yt-postura')
      document.head.appendChild(scriptLd)
    }
    scriptLd.textContent = JSON.stringify(jsonLd)

    return () => {
      document.title = prevTitle
      const toRemove = document.querySelector('script[type="application/ld+json"][data-page="yt-postura"]')
      if (toRemove) toRemove.remove()
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
      const nearStart = el.scrollLeft <= 48
      const nearEnd = maxScroll > 0 && el.scrollLeft >= maxScroll - 48
      if (nearStart) {
        setRecensioniIndex(0)
        return
      }
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

  useEffect(() => {
    if (typeof window === 'undefined') return
    mouseX.set(window.innerWidth * 0.5)
    mouseY.set(window.innerHeight * 0.25)
    const onMove = (event) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mouseX, mouseY])

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
        <motion.button
          type="button"
          onClick={openConsulto}
          whileHover={{ y: -3, scale: 1.01 }}
          whileTap={{ y: 0, scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className={`group inline-flex items-center gap-2.5 sm:gap-3 w-fit max-w-full rounded-full font-black uppercase tracking-tight text-blue-dark border-2 border-cream bg-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_34px_-12px_rgba(244,244,244,0.35)] active:translate-y-0 ${primaryCls}`}
        >
          <span className="inline-flex items-center gap-2 sm:gap-2.5 min-w-0">
            <Phone className={`${iconCls} shrink-0`} strokeWidth={2.5} />
            <span className="sm:hidden">Consulenza gratis</span>
            <span className="hidden sm:inline whitespace-nowrap">Consulenza gratuita</span>
          </span>
          <span
            className={`grid place-items-center rounded-full bg-blue-dark text-cream shrink-0 ${arrowCls}`}
          >
            <ArrowRight className={arrowIconCls} strokeWidth={2.25} />
          </span>
        </motion.button>
        <motion.button
          type="button"
          onClick={openPrimaVisita}
          whileHover={{ y: -3, scale: 1.01 }}
          whileTap={{ y: 0, scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className={`group inline-flex items-center gap-2.5 sm:gap-3 w-fit max-w-full rounded-full font-black uppercase tracking-tight text-blue-dark bg-[linear-gradient(90deg,#3dd968_0%,#72fa93_45%,#a8ffbf_100%)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_34px_-12px_rgba(114,250,147,0.55)] active:translate-y-0 ${secondaryCls}`}
        >
          <span className="inline-flex items-center gap-2 sm:gap-2.5 min-w-0">
            <CalendarCheck className={`${iconCls} shrink-0`} strokeWidth={2.5} />
            <span className="sm:hidden">Mettiti in lista</span>
            <span className="hidden sm:inline whitespace-nowrap">Mettiti in lista</span>
          </span>
          <span
            className={`grid place-items-center rounded-full bg-blue-dark text-green shrink-0 ${arrowCls}`}
          >
            <ArrowRight className={arrowIconCls} strokeWidth={2.25} />
          </span>
        </motion.button>
      </div>
    )
  }

  return (
    <div className="yt-postura min-h-screen bg-blue-dark text-cream font-montserrat overflow-x-hidden">
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-green shadow-[0_0_16px_rgba(114,250,147,0.8)]"
        style={{ scaleX: smoothProgress }}
      />
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
        {AMBIENT_ORBS.map((orb, i) => (
          <motion.span
            key={`orb-${i}`}
            className={`absolute ${orb.size} rounded-full bg-green/15 blur-2xl`}
            style={{ left: orb.left, top: orb.top, y: pageGlowY, rotate: pageGlowRotate }}
            animate={{ x: [0, i % 2 ? -16 : 18, 0], scale: [1, 1.08, 1], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        <motion.div
          className="absolute h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{
            x: spotlightX,
            y: spotlightY,
            translateX: '-50%',
            translateY: '-50%',
            background:
              'radial-gradient(circle, rgba(114,250,147,0.36) 0%, rgba(114,250,147,0.13) 30%, rgba(114,250,147,0) 72%)',
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-[0.17]"
          animate={{ backgroundPositionX: ['0%', '100%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, rgba(114,250,147,0.18) 0px, rgba(114,250,147,0.18) 1px, transparent 1px, transparent 26px)',
          }}
        />
      </div>
      {/* ——— OFFERTA ——— */}
      <section className="relative z-[2] pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
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
              Dal video di Nicolas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black leading-[1.12] tracking-[-0.03em] mb-6 sm:mb-8"
          >
            Perché torni storto
            <br />
            <span className="relative inline-block text-green">
              <motion.span
                className="absolute inset-y-0 -left-10 w-20 rounded-full bg-green/40 blur-xl"
                style={{ x: titleGlowX }}
              />
              <span className="relative">appena smetti di pensarci?</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-cream/60 text-lg sm:text-lg leading-relaxed max-w-2xl sm:mx-auto mb-10 sm:mb-12 font-medium"
          >
            Lo fai tutti i giorni, anche se non te ne accorgi. Ti tiri su, apri le spalle, sistemi
            la testa. Per un attimo ci sei. Poi riprendi il telefono, il lavoro o la macchina, e
            torni storto come prima. Se ti è già successo, non sei pigro e non ti manca la volontà.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="relative w-full max-w-3xl sm:mx-auto mb-6 sm:mb-12"
            style={{
              y: heroMediaY,
              rotateX: heroMediaRotateX,
              scale: heroMediaScale,
              transformPerspective: 1200,
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute -inset-6 sm:-inset-10 bg-[radial-gradient(ellipse_at_center,rgba(114,250,147,0.28),transparent_65%)] blur-2xl pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute -inset-2 sm:-inset-4 bg-[radial-gradient(ellipse_at_center,rgba(0,37,82,0.55),transparent_70%)] blur-xl pointer-events-none"
              aria-hidden
            />

            {/* Offset accent frame */}
            <div
              className="absolute inset-3 sm:inset-4 rounded-[1.15rem] sm:rounded-[1.5rem] border border-green/30 translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 pointer-events-none shadow-[0_0_30px_-8px_rgba(114,250,147,0.35)]"
              aria-hidden
            />

            {/* Soft contact + cast shadows under the frame */}
            <div
              className="absolute left-5 right-5 -bottom-4 sm:left-8 sm:right-8 sm:-bottom-5 h-10 sm:h-12 rounded-[100%] bg-black/60 blur-2xl pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute left-10 right-10 -bottom-1.5 sm:left-14 sm:right-14 sm:-bottom-2.5 h-5 rounded-[100%] bg-black/45 blur-md pointer-events-none"
              aria-hidden
            />

            {/* Gradient border shell */}
            <motion.div
              className="relative p-[1px] rounded-2xl sm:rounded-[1.35rem] bg-[linear-gradient(145deg,rgba(114,250,147,0.7)_0%,rgba(244,244,244,0.22)_35%,rgba(114,250,147,0.18)_70%,rgba(0,37,82,0.45)_100%)] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.85),0_48px_100px_-28px_rgba(0,0,0,0.65),0_12px_32px_-10px_rgba(114,250,147,0.28),0_0_0_1px_rgba(114,250,147,0.14)]"
              whileHover={{ rotateY: 3.5, rotateX: -1.5, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 210, damping: 20 }}
            >
              <div className="relative overflow-hidden rounded-[calc(1rem-1px)] sm:rounded-[calc(1.35rem-1px)] aspect-[16/9] bg-[#002552]">
                {heroVideo ? (
                  <>
                    {heroVideo.anteprimaUrl ? (
                      <img
                        src={heroVideo.anteprimaUrl}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        decoding="async"
                        fetchPriority="high"
                      />
                    ) : null}
                    <iframe
                      src={heroVideoSrc}
                      title={heroVideo.titolo || 'Percorso posturale - Mobilitas Torino'}
                      className="absolute inset-0 h-full w-full border-0 pointer-events-none bg-[#002552]"
                      style={{ backgroundColor: '#002552', colorScheme: 'normal' }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowFullScreen
                    />
                    {/* Copre il flash nero iniziale del player con il blu aziendale */}
                    <div
                      className={`absolute inset-0 z-[1] bg-[#002552] transition-opacity duration-300 ${
                        heroVideoCover ? 'opacity-100' : 'opacity-0'
                      }`}
                      aria-hidden
                    />
                    {/* Blocca interazione: il video deve comportarsi come un'immagine in loop */}
                    <div className="absolute inset-0 z-[1]" aria-hidden />
                  </>
                ) : (
                  <img
                    src="/maldischiena/maldischiena1.JPG"
                    alt="Trattamento posturale in studio a Torino"
                    className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
                  />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-cream/10 rounded-[inherit] pointer-events-none z-[2]" />
              </div>
            </motion.div>
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
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.28 + i * 0.08 }}
                  className="flex items-center gap-3 min-w-0"
                >
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-green shrink-0 shadow-[0_0_20px_rgba(114,250,147,0.25)]">
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
                  <span className="text-cream/35 font-bold text-2xl sm:text-3xl line-through tracking-tight leading-none">
                    600€
                  </span>
                  <span className="text-green font-black text-5xl sm:text-6xl tracking-tight leading-none">
                    299€
                  </span>
                  <span className="text-cream/55 text-base sm:text-base font-medium self-end pb-1">
                    percorso completo
                  </span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-cream/15" aria-hidden />
                <p className="text-green italic text-base sm:text-[15px] font-medium tracking-wide leading-snug text-center sm:text-left max-w-[14rem] sm:max-w-none">
                  Oggi non paghi
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
              <div className="flex flex-col items-center gap-2 max-w-md text-center">
                <p className="m-0 text-cream/80 text-[15px] sm:text-base leading-snug">
                  Il bottone verde ti mette in lista, e oggi non paghi. Il percorso sta per partire:
                  ogni mese i posti sono pochi, e li prende chi arriva prima.
                </p>
                <p className="m-0 text-cream/80 text-[15px] sm:text-base leading-snug">
                  La consulenza è una telefonata gratis. Serve a capire se la tua situazione si può
                  risolvere con questo percorso. Lasci nome e numero, ti richiamiamo noi.
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
      <section className="relative z-[2] py-16 lg:py-24 overflow-hidden">
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
              Ti ci ritrovi?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight max-w-3xl mb-4 sm:mb-5">
              Ti fa male il collo, la schiena o la pancia.
              <br />
              <span className="text-green">La causa è quasi sempre un’altra.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Il dolore lo senti in un punto solo, e pensi che il problema sia quello. Quasi sempre
              è un’altra parte del corpo, che non si muove più come dovrebbe. Il punto che fa male
              ne paga solo le conseguenze. Leggi le storie qui sotto. Se una è la tua, continua: ti
              spieghiamo perché succede.
            </p>
          </motion.div>

          <div className="relative z-10">
            <div
              ref={painRef}
              className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-4 pb-3 px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', touchAction: 'pan-x' }}
            >
              {PAIN_POINTS.map((pain, i) => {
                const Icon = pain.icon
                return (
                  <motion.article
                    key={pain.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
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
                        <h3 className="text-cream font-bold text-base sm:text-lg leading-snug mb-2.5 pr-10 mt-0">
                          {pain.title}
                        </h3>
                        <p className="text-cream/60 text-sm leading-relaxed">
                          {pain.body}
                        </p>
                      </div>
                    </div>
                  </motion.article>
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
      <section className="relative z-[2] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <img
            src="/cervicalgia/cerv10.JPG"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_45%] opacity-[0.24] scale-105"
          />
          <div className="absolute inset-0 bg-blue-dark/82" />
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(0,21,48,0.88)_0%,rgba(0,37,82,0.72)_40%,rgba(0,58,110,0.65)_70%,rgba(0,26,61,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(114,250,147,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_100%_80%,rgba(114,250,147,0.07),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-blue-dark to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-12 lg:mb-16"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green px-5 py-2.5 sm:py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.22em] shadow-[0_0_24px_rgba(114,250,147,0.25)] mb-4 sm:mb-5">
              Detto semplice
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4 sm:mb-5">
              Inizialmente ti fa male un punto.
              <span className="text-green"> Ma il resto del corpo compensa.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Se continui a curare solo il punto che brucia, stai meglio per un po’ e poi torna. Il
              massaggio, la pastiglia e il correttore calmano il fastidio. Non tolgono il motivo per
              cui quel fastidio si forma di nuovo, ogni giorno.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
            {/* — Emblema animato: la catena posturale — */}
            <motion.figure
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[420px]"
            >
              <div
                className="absolute -inset-4 sm:-inset-5 bg-[radial-gradient(ellipse_at_center,rgba(114,250,147,0.16),transparent_65%)] blur-2xl pointer-events-none"
                aria-hidden
              />
              <div
                className="absolute inset-2 sm:inset-3 rounded-[1.75rem] border border-green/20 translate-x-2 translate-y-2 pointer-events-none"
                aria-hidden
              />
              <div className="relative p-[1px] rounded-[1.75rem] sm:rounded-[2rem] bg-[linear-gradient(145deg,rgba(114,250,147,0.45)_0%,rgba(244,244,244,0.12)_40%,rgba(114,250,147,0.08)_75%,rgba(0,37,82,0.35)_100%)] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65),0_0_0_1px_rgba(114,250,147,0.08)]">
              <div className="overflow-hidden rounded-[calc(1.75rem-1px)] sm:rounded-[calc(2rem-1px)] border border-cream/[0.06] bg-blue-dark/60 backdrop-blur-md">
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(114,250,147,0.16),transparent_62%)]" />

                <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="postura-chain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#72fa93" stopOpacity="0.15" />
                      <stop offset="50%" stopColor="#72fa93" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#72fa93" stopOpacity="0.15" />
                    </linearGradient>
                    <radialGradient id="postura-node" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#72fa93" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#72fa93" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <motion.circle
                    cx="200" cy="200" r="152"
                    fill="none" stroke="#F4F4F4" strokeOpacity="0.09"
                    strokeWidth="1" strokeDasharray="2 11"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '200px 200px', transformBox: 'view-box' }}
                  />

                  {/* catena: testa, torace, bacino, appoggio */}
                  <path
                    d="M200 58 C 168 110, 168 130, 176 156 C 196 214, 228 214, 220 262 C 210 312, 196 330, 200 348"
                    fill="none"
                    stroke="#72fa93"
                    strokeOpacity="0.28"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  <path
                    d="M200 58 C 168 110, 168 130, 176 156 C 196 214, 228 214, 220 262 C 210 312, 196 330, 200 348"
                    fill="none"
                    stroke="url(#postura-chain)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {[
                    [200, 58],
                    [176, 156],
                    [220, 262],
                    [200, 348],
                  ].map(([cx, cy]) => (
                    <g key={`${cx}-${cy}`}>
                      <circle cx={cx} cy={cy} r="16" fill="url(#postura-node)" />
                      <circle cx={cx} cy={cy} r="5.5" fill="#002552" stroke="#72fa93" strokeWidth="2" />
                    </g>
                  ))}

                  <motion.circle
                    r="6"
                    fill="#72fa93"
                    animate={{
                      offsetDistance: ['0%', '100%', '0%'],
                    }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      offsetPath:
                        'path("M200 58 C 168 110, 168 130, 176 156 C 196 214, 228 214, 220 262 C 210 312, 196 330, 200 348")',
                    }}
                  />
                </svg>

                {[
                  { label: 'Testa', style: { left: '50%', top: '14.5%', transform: 'translate(-50%, calc(-100% - 14px))' } },
                  { label: 'Petto', style: { left: '44%', top: '39%', transform: 'translate(calc(-100% - 14px), -50%)' }, accent: true },
                  { label: 'Bacino', style: { left: '55%', top: '65.5%', transform: 'translate(16px, -50%)' } },
                  { label: 'Piedi', style: { left: '50%', top: '87%', transform: 'translate(16px, -50%)' } },
                ].map((item) => (
                  <span
                    key={item.label}
                    className={`absolute whitespace-nowrap text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] ${
                      item.accent ? 'text-green' : 'text-cream/85'
                    }`}
                    style={item.style}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
              <figcaption className="px-4 py-3.5 sm:px-5 sm:py-4 text-center text-cream/55 text-sm leading-snug text-balance border-t border-cream/10">
                Fa male su. Il motivo, molte volte, sta sotto.
              </figcaption>
              </div>
              </div>
            </motion.figure>

            {/* — Narrazione + catena causale — */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-[1px] rounded-[1.35rem] bg-[linear-gradient(145deg,rgba(244,244,244,0.16)_0%,rgba(244,244,244,0.05)_50%,rgba(114,250,147,0.14)_100%)]"
            >
              <div className="rounded-[calc(1.35rem-1px)] bg-blue-dark/70 backdrop-blur-md px-5 py-5 sm:px-6 sm:py-6">
              <div className="text-cream/75 text-[15px] sm:text-lg leading-relaxed mb-6 lg:mb-7 space-y-4">
                <p>
                  La testa sta dritta solo se la schiena sotto è aperta. Se resti curvo per ore,
                  il petto si chiude e le spalle cadono in avanti. Allora anche la testa va
                  avanti, e il collo si irrigidisce per tenerla su.
                </p>
                <p>
                  Più in basso succede la stessa cosa. Se il bacino è inclinato in avanti, la
                  pancia sporge anche se non è grassa. Se un fianco è più alto, quasi mai è una
                  gamba corta: è il bacino che si è girato. Se il ginocchio cade verso l’interno,
                  a spostarlo sono l’anca e il piede. E se ti sei messo storto per un dolore, puoi
                  restare così anche quando il dolore è passato.
                </p>
              </div>

              <ol className="relative space-y-3 mb-6 lg:mb-7 list-none m-0 p-0">
                <span
                  className="absolute left-[18px] top-5 bottom-5 w-px bg-gradient-to-b from-green/50 via-green/20 to-transparent"
                  aria-hidden
                />
                {MECHANISM_STEPS.map((s) => (
                  <li
                    key={s.k}
                    className="relative flex items-start gap-4 rounded-xl border border-cream/10 bg-cream/[0.03] px-4 py-3.5 sm:px-4 sm:py-4"
                  >
                    <div className="relative z-10 flex-shrink-0 grid place-items-center w-9 h-9 rounded-full border border-green/35 bg-blue-dark text-green text-[11px] font-black tabular-nums shadow-[0_0_18px_rgba(114,250,147,0.15)]">
                      {s.k}
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h4 className="text-cream font-bold text-[15px] sm:text-base leading-snug mb-1 mt-0">
                        {s.t}
                      </h4>
                      <p className="text-cream/55 text-sm leading-relaxed">{s.b}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="p-[1px] rounded-2xl bg-[linear-gradient(135deg,rgba(114,250,147,0.55)_0%,rgba(114,250,147,0.12)_100%)]">
                <blockquote className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-green/[0.08] px-5 py-4 sm:px-6 sm:py-5">
                  <span
                    className="absolute left-0 top-0 bottom-0 w-1 bg-green shadow-[0_0_16px_rgba(114,250,147,0.5)]"
                    aria-hidden
                  />
                  <p className="text-cream/90 font-medium text-[15px] sm:text-lg leading-relaxed pl-2">
                    Chi ti promette di raddrizzarti prima di averti visto, ti sta prendendo in giro.
                    <span className="text-green"> Noi ti diciamo subito dove intervenire per risolvere il problema. E dove non serve.</span>
                  </p>
                </blockquote>
              </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cream/15 to-transparent mb-12 lg:mb-16" aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-10 lg:mb-14"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green px-5 py-2.5 sm:py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.22em] shadow-[0_0_24px_rgba(114,250,147,0.25)] mb-4 sm:mb-5">
              Cosa può tornare
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight max-w-3xl mb-4 sm:mb-5">
              Non devi più tenerti su.
              <br />
              <span className="text-green">Il corpo ci resta da solo.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Sono le risposte alle storie di sopra. Non arrivano tutte, e non arrivano il giorno in
              cui lasci il numero. Se una parte è diventata osso, resta: te lo diciamo alla prima
              visita. Se schiena, costole, bacino o piedi si muovono ancora, il lavoro è lì. E queste
              cose possono tornare, strada facendo.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
            {BENEFITS.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group h-full"
                >
                  <div className="relative h-full p-[1px] rounded-[1.35rem] bg-[linear-gradient(145deg,rgba(244,244,244,0.16)_0%,rgba(244,244,244,0.05)_42%,rgba(114,250,147,0.22)_100%)] shadow-[0_16px_48px_-28px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:shadow-[0_24px_56px_-24px_rgba(114,250,147,0.22)] group-hover:bg-[linear-gradient(145deg,rgba(114,250,147,0.45)_0%,rgba(244,244,244,0.08)_48%,rgba(114,250,147,0.28)_100%)]">
                    <div className="flex h-full flex-col sm:flex-row overflow-hidden rounded-[calc(1.35rem-1px)] bg-blue-dark/80 backdrop-blur-md">
                      <div className="relative h-44 sm:h-auto sm:w-[38%] sm:self-stretch shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.alt}
                          loading="lazy"
                          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ${item.imageClassName || 'object-center'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/70 via-blue-dark/10 to-blue-dark/15 sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-blue-dark/25 pointer-events-none" />
                        <span className="absolute top-3 left-3 grid place-items-center min-w-[2.35rem] h-9 px-2.5 rounded-full border border-cream/20 bg-blue-dark text-xs font-black tabular-nums text-green shadow-[0_0_18px_rgba(114,250,147,0.15)]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 sm:px-5 sm:py-5">
                        <div className="mb-3 flex items-center gap-2.5">
                          <span className="grid place-items-center w-8 h-8 rounded-lg border border-green/30 bg-green/10 text-green shrink-0">
                            <Icon className="w-4 h-4" strokeWidth={1.75} />
                          </span>
                          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.16em] text-cream/45 leading-none">
                            {item.eyebrow}
                          </p>
                        </div>
                        <h3 className="text-cream font-black text-xl sm:text-[1.35rem] leading-snug tracking-tight mb-2 mt-0 transition-colors duration-300 group-hover:text-green">
                          {item.title}
                        </h3>
                        <p className="text-cream/55 text-sm sm:text-[15px] leading-relaxed m-0">{item.body}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="mt-8 lg:mt-10 p-[1px] rounded-[1.35rem] bg-[linear-gradient(145deg,rgba(114,250,147,0.45)_0%,rgba(244,244,244,0.08)_45%,rgba(114,250,147,0.18)_100%)]"
          >
            <div className="rounded-[calc(1.35rem-1px)] bg-blue-dark/75 backdrop-blur-md px-5 py-5 sm:px-7 sm:py-7">
              <p className="text-cream font-black text-lg sm:text-xl leading-snug mb-1 mt-0">
                Se alla visita ha senso, il percorso è questo.
              </p>
              <p className="text-cream/50 text-sm sm:text-[15px] leading-relaxed mb-5 sm:mb-6">
                Oggi non paghi. Il prezzo te lo confermiamo quando ti richiamiamo.
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 m-0 p-0 list-none">
                {AFTER_IMAGES_BENEFITS.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 min-w-0">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-green shrink-0 mt-0.5 shadow-[0_0_20px_rgba(114,250,147,0.25)]">
                      <Check className="w-3.5 h-3.5 text-blue-dark" strokeWidth={3} />
                    </span>
                    <span className="min-w-0 flex-1 text-cream/85 text-[15px] sm:text-base leading-snug font-medium">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex justify-center mt-12 px-4">
          <CtaPair />
        </div>
      </section>

      <SectionDivider overlap />

      {/* ——— RECENSIONI ——— */}
      <section className="relative z-[2] py-16 lg:py-24 overflow-hidden">
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
              Più di 900 persone
              <br />
              <span className="text-green">hanno già smesso di provare a caso.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Siamo lo studio di osteopatia più recensito d’Italia. Leggile con calma, sono storie
              di gente che era già passata dal massaggio, dalla palestra e dalle pastiglie. Poi,
              se ti sei riconosciuto, non restare a metà pagina: più sotto scegli uno dei due
              bottoni.
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
            Se hai capito che è il tuo caso e vuoi il posto, entra in lista con il bottone verde.
            Se invece vuoi che qualcuno ti dica se ha senso per te, prima di decidere, chiedi la
            telefonata gratis. In tutti e due i casi fai la stessa cosa: lasci nome e numero. Oggi
            non paghi niente.
          </p>
          <div className="flex justify-center">
            <CtaPair />
          </div>
        </div>
      </section>

      <SectionDivider overlap />

      {/* ——— PRIMA VISITA ——— */}
      <section className="relative z-[2] py-16 lg:py-24 overflow-hidden">
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
            className="mb-10 lg:mb-14 text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green px-5 py-2.5 sm:py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.22em] shadow-[0_0_24px_rgba(114,250,147,0.25)] mb-4 sm:mb-5">
              Come si entra
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight max-w-3xl mb-4 sm:mb-5">
              Due modi per entrare.
              <br />
              <span className="text-green">Uno solo ti tiene il posto.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Il verde è la lista. Ogni mese i posti sono pochi, e li prende chi lascia nome e
              numero prima. L’altro è una telefonata gratis: serve se ti resta un dubbio, e ti
              diciamo noi se questo percorso ha senso. Oggi non paghi, né di qua né di là.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {ENTRY_DOORS.map((door, i) => {
              const isList = door.id === 'lista'
              return (
                <motion.article
                  key={door.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="h-full"
                >
                  <div
                    className={`relative flex h-full flex-col p-[1px] rounded-[1.35rem] ${
                      isList
                        ? 'bg-[linear-gradient(160deg,rgba(114,250,147,0.85)_0%,rgba(114,250,147,0.18)_42%,rgba(244,244,244,0.12)_100%)] shadow-[0_24px_60px_-28px_rgba(114,250,147,0.45)]'
                        : 'bg-[linear-gradient(160deg,rgba(244,244,244,0.22)_0%,rgba(244,244,244,0.06)_50%,rgba(244,244,244,0.14)_100%)]'
                    }`}
                  >
                    <div className="flex h-full flex-col rounded-[calc(1.35rem-1px)] bg-blue-dark/80 backdrop-blur-md px-5 py-5 sm:px-7 sm:py-7">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] ${
                            isList
                              ? 'bg-green text-blue-dark shadow-[0_0_18px_rgba(114,250,147,0.35)]'
                              : 'border border-cream/25 text-cream/75'
                          }`}
                        >
                          {door.kicker}
                        </span>
                        {isList ? (
                          <p className="m-0 flex items-baseline gap-2 leading-none">
                            <span className="text-cream/35 font-bold text-lg line-through">600€</span>
                            <span className="text-green font-black text-4xl tracking-tight">299€</span>
                          </p>
                        ) : (
                          <p className="m-0 text-cream/70 text-sm font-bold uppercase tracking-[0.14em]">
                            Gratis
                          </p>
                        )}
                      </div>

                      <h3 className="text-cream font-black text-2xl sm:text-[1.75rem] leading-tight tracking-tight mb-3 mt-0">
                        {door.title}
                      </h3>
                      <p className="text-cream/70 text-[15px] sm:text-base leading-relaxed mb-5">
                        {door.lead}
                      </p>

                      <ul className="space-y-3 mb-6 m-0 p-0 list-none">
                        {door.points.map((point) => (
                          <li key={point} className="flex items-start gap-3">
                            <span className="grid place-items-center w-6 h-6 rounded-full bg-green shrink-0 mt-0.5 shadow-[0_0_16px_rgba(114,250,147,0.25)]">
                              <Check className="w-3.5 h-3.5 text-blue-dark" strokeWidth={3} />
                            </span>
                            <span className="text-cream/85 text-[15px] sm:text-base leading-snug font-medium">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={isList ? openPrimaVisita : openConsulto}
                        className={`mt-auto inline-flex w-full items-center justify-between gap-3 rounded-full pl-6 pr-1.5 min-h-[58px] font-black uppercase tracking-tight transition-all duration-300 hover:-translate-y-0.5 ${
                          isList
                            ? 'text-blue-dark bg-[linear-gradient(90deg,#3dd968_0%,#72fa93_45%,#a8ffbf_100%)] hover:brightness-110 hover:shadow-[0_14px_34px_-12px_rgba(114,250,147,0.55)]'
                            : 'text-blue-dark border-2 border-cream bg-cream hover:bg-white hover:shadow-[0_14px_34px_-12px_rgba(244,244,244,0.35)]'
                        }`}
                      >
                        <span className="inline-flex items-center gap-2.5 min-w-0">
                          {isList ? (
                            <CalendarCheck className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                          ) : (
                            <Phone className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                          )}
                          <span>{isList ? 'Mettiti in lista' : 'Consulenza gratis'}</span>
                        </span>
                        <span
                          className={`grid place-items-center w-11 h-11 rounded-full shrink-0 ${
                            isList ? 'bg-blue-dark text-green' : 'bg-blue-dark text-cream'
                          }`}
                        >
                          <ArrowRight className="w-5 h-5" strokeWidth={2.25} />
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <div className="mt-10 lg:mt-14">
            <p className="text-cream font-black text-xl sm:text-2xl leading-snug mb-5 mt-0">
              Appena lasci il numero, succede questo.
            </p>
            <ol className="grid md:grid-cols-3 gap-4 m-0 p-0 list-none">
              {AFTER_ENTRY.map((step, i) => (
                <motion.li
                  key={step.k}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-2xl border border-cream/10 bg-blue-dark/70 backdrop-blur-md px-5 py-5"
                >
                  <span className="inline-flex items-center rounded-full bg-green px-3 py-1 text-blue-dark text-[11px] font-black uppercase tracking-[0.16em] mb-3">
                    {step.k}
                  </span>
                  <h3 className="text-cream font-black text-lg sm:text-xl leading-snug tracking-tight mb-2 mt-0">
                    {step.t}
                  </h3>
                  <p className="text-cream/55 text-sm sm:text-[15px] leading-relaxed m-0">{step.b}</p>
                </motion.li>
              ))}
            </ol>
          </div>

          <p className="text-cream/75 text-base sm:text-lg leading-relaxed max-w-2xl mt-8 sm:mt-10 mb-8">
            Se ti sei riconosciuto, il passo è uno: lasci nome e numero. Il posto di questo mese lo
            prende chi entra prima.
          </p>

          <div className="flex justify-center">
            <CtaPair />
          </div>
        </div>
      </section>

      <SectionDivider overlap />

      {/* ——— DOVE SIAMO ——— */}
      <section className="relative z-[2] py-16 lg:py-24 overflow-hidden">
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
              San Donato e Crocetta. Quando ti richiamiamo, scegli tu la sede che ti viene più
              comoda. Ci arrivi in metro, in bus o in macchina, e il posto in lista non dipende da
              quale delle due ti è più vicina.
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
              <motion.div
                key={map.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -5 }}
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
              </motion.div>
            ))}
          </div>

          <p className="text-cream/65 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-center my-10 sm:my-12">
              In metro. San Donato: Bernini o Principi d’Acaja. Crocetta: fermata Crocetta.
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
      <section className="relative z-[2] py-16 lg:py-24 overflow-hidden">
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
              Prima di scegliere
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4">
              Le domande che ti frenano,
              <span className="text-green"> dette una per una.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Aprine una. Se dopo averle lette ti resta un dubbio, è proprio per quello che c’è la
              telefonata. Se invece ti sono chiare, il bottone verde è il passo giusto.
            </p>
          </motion.div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group/card"
                >
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
                </motion.div>
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
            Se hai un dubbio, chiedi la telefonata. Se hai già deciso, mettiti in lista. Ti
            richiamiamo il prima possibile. Oggi non parte nessun pagamento, e i posti di questo
            mese li prende chi entra prima.
          </motion.p>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <CtaPair />
          </div>
        </div>
      </section>

      <BookingPopup
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        pageContext="yt-postura"
        ctaType={bookingCtaType}
      />
    </div>
  )
}

export default YtPostura
