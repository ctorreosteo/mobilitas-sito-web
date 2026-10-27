import {
  Target,
  Goal,
  Shuffle,
  Wind,
  Bed,
  Car,
  Split,
  Footprints,
  MoveHorizontal,
  Sunrise,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'

// Landing "Pubalgia": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

const HERO_BENEFITS = [
  <>
    <strong>Calciare</strong> o cambiare direzione senza la fitta all’inguine
  </>,
  <>
    Capire perché settimane di <strong>stop</strong> non sono bastate
  </>,
  <>
    Farti guardare <strong>anche</strong>, <strong>bacino</strong> e schiena
    bassa, non solo il pube
  </>,
]

const PAIN_POINTS = [
  {
    icon: Target,
    title: 'Dolore all’inguine o sopra il pube',
    body: 'Al centro, sull’osso del pube, oppure di lato, dove l’inguine incontra l’interno coscia.',
  },
  {
    icon: Goal,
    title: 'Fitta quando calci',
    body: 'Il tiro, il passaggio lungo, il gesto di caricare la gamba: è il momento in cui l’inguine si fa sentire di più.',
  },
  {
    icon: Shuffle,
    title: 'Cambi di direzione, scatti e frenate',
    body: 'Calcetto, padel, tennis, basket: ogni partenza e ogni cambio di lato tira sull’inguine.',
  },
  {
    icon: Wind,
    title: 'Fa male tossire o starnutire',
    body: 'Un colpo di tosse, uno starnuto, una risata forte: la fitta sale verso gli addominali bassi.',
  },
  {
    icon: Bed,
    title: 'Alzarti o girarti nel letto',
    body: 'Passare da sdraiato a seduto, o girarti su un fianco, ti costringe ad aiutarti con le mani.',
  },
  {
    icon: Car,
    title: 'Scendere dall’auto',
    body: 'Portare fuori una gamba alla volta, salire in sella alla bici o allacciarti le scarpe diventa un gesto da calcolare.',
  },
  {
    icon: Split,
    title: 'Il dolore cambia lato o si sposta',
    body: 'Un giorno a destra, poi a sinistra, poi sale verso la pancia o scende lungo l’interno coscia.',
  },
  {
    icon: Footprints,
    title: 'Si scalda in partita e presenta il conto dopo',
    body: 'Durante la corsa o la partita quasi non lo senti, la sera e il giorno dopo cammini rigido.',
  },
  {
    icon: MoveHorizontal,
    title: 'Fastidio ad allargare le gambe',
    body: 'Aprire le gambe, accavallarle o stringerle contro qualcosa tira e fa male all’inguine.',
  },
  {
    icon: Sunrise,
    title: 'Rigidità al mattino',
    body: 'Appena sveglio l’inguine è rigido e dolente, e servono un po’ di passi prima di scioglierlo.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Due forze tirano sullo stesso punto',
    b: 'Gli addominali bassi tirano verso l’alto, gli adduttori verso il basso: entrambi si agganciano al pube, che fa da perno in mezzo.',
  },
  {
    k: '02',
    t: 'Anche e bacino decidono quanto tirano',
    b: 'Se l’anca ruota poco o il bacino e la schiena bassa sono rigidi, ogni calcio e ogni cambio di direzione chiedono di più all’inguine.',
  },
  {
    k: '03',
    t: 'Per questo lo stop da solo non basta',
    b: 'Dopo settimane ferme il dolore cala, ma anche, bacino ed equilibrio tra le due forze sono gli stessi: al primo rientro in campo il pube paga di nuovo.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/gamba_gamba-tesa-sollevata_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Valutazione con la gamba tesa sollevata di un paziente',
    title: 'Stop dallo sport',
    body: 'Fermarsi un periodo spesso abbassa il dolore. Ma alla ripresa, se nulla è cambiato in anche e bacino, la pubalgia torna alla prima partita.',
  },
  {
    image: '/trattamenti/pancia_addome-basso-supino_05_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta l’addome basso di una paziente supina',
    title: 'Antinfiammatori e FANS',
    body: 'Abbassano il dolore, e permettono di finire la stagione. FANS orali (ibuprofene, ketoprofene, diclofenac) e gel sono il primo tentativo quasi sempre, ma non cambiano il modo in cui il carico arriva sul pube.',
  },
  {
    image: '/trattamenti/gamba_ginocchio-anca-flessione_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che mobilizza ginocchio e anca di una paziente',
    title: 'Fisioterapia e rinforzo degli adduttori',
    body: 'Gli esercizi di rinforzo per adduttori e addominali sono tra gli approcci più solidi. Se però la mobilità delle anche, il bacino e la schiena bassa restano fuori dal lavoro, l’inguine continua a fare da ammortizzatore.',
  },
  {
    image: '/trattamenti/anca_decubito-laterale_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta anca e bacino di un paziente sdraiato su un fianco',
    title: 'Massaggi, tecar e onde d’urto',
    body: 'Sciolgono la tensione e stimolano il tessuto, e spesso danno sollievo per qualche giorno. Lavorano sul punto che fa male, dove le due forze si incontrano, non su quello che le sbilancia.',
  },
  {
    image: '/trattamenti/pancia_addome-supino_09_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico dell’addome di una paziente supina',
    title: 'Ecografia e risonanza',
    body: 'Servono a escludere ernie, problemi dell’anca e fratture da stress, e restano riferimenti medici. Però segni come l’edema del pube si vedono anche in sportivi senza dolore: l’immagine dice com’è la zona, non perché si è sovraccaricata.',
  },
  {
    image: '/trattamenti/schiena_lombare-prono_10_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico della zona lombare di un paziente a pancia in giù',
    title: 'Infiltrazioni e valutazione chirurgica',
    body: 'Il cortisone può dare un sollievo reale per qualche settimana, non ripetibile a piacere. La chirurgia della cosiddetta “ernia dello sportivo” resta un’opzione per casi selezionati, dopo mesi di percorso conservativo.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    <strong>Calciare</strong>, scattare e cambiare direzione senza la fitta
    all’inguine
  </>,
  <>
    Capire perché lo <strong>stop</strong> non è bastato: il pube pagava
    lo squilibrio di anche e bacino
  </>,
  <>
    Rientrare in <strong>campo</strong> con un piano graduale, invece di
    fermarti e ripartire da capo ogni stagione
  </>,
  <>
    Alzarti dal <strong>letto</strong> e scendere dall’auto senza calcolare
    ogni movimento
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
    body: 'Ricostruiamo sport, carichi, quando è iniziato, esami effettuati e terapie in corso, per definire priorità e obiettivi realistici.',
  },
  {
    title: 'Valutazione obiettiva e del gesto',
    body: 'Valutiamo la rotazione delle anche, il bacino, la schiena bassa e l’equilibrio tra addominali e adduttori, con attenzione al gesto che ti fa male: calcio, scatto, cambio di direzione.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo sulla mobilità di anche e bacino, sulla zona lombare e con tecniche dolci su addominali bassi e adduttori, nel rispetto della fase in cui ti trovi.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo un piano di rientro graduale — corsa, cambi di direzione, calcio — da integrare con il percorso medico, fisioterapico e con il tuo preparatore.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'stop',
    question: (
      <>
        Sono stato <strong>fermo</strong> settimane e al rientro è tornata: perché?
      </>
    ),
    answer: (
      <>
        Perché lo stop abbassa il dolore, ma non cambia il motivo per cui il carico arriva tutto
        sul pube. Se le <strong>anche</strong> ruotano poco e bacino e schiena bassa sono rigidi, al
        primo calcio l’equilibrio tra addominali e adduttori è lo stesso di prima. Noi lavoriamo su
        quello, in <em>affiancamento</em> al medico, non al posto delle sue indicazioni.
      </>
    ),
  },
  {
    id: 'giocare',
    question: (
      <>
        Posso continuare a <strong>giocare</strong> mentre faccio il percorso?
      </>
    ),
    answer: (
      <>
        Dipende da quanto fa male e da come stai il giorno dopo. Non sempre serve fermarsi del
        tutto: a volte basta ridurre per un periodo calci, scatti e cambi di direzione e
        reintrodurli per gradi. Lo decidiamo insieme dopo la valutazione, coordinandoci quando serve
        con il medico e con chi ti segue in squadra.
      </>
    ),
  },
  {
    id: 'ernia-sportivo',
    question: (
      <>
        Mi hanno parlato di <strong>ernia dello sportivo</strong>: serve l’operazione?
      </>
    ),
    answer: (
      <>
        L’indicazione chirurgica la decide il medico specialista, ed è di solito riservata a casi
        selezionati che non migliorano dopo mesi di percorso conservativo. Molte pubalgie migliorano
        per altre strade: vale la pena esplorarle prima, con un piano serio e misurabile.
      </>
    ),
  },
  {
    id: 'non-sportivo',
    question: (
      <>
        Non faccio <strong>sport</strong>: può essere pubalgia lo stesso?
      </>
    ),
    answer: (
      <>
        Sì: è più frequente negli sportivi, ma il dolore all’inguine può comparire anche dopo un
        lavoro pesante, molte ore seduti o un cambio di attività. Il meccanismo è simile — anche,
        bacino e schiena bassa che scaricano male — e la valutazione serve anche a capire se il
        dolore viene da altro, come l’anca stessa o un’ernia, per indirizzarti al medico giusto.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che la <strong>pubalgia</strong> passa del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. La pubalgia ha spesso tempi lunghi. L’obiettivo onesto è
        capire perché il pube paga lo squilibrio di anche e bacino e ridurre l’impatto sullo sport
        e sulla giornata: meno dolore, più gesti tollerati, meno stop e ripartenze. Quanto si può
        migliorare nel tuo caso si capisce solo valutandoti — nessuna promessa facile, solo chiarezza.
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
        In presenza di un rigonfiamento all’inguine che compare tossendo o stando in piedi (possibile
        ernia inguinale: pronto soccorso subito se diventa duro, molto dolente e non rientra, o se
        compaiono nausea e vomito), febbre insieme al dolore, dolore comparso dopo una caduta, un
        trauma o un colpo forte, bruciore a urinare, sangue nelle urine o dolore che si irradia ai
        testicoli (se improvviso e forte, pronto soccorso subito), oppure dolore al pube in
        gravidanza o dopo il parto, la priorità è la valutazione medica tempestiva. Noi interveniamo
        solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'pubalgia',
  heroVideo: null, // Video non ancora girato: in apertura c'è la foto images.hero. Quando c'è, prefetchHeroVideo('PUBALGIA_VSL') a livello di modulo
  videoTitle: 'Video trattamento pubalgia - Mobilitas Torino',
  images: {
    hero: '/trattamenti/anca_flessa-supino_11_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/pancia_addome-basso-supino_03_orizzontale',
    bandClassName: 'object-[50%_60%]',
    final: '/trattamenti/anca_decubito-laterale_07_orizzontale',
    finalClassName: 'object-[40%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Pubalgia',
    title: { main: 'Hai una pubalgia che torna appena riprendi a giocare?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>anche</strong>,{' '}
        <strong>bacino</strong> e{' '}
        <strong>schiena bassa</strong> per alleggerire
        quanto la pubalgia pesa su sport, lavoro e movimenti di tutti i giorni.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La pubalgia non ti limita solo in campo.', accent: 'Ti limita anche ad alzarti dal letto.' },
    intro: (
      <>
        Ti fermi, migliora, rientri, torna. Ignorarla non la fa sparire: la normalizza. E più la
        normalizzi, più ti toglie{' '}
        <strong>partite</strong>,{' '}
        <strong>scatto</strong> e la{' '}
        <strong>fiducia</strong> nei gesti più semplici.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Lo stop conta</strong>.{' '}
        <strong>Il rinforzo conta</strong>. Ma non sono
        l’unico livello del problema: se anche, bacino e schiena bassa non lavorano bene, il{' '}
        <strong>pube</strong> resta il punto dove tutto
        il carico si scarica.
      </>
    ),
    emblem: {
      variant: 'chain',
      labels: [{ text: 'LOMBARE' }, { text: 'ADDOMINALI' }, { text: 'PUBE', accent: true }, { text: 'ADDUTTORI' }],
      caption: 'Il pube è dove le due forze si incontrano, non dove il problema comincia.',
    },
    narrative: (
      <>
        Il pube fa da perno tra due forze: gli{' '}
        <strong>addominali bassi</strong> che tirano verso
        l’alto e gli <strong>adduttori</strong> che tirano
        verso il basso. Se le anche ruotano poco e il bacino è rigido, ogni calcio, scatto e cambio
        di direzione sbilancia quel tiro — e l’inguine paga il conto.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve un altro mese di stop.', accent: 'A volte serve guardare anche, bacino e schiena.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'su anche, bacino e catena addominali-adduttori.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> della pubalgia sulla tua
          vita quotidiana e sportiva, con un percorso serio e graduale.
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
        <strong>scatto</strong> e meno stop forzati.
        Inizia con un consulto telefonico o la prima visita.
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
        stop-rientro-ricaduta.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire un percorso concreto per ridurre l’impatto della pubalgia sulla
        tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'pubalgia',
    path: '/pubalgia',
    ogImage: '/trattamenti/og/pancia_addome-basso-supino_02_orizzontale.jpg',
    title: 'Osteopata Pubalgia Torino | Inguine, Anche, Bacino e Adduttori | Mobilitas',
    description:
      'Osteopata per pubalgia a Torino (San Donato e Crocetta). Lavoriamo su anche, bacino, schiena bassa ed equilibrio addominali-adduttori, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata pubalgia torino',
      'pubalgia torino',
      'osteopatia pubalgia',
      'trattamento pubalgia osteopata',
      'dolore inguine torino',
      'pubalgia calcio',
      'pubalgia padel',
      'dolore adduttori',
      'ernia dello sportivo',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per pubalgia – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Pubalgia Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per pubalgia – Mobilitas Torino',
    condition: {
      name: 'Pubalgia',
      alternateName: [
        'Dolore inguinale',
        'Pubalgia dello sportivo',
        'Groin pain',
        'Osteite pubica',
        'Tendinopatia degli adduttori',
        'Ernia dello sportivo',
      ],
      anatomy: 'Sinfisi pubica, adduttori, addominali bassi, anche, bacino e colonna lombare',
    },
    therapy: {
      name: 'Trattamento osteopatico per pubalgia',
      description:
        'Approccio osteopatico integrato su anche, bacino, colonna lombare ed equilibrio tra addominali e adduttori, in affiancamento al percorso medico e fisioterapico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per pubalgia',
      },
    },
    breadcrumbName: 'Pubalgia',
    faq: [
      {
        name: 'Sono stato fermo settimane e al rientro è tornata: perché?',
        text: 'Perché lo stop abbassa il dolore, ma non cambia il motivo per cui il carico arriva tutto sul pube. Se le anche ruotano poco e bacino e schiena bassa sono rigidi, al primo calcio l’equilibrio tra addominali e adduttori è lo stesso di prima. Noi lavoriamo su quello, in affiancamento al medico.',
      },
      {
        name: 'Posso continuare a giocare mentre faccio il percorso?',
        text: 'Dipende da quanto fa male e da come stai il giorno dopo. Non sempre serve fermarsi del tutto: a volte basta ridurre per un periodo calci, scatti e cambi di direzione e reintrodurli per gradi. Lo decidiamo insieme dopo la valutazione.',
      },
      {
        name: 'Mi hanno parlato di ernia dello sportivo: serve l’operazione?',
        text: 'L’indicazione chirurgica la decide il medico specialista, ed è di solito riservata a casi selezionati che non migliorano dopo mesi di percorso conservativo. Molte pubalgie migliorano per altre strade: vale la pena esplorarle prima.',
      },
      {
        name: 'Non faccio sport: può essere pubalgia lo stesso?',
        text: 'Sì: è più frequente negli sportivi, ma il dolore all’inguine può comparire anche dopo un lavoro pesante, molte ore seduti o un cambio di attività. La valutazione serve anche a capire se il dolore viene da altro, come l’anca stessa o un’ernia, per indirizzarti al medico giusto.',
      },
      {
        name: 'Mi promettete che la pubalgia passa del tutto?',
        text: 'No, e diffidiamo di chi lo fa. L’obiettivo onesto è capire perché il pube paga lo squilibrio di anche e bacino e ridurre l’impatto sullo sport e sulla giornata — nessuna promessa facile, solo chiarezza.',
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'In presenza di un rigonfiamento all’inguine che compare tossendo o stando in piedi (pronto soccorso subito se diventa duro, molto dolente e non rientra, o con nausea e vomito), febbre insieme al dolore, dolore dopo una caduta o un trauma, bruciore a urinare, sangue nelle urine o dolore che si irradia ai testicoli, oppure dolore al pube in gravidanza o dopo il parto, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function Pubalgia() {
  return <PrimaVisitaLanding page={PAGE} />
}
