import {
  Sunrise,
  Drum,
  Utensils,
  Cloud,
  Zap,
  RefreshCw,
  Wind,
  Activity,
  Brain,
  Bath,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'
import { prefetchHeroVideo } from '../../components/condition-landing/heroVideo'

// Landing "Gonfiore addominale": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('GONFIORE_ADDOMINALE_VSL')

const HERO_BENEFITS = [
  <>
    Avere la stessa <strong>pancia</strong> alle otto di sera che avevi al{' '}
    <strong>mattino</strong>
  </>,
  <>
    Riprenderti i <strong>vestiti</strong> che hai messo via «per sicurezza»
  </>,
  <>
    Liberare il <strong>diaframma</strong> e capire perché le diete non bastano
  </>,
]

const PAIN_POINTS = [
  {
    icon: Sunrise,
    title: 'Pancia che si gonfia nel corso della giornata',
    body: 'Piatta al mattino, visibilmente distesa la sera — è il segno più caratteristico.',
  },
  {
    icon: Drum,
    title: 'Tensione e durezza addominale',
    body: 'La pancia è dura al tatto, tirata, come un tamburo.',
  },
  {
    icon: Utensils,
    title: 'Senso di pienezza dopo poco cibo',
    body: 'Ti basta mangiare due bocconi e ti senti già piena, come se non ci fosse più spazio.',
  },
  {
    icon: Cloud,
    title: 'Aria intestinale eccessiva',
    body: 'Meteorismo, flatulenza, rumori intestinali frequenti e imbarazzanti.',
  },
  {
    icon: Zap,
    title: 'Crampi o dolore addominale',
    body: 'Fitte o crampi che vanno e vengono, spesso legati ai pasti o all’evacuazione.',
  },
  {
    icon: RefreshCw,
    title: 'Alternanza di stitichezza e diarrea',
    body: 'L’intestino non trova un ritmo: giorni bloccato, giorni al contrario.',
  },
  {
    icon: Wind,
    title: 'Eruttazioni frequenti',
    body: 'Aria che risale, spesso associata a digestione lenta o reflusso.',
  },
  {
    icon: Activity,
    title: 'Respiro corto quando sei gonfia',
    body: 'La pancia distesa spinge verso l’alto e il diaframma fatica a scendere.',
  },
  {
    icon: Brain,
    title: 'Peggiora con lo stress',
    body: 'Nei periodi più tesi il gonfiore aumenta, anche mangiando le stesse cose di sempre.',
  },
  {
    icon: Bath,
    title: 'Sollievo dopo l’evacuazione',
    body: 'Il gonfiore si riduce, almeno per un po’, dopo essere andata in bagno.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'La pancia è una stanza con un tetto',
    b: 'Il tetto è il diaframma: a ogni respiro scende e risale, massaggiando gli organi e spingendo aria e liquidi a circolare.',
  },
  {
    k: '02',
    t: 'Se il tetto resta fermo, tutto ristagna',
    b: 'Respiro corto, tensione, postura chiusa: l’aria si accumula, la pancia si tende, e la sera sembri un’altra persona rispetto al mattino.',
  },
  {
    k: '03',
    t: 'La variabile non era solo il cibo',
    b: 'Un intestino sotto stress produce più aria e la muove peggio. Stessa dieta, pancia diversa: perché il movimento della pancia non si vede negli esami.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/pancia_addome-supino_08_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico sull’addome di una paziente',
    title: 'Eliminazione di cibi',
    body: 'Glutine, lattosio, lieviti, cipolla, FODMAP: hai tolto mezzo mondo e il gonfiore è ancora lì. Simeticone, dimeticone e carbone vegetale danno sollievo temporaneo sull’aria, non sulla causa.',
  },
  {
    image: '/trattamenti/pancia_addome-basso-supino_04_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta l’addome basso di un paziente',
    title: 'Fermenti lattici e probiotici',
    body: 'Aiutano una parte delle persone, ma raramente da soli. Procinetici e fermenti (domperidone, levosulpiride, probiotici) agiscono su digestione lenta e flora — non sulla meccanica della zona.',
  },
  {
    image: '/trattamenti/pancia_addome-supino_14_orizzontale',
    imageClassName: 'object-[35%_50%]',
    alt: 'Trattamento osteopatico sull’addome di una paziente',
    title: 'Carbone vegetale e antimeteorici',
    body: 'Sollievo temporaneo sull’aria, non sulla causa. Antispastici (otilonio bromuro, mebeverina, trimebutina) aiutano i crampi che accompagnano il gonfiore — senza spiegare perché si forma.',
  },
  {
    image: '/trattamenti/pancia_addome-basso-supino_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta l’addome basso di una paziente',
    title: 'Colonscopia ed esami',
    body: 'Fondamentali per escludere malattie: ecografia, breath test, colonscopia, gastroscopia. E quando sono negativi, resti con la stessa pancia — perché il movimento non si misura lì.',
  },
  {
    image: '/trattamenti/pancia_addome-supino_20_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico sull’addome di una paziente',
    title: 'Test per intolleranze',
    body: 'Molto richiesti, poco dirimenti, e spesso portano a diete inutilmente restrittive. Tisane, rimedi naturali ed enzimi digestivi: effetto lieve, passeggero o puntuale al pasto.',
  },
  {
    image: '/trattamenti/pancia_addome-supino_09_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico sull’addome di un paziente',
    title: '«È colon irritabile, ci devi convivere»',
    body: 'Un nome che vuol dire tutto e niente, e che chiude la conversazione. Mangiare lentamente e muoversi aiutano — ma se il diaframma non scende, la pancia resta bloccata.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Avere la stessa <strong>pancia</strong> la sera e al mattino
  </>,
  <>
    Capire perché le <strong>diete</strong> non sono bastate
  </>,
  <>
    Liberare il <strong>diaframma</strong> e riprenderti il respiro
  </>,
  <>
    Andare oltre <strong>«è colon irritabile»</strong>: partire dal perché
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
    body: 'Analizziamo diaframma, pancia, torace e postura per individuare fattori che possono favorire il gonfiore e il ristagno di aria.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su respiro e pasti, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'diete',
    question: (
      <>
        Ho già tolto <strong>glutine</strong>, lattosio e mezzo mondo: perché venire da voi?
      </>
    ),
    answer: (
      <>
        E la pancia gonfia lo stesso: segno che la variabile non era solo il cibo, ma come la pancia
        lo muove. È lì che si lavora — in affiancamento al medico, non al posto delle diete che hai
        già fatto.
      </>
    ),
  },
  {
    id: 'esami-negativi',
    question: (
      <>
        Gli <strong>esami</strong> sono tutti negativi: ha senso un percorso da voi?
      </>
    ),
    answer: (
      <>
        Buona notizia: esclude le malattie. Il movimento della pancia però non si vede negli esami:
        si valuta con le mani. Ecografia, colonscopia e breath test restano fondamentali quando
        servono; noi lavoriamo sulla parte funzionale che resta dopo.
      </>
    ),
  },
  {
    id: 'colon-irritabile',
    question: (
      <>
        È <strong>colon irritabile</strong>, mi hanno detto di conviverci: c’è altro da fare?
      </>
    ),
    answer: (
      <>
        Il nome descrive, non spiega. La domanda utile è perché il tuo intestino lavora così: e lì
        qualcosa da fare c’è — sul diaframma, sulla meccanica e sul sistema che comanda l’intestino.
      </>
    ),
  },
  {
    id: 'sera-doppio',
    question: (
      <>
        La sera sono il <strong>doppio</strong> del mattino: è normale?
      </>
    ),
    answer: (
      <>
        È frequente, non normale: racconta di un sistema che durante il giorno ristagna. Ed è
        proprio il segno su cui lavoriamo — rimettere in moto il «tetto» della pancia, il diaframma.
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
        In presenza di pancia gonfia con vomito e blocco di feci e aria (pronto soccorso), massa
        dura che si sente toccando la pancia, gonfiore costante che cresce da settimane con sazietà
        immediata dopo i 50 anni, gonfiore con calo di peso o sangue nelle feci, oppure dolore
        addominale forte e continuo con febbre, la priorità è la valutazione medica tempestiva. Noi
        interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'gonfiore-addominale',
  heroVideo,
  videoTitle: 'Video trattamento gonfiore addominale - Mobilitas Torino',
  images: {
    hero: '/trattamenti/pancia_addome-supino_13_orizzontale',
    heroClassName: 'object-[50%_62%]',
    band: '/trattamenti/pancia_addome-supino_01_orizzontale',
    bandClassName: 'object-[50%_55%]',
    final: '/trattamenti/pancia_addome-supino_15_orizzontale',
    finalClassName: 'object-[55%_62%]',
  },
  hero: {
    place: 'Torino',
    name: 'Gonfiore addominale',
    title: { main: 'Soffri di gonfiore addominale e ogni sera hai la pancia gonfia?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>diaframma</strong>,{' '}
        <strong>pancia</strong> e{' '}
        <strong>postura</strong> per ridurre il gonfiore
        che cresce nel corso della giornata.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'Il gonfiore non ti limita solo nei sintomi.', accent: 'Ti cambia la giornata, vestito dopo vestito.' },
    intro: (
      <>
        Ignorarlo non lo fa sparire: lo normalizza. E più lo normalizzi, più ti toglie{' '}
        <strong>vestiti</strong>,{' '}
        <strong>cene fuori</strong> e{' '}
        <strong>fiducia</strong> nel tuo corpo.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Non è solo quello che mangi.', accent: 'È come si muove la pancia.' },
    intro: (
      <>
        Il <strong>diaframma</strong> massaggia gli organi a
        ogni respiro. Se non scende bene, l’aria ristagna e la pancia si tende — anche con la
        stessa dieta di sempre.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Diaframma' }, { text: 'Torace' }, { text: 'Pancia', accent: true }, { text: 'Aria' }],
      caption: 'Il diaframma è il tetto della pancia: se non scende, l’aria ristagna.',
    },
    narrative: (
      <>
        La pancia è una stanza con un tetto che si muove: il{' '}
        <strong>diaframma</strong>. A ogni respiro il
        tetto scende e risale, massaggiando gli organi e spingendo aria e liquidi a
        circolare. Se resta fermo — respiro corto, tensione, postura chiusa — tutto
        ristagna. E c’è il secondo pezzo: un intestino sotto stress produce più aria e la
        muove peggio.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Stessa dieta, pancia diversa:', accent: 'la variabile non era solo il cibo.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sul tetto della pancia.' },
      intro: (
        <>
          Colloquio iniziale, lavoro sul diaframma, tecniche dolci sull’addome, apertura di
          torace e postura, riequilibrio del sistema che comanda l’intestino, consigli su
          respiro e pasti: un percorso chiaro per ridurre l’
          <strong>impatto</strong> del gonfiore sulla tua vita
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
        Se queste storie ti somigliano, il prossimo passo può restituirti la stessa{' '}
        <strong>pancia</strong> la sera e al mattino, i{' '}
        <strong>vestiti</strong> messi via e un respiro più
        libero. Inizia con un consulto telefonico o la prima visita.
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
        e iniziamo a lavorare sul diaframma e sulla meccanica della pancia — la parte che le
        diete non toccano.
      </>
    ),
  },
  seo: {
    dataPage: 'gonfiore-addominale',
    path: '/gonfiore-addominale',
    ogImage: '/trattamenti/og/pancia_addome-supino_08_orizzontale.jpg',
    title: 'Osteopata Gonfiore Addominale Torino | Diaframma e Pancia | Mobilitas',
    description:
      'Osteopata per gonfiore addominale a Torino (San Donato e Crocetta). Lavoriamo su diaframma, pancia, torace e postura, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata gonfiore addominale torino',
      'gonfiore addominale torino',
      'osteopatia gonfiore pancia',
      'trattamento gonfiore addominale osteopata',
      'meteorismo osteopata torino',
      'colon irritabile osteopata torino',
      'osteopata diaframma torino',
      'pancia gonfia osteopata',
      'osteopata intestino torino',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per gonfiore addominale – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Gonfiore Addominale Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per gonfiore addominale – Mobilitas Torino',
    condition: {
      name: 'Gonfiore addominale',
      alternateName: [
        'Meteorismo',
        'Distensione addominale',
        'Gonfiore pancia',
        'Colon irritabile',
      ],
      anatomy: 'Addome, diaframma, intestino e torace',
    },
    therapy: {
      name: 'Trattamento osteopatico per gonfiore addominale',
      description:
        'Approccio osteopatico integrato su diaframma, pancia, torace e postura per il gonfiore addominale, in affiancamento al percorso medico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per gonfiore addominale',
      },
    },
    breadcrumbName: 'Gonfiore addominale',
    faq: [
      {
        name: 'Ho già tolto glutine, lattosio e mezzo mondo: perché venire da voi?',
        text: 'E la pancia gonfia lo stesso: segno che la variabile non era solo il cibo, ma come la pancia lo muove. È lì che si lavora — in affiancamento al medico, non al posto delle diete che hai già fatto.',
      },
      {
        name: 'Gli esami sono tutti negativi: ha senso un percorso da voi?',
        text: 'Buona notizia: esclude le malattie. Il movimento della pancia però non si vede negli esami: si valuta con le mani. Ecografia, colonscopia e breath test restano fondamentali quando servono; noi lavoriamo sulla parte funzionale che resta dopo.',
      },
      {
        name: 'È colon irritabile, mi hanno detto di conviverci: c’è altro da fare?',
        text: 'Il nome descrive, non spiega. La domanda utile è perché il tuo intestino lavora così: e lì qualcosa da fare c’è — sul diaframma, sulla meccanica e sul sistema che comanda l’intestino.',
      },
      {
        name: 'La sera sono il doppio del mattino: è normale?',
        text: 'È frequente, non normale: racconta di un sistema che durante il giorno ristagna. Ed è proprio il segno su cui lavoriamo — rimettere in moto il «tetto» della pancia, il diaframma.',
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'In presenza di pancia gonfia con vomito e blocco di feci e aria (pronto soccorso), massa dura che si sente toccando la pancia, gonfiore costante che cresce da settimane con sazietà immediata dopo i 50 anni, gonfiore con calo di peso o sangue nelle feci, oppure dolore addominale forte e continuo con febbre, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function GonfioreAddominale() {
  return <PrimaVisitaLanding page={PAGE} />
}
