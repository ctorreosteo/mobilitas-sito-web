import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Phone,
  CalendarCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Car,
  Check,
  Plus,
  ExternalLink,
  CalendarDays,
  Circle,
  CircleDot,
  ArrowDownToLine,
  Cloud,
  Zap,
  Lock,
  Pill,
  TriangleAlert,
} from 'lucide-react'
import { RECENSIONI_IMAGES } from '../data/recensioni'
import BookingPopup from '../components/BookingPopup'
import SectionDivider from '../components/SectionDivider'

// In dev: '' così la chiamata va a /api/... e il proxy Vite la inoltra al backend locale.
// In prod: base completa del backend HQ (CORS pubblico abilitato per studiomobilitas.it).
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
const HERO_VIDEO_CODICE = 'STITICHEZZA_VSL'

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

function useVideoStitichezzaVsl() {
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
    Riprenditi la <strong className="font-bold">mattina</strong> senza aspettare il{' '}
    <strong className="font-bold">verdetto</strong>
  </>,
  <>
    Ritrova un <strong className="font-bold">ritmo</strong> senza contare i giorni di{' '}
    <strong className="font-bold">attesa</strong>
  </>,
  <>
    Riduci la <strong className="font-bold">dipendenza</strong> dai lassativi, passo dopo passo
  </>,
]

const RECENSIONI_PREVIEW = RECENSIONI_IMAGES.slice(0, 18)
const RECENSIONI_TOTAL = 850
const GOOGLE_RECENSIONI_URL =
  'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.0802312,7.6577188,17z/data=!4m8!3m7!1s0xfe2e29f381fdc93:0x97eee174cab07ada!8m2!3d45.0802312!4d7.6577188!9m1!1b1!16s%2Fg%2F11kqfhtyvd?entry=ttu'

const PAIN_POINTS = [
  {
    icon: CalendarDays,
    title: 'Evacuazioni poco frequenti',
    body: 'Meno di tre volte a settimana, spesso con giorni di intervallo.',
  },
  {
    icon: Circle,
    title: 'Feci dure e difficili da espellere',
    body: 'Consistenza secca e compatta che richiede sforzo.',
  },
  {
    icon: CircleDot,
    title: 'Sensazione di evacuazione incompleta',
    body: 'Esci dal bagno con la sensazione di non aver finito.',
  },
  {
    icon: ArrowDownToLine,
    title: 'Necessità di spingere a lungo',
    body: 'Lo sforzo è necessario in una parte importante delle evacuazioni.',
  },
  {
    icon: Cloud,
    title: 'Gonfiore e tensione addominale',
    body: 'La pancia è distesa e dura, spesso dolente.',
  },
  {
    icon: Zap,
    title: 'Dolore o crampi addominali',
    body: 'Fitte che compaiono e passano, spesso alleviate dall’evacuazione.',
  },
  {
    icon: Lock,
    title: 'Senso di blocco o tappo',
    body: 'La sensazione che qualcosa si fermi e non riesca a proseguire.',
  },
  {
    icon: Car,
    title: 'Peggiora in viaggio o fuori casa',
    body: 'Cambi di ambiente, ritmi e orari bloccano ulteriormente l’intestino.',
  },
  {
    icon: Pill,
    title: 'Dipendenza da lassativi',
    body: 'Senza il ricorso a lassativi o supposte l’evacuazione non avviene.',
  },
  {
    icon: TriangleAlert,
    title: 'Segni da riferire al medico',
    body: 'Sangue nelle feci, perdita di peso, dolore intenso o cambiamento improvviso delle abitudini vanno sempre valutati dal medico.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'L’intestino obbedisce a quello che gli sta intorno',
    b: 'Si muove da solo, ma vive dentro una casa fatta di diaframma, pancia e bacino: se la casa non si muove, lui rallenta.',
  },
  {
    k: '02',
    t: 'Diaframma e pavimento pelvico comandano il transito',
    b: 'Il diaframma lo massaggia dall’alto a ogni respiro; il pavimento pelvico apre la porta in basso. Respiro corto e bacino teso frenano tutto.',
  },
  {
    k: '03',
    t: 'Fibre e acqua non bastano senza il motore',
    b: 'Sono il carburante, non il motore. E un sistema in allerta mette l’intestino in pausa: ecco perché da sole spesso non cambiano nulla.',
  },
]

const BENEFITS = [
  {
    image: '/reflusso/reflusso1.JPG',
    imageClassName: 'object-[58%_55%]',
    alt: 'Trattamento osteopatico sull’addome per la stitichezza',
    title: 'Più fibre nella dieta',
    body: 'Consiglio corretto, ma su un intestino che non si muove le fibre da sole possono anche peggiorare il gonfiore. Macrogol e lassativi osmotici restano i più prescritti — utili, non risolutivi sulla causa.',
  },
  {
    image: '/reflusso/reflusso2.JPG',
    imageClassName: 'object-[52%_58%]',
    alt: 'Valutazione osteopatica di pancia e bacino per il transito intestinale',
    title: 'Bere più acqua',
    body: 'Necessario, e quasi mai sufficiente se la meccanica non funziona. Integratori di magnesio possono aiutare, ma restano un aiuto esterno a un sistema che dovrebbe funzionare da sé.',
  },
  {
    image: '/reflusso/reflusso3.JPG',
    imageClassName: 'object-[42%_52%]',
    alt: 'Lavoro osteopatico delicato sulla pancia',
    title: 'Lassativi',
    body: 'Risolvono l’episodio, ma con l’uso prolungato l’intestino tende a lavorare sempre meno da solo. I stimolanti (bisacodile, senna) portano il rischio di assuefazione.',
  },
  {
    image: '/reflusso/reflusso4.JPG',
    imageClassName: 'object-[45%_52%]',
    alt: 'Trattamento manuale su diaframma e zona addominale',
    title: 'Fermenti lattici e probiotici',
    body: 'Possono aiutare l’equilibrio della flora, raramente cambiano il transito da soli. Rimedi naturali e tisane danno sollievo temporaneo, spesso con lo stesso meccanismo dei lassativi.',
  },
  {
    image: '/reflusso/reflusso5.JPG',
    imageClassName: 'object-[48%_55%]',
    alt: 'Percorso osteopatico per migliorare il transito intestinale',
    title: 'Attività fisica',
    body: 'Aiuta davvero il movimento intestinale. Ma se lo fai già e non è cambiato niente, la causa è altrove. Supposte e clisteri risolvono il momento, senza incidere su ciò che lo ha causato.',
  },
  {
    image: '/reflusso/reflusso6.JPG',
    imageClassName: 'object-[50%_55%]',
    alt: 'Approccio osteopatico in affiancamento agli esami digestivi',
    title: '“Mangia meglio e muoviti di più”',
    body: 'Il consiglio che ricevono tutti. Colonscopia, ecografia e tempo di transito restano fondamentali per escludere problemi seri — quando sono negativi, spesso il quadro è funzionale. Nessuno ti ha ancora chiesto come respiri e com’è il tuo bacino.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Sgonfiare la <strong className="font-bold">pancia</strong> e togliere quella tensione dura e
    tirata
  </>,
  <>
    Andare oltre <strong className="font-bold">fibre e acqua</strong>: lavorare sul motore, non solo
    sul carburante
  </>,
  <>
    Liberare <strong className="font-bold">diaframma</strong> e bacino, così l’intestino ritrova
    spazio
  </>,
  <>
    Smettere di chiamarlo <strong className="font-bold">“il mio normale”</strong>: non sei fatta così
  </>,
]

const VISIT_STEPS = [
  {
    title: 'Primo contatto con la segreteria',
    body: 'Raccogliamo le informazioni principali e fissiamo il professionista più adatto al tuo quadro.',
  },
  {
    title: 'Accettazione in studio',
    body: 'Compili la modulistica e impostiamo la visita in modo ordinato e trasparente.',
  },
  {
    title: 'Anamnesi approfondita',
    body: 'Ricostruiamo sintomi, trigger, esami effettuati e terapie in corso, per definire priorità e obiettivi realistici.',
  },
  {
    title: 'Valutazione obiettiva e posturale',
    body: 'Analizziamo diaframma, pancia, bacino e pavimento pelvico per individuare fattori che possono rallentare il transito.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su posizione, respiro e routine al bagno, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'mani-intestino',
    question: (
      <>
        Cosa c’entrano le <strong>mani</strong> con l’intestino?
      </>
    ),
    answer: (
      <>
        L’intestino vive dentro una casa fatta di diaframma, pancia e bacino: se la casa non si
        muove, lui rallenta. Sulla casa si lavora con le mani — in affiancamento al medico, non al
        posto degli esami che hai già fatto.
      </>
    ),
  },
  {
    id: 'lassativi',
    question: (
      <>
        Prendo i <strong>lassativi</strong> e funziona: perché venire da voi?
      </>
    ),
    answer: (
      <>
        Funziona oggi: ma con il tempo l’intestino lavora sempre meno da solo. L’obiettivo non è
        toglierti il lassativo da un giorno all’altro, ma ridargli il suo motore — così quella
        scatola può tornare a essere l’eccezione.
      </>
    ),
  },
  {
    id: 'fibre-acqua',
    question: (
      <>
        Ho già provato <strong>fibre e acqua</strong>: ha senso?
      </>
    ),
    answer: (
      <>
        Giusto farlo, e spesso non basta: sono il carburante, non il motore. Noi lavoriamo su
        diaframma, bacino e pavimento pelvico — la parte meccanica che nessuno ti ha ancora
        valutato.
      </>
    ),
  },
  {
    id: 'imbarazzo',
    question: (
      <>
        Mi <strong>imbarazza</strong> parlarne: come lavorate?
      </>
    ),
    answer: (
      <>
        È normale, e qui è un argomento come un altro: se ne parla con rispetto e senza giri di
        parole. Nulla viene fatto senza il tuo consenso, e ti fermi quando vuoi.
      </>
    ),
  },
  {
    id: 'red-flags',
    question: (
      <>
        Quando è necessario prima un controllo medico?
      </>
    ),
    answer: (
      <>
        In presenza di blocco completo con niente feci né aria, pancia gonfia e vomito, sangue nelle
        feci o feci nere, cambio improvviso e persistente delle abitudini intestinali dopo i 50
        anni, calo di peso involontario o anemia, oppure dolore addominale forte e continuo anche di
        notte, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il
        quadro è appropriato a un supporto osteopatico.
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

function Stitichezza() {
  const { video: heroVideo, loading: heroVideoLoading } = useVideoStitichezzaVsl()
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('primaVisita')
  const [painIndex, setPainIndex] = useState(0)
  const [recensioniIndex, setRecensioniIndex] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [heroVideoCover, setHeroVideoCover] = useState(true)
  const painRef = useRef(null)
  const recensioniRef = useRef(null)
  const showHeroMedia = heroVideoLoading || Boolean(heroVideo)
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
    const pageUrl = `${origin}/stitichezza`
    const ogImage = `${origin}/reflusso/reflusso1.JPG`

    const title =
      'Osteopata Stitichezza Torino | Transito Intestinale e Diaframma | Mobilitas'
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
      'Osteopata per stitichezza a Torino (San Donato e Crocetta). Lavoriamo su diaframma, pancia, bacino e pavimento pelvico, in affiancamento al medico. Prima visita 49€.'

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    ensureMetaByName(
      'keywords',
      [
        'osteopata stitichezza torino',
        'stitichezza torino',
        'osteopatia stitichezza',
        'trattamento stitichezza osteopata',
        'transito intestinale osteopata',
        'stitichezza cronica torino',
        'osteopata intestino torino',
        'pavimento pelvico stitichezza',
        'osteopata pancia torino',
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
    ensureMetaByProperty('og:image:alt', 'Trattamento osteopatico per stitichezza – Studio Mobilitas Torino')
    ensureMetaByProperty('og:image:width', '1200')
    ensureMetaByProperty('og:image:height', '630')
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')
    ensureMetaByProperty('og:locale', 'it_IT')

    // Twitter Card
    ensureMetaByName('twitter:card', 'summary_large_image')
    ensureMetaByName('twitter:title', 'Osteopata Stitichezza Torino | Mobilitas')
    ensureMetaByName('twitter:description', description)
    ensureMetaByName('twitter:image', ogImage)
    ensureMetaByName('twitter:image:alt', 'Trattamento osteopatico per stitichezza – Mobilitas Torino')

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
          name: 'Stitichezza',
          alternateName: [
            'Stipsi',
            'Costipazione',
            'Transito intestinale lento',
            'Intestino pigro',
            'Evacuazione difficile',
          ],
          associatedAnatomy: {
            '@type': 'AnatomicalStructure',
            name: 'Intestino, diaframma e pavimento pelvico',
          },
        },
        {
          '@type': 'MedicalTherapy',
          '@id': `${pageUrl}#service`,
          name: 'Trattamento osteopatico per stitichezza',
          description:
            'Approccio osteopatico integrato su diaframma, pancia, bacino e pavimento pelvico, in affiancamento al percorso medico gastroenterologico.',
          url: pageUrl,
          provider: { '@id': `${origin}/#organization` },
          offers: {
            '@type': 'Offer',
            price: '49',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: pageUrl,
            name: 'Prima visita osteopatica per stitichezza',
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
              name: 'Stitichezza',
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
              name: "Cosa c'entrano le mani con l'intestino?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: "L'intestino vive dentro una casa fatta di diaframma, pancia e bacino: se la casa non si muove, lui rallenta. Sulla casa si lavora con le mani — in affiancamento al medico, non al posto degli esami che hai già fatto.",
              },
            },
            {
              '@type': 'Question',
              name: 'Prendo i lassativi e funziona: perché venire da voi?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Funziona oggi: ma con il tempo l'intestino lavora sempre meno da solo. L'obiettivo non è toglierti il lassativo da un giorno all'altro, ma ridargli il suo motore — così quella scatola può tornare a essere l'eccezione.",
              },
            },
            {
              '@type': 'Question',
              name: 'Ho già provato fibre e acqua: ha senso?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Giusto farlo, e spesso non basta: sono il carburante, non il motore. Noi lavoriamo su diaframma, bacino e pavimento pelvico — la parte meccanica che nessuno ti ha ancora valutato.',
              },
            },
            {
              '@type': 'Question',
              name: 'Mi imbarazza parlarne: come lavorate?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "È normale, e qui è un argomento come un altro: se ne parla con rispetto e senza giri di parole. Nulla viene fatto senza il tuo consenso, e ti fermi quando vuoi.",
              },
            },
            {
              '@type': 'Question',
              name: 'Quando è necessario prima un controllo medico?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'In presenza di blocco completo con niente feci né aria, pancia gonfia e vomito, sangue nelle feci o feci nere, cambio improvviso e persistente delle abitudini intestinali dopo i 50 anni, calo di peso involontario o anemia, oppure dolore addominale forte e continuo anche di notte, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
              },
            },
          ]
        },
      ],
    }

    let scriptLd = document.querySelector('script[type="application/ld+json"][data-page="stitichezza"]')
    if (!scriptLd) {
      scriptLd = document.createElement('script')
      scriptLd.setAttribute('type', 'application/ld+json')
      scriptLd.setAttribute('data-page', 'stitichezza')
      document.head.appendChild(scriptLd)
    }
    scriptLd.textContent = JSON.stringify(jsonLd)

    return () => {
      document.title = prevTitle
      const toRemove = document.querySelector('script[type="application/ld+json"][data-page="stitichezza"]')
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
            <span className="sm:hidden">Consulto gratuito</span>
            <span className="hidden sm:inline whitespace-nowrap">Consulto telefonico gratuito</span>
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
          <span className="inline-flex items-center gap-2 sm:gap-2.5 min-w-0 whitespace-nowrap">
            <CalendarCheck className={`${iconCls} shrink-0`} strokeWidth={2.5} />
            Prima visita a 49€
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
    <div className="min-h-screen bg-blue-dark text-cream font-montserrat overflow-x-hidden">
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
              Torino · Stitichezza
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="text-[2.65rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black leading-[1.02] tracking-[-0.03em] mb-6 sm:mb-8"
          >
            Soffri di stitichezza e
            <br className="hidden sm:block" />{' '}
            andare in bagno è uno sforzo?
            <br />
            <span className="relative inline-block text-green">
              <motion.span
                className="absolute inset-y-0 -left-10 w-20 rounded-full bg-green/40 blur-xl"
                style={{ x: titleGlowX }}
              />
              <span className="relative">Prenota il tuo trattamento specifico.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-cream/60 text-lg sm:text-lg leading-relaxed max-w-lg sm:mx-auto mb-10 sm:mb-12 font-medium"
          >
            Interveniamo in modo specifico su{' '}
            <strong className="font-bold text-cream">diaframma</strong>,{' '}
            <strong className="font-bold text-cream">pancia</strong> e{' '}
            <strong className="font-bold text-cream">bacino</strong> per ridurre l’impatto
            della stitichezza su mattina, viaggi e vita quotidiana.
          </motion.p>

          {showHeroMedia && (
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
                      title={heroVideo.titolo || 'Video trattamento stitichezza - Mobilitas Torino'}
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
                ) : null}
                <div className="absolute inset-0 ring-1 ring-inset ring-cream/10 rounded-[inherit] pointer-events-none z-[2]" />
              </div>
            </motion.div>
          </motion.div>
          )}

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
                  <span className="text-green font-black text-5xl sm:text-6xl tracking-tight leading-none">
                    49€
                  </span>
                  <span className="text-cream/55 text-base sm:text-base font-medium self-end pb-1">
                    visita di 1h
                  </span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-cream/15" aria-hidden />
                <p className="text-[#ff6b6b] italic text-base sm:text-[15px] font-medium tracking-wide leading-none">
                  Solo <span className="font-black">40 posti</span> al mese
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
              I sintomi più comuni
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight max-w-2xl mb-4 sm:mb-5">
              La stitichezza non ti limita solo nei sintomi.
              <br />
              <span className="text-green">Ti limita fin dal primo gesto del giorno.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl">
              Ignorarla non la fa sparire: la normalizza. E più la normalizzi, più ti toglie{' '}
              <strong className="font-bold text-cream">serenità al risveglio</strong>,{' '}
              <strong className="font-bold text-cream">libertà in viaggio</strong> e{' '}
              <strong className="font-bold text-cream">fiducia</strong> nel tuo corpo.
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
              Il trattamento
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4 sm:mb-5">
              Perché puoi fare “tutto giusto”
              <span className="text-green"> e stare comunque male</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl">
              <strong className="font-bold text-cream">Le fibre contano</strong>.{' '}
              <strong className="font-bold text-cream">I lassativi contano</strong>. Ma non sono
              l’unico livello del problema: se diaframma e bacino non si muovono, l’
              <strong className="font-bold text-cream">intestino</strong> continua a rallentare.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
            {/* — Emblema animato: intestino, diaframma e bacino — */}
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
                    <linearGradient id="stitichezza-tube" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#72fa93" stopOpacity="0" />
                      <stop offset="46%" stopColor="#72fa93" stopOpacity="0.16" />
                      <stop offset="54%" stopColor="#72fa93" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#72fa93" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="stitichezza-core" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#72fa93" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#72fa93" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* asse intestinale */}
                  <rect x="171" y="16" width="58" height="368" rx="29" fill="url(#stitichezza-tube)" />

                  {/* anello esterno tratteggiato in rotazione */}
                  <motion.circle
                    cx="200" cy="200" r="152"
                    fill="none" stroke="#F4F4F4" strokeOpacity="0.09"
                    strokeWidth="1" strokeDasharray="2 11"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '200px 200px', transformBox: 'view-box' }}
                  />

                  {/* diaframma: il massaggio dall’alto */}
                  <motion.g
                    animate={{ scale: [1, 1.045, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '200px 200px', transformBox: 'view-box' }}
                  >
                    <circle cx="200" cy="200" r="106" fill="none" stroke="#72fa93" strokeOpacity="0.22" strokeWidth="20" />
                    <circle cx="200" cy="200" r="106" fill="none" stroke="#72fa93" strokeOpacity="0.85" strokeWidth="1.5" />
                  </motion.g>

                  {/* centro: transito */}
                  <circle cx="200" cy="200" r="46" fill="url(#stitichezza-core)" />
                  <motion.circle
                    cx="200" cy="200" r="31"
                    fill="none" stroke="#72fa93" strokeWidth="2.5"
                    animate={{ scale: [1, 0.9, 1], opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '200px 200px', transformBox: 'view-box' }}
                  />
                  {/* pavimento pelvico */}
                  <path
                    d="M200 180 C212 200 212 200 200 220 C188 200 188 200 200 180 Z"
                    fill="#002552" stroke="#72fa93" strokeWidth="2"
                  />
                </svg>

                {/* etichette */}
                <span className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cream/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-cream/60" />
                  Diaframma
                </span>
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cream/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-cream/60" />
                  Bacino
                </span>
                <span className="absolute top-[46%] right-5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-green shadow-[0_0_8px_rgba(114,250,147,0.7)]" />
                  Intestino
                </span>
                <span className="absolute top-[46%] left-5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cream/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-cream/60" />
                  Pavimento
                </span>
              </div>
              <figcaption className="px-4 py-3.5 sm:px-5 sm:py-4 text-center text-cream/55 text-sm leading-snug text-balance border-t border-cream/10">
                L’intestino si muove nella casa fatta di diaframma, pancia e bacino.
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
              <p className="text-cream/75 text-[15px] sm:text-lg leading-relaxed mb-6 lg:mb-7">
                L’intestino si muove da solo, ma obbedisce a quello che gli sta intorno. Il{' '}
                <strong className="text-cream font-semibold">diaframma</strong> lo massaggia
                dall’alto a ogni respiro: respiro corto, massaggio debole. Il{' '}
                <strong className="text-cream font-semibold">pavimento pelvico</strong> apre la porta
                in basso al momento giusto: bacino teso, porta che si apre male.
              </p>

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
                    Non sempre serve “un altro lassativo”.
                    <span className="text-green"> A volte serve cambiare il contesto meccanico.</span>
                  </p>
                </blockquote>
              </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cream/15 to-transparent mb-12 lg:mb-16" aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-10 lg:mb-14"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-cream mb-4">
              Ecco perché è fondamentale intervenire
              <span className="text-green"> sulla componente meccanica.</span>
            </h3>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl">
              Valutazione iniziale, lavoro su diaframma e respiro, pancia e pavimento pelvico,
              consigli pratici per il bagno: un percorso chiaro per ridurre l’
              <strong className="font-bold text-cream">impatto</strong> della stitichezza sulla tua
              vita quotidiana.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {BENEFITS.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group"
              >
                <div className="relative p-[1px] rounded-[1.25rem] sm:rounded-[1.35rem] bg-[linear-gradient(145deg,rgba(244,244,244,0.14)_0%,rgba(244,244,244,0.04)_45%,rgba(114,250,147,0.18)_100%)] shadow-[0_16px_48px_-28px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:shadow-[0_24px_56px_-24px_rgba(114,250,147,0.22)] group-hover:bg-[linear-gradient(145deg,rgba(114,250,147,0.35)_0%,rgba(244,244,244,0.08)_50%,rgba(114,250,147,0.22)_100%)]">
                  <div className="overflow-hidden rounded-[calc(1.25rem-1px)] sm:rounded-[calc(1.35rem-1px)] bg-blue-dark/80 backdrop-blur-md">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] ${item.imageClassName || 'object-center'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/80 via-blue-dark/10 to-blue-dark/20 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-br from-green/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                      <span className="absolute top-3 left-3 grid place-items-center min-w-[2.35rem] h-9 px-2.5 rounded-full border border-cream/20 bg-blue-dark text-xs font-black tabular-nums text-green shadow-[0_0_18px_rgba(114,250,147,0.15)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="px-4 py-4 sm:px-5 sm:py-6 border-t border-cream/10">
                      <h4 className="text-cream font-bold text-base sm:text-[1.05rem] leading-snug mb-2.5 transition-colors duration-300 group-hover:text-green">
                        {item.title}
                      </h4>
                      <p className="text-cream/55 text-sm sm:text-[15px] leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-xl min-w-0 mt-10 lg:mt-14 space-y-2.5 sm:space-y-3.5 text-left"
          >
            {AFTER_IMAGES_BENEFITS.map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
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
          </motion.ul>
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
              Oltre 850 recensioni tra i nostri due studi.
              <br />
              <span className="text-green">Recensioni reali.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Prima di iniziare meriti certezze: centinaia di pazienti hanno già percorso la stessa
              strada e condiviso la loro esperienza, così puoi affidarti con più tranquillità.
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
            Se queste storie ti somigliano, il prossimo passo può restituirti più{' '}
            <strong className="font-bold text-cream">serenità al risveglio</strong>, più{' '}
            <strong className="font-bold text-cream">ritmo</strong> e meno dipendenza dai lassativi.
            Inizia con un consulto telefonico o la prima visita.
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
            className="mb-14 lg:mb-20 text-left lg:text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-green/40 bg-green px-5 py-2.5 sm:py-3 text-blue-dark text-xs sm:text-sm font-black uppercase tracking-[0.22em] shadow-[0_0_24px_rgba(114,250,147,0.25)] mb-4 sm:mb-5">
              Come funziona
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4">
              Cosa succede quando
              <span className="text-green"> prenoti</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl lg:mx-auto">
              Niente percorsi nebulosi: sai esattamente cosa facciamo, in che ordine e con quale
              razionale clinico.
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
              le nostre sedi.
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4">
              Due studi a
              <span className="text-green"> Torino</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-2xl">
              Scegli la sede piu comoda tra San Donato e Crocetta: accesso rapido con metro, mezzi
              e auto.
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
              Entrambe le sedi sono raggiungibili in metro: San Donato (Bernini o Principi d’Acaja),
              Crocetta (fermata Crocetta).
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
              Hai domande?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4">
              Le domande che ci fate più spesso
              <span className="text-green"> prima della prenotazione.</span>
            </h2>
            <p className="text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl">
              Risposte dirette, senza promesse facili e senza scorciatoie comunicative.
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
            Se anche una sola di queste risposte ti rappresenta, non restare fermo in una gestione
            solo “al bisogno”.{' '}
            <span className="text-cream font-semibold">
              Prenota un consulto o la prima visita
            </span>{' '}
            e iniziamo a lavorare sul motore dell’intestino — oltre a fibre, acqua e lassativi.
          </motion.p>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <CtaPair />
          </div>
        </div>
      </section>

      <BookingPopup
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        pageContext="stitichezza"
        ctaType={bookingCtaType}
      />
    </div>
  )
}

export default Stitichezza
