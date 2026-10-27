import {
  Moon,
  AudioLines,
  Ear,
  Activity,
  PersonStanding,
  Brain,
  Volume2,
  Search,
  Hourglass,
  CircleAlert,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'

// Landing "Acufeni": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

const HERO_BENEFITS = [
  <>
    Lavora su <strong>collo</strong> e <strong>mandibola</strong>, che
    possono alzare il volume del fischio
  </>,
  <>
    Riduci la <strong>tensione</strong> che rende il ronzio più presente la
    sera
  </>,
  <>
    Torna ad addormentarti con meno <strong>attenzione</strong> fissa sulle
    orecchie
  </>,
]

const PAIN_POINTS = [
  {
    icon: Moon,
    title: 'Il fischio si sente di più nel silenzio',
    body: 'Di giorno lo copre il rumore. La sera, a letto, diventa l’unica cosa che senti e prendere sonno è una fatica.',
  },
  {
    icon: AudioLines,
    title: 'Cambia se muovi il collo o stringi i denti',
    body: 'Girando la testa, serrando la mandibola o premendo su certi punti il ronzio sale, scende o cambia tono.',
  },
  {
    icon: Ear,
    title: 'Orecchio ovattato o pieno',
    body: 'Una sensazione di pressione, come in aereo, che va e viene senza un motivo apparente.',
  },
  {
    icon: Activity,
    title: 'Peggiora nei periodi di stress',
    body: 'Quando il lavoro o la testa sono sotto pressione, il fischio si alza. Nei giorni tranquilli quasi sparisce.',
  },
  {
    icon: PersonStanding,
    title: 'Collo rigido e spalle contratte',
    body: 'La tensione alla nuca e alle spalle è una compagna fissa, e spesso peggiora insieme all’acufene.',
  },
  {
    icon: Brain,
    title: 'Fai fatica a concentrarti',
    body: 'Leggere, lavorare al computer o seguire una conversazione richiede più sforzo, perché una parte dell’attenzione resta sul rumore.',
  },
  {
    icon: Volume2,
    title: 'Suoni normali diventano fastidiosi',
    body: 'Piatti, voci alte, locali affollati: rumori che prima non notavi ora danno fastidio o stancano.',
  },
  {
    icon: Search,
    title: 'Esami ORL negativi',
    body: 'Audiometria e visita sono a posto. Ti senti dire che “è tutto normale”, mentre il fischio resta lì.',
  },
  {
    icon: Hourglass,
    title: '“Devi imparare a conviverci”',
    body: 'Una frase che chiude il discorso senza indicarti niente da fare, e ti lascia da solo con il rumore.',
  },
  {
    icon: CircleAlert,
    title: 'Paura che peggiori',
    body: 'Ti chiedi se diventerà più forte, se perderai l’udito, e controlli l’orecchio ogni volta che c’è silenzio.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Orecchio e collo condividono i segnali',
    b: 'Le informazioni nervose che arrivano da collo e mandibola si incrociano con quelle dell’udito: quando quei muscoli sono in tensione, il cervello può “alzare il volume” del fischio.',
  },
  {
    k: '02',
    t: 'La mandibola è vicinissima all’orecchio',
    b: 'L’articolazione della mandibola sta proprio davanti al condotto uditivo. Serramento, click e masticatori contratti sono frequenti in chi ha acufeni.',
  },
  {
    k: '03',
    t: 'Lo stress tiene acceso il sistema',
    b: 'Tensione e allerta rendono il rumore più presente, e il rumore alimenta altra tensione. Lavorare sul corpo aiuta a spezzare il circolo.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/collo_allungamento-cervicale-supino_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Allungamento cervicale di una paziente supina',
    title: '“È tutto a posto, impara a conviverci”',
    body: 'Escludere un problema dell’orecchio è fondamentale. Ma un esame negativo non spiega il fischio: dice solo dove non cercare più.',
  },
  {
    image: '/trattamenti/spalla_scapola-decubito-laterale_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico di spalla e scapola in decubito laterale',
    title: 'Integratori e vasodilatatori',
    body: 'Spesso sono il primo tentativo, con risultati variabili. Collo, mandibola e tensione muscolare restano fuori dal quadro.',
  },
  {
    image: '/trattamenti/schiena_dorsale-alta-prono_04_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico della zona dorsale alta di un paziente prono',
    title: 'Rumore bianco e app: utili per non sentirlo',
    body: 'Mascherare il fischio aiuta a dormire, ed è una strategia valida. Non cambia però quello che, nel corpo, può tenerlo alto.',
  },
  {
    image: '/trattamenti/atm_presa-mandibolare-esterna_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Presa esterna sulla mandibola di una paziente',
    title: 'Mandibola e ATM: il legame che pochi controllano',
    body: 'Se stringi i denti, hai click o mal di testa alle tempie, l’articolazione della mandibola merita di essere valutata insieme all’orecchio.',
  },
  {
    image: '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale',
    imageClassName: 'object-[50%_40%]',
    alt: 'Valutazione posturale in piedi in studio',
    title: '“È lo stress”: vero, ma da dove si comincia?',
    body: 'Lo stress alza il volume, ed è giusto dirlo. Serve però un lavoro concreto sui muscoli che quella tensione la trattengono.',
  },
  {
    image: '/trattamenti/atm_intraorale_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento intraorale dell’articolazione temporo-mandibolare',
    title: 'Approccio integrato: ORL + osteopatico',
    body: 'Visita otorinolaringoiatrica e audiometria restano il riferimento clinico. Noi lavoriamo su collo, mandibola e tensione, in parallelo.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Lavoriamo su <strong>collo</strong>, <strong>mandibola</strong> e
    base del cranio, le zone che possono modulare il fischio
  </>,
  <>
    Riduci la <strong>tensione</strong> di nuca, spalle e masticatori che
    accompagna il ronzio
  </>,
  <>
    Recuperi <strong>sonno</strong> e <strong>concentrazione</strong>, con
    meno attenzione fissa sull’orecchio
  </>,
  <>
    Non sostituiamo l’<strong>otorinolaringoiatra</strong>: lavoriamo dove
    gli esami negativi ti hanno lasciato
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
    body: 'Ricostruiamo sintomi, esami ORL e audiometrici, trigger e terapie in corso, per definire priorità e obiettivi realistici.',
  },
  {
    title: 'Valutazione obiettiva e posturale',
    body: 'Analizziamo collo, mandibola, masticatori e postura, e verifichiamo se movimenti o pressioni cambiano il tuo acufene.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su respiro, postura, mandibola e routine serale, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'esami-negativi',
    question: (
      <>
        Gli <strong>esami ORL</strong> sono negativi: cosa c’entra l’<em>osteopatia</em>?
      </>
    ),
    answer: (
      <>
        Gli esami negativi sono una buona notizia: escludono problemi dell’orecchio che vanno
        trattati dal medico. Ma in molte persone il fischio è influenzato da collo, mandibola e
        tensione muscolare, che un’audiometria non misura. È lì che lavoriamo noi.
      </>
    ),
  },
  {
    id: 'collo-mandibola',
    question: (
      <>
        Come capisco se il mio fischio dipende da <strong>collo</strong> o{' '}
        <strong>mandibola</strong>?
      </>
    ),
    answer: (
      <>
        Un indizio è se il suono cambia quando giri la testa, stringi i denti o hai il collo
        più rigido. In visita lo verifichiamo con test specifici e ti diciamo con chiarezza se
        il tuo caso è adatto a un lavoro osteopatico.
      </>
    ),
  },
  {
    id: 'stress',
    question: (
      <>
        Peggiora con lo <strong>stress</strong>: è tutto nella testa?
      </>
    ),
    answer: (
      <>
        No. Lo stress agisce sul corpo: irrigidisce collo, spalle e mandibola e tiene il sistema
        nervoso in allerta, e questo rende il fischio più presente. Lavorare su quelle tensioni è
        un modo concreto per abbassare il volume.
      </>
    ),
  },
  {
    id: 'rumore-bianco',
    question: (
      <>
        Uso <strong>rumore bianco</strong> e integratori: devo smettere?
      </>
    ),
    answer: (
      <>
        No. Se ti aiutano a dormire o a stare meglio, continua: le indicazioni del medico restano
        quelle. Il lavoro su collo e mandibola si aggiunge, non sostituisce niente.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che l’<strong>acufene</strong> passa del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. L’obiettivo onesto è capire quanto collo, mandibola e
        tensione pesano sul tuo fischio e ridurne l’impatto su sonno, concentrazione e umore.
        Quanto si può migliorare nel tuo caso si capisce solo valutandoti — nessuna promessa
        facile, solo chiarezza.
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
        Se l’acufene è pulsante, a ritmo del battito cardiaco, se compare in un solo orecchio
        insieme a un calo improvviso dell’udito, se si accompagna a vertigini forti, oppure se è
        comparso dopo un trauma alla testa, la priorità è una valutazione otorinolaringoiatrica o
        medica urgente. Noi interveniamo solo quando il quadro è appropriato a un supporto
        osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'acufeni',
  heroVideo: null, // Video non ancora girato: in apertura c'è la foto images.hero. Quando c'è, prefetchHeroVideo('ACUFENI_VSL') a livello di modulo
  videoTitle: 'Video trattamento acufeni - Mobilitas Torino',
  images: {
    hero: '/trattamenti/collo_presa-cervicale-supino_08_orizzontale',
    heroClassName: 'object-[30%_50%]',
    band: '/trattamenti/atm_mandibola-con-guanto_02_orizzontale',
    bandClassName: 'object-[55%_70%]',
    final: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
    finalClassName: 'object-[10%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Acufeni',
    title: { main: 'Fischi o ronzii nelle orecchie e ti hanno detto di conviverci?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>collo</strong>,{' '}
        <strong>mandibola</strong> e{' '}
        <strong>tensione muscolare</strong> per ridurre
        l’impatto dell’acufene su sonno, concentrazione e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'L’acufene non è solo un rumore.', accent: 'Ti toglie silenzio, sonno e concentrazione.' },
    intro: (
      <>
        Abituarsi non vuol dire stare meglio. Più lo sopporti, più ti toglie{' '}
        <strong>riposo</strong>,{' '}
        <strong>attenzione</strong> e{' '}
        <strong>tranquillità</strong> nei momenti di silenzio.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché gli esami sono a posto', accent: 'e il fischio resta' },
    intro: (
      <>
        <strong>L’orecchio va controllato</strong>, sempre.
        Ma quando è a posto, il problema non è chiuso: <strong>collo</strong> e{' '}
        <strong>mandibola</strong> possono continuare a
        tenere alto il volume del fischio.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Collo' }, { text: 'Mandibola' }, { text: 'Acufene', accent: true }, { text: 'Stress' }],
      caption: 'L’orecchio è stato controllato. Collo e mandibola, spesso no.',
    },
    narrative: (
      <>
        I segnali di <strong>collo</strong> e{' '}
        <strong>mandibola</strong> viaggiano vicino a quelli
        dell’udito. Quando quei muscoli restano tesi, il cervello può percepire il fischio più
        forte — e lo <strong>stress</strong> tiene acceso il circolo.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Esami negativi non vuol dire “niente da fare”.', accent: 'Vuol dire cercare anche fuori dall’orecchio.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente muscolare e meccanica.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> dell’acufene su sonno,
          concentrazione e serenità, con un percorso serio e misurabile.
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
        <strong>silenzio</strong>, più{' '}
        <strong>sonno</strong> e meno tensione tra collo e
        mandibola. Inizia con un consulto telefonico o la prima visita.
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
        Se anche una sola di queste risposte ti rappresenta, non fermarti a “impara a
        conviverci”.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e verifichiamo insieme quanto collo e mandibola contano nel tuo acufene.
      </>
    ),
  },
  seo: {
    dataPage: 'acufeni',
    path: '/acufeni',
    ogImage: '/trattamenti/og/collo_presa-cervicale-supino_26_orizzontale.jpg',
    title: 'Osteopata Acufeni Torino | Fischi, Ronzii, Collo e Mandibola | Mobilitas',
    description:
      'Osteopata per acufeni a Torino (San Donato e Crocetta). Lavoriamo su collo, mandibola (ATM) e tensione muscolare quando gli esami ORL sono negativi, in affiancamento all’otorinolaringoiatra. Prima visita 49€.',
    keywords: [
      'osteopata acufeni torino',
      'acufeni torino',
      'osteopatia acufeni',
      'trattamento acufeni osteopata',
      'fischio orecchie osteopata',
      'ronzio orecchie torino',
      'acufene cervicale',
      'acufene mandibola atm',
      'tinnito osteopata torino',
      'acufene e stress',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per acufeni – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Acufeni Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per acufeni – Mobilitas Torino',
    condition: {
      name: 'Acufeni',
      alternateName: [
        'Acufene',
        'Tinnito',
        'Fischio alle orecchie',
        'Ronzio alle orecchie',
        'Acufene somatico',
        'Acufene cervicale',
      ],
      anatomy: 'Collo, mandibola (ATM), base del cranio e muscoli masticatori',
    },
    therapy: {
      name: 'Trattamento osteopatico per acufeni',
      description:
        'Approccio osteopatico integrato su collo, mandibola, base del cranio e tensione muscolare, in affiancamento a otorinolaringoiatra e audiologo.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per acufeni',
      },
    },
    breadcrumbName: 'Acufeni',
    faq: [
      {
        name: 'Gli esami ORL sono negativi: cosa c’entra l’osteopatia?',
        text: 'Gli esami negativi sono una buona notizia: escludono problemi dell’orecchio che vanno trattati dal medico. Ma in molte persone il fischio è influenzato da collo, mandibola e tensione muscolare, che un’audiometria non misura. È lì che lavoriamo noi.',
      },
      {
        name: 'Come capisco se il mio fischio dipende da collo o mandibola?',
        text: 'Un indizio è se il suono cambia quando giri la testa, stringi i denti o hai il collo più rigido. In visita lo verifichiamo con test specifici e ti diciamo con chiarezza se il tuo caso è adatto a un lavoro osteopatico.',
      },
      {
        name: 'Peggiora con lo stress: è tutto nella testa?',
        text: 'No. Lo stress agisce sul corpo: irrigidisce collo, spalle e mandibola e tiene il sistema nervoso in allerta, e questo rende il fischio più presente. Lavorare su quelle tensioni è un modo concreto per abbassare il volume.',
      },
      {
        name: 'Uso rumore bianco e integratori: devo smettere?',
        text: 'No. Se ti aiutano a dormire o a stare meglio, continua: le indicazioni del medico restano quelle. Il lavoro su collo e mandibola si aggiunge, non sostituisce niente.',
      },
      {
        name: 'Mi promettete che l’acufene passa del tutto?',
        text: 'No, e diffidiamo di chi lo fa. L’obiettivo onesto è capire quanto collo, mandibola e tensione pesano sul tuo fischio e ridurne l’impatto su sonno, concentrazione e umore. Quanto si può migliorare nel tuo caso si capisce solo valutandoti — nessuna promessa facile, solo chiarezza.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'Se l’acufene è pulsante, a ritmo del battito cardiaco, se compare in un solo orecchio insieme a un calo improvviso dell’udito, se si accompagna a vertigini forti, oppure se è comparso dopo un trauma alla testa, la priorità è una valutazione otorinolaringoiatrica o medica urgente. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function Acufeni() {
  return <PrimaVisitaLanding page={PAGE} />
}
