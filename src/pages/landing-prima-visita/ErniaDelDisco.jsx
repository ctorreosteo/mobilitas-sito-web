import {
  FileSearch,
  ShieldAlert,
  Ban,
  ChevronsDown,
  Hand,
  Wind,
  Search,
  Scissors,
  Hourglass,
  Gem,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'

// Landing "Ernia del disco": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

const HERO_BENEFITS = [
  <>
    Tornare a <strong>muoverti</strong> senza la paura di “far uscire” l’ernia
  </>,
  <>
    Capire cosa dice davvero il tuo <strong>referto</strong> — e cosa non dice
  </>,
  <>
    Avere un <strong>piano graduale</strong> per tornare a piegarti, sollevare e
    allenarti
  </>,
]

const PAIN_POINTS = [
  {
    icon: FileSearch,
    title: 'Hai letto il referto e ti sei spaventato',
    body: '“Ernia espulsa”, “impronta sul sacco durale”, “conflitto radicolare”: parole che fanno paura anche prima di capire cosa significano.',
  },
  {
    icon: ShieldAlert,
    title: 'Hai paura di fare il movimento sbagliato',
    body: 'Ti pieghi con le ginocchia anche per raccogliere una penna, e ogni gesto lo pensi due volte prima di farlo.',
  },
  {
    icon: Ban,
    title: 'Hai smesso di fare cose che ami',
    body: 'Palestra, corsa, giardinaggio, prendere in braccio i bambini: messi in pausa “finché non passa”, e la pausa si allunga.',
  },
  {
    icon: ChevronsDown,
    title: 'Dolore che scende nella gamba',
    body: 'Dalla schiena bassa verso gluteo, coscia o polpaccio, di solito da un lato solo.',
  },
  {
    icon: Hand,
    title: 'Formicolio al braccio o alla mano',
    body: 'Se l’ernia è cervicale, il fastidio parte dal collo e scende verso spalla, braccio e dita.',
  },
  {
    icon: Wind,
    title: 'Fitta quando tossisci o starnutisci',
    body: 'Un colpo di tosse, uno starnuto o uno sforzo in bagno e senti la scossa partire dalla schiena.',
  },
  {
    icon: Search,
    title: 'Cerchi risposte su internet',
    body: 'Forum, video, storie di operazioni andate male: più leggi, più ti preoccupi e meno ti muovi.',
  },
  {
    icon: Scissors,
    title: 'Il pensiero fisso dell’operazione',
    body: '“Mi devo operare?” è la domanda che ti fai ogni volta che il dolore torna a salire.',
  },
  {
    icon: Hourglass,
    title: 'Aspetti fermo che passi',
    body: 'Riposo, divano, busto: le settimane passano e la schiena è più rigida di prima.',
  },
  {
    icon: Gem,
    title: 'Ti senti una schiena “di cristallo”',
    body: 'Da quando hai la diagnosi ti tratti come se potessi romperti, anche nei giorni in cui il dolore è basso.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'L’ernia è una fotografia, non una sentenza',
    b: 'Ernie e protrusioni si trovano spesso anche in chi non ha alcun dolore, e molte si riducono o si riassorbono da sole nel giro di mesi.',
  },
  {
    k: '02',
    t: 'La paura cambia il modo in cui ti muovi',
    b: 'Dopo la diagnosi ti irrigidisci: bacino e anche si bloccano, la schiena lavora in difesa e ogni gesto diventa più faticoso e doloroso.',
  },
  {
    k: '03',
    t: 'Serve tornare a muoversi, con gradualità',
    b: 'Non tutto e subito, e nemmeno fermi per mesi: ridare movimento a schiena, bacino e anche, un passo alla volta, nei limiti di quello che il nervo tollera.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/schiena_dorso-sacrale-prono_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di zona dorsale e sacro di un paziente a pancia in giù',
    title: 'Risonanza magnetica',
    body: 'Mostra la forma del disco ed è fondamentale quando ci sono segnali neurologici. Ma descrive l’anatomia, non quanto fa male: la stessa ernia può dare dolore forte a una persona e nessun sintomo a un’altra.',
  },
  {
    image: '/trattamenti/anca_flessa-supino_13_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di anca e bacino di una paziente con la gamba flessa',
    title: 'Antinfiammatori e cortisonici',
    body: 'Nella fase acuta aiutano davvero a calmare dolore e infiammazione del nervo, su indicazione del medico. Però non ti dicono come tornare a muoverti, e quando finisce il ciclo resta la paura del prossimo movimento.',
  },
  {
    image: '/trattamenti/schiena_lombare-decubito-laterale_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento lombare di un paziente sdraiato su un fianco',
    title: 'Riposo assoluto e busto',
    body: 'Qualche giorno di tregua può servire. Settimane a letto o con il busto sempre addosso, invece, indeboliscono i muscoli e alimentano l’idea che la schiena sia fragile.',
  },
  {
    image: '/trattamenti/gamba_gamba-tesa-sollevata_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Valutazione con la gamba tesa sollevata di un paziente',
    title: 'Fisioterapia ed esercizi',
    body: 'Sono una parte importante del percorso. Ma se ogni esercizio lo fai trattenendo il fiato per paura di peggiorare, o resta uguale per tutti, bacino e anche continuano a non collaborare.',
  },
  {
    image: '/trattamenti/gamba_piede-caviglia-supino_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che valuta piede e caviglia di un paziente supino',
    title: 'Visita neurologica ed elettromiografia',
    body: 'Dicono se e quanto il nervo sta soffrendo, e sono decisive quando la gamba perde forza o sensibilità. Non sono pensate per spiegarti come riprendere i gesti di tutti i giorni.',
  },
  {
    image: '/trattamenti/schiena_lombare-supino_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che lavora sulla zona lombare di una paziente supina',
    title: 'Infiltrazioni e valutazione chirurgica',
    body: 'Opzioni mirate per casi selezionati, che decide lo specialista. L’intervento ha indicazioni precise — deficit che peggiorano, sindrome della cauda equina, dolore che non risponde dopo settimane di percorso conservativo — e la maggior parte delle ernie non ci arriva.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Guardare il <strong>referto</strong> senza panico, sapendo cosa conta
    davvero nel tuo caso
  </>,
  <>
    Tornare a <strong>piegarti</strong> e sollevare senza calcolare ogni
    movimento
  </>,
  <>
    Riprendere <strong>sport</strong> e attività con un percorso graduale,
    invece di aspettare fermo
  </>,
  <>
    Affrontare la domanda sull’<strong>operazione</strong> con più elementi,
    insieme al tuo medico
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
    title: 'Anamnesi e lettura dei referti',
    body: 'Guardiamo insieme risonanza ed esami, ricostruiamo sintomi e terapie in corso, e ti spieghiamo con parole semplici cosa c’è scritto.',
  },
  {
    title: 'Valutazione obiettiva e neurologica di base',
    body: 'Controlliamo forza, sensibilità e riflessi, poi valutiamo schiena, bacino e anche per capire cosa il tuo corpo tollera oggi.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo con tecniche dolci su bacino, anche, schiena e respiro, lontano dalla zona irritata nella fase acuta e senza manipolazioni forzate.',
  },
  {
    title: 'Piano di ritorno al movimento',
    body: 'Ti diamo indicazioni graduali su cosa puoi fare da subito e cosa riprendere più avanti — camminata, piegamenti, sport — da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'muoversi',
    question: (
      <>
        Con un’ernia posso <strong>muovermi</strong> o rischio di peggiorare?
      </>
    ),
    answer: (
      <>
        Nella maggior parte dei casi muoversi con <em>gradualità</em> è proprio quello che aiuta:
        il riposo assoluto prolungato tende a irrigidire e indebolire. Il punto è dosare — cosa,
        quanto e quando — in base a come risponde il tuo nervo. Il trattamento usa tecniche dolci e
        nulla viene fatto senza il tuo consenso.
      </>
    ),
  },
  {
    id: 'operare',
    question: (
      <>
        Mi devo <strong>operare</strong>?
      </>
    ),
    answer: (
      <>
        Lo decide il chirurgo, su indicazioni precise: perdita di forza che peggiora, disturbi di
        vescica o intestino, dolore che non risponde dopo un percorso conservativo ben fatto. La
        grande maggioranza delle ernie migliora senza intervento. Noi lavoriamo in{' '}
        <em>affiancamento</em> al medico, non al posto della sua valutazione.
      </>
    ),
  },
  {
    id: 'riassorbe',
    question: (
      <>
        È vero che l’ernia può <strong>riassorbirsi</strong> da sola?
      </>
    ),
    answer: (
      <>
        Sì, succede spesso: molte ernie si riducono o si riassorbono nel giro di mesi, a volte anche
        quelle che in immagine sembrano grandi. Non accade sempre e non con gli stessi tempi per
        tutti, e spesso il dolore migliora prima che la risonanza cambi. Per questo l’immagine da
        sola non basta a dire come stai.
      </>
    ),
  },
  {
    id: 'cervicale',
    question: (
      <>
        Ho un’ernia <strong>cervicale</strong>: vale lo stesso discorso?
      </>
    ),
    answer: (
      <>
        In gran parte sì: anche al collo ernie e protrusioni sono comuni e molte migliorano nel
        tempo. Il dolore può scendere verso spalla, braccio e mano. Lavoriamo con tecniche dolci su
        collo, dorso e spalle, senza manipolazioni forzate. Mani che diventano impacciate o
        difficoltà a camminare dritto vanno invece segnalate subito al medico.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che l’<strong>ernia</strong> passa del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. Non possiamo “rimettere a posto” un disco. L’obiettivo
        onesto è ridurre l’impatto del dolore, ridarti movimento e fiducia nella schiena e
        accompagnarti nel ritorno alle tue attività. Quanto si può migliorare nel tuo caso si
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
        Vai subito in <strong>pronto soccorso</strong> se perdi il controllo di urina o feci, o se
        senti addormentata la zona tra le gambe, i genitali o l’interno cosce (“a sella”): possono
        essere segni di sindrome della cauda equina. Contatta il medico con urgenza anche se la
        gamba perde forza in modo progressivo o il piede “cade” camminando, se il dolore compare
        insieme a febbre o calo di peso senza motivo, o — per l’ernia cervicale — se le mani
        diventano impacciate o cammini instabile. Noi interveniamo solo quando il quadro è
        appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'ernia-del-disco',
  heroVideo: null, // Video non ancora girato: in apertura c'è la foto images.hero. Quando c'è, prefetchHeroVideo('ERNIA_DEL_DISCO_VSL') a livello di modulo
  videoTitle: 'Video trattamento ernia del disco - Mobilitas Torino',
  images: {
    hero: '/trattamenti/schiena_lombare-prono_14_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/anca_decubito-laterale_01_orizzontale',
    bandClassName: 'object-[50%_70%]',
    final: '/trattamenti/gamba_ginocchio-supino_01_orizzontale',
    finalClassName: 'object-[45%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Ernia del disco',
    title: { main: 'Hai un’ernia del disco e hai paura di muoverti?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>schiena</strong>,{' '}
        <strong>bacino</strong> e{' '}
        <strong>anche</strong> per aiutarti a tornare
        a muoverti con gradualità e ridurre l’impatto dell’ernia su lavoro, sport e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'L’ernia non ti limita solo nella schiena.', accent: 'Ti limita da quando hai letto il referto.' },
    intro: (
      <>
        “Ho un’ernia, non posso muovermi.” Lo pensi a ogni gesto, e intanto la vita si restringe.
        Più aspetti fermo, più perdi{' '}
        <strong>movimento</strong>,{' '}
        <strong>forza</strong> e{' '}
        <strong>fiducia</strong> nella tua schiena.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'L’ernia sul referto', accent: 'non è tutta la storia' },
    intro: (
      <>
        <strong>La risonanza conta</strong>.{' '}
        <strong>Il parere del medico conta</strong>. Ma
        l’immagine non sempre spiega il dolore: spesso a tenerti bloccato è la{' '}
        <strong>paura di muoverti</strong>, più del disco
        stesso.
      </>
    ),
    emblem: {
      variant: 'chain',
      labels: [{ text: 'Referto' }, { text: 'Paura', accent: true }, { text: 'Rigidità' }, { text: 'Dolore' }],
      caption: 'Dal referto alla paura, dalla paura alla rigidità: è questa catena che va interrotta.',
    },
    narrative: (
      <>
        Molte persone hanno ernie in risonanza e nessun dolore, e molte ernie si{' '}
        <strong>riassorbono</strong> da sole nel tempo. Quello
        che cambia la tua giornata è spesso ciò che succede dopo la diagnosi: ti irrigidisci,{' '}
        <strong>bacino</strong> e{' '}
        <strong>anche</strong> smettono di muoversi, e la
        schiena resta in difesa.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve “stare fermi finché passa”.', accent: 'A volte serve tornare a muoversi, un passo alla volta.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sul movimento, non solo sull’immagine.' },
      intro: (
        <>
          Lettura chiara dei referti, valutazione neurologica di base, tecniche dolci su schiena,
          bacino e anche e un piano graduale di ritorno al movimento: un percorso per ridurre l’
          <strong>impatto</strong> dell’ernia sulla tua vita
          quotidiana.
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
        <strong>movimento</strong>, più{' '}
        <strong>fiducia nella schiena</strong> e meno paura
        di ogni gesto. Inizia con un consulto telefonico o la prima visita.
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
        Se anche una sola di queste risposte ti rappresenta, non restare fermo ad aspettare che il
        referto cambi.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire, con gradualità, il tuo ritorno al movimento.
      </>
    ),
  },
  seo: {
    dataPage: 'ernia-del-disco',
    path: '/ernia-del-disco',
    ogImage: '/trattamenti/og/anca_flessa-supino_07_orizzontale.jpg',
    title: 'Osteopata Ernia del Disco Torino | Lombare e Cervicale, Ritorno al Movimento | Mobilitas',
    description:
      'Osteopata per ernia del disco a Torino (San Donato e Crocetta). Ernia lombare e cervicale: lavoriamo su schiena, bacino e anche per tornare a muoverti con gradualità, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata ernia del disco torino',
      'ernia del disco torino',
      'osteopatia ernia del disco',
      'trattamento ernia del disco osteopata',
      'ernia lombare torino',
      'ernia cervicale osteopata',
      'protrusione discale osteopata',
      'ernia del disco senza operazione',
      'osteopata schiena torino',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per ernia del disco – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Ernia del Disco Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per ernia del disco – Mobilitas Torino',
    condition: {
      name: 'Ernia del disco',
      alternateName: [
        'Ernia discale',
        'Ernia lombare',
        'Ernia cervicale',
        'Protrusione discale',
        'Discopatia',
      ],
      anatomy: 'Dischi intervertebrali, colonna lombare e cervicale, bacino e anche',
    },
    therapy: {
      name: 'Trattamento osteopatico per ernia del disco',
      description:
        'Approccio osteopatico integrato su schiena, bacino e anche con un piano graduale di ritorno al movimento, in affiancamento al percorso medico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per ernia del disco',
      },
    },
    breadcrumbName: 'Ernia del disco',
    faq: [
      {
        name: 'Con un’ernia posso muovermi o rischio di peggiorare?',
        text: 'Nella maggior parte dei casi muoversi con gradualità è proprio quello che aiuta: il riposo assoluto prolungato tende a irrigidire e indebolire. Il punto è dosare — cosa, quanto e quando — in base a come risponde il tuo nervo. Il trattamento usa tecniche dolci e nulla viene fatto senza il tuo consenso.',
      },
      {
        name: 'Mi devo operare?',
        text: 'Lo decide il chirurgo, su indicazioni precise: perdita di forza che peggiora, disturbi di vescica o intestino, dolore che non risponde dopo un percorso conservativo ben fatto. La grande maggioranza delle ernie migliora senza intervento. Noi lavoriamo in affiancamento al medico, non al posto della sua valutazione.',
      },
      {
        name: 'È vero che l’ernia può riassorbirsi da sola?',
        text: 'Sì, succede spesso: molte ernie si riducono o si riassorbono nel giro di mesi, a volte anche quelle che in immagine sembrano grandi. Non accade sempre e non con gli stessi tempi per tutti, e spesso il dolore migliora prima che la risonanza cambi. Per questo l’immagine da sola non basta a dire come stai.',
      },
      {
        name: 'Ho un’ernia cervicale: vale lo stesso discorso?',
        text: 'In gran parte sì: anche al collo ernie e protrusioni sono comuni e molte migliorano nel tempo. Il dolore può scendere verso spalla, braccio e mano. Lavoriamo con tecniche dolci su collo, dorso e spalle, senza manipolazioni forzate. Mani che diventano impacciate o difficoltà a camminare dritto vanno invece segnalate subito al medico.',
      },
      {
        name: 'Mi promettete che l’ernia passa del tutto?',
        text: 'No, e diffidiamo di chi lo fa. Non possiamo “rimettere a posto” un disco. L’obiettivo onesto è ridurre l’impatto del dolore, ridarti movimento e fiducia nella schiena e accompagnarti nel ritorno alle tue attività — nessuna promessa facile, solo chiarezza.',
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'Vai subito in pronto soccorso se perdi il controllo di urina o feci, o se senti addormentata la zona tra le gambe, i genitali o l’interno cosce (a sella): possono essere segni di sindrome della cauda equina. Contatta il medico con urgenza anche se la gamba perde forza in modo progressivo o il piede cade camminando, se il dolore compare insieme a febbre o calo di peso senza motivo, o — per l’ernia cervicale — se le mani diventano impacciate o cammini instabile. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function ErniaDelDisco() {
  return <PrimaVisitaLanding page={PAGE} />
}
