import {
  Moon,
  Hand,
  Grip,
  Target,
  ArrowDown,
  Handshake,
  Sunrise,
  RefreshCw,
  Maximize2,
  RotateCcw,
} from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'

// Landing "Epicondilite": solo contenuti e dati. Struttura, grafica e logica (video, popup di
// prenotazione, recensioni, SEO) stanno in components/condition-landing.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('EPICONDILITE_VSL')

const HERO_BENEFITS = [
  <>
    Riprendere una <strong>tazzina</strong> senza vedere le stelle
  </>,
  <>
    Capire perché un mese di <strong>riposo</strong> non è bastato
  </>,
  <>
    Farti guardare <strong>spalla</strong>,{' '}
    <strong>collo</strong> e postura, non solo il gomito
  </>,
]

const PAIN_POINTS = [
  {
    icon: Target,
    title: 'Dolore sulla parte esterna del gomito',
    body: 'Un punto preciso sull’osso sporgente laterale, che fa male se ci premi sopra con un dito.',
  },
  {
    icon: ArrowDown,
    title: 'Dolore che scende lungo l’avambraccio',
    body: 'Non resta solo sul gomito: si allunga verso il polso lungo la parte esterna del braccio.',
  },
  {
    icon: Grip,
    title: 'Dolore afferrando o stringendo',
    body: 'Prendere una tazza, aprire una bottiglia, girare una chiave o una maniglia: sono i gesti che lo scatenano di più.',
  },
  {
    icon: Hand,
    title: 'Debolezza nella presa',
    body: 'La mano perde forza e ti capita di far cadere oggetti leggeri senza volerlo.',
  },
  {
    icon: RotateCcw,
    title: 'Peggiora sollevando il braccio a palmo in giù',
    body: 'Alzare un oggetto con il dorso della mano verso l’alto fa molto più male che farlo a palmo in su.',
  },
  {
    icon: Handshake,
    title: 'Dolore stringendo la mano a qualcuno',
    body: 'Un gesto normale che diventa fastidioso o doloroso.',
  },
  {
    icon: Sunrise,
    title: 'Rigidità del gomito al mattino',
    body: 'Il braccio è indolenzito e rigido appena sveglio, e ci vuole un po’ prima di scioglierlo.',
  },
  {
    icon: RefreshCw,
    title: 'Peggiora con i gesti ripetuti',
    body: 'Cacciavite, mouse, forbici, tastiera, racchetta: più ripeti lo stesso movimento, più il dolore sale nell’arco della giornata.',
  },
  {
    icon: Moon,
    title: 'Il dolore c’è anche a riposo, nei casi avanzati',
    body: 'All’inizio fa male solo quando usi il braccio, poi inizia a farsi sentire anche la sera, da fermo.',
  },
  {
    icon: Maximize2,
    title: 'Fastidio a distendere completamente il braccio',
    body: 'Allungare il gomito fino in fondo tira e dà fastidio, soprattutto se contemporaneamente ruoti il polso.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Il gomito paga il lavoro degli altri',
    b: 'I muscoli che fanno male lì sono quelli che muovono polso e dita: se la spalla è rigida e la presa è sempre uguale, lavorano il doppio.',
  },
  {
    k: '02',
    t: 'La corda sul gomito si sfianca',
    b: 'Mouse, cacciavite, racchetta: lo stesso gesto ripete il sovraccarico, e il tendine sul punto esterno del gomito paga il conto.',
  },
  {
    k: '03',
    t: 'Si sente lì, ma non comincia lì',
    b: 'Ecco perché un mese di riposo non è servito: al ritorno, spalla e gesto erano identici, e il conto è tornato ad arrivare nello stesso punto.',
  },
]

const BENEFITS = [
  {
    image: '/epicondilite-tunnel/epicondilite-tunnel.02.png',
    imageClassName: 'object-[45%_50%]',
    alt: 'Valutazione osteopatica di spalla e gomito per l’epicondilite',
    title: 'Riposo',
    body: 'Un mese fermo e dopo tre giorni identico: la prova che il problema non era il quanto usi il braccio, ma il come.',
  },
  {
    image: '/epicondilite-tunnel/epicondilite-tunnel.03.png',
    imageClassName: 'object-[55%_45%]',
    alt: 'Approccio osteopatico in affiancamento agli antinfiammatori per l’epicondilite',
    title: 'Antinfiammatori e FANS',
    body: 'Abbassano il dolore, senza toccare il sovraccarico. FANS orali (ibuprofene, ketoprofene, diclofenac) e topici (gel, cerotti) sono il primo tentativo nella quasi totalità dei casi.',
  },
  {
    image: '/epicondilite-tunnel/epicondilite-tunnel.08.JPG',
    imageClassName: 'object-[42%_40%]',
    alt: 'Lavoro osteopatico oltre fascia e tutore per l’epicondilite',
    title: 'Fascia epicondiloidea o tutore',
    body: 'Sollievo finché lo porti, da capo appena lo togli. Ghiaccio e cerotti medicati gestiscono il fastidio, non la causa.',
  },
  {
    image: '/epicondilite-tunnel/epicondilite-tunnel.01.png',
    imageClassName: 'object-[58%_40%]',
    alt: 'Trattamento osteopatico su avambraccio e catena del braccio',
    title: 'Fisioterapia ed esercizi eccentrici',
    body: 'Tra gli approcci più solidi, ma centrati sul gomito: spalla, collo e postura restano spesso fuori. Onde d’urto e tecarterapia possono stimolare il tessuto, però lavorano dove il conto arriva, non dove nasce.',
  },
  {
    image: '/epicondilite-tunnel/epicondilite-tunnel.04.JPG',
    imageClassName: 'object-[52%_48%]',
    alt: 'Percorso osteopatico oltre le infiltrazioni per l’epicondilite',
    title: 'Infiltrazione di cortisone',
    body: 'Sollievo reale per qualche settimana, e poi il ritorno al punto di partenza. Non ripetibile. PRP e terapie rigenerative mirano al tessuto, senza modificare il gesto che lo sovraccarica.',
  },
  {
    image: '/epicondilite-tunnel/epicondilite-tunnel.06.JPG',
    imageClassName: 'object-[48%_42%]',
    alt: 'Approccio osteopatico in affiancamento a ecografia e percorso medico',
    title: 'Ecografia e valutazione chirurgica',
    body: 'L’ecografia mostra lo stato del tendine, non il motivo per cui ci è arrivato. Radiografia, risonanza ed elettromiografia restano riferimenti medici; la chirurgia è ultima opzione, dopo mesi di percorso conservativo.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Riprendere una <strong>tazzina</strong> senza vedere le stelle
  </>,
  <>
    Capire perché il <strong>riposo</strong> non è bastato: il problema era
    come usi il braccio
  </>,
  <>
    Uscire dal ciclo delle <strong>infiltrazioni</strong> e smettere di
    dipendere dal tutore
  </>,
  <>
    Farti guardare <strong>spalla</strong>, collo e postura, non solo il
    gomito
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
    body: 'Valutiamo il tuo gesto quotidiano e tutta la catena spalla-gomito-polso, con attenzione a collo e postura.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo su avambraccio, sblocco di spalla e polso, collo e postura, con tecniche dolci sulla zona del gomito nel rispetto della fase del tendine.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo un piano di carico graduale: il tendine si rinforza lavorando bene, non stando fermo — da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'riposo',
    question: (
      <>
        Sono stato fermo un mese e il dolore è tornato <strong>identico</strong>: perché?
      </>
    ),
    answer: (
      <>
        Perché il problema non era quanto usavi il braccio, ma <strong>come</strong>. Al ritorno,
        spalla e gesto erano gli stessi — e il conto è tornato ad arrivare nello stesso punto. Su
        quello nessuno ha ancora lavorato: noi valutiamo la catena spalla-gomito-polso e il gesto
        quotidiano, in <em>affiancamento</em> al medico, non al posto del riposo o dei farmaci.
      </>
    ),
  },
  {
    id: 'infiltrazione',
    question: (
      <>
        Ho fatto l’<strong>infiltrazione</strong>: sollievo e poi da capo. Ha senso provare altro?
      </>
    ),
    answer: (
      <>
        Spesso sì, se il sollievo è reale ma temporaneo. L’infiltrazione ha spento l’incendio, non
        chi lo appicca: la spalla rigida e il gesto sono ancora lì. Noi lavoriamo su quella parte —
        in parallelo a ciò che stai già facendo, senza sostituire le indicazioni del medico su
        ripetibilità e tempistiche.
      </>
    ),
  },
  {
    id: 'fascia',
    question: (
      <>
        Porto la <strong>fascia</strong> o il tutore da mesi: perché non basta?
      </>
    ),
    answer: (
      <>
        Continua a usarli se ti danno sollievo: gestiscono il sovraccarico mentre li hai addosso.
        Ma confermano anche che il tendine è sotto pressione — non spiegano perché. Noi lavoriamo
        sul motivo per cui il carico arriva tutto sul gomito: spalla, collo, postura e gesto.
      </>
    ),
  },
  {
    id: 'lavoro',
    question: (
      <>
        Uso il braccio per <strong>lavoro</strong>: non posso fermarmi. Ha senso venire da voi?
      </>
    ),
    answer: (
      <>
        Sì, ed è proprio il caso più frequente. Non serve smettere: lavoriamo su spalla, catena e
        gesto — mouse, cacciavite, forbici, racchetta — perché il tuo lavoro smetta di arrivare
        tutto sul gomito. L’obiettivo è reggere la giornata, non evitarla.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che l’<strong>epicondilite</strong> passa del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. L’obiettivo onesto è capire perché il gomito paga il lavoro
        degli altri e ridurre l’impatto sulla presa, sul lavoro e sullo sport: meno dolore, più
        forza, meno dipendenza da fascia e infiltrazioni. Quanto si può migliorare nel tuo caso si
        capisce solo valutandoti — nessuna promessa facile, solo chiarezza.
      </>
    ),
  },
  {
    id: 'red-flags',
    question: (
      <>
        Quando è necessario prima un controllo medico urgente?
      </>
    ),
    answer: (
      <>
        In presenza di dolore improvviso con «schiocco» e perdita di forza netta, gomito caldo,
        rosso e gonfio con febbre, formicolii o mano che si addormenta insieme al dolore, dolore
        notturno costante che cresce, oppure trauma recente al gomito con dolore e blocco, la
        priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è
        appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'epicondilite',
  heroVideo,
  videoTitle: 'Video trattamento epicondilite - Mobilitas Torino',
  images: {
    hero: '/epicondilite-tunnel/epicondilite-tunnel.02.png',
    band: '/epicondilite-tunnel/epicondilite-tunnel.07.JPG',
    final: '/epicondilite-tunnel/epicondilite-tunnel.06.JPG',
  },
  hero: {
    place: 'Torino',
    name: 'Epicondilite',
    title: { main: 'Soffri di epicondilite e ti dicono che è solo il gomito?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>spalla</strong>,{' '}
        <strong>collo</strong> e{' '}
        <strong>gesto quotidiano</strong> per alleggerire
        quanto l’epicondilite pesa su lavoro, presa e vita di tutti i giorni.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'L’epicondilite non ti limita solo nel gomito.', accent: 'Ti limita nel lavoro, nella presa e nei gesti banali.' },
    intro: (
      <>
        Ignorarla non la fa sparire: la normalizza. E più la normalizzi, più ti toglie{' '}
        <strong>forza nella presa</strong>,{' '}
        <strong>serenità</strong> nei gesti di ogni giorno e
        persino lo sport.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Il riposo conta</strong>.{' '}
        <strong>I farmaci contano</strong>. Ma non sono
        l’unico livello del problema: la{' '}
        <strong>catena spalla-gomito-polso</strong> può
        mantenere attivi i sintomi anche quando il gomito è già protetto.
      </>
    ),
    emblem: {
      variant: 'chain',
      labels: [{ text: 'COLLO' }, { text: 'SPALLA' }, { text: 'GOMITO', accent: true }, { text: 'POLSO' }],
      caption: 'Il gomito è dove il problema si sente, non dove comincia.',
    },
    narrative: (
      <>
        Il gomito paga il lavoro degli altri. I muscoli che fanno male lì sono quelli che
        muovono polso e dita: se la{' '}
        <strong>spalla</strong> è rigida e la presa è
        sempre uguale — mouse, cacciavite, racchetta — quei muscoli lavorano il doppio, e
        la loro corda sul gomito si sfianca.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre basta riposo e fascia.', accent: 'A volte serve guardare spalla, collo e gesto.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'su tutta la catena del braccio.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> dell’epicondilite sulla tua
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
        e iniziamo a costruire un percorso concreto per ridurre l’impatto dell’epicondilite sulla
        tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'epicondilite',
    path: '/epicondilite',
    ogImage: '/epicondilite-tunnel/epicondilite-tunnel.06.JPG',
    title: 'Osteopata Epicondilite Torino | Gomito, Spalla e Catena del Braccio | Mobilitas',
    description:
      'Osteopata per epicondilite a Torino (San Donato e Crocetta). Lavoriamo su spalla, collo, postura e gesto — non solo sul gomito — in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata epicondilite torino',
      'epicondilite torino',
      'osteopatia epicondilite',
      'trattamento epicondilite osteopata',
      'gomito del tennista torino',
      'dolore gomito osteopata',
      'fascia epicondiloidea',
      'infiltrazione epicondilite',
      'tendine estensori gomito',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per epicondilite – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Epicondilite Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per epicondilite – Mobilitas Torino',
    condition: {
      name: 'Epicondilite',
      alternateName: [
        'Gomito del tennista',
        'Epicondilite laterale',
        'Tendinopatia degli estensori del polso',
        'Dolore laterale al gomito',
      ],
      anatomy: 'Epicondilo laterale, tendini estensori, spalla e polso',
    },
    therapy: {
      name: 'Trattamento osteopatico per epicondilite',
      description:
        'Approccio osteopatico integrato su spalla, collo, postura e catena spalla-gomito-polso, in affiancamento al percorso medico ortopedico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per epicondilite',
      },
    },
    breadcrumbName: 'Epicondilite',
    faq: [
      {
        name: 'Sono stato fermo un mese e il dolore è tornato identico: perché?',
        text: 'Perché il problema non era quanto usavi il braccio, ma come. Al ritorno, spalla e gesto erano gli stessi — e il conto è tornato ad arrivare nello stesso punto. Su quello nessuno ha ancora lavorato: noi valutiamo la catena spalla-gomito-polso e il gesto quotidiano, in affiancamento al medico.',
      },
      {
        name: "Ho fatto l'infiltrazione: sollievo e poi da capo. Ha senso provare altro?",
        text: "Spesso sì, se il sollievo è reale ma temporaneo. L'infiltrazione ha spento l'incendio, non chi lo appicca: la spalla rigida e il gesto sono ancora lì. Noi lavoriamo su quella parte — in parallelo a ciò che stai già facendo.",
      },
      {
        name: 'Porto la fascia o il tutore da mesi: perché non basta?',
        text: 'Continua a usarli se ti danno sollievo. Ma confermano che il tendine è sotto pressione — non spiegano perché. Noi lavoriamo sul motivo per cui il carico arriva tutto sul gomito: spalla, collo, postura e gesto.',
      },
      {
        name: 'Uso il braccio per lavoro: non posso fermarmi. Ha senso venire da voi?',
        text: 'Sì, ed è proprio il caso più frequente. Non serve smettere: lavoriamo su spalla, catena e gesto perché il tuo lavoro smetta di arrivare tutto sul gomito.',
      },
      {
        name: "Mi promettete che l'epicondilite passa del tutto?",
        text: "No, e diffidiamo di chi lo fa. L'obiettivo onesto è capire perché il gomito paga il lavoro degli altri e ridurre l'impatto sulla presa, sul lavoro e sullo sport — nessuna promessa facile, solo chiarezza.",
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'In presenza di dolore improvviso con schiocco e perdita di forza netta, gomito caldo, rosso e gonfio con febbre, formicolii o mano che si addormenta insieme al dolore, dolore notturno costante che cresce, oppure trauma recente al gomito con dolore e blocco, la priorità è la valutazione medica tempestiva.',
      },
    ],
  },
}

export default function Epicondilite() {
  return <ConditionLanding page={PAGE} />
}
