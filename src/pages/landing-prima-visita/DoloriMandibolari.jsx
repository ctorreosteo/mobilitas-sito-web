import {
  Utensils,
  Repeat,
  Lock,
  Ear,
  Zap,
  Mic,
  Smile,
  ArrowDown,
  Coffee,
  Clock,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'

// Landing "Dolori mandibolari": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

const HERO_BENEFITS = [
  <>
    Torna a <strong>masticare</strong> senza scegliere i cibi in base al
    dolore
  </>,
  <>
    Apri la bocca con meno <strong>click</strong> e senza la paura che si{' '}
    <strong>blocchi</strong>
  </>,
  <>
    Capisci cosa c’entrano <strong>collo</strong>, postura e{' '}
    <strong>lingua</strong> con la tua mandibola
  </>,
]

const PAIN_POINTS = [
  {
    icon: Utensils,
    title: 'Dolore masticando',
    body: 'Carne, pane croccante, una mela: certi cibi li eviti, oppure mastichi solo da un lato per non sentire male.',
  },
  {
    icon: Repeat,
    title: 'Click o scrocchio quando apri la bocca',
    body: 'Un rumore davanti all’orecchio a ogni boccone o sbadiglio, a volte lo sente anche chi ti sta vicino.',
  },
  {
    icon: Lock,
    title: 'La mandibola si blocca',
    body: 'A volte la bocca non si apre del tutto, o resta “incastrata” finché non la sposti con un movimento preciso.',
  },
  {
    icon: Ear,
    title: 'Dolore all’orecchio, ma l’orecchio è sano',
    body: 'Senti male dentro o davanti all’orecchio, il medico controlla e non trova otite né infiammazioni.',
  },
  {
    icon: Zap,
    title: 'Mal di testa alle tempie',
    body: 'Un dolore che parte dai lati della testa e scende verso la mascella, spesso dopo pasti o giornate tese.',
  },
  {
    icon: Smile,
    title: 'Apri la bocca storta o poco',
    body: 'Allo specchio la mandibola devia da un lato, e non riesci a infilare tre dita in verticale tra i denti.',
  },
  {
    icon: Mic,
    title: 'Fatica a parlare a lungo',
    body: 'Dopo una riunione, una lezione o una lunga telefonata la mascella è stanca e dolente.',
  },
  {
    icon: Coffee,
    title: 'Paura di sbadigliare o mordere',
    body: 'Trattieni lo sbadiglio, tagli tutto a pezzetti piccoli, eviti panini alti: piccole rinunce che si sommano.',
  },
  {
    icon: ArrowDown,
    title: 'Dolore che scende verso il collo',
    body: 'La tensione non resta nella mascella: si allarga a collo, nuca e spalle, dallo stesso lato.',
  },
  {
    icon: Clock,
    title: 'Va e viene da mesi',
    body: 'Periodi tranquilli e poi una nuova crisi, senza capire cosa la fa ripartire.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Un’articolazione che lavora in coppia',
    b: 'Le due ATM si muovono insieme a ogni boccone e parola. Se una delle due scorre male, l’altra compensa e i muscoli si caricano: arrivano click, dolore e blocchi.',
  },
  {
    k: '02',
    t: 'Collo e postura spostano il punto di partenza',
    b: 'Con la testa in avanti — scrivania, telefono, guida — la mandibola cambia posizione di riposo, e l’articolazione lavora fuori asse per ore.',
  },
  {
    k: '03',
    t: 'Anche la lingua fa la sua parte',
    b: 'Lingua bassa, respiro dalla bocca e masticatori contratti tirano la mandibola nella direzione sbagliata. Se non si guardano, il dolore torna.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/atm_presa-mandibolare-esterna_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Presa esterna sulla mandibola di una paziente per l’ATM',
    title: '“Il click non è grave, non ci pensare”',
    body: 'Spesso è vero che non è pericoloso. Ma se si accompagna a dolore, blocchi o apertura ridotta, va capito invece di aspettare.',
  },
  {
    image: '/trattamenti/atm_intraorale_01_orizzontale',
    imageClassName: 'object-[55%_60%]',
    alt: 'Trattamento intraorale dell’articolazione temporo-mandibolare',
    title: 'Il bite: utile, ma non sempre basta',
    body: 'Scarica l’articolazione e protegge i denti, ed è prescritto per buoni motivi. Se però collo, lingua e muscoli restano rigidi, il dolore può restare.',
  },
  {
    image: '/trattamenti/schiena_dorsale-alta-prono_06_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico della zona dorsale alta di un paziente prono',
    title: 'Antinfiammatori e cibi morbidi',
    body: 'Danno tregua nelle fasi acute, e a volte servono. Non cambiano il modo in cui l’articolazione si muove quando torni a mangiare normalmente.',
  },
  {
    image: '/trattamenti/collo_allungamento-cervicale-supino_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Allungamento cervicale di una paziente supina',
    title: '“L’orecchio è a posto”: e il dolore?',
    body: 'Escludere un’otite è giusto. Ma l’ATM è a pochi millimetri dall’orecchio, e molto dolore “all’orecchio” parte da lì.',
  },
  {
    image: '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale',
    imageClassName: 'object-[50%_40%]',
    alt: 'Valutazione posturale in piedi in studio',
    title: 'Collo e postura: il pezzo che nessuno guarda',
    body: 'La mandibola viene trattata da sola, come se non fosse appesa a un collo. Spesso è proprio lì che il carico comincia.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_21_orizzontale',
    imageClassName: 'object-[30%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    title: 'Approccio integrato: dentista/gnatologo + osteopatico',
    body: 'Visita gnatologica, bite ed eventuali esami come la RM dell’ATM restano il riferimento. Noi lavoriamo su articolazione, muscoli, collo e lingua.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Lavoriamo su <strong>ATM</strong> e masticatori per migliorare come la
    mandibola si apre e si chiude
  </>,
  <>
    Includiamo <strong>collo</strong>, <strong>postura</strong> e{' '}
    <strong>lingua</strong>, che la mandibola si porta dietro
  </>,
  <>
    Torni a <strong>mangiare</strong>, parlare e sbadigliare con meno
    attenzione e meno dolore
  </>,
  <>
    Non sostituiamo dentista e gnatologo: lavoriamo in{' '}
    <strong>affiancamento</strong> al bite e alle loro indicazioni
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
    body: 'Ricostruiamo sintomi, blocchi, visite odontoiatriche, bite ed esami fatti, per definire priorità e obiettivi realistici.',
  },
  {
    title: 'Valutazione obiettiva e posturale',
    body: 'Misuriamo apertura e deviazione della bocca, ascoltiamo i click e valutiamo masticatori, collo, postura e posizione della lingua.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su masticazione, posizione della lingua, postura e piccoli esercizi, da integrare con le indicazioni del dentista.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'bruxismo',
    question: (
      <>
        Non digrigno i denti: può essere comunque l’<strong>ATM</strong>?
      </>
    ),
    answer: (
      <>
        Sì. Il bruxismo è una delle cause, non l’unica. Postura del collo, abitudini della lingua,
        masticazione da un lato solo, un vecchio trauma o un lungo lavoro dal dentista possono
        sovraccaricare l’articolazione anche in chi non stringe i denti.
      </>
    ),
  },
  {
    id: 'bite',
    question: (
      <>
        Ho il <strong>bite</strong> ma il dolore resta: cosa sbaglio?
      </>
    ),
    answer: (
      <>
        Probabilmente niente: il bite fa il suo lavoro sui denti e sull’articolazione, e va
        portato come indicato dal dentista. Se il dolore resta, spesso mancano collo, lingua e
        muscoli masticatori. Lì lavoriamo noi, in affiancamento.
      </>
    ),
  },
  {
    id: 'click',
    question: (
      <>
        Il <strong>click</strong> sparirà?
      </>
    ),
    answer: (
      <>
        Dipende da cosa lo provoca. A volte si riduce, a volte resta ma smette di fare male e di
        bloccarsi: ed è questo che conta di più nella vita di tutti i giorni. In visita ti diciamo
        con chiarezza cosa è realistico aspettarsi.
      </>
    ),
  },
  {
    id: 'collo',
    question: (
      <>
        Perché lavorate anche sul <strong>collo</strong> se il male è alla mandibola?
      </>
    ),
    answer: (
      <>
        Perché la mandibola è appesa al cranio, e il cranio poggia sul collo. Se la testa sta
        sempre in avanti o il collo è rigido, la mandibola parte già fuori posizione. Trattarla
        da sola spesso non basta.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che il <strong>dolore alla mandibola</strong> passa del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. L’obiettivo onesto è capire cosa sovraccarica la tua
        articolazione e ridurre l’impatto su masticazione, parola e mal di testa: meno dolore,
        meno blocchi, più libertà nei gesti quotidiani. Quanto si può migliorare nel tuo caso si
        capisce solo valutandoti — nessuna promessa facile, solo chiarezza.
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
        Se la bocca si è bloccata all’improvviso e non riesci più ad aprirla o chiuderla, se il
        dolore è comparso dopo un colpo o una caduta, se c’è gonfiore caldo davanti all’orecchio
        con febbre, se hai intorpidimento del viso, se il dolore alla mandibola compare sotto
        sforzo insieme a dolore al petto, fiato corto o sudorazione (in questo caso chiama il
        112), oppure se dopo i 50 anni hai mal di testa nuovo alle tempie con dolore masticando o
        disturbi della vista, la priorità è la valutazione medica o dentistica tempestiva. Noi
        interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'dolori-mandibolari',
  heroVideo: null, // Video non ancora girato: in apertura c'è la foto images.hero. Quando c'è, prefetchHeroVideo('DOLORI_MANDIBOLARI_VSL') a livello di modulo
  videoTitle: 'Video trattamento dolori mandibolari - Mobilitas Torino',
  images: {
    hero: '/trattamenti/atm_mandibola-con-guanto_01_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/atm_intraorale-lingua_01_orizzontale',
    bandClassName: 'object-[50%_65%]',
    final: '/trattamenti/collo_cervicale-e-spalle-supino_03_orizzontale',
    finalClassName: 'object-[10%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Dolori mandibolari',
    title: { main: 'Dolore alla mandibola, click o bocca che si blocca?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>articolazione temporo-mandibolare</strong>,{' '}
        <strong>collo</strong> e{' '}
        <strong>lingua</strong> per ridurre l’impatto del
        dolore alla mandibola su masticazione, parola e mal di testa.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'Il dolore alla mandibola non resta nella mandibola.', accent: 'Ti limita a tavola, quando parli e quando sbadigli.' },
    intro: (
      <>
        Ignorarlo non lo fa sparire: lo normalizza. E più lo normalizzi, più ti toglie{' '}
        <strong>libertà a tavola</strong>,{' '}
        <strong>scioltezza</strong> nel parlare e giornate
        senza mal di testa.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Il dentista conta</strong>.{' '}
        <strong>Il bite conta</strong>. Ma la mandibola non
        lavora da sola: <strong>collo</strong>,{' '}
        <strong>postura</strong> e{' '}
        <strong>lingua</strong> decidono da dove parte ogni
        suo movimento.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Collo' }, { text: 'Postura' }, { text: 'ATM', accent: true }, { text: 'Lingua' }],
      caption: 'La mandibola è dove fa male. Il carico arriva anche da collo, postura e lingua.',
    },
    narrative: (
      <>
        Ogni volta che mastichi, parli o sbadigli, le due{' '}
        <strong>ATM</strong> scorrono insieme. Se la testa sta
        in avanti, la <strong>lingua</strong> riposa in basso e i
        masticatori sono rigidi, l’articolazione lavora fuori asse — e arrivano click,
        dolore e blocchi.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre basta guardare i denti.', accent: 'A volte serve guardare come si muove l’articolazione.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'su articolazione, collo e postura insieme.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> del dolore mandibolare su
          masticazione, parola e vita quotidiana, con un percorso serio e misurabile.
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
        <strong>libertà a tavola</strong>, più{' '}
        <strong>scioltezza</strong> e meno mal di testa alle
        tempie. Inizia con un consulto telefonico o la prima visita.
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
        Se anche una sola di queste risposte ti rappresenta, non restare fermo a masticare da un
        lato solo.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire un percorso concreto per ridurre l’impatto del dolore mandibolare
        sulla tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'dolori-mandibolari',
    path: '/dolori-mandibolari',
    ogImage: '/trattamenti/og/atm_mandibola-con-guanto_01_orizzontale.jpg',
    title: 'Osteopata Dolori Mandibolari Torino | ATM, Click e Mandibola Bloccata | Mobilitas',
    description:
      'Osteopata per dolori mandibolari e ATM a Torino (San Donato e Crocetta). Lavoriamo su articolazione temporo-mandibolare, collo, postura e lingua, in affiancamento a dentista e gnatologo. Prima visita 49€.',
    keywords: [
      'osteopata dolori mandibolari torino',
      'dolore mandibola torino',
      'osteopata atm torino',
      'osteopatia atm',
      'disfunzione temporo-mandibolare osteopata',
      'click mandibola',
      'mandibola bloccata torino',
      'dolore masticando',
      'dolore orecchio mandibola',
      'mal di testa tempie mandibola',
      'bite e osteopatia',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per dolori mandibolari e ATM – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Dolori Mandibolari Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per dolori mandibolari – Mobilitas Torino',
    condition: {
      name: 'Disordini temporo-mandibolari (dolori mandibolari)',
      alternateName: [
        'Dolore alla mandibola',
        'Disfunzione ATM',
        'Disordine temporo-mandibolare',
        'Click mandibolare',
        'Mandibola bloccata',
        'Dolore all’articolazione temporo-mandibolare',
      ],
      anatomy: 'Articolazione temporo-mandibolare, muscoli masticatori, collo e lingua',
    },
    therapy: {
      name: 'Trattamento osteopatico per dolori mandibolari',
      description:
        'Approccio osteopatico integrato su articolazione temporo-mandibolare, muscoli masticatori, collo, postura e lingua, in affiancamento a dentista e gnatologo.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per dolori mandibolari',
      },
    },
    breadcrumbName: 'Dolori mandibolari',
    faq: [
      {
        name: 'Non digrigno i denti: può essere comunque l’ATM?',
        text: 'Sì. Il bruxismo è una delle cause, non l’unica. Postura del collo, abitudini della lingua, masticazione da un lato solo, un vecchio trauma o un lungo lavoro dal dentista possono sovraccaricare l’articolazione anche in chi non stringe i denti.',
      },
      {
        name: 'Ho il bite ma il dolore resta: cosa sbaglio?',
        text: 'Probabilmente niente: il bite fa il suo lavoro sui denti e sull’articolazione, e va portato come indicato dal dentista. Se il dolore resta, spesso mancano collo, lingua e muscoli masticatori. Lì lavoriamo noi, in affiancamento.',
      },
      {
        name: 'Il click sparirà?',
        text: 'Dipende da cosa lo provoca. A volte si riduce, a volte resta ma smette di fare male e di bloccarsi: ed è questo che conta di più nella vita di tutti i giorni. In visita ti diciamo con chiarezza cosa è realistico aspettarsi.',
      },
      {
        name: 'Perché lavorate anche sul collo se il male è alla mandibola?',
        text: 'Perché la mandibola è appesa al cranio, e il cranio poggia sul collo. Se la testa sta sempre in avanti o il collo è rigido, la mandibola parte già fuori posizione. Trattarla da sola spesso non basta.',
      },
      {
        name: 'Mi promettete che il dolore alla mandibola passa del tutto?',
        text: 'No, e diffidiamo di chi lo fa. L’obiettivo onesto è capire cosa sovraccarica la tua articolazione e ridurre l’impatto su masticazione, parola e mal di testa: meno dolore, meno blocchi, più libertà nei gesti quotidiani. Quanto si può migliorare nel tuo caso si capisce solo valutandoti — nessuna promessa facile, solo chiarezza.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'Se la bocca si è bloccata all’improvviso e non riesci più ad aprirla o chiuderla, se il dolore è comparso dopo un colpo o una caduta, se c’è gonfiore caldo davanti all’orecchio con febbre, se hai intorpidimento del viso, se il dolore alla mandibola compare sotto sforzo insieme a dolore al petto, fiato corto o sudorazione (in questo caso chiama il 112), oppure se dopo i 50 anni hai mal di testa nuovo alle tempie con dolore masticando o disturbi della vista, la priorità è la valutazione medica o dentistica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function DoloriMandibolari() {
  return <PrimaVisitaLanding page={PAGE} />
}
