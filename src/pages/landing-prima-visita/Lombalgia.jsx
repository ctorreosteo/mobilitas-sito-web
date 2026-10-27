import {
  Waves,
  CloudLightning,
  Sunrise,
  Monitor,
  Timer,
  CalendarClock,
  Ruler,
  Link,
  Wind,
  Shirt,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'

// Landing "Lombalgia": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

const HERO_BENEFITS = [
  <>
    Spezzare il giro delle <strong>ricadute</strong>: crisi, riposo, di nuovo
    crisi
  </>,
  <>
    Alzarti dal letto al <strong>mattino</strong> senza doverti “srotolare” a
    pezzi
  </>,
  <>
    Reggere la giornata <strong>seduto</strong> o{' '}
    <strong>in piedi</strong> senza la morsa sopra i glutei
  </>,
]

const PAIN_POINTS = [
  {
    icon: Waves,
    title: 'Il dolore torna a ondate',
    body: 'Settimane tranquille, poi di nuovo la zona lombare che si accende, spesso senza un motivo preciso.',
  },
  {
    icon: CloudLightning,
    title: 'Il colpo della strega',
    body: 'Ti chini per un calzino o ti giri per prendere la borsa e la schiena si inchioda: resti piegato, senza riuscire a raddrizzarti.',
  },
  {
    icon: Sunrise,
    title: 'Schiena bloccata al mattino',
    body: 'Scendi dal letto a rate, ti lavi i denti appoggiato al lavandino, e solo dopo un po’ di movimento la schiena si scioglie.',
  },
  {
    icon: Monitor,
    title: 'Peggiora dopo ore alla scrivania',
    body: 'Quando ti alzi dalla sedia ci metti qualche passo prima di tornare dritto.',
  },
  {
    icon: Timer,
    title: 'Peggiora dopo ore in piedi',
    body: 'Cucina, negozio, corsia, cantiere: a metà turno il dolore lombare sale e cerchi qualcosa a cui appoggiarti.',
  },
  {
    icon: CalendarClock,
    title: 'Vivi aspettando il prossimo blocco',
    body: 'Eviti i traslochi, la valigia pesante, l’ora di giardinaggio: “non vorrei che mi venisse di nuovo”.',
  },
  {
    icon: Ruler,
    title: 'Dopo la crisi ti ritrovi storto',
    body: 'Il busto si inclina da un lato e ti accorgi allo specchio che non stai dritto come prima.',
  },
  {
    icon: Link,
    title: 'Una morsa tra schiena bassa e bacino',
    body: 'La tensione si concentra sopra i glutei e sui lati del bacino, come una cintura stretta troppo.',
  },
  {
    icon: Wind,
    title: 'Respiro corto e pancia rigida',
    body: 'Nei giorni no respiri “alto” e la pancia è tesa: anche fare un respiro profondo tira verso la schiena.',
  },
  {
    icon: Shirt,
    title: 'Calze e scarpe diventano una manovra',
    body: 'Le anche sono rigide, ti pieghi poco, e vestirti la mattina richiede strategia.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'La crisi passa, la rigidità resta',
    b: 'Dopo il blocco il dolore si calma, ma bacino, anche e diaframma spesso restano meno mobili di prima, anche quando non te ne accorgi.',
  },
  {
    k: '02',
    t: 'La zona lombare lavora per tutti',
    b: 'Se anche e bacino si muovono poco, ogni gesto si concentra su poche vertebre: ore seduto o in piedi la caricano finché basta un gesto banale per bloccarla.',
  },
  {
    k: '03',
    t: 'Le ricadute si prevengono tra una crisi e l’altra',
    b: 'Il momento giusto per lavorare non è solo durante il dolore: è ridare movimento a bacino, anche e respiro quando la schiena sta meglio.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/schiena_lombare-supino_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che lavora sulla zona lombare di una paziente supina',
    title: 'Antidolorifici e miorilassanti al bisogno',
    body: 'Aiutano a superare la crisi, e va bene usarli come indica il medico. Però agiscono sul momento acuto: tra una crisi e l’altra non cambiano nulla di ciò che la prepara.',
  },
  {
    image: '/trattamenti/anca_decubito-laterale_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta anca e bacino di una paziente sdraiata su un fianco',
    title: 'Aspettare che passi',
    body: 'La crisi di lombalgia spesso migliora da sola in qualche giorno o settimana, ed è una buona notizia. Ma se dopo resta la stessa rigidità, la prossima è già in preparazione.',
  },
  {
    image: '/trattamenti/schiena_lombare-decubito-laterale_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento lombare di un paziente sdraiato su un fianco',
    title: 'Lo “sblocco” dal massaggiatore',
    body: 'Il sollievo immediato è reale. Se però resta un intervento d’emergenza a ogni crisi, senza lavorare su bacino e anche, finisce per diventare un appuntamento fisso.',
  },
  {
    image: '/trattamenti/schiena_dorso-sacrale-prono_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di zona dorsale e sacro di un paziente a pancia in giù',
    title: 'Ginnastica posturale e pilates',
    body: 'L’esercizio è tra gli strumenti più solidi per ridurre le ricadute. Il problema è che spesso si abbandona appena il dolore passa, oppure resta generico e non tocca anche e respiro.',
  },
  {
    image: '/trattamenti/pancia_addome-dettaglio-mani_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Dettaglio delle mani dell’osteopata sull’addome di una paziente',
    title: 'Fascia lombare e cuscino per la sedia',
    body: 'Utili nella crisi o in un lungo viaggio. Portati tutti i giorni, però, fanno lavorare meno i muscoli che dovrebbero sostenerti, e la schiena si abitua a dipenderne.',
  },
  {
    image: '/trattamenti/pancia_addome-basso-supino_03_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che lavora sull’addome basso di una paziente supina',
    title: 'Radiografie e risonanze',
    body: 'Servono quando ci sono segnali d’allarme, e lo decide il medico. In una lombalgia che va e viene spesso non spiegano le ondate: artrosi e piccole discopatie si trovano anche in chi sta benissimo.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Allungare la distanza tra una <strong>crisi</strong> e l’altra, invece di
    rincorrerle
  </>,
  <>
    Smettere di vivere con la paura del <strong>colpo della strega</strong> a
    ogni gesto
  </>,
  <>
    Arrivare a fine turno, alla <strong>scrivania</strong> o in piedi, senza
    cercare un appoggio
  </>,
  <>
    Sapere cosa fare nei <strong>primi giorni</strong> di una crisi, se dovesse
    tornare
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
    title: 'Anamnesi delle ricadute',
    body: 'Ricostruiamo quando sono arrivate le crisi, cosa le ha precedute, il tuo lavoro, esami e terapie in corso, per capire lo schema che si ripete.',
  },
  {
    title: 'Valutazione di schiena, bacino e anche',
    body: 'Osserviamo come ti pieghi, ti giri e ti alzi, la mobilità di bacino e anche e il modo in cui respiri.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo su zona lombare, bacino, anche e diaframma, con tecniche dolci nelle fasi acute e senza manipolazioni obbligatorie.',
  },
  {
    title: 'Piano anti-ricaduta',
    body: 'Ti diamo pause e movimenti per la tua giornata — seduto o in piedi — e cosa fare nei primi giorni se la crisi torna, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'colpo-strega',
    question: (
      <>
        Ho il <strong>colpo della strega</strong>: vengo subito o aspetto che passi?
      </>
    ),
    answer: (
      <>
        Si può venire anche in fase acuta: si lavora con tecniche dolci, lontano dal punto più
        irritato, per aiutarti a muoverti un po’ meglio. Nel frattempo restare attivi nei limiti
        del dolore è meglio che stare a letto. Se ci sono i segnali d’allarme descritti sotto, la
        priorità è il medico.
      </>
    ),
  },
  {
    id: 'ricadute',
    question: (
      <>
        Perché mi <strong>ricapita</strong> ogni pochi mesi?
      </>
    ),
    answer: (
      <>
        Spesso perché la crisi passa ma il contesto resta: bacino e anche rigidi, ore nella stessa
        posizione, respiro corto. La zona lombare continua a fare il lavoro di tutti finché un gesto
        banale la blocca. Per questo lavoriamo anche <em>tra</em> una crisi e l’altra, non solo
        quando fa male.
      </>
    ),
  },
  {
    id: 'mattino',
    question: (
      <>
        Perché al <strong>mattino</strong> sono bloccato e poi mi sciolgo?
      </>
    ),
    answer: (
      <>
        Dopo ore ferme la schiena tende a irrigidirsi, ed è comune che migliori con i primi
        movimenti. Se però la rigidità dura più di mezz’ora, ti sveglia nella seconda parte della
        notte e migliora muovendoti ma non a riposo — soprattutto se sei sotto i 45 anni — parlane
        con il medico: va esclusa una forma infiammatoria.
      </>
    ),
  },
  {
    id: 'lavoro',
    question: (
      <>
        Lavoro <strong>seduto</strong> (o in piedi) tutto il giorno: ha senso venire?
      </>
    ),
    answer: (
      <>
        Sì, ed è uno dei casi più frequenti. Non serve cambiare lavoro: lavoriamo su bacino, anche
        e respiro e ti diamo pause e movimenti pensati per la tua giornata, perché la zona lombare
        smetta di reggere tutto da sola.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che la <strong>lombalgia</strong> non torna più?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. La lombalgia può ripresentarsi nel corso della vita. L’obiettivo
        onesto è ridurre frequenza e intensità delle crisi e darti strumenti per gestirle meglio, in{' '}
        <em>affiancamento</em> al medico. Quanto si può migliorare nel tuo caso si capisce solo
        valutandoti — nessuna promessa facile, solo chiarezza.
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
        Vai subito in <strong>pronto soccorso</strong> se perdi il controllo di urina o feci o senti
        addormentata la zona tra le gambe (“a sella”). Serve una valutazione medica tempestiva anche
        in caso di dolore dopo una caduta o un trauma (soprattutto con osteoporosi o oltre i 50
        anni), febbre, calo di peso senza motivo, storia di tumore, dolore notturno continuo che non
        cambia con la posizione, formicolio o perdita di forza alle gambe, oppure uso prolungato di
        cortisone. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'lombalgia',
  heroVideo: null, // Video non ancora girato: in apertura c'è la foto images.hero. Quando c'è, prefetchHeroVideo('LOMBALGIA_VSL') a livello di modulo
  videoTitle: 'Video trattamento lombalgia - Mobilitas Torino',
  images: {
    hero: '/trattamenti/schiena_lombare-prono_03_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/pancia_addome-supino_07_orizzontale',
    bandClassName: 'object-[50%_55%]',
    final: '/trattamenti/anca_flessa-supino_11_orizzontale',
    finalClassName: 'object-[45%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Lombalgia',
    title: { main: 'Soffri di lombalgia e ti ricapita ogni pochi mesi?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>zona lombare</strong>,{' '}
        <strong>bacino</strong>,{' '}
        <strong>anche</strong> e{' '}
        <strong>diaframma</strong> per ridurre frequenza e
        impatto delle crisi su lavoro, sonno e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La lombalgia non ti limita solo durante la crisi.', accent: 'Ti limita anche mentre aspetti la prossima.' },
    intro: (
      <>
        Passa, torna, passa di nuovo. Ti abitui a convivere con le ondate, e intanto rinunci a{' '}
        <strong>pesi</strong>,{' '}
        <strong>viaggi</strong> e{' '}
        <strong>progetti</strong> per paura che la schiena
        si blocchi proprio quel giorno.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché la crisi passa', accent: 'ma la schiena ci ricasca' },
    intro: (
      <>
        <strong>Gli antidolorifici contano</strong>.{' '}
        <strong>Il riposo nei primi giorni conta</strong>.
        Ma se dopo ogni crisi resta la stessa{' '}
        <strong>rigidità</strong>, la zona lombare è già
        pronta per la prossima.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Crisi' }, { text: 'Rigidità', accent: true }, { text: 'Tregua' }, { text: 'Ricaduta' }],
      caption: 'Il dolore passa, la rigidità resta: ed è da lì che riparte la prossima crisi.',
    },
    narrative: (
      <>
        La zona lombare sta tra il{' '}
        <strong>bacino</strong> e il{' '}
        <strong>diaframma</strong>, che si aggancia proprio
        alle vertebre lombari. Se anche e bacino si muovono poco e il respiro resta corto, ogni ora
        seduto o in piedi si scarica su poche vertebre: il colpo della strega spesso arriva su un
        gesto banale, perché la schiena era già carica.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre basta “sbloccarsi” a ogni crisi.', accent: 'A volte serve lavorare quando la schiena sta bene.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'anche tra una crisi e l’altra.' },
      intro: (
        <>
          Ricostruzione delle ricadute, lavoro su zona lombare, bacino, anche e diaframma, pause e
          movimenti per la tua giornata di lavoro: un percorso per ridurre l’
          <strong>impatto</strong> della lombalgia sulla tua vita
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
        <strong>tregua</strong> tra una crisi e l’altra, più{' '}
        <strong>libertà nei gesti</strong> e meno paura del
        prossimo blocco. Inizia con un consulto telefonico o la prima visita.
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
        Se anche una sola di queste risposte ti rappresenta, non aspettare la prossima crisi per
        occuparti della schiena.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a lavorare su ciò che prepara le ricadute — non solo sul blocco di oggi.
      </>
    ),
  },
  seo: {
    dataPage: 'lombalgia',
    path: '/lombalgia',
    ogImage: '/trattamenti/og/schiena_lombare-supino_01_orizzontale.jpg',
    title: 'Osteopata Lombalgia Torino | Colpo della Strega e Ricadute | Mobilitas',
    description:
      'Osteopata per lombalgia a Torino (San Donato e Crocetta). Colpo della strega, schiena bloccata al mattino e ricadute: lavoriamo su zona lombare, bacino, anche e diaframma, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata lombalgia torino',
      'lombalgia torino',
      'osteopatia lombalgia',
      'trattamento lombalgia osteopata',
      'colpo della strega torino',
      'lombalgia ricorrente',
      'dolore lombare torino',
      'schiena bloccata osteopata',
      'osteopata bacino torino',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per lombalgia – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Lombalgia Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per lombalgia – Mobilitas Torino',
    condition: {
      name: 'Lombalgia',
      alternateName: [
        'Colpo della strega',
        'Lombalgia ricorrente',
        'Lombalgia acuta',
        'Dolore lombare',
        'Blocco lombare',
      ],
      anatomy: 'Colonna lombare, bacino, anche e diaframma',
    },
    therapy: {
      name: 'Trattamento osteopatico per lombalgia',
      description:
        'Approccio osteopatico integrato su zona lombare, bacino, anche e diaframma con indicazioni per ridurre le ricadute, in affiancamento al percorso medico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per lombalgia',
      },
    },
    breadcrumbName: 'Lombalgia',
    faq: [
      {
        name: 'Ho il colpo della strega: vengo subito o aspetto che passi?',
        text: 'Si può venire anche in fase acuta: si lavora con tecniche dolci, lontano dal punto più irritato, per aiutarti a muoverti un po’ meglio. Nel frattempo restare attivi nei limiti del dolore è meglio che stare a letto. Se ci sono segnali d’allarme, la priorità è il medico.',
      },
      {
        name: 'Perché mi ricapita ogni pochi mesi?',
        text: 'Spesso perché la crisi passa ma il contesto resta: bacino e anche rigidi, ore nella stessa posizione, respiro corto. La zona lombare continua a fare il lavoro di tutti finché un gesto banale la blocca. Per questo lavoriamo anche tra una crisi e l’altra, non solo quando fa male.',
      },
      {
        name: 'Perché al mattino sono bloccato e poi mi sciolgo?',
        text: 'Dopo ore ferme la schiena tende a irrigidirsi, ed è comune che migliori con i primi movimenti. Se però la rigidità dura più di mezz’ora, ti sveglia nella seconda parte della notte e migliora muovendoti ma non a riposo — soprattutto se sei sotto i 45 anni — parlane con il medico: va esclusa una forma infiammatoria.',
      },
      {
        name: 'Lavoro seduto (o in piedi) tutto il giorno: ha senso venire?',
        text: 'Sì, ed è uno dei casi più frequenti. Non serve cambiare lavoro: lavoriamo su bacino, anche e respiro e ti diamo pause e movimenti pensati per la tua giornata, perché la zona lombare smetta di reggere tutto da sola.',
      },
      {
        name: 'Mi promettete che la lombalgia non torna più?',
        text: 'No, e diffidiamo di chi lo fa. La lombalgia può ripresentarsi nel corso della vita. L’obiettivo onesto è ridurre frequenza e intensità delle crisi e darti strumenti per gestirle meglio, in affiancamento al medico — nessuna promessa facile, solo chiarezza.',
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'Vai subito in pronto soccorso se perdi il controllo di urina o feci o senti addormentata la zona tra le gambe (a sella). Serve una valutazione medica tempestiva anche in caso di dolore dopo una caduta o un trauma (soprattutto con osteoporosi o oltre i 50 anni), febbre, calo di peso senza motivo, storia di tumore, dolore notturno continuo che non cambia con la posizione, formicolio o perdita di forza alle gambe, oppure uso prolungato di cortisone. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function Lombalgia() {
  return <PrimaVisitaLanding page={PAGE} />
}
