import {
  Zap,
  MapPin,
  BatteryLow,
  Moon,
  CloudFog,
  AlarmClock,
  CircleAlert,
  Volume2,
  Activity,
  RefreshCw,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'
import { prefetchHeroVideo } from '../../components/condition-landing/heroVideo'

// Landing "Fibromialgia": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('FIBROMIALGIA_VSL')

const HERO_BENEFITS = [
  <>
    Il tuo <strong>dolore</strong> è reale: smetti di doverlo{' '}
    <strong>giustificare</strong>
  </>,
  <>
    Riduci <strong>tensioni</strong> e rigidità che tengono alto il volume
    del <strong>dolore</strong>
  </>,
  <>
    Torna a vivere con più <strong>energia</strong> e meno{' '}
    <strong>rinunce</strong>
  </>,
]

const PAIN_POINTS = [
  {
    icon: Zap,
    title: 'Dolore diffuso in tutto il corpo',
    body: 'Un dolore muscolare presente su entrambi i lati, sopra e sotto la vita, da almeno tre mesi. È il criterio principale.',
  },
  {
    icon: MapPin,
    title: 'Punti dolorosi alla pressione',
    body: 'Zone specifiche (collo, spalle, torace, gomiti, anche, ginocchia) che fanno male anche con una pressione leggera.',
  },
  {
    icon: BatteryLow,
    title: 'Stanchezza profonda e costante',
    body: 'Una spossatezza che il riposo non risolve e che non è proporzionata a quello che hai fatto.',
  },
  {
    icon: Moon,
    title: 'Sonno non ristoratore',
    body: 'Dormi ma ti svegli come se non avessi dormito, spesso con il corpo rigido e dolorante.',
  },
  {
    icon: CloudFog,
    title: '“Fibro fog” — nebbia cognitiva',
    body: 'Difficoltà di concentrazione, memoria a corto raggio, parole che non ti vengono.',
  },
  {
    icon: AlarmClock,
    title: 'Rigidità mattutina prolungata',
    body: 'Il corpo è duro al risveglio e ci vuole tempo prima di sbloccarsi.',
  },
  {
    icon: CircleAlert,
    title: 'Mal di testa frequenti',
    body: 'Cefalee tensive o emicranie che si aggiungono a tutto il resto.',
  },
  {
    icon: Volume2,
    title: 'Sensibilità aumentata agli stimoli',
    body: 'Rumori, luci, freddo, odori: cose che gli altri sopportano tranquillamente per te diventano fastidiose o dolorose.',
  },
  {
    icon: Activity,
    title: 'Disturbi intestinali',
    body: 'Colon irritabile, gonfiore, alternanza di stitichezza e diarrea — molto frequenti in associazione.',
  },
  {
    icon: RefreshCw,
    title: 'Sintomi che vanno e vengono',
    body: 'Periodi migliori e riacutizzazioni, spesso legate a stress, freddo, sforzi o cambi di stagione.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Il volume del dolore è alzato',
    b: 'Uno stimolo normale — un tocco, il freddo, uno sforzo — per te può diventare fortissimo. Non è inventato: è il sistema che risponde troppo.',
  },
  {
    k: '02',
    t: 'Le tensioni alimentano l’amplificatore',
    b: 'Un corpo pieno di tensioni manda continuamente segnali dentro quell’impianto: più ingressi, più rumore.',
  },
  {
    k: '03',
    t: 'Ridurre le tensioni toglie legna al fuoco',
    b: 'Non è la guarigione: è ridurre ciò che entra nell’amplificatore, un pezzo alla volta.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
    imageClassName: 'object-[0%_50%]',
    alt: 'Osteopata che tratta collo e spalle di una paziente supina',
    title: 'Antidolorifici comuni: spesso poco efficaci',
    body: 'Presi per anni su un dolore che risponde poco. FANS e analgesici da banco sono tra i meno efficaci proprio su questo tipo di dolore.',
  },
  {
    image: '/trattamenti/anca_decubito-laterale_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta anca e bacino di una paziente sdraiata su un fianco',
    title: '“È nella tua testa”',
    body: 'La frase più dura di tutte le visite — e quella che ti ha fatto perdere più anni. Qui si parte dal crederti.',
  },
  {
    image: '/trattamenti/schiena_lombare-prono_14_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico della zona lombare di un paziente a pancia in giù',
    title: 'Anni di visite per avere un nome',
    body: 'Reumatologo, neurologo, decine di analisi: sono serviti a dare un nome, non una soluzione. Tutti un pezzo, nessuno te intera.',
  },
  {
    image: '/trattamenti/gamba_piede-caviglia-supino_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di piede e caviglia di una paziente',
    title: 'Farmaci specifici e massaggi standard',
    body: 'I farmaci specifici prescritti dal medico gestiscono una parte dei casi. I massaggi normali a volte fanno male: la pressione va calibrata su di te.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_19_orizzontale',
    imageClassName: 'object-[18%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    title: 'Attività fisica, integratori e calore',
    body: 'Tra le poche cose con evidenza, o di sollievo momentaneo — ma difficili da sostenere quando ogni sforzo si paga.',
  },
  {
    image: '/trattamenti/schiena_dorsale-alta-prono_06_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta la parte alta della schiena di un paziente',
    title: 'Nessun esame la dimostra: è clinica',
    body: 'Sangue, radiografie e risonanze servono a escludere altro. Lo scorrimento delle tensioni e il carico sul sistema si valutano con le mani.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Sciogliamo le <strong>tensioni</strong> dove il carico è maggiore, con
    tecniche dolci e graduali
  </>,
  <>
    Torni a un <strong>sonno</strong> più riposante, con meno{' '}
    <strong>rigidità</strong> al mattino
  </>,
  <>
    Lavoriamo al tuo ritmo: niente sedute che ti lasciano{' '}
    <strong>peggio di prima</strong>
  </>,
  <>
    Non sostituiamo il medico: lavoriamo su ciò che i{' '}
    <strong>farmaci</strong> non raggiungono
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
    body: 'Analizziamo tensioni, respiro, diaframma e dinamica corporea per individuare fattori che possono alimentare il dolore.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su respiro, sonno e posture, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'nella-testa',
    question: (
      <>
        Mi hanno detto che è nella mia <strong>testa</strong>: è vero?
      </>
    ),
    answer: (
      <>
        No: il tuo dolore è reale. Nella fibromialgia il sistema del dolore ha il volume alzato —
        stimoli normali ti arrivano fortissimi — ed è un quadro documentato, non un’invenzione.
        Lo stress può peggiorarlo, ma non lo spiega da solo. Qui non partiamo dal sospetto: partiamo
        dal crederti, e lavoriamo sulle tensioni che continuano ad alimentare quel volume.
      </>
    ),
  },
  {
    id: 'massaggi-male',
    question: (
      <>
        I massaggi normali mi fanno male: come lavorate voi?
      </>
    ),
    answer: (
      <>
        Perché i massaggi “normali” usano pressioni standard su un corpo che ha già il volume del
        dolore alzato: per te diventano troppo. Qui la pressione si calibra su di te, seduta dopo
        seduta: tecniche dolci e graduali, al tuo ritmo. Comanda il tuo corpo, non un protocollo
        uguale per tutti.
      </>
    ),
  },
  {
    id: 'a-cosa-serve',
    question: (
      <>
        Se la fibromialgia non si guarisce, a cosa serve il trattamento?
      </>
    ),
    answer: (
      <>
        Non promettiamo la guarigione. Lavoriamo sulle tensioni che caricano il corpo ogni giorno:
        meno rigidità, sonno più riposante, più energia nelle giornate. Un miglioramento concreto
        e misurabile, pezzo dopo pezzo — non una soluzione totale.
      </>
    ),
  },
  {
    id: 'giorno-dopo',
    question: (
      <>
        Dopo la seduta rischio di stare <strong>peggio</strong>?
      </>
    ),
    answer: (
      <>
        È una paura legittima, e in fibromialgia va presa sul serio. Per questo lavoriamo con
        tecniche dolci e graduali, dosate sul tuo corpo: niente pressioni standard. Se qualcosa non
        ti convince, ci fermiamo. L’obiettivo non è “fare tanto”, è avanzare senza lasciarti
        peggio di prima.
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
        In presenza di articolazioni gonfie, calde e rosse, febbre persistente, calo di peso
        involontario, debolezza vera che peggiora, disturbi neurologici precisi o esami
        infiammatori alterati (VES, PCR alte), la priorità è la valutazione medica o
        reumatologica tempestiva: non è il quadro tipico su cui interveniamo noi. Noi lavoriamo
        solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'fibromialgia',
  heroVideo,
  videoTitle: 'Video trattamento fibromialgia - Mobilitas Torino',
  images: {
    hero: '/trattamenti/anca_flessa-supino_05_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/gamba_gamba-tesa-sollevata_02_orizzontale',
    bandClassName: 'object-[62%_62%]',
    final: '/trattamenti/pancia_addome-supino_13_orizzontale',
    finalClassName: 'object-[55%_62%]',
  },
  hero: {
    place: 'Torino',
    name: 'Fibromialgia',
    title: { main: 'Soffri di fibromialgia e il dolore decide ogni tua giornata?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>tensioni</strong>,{' '}
        <strong>sonno</strong> e{' '}
        <strong>respiro</strong> per ridurre l’impatto della
        fibromialgia su dolore, energia e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La fibromialgia non è solo un dolore da sopportare.', accent: 'Ti toglie energia, chiarezza e controllo.' },
    intro: (
      <>
        Ignorarla non la fa sparire: la normalizza. E più la normalizzi, più ti toglie{' '}
        <strong>giornate</strong>,{' '}
        <strong>relazioni</strong> e{' '}
        <strong>fiducia</strong> nel tuo corpo.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>I farmaci contano</strong>.{' '}
        <strong>Il reumatologo conta</strong>. Ma non sono
        l’unico livello del problema: le{' '}
        <strong>tensioni</strong> possono tenere alto il
        volume del dolore anche quando stai già facendo tutto.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Stimoli' }, { text: 'Tensioni' }, { text: 'Sonno' }, { text: 'Volume', accent: true }],
      caption: 'Il volume resta alto. Si può ridurre ciò che entra nell’amplificatore.',
    },
    narrative: (
      <>
        Nella fibromialgia il sistema del dolore ha il{' '}
        <strong>volume alzato</strong>: stimoli
        normali ti arrivano fortissimi — ed è reale. Un corpo pieno di{' '}
        <strong>tensioni</strong> continua ad
        alimentarlo: più tensioni, più dolore.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve sopportare di più.', accent: 'A volte serve ridurre le tensioni che tengono alto il volume.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> delle tensioni su dolore,
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
        <strong>energia</strong>, più{' '}
        <strong>riposo</strong> e meno dolore a comandare le
        tue giornate. Inizia con un consulto telefonico o la prima visita.
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
        Se anche una sola di queste risposte ti rappresenta, non restare ferma in una gestione
        solo “al bisogno”.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire un percorso concreto sulle tensioni — oltre a “è nella tua
        testa”.
      </>
    ),
  },
  seo: {
    dataPage: 'fibromialgia',
    path: '/fibromialgia',
    ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_02_orizzontale.jpg',
    title: 'Osteopata Fibromialgia Torino | Dolore Diffuso, Tensione e Sonno | Mobilitas',
    description:
      'Osteopata per fibromialgia a Torino (San Donato e Crocetta). Lavoriamo su tensioni, sonno e respiro con tecniche dolci calibrate, in affiancamento al percorso reumatologico. Prima visita 49€.',
    keywords: [
      'osteopata fibromialgia torino',
      'fibromialgia torino',
      'osteopatia fibromialgia',
      'trattamento fibromialgia osteopata',
      'dolore diffuso osteopata',
      'fibro fog osteopatia',
      'sonno non ristoratore fibromialgia',
      'tensioni muscolari fibromialgia',
      'fibromialgia tecniche dolci',
      'osteopata reumatologo torino',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per fibromialgia – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Fibromialgia Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per fibromialgia – Mobilitas Torino',
    condition: {
      name: 'Fibromialgia',
      alternateName: [
        'Sindrome fibromialgica',
        'Dolore muscolare diffuso',
        'Fibromyalgia',
        'Dolore nociplastico',
        'Stanchezza cronica con dolore',
        'Fibro fog',
      ],
      anatomy: 'Sistema muscoloscheletrico e sistema nervoso centrale',
    },
    therapy: {
      name: 'Trattamento osteopatico per fibromialgia',
      description:
        'Approccio osteopatico dolce e graduato su tensioni, diaframma, respiro e qualità del sonno, in affiancamento al percorso reumatologico e neurologico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per fibromialgia',
      },
    },
    breadcrumbName: 'Fibromialgia',
    faq: [
      {
        name: 'Mi hanno detto che è nella mia testa: è vero?',
        text: 'No: il tuo dolore è reale. Nella fibromialgia il sistema del dolore ha il volume alzato — stimoli normali ti arrivano fortissimi — ed è un quadro documentato, non un’invenzione. Lo stress può peggiorarlo, ma non lo spiega da solo. Qui non partiamo dal sospetto: partiamo dal crederti, e lavoriamo sulle tensioni che continuano ad alimentare quel volume.',
      },
      {
        name: 'I massaggi normali mi fanno male: come lavorate voi?',
        text: 'Perché i massaggi “normali” usano pressioni standard su un corpo che ha già il volume del dolore alzato: per te diventano troppo. Qui la pressione si calibra su di te, seduta dopo seduta: tecniche dolci e graduali, al tuo ritmo. Comanda il tuo corpo, non un protocollo uguale per tutti.',
      },
      {
        name: 'Se la fibromialgia non si guarisce, a cosa serve il trattamento?',
        text: 'Non promettiamo la guarigione. Lavoriamo sulle tensioni che caricano il corpo ogni giorno: meno rigidità, sonno più riposante, più energia nelle giornate. Un miglioramento concreto e misurabile, pezzo dopo pezzo — non una soluzione totale.',
      },
      {
        name: 'Dopo la seduta rischio di stare peggio?',
        text: 'È una paura legittima, e in fibromialgia va presa sul serio. Per questo lavoriamo con tecniche dolci e graduali, dosate sul tuo corpo: niente pressioni standard. Se qualcosa non ti convince, ci fermiamo. L’obiettivo non è “fare tanto”, è avanzare senza lasciarti peggio di prima.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'In presenza di articolazioni gonfie, calde e rosse, febbre persistente, calo di peso involontario, debolezza vera che peggiora, disturbi neurologici precisi o esami infiammatori alterati (VES, PCR alte), la priorità è la valutazione medica o reumatologica tempestiva: non è il quadro tipico su cui interveniamo noi. Noi lavoriamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function Fibromialgia() {
  return <PrimaVisitaLanding page={PAGE} />
}
