import {
  Zap,
  PersonStanding,
  MoveDown,
  Frown,
  CircleAlert,
  BatteryLow,
  Activity,
  Bed,
  CalendarDays,
  TrendingDown,
} from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'

// Landing "Ciclo doloroso": solo contenuti e dati. Struttura, grafica e logica (video, popup di
// prenotazione, recensioni, SEO) stanno in components/condition-landing.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('CICLO_DOLOROSO_VSL')

const HERO_BENEFITS = [
  <>
    Smetti di sentirti dire che il <strong>dolore</strong> è{' '}
    <strong>normale</strong>
  </>,
  <>
    Riduci <strong>crampi</strong> e tensioni di{' '}
    <strong>bacino</strong> e lombare
  </>,
  <>
    Torna a vivere i tuoi giorni con meno <strong>rinunce</strong>
  </>,
]

const PAIN_POINTS = [
  {
    icon: Zap,
    title: 'Crampi al basso ventre',
    body: 'Dolore pulsante o a fitte nella parte bassa della pancia, che inizia poco prima o con l’arrivo del ciclo.',
  },
  {
    icon: PersonStanding,
    title: 'Dolore alla schiena bassa',
    body: 'Un dolore sordo nella zona lombare e sacrale, che spesso accompagna i crampi.',
  },
  {
    icon: MoveDown,
    title: 'Dolore che scende alle cosce',
    body: 'Le gambe diventano pesanti e il dolore si irradia verso l’interno coscia.',
  },
  {
    icon: Frown,
    title: 'Nausea e a volte vomito',
    body: 'Nei giorni peggiori lo stomaco si chiude e mangiare diventa difficile.',
  },
  {
    icon: CircleAlert,
    title: 'Mal di testa',
    body: 'Cefalea che compare nei giorni del ciclo o poco prima.',
  },
  {
    icon: BatteryLow,
    title: 'Stanchezza intensa',
    body: 'Una spossatezza sproporzionata, che ti costringe a rallentare tutto.',
  },
  {
    icon: Activity,
    title: 'Disturbi intestinali',
    body: 'Diarrea, gonfiore o crampi intestinali che si sommano a quelli mestruali.',
  },
  {
    icon: Bed,
    title: 'Dolore che ti costringe a fermarti',
    body: 'Non riesci a lavorare, uscire o studiare: devi sdraiarti e aspettare.',
  },
  {
    icon: CalendarDays,
    title: 'Il dolore inizia prima del ciclo',
    body: 'Uno o due giorni prima senti già la pancia tirare e la schiena pesante.',
  },
  {
    icon: TrendingDown,
    title: 'Peggiora nei primi due giorni e poi si attenua',
    body: 'Il picco è all’inizio del flusso, poi tende a ridursi.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'L’utero si contrae nel bacino',
    b: 'È un muscolo ancorato da legamenti a ossa e tessuti intorno. Durante il ciclo si contrae: è fisiologico.',
  },
  {
    k: '02',
    t: 'Se il bacino è rigido, le contrazioni trovano resistenza',
    b: 'Schiena bassa che tira e tessuti che scorrono male: le stesse contrazioni fanno più male.',
  },
  {
    k: '03',
    t: 'Si lavora sulla parte meccanica',
    b: 'Il ciclo resta. Sul bacino che ospita l’utero — e sulla resistenza che amplifica il dolore — spesso nessuno ha ancora lavorato.',
  },
]

const BENEFITS = [
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.3.JPG',
    imageClassName: 'object-[52%_58%]',
    alt: 'Trattamento osteopatico sull’addome per ciclo doloroso e dismenorrea',
    title: 'Antidolorifici e borsa calda: resistere, non curare',
    body: 'Reggono la giornata e danno sollievo vero. Ma dal blister mensile da vent’anni non si esce: agiscono sul dolore, non su cosa lo produce.',
  },
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.7.JPG',
    imageClassName: 'object-[48%_52%]',
    alt: 'Valutazione osteopatica di bacino e anca nel ciclo doloroso',
    title: '“È normale, sei una donna”',
    body: 'Non è una soluzione ed è la frase che, da quando avevi quindici anni, ti impedisce di cercarne una.',
  },
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.9.JPG',
    imageClassName: 'object-[54%_58%]',
    alt: 'Lavoro osteopatico su bacino e addome in affiancamento alla visita ginecologica',
    title: 'Pillola come prima e unica risposta',
    body: 'Gestisce l’ormone, e quando la smetti il quadro tende a tornare. Nessuno ti ha spiegato perché fa male.',
  },
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.10.JPG',
    imageClassName: 'object-[68%_55%]',
    alt: 'Trattamento osteopatico su bacino e anca per ciclo doloroso',
    title: 'Ecografia e visita ginecologica a posto',
    body: 'Passaggio necessario per escludere cause strutturali. Quando è tutto a posto, resti senza spiegazione — e senza un lavoro sul bacino.',
  },
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.1.png',
    imageClassName: 'object-[58%_42%]',
    alt: 'Approccio osteopatico delicato su tensione e carico nel ciclo doloroso',
    title: 'Integratori, stretching e dieta: pezzi del puzzle',
    body: 'Possono aiutare sul lungo periodo, ma raramente affrontano da soli bacino, diaframma e zona lombare.',
  },
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.8.JPG',
    imageClassName: 'object-[55%_52%]',
    alt: 'Percorso osteopatico sulla zona lombare per ridurre l’impatto del ciclo doloroso',
    title: 'Farmaci e esami: un pezzo del quadro',
    body: 'FANS, pillola ed ecografia restano riferimenti medici. Noi lavoriamo sulla parte meccanica che la visita ginecologica non valuta.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Sciogliamo <strong>tensioni</strong> di bacino e lombare che
    amplificano i crampi
  </>,
  <>
    Torni a vivere i giorni del flusso con meno <strong>dolore</strong> e{' '}
    <strong>rinunce</strong>
  </>,
  <>
    Torni a muoverti con più <strong>scioltezza</strong> di bacino e
    schiena
  </>,
  <>
    Non sostituiamo il ginecologo: lavoriamo su ciò che{' '}
    <strong>farmaci</strong> e pillola non risolvono da soli
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
    body: 'Analizziamo bacino, diaframma, zona lombare e dinamica corporea per individuare fattori che possono amplificare i crampi.',
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
        Che il ciclo si senta è normale; che ti cancelli giornate intere no. Una parte del dolore
        può essere meccanica — bacino, diaframma, zona lombare — e su quella si lavora, in
        affiancamento al ginecologo, non al posto suo.
      </>
    ),
  },
  {
    id: 'ginecologo-ok',
    question: (
      <>
        Il ginecologo dice che è tutto a posto: perché venire da voi?
      </>
    ),
    answer: (
      <>
        Ottimo: esclude le cause organiche. Resta la parte meccanica del bacino, che la visita
        ginecologica non valuta. Lì lavoriamo noi, in parallelo al percorso medico.
      </>
    ),
  },
  {
    id: 'imbarazzo',
    question: (
      <>
        Mi imbarazza la <strong>zona</strong>: come lavorate?
      </>
    ),
    answer: (
      <>
        Si lavora dall’esterno, con abbigliamento comodo, spiegando ogni passaggio. Niente
        avviene senza il tuo consenso: ti fermi quando vuoi.
      </>
    ),
  },
  {
    id: 'gia-prendo',
    question: (
      <>
        Prendo già qualcosa nei giorni peggiori: ha senso venire?
      </>
    ),
    answer: (
      <>
        Sì, se il dolore resta invalidante. Gli antidolorifici, secondo le indicazioni del medico,
        gestiscono il sintomo. Noi lavoriamo sulla resistenza del bacino, perché quei giorni
        pesino meno in partenza — senza sostituire la terapia.
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
        In presenza di dolore improvviso e violentissimo al basso ventre diverso dal solito,
        febbre con perdite maleodoranti, test di gravidanza positivo con dolore forte,
        sanguinamenti abbondanti fuori dal ciclo che si ripetono, oppure dolore che peggiora
        ciclo dopo ciclo, la priorità è la valutazione medica o ginecologica tempestiva. Noi
        interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'ciclo-doloroso',
  heroVideo,
  videoTitle: 'Video trattamento ciclo doloroso - Mobilitas Torino',
  images: {
    hero: '/cervicalgia/cerv11.JPG',
    band: '/cervicalgia/cerv10.JPG',
    final: '/cervicalgia/cerv13.JPG',
  },
  hero: {
    place: 'Torino',
    name: 'Ciclo doloroso',
    title: { main: 'Hai un ciclo doloroso e ti dicono che è normale?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>bacino</strong>,{' '}
        <strong>diaframma</strong> e{' '}
        <strong>zona lombare</strong> per ridurre l’impatto
        del ciclo doloroso su giorni, energia e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'Il ciclo doloroso non ti limita solo nei crampi.', accent: 'Ti toglie giorni interi dalla vita.' },
    intro: (
      <>
        Ignorarlo non lo fa sparire: lo normalizza. E più lo normalizzi, più ti toglie{' '}
        <strong>giornate</strong>,{' '}
        <strong>energia</strong> e{' '}
        <strong>serenità</strong> quando arriva il flusso.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Farmaci</strong> e{' '}
        <strong>ginecologo</strong> restano punti
        importanti. Ma se il{' '}
        <strong>bacino è rigido</strong>, le contrazioni
        trovano un muro: lo stesso ciclo fa più male.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Diaframma' }, { text: 'Bacino' }, { text: 'Lombare' }, { text: 'Utero', accent: true }],
      caption: 'Il ciclo è fisiologico. Il bacino rigido può renderlo invalidante.',
    },
    narrative: (
      <>
        L’<strong>utero</strong> è un muscolo che
        vive nel bacino, ancorato a ossa e tessuti intorno. Durante il ciclo si contrae:
        è fisiologico. Ma se il{' '}
        <strong>bacino</strong> è rigido, quelle
        contrazioni trovano resistenza: più dolore, più giorni persi.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve solo accettare che “è normale”.', accent: 'A volte serve lavorare su bacino, diaframma e zona lombare.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> del dolore su giorni,
          energia e sulla vita quotidiana, con un percorso serio e misurabile.
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
        <strong>giorni</strong>, meno{' '}
        <strong>crampi</strong> e un calendario che non
        decide al posto tuo. Inizia con un consulto telefonico o la prima visita.
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
        e iniziamo a costruire un percorso concreto sul bacino — oltre a borsa calda e
        “è normale”.
      </>
    ),
  },
  seo: {
    dataPage: 'ciclo-doloroso',
    path: '/ciclo-doloroso',
    ogImage: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.3.JPG',
    title: 'Osteopata Ciclo Doloroso Torino | Dismenorrea, Bacino e Lombare | Mobilitas',
    description:
      'Osteopata per ciclo doloroso e dismenorrea a Torino (San Donato e Crocetta). Lavoriamo su bacino, diaframma e zona lombare, in affiancamento al percorso ginecologico. Prima visita 49€.',
    keywords: [
      'osteopata ciclo doloroso torino',
      'dismenorrea osteopata',
      'ciclo mestruale doloroso torino',
      'crampi mestruali osteopatia',
      'mal di schiena ciclo osteopata',
      'bacino e ciclo doloroso',
      'endometriosi osteopata torino',
      'dolore mestruale trattamento',
      'osteopata ginecologico torino',
      'dismenorrea primaria torino',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per ciclo doloroso – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Ciclo Doloroso Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per ciclo doloroso – Mobilitas Torino',
    condition: {
      name: 'Ciclo doloroso e dismenorrea',
      alternateName: [
        'Ciclo doloroso',
        'Dismenorrea',
        'Crampi mestruali',
        'Dolore mestruale',
        'Dismenorrea primaria',
        'Dolore pelvico ciclico',
      ],
      anatomy: 'Bacino, utero, diaframma e zona lombare',
    },
    therapy: {
      name: 'Trattamento osteopatico per ciclo doloroso',
      description:
        'Approccio osteopatico integrato su bacino, osso sacro, zona lombare, diaframma e pancia bassa, in affiancamento al percorso ginecologico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per ciclo doloroso',
      },
    },
    breadcrumbName: 'Ciclo doloroso',
    faq: [
      {
        name: 'Mi hanno detto che è normale: è vero?',
        text: 'Che il ciclo si senta è normale; che ti cancelli giornate intere no. Una parte del dolore può essere meccanica — bacino, diaframma, zona lombare — e su quella si lavora, in affiancamento al ginecologo, non al posto suo.',
      },
      {
        name: 'Il ginecologo dice che è tutto a posto: perché venire da voi?',
        text: 'Ottimo: esclude le cause organiche. Resta la parte meccanica del bacino, che la visita ginecologica non valuta. Lì lavoriamo noi, in parallelo al percorso medico.',
      },
      {
        name: 'Mi imbarazza la zona: come lavorate?',
        text: 'Si lavora dall’esterno, con abbigliamento comodo, spiegando ogni passaggio. Niente avviene senza il tuo consenso: ti fermi quando vuoi.',
      },
      {
        name: 'Prendo già qualcosa nei giorni peggiori: ha senso venire?',
        text: 'Sì, se il dolore resta invalidante. Gli antidolorifici, secondo le indicazioni del medico, gestiscono il sintomo. Noi lavoriamo sulla resistenza del bacino, perché quei giorni pesino meno in partenza — senza sostituire la terapia.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'In presenza di dolore improvviso e violentissimo al basso ventre diverso dal solito, febbre con perdite maleodoranti, test di gravidanza positivo con dolore forte, sanguinamenti abbondanti fuori dal ciclo che si ripetono, oppure dolore che peggiora ciclo dopo ciclo, la priorità è la valutazione medica o ginecologica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function CicloDoloroso() {
  return <ConditionLanding page={PAGE} />
}
