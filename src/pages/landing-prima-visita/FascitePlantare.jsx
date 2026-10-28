import {
  Sunrise,
  Armchair,
  Target,
  Footprints,
  Hourglass,
  Mountain,
  Timer,
  House,
  RefreshCw,
  Dumbbell,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'

// Landing "Fascite plantare": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

const HERO_BENEFITS = [
  <>
    Fare i <strong>primi passi del mattino</strong> senza appoggiarti ai mobili
  </>,
  <>
    Capire perché <strong>plantari</strong> e scarpe nuove non sono bastati
  </>,
  <>
    Farti guardare <strong>polpaccio</strong>,{' '}
    <strong>ginocchio</strong> e anca, non solo il tallone
  </>,
]

const PAIN_POINTS = [
  {
    icon: Sunrise,
    title: 'I primi passi del mattino sono i peggiori',
    body: 'Scendi dal letto e appoggiare il piede è come camminare su un chiodo. Dopo qualche minuto si scioglie un po’.',
  },
  {
    icon: Armchair,
    title: 'Fitta quando ti alzi dopo essere stato seduto',
    body: 'Dalla scrivania, dalla macchina, dal divano: i primi passi dopo una pausa riaccendono il dolore.',
  },
  {
    icon: Target,
    title: 'Un punto preciso sotto il tallone',
    body: 'Spesso nella parte interna, dove il tallone incontra l’arco del piede: se ci premi sopra con il pollice lo trovi subito.',
  },
  {
    icon: Footprints,
    title: 'Cammini in punta o sul bordo del piede',
    body: 'Senza accorgertene cambi appoggio per non caricare il tallone, e a fine giornata ti fanno male anche ginocchio e schiena.',
  },
  {
    icon: Hourglass,
    title: 'Peggiora dopo tante ore in piedi',
    body: 'Commessi, cuochi, insegnanti, infermieri: la sera il tallone pulsa e non vedi l’ora di toglierti le scarpe.',
  },
  {
    icon: Timer,
    title: 'Durante la corsa passa, dopo è peggio',
    body: 'Scaldandoti il dolore si attenua e ti illude. Poi, la sera o la mattina dopo, torna più forte di prima.',
  },
  {
    icon: House,
    title: 'Camminare scalzi in casa fa male',
    body: 'Pavimento duro e niente supporto sotto l’arco: anche andare in cucina diventa un gesto da calcolare.',
  },
  {
    icon: Mountain,
    title: 'Scale e salite tirano sotto il piede',
    body: 'Salire i gradini o camminare in salita mette in tensione tutta la pianta, fino al tallone.',
  },
  {
    icon: Dumbbell,
    title: 'Hai ridotto sport e camminate',
    body: 'Prima la corsa, poi le passeggiate lunghe, poi anche il calcetto con gli amici: un pezzo alla volta, rinunci.',
  },
  {
    icon: RefreshCw,
    title: 'Migliora per qualche settimana, poi ritorna',
    body: 'Ogni volta che sembra passata, basta un cambio di scarpe, un periodo più intenso o un’estate in ciabatte per ricominciare.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Il tallone è l’ultimo anello della catena',
    b: 'La fascia plantare è collegata, attraverso il tendine d’Achille, al polpaccio: se polpaccio e caviglia sono rigidi, la fascia tira ad ogni passo.',
  },
  {
    k: '02',
    t: 'Ginocchio e anca cambiano come appoggi',
    b: 'Un’anca che non controlla bene la gamba o un ginocchio che cede verso l’interno fanno arrivare il peso sul piede sempre nello stesso modo, e sempre nello stesso punto.',
  },
  {
    k: '03',
    t: 'Si sente lì, ma non comincia sempre lì',
    b: 'Ecco perché plantari e scarpe nuove a volte aiutano solo in parte: proteggono il tallone, ma il modo in cui la catena lo carica resta lo stesso.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/anca_flessa-supino_11_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di anca e bacino di una paziente supina con la gamba flessa',
    title: 'Plantari e scarpe ammortizzate',
    body: 'Possono dare un sollievo reale, soprattutto all’inizio, e spesso vale la pena tenerli. Ma proteggono il tallone dal carico: non cambiano la rigidità di caviglia e polpaccio né il modo in cui la gamba appoggia.',
  },
  {
    image: '/trattamenti/gamba_ginocchio-supino_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento del ginocchio di una paziente supina',
    title: 'Antinfiammatori, ghiaccio e bottiglietta sotto il piede',
    body: 'Abbassano il dolore nelle giornate peggiori. FANS orali e in gel, ghiaccio e la classica bottiglietta fatta rotolare sotto la pianta gestiscono il fastidio, senza modificare il carico che lo riaccende.',
  },
  {
    image: '/trattamenti/gamba_gamba-tesa-sollevata_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che solleva la gamba tesa di un paziente supino',
    title: 'Stretching e fisioterapia',
    body: 'Allungamento di polpaccio e fascia e rinforzo del piede sono tra gli approcci più solidi. A volte, però, il lavoro resta concentrato sotto il piede, e ginocchio, anca e modo di camminare rimangono fuori dal quadro.',
  },
  {
    image: '/trattamenti/gamba_ginocchio-anca-flessione_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che mobilizza ginocchio e anca di una paziente',
    title: 'Onde d’urto',
    body: 'Sono una delle opzioni più usate quando il dolore dura da mesi, e in molte persone aiutano. Lavorano sul tessuto del tallone, cioè dove il conto arriva: se la catena continua a caricarlo allo stesso modo, il rischio di ricaduta resta.',
  },
  {
    image: '/trattamenti/anca_decubito-laterale_06_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta anca e bacino di una paziente sdraiata su un fianco',
    title: 'Infiltrazione di cortisonici',
    body: 'Spesso un sollievo netto per qualche settimana, poi il ritorno al punto di partenza. Non è ripetibile all’infinito e la decisione spetta al medico, che ne valuta benefici e rischi per la fascia e il cuscinetto del tallone.',
  },
  {
    image: '/trattamenti/schiena_lombare-prono_10_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico della zona lombare di un paziente a pancia in giù',
    title: 'Radiografia, ecografia e lo “sperone”',
    body: 'L’ecografia mostra l’ispessimento della fascia, la radiografia a volte lo sperone calcaneare. Ma lo sperone si trova anche in tantissime persone senza alcun dolore: non è quasi mai lui il problema, e l’immagine non spiega perché il tallone si è sovraccaricato.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Fare i <strong>primi passi del mattino</strong> senza zoppicare fino
    al bagno
  </>,
  <>
    Capire perché lo <strong>sperone</strong> nella radiografia non è
    quasi mai il vero problema
  </>,
  <>
    Uscire dal ciclo di <strong>onde d’urto</strong> e infiltrazioni che
    funzionano per un po’ e poi da capo
  </>,
  <>
    Tornare a <strong>correre</strong> o camminare a lungo con un piano
    graduale, non a tentativi
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
    body: 'Ricostruiamo da quando fa male, lavoro, scarpe, sport, esami fatti e terapie già provate, per definire priorità e obiettivi realistici.',
  },
  {
    title: 'Valutazione obiettiva e posturale',
    body: 'Guardiamo come appoggi e come cammini, e valutiamo tutta la catena piede-caviglia-polpaccio-ginocchio-anca, non solo il punto che fa male.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo su polpaccio e tendine d’Achille, mobilità di caviglia e piede, ginocchio e anca, con tecniche dolci sulla zona del tallone nel rispetto della fase in cui si trova.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo esercizi semplici per il mattino, consigli su scarpe e carico e un piano graduale per tornare a camminare e correre, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'sperone',
    question: (
      <>
        Mi hanno detto che ho lo <strong>sperone calcaneare</strong>: va tolto?
      </>
    ),
    answer: (
      <>
        Quasi mai è lui la causa del dolore. Lo sperone è una piccola sporgenza d’osso che si trova
        anche in tantissime persone che non hanno mai avuto male al tallone. Il dolore viene di solito
        dalla <strong>fascia sovraccaricata</strong>, ed è su quel sovraccarico che si lavora. Le
        decisioni su eventuali interventi restano sempre in capo all’ortopedico.
      </>
    ),
  },
  {
    id: 'plantari',
    question: (
      <>
        Porto i <strong>plantari</strong> e ho cambiato scarpe: perché fa ancora male?
      </>
    ),
    answer: (
      <>
        Se ti danno sollievo continua a usarli: proteggono il tallone mentre li hai ai piedi. Ma
        non cambiano la rigidità di caviglia e polpaccio né il modo in cui ginocchio e anca
        accompagnano il passo. Noi lavoriamo su quella parte, in <em>affiancamento</em> a chi ti ha
        prescritto i plantari, non al posto suo.
      </>
    ),
  },
  {
    id: 'onde-urto',
    question: (
      <>
        Ho fatto <strong>onde d’urto</strong> e un’infiltrazione: meglio per un po’, poi da capo. Ha senso provare altro?
      </>
    ),
    answer: (
      <>
        Spesso sì, se il sollievo è stato reale ma temporaneo. Quelle terapie lavorano sul tessuto
        del tallone; se la catena sopra continua a caricarlo allo stesso modo, il problema tende a
        ripresentarsi. Noi interveniamo su polpaccio, caviglia, ginocchio e anca, in parallelo a ciò
        che ti ha indicato il medico, senza sostituirlo.
      </>
    ),
  },
  {
    id: 'corsa',
    question: (
      <>
        Devo smettere di <strong>correre</strong> o di stare in piedi al lavoro?
      </>
    ),
    answer: (
      <>
        Raramente serve fermarsi del tutto: la fascia migliora con un carico dosato bene, non con
        l’immobilità. Valutiamo insieme quanto e come puoi continuare, e costruiamo un piano per
        reggere la giornata in piedi o tornare a correre in modo graduale, invece di andare a
        tentativi.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che la <strong>fascite plantare</strong> passa del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. La fascite plantare può avere tempi lunghi, anche di mesi.
        L’obiettivo onesto è capire perché il tallone si sovraccarica e ridurre l’impatto su
        mattine, lavoro e sport: meno dolore ai primi passi, più autonomia, meno dipendenza da
        terapie al bisogno. Quanto si può migliorare nel tuo caso si capisce solo valutandoti.
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
        In presenza di dolore comparso dopo un trauma, una caduta o con uno «schiocco» netto sotto il
        piede, tallone molto gonfio, caldo e arrossato (soprattutto con febbre), impossibilità di
        appoggiare il piede, formicolio, bruciore o intorpidimento della pianta, specie di notte,
        dolore a entrambi i talloni insieme a rigidità mattutina diffusa a schiena o altre
        articolazioni, oppure diabete con ferite o perdita di sensibilità al piede, la priorità è la
        valutazione medica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un
        supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'fascite-plantare',
  heroVideo: null, // Video non ancora girato: in apertura c'è la foto images.hero. Quando c'è, prefetchHeroVideo('FASCITE_PLANTARE_VSL') a livello di modulo
  videoTitle: 'Video trattamento fascite plantare - Mobilitas Torino',
  images: {
    hero: '/trattamenti/gamba_piede-caviglia-supino_01_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/schiena_dorso-sacrale-prono_02_orizzontale',
    bandClassName: 'object-[45%_70%]',
    final: '/trattamenti/schiena_lombare-supino_01_orizzontale',
    finalClassName: 'object-[40%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Fascite plantare',
    title: { main: 'Soffri di fascite plantare e ti dicono che è solo il tallone?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>polpaccio</strong>,{' '}
        <strong>caviglia</strong> e{' '}
        <strong>modo di camminare</strong> per alleggerire
        quanto la fascite plantare pesa su mattine, lavoro e sport.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La fascite plantare non ti limita solo nel tallone.', accent: 'Ti limita dal primo passo della giornata.' },
    intro: (
      <>
        Ignorarla non la fa sparire: la normalizza. E più la normalizzi, più cambi il modo di
        camminare e ti togli{' '}
        <strong>corse</strong>,{' '}
        <strong>passeggiate</strong> e la{' '}
        <strong>serenità</strong> di scendere dal letto.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>I plantari contano</strong>.{' '}
        <strong>Le scarpe contano</strong>. Ma non sono
        l’unico livello del problema: la{' '}
        <strong>catena piede-caviglia-polpaccio-ginocchio-anca</strong> può
        continuare a caricare il tallone anche quando il piede è già protetto.
      </>
    ),
    emblem: {
      variant: 'chain',
      labels: [{ text: 'ANCA' }, { text: 'GINOCCHIO' }, { text: 'POLPACCIO' }, { text: 'TALLONE', accent: true }],
      caption: 'Il tallone è dove il problema si sente, non sempre dove comincia.',
    },
    narrative: (
      <>
        La fascia plantare è una specie di corda che va dal tallone alle dita, e attraverso il
        tendine d’Achille lavora insieme al polpaccio. Se{' '}
        <strong>caviglia</strong> e{' '}
        <strong>polpaccio</strong> sono rigidi, o se
        ginocchio e anca fanno appoggiare il piede sempre allo stesso modo, quella corda tira ad
        ogni passo — e il punto dove si attacca al tallone si infiamma.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre basta un plantare nuovo.', accent: 'A volte serve guardare tutta la gamba.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'su tutta la catena della gamba.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> della fascite plantare sulla tua
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
        Se queste storie ti somigliano, il prossimo passo può restituirti{' '}
        <strong>mattine più leggere</strong>, più{' '}
        <strong>chilometri</strong> e meno rinunce
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
        Se anche una sola di queste risposte ti rappresenta, non restare fermo a cambiare scarpe e
        plantari sperando che passi.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire un percorso concreto per ridurre l’impatto della fascite plantare
        sulla tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'fascite-plantare',
    path: '/fascite-plantare',
    ogImage: '/trattamenti/og/anca_flessa-supino_07_orizzontale.jpg',
    title: 'Osteopata Fascite Plantare Torino | Tallone, Polpaccio e Catena della Gamba | Mobilitas',
    description:
      'Osteopata per fascite plantare a Torino (San Donato e Crocetta). Lavoriamo su polpaccio, caviglia, ginocchio, anca e modo di camminare — non solo sul tallone — in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata fascite plantare torino',
      'fascite plantare torino',
      'osteopatia fascite plantare',
      'trattamento fascite plantare osteopata',
      'dolore tallone torino',
      'sperone calcaneare torino',
      'dolore sotto il piede osteopata',
      'onde d’urto fascite plantare',
      'plantari fascite plantare',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per fascite plantare – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Fascite Plantare Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per fascite plantare – Mobilitas Torino',
    condition: {
      name: 'Fascite plantare',
      alternateName: [
        'Fasciopatia plantare',
        'Tallonite',
        'Dolore al tallone',
        'Sperone calcaneare doloroso',
        'Talalgia',
      ],
      anatomy: 'Fascia plantare, tallone, tendine d’Achille, polpaccio, ginocchio e anca',
    },
    therapy: {
      name: 'Trattamento osteopatico per fascite plantare',
      description:
        'Approccio osteopatico integrato su polpaccio, caviglia, piede, ginocchio, anca e appoggio, in affiancamento al percorso medico ortopedico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per fascite plantare',
      },
    },
    breadcrumbName: 'Fascite plantare',
    faq: [
      {
        name: 'Mi hanno detto che ho lo sperone calcaneare: va tolto?',
        text: 'Quasi mai è lui la causa del dolore. Lo sperone si trova anche in tantissime persone che non hanno mai avuto male al tallone. Il dolore viene di solito dalla fascia sovraccaricata, ed è su quel sovraccarico che si lavora. Le decisioni su eventuali interventi restano sempre in capo all’ortopedico.',
      },
      {
        name: 'Porto i plantari e ho cambiato scarpe: perché fa ancora male?',
        text: 'Se ti danno sollievo continua a usarli: proteggono il tallone mentre li hai ai piedi. Ma non cambiano la rigidità di caviglia e polpaccio né il modo in cui ginocchio e anca accompagnano il passo. Noi lavoriamo su quella parte, in affiancamento a chi ti ha prescritto i plantari.',
      },
      {
        name: 'Ho fatto onde d’urto e un’infiltrazione: meglio per un po’, poi da capo. Ha senso provare altro?',
        text: 'Spesso sì, se il sollievo è stato reale ma temporaneo. Quelle terapie lavorano sul tessuto del tallone; se la catena sopra continua a caricarlo allo stesso modo, il problema tende a ripresentarsi. Noi interveniamo su polpaccio, caviglia, ginocchio e anca, in parallelo a ciò che ti ha indicato il medico.',
      },
      {
        name: 'Devo smettere di correre o di stare in piedi al lavoro?',
        text: 'Raramente serve fermarsi del tutto: la fascia migliora con un carico dosato bene, non con l’immobilità. Valutiamo insieme quanto e come puoi continuare, e costruiamo un piano graduale.',
      },
      {
        name: 'Mi promettete che la fascite plantare passa del tutto?',
        text: 'No, e diffidiamo di chi lo fa. La fascite plantare può avere tempi lunghi, anche di mesi. L’obiettivo onesto è capire perché il tallone si sovraccarica e ridurre l’impatto su mattine, lavoro e sport — nessuna promessa facile, solo chiarezza.',
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'In presenza di dolore comparso dopo un trauma, una caduta o con uno schiocco netto sotto il piede, tallone molto gonfio, caldo e arrossato (soprattutto con febbre), impossibilità di appoggiare il piede, formicolio, bruciore o intorpidimento della pianta, specie di notte, dolore a entrambi i talloni insieme a rigidità mattutina diffusa a schiena o altre articolazioni, oppure diabete con ferite o perdita di sensibilità al piede, la priorità è la valutazione medica tempestiva.',
      },
    ],
  },
}

export default function FascitePlantare() {
  return <PrimaVisitaLanding page={PAGE} />
}
