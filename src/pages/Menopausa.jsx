import {
  Flame,
  Moon,
  Zap,
  AlarmClock,
  CircleAlert,
  Dumbbell,
  BatteryLow,
  Bed,
  Brain,
  Droplets,
} from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'

// Landing "Menopausa": solo contenuti e dati. Struttura, grafica e logica (video, popup di
// prenotazione, recensioni, SEO) stanno in components/condition-landing.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('MENOPAUSA_VSL')

const HERO_BENEFITS = [
  <>
    Smetti di sentirti dire che il <strong>dolore</strong> è{' '}
    <strong>normale</strong>
  </>,
  <>
    Riduci <strong>rigidità</strong> e tensioni che ti bloccano al{' '}
    <strong>risveglio</strong>
  </>,
  <>
    Torna a vivere con più <strong>energia</strong> e meno{' '}
    <strong>rinunce</strong>
  </>,
]

const PAIN_POINTS = [
  {
    icon: Flame,
    title: 'Vampate di calore',
    body: 'Ondate improvvise di calore che partono dal petto e salgono al viso, spesso seguite da sudorazione.',
  },
  {
    icon: Moon,
    title: 'Sudorazioni notturne e risvegli',
    body: 'Ti svegli accaldata nel cuore della notte e poi fai fatica a riaddormentarti.',
  },
  {
    icon: Zap,
    title: 'Dolori articolari diffusi',
    body: 'Ginocchia, anche, spalle, mani. Un dolore che compare o peggiora proprio in questo periodo, senza un trauma che lo giustifichi.',
  },
  {
    icon: AlarmClock,
    title: 'Rigidità mattutina',
    body: 'Le articolazioni sono dure appena sveglia e ci vuole tempo prima di muoverti con scioltezza.',
  },
  {
    icon: CircleAlert,
    title: 'Cervicalgia e mal di testa più frequenti',
    body: 'Il collo si irrigidisce più facilmente e i mal di testa diventano più frequenti che in passato.',
  },
  {
    icon: Dumbbell,
    title: 'Perdita di massa muscolare e forza',
    body: 'Ti accorgi che fai più fatica in gesti che prima non ti pesavano affatto.',
  },
  {
    icon: BatteryLow,
    title: 'Stanchezza persistente',
    body: 'Una spossatezza di fondo che il riposo non risolve del tutto.',
  },
  {
    icon: Bed,
    title: 'Disturbi del sonno',
    body: 'Difficoltà ad addormentarti, sonno leggero, risvegli frequenti.',
  },
  {
    icon: Brain,
    title: 'Sbalzi d’umore, irritabilità, ansia',
    body: 'Reazioni emotive più intense e meno controllabili rispetto a prima.',
  },
  {
    icon: Droplets,
    title: 'Pesantezza e gonfiore a gambe e addome',
    body: 'Ritenzione di liquidi, sensazione di gambe pesanti, pancia gonfia più del solito.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Gli ormoni nutrono anche i tessuti',
    b: 'Muscoli, tendini e fasce dipendono da quel nutrimento. Quando cala, rigidità e dolori possono arrivare tutti insieme.',
  },
  {
    k: '02',
    t: 'I tessuti diventano più rigidi',
    b: 'Meno elastici, meno idratati: al mattino sei dura, il collo si irrigidisce e i gesti che prima erano facili pesano di più.',
  },
  {
    k: '03',
    t: 'Si lavora sulla parte meccanica',
    b: 'Non si annulla la menopausa. Si può ridurre rigidità e tensioni, pezzo dopo pezzo, in affiancamento al ginecologo.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/pancia_addome-basso-supino_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta l’addome basso di una paziente',
    title: '“È la menopausa, è normale”',
    body: 'La frase che ricevono tutte. Non è una cura: è una spiegazione che chiude la ricerca. Normale non vuol dire che non c’è niente da fare.',
  },
  {
    image: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
    imageClassName: 'object-[0%_50%]',
    alt: 'Osteopata che tratta collo e spalle di una paziente supina',
    title: 'Terapia ormonale: un pezzo del quadro',
    body: 'Prescritta dal ginecologo con indicazioni precise: agisce sugli ormoni, non sui dolori muscoloscheletrici che senti oggi.',
  },
  {
    image: '/trattamenti/anca_flessa-supino_07_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di anca e bacino di una paziente con la gamba flessa',
    title: 'Antinfiammatori e fisioterapia a zona',
    body: 'Tamponano o trattano la singola zona. Raramente affrontano tutto quello che è cambiato insieme.',
  },
  {
    image: '/trattamenti/anca_decubito-laterale_06_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta anca e bacino di una paziente sdraiata su un fianco',
    title: 'Integratori, melatonina e alimentazione',
    body: 'Contributo variabile e spesso parziale. Se il corpo è in tensione, il sonno resta spezzato e il quadro non cambia da solo.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_18_orizzontale',
    imageClassName: 'object-[18%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    title: 'Attività fisica: utile, difficile da iniziare',
    body: 'Tra le cose più utili in assoluto — e difficile da avviare quando ti fa male tutto. Il movimento giusto va dosato.',
  },
  {
    image: '/trattamenti/gamba_ginocchio-supino_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento del ginocchio di una paziente',
    title: 'Esami e densitometria: pezzi importanti',
    body: 'MOC, ecografie e dosaggi ormonali restano riferimenti medici. Spiegano le ossa e gli ormoni, non la rigidità che senti oggi.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Sciogliamo <strong>tensioni</strong> e rigidità che arrivano tutte
    insieme
  </>,
  <>
    Torni a un <strong>sonno</strong> più riposante, con meno{' '}
    <strong>rigidità</strong> al mattino
  </>,
  <>
    Torni a muoverti con più <strong>scioltezza</strong> e meno stanchezza
    di fondo
  </>,
  <>
    Non sostituiamo il ginecologo: lavoriamo su ciò che gli{' '}
    <strong>ormoni</strong> non risolvono da soli
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
    body: 'Analizziamo tessuti, rigidità, postura e dinamica corporea per individuare fattori che possono alimentare i dolori.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su respiro, movimento e posture, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'normale',
    question: (
      <>
        Mi hanno detto che è <strong>normale</strong>: è vero?
      </>
    ),
    answer: (
      <>
        Che il corpo cambi in menopausa è normale; che tu debba solo sopportare dolore e rigidità
        no. Gli ormoni spiegano una parte del quadro, non tutto. Sulla rigidità dei tessuti si
        lavora — a qualsiasi età — in affiancamento al ginecologo, non al posto suo.
      </>
    ),
  },
  {
    id: 'tos',
    question: (
      <>
        Prendo già la <strong>terapia ormonale</strong>: ha senso venire da voi?
      </>
    ),
    answer: (
      <>
        Sì, se rigidità e dolori restano. La terapia ormonale, prescritta dal ginecologo, lavora
        sugli ormoni. Noi lavoriamo su muscoli, tendini e tessuti: la parte meccanica che la
        terapia non tocca. Non sostituiamo il percorso medico, lo affianchiamo.
      </>
    ),
  },
  {
    id: 'male-tutto',
    question: (
      <>
        Mi fa male tutto: da dove iniziate?
      </>
    ),
    answer: (
      <>
        Dalla valutazione. Quando i dolori arrivano tutti insieme, raramente sono cinque problemi
        separati: spesso condividono pochi punti di origine. Si parte da lì, con un ordine chiaro,
        non tentando di trattare tutto in una volta.
      </>
    ),
  },
  {
    id: 'conviverci',
    question: (
      <>
        Ormai devo solo <strong>conviverci</strong>?
      </>
    ),
    answer: (
      <>
        Con il cambiamento ormonale sì: non si annulla. Con la rigidità e i dolori muscoloscheletrici
        no: sono due cose diverse. Non promettiamo di far sparire la menopausa; lavoriamo per
        ridurre rigidità, migliorare sonno e scioltezza, pezzo dopo pezzo. La prima visita serve
        a separare onestamente ciò che resta da ciò su cui si può intervenire.
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
        In presenza di sanguinamento vaginale dopo la menopausa, nodulo o cambiamenti della pelle
        del seno, dolore osseo localizzato e persistente, vampate con cardiopalmo forte, tremori e
        calo di peso, oppure umore molto a terra con pensieri cupi, la priorità è la valutazione
        medica o ginecologica tempestiva. Noi lavoriamo solo quando il quadro è appropriato a un
        supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'menopausa',
  heroVideo,
  videoTitle: 'Video trattamento menopausa - Mobilitas Torino',
  images: {
    hero: '/trattamenti/pancia_addome-supino_08_orizzontale',
    heroClassName: 'object-[50%_65%]',
    band: '/trattamenti/pancia_addome-supino_13_orizzontale',
    bandClassName: 'object-[55%_62%]',
    final: '/trattamenti/collo_presa-cervicale-supino_25_orizzontale',
    finalClassName: 'object-[14%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Menopausa',
    title: { main: 'Sei in menopausa e ti dicono che il dolore è normale?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>tessuti</strong>,{' '}
        <strong>rigidità</strong> e{' '}
        <strong>sonno</strong> per ridurre l’impatto della
        menopausa su dolore, riposo e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La menopausa non è solo qualcosa da sopportare.', accent: 'Ti cambia come ti muovi e come riposi.' },
    intro: (
      <>
        Ignorarla non la fa sparire: la normalizza. E più la normalizzi, più ti toglie{' '}
        <strong>scioltezza</strong>,{' '}
        <strong>notti</strong> e{' '}
        <strong>energia</strong> di fondo.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Gli ormoni contano</strong>.{' '}
        <strong>Il ginecologo conta</strong>. Ma non sono
        l’unico livello del problema: i{' '}
        <strong>tessuti</strong> possono irrigidirsi e far
        male anche quando la terapia ormonale è già impostata.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Ormoni' }, { text: 'Tessuti' }, { text: 'Sonno' }, { text: 'Rigidità', accent: true }],
      caption: 'Il cambiamento è reale. La rigidità non è una condanna.',
    },
    narrative: (
      <>
        Gli <strong>ormoni</strong> nutrono anche
        muscoli, tendini e tessuti. Quando calano, i tessuti diventano più{' '}
        <strong>rigidi</strong>, il sonno ripara meno
        e il corpo intero si fa sentire: schiena, spalle, mani, tutto insieme.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve solo accettare che “è normale”.', accent: 'A volte serve lavorare sulla rigidità dei tessuti.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> della rigidità su dolore,
          sonno e sulla vita quotidiana, con un percorso serio e misurabile.
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
        <strong>scioltezza</strong>, più{' '}
        <strong>riposo</strong> e meno rigidità al
        mattino. Inizia con un consulto telefonico o la prima visita.
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
        Se anche una sola di queste risposte ti rappresenta, non restare ferma ad accettare
        che “è normale”.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire un percorso concreto per ridurre rigidità e dolore sulla tua
        vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'menopausa',
    path: '/menopausa',
    ogImage: '/trattamenti/og/pancia_addome-basso-supino_02_orizzontale.jpg',
    title: 'Osteopata Menopausa Torino | Rigidità, Dolori e Sonno | Mobilitas',
    description:
      'Osteopata per menopausa a Torino (San Donato e Crocetta). Lavoriamo su rigidità dei tessuti, dolori articolari e sonno, in affiancamento al percorso ginecologico. Prima visita 49€.',
    keywords: [
      'osteopata menopausa torino',
      'menopausa osteopata',
      'dolori articolari menopausa',
      'rigidità menopausa osteopatia',
      'vampate e tensioni muscolari',
      'sonno menopausa osteopata',
      'cervicalgia menopausa torino',
      'tessuti menopausa trattamento',
      'osteopata ginecologo torino',
      'climaterio osteopata',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per menopausa – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Menopausa Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per menopausa – Mobilitas Torino',
    condition: {
      name: 'Menopausa e cambiamenti muscoloscheletrici',
      alternateName: [
        'Menopausa',
        'Climaterio',
        'Perimenopausa',
        'Dolori articolari in menopausa',
        'Rigidità post-menopausa',
        'Vampate e tensioni muscolari',
      ],
      anatomy: 'Muscoli, tendini, articolazioni e tessuti connettivi',
    },
    therapy: {
      name: 'Trattamento osteopatico per menopausa',
      description:
        'Approccio osteopatico su rigidità dei tessuti, dolori articolari, respiro e qualità del sonno, in affiancamento al percorso ginecologico e ormonale.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per menopausa',
      },
    },
    breadcrumbName: 'Menopausa',
    faq: [
      {
        name: 'Mi hanno detto che è normale: è vero?',
        text: 'Che il corpo cambi in menopausa è normale; che tu debba solo sopportare dolore e rigidità no. Gli ormoni spiegano una parte del quadro, non tutto. Sulla rigidità dei tessuti si lavora — a qualsiasi età — in affiancamento al ginecologo, non al posto suo.',
      },
      {
        name: 'Prendo già la terapia ormonale: ha senso venire da voi?',
        text: 'Sì, se rigidità e dolori restano. La terapia ormonale, prescritta dal ginecologo, lavora sugli ormoni. Noi lavoriamo su muscoli, tendini e tessuti: la parte meccanica che la terapia non tocca. Non sostituiamo il percorso medico, lo affianchiamo.',
      },
      {
        name: 'Mi fa male tutto: da dove iniziate?',
        text: 'Dalla valutazione. Quando i dolori arrivano tutti insieme, raramente sono cinque problemi separati: spesso condividono pochi punti di origine. Si parte da lì, con un ordine chiaro, non tentando di trattare tutto in una volta.',
      },
      {
        name: 'Ormai devo solo conviverci?',
        text: 'Con il cambiamento ormonale sì: non si annulla. Con la rigidità e i dolori muscoloscheletrici no: sono due cose diverse. Non promettiamo di far sparire la menopausa; lavoriamo per ridurre rigidità, migliorare sonno e scioltezza, pezzo dopo pezzo. La prima visita serve a separare onestamente ciò che resta da ciò su cui si può intervenire.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'In presenza di sanguinamento vaginale dopo la menopausa, nodulo o cambiamenti della pelle del seno, dolore osseo localizzato e persistente, vampate con cardiopalmo forte, tremori e calo di peso, oppure umore molto a terra con pensieri cupi, la priorità è la valutazione medica o ginecologica tempestiva. Noi lavoriamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function Menopausa() {
  return <ConditionLanding page={PAGE} />
}
