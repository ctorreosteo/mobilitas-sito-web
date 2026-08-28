import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
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
} from 'lucide-react'
import BookingPopup from '../components/BookingPopup'

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
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 align-middle text-[9px] font-semibold uppercase tracking-[0.14em] ${
        onDark
          ? 'border border-amber-200/30 bg-amber-200/10 text-amber-100'
          : 'border border-amber-800/20 bg-amber-100 text-amber-900'
      }`}
    >
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

const _MOTION = motion

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

function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`mb-5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] ${
        dark ? 'text-green' : 'text-blue-dark/70'
      }`}
    >
      {children}
    </p>
  )
}

function Fade({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const LIQUID_DRIFT = {
  tl: { x: [0, 120, 50, 95, 0], y: [0, 95, 35, 80, 0] },
  tr: { x: [0, -120, -45, -90, 0], y: [0, 90, 30, 70, 0] },
  bl: { x: [0, 110, 40, 85, 0], y: [0, -100, -30, -75, 0] },
  br: { x: [0, -110, -40, -85, 0], y: [0, -95, -25, -70, 0] },
  c: { x: [0, 80, -90, 45, 0], y: [0, -70, 85, -35, 0] },
}

const LIQUID_MORPH = [
  '42% 58% 56% 44% / 48% 42% 58% 52%',
  '62% 38% 32% 68% / 40% 62% 38% 60%',
  '32% 68% 58% 42% / 68% 32% 62% 38%',
  '58% 42% 36% 64% / 42% 58% 42% 58%',
  '42% 58% 56% 44% / 48% 42% 58% 52%',
]

function LiquidBlob({
  className = '',
  size = 280,
  color = 'rgba(114, 250, 147, 0.5)',
  duration = 9,
  delay = 0,
  drift = 'c',
  blur = 42,
  centered = false,
}) {
  const reduceMotion = useReducedMotion()
  const path = LIQUID_DRIFT[drift] ?? LIQUID_DRIFT.c
  return (
    <motion.div
      aria-hidden
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        willChange: reduceMotion ? undefined : 'transform',
        ...(centered
          ? { left: '50%', top: '50%', marginLeft: -size / 2, marginTop: -size / 2 }
          : null),
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              x: path.x,
              y: path.y,
              scale: [1, 1.22, 0.84, 1.12, 1],
              rotate: [0, 14, -10, 8, 0],
            }
      }
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="h-full w-full"
        style={{ background: color, filter: `blur(${blur}px)`, borderRadius: LIQUID_MORPH[0] }}
        animate={reduceMotion ? undefined : { borderRadius: LIQUID_MORPH }}
        transition={{ duration: duration * 0.9, delay, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

function LiquidField({ variant = 'light' }) {
  const blobs =
    variant === 'dark'
      ? [
          { className: '-top-24 -right-24', size: 300, color: 'rgba(114, 250, 147, 0.22)', duration: 8, drift: 'tr' },
          { className: '-bottom-28 -left-24', size: 280, color: 'rgba(114, 250, 147, 0.16)', duration: 11, delay: 0.6, drift: 'bl' },
        ]
      : [
          { className: '-top-10 -left-8', size: 400, color: 'rgba(114, 250, 147, 0.55)', duration: 8, drift: 'tl' },
          { className: 'top-8 -right-12', size: 320, color: 'rgba(114, 250, 147, 0.4)', duration: 11, delay: 0.5, drift: 'tr' },
          { className: 'bottom-16 left-[26%]', size: 260, color: 'rgba(114, 250, 147, 0.18)', duration: 9.5, delay: 1, drift: 'c', blur: 30 },
        ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {blobs.map((blob) => (
        <LiquidBlob key={blob.className} {...blob} />
      ))}
    </div>
  )
}

const HERO_EASE = [0.16, 1, 0.3, 1]
const HOVER_SPRING = { type: 'spring', stiffness: 340, damping: 24 }

function useFineHover() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setFine(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])
  return fine
}

function HoverCard({ children, className = '', tone = 'dark', as = 'article' }) {
  const Comp = motion[as]
  const reduceMotion = useReducedMotion()
  const fine = useFineHover()
  const ref = useRef(null)

  return (
    <Comp
      ref={ref}
      onPointerMove={
        fine
          ? (event) => {
              const box = ref.current?.getBoundingClientRect()
              if (!box) return
              ref.current.style.setProperty('--hx', `${((event.clientX - box.left) / box.width) * 100}%`)
              ref.current.style.setProperty('--hy', `${((event.clientY - box.top) / box.height) * 100}%`)
            }
          : undefined
      }
      whileHover={fine && !reduceMotion ? { y: -7 } : undefined}
      transition={HOVER_SPRING}
      className={`offerta-hover-card offerta-hover-card--${tone} relative overflow-hidden ${className}`}
    >
      <span className="offerta-hover-spot" aria-hidden />
      {children}
    </Comp>
  )
}

function HoverChip({ children, className = '' }) {
  const reduceMotion = useReducedMotion()
  const fine = useFineHover()
  return (
    <motion.span
      whileHover={fine && !reduceMotion ? { y: -2, scale: 1.05, backgroundColor: 'rgba(114,250,147,0.16)' } : undefined}
      transition={HOVER_SPRING}
      className={className}
    >
      {children}
    </motion.span>
  )
}

function MagneticCta({ onClick }) {
  const reduceMotion = useReducedMotion()
  const fine = useFineHover()
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 260, damping: 20, mass: 0.32 })
  const y = useSpring(0, { stiffness: 260, damping: 20, mass: 0.32 })

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      style={fine && !reduceMotion ? { x, y } : undefined}
      onPointerMove={
        fine && !reduceMotion
          ? (event) => {
              const box = ref.current?.getBoundingClientRect()
              if (!box) return
              x.set((event.clientX - box.left - box.width / 2) * 0.3)
              y.set((event.clientY - box.top - box.height / 2) * 0.38)
            }
          : undefined
      }
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      whileHover={fine && !reduceMotion ? { scale: 1.045 } : undefined}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className="offerta-cta-liquid inline-flex items-center gap-2 rounded-full bg-green px-6 py-3.5 sm:px-8 text-[13px] sm:text-sm font-black uppercase tracking-[0.06em] text-blue-dark shadow-[0_10px_28px_-12px_rgba(114,250,147,0.7)]"
    >
      <span className="relative z-10 sm:hidden">Blocca a 500€</span>
      <span className="relative z-10 hidden sm:inline">Blocca il tuo posto a 500€</span>
      <ArrowRight className="offerta-cta-arrow relative z-10 w-4 h-4" strokeWidth={2.4} />
    </motion.button>
  )
}

function GhostCta({ onClick, dark = false }) {
  const reduceMotion = useReducedMotion()
  const fine = useFineHover()
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={fine && !reduceMotion ? { y: -3 } : undefined}
      whileTap={{ scale: 0.98 }}
      transition={HOVER_SPRING}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 sm:px-8 text-[13px] sm:text-sm font-semibold tracking-[0.02em] border transition-[background-color,border-color,color] duration-300 ${
        dark
          ? 'border-cream/25 text-cream hover:border-green/50 hover:bg-cream/10'
          : 'border-blue-dark/15 text-blue-dark hover:border-green hover:bg-green/10'
      }`}
    >
      <Phone className="w-4 h-4" strokeWidth={2} />
      Hai dubbi? Chiamaci
    </motion.button>
  )
}

function SplitLine({ text, delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')
  if (reduceMotion) return <span className={className}>{text}</span>
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="offerta-hero-word">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.95, delay: delay + i * 0.055, ease: HERO_EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function HeroSpine({ className = '' }) {
  const reduceMotion = useReducedMotion()
  const drawn = { pathLength: 1, opacity: 1 }
  return (
    <svg
      viewBox="0 0 200 340"
      className={className}
      fill="none"
      aria-hidden
    >
      <motion.circle
        cx="118"
        cy="42"
        r="20"
        stroke="currentColor"
        strokeWidth="1.35"
        initial={reduceMotion ? drawn : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.35 }}
        transition={{ duration: 1.2, delay: 0.15, ease: HERO_EASE }}
      />
      <motion.path
        d="M118 62c-10 18-28 36-36 62-8 26-6 54 8 82 10 22 16 48 18 78"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        initial={reduceMotion ? drawn : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.28 }}
        transition={{ duration: 1.6, delay: 0.35, ease: HERO_EASE }}
      />
      <motion.circle
        cx="100"
        cy="40"
        r="20"
        stroke="#72fa93"
        strokeWidth="1.7"
        initial={reduceMotion ? drawn : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 1.25, delay: 0.85, ease: HERO_EASE }}
      />
      <motion.path
        d="M100 60c0 28-2 64-2 100s2 72 2 108"
        stroke="#72fa93"
        strokeWidth="1.7"
        strokeLinecap="round"
        initial={reduceMotion ? drawn : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.95 }}
        transition={{ duration: 1.7, delay: 1.05, ease: HERO_EASE }}
      />
      <motion.path
        d="M78 92h44"
        stroke="#72fa93"
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={reduceMotion ? drawn : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.7, delay: 1.45, ease: HERO_EASE }}
      />
    </svg>
  )
}

function HeroChip({ label, className, delay }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={`pointer-events-auto absolute z-20 hidden lg:block ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
      transition={{ duration: 0.7, delay, ease: HERO_EASE }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4.4, delay: delay + 0.4, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex items-center gap-2 rounded-full border border-blue-dark/15 bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-blue-dark shadow-[0_10px_28px_-14px_rgba(0,37,82,0.45)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green" />
        {label}
      </motion.div>
    </motion.div>
  )
}

function useLocalTilt(enabled) {
  const ref = useRef(null)
  const rotateX = useSpring(0, { stiffness: 160, damping: 22, mass: 0.28 })
  const rotateY = useSpring(0, { stiffness: 160, damping: 22, mass: 0.28 })
  const glowX = useSpring(50, { stiffness: 90, damping: 20 })
  const glowY = useSpring(40, { stiffness: 90, damping: 20 })

  useEffect(() => {
    if (!enabled) return undefined
    const el = ref.current
    if (!el) return undefined
    const onMove = (event) => {
      const box = el.getBoundingClientRect()
      const px = (event.clientX - box.left) / box.width
      const py = (event.clientY - box.top) / box.height
      rotateY.set((px - 0.5) * 11)
      rotateX.set((0.5 - py) * 8)
      glowX.set(px * 100)
      glowY.set(py * 100)
    }
    const onLeave = () => {
      rotateX.set(0)
      rotateY.set(0)
      glowX.set(50)
      glowY.set(40)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, glowX, glowY, rotateX, rotateY])

  return { ref, rotateX, rotateY, glowX, glowY }
}

function HeroMedia({
  video,
  videoSrc,
  videoCover,
  loading,
  fallbackImage,
  chips,
  y,
  scale,
}) {
  const reduceMotion = useReducedMotion()
  const tilt = useLocalTilt(!reduceMotion)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(114,250,147,0.28), transparent 58%)`

  return (
    <div
      ref={tilt.ref}
      className="relative z-10 mx-auto mt-2 w-full max-w-6xl px-0 sm:px-4 lg:px-16"
      style={{ perspective: 1400 }}
    >
      <HeroChip label={chips[0]} delay={1.05} className="left-3 top-[18%] xl:left-6" />
      <HeroChip label={chips[1]} delay={1.18} className="right-3 top-[24%] xl:right-6" />
      <HeroChip label={chips[2]} delay={1.32} className="left-8 bottom-[18%] xl:left-12" />

      <motion.div
        style={{ y, scale, rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 1400 }}
        className="origin-center will-change-transform"
      >
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-3 sm:-inset-5 rounded-[2rem] sm:rounded-[2.75rem] bg-[radial-gradient(ellipse_at_center,rgba(114,250,147,0.22),transparent_68%)] blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-8 right-8 -bottom-5 h-10 rounded-[100%] bg-blue-dark/20 blur-2xl sm:left-16 sm:right-16"
            aria-hidden
          />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.45, ease: HERO_EASE }}
            className="relative p-[1.5px] rounded-[1.75rem] sm:rounded-[2.5rem] lg:rounded-[3rem] bg-[linear-gradient(145deg,rgba(114,250,147,0.9)_0%,rgba(0,37,82,0.18)_38%,rgba(114,250,147,0.35)_72%,rgba(0,37,82,0.28)_100%)] shadow-[0_28px_60px_-24px_rgba(0,37,82,0.45),0_0_0_1px_rgba(114,250,147,0.16)]"
          >
            <div className="relative overflow-hidden rounded-[1.68rem] sm:rounded-[2.42rem] lg:rounded-[2.9rem] aspect-[16/10] sm:aspect-[16/9] bg-blue-dark">
              {video ? (
                <>
                  {video.anteprimaUrl ? (
                    <img
                      src={video.anteprimaUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      decoding="async"
                    />
                  ) : null}
                  <iframe
                    src={videoSrc}
                    title="Percorso Posturale — Mobilitas Torino"
                    className="absolute inset-0 h-full w-full border-0 pointer-events-none"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen
                  />
                  <div
                    className={`absolute inset-0 z-[1] bg-blue-dark transition-opacity duration-300 ${
                      videoCover ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden
                  />
                  <div className="absolute inset-0 z-[1]" aria-hidden />
                </>
              ) : (
                <>
                  <img
                    src={fallbackImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover scale-105 blur-[2px]"
                  />
                  <div className="absolute inset-0 bg-blue-dark/70" />
                  <div className="absolute inset-0 grid place-items-center p-6 text-center">
                    <div>
                      <span className="relative mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-green text-blue-dark">
                        <span className="absolute inset-0 animate-ping rounded-full bg-green/50" />
                        <Play className="relative w-6 h-6 ml-0.5" strokeWidth={2.2} />
                      </span>
                      <p className="text-cream font-bold text-xl sm:text-2xl drop-shadow-[0_2px_12px_rgba(0,37,82,0.9)]">
                        Video o immagine di profilo
                      </p>
                      <p className="mt-2">
                        <TodoMark onDark>asset hero</TodoMark>
                      </p>
                    </div>
                  </div>
                </>
              )}
              {loading && !video ? (
                <div className="absolute inset-0 bg-blue-dark" aria-hidden />
              ) : null}
              <motion.div
                className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen"
                style={{ background: glow }}
                aria-hidden
              />
              {!reduceMotion ? <div className="offerta-hero-shine" aria-hidden /> : null}
              <div className="absolute inset-0 z-[2] ring-1 ring-inset ring-cream/15 rounded-[inherit] pointer-events-none" />
              <div className="absolute bottom-4 left-1/2 z-[4] -translate-x-1/2 rounded-full bg-cream/95 px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-wide text-blue-dark whitespace-nowrap shadow-[0_8px_20px_-12px_rgba(0,37,82,0.5)]">
                Valuta → Correggi → Consolida
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function DarkBlock({ children, className = '', id, innerRef }) {
  return (
    <section
      id={id}
      ref={innerRef}
      className={`relative mx-3 sm:mx-5 lg:mx-8 my-2 overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] lg:rounded-[3.5rem] bg-blue-dark text-cream ${className}`}
    >
      <LiquidField variant="dark" />
      <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14 lg:px-20 lg:py-16">{children}</div>
    </section>
  )
}

function LightSection({ children, className = '' }) {
  return (
    <section className={`px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16 ${className}`}>
      {children}
    </section>
  )
}

function Marquee({ items, dark = false, reverse = false }) {
  const row = [...items, ...items]
  return (
    <div
      className={`relative overflow-hidden py-5 sm:py-6 ${dark ? 'bg-blue-dark text-cream' : 'text-blue-dark'}`}
    >
      <div
        className={`flex w-max items-center will-change-transform ${reverse ? 'offerta-marquee-rev' : 'offerta-marquee'}`}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap px-4 sm:px-6">
            <span className="font-black text-xl sm:text-3xl opacity-80">{item}</span>
            <span className={`mx-4 sm:mx-6 text-lg ${dark ? 'text-green' : 'text-blue-dark/25'}`}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function PinGallery({
  eyebrow,
  title,
  intro,
  children,
  dark = true,
  gridClass = 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
}) {
  return (
    <section
      className={`relative mx-3 sm:mx-5 lg:mx-8 my-2 overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] lg:rounded-[3.25rem] ${
        dark ? 'bg-blue-dark text-cream' : 'bg-white text-blue-dark'
      }`}
    >
      {dark ? <LiquidField variant="dark" /> : <LiquidField variant="light" />}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-10 sm:pt-12 pb-6 sm:pb-8 text-center max-w-3xl mx-auto">
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 className="font-black tracking-[-0.02em] leading-[1.12] mb-4">{title}</h2>
        {        intro ? (
          <p className={`text-base sm:text-lg leading-relaxed ${dark ? 'text-cream/75' : 'text-blue-dark/70'}`}>
            {intro}
          </p>
        ) : null}
      </div>
      <div className={`relative z-10 grid ${gridClass} gap-4 sm:gap-5 px-5 sm:px-8 lg:px-12 pb-10 lg:pb-12`}>
        {children}
      </div>
    </section>
  )
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

function OffertaPostura({ variant = 'uomo' }) {
  const copy = getVariantCopy(variant)
  const { video: heroVideo, loading: heroVideoLoading } = useHeroVideo(copy.videoCode)
  const countdown = useCountdown(OFFER_DEADLINE_ISO)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('primaVisita')
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [heroVideoCover, setHeroVideoCover] = useState(true)
  const [showSticky, setShowSticky] = useState(false)
  const offerRef = useRef(null)
  const heroRef = useRef(null)

  const heroVideoSrc = heroVideo
    ? `https://iframe.videodelivery.net/${heroVideo.cloudflareUid}?autoplay=true&muted=true&loop=true&controls=false&preload=auto&letterboxColor=%23002552&poster=${encodeURIComponent(heroVideo.anteprimaUrl ?? '')}`
    : ''

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.15 })
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProg, [0, 1], [0, 88])
  const heroScale = useTransform(heroProg, [0, 1], [1, 1.12])
  const heroTextY = useTransform(heroProg, [0, 1], [0, -32])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.28 })
  const cursorY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.28 })
  const cursorXLag = useSpring(mouseX, { stiffness: 38, damping: 18, mass: 0.55 })
  const cursorYLag = useSpring(mouseY, { stiffness: 38, damping: 18, mass: 0.55 })
  const [cursorFx, setCursorFx] = useState(false)

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
    const fine = window.matchMedia('(pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setCursorFx(fine.matches && !reduce.matches)
    sync()
    fine.addEventListener('change', sync)
    reduce.addEventListener('change', sync)
    mouseX.set(window.innerWidth * 0.55)
    mouseY.set(window.innerHeight * 0.28)
    const onMove = (event) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      fine.removeEventListener('change', sync)
      reduce.removeEventListener('change', sync)
      window.removeEventListener('pointermove', onMove)
    }
  }, [mouseX, mouseY])

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

  const CtaPair = ({ dark = false, className = '' }) => (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${className}`}>
      <MagneticCta onClick={openOfferta} />
      <GhostCta onClick={openInfo} dark={dark} />
    </div>
  )

  const countdownCells = [
    { v: pad2(countdown.days), l: 'giorni' },
    { v: pad2(countdown.hours), l: 'ore' },
    { v: pad2(countdown.minutes), l: 'min' },
    { v: pad2(countdown.seconds), l: 'sec' },
  ]

  return (
    <div
      className={`offerta-postura min-h-screen bg-cream text-blue-dark font-montserrat [&_*]:font-montserrat overflow-x-clip ${
        showSticky ? 'pb-24 md:pb-0' : ''
      }`}
    >
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-green"
        style={{ scaleX: smoothProgress }}
      />

      {cursorFx ? (
        <div className="pointer-events-none fixed inset-0 z-[8] overflow-hidden" aria-hidden>
          <motion.div
            className="offerta-cursor-gradient absolute h-[32rem] w-[32rem] rounded-full"
            style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
          />
          <motion.div
            className="absolute h-[16rem] w-[16rem] rounded-full blur-md"
            style={{
              x: cursorXLag,
              y: cursorYLag,
              translateX: '-50%',
              translateY: '-50%',
              background:
                'radial-gradient(circle, rgba(114,250,147,0.28) 0%, rgba(0,37,82,0.08) 46%, transparent 70%)',
            }}
          />
        </div>
      ) : null}

      {/* ——— 1. HERO ——— */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden px-5 pt-10 pb-12 sm:px-10 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 text-center"
      >
        <LiquidField variant="light" />
        <div className="offerta-hero-grain" aria-hidden />
        <HeroSpine className="pointer-events-none absolute left-1/2 top-6 z-[1] h-[340px] w-[200px] -translate-x-1/2 text-blue-dark opacity-[0.22] sm:top-2 sm:h-[420px] sm:w-[240px]" />

        <motion.div className="relative z-10" style={{ y: heroTextY }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: HERO_EASE }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-blue-dark/10 bg-white/55 px-3.5 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-green opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-green" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-blue-dark/70">
              Percorso Posturale · Black Friday
            </span>
          </motion.div>

          <h1 className="font-black tracking-[-0.03em] leading-[1.06] text-blue-dark max-w-4xl mx-auto mb-5">
            <SplitLine text={copy.headlineLead} delay={0.12} />
            <br />
            <SplitLine text={copy.headlineAccent} delay={0.38} className="text-blue-dark" />
          </h1>

          <motion.span
            className="mx-auto mb-6 block h-px w-20 origin-center bg-green sm:w-24"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: HERO_EASE }}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.5, ease: HERO_EASE }}
            className="text-blue-dark/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8 font-medium"
          >
            Il percorso che lavora sulla causa — non sul sintomo — in studio e nelle 16 ore in cui
            vivi.
          </motion.p>

          <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
            {['Valuta', 'Correggi', 'Consolida'].map((step, i) => (
              <React.Fragment key={step}>
                {i > 0 ? (
                  <motion.span
                    className="hidden h-px w-8 origin-left bg-blue-dark/15 sm:block"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.45, delay: 0.72 + i * 0.12, ease: HERO_EASE }}
                  />
                ) : null}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.62 + i * 0.12, ease: HERO_EASE }}
                  className="offerta-step-pill inline-flex shrink-0 items-center rounded-full border border-blue-dark/10 bg-white/65 px-2.5 sm:px-3 py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.16em] text-blue-dark/70"
                >
                  <span className="mr-1 sm:mr-1.5 text-blue-dark">{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </motion.span>
              </React.Fragment>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78, ease: HERO_EASE }}
          >
            <CtaPair className="mb-10 sm:mb-12" />
          </motion.div>
        </motion.div>

        <HeroMedia
          video={heroVideo}
          videoSrc={heroVideoSrc}
          videoCover={heroVideoCover}
          loading={heroVideoLoading}
          fallbackImage={copy.heroImage}
          chips={copy.heroChips}
          y={heroY}
          scale={heroScale}
        />
      </section>

      <Marquee
        dark
        items={[
          '2 sedi a Torino',
          '20+ professionisti',
          'San Donato',
          'Crocetta',
          'Valuta',
          'Correggi',
          'Consolida',
        ]}
      />

      {/* ——— 2. IDENTIFICAZIONE ——— */}
      <PinGallery
        eyebrow="I segnali"
        title={
          <>
            Ti riconosci in almeno uno
            <br />
            <span className="text-green">di questi?</span>
          </>
        }
        intro="Non serve averli tutti. Anche uno solo può essere il modo in cui il corpo sta dicendo che si è adattato."
      >
        {copy.signals.map((item, i) => (
          <HoverCard
            key={item.title}
            className="w-full rounded-[1.75rem] border border-cream/15 bg-[#041f45] p-6 sm:p-7 flex flex-col"
          >
            <p className="relative font-black text-green text-4xl sm:text-5xl mb-6 leading-none">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="relative text-cream font-semibold text-lg sm:text-xl leading-snug mb-3 mt-0">
              {item.title}
            </h3>
            <p className="relative text-cream/75 text-sm leading-relaxed mt-auto">{item.body}</p>
          </HoverCard>
        ))}
      </PinGallery>

      {/* ——— 3. LA CAUSA ——— */}
      <LightSection>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Fade>
            <Eyebrow>La causa</Eyebrow>
            <h2 className="font-black tracking-[-0.02em] leading-[1.12] mb-5">
              Non sono problemi diversi.
              <br />
              <span className="text-blue-dark">È una causa sola.</span>
            </h2>
            <p className="text-blue-dark/70 text-base sm:text-lg leading-relaxed mb-6">
              Il corpo non si rompe a pezzi. Si adatta alle 16 ore da seduti, allo schermo, al modo
              in cui stai fermo senza accorgertene. Testa avanti, nodo, mal di testa, schiena:
              sembrano storie separate. Sono tessere dello stesso puzzle.
            </p>
            <p className="font-black text-xl sm:text-2xl text-blue-dark leading-snug">
              Il sintomo è il pezzo che fa rumore. La causa è lo schema che lo tiene acceso.
            </p>
          </Fade>
          <Fade delay={0.08}>
            <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-blue-dark text-cream p-7 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green mb-5">
                Tanti sintomi → una causa
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {CAUSE_SYMPTOMS.map((s) => (
                  <HoverChip
                    key={s}
                    className="rounded-full border border-cream/15 bg-cream/5 px-3 py-1.5 text-xs font-medium text-cream/80"
                  >
                    {s}
                  </HoverChip>
                ))}
              </div>
              <div className="rounded-[1.5rem] bg-green px-5 py-6 text-center text-blue-dark">
                <p className="font-black text-2xl sm:text-3xl text-blue-dark leading-snug">
                  Un adattamento alle 16 ore
                </p>
                <p className="text-blue-dark text-sm mt-2 leading-relaxed font-medium">
                  Seduti, schermo, stesso gesto ripetuto. Il corpo trova una strategia — e la tiene.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </LightSection>

      <Marquee reverse items={CAUSE_SYMPTOMS} />

      {/* ——— 4. SOLUZIONI FALLIMENTARI ——— */}
      <PinGallery
        eyebrow="Aiuti di superficie"
        title={
          <>
            Perché quello che hai già provato
            <br />
            <span className="text-green">non ha funzionato.</span>
          </>
        }
        intro="Non perché «non ti sei impegnato abbastanza». Perché erano aiuti di superficie: utili per un pezzo, silenziosi sulla causa."
      >
        {FAILED_SOLUTIONS.map((item) => {
          const Icon = item.icon
          return (
            <HoverCard
              key={item.title}
              className="w-full rounded-[1.75rem] border border-cream/15 bg-[#041f45] p-6 sm:p-7 flex flex-col"
            >
              <Icon className="relative w-5 h-5 text-green mb-5" strokeWidth={1.6} />
              <h3 className="relative text-cream font-semibold text-lg mb-3 mt-0">{item.title}</h3>
              <p className="relative text-cream/80 text-sm leading-relaxed mb-3">{item.does}</p>
              <p className="relative text-cream/80 text-sm leading-relaxed mt-auto">{item.why}</p>
            </HoverCard>
          )
        })}
      </PinGallery>

      {/* ——— 5. IL METODO ——— */}
      <LightSection>
        <Fade className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <Eyebrow>Il metodo</Eyebrow>
          <h2 className="font-black tracking-[-0.02em] leading-[1.12] mb-5">
            Metodo Mobilitas:{' '}
            <span className="text-blue-dark">Valuta → Correggi → Consolida.</span>
          </h2>
          <p className="text-blue-dark/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Tre passi, in quest’ordine. Perché sbloccare senza capire, o capire senza consolidare,
            è di nuovo un aiuto di superficie.
          </p>
        </Fade>
        <ol className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 lg:gap-6 list-none m-0 p-0">
          {METHOD_STEPS.map((step) => (
            <HoverCard
              as="li"
              key={step.k}
              tone="light"
              className="rounded-[1.75rem] bg-white/70 border border-blue-dark/10 p-6 sm:p-8 flex flex-col"
            >
              <p className="relative font-black text-blue-dark text-5xl sm:text-6xl leading-none m-0 mb-5">
                {step.k}
              </p>
              <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-dark/70 mb-2">
                {step.t}
              </p>
              <h3 className="relative font-bold text-xl sm:text-2xl leading-snug mb-3 mt-0 text-blue-dark">
                {step.title}
              </h3>
              <p className="relative text-blue-dark/70 text-sm sm:text-base leading-relaxed mt-auto">
                {step.body}
              </p>
            </HoverCard>
          ))}
        </ol>
        <Fade className="mt-10 sm:mt-12 text-center max-w-2xl mx-auto">
          <p className="font-black text-xl sm:text-2xl text-blue-dark leading-snug mb-10">
            Funziona perché combina lo studio e la vita quotidiana.
          </p>
          <CtaPair />
        </Fade>
      </LightSection>

      {/* ——— 6. COSA INCLUDE ——— */}
      <LightSection className="pt-0 sm:pt-0 lg:pt-0">
        <Fade className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow>Lo stack</Eyebrow>
          <h2 className="font-black tracking-[-0.02em] leading-[1.12] mb-4">
            Tutto quello che <span className="text-blue-dark">ricevi.</span>
          </h2>
          <p className="text-blue-dark/70 text-base sm:text-lg leading-relaxed">
            Tre pezzi, un percorso. Qui c’è il valore di ciascun pezzo — non ancora il prezzo
            dell’offerta.
          </p>
        </Fade>
        <div className="max-w-3xl mx-auto space-y-3">
          {STACK_ITEMS.map((item, i) => (
            <Fade key={item.k} delay={i * 0.05}>
              <HoverCard
                tone="light"
                className="rounded-[1.5rem] bg-white/70 border border-blue-dark/10 px-6 py-6 sm:px-8 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <span className="relative font-black text-blue-dark text-2xl leading-none">
                  {item.k}
                </span>
                <div className="relative min-w-0 flex-1">
                  <h3 className="text-blue-dark font-semibold text-base sm:text-lg mt-0 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-blue-dark/70 text-sm leading-relaxed">{item.body}</p>
                </div>
                <p className="relative text-blue-dark font-black text-xl whitespace-nowrap flex items-center gap-2">
                  {item.value} <TodoMark>stack</TodoMark>
                </p>
              </HoverCard>
            </Fade>
          ))}
        </div>
        <Fade className="max-w-3xl mx-auto mt-4">
          <div className="rounded-[1.5rem] bg-blue-dark px-6 py-5 sm:px-8 flex items-center justify-between">
            <p className="text-cream/70 font-medium m-0">Valore totale</p>
            <p className="font-black text-cream text-3xl sm:text-4xl m-0">1.000€</p>
          </div>
        </Fade>
      </LightSection>

      {/* ——— 7. PROVE ——— */}
      <PinGallery
        eyebrow="Le prove"
        title={
          <>
            Cosa cambia, <span className="text-green">davvero.</span>
          </>
        }
        intro={copy.proofs.intro}
        gridClass="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
      >
        {copy.proofs.beforeAfter.map((item) => (
          <HoverCard
            as="div"
            key={item.label}
            className="w-full rounded-[1.75rem] bg-[#041f45] border border-cream/15 min-h-[240px] grid place-items-center p-6 sm:p-8 text-center"
          >
            <div className="relative">
              <p className="font-black text-xl text-cream mb-2">{item.label}</p>
              <p className="text-cream/70 text-sm leading-relaxed mb-3">{item.hint}</p>
              <TodoMark onDark>foto prima/dopo</TodoMark>
            </div>
          </HoverCard>
        ))}
        {copy.proofs.videos.map((item) => (
          <HoverCard
            as="div"
            key={item.title}
            className="w-full rounded-[1.75rem] bg-[#041f45] border border-cream/15 min-h-[240px] grid place-items-center p-6 sm:p-8 text-center"
          >
            <div className="relative">
              <span className="offerta-play-pop grid place-items-center w-11 h-11 mx-auto mb-3 rounded-full bg-green text-blue-dark">
                <Play className="w-4 h-4 ml-0.5" strokeWidth={2.2} />
              </span>
              <p className="font-black text-lg text-cream mb-1">{item.title}</p>
              <p className="text-cream/70 text-sm mb-3">{item.hint}</p>
              <TodoMark onDark>video testimonianza</TodoMark>
            </div>
          </HoverCard>
        ))}
        <HoverCard
          as="div"
          className="w-full rounded-[1.75rem] border border-cream/15 bg-[#041f45] p-6 sm:p-7 flex flex-col justify-center min-h-[240px]"
        >
          <FileText className="relative w-5 h-5 text-green mb-4" strokeWidth={1.6} />
          <p className="relative text-cream font-semibold mb-2 flex items-center gap-2 flex-wrap">
            Report della valutazione <TodoMark onDark>asset report</TodoMark>
          </p>
          <p className="relative text-cream/80 text-sm leading-relaxed">{copy.proofs.report}</p>
        </HoverCard>
      </PinGallery>

      {/* ——— 8. OFFERTA BLACK FRIDAY ——— */}
      <DarkBlock id="offerta" innerRef={offerRef}>
        <Fade className="text-center max-w-2xl mx-auto">
          <Eyebrow dark>Offerta Black Friday</Eyebrow>
          <h2 className="font-black tracking-[-0.02em] leading-[1.12] mb-3">
            Da 1.000€ a 500€.
            <br />
            <span className="text-green">Solo fino al {OFFER_DEADLINE_LABEL}.</span>
          </h2>
          <p className="mb-10">
            <TodoMark onDark>data scadenza</TodoMark>
          </p>

          <p className="text-cream/50 text-lg font-medium line-through decoration-cream/40 mb-1">
            1.000€
          </p>
          <p className="font-black text-cream text-7xl sm:text-8xl leading-none mb-2">
            500€
          </p>
          <p className="text-cream/75 text-sm mb-8">Percorso Posturale completo</p>

          <ul className="space-y-2.5 text-left max-w-sm mx-auto mb-10">
            {STACK_ITEMS.map((item) => (
              <li key={item.k} className="flex items-center gap-3">
                <span className="grid place-items-center w-5 h-5 rounded-full bg-green shrink-0">
                  <Check className="w-3 h-3 text-blue-dark" strokeWidth={3} />
                </span>
                <span className="text-cream/80 text-sm">{item.title}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto mb-8">
            {countdownCells.map((c) => (
              <div key={c.l} className="rounded-2xl border border-cream/15 bg-[#041f45] py-4">
                <p className="font-black text-2xl sm:text-3xl text-cream leading-none">
                  {c.v}
                </p>
                <p className="text-cream/70 text-[10px] font-semibold uppercase tracking-[0.16em] mt-1.5">
                  {c.l}
                </p>
              </div>
            ))}
          </div>

          <p className="text-cream/70 text-sm mb-10">
            Posti limitati: <span className="text-green font-semibold">{SPOTS_LEFT} rimasti</span>{' '}
            <TodoMark onDark>posti</TodoMark>
          </p>

          <CtaPair dark />
        </Fade>
      </DarkBlock>

      {/* ——— 9. GARANZIA ——— */}
      <LightSection>
        <Fade className="max-w-2xl mx-auto text-center">
          <Eyebrow>Garanzia</Eyebrow>
          <h2 className="font-black tracking-[-0.02em] leading-[1.12] mb-8">
            Il rischio ce lo <span className="text-blue-dark">prendiamo noi.</span>
          </h2>
          <div className="rounded-[2rem] bg-white/70 border border-blue-dark/10 px-6 py-8 sm:px-10 text-left">
            <Shield className="w-6 h-6 text-blue-dark mb-4" strokeWidth={1.6} />
            <p className="mb-3">
              <TodoMark>testo garanzia</TodoMark>
            </p>
            <p className="text-blue-dark/70 text-sm sm:text-base leading-relaxed">
              Placeholder: se dalla valutazione non emerge un quadro su cui vale la pena lavorare,
              nessun obbligo di proseguire. Formulazione esatta da definire (rimborso / non si va
              avanti / condizioni).
            </p>
          </div>
        </Fade>
      </LightSection>

      {/* ——— 10. CHI SIAMO E DOVE ——— */}
      <LightSection className="pt-0 sm:pt-0 lg:pt-0">
        <Fade className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow>Studio e sedi</Eyebrow>
          <h2 className="font-black tracking-[-0.02em] leading-[1.12] mb-5">
            Due sedi nel centro
            <br />
            <span className="text-blue-dark">di Torino.</span>
          </h2>
          <p className="text-blue-dark/70 text-base sm:text-lg leading-relaxed">
            Mobilitas è uno studio osteopatico con un team di oltre 20 professionisti. Il Percorso
            Posturale nasce da anni di lavoro su postura, sedentarietà e recupero della funzione —
            in studio e nella giornata vera.
          </p>
        </Fade>
        <div className="offerta-hscroll flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 max-w-5xl sm:mx-auto mb-4">
          {TEAM_PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="offerta-photo-frame relative aspect-[4/5] w-[min(62vw,260px)] sm:w-[240px] shrink-0 snap-center overflow-hidden rounded-[1.5rem]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="offerta-photo-zoom absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <p className="text-center mb-10">
          <TodoMark>foto team / studio</TodoMark>
        </p>
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-8">
          {MAPS.map((map) => (
            <div key={map.label} className="rounded-[1.75rem] overflow-hidden bg-white border border-blue-dark/10">
              <div className="px-5 py-3 text-sm font-semibold text-blue-dark">{map.label}</div>
              <iframe
                src={map.src}
                title={map.title}
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="block w-full h-[260px]"
              />
            </div>
          ))}
        </div>
        <p className="text-blue-dark/70 text-sm text-center max-w-xl mx-auto mb-6">
          Entrambe le sedi sono raggiungibili in metro: San Donato (Bernini o Principi d’Acaja),
          Crocetta (fermata Crocetta).
        </p>
        <div className="max-w-5xl mx-auto flex items-center gap-3 rounded-[1.5rem] bg-white/70 border border-blue-dark/10 px-5 py-4">
          <Car className="w-5 h-5 text-blue-dark shrink-0" strokeWidth={1.6} />
          <p className="text-sm text-blue-dark/70 m-0">
            Parcheggio vicino a entrambe le sedi · strisce blu
          </p>
        </div>
      </LightSection>

      {/* ——— 11. FAQ ——— */}
      <LightSection>
        <Fade className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow>Domande</Eyebrow>
          <h2 className="font-black tracking-[-0.02em] leading-[1.12]">
            Le domande che arrivano
            <br />
            <span className="text-blue-dark">prima di bloccare il posto.</span>
          </h2>
        </Fade>
        <div className="max-w-3xl mx-auto divide-y divide-blue-dark/10">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="offerta-faq-btn w-full text-left py-5 sm:py-6 flex items-start gap-4 bg-transparent cursor-pointer"
                >
                  <span className="flex-1 font-bold text-xl sm:text-2xl leading-snug text-blue-dark">
                    {item.question}
                  </span>
                  <span
                    className={`offerta-faq-plus grid place-items-center w-8 h-8 rounded-full border border-blue-dark/15 shrink-0 mt-1 transition-[transform,background-color,border-color,color] duration-300 ${
                      isOpen ? 'rotate-45 bg-green border-green text-blue-dark' : 'text-blue-dark/50'
                    }`}
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.2} />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <p className="pb-6 text-blue-dark/70 text-sm sm:text-base leading-relaxed pr-12">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </LightSection>

      {/* ——— 12. CTA FINALE ——— */}
      <DarkBlock>
        <Fade className="text-center max-w-3xl mx-auto">
          <Eyebrow dark>La scelta</Eyebrow>
          <h2 className="font-black tracking-[-0.02em] leading-[1.12] mb-12">
            Due strade. <span className="text-green">Una scelta.</span>
          </h2>
        </Fade>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
          <HoverCard
            as="div"
            className="rounded-[1.75rem] border border-cream/15 bg-[#041f45] p-6 sm:p-8 text-left"
          >
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/75 mb-2">
              Strada 1
            </p>
            <h3 className="relative font-black text-2xl text-cream mb-3 mt-0">
              Continuare a tamponare
            </h3>
            <p className="relative text-cream/80 text-sm leading-relaxed">
              Stretching, cuscino, «da oggi sto dritto», una seduta quando il nodo torna. Il
              sintomo si calma. La causa resta. Tra tre mesi, la stessa foto di profilo.
            </p>
          </HoverCard>
          <HoverCard
            as="div"
            tone="green"
            className="rounded-[1.75rem] bg-green p-6 sm:p-8 text-left text-blue-dark"
          >
            <LiquidBlob
              className="-right-10 -top-12"
              size={160}
              color="rgba(255, 255, 255, 0.45)"
              duration={8}
              drift="tr"
              blur={22}
            />
            <p className="relative z-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-dark mb-2">
              Strada 2
            </p>
            <h3 className="relative z-10 font-black text-2xl text-blue-dark mb-3 mt-0">
              Lavorare sulla causa
            </h3>
            <p className="relative z-10 text-blue-dark text-sm leading-relaxed">
              Valutare, sbloccare in studio, consolidare nelle 16 ore. Non è più veloce: è l’unica
              direzione in cui il cambiamento può tenersi.
            </p>
          </HoverCard>
        </div>
        <Fade className="text-center mb-10">
          <p className="text-cream/50 text-base line-through mb-1">1.000€</p>
          <p className="font-black text-cream text-6xl leading-none mb-3">500€</p>
          <p className="text-cream/75 text-sm mb-2">
            Valutazione + 3 trattamenti + 12 mesi di app · fino al {OFFER_DEADLINE_LABEL} ·{' '}
            {SPOTS_LEFT} posti
          </p>
          <p className="mb-8 flex justify-center gap-2">
            <TodoMark onDark>data</TodoMark>
            <TodoMark onDark>posti</TodoMark>
          </p>
          <CtaPair dark />
        </Fade>
        <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto pt-8 border-t border-cream/10">
          <a
            href={PHONE_HREF}
            className="offerta-link-row flex items-center gap-3 rounded-2xl px-4 py-3 text-cream/70 text-sm transition-colors duration-300"
          >
            <Phone className="w-4 h-4 text-green shrink-0" strokeWidth={1.8} />
            {PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="offerta-link-row flex items-center gap-3 rounded-2xl px-4 py-3 text-cream/70 text-sm transition-colors duration-300"
          >
            <Mail className="w-4 h-4 text-green shrink-0" strokeWidth={1.8} />
            {EMAIL}
          </a>
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-cream/70 text-sm">
            <Clock className="w-4 h-4 text-green shrink-0" strokeWidth={1.8} />
            {HOURS}
          </div>
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-cream/70 text-sm">
            <MapPin className="w-4 h-4 text-green shrink-0" strokeWidth={1.8} />
            Peyron 54 · Lamarmora 35
          </div>
        </div>
      </DarkBlock>

      <div className="h-6 sm:h-8" />

      {showSticky && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-[45] border-t border-blue-dark/10 bg-cream/95 backdrop-blur-md px-3 pt-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-3">
            <div className="shrink-0 leading-none">
              <p className="text-blue-dark/45 text-[11px] line-through">1.000€</p>
              <p className="font-black text-blue-dark text-2xl">500€</p>
            </div>
            <button
              type="button"
              onClick={openOfferta}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full font-black uppercase tracking-[0.06em] text-sm text-blue-dark bg-green px-4"
            >
              Blocca il tuo posto
              <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
            </button>
          </div>
        </div>
      )}

      <BookingPopup
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        pageContext={variant === 'uomo' ? 'offerta-postura-uomo' : 'offerta-postura-donna'}
        ctaType={bookingCtaType}
      />
    </div>
  )
}

export default OffertaPostura
