import {
  Target,
  ArrowDown,
  ShoppingBag,
  Activity,
  Zap,
  Dumbbell,
  RotateCw,
  ArrowUpFromLine,
  Hammer,
  Timer,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'

// Landing "Epitrocleite": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

const HERO_BENEFITS = [
  <>
    Tornare a fare <strong>trazioni</strong> o una partita senza la fitta all’interno del gomito
  </>,
  <>
    Capire perché ogni volta che riprendi lo <strong>sport</strong> il dolore torna puntuale
  </>,
  <>
    Farti guardare <strong>spalla</strong>, <strong>polso</strong> e gesto, non solo il punto
    che fa male
  </>,
]

const PAIN_POINTS = [
  {
    icon: Target,
    title: 'Dolore sul lato interno del gomito',
    body: 'Un punto preciso sull’osso sporgente verso il corpo, quello che tocchi se appoggi il gomito al fianco.',
  },
  {
    icon: ArrowDown,
    title: 'Fastidio che scende verso il palmo',
    body: 'Il dolore si allunga lungo il lato interno dell’avambraccio, nella pancia dei muscoli che chiudono la mano.',
  },
  {
    icon: ShoppingBag,
    title: 'Dolore stringendo e portando pesi',
    body: 'Le borse della spesa, la valigia, il manubrio della bici: più la presa è forte e prolungata, più fa male.',
  },
  {
    icon: Activity,
    title: 'Fitta nel colpo a golf',
    body: 'Soprattutto quando il bastone prende terra o tocchi la palla in modo secco: il gomito interno del braccio dominante se ne accorge subito.',
  },
  {
    icon: Zap,
    title: 'Dritto e smash a padel o tennis',
    body: 'I colpi in cui il polso chiude con forza e il palmo spinge in avanti sono quelli che ti fanno stringere i denti.',
  },
  {
    icon: Dumbbell,
    title: 'Trazioni e curl in palestra',
    body: 'Appendersi alla sbarra, curl con il bilanciere, rematori: la presa sotto carico accende il dolore e lo lascia lì per ore.',
  },
  {
    icon: RotateCw,
    title: 'Peggiora girando il palmo verso il basso',
    body: 'Versare dalla brocca, girare il volante con forza, avvitare con decisione: la rotazione contro resistenza tira proprio lì.',
  },
  {
    icon: ArrowUpFromLine,
    title: 'Fa male spingere sul palmo',
    body: 'Fare leva sulle mani per alzarti dalla sedia o dal letto, un piegamento sulle braccia: il carico sul palmo arriva al gomito.',
  },
  {
    icon: Hammer,
    title: 'Peggiora con i lavori manuali',
    body: 'Martello, trapano, cazzuola, cesoie da potatura, lavori di cucina: le prese ripetute e forti fanno salire il dolore nella giornata.',
  },
  {
    icon: Timer,
    title: 'Il conto arriva il giorno dopo',
    body: 'Durante lo sforzo lo senti poco; la sera o la mattina dopo il gomito è rigido e dolente e la mano ha meno forza.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Chi chiude la mano tira il gomito',
    b: 'I muscoli che flettono il polso e girano il palmo verso il basso si attaccano tutti sul lato interno del gomito: ogni presa forte passa da lì.',
  },
  {
    k: '02',
    t: 'Se la spalla non lavora, lavora il polso',
    b: 'Swing, colpo di padel, trazione: quando spalla e scapola si muovono poco, la forza la deve mettere il polso, e l’attacco interno del gomito si sovraccarica.',
  },
  {
    k: '03',
    t: 'Fermarsi spegne, non corregge',
    b: 'Qualche settimana senza sport e il dolore cala. Ma quando riprendi, spalla, presa e gesto sono gli stessi, e il gomito interno torna a pagare.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/spalla_scapola-decubito-laterale_06_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di scapola e spalla di una paziente sdraiata su un fianco',
    title: 'Stop dallo sport',
    body: 'Fermarsi abbassa l’infiammazione e a volte serve. Ma il tendine si adatta al carico: senza un ritorno graduale e un gesto diverso, alla prima partita si riparte da capo.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_21_orizzontale',
    imageClassName: 'object-[30%_65%]',
    alt: 'Trattamento osteopatico del collo di un paziente supino',
    title: 'Antinfiammatori, gel e ghiaccio',
    body: 'Aiutano a gestire le giornate peggiori e a dormire meglio. Non cambiano però il modo in cui la presa e lo swing caricano il lato interno del gomito.',
  },
  {
    image: '/trattamenti/spalla_scapola-decubito-laterale_05_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che lavora sulla scapola di una paziente sdraiata su un fianco',
    title: 'Cinturino e bendaggi',
    body: 'Il cinturino sotto il gomito distribuisce la tensione e dà sollievo mentre giochi o lavori. Toglie un po’ di carico al tendine, non spiega perché ne arriva così tanto.',
  },
  {
    image: '/trattamenti/collo_allungamento-cervicale-supino_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Allungamento osteopatico del collo di un paziente supino',
    title: 'Fisioterapia, esercizi e onde d’urto',
    body: 'Gli esercizi di carico progressivo sono una delle strade più solide e vanno fatti. Spesso però il lavoro resta su avambraccio e polso, e spalla e scapola non entrano nel programma.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_08_orizzontale',
    imageClassName: 'object-[20%_50%]',
    alt: 'Trattamento osteopatico della cervicale di un paziente supino',
    title: 'Infiltrazioni',
    body: 'Infiltrazioni di cortisonici o PRP possono dare un sollievo concreto, che il medico valuta caso per caso, anche per la vicinanza del nervo ulnare. Agiscono sul tendine, non sul gesto che lo sovraccarica.',
  },
  {
    image: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
    imageClassName: 'object-[10%_60%]',
    alt: 'Osteopata che tratta collo e spalle di una paziente supina',
    title: 'Ecografia, elettromiografia e ortopedico',
    body: 'L’ecografia descrive il tendine; l’elettromiografia serve se ci sono formicolii alle ultime dita. Sono passaggi medici importanti, ma raccontano lo stato del gomito, non come ci sei arrivato.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Tornare a <strong>golf</strong>, padel o palestra con un ritorno graduale e
    ragionato
  </>,
  <>
    Capire perché lo <strong>stop</strong> non è bastato: il problema era il
    gesto
  </>,
  <>
    Ritrovare <strong>forza nella presa</strong> per borse, attrezzi e
    bilanciere
  </>,
  <>
    Farti guardare <strong>spalla</strong>, scapola e polso, non solo il lato
    interno del gomito
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
    body: 'Ricostruiamo sport, carichi in palestra, lavoro, esami ed eventuali infiltrazioni, e ti chiediamo di formicolii ad anulare e mignolo.',
  },
  {
    title: 'Valutazione del gesto e della catena',
    body: 'Guardiamo spalla, scapola, gomito e polso, e il gesto che ti fa male: swing, colpo, presa sulla sbarra o attrezzo di lavoro.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo su spalla e scapola, collo, avambraccio e polso, con tecniche dolci sul lato interno del gomito, nel rispetto della fase del tendine e del nervo ulnare.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo un piano per tornare al tuo sport o lavoro a carico crescente, da integrare con il percorso medico o fisioterapico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'differenza',
    question: (
      <>
        È come il <strong>gomito del tennista</strong>, solo dall’altra parte?
      </>
    ),
    answer: (
      <>
        Si somigliano, ma non sono la stessa cosa. Nel gomito del tennista fa male il lato esterno e
        sono coinvolti i muscoli che aprono il polso; qui il dolore è sul lato{' '}
        <strong>interno</strong>, dove si attaccano i muscoli che chiudono la mano e ruotano il
        palmo. Cambiano i gesti che lo scatenano, e lì vicino passa il nervo ulnare, a cui facciamo
        sempre attenzione. Per questo la valutazione parte dal tuo gesto, in{' '}
        <em>affiancamento</em> al medico.
      </>
    ),
  },
  {
    id: 'sport',
    question: (
      <>
        Devo smettere di giocare a <strong>golf</strong> o a padel?
      </>
    ),
    answer: (
      <>
        Non per forza, e non per sempre. A volte serve ridurre per un periodo, ma lo stop da solo
        raramente risolve: quando riprendi, il gesto è lo stesso. Lavoriamo su spalla, scapola e
        polso perché il colpo pesi meno sul gomito, e costruiamo con te un ritorno graduale.
      </>
    ),
  },
  {
    id: 'palestra',
    question: (
      <>
        Mi fa male solo con <strong>trazioni</strong> e curl: è comunque epitrocleite?
      </>
    ),
    answer: (
      <>
        È un quadro molto frequente in palestra, ma la diagnosi la conferma il medico. Quello che
        possiamo fare noi è capire perché la presa sotto carico arriva tutta sul lato interno del
        gomito: spesso c’entrano una spalla che lavora poco e una presa sempre identica. Non serve
        abbandonare l’allenamento, serve dosarlo e cambiare quello che lo rende pesante.
      </>
    ),
  },
  {
    id: 'lavoro',
    question: (
      <>
        Faccio un <strong>lavoro manuale</strong>: non posso fermarmi. Ha senso venire da voi?
      </>
    ),
    answer: (
      <>
        Sì, ed è uno dei casi più comuni. Martello, trapano, cesoie, coltelli in cucina: non ti
        chiediamo di smettere, lavoriamo su spalla, polso e modo di impugnare perché la giornata
        smetta di finire tutta sul gomito interno.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che l’<strong>epitrocleite</strong> passa del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. I tendini rispondono in tempi lunghi e diversi da persona a
        persona. L’obiettivo onesto è capire perché il lato interno del gomito si sovraccarica e
        ridurne l’impatto su sport, lavoro e presa. Quanto si può migliorare nel tuo caso si capisce
        solo valutandoti — nessuna promessa facile, solo chiarezza.
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
        In presenza di formicolio o intorpidimento di anulare e mignolo, perdita di forza o
        goffaggine nelle dita, dolore improvviso con «schiocco» durante uno sforzo, gomito caldo,
        rosso e gonfio con febbre, dolore notturno costante che cresce, oppure trauma recente con
        dolore e blocco del gomito, la priorità è la valutazione medica tempestiva. Noi interveniamo
        solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'epitrocleite',
  heroVideo: null, // Video non ancora girato: in apertura c'è la foto images.hero. Quando c'è, prefetchHeroVideo('EPITROCLEITE_VSL') a livello di modulo
  videoTitle: 'Video trattamento epitrocleite - Mobilitas Torino',
  images: {
    hero: '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale',
    heroClassName: 'object-[50%_50%]',
    band: '/trattamenti/schiena_dorsale-alta-prono_06_orizzontale',
    bandClassName: 'object-[50%_50%]',
    final: '/trattamenti/collo_cervicale-e-spalle-supino_04_orizzontale',
    finalClassName: 'object-[0%_50%]',
  },
  hero: {
    place: 'Torino',
    name: 'Epitrocleite',
    title: { main: 'Ti fa male l’interno del gomito ogni volta che stringi, giochi o ti alleni?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>spalla</strong>,{' '}
        <strong>polso</strong> e{' '}
        <strong>gesto sportivo o di lavoro</strong> per alleggerire
        quanto l’epitrocleite pesa su presa, allenamenti e giornate.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'L’epitrocleite non è solo un fastidio al gomito.', accent: 'Ti toglie lo sport, la presa e la fiducia nel braccio.' },
    intro: (
      <>
        Stringere i denti non la fa sparire: la cronicizza. E più va avanti, più ti toglie{' '}
        <strong>partite e allenamenti</strong>,{' '}
        <strong>forza nella mano</strong> e
        la tranquillità di usare il braccio senza pensarci.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Lo stop conta</strong>.{' '}
        <strong>Gli esercizi contano</strong>. Ma non sono
        l’unico livello del problema: il{' '}
        <strong>gesto</strong> e una{' '}
        <strong>spalla</strong> che lavora poco possono
        continuare a scaricare la forza sul lato interno del gomito.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Spalla' }, { text: 'Polso' }, { text: 'Gomito', accent: true }, { text: 'Presa' }],
      caption: 'Il lato interno del gomito raccoglie la forza che spalla e polso non distribuiscono.',
    },
    narrative: (
      <>
        Sul lato interno del gomito si attaccano i muscoli che chiudono la mano e girano il palmo
        verso il basso. In uno swing, in un colpo di padel o appeso alla sbarra, se{' '}
        <strong>spalla</strong> e scapola partecipano poco
        è il polso a dover stringere e spingere di più — e quel carico finisce tutto su un attacco
        tendineo di pochi centimetri.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre bastano stop e cinturino.', accent: 'A volte serve guardare spalla, polso e gesto.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'su come il braccio genera forza.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> dell’epitrocleite su sport,
          lavoro e vita quotidiana, con un percorso serio e misurabile.
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
        <strong>partite</strong>, più{' '}
        <strong>allenamenti</strong> e meno rinunce
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
        Se anche una sola di queste risposte ti rappresenta, non restare fermo ad aspettare che
        passi da solo.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire un percorso concreto per ridurre l’impatto dell’epitrocleite sulla
        tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'epitrocleite',
    path: '/epitrocleite',
    ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_02_orizzontale.jpg',
    title: 'Osteopata Epitrocleite Torino | Gomito del Golfista, Spalla e Presa | Mobilitas',
    description:
      'Osteopata per epitrocleite (gomito del golfista) a Torino (San Donato e Crocetta). Lavoriamo su spalla, polso e gesto di golf, padel, palestra e lavoro, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata epitrocleite torino',
      'epitrocleite torino',
      'osteopatia epitrocleite',
      'trattamento epitrocleite osteopata',
      'gomito del golfista torino',
      'dolore interno gomito',
      'epicondilite mediale',
      'dolore gomito trazioni',
      'dolore gomito padel',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per epitrocleite – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Epitrocleite Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per epitrocleite – Mobilitas Torino',
    condition: {
      name: 'Epitrocleite',
      alternateName: [
        'Gomito del golfista',
        'Epicondilite mediale',
        'Tendinopatia dei flessori-pronatori',
        'Dolore mediale al gomito',
      ],
      anatomy: 'Epitroclea (epicondilo mediale), tendini flessori e pronatori, spalla e polso',
    },
    therapy: {
      name: 'Trattamento osteopatico per epitrocleite',
      description:
        'Approccio osteopatico integrato su spalla, scapola, polso e gesto sportivo o lavorativo, in affiancamento al percorso medico ortopedico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per epitrocleite',
      },
    },
    breadcrumbName: 'Epitrocleite',
    faq: [
      {
        name: 'È come il gomito del tennista, solo dall’altra parte?',
        text: "Si somigliano, ma non sono la stessa cosa. Nel gomito del tennista fa male il lato esterno; qui il dolore è sul lato interno, dove si attaccano i muscoli che chiudono la mano e ruotano il palmo. Cambiano i gesti che lo scatenano, e lì vicino passa il nervo ulnare, a cui facciamo sempre attenzione.",
      },
      {
        name: 'Devo smettere di giocare a golf o a padel?',
        text: 'Non per forza, e non per sempre. Lo stop da solo raramente risolve: quando riprendi, il gesto è lo stesso. Lavoriamo su spalla, scapola e polso perché il colpo pesi meno sul gomito, e costruiamo con te un ritorno graduale.',
      },
      {
        name: 'Mi fa male solo con trazioni e curl: è comunque epitrocleite?',
        text: "È un quadro molto frequente in palestra, ma la diagnosi la conferma il medico. Noi cerchiamo di capire perché la presa sotto carico arriva tutta sul lato interno del gomito: spesso c'entrano una spalla che lavora poco e una presa sempre identica.",
      },
      {
        name: 'Faccio un lavoro manuale: non posso fermarmi. Ha senso venire da voi?',
        text: 'Sì, ed è uno dei casi più comuni. Non ti chiediamo di smettere: lavoriamo su spalla, polso e modo di impugnare perché la giornata smetta di finire tutta sul gomito interno.',
      },
      {
        name: "Mi promettete che l'epitrocleite passa del tutto?",
        text: "No, e diffidiamo di chi lo fa. L'obiettivo onesto è capire perché il lato interno del gomito si sovraccarica e ridurne l'impatto su sport, lavoro e presa — nessuna promessa facile, solo chiarezza.",
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'In presenza di formicolio o intorpidimento di anulare e mignolo, perdita di forza o goffaggine nelle dita, dolore improvviso con schiocco durante uno sforzo, gomito caldo, rosso e gonfio con febbre, dolore notturno costante che cresce, oppure trauma recente con dolore e blocco del gomito, la priorità è la valutazione medica tempestiva.',
      },
    ],
  },
}

export default function Epitrocleite() {
  return <PrimaVisitaLanding page={PAGE} />
}
