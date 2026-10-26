import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import {
  Phone,
  ArrowRight,
  Check,
  Plus,
  Car,
  Monitor,
  Youtube,
  Armchair,
  Hand,
  Dumbbell,
  Stethoscope,
  Shield,
  MapPin,
  Clock,
  Mail,
  Play,
  FileText,
  Users,
  TrainFront,
  ScanLine,
  UserRound,
} from 'lucide-react'
import BookingPopup from '../components/BookingPopup'
import PageShell from '../components/site/PageShell'
import { Kicker, MaskLines, Reveal, Snap } from '../components/home-sections/HomeKit'
import { EASE } from '../components/home-sections/homeMotion'
import PlumbFigure from '../components/postura/PlumbFigure'
import '../styles/pages/postura.css'

// Concetto: "Il filo a piombo". La postura si legge di profilo, contro una linea
// verticale: la pagina è un foglio di analisi posturale (righelli, griglia,
// scansione) e il momento firmato è la figura che, scorrendo il metodo
// Valuta → Correggi → Consolida, si riallinea al filo. L'offerta è uno scontrino.

const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

const PHONE_DISPLAY = '+39 351 819 8457'
const PHONE_HREF = 'tel:+393518198457'
const EMAIL = 'studio@studiomobilitas.it'
const HOURS = 'Lun–Ven 8:00–21:00 · Sab 9:00–18:00'

// TODO: data di scadenza definitiva (Black Friday)
const OFFER_DEADLINE_ISO = '2026-11-27T23:59:59+01:00'
const OFFER_DEADLINE_LABEL = '27 novembre 2026'

// TODO: numero reale, aggiornato a mano
const SPOTS_LEFT = 12

const STACK_ITEMS = [
  {
    k: '01',
    title: '1 valutazione posturale',
    body: 'Individua la tua causa — non un elenco generico di sintomi — e definisce su cosa ha senso lavorare.',
    value: 'TODO valore',
  },
  {
    k: '02',
    title: '3 trattamenti osteopatici',
    body: 'Tre sedute in studio per sbloccare la struttura e dare al corpo uno spazio diverso in cui organizzarsi.',
    value: 'TODO valore',
  },
  {
    k: '03',
    title: '12 mesi di app',
    body: 'Esercizi personalizzati per le 16 ore in cui non sei in studio: consolidare, non tamponare.',
    value: 'TODO valore',
  },
]

const FAILED_SOLUTIONS = [
  {
    icon: Youtube,
    title: 'Stretching su YouTube',
    does: 'Allunga quello che in quel momento è contratto.',
    why: 'Non legge la tua causa. Ripeti un protocollo uguale per tutti, e il corpo torna com’era appena ti risiedi.',
  },
  {
    icon: Armchair,
    title: 'Il cuscino cervicale',
    does: 'Cambia il comfort di qualche ora di sonno.',
    why: 'Aiuta la notte, non le 16 ore da svegli in cui la testa torna avanti.',
  },
  {
    icon: Monitor,
    title: 'Monitor alzato',
    does: 'Migliora l’angolo dello schermo.',
    why: 'Lo strumento è più comodo. La strategia del corpo — testa avanti, spalle chiuse — resta la stessa.',
  },
  {
    icon: Users,
    title: '«Da oggi sto dritto»',
    does: 'Chiede al cervello di ricordarsi la postura.',
    why: 'La volontà dura minuti. Poi torna il gesto automatico, perché è quello che il corpo ha imparato a usare.',
  },
  {
    icon: Hand,
    title: 'I massaggi',
    does: 'Allentano il nodo, e si sta meglio per un po’.',
    why: 'Il sollievo è reale, ma è di superficie: il motivo per cui il nodo si riforma non viene toccato.',
  },
  {
    icon: Dumbbell,
    title: 'Palestra generica',
    does: 'Ti fa muovere e può darti forza.',
    why: 'Se rinforzi lo schema sbagliato, lo rendi più stabile. Non è colpa dell’allenamento: manca la direzione.',
  },
  {
    icon: Stethoscope,
    title: 'Terapie a spot sul sintomo',
    does: 'Trattano il pezzo che oggi fa più rumore.',
    why: 'Testa, trapezi, schiena: sembrano problemi diversi. Sono pezzi dello stesso adattamento.',
  },
]

const METHOD_STEPS = [
  {
    k: '01',
    t: 'Valuta',
    title: 'La valutazione posturale individua la tua causa',
    body: 'Non partiamo dal sintomo più rumoroso. Guardiamo come il corpo si è organizzato — e perché. Da lì si decide se e come ha senso proseguire.',
  },
  {
    k: '02',
    t: 'Correggi',
    title: 'I 3 trattamenti osteopatici sbloccano la struttura',
    body: 'In studio lavoriamo su ciò che si è irrigidito e compresso. L’obiettivo non è «sistemarti in un’ora»: è dare al corpo un’alternativa possibile.',
  },
  {
    k: '03',
    t: 'Consolida',
    title: 'L’app lavora nelle 16 ore quotidiane',
    body: 'Esercizi personalizzati, non una playlist uguale per tutti. Perché il cambiamento tiene se entra nelle ore in cui vivi — non solo in quelle sul lettino.',
  },
]

const CAUSE_SYMPTOMS = [
  'Testa avanti',
  'Nodo ai trapezi',
  'Mal di testa',
  'Schiena a C',
  'Stesso lato',
  'Aria stanca',
]

function TodoMark({ children, onDark = false }) {
  return (
    <span className={`mx-post-todo ${onDark ? 'is-dark' : 'is-light'}`}>
      TODO{children ? ` · ${children}` : ''}
    </span>
  )
}

const FAQ_ITEMS = [
  {
    id: 'fisio-chiro',
    name: 'Che differenza c’è con la fisioterapia o il chiropratico?',
    question: (
      <>
        Che differenza c’è con la <em>fisioterapia</em> o il chiropratico?
      </>
    ),
    answer: (
      <>
        Sono percorsi diversi, non in competizione. La fisioterapia è spesso centrata su recupero
        funzionale e riabilitazione; l’approccio chiropratico su aggiustamenti articolari. Qui il
        lavoro parte da una valutazione posturale della tua causa, tre trattamenti osteopatici in
        studio e un consolidamento nelle 16 ore quotidiane tramite l’app. Se hai già un percorso in
        corso, lo consideriamo: non chiediamo di abbandonarlo.
      </>
    ),
  },
  {
    id: 'gia-osteo',
    name: 'Ho già fatto osteopatia. Perché questo è diverso?',
    question: (
      <>
        Ho già fatto <em>osteopatia</em>. Perché questo è diverso?
      </>
    ),
    answer: (
      <>
        Una seduta «al bisogno» quando il nodo torna è un aiuto di superficie, e può essere utile.
        Il Percorso Posturale è un pezzo in studio più un pezzo nella vita di tutti i giorni. Senza
        il consolidamento, il corpo tende a riorganizzarsi come prima — perché è quello che fa per
        16 ore.
      </>
    ),
  },
  {
    id: 'tempi',
    name: 'In quanto tempo si possono vedere dei risultati?',
    question: <>In quanto tempo si possono vedere dei risultati?</>,
    answer: (
      <>
        Dipende da quanto il corpo si è adattato e da come lavori tra una seduta e l’altra. Molte
        persone notano un cambiamento già nelle prime settimane — meno compressione, un profilo
        diverso, un affaticamento che cala. Non promettiamo tempi fissi: il percorso è fatto per
        migliorare e lavorare sulla causa, non per «risolvere tutto» in una data.
      </>
    ),
  },
  {
    id: 'app',
    name: 'Come funziona l’app?',
    question: <>Come funziona l’app?</>,
    answer: (
      <>
        Dopo la valutazione ricevi esercizi personalizzati sul tuo quadro — non una scheda
        generica. Li fai nelle giornate vere: alla scrivania, a casa, nei ritagli. L’abbonamento
        incluso copre 12 mesi. L’app non sostituisce lo studio: è il pezzo che tiene il lavoro
        acceso quando non sei sul lettino.
      </>
    ),
  },
  {
    id: 'sedute',
    name: 'Quanto durano le sedute? Con che frequenza?',
    question: <>Quanto durano le sedute? Con che frequenza?</>,
    answer: (
      <>
        La valutazione e i trattamenti durano circa un’ora. La cadenza la definiamo dopo la
        valutazione, in base a quello che emerge — non un calendario uguale per tutti. In genere
        le tre sedute si distribuiscono in alcune settimane, per lasciare al corpo il tempo di
        riorganizzarsi.
      </>
    ),
  },
  {
    id: 'sedi-orari',
    name: 'Dove siete e in che orari?',
    question: <>Dove siete e in che orari?</>,
    answer: (
      <>
        Due sedi nel centro di Torino: Via Peyron 54 (San Donato) e Via Lamarmora 35 (Crocetta).
        Entrambe raggiungibili in metro. Siamo aperti dal lunedì al venerdì dalle 8:00 alle 21:00 e
        il sabato dalle 9:00 alle 18:00.
      </>
    ),
  },
  {
    id: 'pagamento',
    name: 'Come si paga?',
    question: <>Come si paga?</>,
    answer: (
      <>
        In studio, con i metodi che usiamo di routine (carta, contanti, dove previsto anche
        convenzioni). I dettagli te li conferma la segreteria quando blocchi il posto — così non
        restano zone d’ombra sul da farsi.
      </>
    ),
  },
  {
    id: 'validita',
    name: 'Fino a quando vale l’offerta?',
    question: <>Fino a quando vale l’offerta?</>,
    answer: (
      <>
        L’offerta Black Friday vale fino al {OFFER_DEADLINE_LABEL}{' '}
        <TodoMark>data</TodoMark>, o fino a esaurimento posti. I posti sono limitati e il numero lo
        aggiorniamo a mano: {SPOTS_LEFT} rimasti <TodoMark>posti</TodoMark>.
      </>
    ),
  },
  {
    id: 'dolore',
    name: 'È doloroso?',
    question: <>È doloroso?</>,
    answer: (
      <>
        Il lavoro è manuale e adattato a te. Puoi sentire pressione, un po’ di fastidio, o la
        sensazione che «qualcosa si muove». Non è una prova di resistenza: se qualcosa non va, si
        regola. Dopo una seduta è normale sentirsi diversi — a volte più leggeri, a volte un po’
        stanchi.
      </>
    ),
  },
  {
    id: 'regalo',
    name: 'Si può regalare?',
    question: <>Si può regalare?</>,
    answer: (
      <>
        Sì. Puoi bloccare il posto a nome di chi lo riceverà e far partire il percorso quando fa
        più comodo. La valutazione resta il primo passo: se da lì non emerge un quadro su cui vale
        la pena lavorare, si ragiona insieme — senza spingere oltre.
      </>
    ),
  },
]

const MAPS = [
  {
    label: 'San Donato — Via Peyron 54',
    title: 'Mobilitas — San Donato, Via Peyron 54',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.274078923546!2d7.65514377704107!3d45.08023495897442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe2e29f381fdc93%3A0x97eee174cab07ada!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Osteopata%20Torino!5e0!3m2!1sit!2sit!4v1760785981478!5m2!1sit!2sit',
  },
  {
    label: 'Crocetta — Via Lamarmora 35',
    title: 'Mobilitas — Crocetta, Via Lamarmora 35',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2818.3024747731265!2d7.666042812749457!3d45.0593748602363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d57f00fa44f%3A0x510e3404feb8af98!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Crocetta!5e0!3m2!1sit!2sit!4v1784309089765!5m2!1sit!2sit',
  },
]

const TEAM_PHOTOS = [
  { src: '/lavori/osteo_leader.png', alt: 'Osteopata Mobilitas' },
  { src: '/lavori/osteo_senior.png', alt: 'Team osteopatico Mobilitas' },
  { src: '/storia/trattamento.png', alt: 'Trattamento in studio a Torino' },
  { src: '/home/home3.png', alt: 'Studio Mobilitas Torino' },
]

function getVariantCopy(variant) {
  const isUomo = variant === 'uomo'
  return {
    isUomo,
    path: isUomo ? '/offerta-postura-uomo' : '/offerta-postura-donna',
    videoCode: isUomo ? 'POSTURA_VSL_UOMO' : 'POSTURA_VSL_DONNA',
    heroImage: isUomo ? '/maldischiena/maldischiena1.JPG' : '/cervicalgia/cerv11.JPG',
    headlineLead: 'La tua postura parla prima di te.',
    headlineAccent: isUomo
      ? 'E sta dicendo la cosa sbagliata.'
      : 'E può darti anni che non hai.',
    heroChips: isUomo
      ? ['Testa avanti', 'Nodo ai trapezi', 'Stesso lato']
      : ['Testa avanti', 'Collo compresso', 'Aria stanca'],
    seoTitle: isUomo
      ? 'Percorso Posturale Uomo Torino | Offerta Black Friday 500€ | Mobilitas'
      : 'Percorso Posturale Donna Torino | Offerta Black Friday 500€ | Mobilitas',
    seoDescription: isUomo
      ? 'Percorso Posturale a Torino per uomo: valutazione, 3 trattamenti osteopatici e app con esercizi personalizzati. Offerta Black Friday da 1.000€ a 500€. Due sedi, San Donato e Crocetta.'
      : 'Percorso Posturale a Torino per donna: valutazione, 3 trattamenti osteopatici e app con esercizi personalizzati. Offerta Black Friday da 1.000€ a 500€. Due sedi, San Donato e Crocetta.',
    signals: isUomo
      ? [
          {
            title: 'Testa avanti di profilo',
            body: 'In foto, di lato, il mento è già oltre la linea delle spalle. Non è «una brutta giornata»: è lo schema che il collo ha imparato.',
          },
          {
            title: 'Fatica a girarti in retromarcia',
            body: 'Il collo non gira come una volta. Controlli gli specchi, ruoti il busto, e resta quella sensazione di blocco che non c’entra col parcheggio.',
          },
          {
            title: 'Nodo tra collo e trapezi',
            body: 'Lo senti la sera, o già a metà pomeriggio. Lo stropicci con la mano, e domani è di nuovo lì.',
          },
          {
            title: 'Mal di testa dalla nuca, nel pomeriggio',
            body: 'Non è sempre «stress». Spesso parte da dietro, dopo ore di schermo, e ti accompagna fino a sera.',
          },
          {
            title: 'La cintura che gira sempre dallo stesso lato',
            body: 'La fibbia finisce storto, sempre uguale. Il bacino sta compensando — e il resto del corpo lo segue.',
          },
          {
            title: 'Mal di schiena sempre dallo stesso lato',
            body: 'Non è un giorno sì e uno no, a caso. È sempre lì, nello stesso posto. Un pezzo dello stesso adattamento.',
          },
        ]
      : [
          {
            title: 'Testa avanti di profilo',
            body: 'In una foto di lato si vede prima del resto: il viso è già avanti rispetto alle spalle. Lo noti tu, a volte lo notano gli altri.',
          },
          {
            title: 'Doppio mento posturale — anche da magra',
            body: 'Non è «un chilo in più». È la testa che è scivolata avanti, e il collo che non ha più lo spazio per apparire lungo.',
          },
          {
            title: 'Collo corto, compresso',
            body: 'Come se le spalle fossero salite e il collo avesse perso centimetri. In alcune maglie si vede di più; in alcune foto, ancora di più.',
          },
          {
            title: 'Nodo ai trapezi',
            body: 'Quella fascia che non molla, tra collo e spalle. La sera la senti, la mattina a volte anche. Non è un vizio: è un carico.',
          },
          {
            title: 'Schiena a «C»',
            body: 'Di profilo la linea non è più una curva morbida: è una C che si è chiusa. Spesso arriva insieme alla testa avanti.',
          },
          {
            title: 'Aria stanca in foto',
            body: 'Non è il trucco e non è l’età. È un viso che sembra più spento perché il corpo sta lavorando in compressione.',
          },
        ],
    proofs: isUomo
      ? {
          intro:
            'Non cerchiamo «miracoli in due foto». Cerchiamo segnali visibili e misurabili: il profilo, il giro del collo, quello che il corpo fa nella giornata vera.',
          beforeAfter: [
            {
              label: 'Prima / dopo di profilo',
              hint: 'TODO: foto uomo di profilo — avanzamento del capo, linea del collo.',
            },
            {
              label: 'Prima / dopo — spalle e schiena',
              hint: 'TODO: foto uomo — chiusura delle spalle e schema a C.',
            },
          ],
          videos: [
            {
              title: 'Retromarcia, nuca, stesso lato',
              hint: 'TODO: video-testimonianza uomo (30–60s).',
            },
            {
              title: 'Cosa cambia nelle 16 ore',
              hint: 'TODO: video-testimonianza uomo (30–60s).',
            },
          ],
          report:
            'Il report della valutazione è la prova tecnica: misurazioni, foto di profilo, priorità. Non un’opinione sul «stare dritti» — un quadro su cui si può lavorare.',
        }
      : {
          intro:
            'Quello che cerchiamo è concreto: un profilo diverso, un collo che rioccupa il suo spazio, una foto in cui non sembri stanca prima del tempo.',
          beforeAfter: [
            {
              label: 'Prima / dopo di profilo',
              hint: 'TODO: foto donna di profilo — capo, collo, linea della schiena.',
            },
            {
              label: 'Prima / dopo — viso e collo',
              hint: 'TODO: foto donna — compressione del collo e aria del viso.',
            },
          ],
          videos: [
            {
              title: 'Le foto, il collo, il nodo',
              hint: 'TODO: video-testimonianza donna (30–60s).',
            },
            {
              title: 'Cosa cambia quando la causa si muove',
              hint: 'TODO: video-testimonianza donna (30–60s).',
            },
          ],
          report:
            'Il report della valutazione è la prova tecnica: avanzamento del capo, curve, priorità. Un documento che spiega perché i segnali sparsi stanno insieme.',
        },
  }
}

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

function useHeroVideo(codice) {
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ensureCloudflarePreconnect()
    let cancelled = false
    setLoading(true)
    fetch(`${API_BASE}/api/sito/video/codice/${codice}`, { priority: 'high' })
      .then((res) => {
        if (res.status === 404) return null
        return res.ok ? res.json() : null
      })
      .then((json) => {
        if (cancelled) return
        setVideo(json?.data?.cloudflareUid ? json.data : null)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setVideo(null)
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [codice])

  return { video, loading }
}

function useCountdown(deadlineIso) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return useMemo(() => {
    const end = new Date(deadlineIso).getTime()
    const diff = Math.max(0, end - now)
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      expired: diff <= 0,
    }
  }, [deadlineIso, now])
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

// Foto ottimizzate (cartelle web/ accanto agli originali)
const WEB_PHOTOS = {
  '/maldischiena/maldischiena1.JPG': ['/maldischiena/web/maldischiena1-900.jpg', '/maldischiena/web/maldischiena1-1600.jpg'],
  '/cervicalgia/cerv11.JPG': ['/cervicalgia/web/cerv11-900.jpg', '/cervicalgia/web/cerv11-1600.jpg'],
  '/lavori/osteo_leader.png': ['/lavori/web/osteo_leader-700.jpg', '/lavori/web/osteo_leader-1200.jpg'],
  '/lavori/osteo_senior.png': ['/lavori/web/osteo_senior-700.jpg', '/lavori/web/osteo_senior-1200.jpg'],
  '/storia/trattamento.png': ['/storia/web/trattamento-900.jpg', '/storia/web/trattamento-1600.jpg'],
  '/home/home3.png': ['/home/web/home3-900.jpg', '/home/web/home3-1600.jpg'],
}
const webSmall = (src) => WEB_PHOTOS[src]?.[0] ?? src
const webLarge = (src) => WEB_PHOTOS[src]?.[1] ?? src

const STEP_NAMES = ['Valuta', 'Correggi', 'Consolida']

// Coppia di CTA: blocca il posto (offerta) o chiedi una chiamata (dubbi)
const PostCtas = ({ onOffer, onInfo, className = '', compact = false }) => (
  <div className={`mx-ctas mx-post-ctas ${compact ? 'is-compact' : ''} ${className}`}>
    <button type="button" className="mx-btn mx-btn--primary mx-post-btn" onClick={onOffer}>
      <span className="mx-post-btn__label">
        <span className="mx-post-btn__short">Blocca a 500€</span>
        <span className="mx-post-btn__long">Blocca il tuo posto a 500€</span>
      </span>
      <span className="mx-btn__icon">
        <ArrowRight size={20} strokeWidth={2.4} />
      </span>
    </button>
    <button type="button" className="mx-btn mx-btn--ghost mx-post-btn" onClick={onInfo}>
      <span className="mx-post-btn__label">Hai dubbi? Chiamaci</span>
      <span className="mx-btn__icon">
        <Phone size={18} strokeWidth={2.2} />
      </span>
    </button>
  </div>
)

const Countdown = ({ cells, className = '' }) => (
  <div className={`mx-post-count ${className}`} role="timer">
    {cells.map((c, i) => (
      <React.Fragment key={c.l}>
        {i > 0 && (
          <span className="mx-post-count__sep" aria-hidden="true">
            :
          </span>
        )}
        <span className="mx-post-count__cell">
          <b>{c.v}</b>
          <small>{c.l}</small>
        </span>
      </React.Fragment>
    ))}
  </div>
)

// Sintomi sparsi che, entrando in vista, si raccolgono verso una causa sola
const ConvergingChips = ({ items }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const scatter = [
    { x: -60, y: -46, r: -12 },
    { x: 54, y: -38, r: 10 },
    { x: -38, y: 30, r: 8 },
    { x: 70, y: 22, r: -9 },
    { x: -74, y: 10, r: 14 },
    { x: 40, y: 48, r: -6 },
  ]
  return (
    <div className="mx-post-chips" ref={ref}>
      {items.map((s, i) => {
        const o = scatter[i % scatter.length]
        return (
          <motion.span
            key={s}
            className="mx-post-chip"
            initial={{ x: o.x, y: o.y, rotate: o.r, opacity: 0.35 }}
            animate={inView ? { x: 0, y: 0, rotate: 0, opacity: 1 } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 + i * 0.07 }}
          >
            {s}
          </motion.span>
        )
      })}
    </div>
  )
}

// Momento firmato: il metodo, con la figura che si riallinea al filo
const PlumbScene = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 })
  const [active, setActive] = useState(0)

  useMotionValueEvent(progress, 'change', (v) => {
    const next = v < 0.33 ? 0 : v < 0.66 ? 1 : 2
    setActive((cur) => (cur === next ? cur : next))
  })

  return (
    <section className="mx-post-plumb" ref={ref}>
      <div className="mx-post-plumb__pin">
        <div className="mx-wrap mx-post-plumb__grid">
          <div className="mx-post-plumb__stage">
            <PlumbFigure progress={progress} />
            <ol className="mx-post-plumb__rail" aria-hidden="true">
              {STEP_NAMES.map((t, i) => (
                <li key={t} className={i <= active ? 'is-on' : ''}>
                  <i />
                </li>
              ))}
            </ol>
          </div>
          <ol className="mx-post-steps">
            {METHOD_STEPS.map((step, i) => (
              <li key={step.k} className={`mx-post-step ${i === active ? 'is-active' : ''} ${i < active ? 'is-past' : ''}`}>
                <span className="mx-post-step__k">{step.k}</span>
                <div className="mx-post-step__body">
                  <p className="mx-post-step__t">{step.t}</p>
                  <h3 className="mx-h mx-h--sm">{step.title}</h3>
                  <p className="mx-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function OffertaPostura({ variant = 'uomo' }) {
  const copy = getVariantCopy(variant)
  const { video: heroVideo, loading: heroVideoLoading } = useHeroVideo(copy.videoCode)
  const countdown = useCountdown(OFFER_DEADLINE_ISO)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('primaVisita')
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [heroVideoCover, setHeroVideoCover] = useState(true)
  const [showSticky, setShowSticky] = useState(false)
  const [recognized, setRecognized] = useState(() => new Set())
  const offerRef = useRef(null)

  const heroVideoSrc = heroVideo
    ? `https://iframe.videodelivery.net/${heroVideo.cloudflareUid}?autoplay=true&muted=true&loop=true&controls=false&preload=auto&letterboxColor=%23002552&poster=${encodeURIComponent(heroVideo.anteprimaUrl ?? '')}`
    : ''

  useEffect(() => {
    if (!heroVideo) return
    setHeroVideoCover(true)
    const timer = window.setTimeout(() => setHeroVideoCover(false), 500)
    return () => window.clearTimeout(timer)
  }, [heroVideo])

  useEffect(() => {
    const onScroll = () => {
      const el = offerRef.current
      if (!el) return
      setShowSticky(el.getBoundingClientRect().top < window.innerHeight * 0.55)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const prevTitle = document.title
    const origin = window.location.origin
    const pageUrl = `${origin}${copy.path}`
    const ogImage = `${origin}${copy.heroImage}`
    const title = copy.seoTitle
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

    ensureMetaByName('description', copy.seoDescription)
    ensureMetaByName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    ensureMetaByName(
      'keywords',
      [
        'percorso posturale torino',
        'osteopata postura torino',
        variant === 'uomo' ? 'postura uomo torino' : 'postura donna torino',
        'valutazione posturale torino',
        'trattamento osteopatico postura',
        'black friday osteopata torino',
        'studio osteopatico mobilitas',
      ].join(', ')
    )
    ensureMetaByName('author', 'Mobilitas – Studio Osteopatico Torino')
    ensureMetaByName('geo.region', 'IT-TO')
    ensureMetaByName('geo.placename', 'Torino, San Donato, Crocetta')
    ensureMetaByProperty('og:title', title)
    ensureMetaByProperty('og:description', copy.seoDescription)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:image', ogImage)
    ensureMetaByProperty('og:locale', 'it_IT')
    ensureCanonical(pageUrl)

    const dataPage = `offerta-postura-${variant}`
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Offer',
          name: 'Percorso Posturale — Black Friday',
          url: pageUrl,
          price: '500',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/LimitedAvailability',
          priceValidUntil: OFFER_DEADLINE_ISO.slice(0, 10),
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map((item) => ({
            '@type': 'Question',
            name: item.name,
            acceptedAnswer: { '@type': 'Answer', text: item.name },
          })),
        },
      ],
    }
    let scriptLd = document.querySelector(`script[type="application/ld+json"][data-page="${dataPage}"]`)
    if (!scriptLd) {
      scriptLd = document.createElement('script')
      scriptLd.setAttribute('type', 'application/ld+json')
      scriptLd.setAttribute('data-page', dataPage)
      document.head.appendChild(scriptLd)
    }
    scriptLd.textContent = JSON.stringify(jsonLd)

    return () => {
      document.title = prevTitle
      const toRemove = document.querySelector(`script[type="application/ld+json"][data-page="${dataPage}"]`)
      if (toRemove) toRemove.remove()
    }
  }, [copy.heroImage, copy.path, copy.seoDescription, copy.seoTitle, variant])

  const openOfferta = () => {
    setBookingCtaType('primaVisita')
    setShowBooking(true)
  }
  const openInfo = () => {
    setBookingCtaType('consulto')
    setShowBooking(true)
  }

  const toggleSignal = (title) => {
    setRecognized((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }

  const countdownCells = [
    { v: pad2(countdown.days), l: 'giorni' },
    { v: pad2(countdown.hours), l: 'ore' },
    { v: pad2(countdown.minutes), l: 'min' },
    { v: pad2(countdown.seconds), l: 'sec' },
  ]

  const heroPhoto = useMemo(() => copy.heroImage, [copy.heroImage])
  const ctas = <PostCtas onOffer={openOfferta} onInfo={openInfo} />

  return (
    <PageShell className={`mx-post ${showSticky ? 'has-sticky' : ''}`}>
      {/* ——— 1. Apertura ——— */}
      <header className="mx-post-hero">
        <div className="mx-post-grid-bg" aria-hidden="true" />
        <div className="mx-wrap mx-post-hero__grid">
          <motion.div
            className="mx-post-hero__badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="mx-post-hero__ping" aria-hidden="true" />
            Percorso Posturale · Black Friday
          </motion.div>

          <h1 className="mx-h mx-post-hero__title">
            <MaskLines
              immediate
              delay={0.1}
              lines={[
                { text: copy.headlineLead },
                { text: copy.headlineAccent, className: 'mx-gradient' },
              ]}
            />
          </h1>

          <motion.div
            className="mx-post-hero__media"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
          >
            <div className="mx-post-frame">
              {heroVideo ? (
                <>
                  {heroVideo.anteprimaUrl ? (
                    <img src={heroVideo.anteprimaUrl} alt="" className="mx-post-frame__fill" decoding="async" />
                  ) : null}
                  <iframe
                    src={heroVideoSrc}
                    title="Percorso Posturale — Mobilitas Torino"
                    className="mx-post-frame__fill mx-post-frame__video"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen
                  />
                  <div className={`mx-post-frame__cover ${heroVideoCover ? 'is-on' : ''}`} aria-hidden />
                </>
              ) : (
                <>
                  <img
                    src={webLarge(heroPhoto)}
                    srcSet={`${webSmall(heroPhoto)} 900w, ${webLarge(heroPhoto)} 1600w`}
                    sizes="(min-width: 1024px) 640px, 92vw"
                    alt=""
                    className="mx-post-frame__fill mx-post-frame__photo"
                    decoding="async"
                  />
                  <div className="mx-post-frame__shade" aria-hidden="true" />
                  <p className="mx-post-frame__placeholder">
                    <span className="mx-post-frame__play" aria-hidden="true">
                      <Play size={14} strokeWidth={2.4} />
                    </span>
                    <span>Video o immagine di profilo</span>
                    <TodoMark onDark>asset hero</TodoMark>
                  </p>
                </>
              )}
              {heroVideoLoading && !heroVideo ? <div className="mx-post-frame__loading" aria-hidden /> : null}

              {/* Filo a piombo sopra l'immagine */}
              <span className="mx-post-frame__plumb" aria-hidden="true">
                <i />
                <b />
              </span>
              <span className="mx-post-frame__ruler" aria-hidden="true" />

              <ul className="mx-post-frame__chips">
                {copy.heroChips.map((label, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.9 + i * 0.12 }}
                  >
                    <span aria-hidden="true" />
                    {label}
                  </motion.li>
                ))}
              </ul>
              <div className="mx-post-frame__method">Valuta → Correggi → Consolida</div>
            </div>
          </motion.div>

          <motion.div
            className="mx-post-hero__ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          >
            <PostCtas onOffer={openOfferta} onInfo={openInfo} compact />
            <Countdown cells={countdownCells} className="mx-post-hero__count" />
          </motion.div>

          <motion.div
            className="mx-post-hero__copy"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            <p className="mx-lead mx-post-hero__sub">
              Il percorso che lavora sulla causa — non sul sintomo — in studio e nelle 16 ore in cui
              vivi.
            </p>
            <div className="mx-post-hero__steps">
              {['Valuta', 'Correggi', 'Consolida'].map((step, i) => (
                <React.Fragment key={step}>
                  {i > 0 ? <span className="mx-post-hero__dash" aria-hidden="true" /> : null}
                  <span className="mx-post-pill">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {step}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Nastri */}
      <div className="mx-ribbons mx-post-ribbons" aria-hidden="false">
        <div className="mx-ribbon mx-ribbon--line">
          {[0, 1].map((k) => (
            <div key={k} className="mx-marquee mx-marquee--rev" style={{ '--mx-speed': '46s' }} aria-hidden={k === 1}>
              {CAUSE_SYMPTOMS.map((item) => (
                <span key={item} className="mx-ribbon__item">
                  {item}
                  <span className="mx-ribbon__dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="mx-ribbon mx-ribbon--green">
          {[0, 1].map((k) => (
            <div key={k} className="mx-marquee" style={{ '--mx-speed': '40s' }} aria-hidden={k === 1}>
              {['2 sedi a Torino', '20+ professionisti', 'San Donato', 'Crocetta', 'Valuta', 'Correggi', 'Consolida'].map((item) => (
                <span key={item} className="mx-ribbon__item">
                  {item}
                  <span className="mx-ribbon__dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ——— 2. I segnali ——— */}
      <section className="mx-section mx-post-signals">
        <div className="mx-wrap">
          <div className="mx-post-head">
            <Kicker>I segnali</Kicker>
            <h2 className="mx-h mx-h--lg">
              Ti riconosci in almeno uno
              <br />
              <span className="mx-accent">di questi?</span>
            </h2>
            <Reveal>
              <p className="mx-lead mx-post-head__lead">
                Non serve averli tutti. Anche uno solo può essere il modo in cui il corpo sta dicendo che si è adattato.
              </p>
            </Reveal>
          </div>

          <ol className="mx-post-signal-list">
            {copy.signals.map((item, i) => {
              const on = recognized.has(item.title)
              return (
                <Reveal as="li" key={item.title} delay={(i % 3) * 0.06} y={24}>
                  <button
                    type="button"
                    className={`mx-post-signal ${on ? 'is-on' : ''}`}
                    aria-pressed={on}
                    onClick={() => toggleSignal(item.title)}
                  >
                    <span className="mx-post-signal__n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="mx-post-signal__txt">
                      <span className="mx-post-signal__t">{item.title}</span>
                      <span className="mx-post-signal__d">{item.body}</span>
                    </span>
                    <span className="mx-post-signal__box" aria-hidden="true">
                      <Check size={16} strokeWidth={3.2} />
                    </span>
                  </button>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ——— 3. La causa ——— */}
      <section className="mx-section mx-post-cause">
        <div className="mx-wrap mx-post-cause__grid">
          <div>
            <Kicker>La causa</Kicker>
            <h2 className="mx-h mx-h--lg">
              Non sono problemi diversi.
              <br />
              <span className="mx-gradient">È una causa sola.</span>
            </h2>
            <Reveal>
              <p className="mx-lead mx-post-cause__text">
                Il corpo non si rompe a pezzi. Si adatta alle 16 ore da seduti, allo schermo, al modo
                in cui stai fermo senza accorgertene. Testa avanti, nodo, mal di testa, schiena:
                sembrano storie separate. Sono tessere dello stesso puzzle.
              </p>
            </Reveal>
            <Reveal>
              <p className="mx-post-quote">
                Il sintomo è il pezzo che fa rumore. La causa è lo schema che lo tiene acceso.
              </p>
            </Reveal>
          </div>
          <Reveal className="mx-post-cause__card" delay={0.08}>
            <p className="mx-post-cause__label">Tanti sintomi → una causa</p>
            <ConvergingChips items={CAUSE_SYMPTOMS} />
            <span className="mx-post-cause__funnel" aria-hidden="true" />
            <div className="mx-post-cause__one">
              <p className="mx-post-cause__one-t">Un adattamento alle 16 ore</p>
              <p className="mx-post-cause__one-d">
                Seduti, schermo, stesso gesto ripetuto. Il corpo trova una strategia — e la tiene.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— 4. Aiuti di superficie ——— */}
      <section className="mx-section mx-section--deep mx-post-failed">
        <div className="mx-wrap">
          <div className="mx-post-head">
            <Kicker>Aiuti di superficie</Kicker>
            <h2 className="mx-h mx-h--lg">
              Perché quello che hai già provato
              <br />
              <span className="mx-accent">non ha funzionato.</span>
            </h2>
            <Reveal>
              <p className="mx-lead mx-post-head__lead">
                Non perché «non ti sei impegnato abbastanza». Perché erano aiuti di superficie: utili per un pezzo, silenziosi sulla causa.
              </p>
            </Reveal>
          </div>

          <Snap as="ul" className="mx-post-fails">
            {FAILED_SOLUTIONS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.title} className="mx-post-fail">
                  <span className="mx-post-fail__icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className="mx-h mx-h--sm">{item.title}</h3>
                  <p className="mx-post-fail__does">{item.does}</p>
                  <span className="mx-post-fail__cut" aria-hidden="true" />
                  <p className="mx-post-fail__why">{item.why}</p>
                </li>
              )
            })}
          </Snap>
        </div>
      </section>

      {/* ——— 5. Il metodo ——— */}
      <section className="mx-section mx-post-method-intro">
        <div className="mx-wrap mx-post-head is-center">
          <Kicker>Il metodo</Kicker>
          <h2 className="mx-h mx-h--lg">
            Metodo Mobilitas:{' '}
            <span className="mx-gradient">Valuta → Correggi → Consolida.</span>
          </h2>
          <Reveal>
            <p className="mx-lead mx-post-head__lead">
              Tre passi, in quest’ordine. Perché sbloccare senza capire, o capire senza consolidare,
              è di nuovo un aiuto di superficie.
            </p>
          </Reveal>
          <span className="mx-post-scrollcue" aria-hidden="true">
            <ScanLine size={18} />
          </span>
        </div>
      </section>
      <PlumbScene />
      <section className="mx-section mx-post-method-out">
        <div className="mx-wrap mx-post-head is-center">
          <Reveal>
            <p className="mx-post-quote is-center">Funziona perché combina lo studio e la vita quotidiana.</p>
          </Reveal>
          {ctas}
        </div>
      </section>

      {/* ——— 6. Cosa include: lo scontrino ——— */}
      <section className="mx-section mx-section--deep mx-post-stack">
        <div className="mx-wrap mx-post-stack__grid">
          <div className="mx-post-head">
            <Kicker>Lo stack</Kicker>
            <h2 className="mx-h mx-h--lg">
              Tutto quello che <span className="mx-gradient">ricevi.</span>
            </h2>
            <Reveal>
              <p className="mx-lead mx-post-head__lead">
                Tre pezzi, un percorso. Qui c’è il valore di ciascun pezzo — non ancora il prezzo
                dell’offerta.
              </p>
            </Reveal>
          </div>
          <Reveal className="mx-post-receipt" delay={0.08}>
            <img className="mx-post-receipt__logo" src="/pittogramma.png" alt="" />
            <ul className="mx-post-receipt__rows">
              {STACK_ITEMS.map((item) => (
                <li key={item.k} className="mx-post-receipt__row">
                  <span className="mx-post-receipt__k">{item.k}</span>
                  <div className="mx-post-receipt__main">
                    <h3 className="mx-h mx-post-receipt__t">{item.title}</h3>
                    <p className="mx-post-receipt__d">{item.body}</p>
                  </div>
                  <p className="mx-post-receipt__v">
                    {item.value} <TodoMark>stack</TodoMark>
                  </p>
                </li>
              ))}
            </ul>
            <div className="mx-post-receipt__total">
              <p>Valore totale</p>
              <p className="mx-post-receipt__sum">1.000€</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— 7. Le prove ——— */}
      <section className="mx-section mx-post-proofs">
        <div className="mx-wrap">
          <div className="mx-post-head">
            <Kicker>Le prove</Kicker>
            <h2 className="mx-h mx-h--lg">
              Cosa cambia, <span className="mx-accent">davvero.</span>
            </h2>
            <Reveal>
              <p className="mx-lead mx-post-head__lead">{copy.proofs.intro}</p>
            </Reveal>
          </div>

          <Snap as="ul" className="mx-post-proofgrid">
            {copy.proofs.beforeAfter.map((item) => (
              <li key={item.label} className="mx-post-proof is-ba">
                <div className="mx-post-proof__split" aria-hidden="true">
                  <span>
                    <UserRound size={40} strokeWidth={1.4} />
                  </span>
                  <span>
                    <UserRound size={40} strokeWidth={1.4} />
                  </span>
                </div>
                <p className="mx-post-proof__t">{item.label}</p>
                <p className="mx-post-proof__d">{item.hint}</p>
                <TodoMark onDark>foto prima/dopo</TodoMark>
              </li>
            ))}
            {copy.proofs.videos.map((item) => (
              <li key={item.title} className="mx-post-proof is-video">
                <span className="mx-post-proof__play" aria-hidden="true">
                  <Play size={18} strokeWidth={2.2} />
                </span>
                <p className="mx-post-proof__t">{item.title}</p>
                <p className="mx-post-proof__d">{item.hint}</p>
                <TodoMark onDark>video testimonianza</TodoMark>
              </li>
            ))}
            <li className="mx-post-proof is-report">
              <span className="mx-post-proof__file" aria-hidden="true">
                <FileText size={20} strokeWidth={1.8} />
              </span>
              <p className="mx-post-proof__t">
                Report della valutazione <TodoMark onDark>asset report</TodoMark>
              </p>
              <p className="mx-post-proof__d">{copy.proofs.report}</p>
            </li>
          </Snap>
        </div>
      </section>

      {/* ——— 8. Offerta Black Friday ——— */}
      <section className="mx-post-offer" id="offerta" ref={offerRef}>
        <div className="mx-post-grid-bg" aria-hidden="true" />
        <div className="mx-wrap">
          <Reveal className="mx-post-ticket">
            <div className="mx-post-ticket__main">
              <Kicker>Offerta Black Friday</Kicker>
              <h2 className="mx-h mx-h--md mx-post-ticket__title">
                Da 1.000€ a 500€.
                <br />
                <span className="mx-accent">Solo fino al {OFFER_DEADLINE_LABEL}.</span>
              </h2>
              <p className="mx-post-ticket__todo">
                <TodoMark onDark>data scadenza</TodoMark>
              </p>

              <div className="mx-post-price">
                <p className="mx-post-price__old">1.000€</p>
                <p className="mx-post-price__new">500€</p>
                <p className="mx-post-price__what">Percorso Posturale completo</p>
              </div>

              <ul className="mx-post-ticket__list">
                {STACK_ITEMS.map((item) => (
                  <li key={item.k}>
                    <span aria-hidden="true">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-post-ticket__stub">
              <Countdown cells={countdownCells} className="is-big" />
              <p className="mx-post-ticket__seats">
                Posti limitati: <span className="mx-accent">{SPOTS_LEFT} rimasti</span>{' '}
                <TodoMark onDark>posti</TodoMark>
              </p>
              {ctas}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— 9. Garanzia ——— */}
      <section className="mx-section mx-section--deep mx-post-guarantee">
        <div className="mx-wrap mx-post-guarantee__grid">
          <div>
            <Kicker>Garanzia</Kicker>
            <h2 className="mx-h mx-h--lg">
              Il rischio ce lo <span className="mx-gradient">prendiamo noi.</span>
            </h2>
          </div>
          <Reveal className="mx-post-shield">
            <span className="mx-post-shield__icon" aria-hidden="true">
              <Shield size={26} strokeWidth={1.8} />
            </span>
            <p className="mx-post-shield__todo">
              <TodoMark onDark>testo garanzia</TodoMark>
            </p>
            <p className="mx-body">
              Placeholder: se dalla valutazione non emerge un quadro su cui vale la pena lavorare,
              nessun obbligo di proseguire. Formulazione esatta da definire (rimborso / non si va
              avanti / condizioni).
            </p>
          </Reveal>
        </div>
      </section>

      {/* ——— 10. Studio e sedi ——— */}
      <section className="mx-section mx-section--glow mx-post-place">
        <div className="mx-wrap">
          <div className="mx-post-head">
            <Kicker>Studio e sedi</Kicker>
            <h2 className="mx-h mx-h--lg">
              Due sedi nel centro
              <br />
              <span className="mx-accent">di Torino.</span>
            </h2>
            <Reveal>
              <p className="mx-lead mx-post-head__lead">
                Mobilitas è uno studio osteopatico con un team di oltre 20 professionisti. Il Percorso
                Posturale nasce da anni di lavoro su postura, sedentarietà e recupero della funzione —
                in studio e nella giornata vera.
              </p>
            </Reveal>
          </div>

          <div className="mx-post-team">
            {TEAM_PHOTOS.map((photo, i) => (
              <figure key={photo.src} className="mx-post-team__photo" style={{ '--i': i }}>
                <img
                  src={webSmall(photo.src)}
                  srcSet={`${webSmall(photo.src)} 700w, ${webLarge(photo.src)} 1200w`}
                  sizes="(min-width: 1000px) 300px, 62vw"
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
          <p className="mx-post-team__todo">
            <TodoMark onDark>foto team / studio</TodoMark>
          </p>

          <div className="mx-post-maps">
            {MAPS.map((map) => (
              <div key={map.label} className="mx-post-map">
                <div className="mx-post-map__label">
                  <MapPin size={16} />
                  {map.label}
                </div>
                <iframe
                  src={map.src}
                  title={map.title}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ))}
          </div>
          <div className="mx-post-transit">
            <p>
              <TrainFront size={18} aria-hidden="true" />
              <span>
                Entrambe le sedi sono raggiungibili in metro: San Donato (Bernini o Principi d’Acaja),
                Crocetta (fermata Crocetta).
              </span>
            </p>
            <p>
              <Car size={18} aria-hidden="true" />
              <span>Parcheggio vicino a entrambe le sedi · strisce blu</span>
            </p>
          </div>
        </div>
      </section>

      {/* ——— 11. FAQ ——— */}
      <section className="mx-section mx-section--deep mx-post-faq">
        <div className="mx-wrap mx-post-faq__grid">
          <div className="mx-post-faq__intro">
            <Kicker>Domande</Kicker>
            <h2 className="mx-h mx-h--lg">
              Le domande che arrivano
              <br />
              <span className="mx-gradient">prima di bloccare il posto.</span>
            </h2>
          </div>
          <ul className="mx-post-faq__list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <li key={item.id} className={`mx-post-faq__item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`mx-post-faq-${item.id}`}
                    className="mx-post-faq__q"
                  >
                    <span className="mx-post-faq__qt">{item.question}</span>
                    <span className="mx-post-faq__plus" aria-hidden="true">
                      <Plus size={18} strokeWidth={2.4} />
                    </span>
                  </button>
                  <div className="mx-post-faq__a" id={`mx-post-faq-${item.id}`} role="region">
                    <div>
                      <p className="mx-body">{item.answer}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ——— 12. La scelta ——— */}
      <section className="mx-post-final">
        <span className="mx-final__ring" aria-hidden="true" />
        <span className="mx-final__ring" aria-hidden="true" />
        <span className="mx-final__ring" aria-hidden="true" />
        <div className="mx-wrap">
          <div className="mx-post-head is-center">
            <Kicker>La scelta</Kicker>
            <h2 className="mx-h mx-h--xl">
              Due strade. <span className="mx-gradient">Una scelta.</span>
            </h2>
          </div>

          <div className="mx-post-roads">
            <Reveal className="mx-post-road is-1">
              <p className="mx-post-road__tag">Strada 1</p>
              <h3 className="mx-h mx-h--md">Continuare a tamponare</h3>
              <p className="mx-body">
                Stretching, cuscino, «da oggi sto dritto», una seduta quando il nodo torna. Il
                sintomo si calma. La causa resta. Tra tre mesi, la stessa foto di profilo.
              </p>
            </Reveal>
            <Reveal className="mx-post-road is-2" delay={0.08}>
              <p className="mx-post-road__tag">Strada 2</p>
              <h3 className="mx-h mx-h--md">Lavorare sulla causa</h3>
              <p className="mx-post-road__body">
                Valutare, sbloccare in studio, consolidare nelle 16 ore. Non è più veloce: è l’unica
                direzione in cui il cambiamento può tenersi.
              </p>
            </Reveal>
          </div>

          <Reveal className="mx-post-recap">
            <p className="mx-post-recap__old">1.000€</p>
            <p className="mx-post-recap__new">500€</p>
            <p className="mx-post-recap__info">
              Valutazione + 3 trattamenti + 12 mesi di app · fino al {OFFER_DEADLINE_LABEL} ·{' '}
              {SPOTS_LEFT} posti
            </p>
            <p className="mx-post-recap__todo">
              <TodoMark onDark>data</TodoMark>
              <TodoMark onDark>posti</TodoMark>
            </p>
            {ctas}
          </Reveal>

          <div className="mx-post-contacts">
            <a href={PHONE_HREF} className="mx-post-contact is-link">
              <Phone size={16} strokeWidth={1.8} />
              {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="mx-post-contact is-link">
              <Mail size={16} strokeWidth={1.8} />
              {EMAIL}
            </a>
            <div className="mx-post-contact">
              <Clock size={16} strokeWidth={1.8} />
              {HOURS}
            </div>
            <div className="mx-post-contact">
              <MapPin size={16} strokeWidth={1.8} />
              Peyron 54 · Lamarmora 35
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showSticky && !showBooking && (
          <motion.div
            className="mx-post-sticky"
            initial={{ y: 110, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 110, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="mx-post-sticky__price">
              <p className="mx-post-sticky__old">1.000€</p>
              <p className="mx-post-sticky__new">500€</p>
            </div>
            <button type="button" onClick={openOfferta} className="mx-post-sticky__btn">
              Blocca il tuo posto
              <ArrowRight size={16} strokeWidth={2.4} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingPopup
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        pageContext={variant === 'uomo' ? 'offerta-postura-uomo' : 'offerta-postura-donna'}
        ctaType={bookingCtaType}
      />
    </PageShell>
  )
}

export default OffertaPostura
