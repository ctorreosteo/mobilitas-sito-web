import {
  Sunrise,
  Flame,
  Hourglass,
  Target,
  ArrowUpFromLine,
  Armchair,
  Hand,
  Moon,
  Dumbbell,
  TrendingUp,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'

// Landing "Tendinite": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

const HERO_BENEFITS = [
  <>
    Fare i <strong>primi passi</strong> del mattino senza zoppicare finché il
    tendine non si scalda
  </>,
  <>
    Capire perché settimane di <strong>riposo</strong> non sono bastate
  </>,
  <>
    Farti guardare <strong>gesto</strong> e{' '}
    <strong>articolazioni vicine</strong>, non solo il punto che fa male
  </>,
]

const PAIN_POINTS = [
  {
    icon: Sunrise,
    title: 'Fa male ai primi movimenti',
    body: 'I primi passi giù dal letto, le prime bracciate, le prime ripetizioni: all’inizio il tendine è rigido e dolente.',
  },
  {
    icon: Flame,
    title: 'Si scalda e sembra passare',
    body: 'Dopo dieci minuti di corsa o di lavoro il dolore cala, e ti convinci che stia guarendo.',
  },
  {
    icon: Hourglass,
    title: 'Il conto arriva dopo',
    body: 'La sera, a freddo, o la mattina dopo l’allenamento il dolore torna, a volte più forte di prima.',
  },
  {
    icon: Target,
    title: 'Un punto preciso che fa male a premerlo',
    body: 'Sopra il tallone, sotto la rotula, sulla spalla o sul polso: c’è un punto del tendine sensibile al tatto, a volte un po’ ispessito.',
  },
  {
    icon: ArrowUpFromLine,
    title: 'Fitta alzando il braccio',
    body: 'Prendere un piatto dal pensile, infilarti la giacca, pettinarti: la spalla protesta a metà del movimento.',
  },
  {
    icon: Armchair,
    title: 'Scale, salti e accovacciarsi',
    body: 'Scendere le scale, alzarti dopo tanto tempo seduto o saltare carica il tendine sotto la rotula o dietro la caviglia.',
  },
  {
    icon: Hand,
    title: 'Polso e pollice che bruciano',
    body: 'Tenere in braccio un bambino, usare il mouse, scrivere sul telefono: il dolore parte dal polso e risale.',
  },
  {
    icon: Moon,
    title: 'Non riesci a dormire su quel lato',
    body: 'Sdraiarti sulla spalla dolente diventa impossibile, e cambi posizione più volte per notte.',
  },
  {
    icon: Dumbbell,
    title: 'Peggiora appena carichi',
    body: 'Le borse della spesa, i pesi in palestra, uno scatto: più chiedi forza al tendine, più si fa sentire.',
  },
  {
    icon: TrendingUp,
    title: 'È iniziato dopo un aumento di carico',
    body: 'Un nuovo sport, più chilometri, un trasloco, più ore allo stesso gesto: spesso tutto parte da lì.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Il tendine vive di carico',
    b: 'Si rinforza quando il carico è giusto, si irrita quando è troppo, troppo presto o troppo spesso — e si indebolisce quando lo fermi del tutto.',
  },
  {
    k: '02',
    t: 'Il carico lo decidono le articolazioni vicine',
    b: 'Un’anca rigida carica il ginocchio, una caviglia bloccata carica l’Achille, una scapola che lavora poco carica la spalla. Il tendine paga, ma non decide.',
  },
  {
    k: '03',
    t: 'Il riposo assoluto abbassa il dolore, non la causa',
    b: 'Dopo settimane ferme il tendine regge meno di prima: al ritorno, con lo stesso gesto e le stesse rigidità, il dolore riparte dallo stesso punto.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/gamba_piede-caviglia-supino_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico di piede e caviglia di un paziente supino',
    title: 'Riposo assoluto',
    body: 'Qualche giorno di scarico può servire nella fase più irritata. Settimane ferme, invece, tolgono al tendine la tolleranza al carico: alla ripresa fa male come prima.',
  },
  {
    image: '/trattamenti/collo_cervicale-e-spalle-supino_04_orizzontale',
    imageClassName: 'object-[30%_50%]',
    alt: 'Osteopata che tratta collo e spalle di un paziente supino',
    title: 'Antinfiammatori e FANS',
    body: 'Abbassano il dolore, e nelle prime fasi possono aiutare. FANS orali e gel sono il primo tentativo quasi sempre, ma nelle tendiniti che durano da mesi il problema è soprattutto di tolleranza al carico, più che di infiammazione.',
  },
  {
    image: '/trattamenti/gamba_ginocchio-supino_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta il ginocchio di un paziente supino',
    title: 'Ghiaccio, tutori e bendaggi',
    body: 'Ghiaccio, cinturini sotto la rotula, polsiere e bendaggi colorati danno sollievo mentre li usi. Gestiscono il fastidio, non il motivo per cui il carico arriva tutto lì.',
  },
  {
    image: '/trattamenti/gamba_ginocchio-anca-flessione_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che mobilizza ginocchio e anca di una paziente',
    title: 'Fisioterapia, onde d’urto e terapie fisiche',
    body: 'Gli esercizi di carico progressivo sono tra gli approcci più solidi; le onde d’urto hanno un ruolo in alcune tendinopatie, tecar e laser stimolano il tessuto. Spesso però si lavora solo sul tendine, e anca, caviglia, scapola e gesto restano gli stessi.',
  },
  {
    image: '/trattamenti/anca_decubito-laterale_06_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta anca e bacino di una paziente sdraiata su un fianco',
    title: 'Infiltrazioni',
    body: 'Il cortisone può dare un sollievo reale per qualche settimana, ma non è ripetibile a piacere e su alcuni tendini, come l’Achille e il rotuleo, si usa con molta cautela. Altre infiltrazioni e PRP mirano al tessuto, senza cambiare il gesto che lo sovraccarica.',
  },
  {
    image: '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Valutazione della spalla in piedi di un paziente',
    title: 'Ecografia e risonanza',
    body: 'Servono a vedere lo stato del tendine ed escludere lesioni importanti, e restano riferimenti medici. Però non mostrano perché ci è arrivato, e tendini “alterati” in immagine si trovano anche in persone senza alcun dolore.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Alzarti dal letto e fare i <strong>primi passi</strong> senza aspettare che
    il tendine si scaldi
  </>,
  <>
    Capire perché il <strong>riposo</strong> non è bastato: il tendine non
    chiedeva di stare fermo, ma di essere caricato bene
  </>,
  <>
    Tornare a <strong>correre</strong>, allenarti o lavorare con un piano
    graduale, invece di fermarti e ripartire da capo ogni volta
  </>,
  <>
    Farti guardare <strong>anca</strong>, caviglia, scapola e gesto, non solo
    il punto che fa male
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
    body: 'Ricostruiamo quando è iniziato, cosa è cambiato nel carico, esami effettuati e terapie in corso, per definire priorità e obiettivi realistici.',
  },
  {
    title: 'Valutazione obiettiva e del gesto',
    body: 'Valutiamo il tendine e le articolazioni vicine — anca, ginocchio, caviglia, scapola o polso — e osserviamo il gesto che lo carica: corsa, salto, sollevamento, lavoro.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo sulla mobilità delle articolazioni vicine e sui muscoli che lavorano insieme al tendine, con tecniche dolci sulla zona dolente nel rispetto della sua fase.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo un piano di carico graduale: quanto, come e quando chiedere di più al tendine — da integrare con il percorso medico e fisioterapico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'riposo',
    question: (
      <>
        Mi hanno detto di stare <strong>fermo</strong>: ho fatto settimane di riposo ed è tornata uguale. Perché?
      </>
    ),
    answer: (
      <>
        Perché il tendine non chiede riposo assoluto, chiede il <strong>carico giusto</strong>.
        Stando fermi il dolore cala, ma il tendine perde forza e tolleranza; al ritorno, con le
        stesse rigidità vicine e lo stesso gesto, riparte dallo stesso punto. Noi lavoriamo su
        quello, in <em>affiancamento</em> al medico, non al posto delle sue indicazioni.
      </>
    ),
  },
  {
    id: 'allenarsi',
    question: (
      <>
        Quando si <strong>scalda</strong> non fa più male: posso continuare ad allenarmi?
      </>
    ),
    answer: (
      <>
        Dipende da come risponde il giorno dopo. Il fatto che si scaldi non vuol dire che stia
        guarendo: se la sera o la mattina dopo il dolore è più alto, il carico è troppo. Spesso
        non serve smettere del tutto, ma dosare: la prima visita serve a capire quanto il tuo
        tendine può reggere oggi e come aumentarlo con criterio.
      </>
    ),
  },
  {
    id: 'onde-urto',
    question: (
      <>
        Ho fatto <strong>onde d’urto</strong> o un’<strong>infiltrazione</strong>: un po’ meglio e poi da capo. Ha senso provare altro?
      </>
    ),
    answer: (
      <>
        Spesso sì, se il miglioramento è stato reale ma temporaneo. Quelle terapie lavorano sul
        tendine, dove il conto arriva; se il carico continua ad arrivare lì per colpa di
        un’articolazione rigida o di un gesto sbilanciato, il problema si ripresenta. Noi lavoriamo
        su quella parte, in parallelo a ciò che stai già facendo con il medico.
      </>
    ),
  },
  {
    id: 'ecografia',
    question: (
      <>
        L’<strong>ecografia</strong> dice tendinosi o calcificazione: è grave?
      </>
    ),
    answer: (
      <>
        Il significato del referto lo spiega il medico che te l’ha prescritta. Quello che sappiamo
        è che tendini con lo stesso aspetto in immagine si trovano anche in persone senza dolore:
        l’ecografia dice com’è il tendine, non quanto può reggere né perché si è sovraccaricato.
        Noi partiamo da questa seconda domanda.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che la <strong>tendinite</strong> passa del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. I tendini hanno tempi lunghi, spesso di settimane o mesi.
        L’obiettivo onesto è capire da dove arriva il sovraccarico e ridurre l’impatto sul lavoro,
        sullo sport e sulla giornata: meno dolore, più carico tollerato, meno stop e ripartenze.
        Quanto si può migliorare nel tuo caso si capisce solo valutandoti — nessuna promessa facile,
        solo chiarezza.
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
        In presenza di dolore improvviso con «schiocco» o sensazione di un calcio sul tendine e
        perdita netta di forza (non riesci a spingere sulle punte, a stendere il ginocchio o ad
        alzare il braccio), gonfiore caldo e arrossato con febbre, dolore comparso durante o dopo
        una terapia con antibiotici fluorochinolonici (come ciprofloxacina o levofloxacina — avvisa
        subito il medico che li ha prescritti), più articolazioni gonfie insieme, oppure dolore
        notturno costante che non cambia con la posizione, la priorità è la valutazione medica
        tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'tendinite',
  heroVideo: null, // Video non ancora girato: in apertura c'è la foto images.hero. Quando c'è, prefetchHeroVideo('TENDINITE_VSL') a livello di modulo
  videoTitle: 'Video trattamento tendinite - Mobilitas Torino',
  images: {
    hero: '/trattamenti/spalla_scapola-decubito-laterale_06_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/gamba_gamba-tesa-sollevata_02_orizzontale',
    bandClassName: 'object-[50%_60%]',
    final: '/trattamenti/anca_flessa-supino_13_orizzontale',
    finalClassName: 'object-[40%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Tendinite',
    title: { main: 'Hai una tendinite che si scalda, passa e poi torna?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>carico</strong>,{' '}
        <strong>articolazioni vicine</strong> e{' '}
        <strong>gesto</strong> per alleggerire
        quanto la tendinite pesa su sport, lavoro e movimenti di tutti i giorni.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La tendinite non ti limita solo nel tendine.', accent: 'Ti costringe a fermarti e ripartire da capo.' },
    intro: (
      <>
        Fa male, ti fermi, migliora, riprendi, torna. Ignorarla non la fa sparire: la normalizza.
        E più la normalizzi, più ti toglie{' '}
        <strong>allenamenti</strong>,{' '}
        <strong>fiducia</strong> nei movimenti e
        la libertà di usare il corpo senza pensarci.
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
        l’unico livello del problema: il tendine non chiede di stare fermo, chiede il{' '}
        <strong>carico giusto</strong> — e quel carico
        lo decidono le articolazioni vicine e il gesto.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Gesto' }, { text: 'Tendine' }, { text: 'Carico', accent: true }, { text: 'Articolazioni' }],
      caption: 'Il tendine è dove il carico arriva, non dove si decide quanto ne arriva.',
    },
    narrative: (
      <>
        Un tendine si rinforza quando lo carichi bene e si irrita quando il carico è troppo, troppo
        presto o troppo spesso. Quanto carico gli arriva lo decidono le articolazioni intorno: un’
        <strong>anca rigida</strong> carica il ginocchio, una{' '}
        <strong>caviglia bloccata</strong> carica l’Achille,
        una <strong>scapola</strong> pigra carica la spalla.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve altro riposo.', accent: 'A volte serve il carico giusto, distribuito meglio.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'su carico, articolazioni vicine e gesto.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> della tendinite sulla tua
          vita quotidiana, con un percorso serio e graduale.
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
        <strong>continuità</strong>, più{' '}
        <strong>fiducia nel movimento</strong> e meno stop
        forzati. Inizia con un consulto telefonico o la prima visita.
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
        Se anche una sola di queste risposte ti rappresenta, non restare fermo nel ciclo
        riposo-ripresa-ricaduta.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire un percorso concreto per ridurre l’impatto della tendinite sulla
        tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'tendinite',
    path: '/tendinite',
    ogImage: '/trattamenti/og/spalla_scapola-decubito-laterale_05_orizzontale.jpg',
    title: 'Osteopata Tendinite Torino | Spalla, Achille, Rotuleo e Polso | Mobilitas',
    description:
      'Osteopata per tendinite a Torino (San Donato e Crocetta). Lavoriamo su carico, articolazioni vicine e gesto — non solo sul tendine — in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata tendinite torino',
      'tendinite torino',
      'osteopatia tendinite',
      'trattamento tendinite osteopata',
      'tendinite spalla torino',
      'tendinite achille torino',
      'tendinite rotulea',
      'tendinite polso',
      'tendinopatia torino',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per tendinite – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Tendinite Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per tendinite – Mobilitas Torino',
    condition: {
      name: 'Tendinite',
      alternateName: [
        'Tendinopatia',
        'Tendinosi',
        'Tendinite della spalla',
        'Tendinite d’Achille',
        'Tendinite rotulea',
        'Tendinite del polso',
      ],
      anatomy: 'Tendini di spalla, ginocchio, caviglia e polso, con le articolazioni vicine',
    },
    therapy: {
      name: 'Trattamento osteopatico per tendinite',
      description:
        'Approccio osteopatico integrato su articolazioni vicine, gesto e gestione graduale del carico sul tendine, in affiancamento al percorso medico e fisioterapico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per tendinite',
      },
    },
    breadcrumbName: 'Tendinite',
    faq: [
      {
        name: 'Mi hanno detto di stare fermo: ho fatto settimane di riposo ed è tornata uguale. Perché?',
        text: 'Perché il tendine non chiede riposo assoluto, chiede il carico giusto. Stando fermi il dolore cala, ma il tendine perde forza e tolleranza; al ritorno, con le stesse rigidità vicine e lo stesso gesto, riparte dallo stesso punto. Noi lavoriamo su quello, in affiancamento al medico.',
      },
      {
        name: 'Quando si scalda non fa più male: posso continuare ad allenarmi?',
        text: 'Dipende da come risponde il giorno dopo. Il fatto che si scaldi non vuol dire che stia guarendo: se la sera o la mattina dopo il dolore è più alto, il carico è troppo. Spesso non serve smettere del tutto, ma dosare: la prima visita serve a capire quanto il tuo tendine può reggere oggi e come aumentarlo con criterio.',
      },
      {
        name: 'Ho fatto onde d’urto o un’infiltrazione: un po’ meglio e poi da capo. Ha senso provare altro?',
        text: 'Spesso sì, se il miglioramento è stato reale ma temporaneo. Quelle terapie lavorano sul tendine, dove il conto arriva; se il carico continua ad arrivare lì per colpa di un’articolazione rigida o di un gesto sbilanciato, il problema si ripresenta. Noi lavoriamo su quella parte, in parallelo a ciò che stai già facendo con il medico.',
      },
      {
        name: 'L’ecografia dice tendinosi o calcificazione: è grave?',
        text: 'Il significato del referto lo spiega il medico che te l’ha prescritta. Tendini con lo stesso aspetto in immagine si trovano anche in persone senza dolore: l’ecografia dice com’è il tendine, non quanto può reggere né perché si è sovraccaricato. Noi partiamo da questa seconda domanda.',
      },
      {
        name: 'Mi promettete che la tendinite passa del tutto?',
        text: 'No, e diffidiamo di chi lo fa. I tendini hanno tempi lunghi. L’obiettivo onesto è capire da dove arriva il sovraccarico e ridurre l’impatto sul lavoro, sullo sport e sulla giornata — nessuna promessa facile, solo chiarezza.',
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'In presenza di dolore improvviso con schiocco e perdita netta di forza, gonfiore caldo e arrossato con febbre, dolore comparso durante o dopo una terapia con antibiotici fluorochinolonici (avvisa subito il medico che li ha prescritti), più articolazioni gonfie insieme, oppure dolore notturno costante che non cambia con la posizione, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function Tendinite() {
  return <PrimaVisitaLanding page={PAGE} />
}
