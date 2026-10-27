import {
  AlarmClock,
  CircleAlert,
  Volume2,
  Gem,
  Unlock,
  Maximize2,
  Utensils,
  PersonStanding,
  Brain,
  Moon,
} from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'

// Landing "Bruxismo": solo contenuti e dati. Struttura, grafica e logica (video, popup di
// prenotazione, recensioni, SEO) stanno in components/condition-landing.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('BRUXISMO_VSL')

const HERO_BENEFITS = [
  <>
    Smetti di svegliarti con la <strong>mandibola</strong> stanca e le{' '}
    <strong>tempie</strong> che pulsano
  </>,
  <>
    Riduci la <strong>tensione</strong> che il{' '}
    <strong>bite</strong> da solo non toglie
  </>,
  <>
    Torna a <strong>riposare</strong> davvero, con meno{' '}
    <strong>rinunce</strong> al risveglio
  </>,
]

const PAIN_POINTS = [
  {
    icon: AlarmClock,
    title: 'Dolore o rigidità alla mascella al risveglio',
    body: 'La zona ai lati del viso è indolenzita appena sveglio, come dopo uno sforzo.',
  },
  {
    icon: CircleAlert,
    title: 'Mal di testa mattutino sulle tempie',
    body: 'Una pressione ai lati della testa che c’è già quando apri gli occhi, e spesso si attenua durante la mattinata.',
  },
  {
    icon: Volume2,
    title: 'Rumore di digrignamento notturno',
    body: 'Chi dorme accanto a te sente stridere i denti — tu non te ne accorgi.',
  },
  {
    icon: Gem,
    title: 'Denti consumati, scheggiati o più sensibili',
    body: 'Lo smalto si assottiglia, i denti diventano sensibili al caldo e al freddo, e il dentista nota superfici appiattite.',
  },
  {
    icon: Unlock,
    title: 'Click, scrocchio o blocco della mandibola',
    body: 'Quando apri o chiudi la bocca senti un rumore, e a volte la mandibola si blocca o si apre storta.',
  },
  {
    icon: Maximize2,
    title: 'Muscoli ai lati del viso ingrossati',
    body: 'I masseteri, i muscoli della masticazione, si sviluppano per il troppo lavoro e la mascella appare più squadrata.',
  },
  {
    icon: Utensils,
    title: 'Dolore o stanchezza masticando',
    body: 'Mangiare cibi duri o gommosi affatica rapidamente, e a volte fa male.',
  },
  {
    icon: PersonStanding,
    title: 'Tensione a collo e spalle',
    body: 'La contrattura non resta solo nella mascella: scende lungo il collo e arriva alle spalle.',
  },
  {
    icon: Brain,
    title: 'Serramento diurno inconsapevole',
    body: 'Ti accorgi di avere i denti stretti mentre lavori, guidi o ti concentri, senza averlo deciso.',
  },
  {
    icon: Moon,
    title: 'Sonno poco riposante',
    body: 'Dormi le ore giuste ma ti svegli stanco, perché il corpo non si è mai davvero rilassato durante la notte.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'La mandibola diventa la valvola di sfogo',
    b: 'Stringere i denti è il modo che il corpo ha trovato per scaricare la pressione: la mandibola lavora al posto di altri sistemi.',
  },
  {
    k: '02',
    t: 'Di notte il freno è spento',
    b: 'Di giorno un po’ ti controlli; di notte il muscolo lavora per ore — per questo ti svegli con la mandibola stanca e la testa che stringe.',
  },
  {
    k: '03',
    t: 'Si lavora sul muscolo che spinge',
    b: 'Il bite fa il suo mestiere sui denti. Sul muscolo — e sul perché spinge — spesso nessuno ha ancora lavorato.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/atm_mandibola-con-guanto_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento della mandibola (ATM) di una paziente',
    title: 'Il bite che costa e non risolve tutto',
    body: 'Protegge i denti dallo scontro, ed è utile. Ma la mascella può far male uguale: protegge lo smalto, non spiega perché stringi.',
  },
  {
    image: '/trattamenti/atm_presa-mandibolare-esterna_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Presa esterna sulla mandibola di una paziente per l’ATM',
    title: '“È lo stress, devi rilassarti”',
    body: 'Contiene del vero, e non è un’indicazione: nessuno ti spiega come si dice a un muscolo di mollare mentre dormi.',
  },
  {
    image: '/trattamenti/atm_intraorale_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento intraorale dell’articolazione temporo-mandibolare',
    title: 'Visita odontoiatrica e gnatologica',
    body: 'Passaggi necessari sul danno e sull’occlusione. Collo, postura e sistema di allerta restano spesso fuori dal quadro.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_18_orizzontale',
    imageClassName: 'object-[18%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    title: 'Farmaci utili, ma non sulla causa',
    body: 'Miorilassanti, FANS o benzodiazepine a basso dosaggio possono spezzare dolore e contrattura. Non cambiano il motivo per cui stringi di notte.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_25_orizzontale',
    imageClassName: 'object-[12%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    title: 'Botulino e ricostruzioni: pezzi del puzzle',
    body: 'La tossina riduce la forza del muscolo; corone e ricostruzioni riparano il danno già fatto. Restano parallele al lavoro sul perché spingi.',
  },
  {
    image: '/trattamenti/atm_intraorale-lingua_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento intraorale di lingua e mandibola',
    title: 'Approccio integrato: dentista + osteopatico',
    body: 'Polisonnografia, panoramica, RM dell’ATM e valutazione gnatologica restano riferimenti clinici. Noi lavoriamo su muscoli, collo e pressione da scaricare.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Sciogliamo <strong>masseteri</strong> e tensione che il bite da solo
    non toglie
  </>,
  <>
    Torni a un <strong>sonno</strong> più riposante, senza{' '}
    <strong>tempie</strong> che pulsano
  </>,
  <>
    Torni a masticare e parlare con più <strong>scioltezza</strong>, anche
    di giorno
  </>,
  <>
    Non sostituiamo il dentista: lavoriamo su ciò che il{' '}
    <strong>bite</strong> non risolve da solo
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
    body: 'Analizziamo masseteri, mandibola, collo e dinamica corporea per individuare fattori che possono alimentare il serramento.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su respiro, posture e routine serale, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'bite',
    question: (
      <>
        Ho già il <strong>bite</strong>: perché non basta?
      </>
    ),
    answer: (
      <>
        Il bite protegge i denti dallo scontro, e va tenuto. Ma il muscolo dietro continua a
        spingere: è l’altra metà del lavoro. Noi lavoriamo su masseteri, mandibola e collo — in
        affiancamento al dentista, non al posto suo.
      </>
    ),
  },
  {
    id: 'denti-a-posto',
    question: (
      <>
        Se i <strong>denti</strong> sono a posto, cosa c’entra l’<em>osteopatia</em>?
      </>
    ),
    answer: (
      <>
        Ottimo: il danno è sotto controllo. Resta il motivo per cui stringi, che non è nei denti:
        è nei muscoli e nel sistema di allerta. Lì lavoriamo noi, in parallelo al percorso
        odontoiatrico.
      </>
    ),
  },
  {
    id: 'controllo-sonno',
    question: (
      <>
        Come faccio a controllarmi mentre <strong>dormo</strong>?
      </>
    ),
    answer: (
      <>
        Non puoi, ed è il punto: non si lavora sulla volontà. Si lavora sul muscolo e sulla
        pressione che scarichi di notte, così il corpo ha meno bisogno di stringere.
      </>
    ),
  },
  {
    id: 'botulino',
    question: (
      <>
        Mi hanno proposto il <strong>botulino</strong>: ha senso?
      </>
    ),
    answer: (
      <>
        Ha le sue indicazioni, su prescrizione specialistica: indebolisce il muscolo. Noi
        lavoriamo sul perché spinge. Le due strade si possono anche valutare insieme, senza
        sostituirsi.
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
        In presenza di mandibola bloccata che non si apre o non si chiude, dolore con gonfiore
        caldo davanti all’orecchio e febbre, denti che si fratturano ripetutamente, dolore al viso
        con perdita di sensibilità o formicolii, oppure russamento forte con pause del respiro
        riferite dal partner, la priorità è la valutazione medica o dentistica tempestiva. Noi
        interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'bruxismo',
  heroVideo,
  videoTitle: 'Video trattamento bruxismo - Mobilitas Torino',
  images: {
    hero: '/trattamenti/atm_mandibola-con-guanto_02_orizzontale',
    heroClassName: 'object-[50%_70%]',
    band: '/trattamenti/atm_intraorale_01_orizzontale',
    bandClassName: 'object-[55%_70%]',
    final: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
    finalClassName: 'object-[10%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Bruxismo',
    title: { main: 'Soffri di bruxismo e ti svegli con la mandibola bloccata?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>masseteri</strong>,{' '}
        <strong>mandibola</strong> e{' '}
        <strong>collo</strong> per ridurre l’impatto del
        bruxismo su sonno, denti e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'Il bruxismo non è solo un problema di denti.', accent: 'Ti limita nel riposo e al risveglio.' },
    intro: (
      <>
        Ignorarlo non lo fa sparire: lo normalizza. E più lo normalizzi, più ti toglie{' '}
        <strong>riposo</strong>,{' '}
        <strong>serenità al risveglio</strong> e{' '}
        <strong>scioltezza</strong> a collo e mandibola.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Il bite conta</strong>.{' '}
        <strong>Il dentista conta</strong>. Ma non sono
        l’unico livello del problema: i{' '}
        <strong>masseteri</strong> possono mantenere attivo
        il serramento anche quando i denti sono già protetti.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Giorno' }, { text: 'Notte' }, { text: 'Masseteri', accent: true }, { text: 'Pressione' }],
      caption: 'Il bite protegge i denti. Il muscolo può continuare a stringere.',
    },
    narrative: (
      <>
        Stringere i denti è il modo che il corpo ha trovato per scaricare la{' '}
        <strong>pressione</strong>: la{' '}
        <strong>mandibola</strong> è la sua valvola di
        sfogo. Di notte il freno è spento — e per questo ti svegli con la mascella stanca e
        la testa che stringe.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre basta il bite.', accent: 'A volte serve lavorare sul muscolo che continua a stringere.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> del serramento su sonno,
          mandibola e sulla vita quotidiana, con un percorso serio e misurabile.
        </>
      ),
    },
    cards: BENEFITS,
    checklist: AFTER_IMAGES_BENEFITS,
  },
  reviews: {
    closing: (
      <>
        Se queste storie ti somigliano, il prossimo passo può restituirti più{' '}
        <strong>riposo</strong>, più{' '}
        <strong>scioltezza</strong> e meno tensione al
        risveglio. Inizia con un consulto telefonico o la prima visita.
      </>
    ),
  },
  visit: {
    steps: VISIT_STEPS,
  },
  faq: {
    items: FAQ_ITEMS,
    closing: (
      <>
        Se anche una sola di queste risposte ti rappresenta, non restare fermo in una gestione
        solo “al bisogno”.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire un percorso concreto per lavorare sul perché stringi — oltre al
        bite.
      </>
    ),
  },
  seo: {
    dataPage: 'bruxismo',
    path: '/bruxismo',
    ogImage: '/trattamenti/og/atm_mandibola-con-guanto_01_orizzontale.jpg',
    title: 'Osteopata Bruxismo Torino | Serramento, Mandibola e Masseteri | Mobilitas',
    description:
      'Osteopata per bruxismo e serramento a Torino (San Donato e Crocetta). Lavoriamo su masseteri, mandibola, collo e sistema di allerta, in affiancamento a dentista e gnatologo. Prima visita 49€.',
    keywords: [
      'osteopata bruxismo torino',
      'bruxismo torino',
      'osteopatia bruxismo',
      'trattamento bruxismo osteopata',
      'serramento denti osteopata',
      'digrignamento denti torino',
      'masseteri osteopata torino',
      'mandibola bloccata osteopata',
      'bite e osteopatia',
      'ATM osteopata torino',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per bruxismo e serramento – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Bruxismo Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per bruxismo – Mobilitas Torino',
    condition: {
      name: 'Bruxismo e serramento mandibolare',
      alternateName: [
        'Bruxismo',
        'Serramento dei denti',
        'Digrignamento notturno',
        'Bruxismo diurno',
        'Contrattura dei masseteri',
        'Disfunzione ATM',
      ],
      anatomy: 'Mandibola, masseteri, ATM e collo',
    },
    therapy: {
      name: 'Trattamento osteopatico per bruxismo e serramento',
      description:
        'Approccio osteopatico integrato su masseteri, mandibola, collo, base del cranio e sistema di allerta, in affiancamento a dentista e gnatologo.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per bruxismo',
      },
    },
    breadcrumbName: 'Bruxismo',
    faq: [
      {
        name: 'Ho già il bite: perché non basta?',
        text: 'Il bite protegge i denti dallo scontro, e va tenuto. Ma il muscolo dietro continua a spingere: è l’altra metà del lavoro. Noi lavoriamo su masseteri, mandibola e collo — in affiancamento al dentista, non al posto suo.',
      },
      {
        name: 'Se i denti sono a posto, cosa c’entra l’osteopatia?',
        text: 'Ottimo: il danno è sotto controllo. Resta il motivo per cui stringi, che non è nei denti: è nei muscoli e nel sistema di allerta. Lì lavoriamo noi, in parallelo al percorso odontoiatrico.',
      },
      {
        name: 'Come faccio a controllarmi mentre dormo?',
        text: 'Non puoi, ed è il punto: non si lavora sulla volontà. Si lavora sul muscolo e sulla pressione che scarichi di notte, così il corpo ha meno bisogno di stringere.',
      },
      {
        name: 'Mi hanno proposto il botulino: ha senso?',
        text: 'Ha le sue indicazioni, su prescrizione specialistica: indebolisce il muscolo. Noi lavoriamo sul perché spinge. Le due strade si possono anche valutare insieme, senza sostituirsi.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'In presenza di mandibola bloccata che non si apre o non si chiude, dolore con gonfiore caldo davanti all’orecchio e febbre, denti che si fratturano ripetutamente, dolore al viso con perdita di sensibilità o formicolii, oppure russamento forte con pause del respiro riferite dal partner, la priorità è la valutazione medica o dentistica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function Bruxismo() {
  return <ConditionLanding page={PAGE} />
}
