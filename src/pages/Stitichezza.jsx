import {
  Car,
  CalendarDays,
  Circle,
  CircleDot,
  ArrowDownToLine,
  Cloud,
  Zap,
  Lock,
  Pill,
  TriangleAlert,
} from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'

// Landing "Stitichezza": solo contenuti e dati. Struttura, grafica e logica (video, popup di
// prenotazione, recensioni, SEO) stanno in components/condition-landing.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('STITICHEZZA_VSL')

const HERO_BENEFITS = [
  <>
    Riprenditi la <strong>mattina</strong> senza aspettare il{' '}
    <strong>verdetto</strong>
  </>,
  <>
    Ritrova un <strong>ritmo</strong> senza contare i giorni di{' '}
    <strong>attesa</strong>
  </>,
  <>
    Riduci la <strong>dipendenza</strong> dai lassativi, passo dopo passo
  </>,
]

const PAIN_POINTS = [
  {
    icon: CalendarDays,
    title: 'Evacuazioni poco frequenti',
    body: 'Meno di tre volte a settimana, spesso con giorni di intervallo.',
  },
  {
    icon: Circle,
    title: 'Feci dure e difficili da espellere',
    body: 'Consistenza secca e compatta che richiede sforzo.',
  },
  {
    icon: CircleDot,
    title: 'Sensazione di evacuazione incompleta',
    body: 'Esci dal bagno con la sensazione di non aver finito.',
  },
  {
    icon: ArrowDownToLine,
    title: 'Necessità di spingere a lungo',
    body: 'Lo sforzo è necessario in una parte importante delle evacuazioni.',
  },
  {
    icon: Cloud,
    title: 'Gonfiore e tensione addominale',
    body: 'La pancia è distesa e dura, spesso dolente.',
  },
  {
    icon: Zap,
    title: 'Dolore o crampi addominali',
    body: 'Fitte che compaiono e passano, spesso alleviate dall’evacuazione.',
  },
  {
    icon: Lock,
    title: 'Senso di blocco o tappo',
    body: 'La sensazione che qualcosa si fermi e non riesca a proseguire.',
  },
  {
    icon: Car,
    title: 'Peggiora in viaggio o fuori casa',
    body: 'Cambi di ambiente, ritmi e orari bloccano ulteriormente l’intestino.',
  },
  {
    icon: Pill,
    title: 'Dipendenza da lassativi',
    body: 'Senza il ricorso a lassativi o supposte l’evacuazione non avviene.',
  },
  {
    icon: TriangleAlert,
    title: 'Segni da riferire al medico',
    body: 'Sangue nelle feci, perdita di peso, dolore intenso o cambiamento improvviso delle abitudini vanno sempre valutati dal medico.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'L’intestino obbedisce a quello che gli sta intorno',
    b: 'Si muove da solo, ma vive dentro una casa fatta di diaframma, pancia e bacino: se la casa non si muove, lui rallenta.',
  },
  {
    k: '02',
    t: 'Diaframma e pavimento pelvico comandano il transito',
    b: 'Il diaframma lo massaggia dall’alto a ogni respiro; il pavimento pelvico apre la porta in basso. Respiro corto e bacino teso frenano tutto.',
  },
  {
    k: '03',
    t: 'Fibre e acqua non bastano senza il motore',
    b: 'Sono il carburante, non il motore. E un sistema in allerta mette l’intestino in pausa: ecco perché da sole spesso non cambiano nulla.',
  },
]

const BENEFITS = [
  {
    image: '/reflusso/reflusso1.JPG',
    imageClassName: 'object-[58%_55%]',
    alt: 'Trattamento osteopatico sull’addome per la stitichezza',
    title: 'Più fibre nella dieta',
    body: 'Consiglio corretto, ma su un intestino che non si muove le fibre da sole possono anche peggiorare il gonfiore. Macrogol e lassativi osmotici restano i più prescritti — utili, non risolutivi sulla causa.',
  },
  {
    image: '/reflusso/reflusso2.JPG',
    imageClassName: 'object-[52%_58%]',
    alt: 'Valutazione osteopatica di pancia e bacino per il transito intestinale',
    title: 'Bere più acqua',
    body: 'Necessario, e quasi mai sufficiente se la meccanica non funziona. Integratori di magnesio possono aiutare, ma restano un aiuto esterno a un sistema che dovrebbe funzionare da sé.',
  },
  {
    image: '/reflusso/reflusso3.JPG',
    imageClassName: 'object-[42%_52%]',
    alt: 'Lavoro osteopatico delicato sulla pancia',
    title: 'Lassativi',
    body: 'Risolvono l’episodio, ma con l’uso prolungato l’intestino tende a lavorare sempre meno da solo. I stimolanti (bisacodile, senna) portano il rischio di assuefazione.',
  },
  {
    image: '/reflusso/reflusso4.JPG',
    imageClassName: 'object-[45%_52%]',
    alt: 'Trattamento manuale su diaframma e zona addominale',
    title: 'Fermenti lattici e probiotici',
    body: 'Possono aiutare l’equilibrio della flora, raramente cambiano il transito da soli. Rimedi naturali e tisane danno sollievo temporaneo, spesso con lo stesso meccanismo dei lassativi.',
  },
  {
    image: '/reflusso/reflusso5.JPG',
    imageClassName: 'object-[48%_55%]',
    alt: 'Percorso osteopatico per migliorare il transito intestinale',
    title: 'Attività fisica',
    body: 'Aiuta davvero il movimento intestinale. Ma se lo fai già e non è cambiato niente, la causa è altrove. Supposte e clisteri risolvono il momento, senza incidere su ciò che lo ha causato.',
  },
  {
    image: '/reflusso/reflusso6.JPG',
    imageClassName: 'object-[50%_55%]',
    alt: 'Approccio osteopatico in affiancamento agli esami digestivi',
    title: '“Mangia meglio e muoviti di più”',
    body: 'Il consiglio che ricevono tutti. Colonscopia, ecografia e tempo di transito restano fondamentali per escludere problemi seri — quando sono negativi, spesso il quadro è funzionale. Nessuno ti ha ancora chiesto come respiri e com’è il tuo bacino.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Sgonfiare la <strong>pancia</strong> e togliere quella tensione dura e
    tirata
  </>,
  <>
    Andare oltre <strong>fibre e acqua</strong>: lavorare sul motore, non solo
    sul carburante
  </>,
  <>
    Liberare <strong>diaframma</strong> e bacino, così l’intestino ritrova
    spazio
  </>,
  <>
    Smettere di chiamarlo <strong>“il mio normale”</strong>: non sei fatta così
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
    body: 'Analizziamo diaframma, pancia, bacino e pavimento pelvico per individuare fattori che possono rallentare il transito.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su posizione, respiro e routine al bagno, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'mani-intestino',
    question: (
      <>
        Cosa c’entrano le <strong>mani</strong> con l’intestino?
      </>
    ),
    answer: (
      <>
        L’intestino vive dentro una casa fatta di diaframma, pancia e bacino: se la casa non si
        muove, lui rallenta. Sulla casa si lavora con le mani — in affiancamento al medico, non al
        posto degli esami che hai già fatto.
      </>
    ),
  },
  {
    id: 'lassativi',
    question: (
      <>
        Prendo i <strong>lassativi</strong> e funziona: perché venire da voi?
      </>
    ),
    answer: (
      <>
        Funziona oggi: ma con il tempo l’intestino lavora sempre meno da solo. L’obiettivo non è
        toglierti il lassativo da un giorno all’altro, ma ridargli il suo motore — così quella
        scatola può tornare a essere l’eccezione.
      </>
    ),
  },
  {
    id: 'fibre-acqua',
    question: (
      <>
        Ho già provato <strong>fibre e acqua</strong>: ha senso?
      </>
    ),
    answer: (
      <>
        Giusto farlo, e spesso non basta: sono il carburante, non il motore. Noi lavoriamo su
        diaframma, bacino e pavimento pelvico — la parte meccanica che nessuno ti ha ancora
        valutato.
      </>
    ),
  },
  {
    id: 'imbarazzo',
    question: (
      <>
        Mi <strong>imbarazza</strong> parlarne: come lavorate?
      </>
    ),
    answer: (
      <>
        È normale, e qui è un argomento come un altro: se ne parla con rispetto e senza giri di
        parole. Nulla viene fatto senza il tuo consenso, e ti fermi quando vuoi.
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
        In presenza di blocco completo con niente feci né aria, pancia gonfia e vomito, sangue nelle
        feci o feci nere, cambio improvviso e persistente delle abitudini intestinali dopo i 50
        anni, calo di peso involontario o anemia, oppure dolore addominale forte e continuo anche di
        notte, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il
        quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'stitichezza',
  heroVideo,
  videoTitle: 'Video trattamento stitichezza - Mobilitas Torino',
  images: {
    hero: '/cervicalgia/cerv11.JPG',
    band: '/cervicalgia/cerv10.JPG',
    final: '/cervicalgia/cerv13.JPG',
  },
  hero: {
    place: 'Torino',
    name: 'Stitichezza',
    title: { main: 'Soffri di stitichezza e andare in bagno è uno sforzo?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>diaframma</strong>,{' '}
        <strong>pancia</strong> e{' '}
        <strong>bacino</strong> per ridurre l’impatto
        della stitichezza su mattina, viaggi e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La stitichezza non ti limita solo nei sintomi.', accent: 'Ti limita fin dal primo gesto del giorno.' },
    intro: (
      <>
        Ignorarla non la fa sparire: la normalizza. E più la normalizzi, più ti toglie{' '}
        <strong>serenità al risveglio</strong>,{' '}
        <strong>libertà in viaggio</strong> e{' '}
        <strong>fiducia</strong> nel tuo corpo.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Le fibre contano</strong>.{' '}
        <strong>I lassativi contano</strong>. Ma non sono
        l’unico livello del problema: se diaframma e bacino non si muovono, l’
        <strong>intestino</strong> continua a rallentare.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Diaframma' }, { text: 'Bacino' }, { text: 'Intestino', accent: true }, { text: 'Pavimento' }],
      caption: 'L’intestino si muove nella casa fatta di diaframma, pancia e bacino.',
    },
    narrative: (
      <>
        L’intestino si muove da solo, ma obbedisce a quello che gli sta intorno. Il{' '}
        <strong>diaframma</strong> lo massaggia
        dall’alto a ogni respiro: respiro corto, massaggio debole. Il{' '}
        <strong>pavimento pelvico</strong> apre la porta
        in basso al momento giusto: bacino teso, porta che si apre male.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve “un altro lassativo”.', accent: 'A volte serve cambiare il contesto meccanico.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Valutazione iniziale, lavoro su diaframma e respiro, pancia e pavimento pelvico,
          consigli pratici per il bagno: un percorso chiaro per ridurre l’
          <strong>impatto</strong> della stitichezza sulla tua
          vita quotidiana.
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
        <strong>serenità al risveglio</strong>, più{' '}
        <strong>ritmo</strong> e meno dipendenza dai lassativi.
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
        Se anche una sola di queste risposte ti rappresenta, non restare fermo in una gestione
        solo “al bisogno”.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a lavorare sul motore dell’intestino — oltre a fibre, acqua e lassativi.
      </>
    ),
  },
  seo: {
    dataPage: 'stitichezza',
    path: '/stitichezza',
    ogImage: '/reflusso/reflusso1.JPG',
    title: 'Osteopata Stitichezza Torino | Transito Intestinale e Diaframma | Mobilitas',
    description:
      'Osteopata per stitichezza a Torino (San Donato e Crocetta). Lavoriamo su diaframma, pancia, bacino e pavimento pelvico, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata stitichezza torino',
      'stitichezza torino',
      'osteopatia stitichezza',
      'trattamento stitichezza osteopata',
      'transito intestinale osteopata',
      'stitichezza cronica torino',
      'osteopata intestino torino',
      'pavimento pelvico stitichezza',
      'osteopata pancia torino',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per stitichezza – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Stitichezza Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per stitichezza – Mobilitas Torino',
    condition: {
      name: 'Stitichezza',
      alternateName: [
        'Stipsi',
        'Costipazione',
        'Transito intestinale lento',
        'Intestino pigro',
        'Evacuazione difficile',
      ],
      anatomy: 'Intestino, diaframma e pavimento pelvico',
    },
    therapy: {
      name: 'Trattamento osteopatico per stitichezza',
      description:
        'Approccio osteopatico integrato su diaframma, pancia, bacino e pavimento pelvico, in affiancamento al percorso medico gastroenterologico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per stitichezza',
      },
    },
    breadcrumbName: 'Stitichezza',
    faq: [
      {
        name: "Cosa c'entrano le mani con l'intestino?",
        text: "L'intestino vive dentro una casa fatta di diaframma, pancia e bacino: se la casa non si muove, lui rallenta. Sulla casa si lavora con le mani — in affiancamento al medico, non al posto degli esami che hai già fatto.",
      },
      {
        name: 'Prendo i lassativi e funziona: perché venire da voi?',
        text: "Funziona oggi: ma con il tempo l'intestino lavora sempre meno da solo. L'obiettivo non è toglierti il lassativo da un giorno all'altro, ma ridargli il suo motore — così quella scatola può tornare a essere l'eccezione.",
      },
      {
        name: 'Ho già provato fibre e acqua: ha senso?',
        text: 'Giusto farlo, e spesso non basta: sono il carburante, non il motore. Noi lavoriamo su diaframma, bacino e pavimento pelvico — la parte meccanica che nessuno ti ha ancora valutato.',
      },
      {
        name: 'Mi imbarazza parlarne: come lavorate?',
        text: 'È normale, e qui è un argomento come un altro: se ne parla con rispetto e senza giri di parole. Nulla viene fatto senza il tuo consenso, e ti fermi quando vuoi.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'In presenza di blocco completo con niente feci né aria, pancia gonfia e vomito, sangue nelle feci o feci nere, cambio improvviso e persistente delle abitudini intestinali dopo i 50 anni, calo di peso involontario o anemia, oppure dolore addominale forte e continuo anche di notte, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function Stitichezza() {
  return <ConditionLanding page={PAGE} />
}
