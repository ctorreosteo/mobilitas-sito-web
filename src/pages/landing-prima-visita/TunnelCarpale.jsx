import {
  Moon,
  Hand,
  Move,
  Droplets,
  Grip,
  Target,
  ArrowUpRight,
  Smartphone,
  ShieldOff,
  TriangleAlert,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'
import { prefetchHeroVideo } from '../../components/condition-landing/heroVideo'

// Landing "Tunnel carpale": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('TUNNEL_CARPALE_VSL')

const HERO_BENEFITS = [
  <>
    Dormi tutta la <strong>notte</strong> senza svegliarti a scuotere la{' '}
    <strong>mano</strong>
  </>,
  <>
    Riprenditi i <strong>gesti fini</strong>: bottoni, aghi, monete — le cose
    che facevi senza pensarci
  </>,
  <>
    Farti guardare <strong>collo</strong>,{' '}
    <strong>spalla</strong> e braccio, non solo il polso
  </>,
]

const PAIN_POINTS = [
  {
    icon: Hand,
    title: 'Formicolio a pollice, indice, medio e metà anulare',
    body: 'Sono le dita servite dal nervo mediano. Il mignolo di solito resta escluso — è il segno che distingue il tunnel carpale da altri problemi.',
  },
  {
    icon: Moon,
    title: 'Risvegli notturni con la mano addormentata',
    body: 'Il sintomo più tipico in assoluto: succede quasi sempre nella seconda metà della notte.',
  },
  {
    icon: Move,
    title: 'Sollievo scuotendo la mano',
    body: 'Muoverla, scuoterla o lasciarla penzolare fuori dal letto attenua il formicolio — è un segno molto caratteristico.',
  },
  {
    icon: Droplets,
    title: 'Sensazione di mano gonfia al risveglio',
    body: 'La mano sembra gonfia anche quando visibilmente non lo è.',
  },
  {
    icon: Grip,
    title: 'Perdita di forza nella presa',
    body: 'Stringere diventa più debole, e ti capita di far cadere oggetti senza volerlo.',
  },
  {
    icon: Target,
    title: 'Difficoltà nei gesti fini',
    body: 'Bottoni, cerniere, aghi, monete: la precisione delle dita si riduce.',
  },
  {
    icon: ArrowUpRight,
    title: 'Dolore o formicolio che risale lungo l’avambraccio',
    body: 'Non resta solo nella mano: a volte sale verso il gomito o anche oltre.',
  },
  {
    icon: Smartphone,
    title: 'Peggiora tenendo il polso piegato a lungo',
    body: 'Guidare, tenere il telefono, leggere un libro, dormire con il polso flesso: tutte posizioni che scatenano i sintomi.',
  },
  {
    icon: ShieldOff,
    title: 'Ridotta sensibilità nei polpastrelli',
    body: 'Le dita sembrano meno sensibili al tatto, come se fossero coperte da un guanto sottile.',
  },
  {
    icon: TriangleAlert,
    title: 'Nei casi avanzati, dimagrimento del muscolo alla base del pollice',
    body: 'La zona carnosa sotto il pollice appare più piatta rispetto all’altra mano — segno che il problema va avanti da tempo.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Il nervo non nasce nel polso',
    b: 'Parte dal collo e attraversa spalla, gomito e avambraccio prima di entrare nel tunnel carpale.',
  },
  {
    k: '02',
    t: 'Il tunnel è solo l’ultima porta',
    b: 'Se il nervo è già “tirato” più in alto — collo rigido, spalla chiusa, muscoli dell’avambraccio contratti — nel tunnel basta poco per farlo soffrire.',
  },
  {
    k: '03',
    t: 'Guardare solo il polso non basta',
    b: 'È guardare l’ultima stazione di un treno partito molto prima. Ecco perché il tutore aiuta la notte ma non risolve il viaggio.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/collo_cervicale-e-spalle-supino_04_orizzontale',
    imageClassName: 'object-[0%_50%]',
    alt: 'Osteopata che tratta collo e spalle di una paziente supina',
    title: 'Tutore notturno',
    body: 'Aiuta davvero i sintomi della notte, ma nessuno ti ha spiegato perché il problema è nato.',
  },
  {
    image: '/trattamenti/spalla_scapola-decubito-laterale_06_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di scapola e spalla di una paziente sdraiata su un fianco',
    title: 'Antinfiammatori e FANS',
    body: 'Riducono il fastidio, senza modificare ciò che comprime o irrita il nervo. I FANS sono molto usati, con efficacia limitata perché il problema è compressivo.',
  },
  {
    image: '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Valutazione della spalla in piedi di un paziente',
    title: 'Elettromiografia',
    body: 'Esame fondamentale per capire quanto il nervo è sofferente e guidare la scelta chirurgica. Non dice dove il problema sia iniziato.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_18_orizzontale',
    imageClassName: 'object-[18%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    title: 'Riposo dal gesto ripetuto',
    body: 'Il problema è che quel gesto è il tuo lavoro: mouse, tastiera, forbici, volante — non puoi smettere.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_25_orizzontale',
    imageClassName: 'object-[12%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    title: 'Infiltrazione di cortisone e integratori',
    body: 'Sollievo reale ma temporaneo, con indicazioni precise. Gli integratori per il nervo sono molto prescritti, con benefici modesti.',
  },
  {
    image: '/trattamenti/spalla_scapola-decubito-laterale_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di scapola e spalla di un paziente sdraiato su un fianco',
    title: 'Intervento chirurgico',
    body: 'Efficace su indicazione precisa, e proposto spesso molto presto: ecografia, radiografia e risonanza restano riferimenti medici — prima vale la pena escludere il resto della catena.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Smetti di svegliarti alle tre a scuotere la{' '}
    <strong>mano</strong> fuori dal letto
  </>,
  <>
    Riprenditi i <strong>gesti fini</strong> che facevi senza pensarci
  </>,
  <>
    Vai oltre il <strong>tutore notturno</strong>: lavoriamo sul motivo per
    cui il nervo arriva al tunnel già tirato
  </>,
  <>
    Seguiamo il percorso del nervo da <strong>collo</strong> a mano, non solo
    il polso
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
    body: 'Seguiamo il percorso del nervo dal collo alla mano, con esami alla mano e valutazione di collo, spalla, avambraccio e polso.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate: collo e prima costola, spalla e torace, avambraccio e scorrimento del nervo.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su mouse, presa, posizioni notturne del polso e postazione, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'elettromiografia',
    question: (
      <>
        Ho fatto l’<strong>elettromiografia</strong> e conferma il tunnel: perché venire da voi?
      </>
    ),
    answer: (
      <>
        Dice che lì il nervo soffre, ed è vero. Non dice però perché ci arriva già in difficoltà:
        quello si valuta lungo tutto il percorso dal collo alla mano. Noi lavoriamo su quella
        parte — in affiancamento al medico, non al posto dell’elettromiografia.
      </>
    ),
  },
  {
    id: 'intervento',
    question: (
      <>
        Mi hanno già proposto l’<strong>intervento</strong>: ha senso provare altro prima?
      </>
    ),
    answer: (
      <>
        L’intervento ha indicazioni precise che decide il medico, e nei casi giusti funziona. Se
        c’è margine, vale la pena escludere prima il resto del percorso del nervo — collo, spalla
        e avambraccio inclusi. Le due strade non si escludono: si valutano insieme.
      </>
    ),
  },
  {
    id: 'tutore',
    question: (
      <>
        Uso già il <strong>tutore notturno</strong>: perché non basta?
      </>
    ),
    answer: (
      <>
        Continua a usarlo: gestisce la notte, ed è utile. Ma il tutore non spiega perché il nervo
        arriva al tunnel già tirato. Noi lavoriamo su collo, spalla e avambraccio — l’altra metà
        del quadro, in parallelo a ciò che stai già facendo.
      </>
    ),
  },
  {
    id: 'aspettare',
    question: (
      <>
        Ho paura di aspettare troppo e <strong>rovinare il nervo</strong>: è un rischio reale?
      </>
    ),
    answer: (
      <>
        Giusto preoccuparsi: per questo la valutazione va fatta ora, con i tuoi esami alla mano.
        Se il quadro è avanzato te lo diciamo chiaramente; se c’è margine, si lavora subito sul
        percorso del nervo, senza rimandare all’infinito.
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
        In presenza di muscolo alla base del pollice visibilmente più piatto dell’altra mano,
        perdita di sensibilità completa o forza in caduta rapida, sintomi a entrambe le mani
        comparsi velocemente, trauma recente al polso con dolore e gonfiore, oppure formicolii
        insieme a forte dolore al collo che scende, la priorità è la valutazione medica tempestiva.
        Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'tunnel-carpale',
  heroVideo,
  videoTitle: 'Video trattamento tunnel-carpale - Mobilitas Torino',
  images: {
    hero: '/trattamenti/spalla_scapola-decubito-laterale_05_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/collo_presa-cervicale-supino_21_orizzontale',
    bandClassName: 'object-[30%_65%]',
    final: '/trattamenti/collo_cervicale-e-spalle-supino_03_orizzontale',
    finalClassName: 'object-[10%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Tunnel carpale',
    title: { main: 'Soffri di tunnel carpale e ti dicono che è solo il polso?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>collo</strong>,{' '}
        <strong>spalla</strong> e{' '}
        <strong>percorso del nervo</strong> per ridurre l’impatto
        del tunnel carpale su sonno, lavoro e gesti quotidiani.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'Il tunnel carpale non ti limita solo nella mano.', accent: 'Ti limita nel sonno, nel lavoro e nei gesti fini.' },
    intro: (
      <>
        Ignorarlo non lo fa sparire: lo normalizza. E più lo normalizzi, più ti toglie{' '}
        <strong>sonno</strong>,{' '}
        <strong>forza nella presa</strong> e{' '}
        <strong>serenità</strong> nei gesti di ogni giorno.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Il tutore conta</strong>.{' '}
        <strong>I farmaci contano</strong>. Ma non sono
        l’unico livello del problema: il{' '}
        <strong>percorso del nervo</strong> può mantenere
        attivi i sintomi anche quando il polso è già protetto.
      </>
    ),
    emblem: {
      variant: 'chain',
      labels: [{ text: 'COLLO' }, { text: 'SPALLA' }, { text: 'AVAMBRACCIO' }, { text: 'TUNNEL', accent: true }],
      caption: 'Il nervo che formicola nella mano parte dal collo: il tunnel è solo l’ultima porta.',
    },
    narrative: (
      <>
        Il nervo che formicola nella mano non nasce nel polso: parte dal{' '}
        <strong>collo</strong> e attraversa spalla,
        gomito e avambraccio prima di entrare nel tunnel. Se il nervo è già “tirato” più in
        alto, nel tunnel basta poco per farlo soffrire — ecco perché il tutore aiuta la notte
        ma non risolve il viaggio.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre basta il tutore.', accent: 'A volte serve seguire il nervo fino al collo.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'su tutto il percorso del nervo.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> del tunnel carpale sulla tua
          vita quotidiana, con un percorso serio e misurabile.
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
        <strong>sonno</strong>, più{' '}
        <strong>forza nella presa</strong> e meno rinunce
        quotidiane. Inizia con un consulto telefonico o la prima visita.
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
        e iniziamo a costruire un percorso concreto per ridurre l’impatto del tunnel carpale sulla
        tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'tunnel-carpale',
    path: '/tunnel-carpale',
    ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_04_orizzontale.jpg',
    title: 'Osteopata Tunnel Carpale Torino | Nervo Mediano, Collo e Mano | Mobilitas',
    description:
      'Osteopata per tunnel carpale a Torino (San Donato e Crocetta). Lavoriamo sul percorso del nervo mediano da collo a mano, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata tunnel carpale torino',
      'tunnel carpale torino',
      'osteopatia tunnel carpale',
      'trattamento tunnel carpale osteopata',
      'nervo mediano osteopata',
      'formicolio mano osteopata torino',
      'elettromiografia tunnel carpale',
      'tutore notturno tunnel carpale',
      'formicolio notturno mano',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per tunnel carpale – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Tunnel Carpale Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per tunnel carpale – Mobilitas Torino',
    condition: {
      name: 'Tunnel carpale',
      alternateName: [
        'Sindrome del tunnel carpale',
        'Compressione del nervo mediano',
        'Formicolio notturno alla mano',
        'Neuropatia compressiva del polso',
      ],
      anatomy: 'Nervo mediano, polso e mano',
    },
    therapy: {
      name: 'Trattamento osteopatico per tunnel carpale',
      description:
        'Approccio osteopatico integrato sul percorso del nervo mediano da collo a mano, in affiancamento al percorso medico ortopedico e neurologico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per tunnel carpale',
      },
    },
    breadcrumbName: 'Tunnel carpale',
    faq: [
      {
        name: "Ho fatto l'elettromiografia e conferma il tunnel: perché venire da voi?",
        text: "Dice che lì il nervo soffre, ed è vero. Non dice però perché ci arriva già in difficoltà: quello si valuta lungo tutto il percorso dal collo alla mano. Noi lavoriamo su quella parte — in affiancamento al medico, non al posto dell'elettromiografia.",
      },
      {
        name: "Mi hanno già proposto l'intervento: ha senso provare altro prima?",
        text: "L'intervento ha indicazioni precise che decide il medico, e nei casi giusti funziona. Se c'è margine, vale la pena escludere prima il resto del percorso del nervo — collo, spalla e avambraccio inclusi. Le due strade non si escludono: si valutano insieme.",
      },
      {
        name: 'Uso già il tutore notturno: perché non basta?',
        text: "Continua a usarlo: gestisce la notte, ed è utile. Ma il tutore non spiega perché il nervo arriva al tunnel già tirato. Noi lavoriamo su collo, spalla e avambraccio — l'altra metà del quadro, in parallelo a ciò che stai già facendo.",
      },
      {
        name: 'Ho paura di aspettare troppo e rovinare il nervo: è un rischio reale?',
        text: "Giusto preoccuparsi: per questo la valutazione va fatta ora, con i tuoi esami alla mano. Se il quadro è avanzato te lo diciamo chiaramente; se c'è margine, si lavora subito sul percorso del nervo, senza rimandare all'infinito.",
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: "In presenza di muscolo alla base del pollice visibilmente più piatto dell'altra mano, perdita di sensibilità completa o forza in caduta rapida, sintomi a entrambe le mani comparsi velocemente, trauma recente al polso con dolore e gonfiore, oppure formicolii insieme a forte dolore al collo che scende, la priorità è la valutazione medica tempestiva.",
      },
    ],
  },
}

export default function TunnelCarpale() {
  return <PrimaVisitaLanding page={PAGE} />
}
