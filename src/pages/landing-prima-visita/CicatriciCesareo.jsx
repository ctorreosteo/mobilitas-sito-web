import {
  Hand,
  Link2,
  Layers,
  FoldHorizontal,
  PersonStanding,
  CircleAlert,
  Sparkles,
  Activity,
  Shirt,
  Heart,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'
import { prefetchHeroVideo } from '../../components/condition-landing/heroVideo'

// Landing "Cicatrice cesareo": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('CICATRICI_CESAREO_VSL')

const HERO_BENEFITS = [
  <>
    Smetti di sentirti dire che col <strong>tempo</strong> passa
  </>,
  <>
    Riduci il <strong>tiraggio</strong> e la cicatrice che non{' '}
    <strong>scorre</strong>
  </>,
  <>
    Torna a <strong>sentire</strong> la pancia, con meno{' '}
    <strong>compensi</strong> sulla schiena
  </>,
]

const PAIN_POINTS = [
  {
    icon: Hand,
    title: 'Zona addormentata sopra e intorno al taglio',
    body: 'Un’area di pelle che non sente il tocco o lo sente attutito, spesso ampia diversi centimetri.',
  },
  {
    icon: Link2,
    title: 'Sensazione di “tiraggio” interno',
    body: 'Allungandoti, girandoti o stirandoti senti qualcosa che tira dentro la pancia.',
  },
  {
    icon: Layers,
    title: 'Cicatrice aderente, che non scorre',
    body: 'Provi a muoverla con le dita e resta attaccata ai piani sotto, come incollata.',
  },
  {
    icon: FoldHorizontal,
    title: 'Il “gradino” o piega sopra la cicatrice',
    body: 'Una sporgenza di tessuto che si forma appena sopra il taglio, indipendente dal peso.',
  },
  {
    icon: PersonStanding,
    title: 'Dolore lombare comparso dopo il parto',
    body: 'Mal di schiena nella zona bassa senza un trauma che lo giustifichi.',
  },
  {
    icon: CircleAlert,
    title: 'Fastidio o dolore alla palpazione',
    body: 'Toccando la zona, anche anni dopo, senti dolore o un fastidio strano.',
  },
  {
    icon: Sparkles,
    title: 'Prurito, bruciore o formicolio nella zona',
    body: 'Sensazioni anomale dovute ai nervi superficiali coinvolti nel taglio.',
  },
  {
    icon: Activity,
    title: 'Difficoltà ad attivare gli addominali bassi',
    body: 'Fai gli esercizi e senti che quella zona non si accende, come se il collegamento non ci fosse.',
  },
  {
    icon: Shirt,
    title: 'Fastidio con i vestiti che premono',
    body: 'Il bottone dei jeans o la cintura proprio su quella linea danno fastidio.',
  },
  {
    icon: Heart,
    title: 'Dolore durante i rapporti o al bacino',
    body: 'Tensioni che si trasmettono in profondità, verso il bacino e il pavimento pelvico.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'La cicatrice incolla gli strati',
    b: 'Pelle, tessuto sotto e muscolo guariscono restando aderenti tra loro: è il lavoro della cicatrice.',
  },
  {
    k: '02',
    t: 'Il tessuto non scorre più',
    b: 'Quando gli strati restano incollati, ogni movimento trova quel punto che tira: pancia, schiena e postura si riorganizzano.',
  },
  {
    k: '03',
    t: 'Si lavora sullo scorrimento',
    b: 'Il tempo chiude la ferita. Sugli strati che restano aderenti — e sul tiraggio che resta — spesso nessuno ha ancora lavorato.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/pancia_addome-basso-supino_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta l’addome basso di una paziente',
    title: 'Creme, oli e silicone: solo in superficie',
    body: 'Lavorano sull’aspetto della cicatrice. Non sciolgono le aderenze in profondità né restituiscono lo scorrimento tra gli strati.',
  },
  {
    image: '/trattamenti/spalla_supino-con-bambino_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico di una mamma supina con il suo bambino',
    title: '“Pensa a tuo figlio, il resto è estetica”',
    body: 'La frase che ti zittisce. Ma non è estetica: è che il tuo corpo non funziona come prima.',
  },
  {
    image: '/trattamenti/pancia_addome-supino_07_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico sull’addome di una paziente',
    title: 'Il controllo dei quaranta giorni e poi via',
    body: 'Verifica che la ferita sia chiusa. Poi il percorso finisce, e nessuno ti chiede più niente sul come sta il tuo corpo.',
  },
  {
    image: '/trattamenti/anca_flessa-supino_13_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di anca e bacino di una paziente con la gamba flessa',
    title: 'Ginnastica, addominali e massaggio fai da te',
    body: 'Utile come intuizione o inizio, ma senza direzioni e piani giusti la zona che non si attiva resta spenta.',
  },
  {
    image: '/trattamenti/pancia_addome-supino_20_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico sull’addome di una paziente',
    title: 'Mal di schiena e pavimento pelvico senza collegamento',
    body: 'Si tratta la lombare o si propone la riabilitazione pelvica, ma quasi mai si collega il dolore alla cicatrice sul davanti.',
  },
  {
    image: '/trattamenti/anca_flessa-supino_11_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di anca e bacino di una paziente con la gamba flessa',
    title: 'Nessun farmaco scioglie un’aderenza',
    body: 'È una condizione di tessuto. Ecografia e RM restano per casi selezionati: lo scorrimento si valuta — e si lavora — con le mani.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Sciogliamo la cicatrice che non <strong>scorre</strong> e il{' '}
    <strong>tiraggio</strong> interno
  </>,
  <>
    Torni a <strong>sentire</strong> la pancia e a riattivare gli
    addominali bassi
  </>,
  <>
    Torni a muoverti con più <strong>scioltezza</strong>, con meno
    compensi su schiena e postura
  </>,
  <>
    Non sostituiamo il percorso ostetrico: lavoriamo su ciò che il{' '}
    <strong>tempo</strong> da solo non scioglie
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
    body: 'Analizziamo cicatrice, scorrimento degli strati, pancia, schiena e dinamica corporea per individuare fattori che alimentano il tiraggio.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su automassaggio, movimento e posture, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'anni-dopo',
    question: (
      <>
        Sono passati <strong>anni</strong>: ormai è così?
      </>
    ),
    answer: (
      <>
        No, non necessariamente. Il tempo chiude la ferita, non scolla gli strati: su una
        cicatrice si può lavorare anche a distanza di anni. La valutazione dice quanto margine
        c’è, senza promesse facili.
      </>
    ),
  },
  {
    id: 'imbarazzo',
    question: (
      <>
        Mi imbarazza farla <strong>toccare</strong>: come lavorate?
      </>
    ),
    answer: (
      <>
        Comprensibile. Si lavora con delicatezza, spiegando ogni passaggio, con il tuo consenso a
        ogni passo. Ti fermi quando vuoi: comanda il tuo comfort, non un protocollo uguale per
        tutte.
      </>
    ),
  },
  {
    id: 'schiena',
    question: (
      <>
        Che c’entra la cicatrice col mio <strong>mal di schiena</strong>?
      </>
    ),
    answer: (
      <>
        Un punto che tira davanti fa compensare dietro: è meccanica semplice. Ed è il
        collegamento che spesso nessuno ha controllato. Lavoriamo su cicatrice e compensi insieme,
        in affiancamento al percorso medico se già in corso.
      </>
    ),
  },
  {
    id: 'automassaggio',
    question: (
      <>
        La massaggio già da sola: ha senso venire?
      </>
    ),
    answer: (
      <>
        Sì, se il tiraggio resta. L’automassaggio è un’ottima intuizione: con le direzioni e i
        piani giusti diventa davvero efficace. Ti insegniamo come, così il lavoro continua a casa
        tra le sedute.
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
        In presenza di rossore, calore, secrezione o febbre nella zona della cicatrice, dolore
        acuto e improvviso alla pancia, massa dura che cresce nella zona, dolore che si accende
        ogni ciclo sulla cicatrice, perdite di sangue anomale e persistenti, oppure gravidanza in
        corso con dolore forte sulla cicatrice, la priorità è la valutazione medica o
        ginecologica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un
        supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'cicatrici-cesareo',
  heroVideo,
  videoTitle: 'Video trattamento cicatrice cesareo - Mobilitas Torino',
  images: {
    hero: '/trattamenti/pancia_addome-basso-supino_01_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/pancia_addome-supino_13_orizzontale',
    bandClassName: 'object-[55%_62%]',
    final: '/trattamenti/anca_flessa-supino_05_orizzontale',
    finalClassName: 'object-[40%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Cicatrice cesareo',
    title: { main: 'Hai una cicatrice da cesareo e ti dicono che col tempo passa?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>cicatrice</strong>,{' '}
        <strong>aderenze</strong> e{' '}
        <strong>postura</strong> per ridurre l’impatto del
        tiraggio su pancia, schiena e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La cicatrice non ti limita solo sul taglio.', accent: 'Ti limita nel corpo che non risponde più.' },
    intro: (
      <>
        Ignorarla non la fa sparire: la normalizza. E più la normalizzi, più ti toglie{' '}
        <strong>scorrimento</strong>,{' '}
        <strong>sensibilità</strong> e{' '}
        <strong>serenità</strong> nel tuo corpo.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Creme</strong> e{' '}
        <strong>controllo dei quaranta giorni</strong>{' '}
        restano punti importanti. Ma se gli{' '}
        <strong>strati restano aderenti</strong>, il
        tiraggio può continuare anche anni dopo.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Pelle' }, { text: 'Tessuto' }, { text: 'Aderenza' }, { text: 'Muscolo', accent: true }],
      caption: 'Il tempo chiude la ferita. Gli strati possono restare aderenti.',
    },
    narrative: (
      <>
        Una cicatrice guarisce incollando gli strati tra loro:{' '}
        <strong>pelle</strong>, tessuto sotto,{' '}
        <strong>muscolo</strong>. Quando restano
        aderenti, il tessuto non scorre più: ogni movimento trova quel punto che tira,
        la pancia sopra smette di rispondere, la schiena compensa.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre basta “dare tempo”.', accent: 'A volte serve lavorare sullo scorrimento degli strati.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> del tiraggio su pancia,
          schiena e sulla vita quotidiana, con un percorso serio e misurabile.
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
        <strong>scorrimento</strong>, meno{' '}
        <strong>tiraggio</strong> e un corpo che torna a
        risponderti. Inizia con un consulto telefonico o la prima visita.
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
        e iniziamo a costruire un percorso concreto per scollare gli strati — oltre a creme e
        tempo.
      </>
    ),
  },
  seo: {
    dataPage: 'cicatrici-cesareo',
    path: '/cicatrici-cesareo',
    ogImage: '/trattamenti/og/pancia_addome-basso-supino_02_orizzontale.jpg',
    title: 'Osteopata Cicatrice Cesareo Torino | Aderenze e Post-Parto | Mobilitas',
    description:
      'Osteopata per cicatrice da cesareo a Torino (San Donato e Crocetta). Lavoriamo su aderenze, scorrimento dei tessuti, pancia e postura post-parto. Prima visita 49€.',
    keywords: [
      'osteopata cicatrice cesareo torino',
      'cicatrice cesareo osteopata',
      'aderenze cicatrice cesareo',
      'trattamento cicatrice cesareo',
      'post parto osteopata torino',
      'cicatrice addominale osteopatia',
      'gradino cicatrice cesareo',
      'mal di schiena dopo cesareo',
      'massaggio cicatrice cesareo',
      'osteopata post parto torino',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per cicatrice da cesareo – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Cicatrice Cesareo Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per cicatrice da cesareo – Mobilitas Torino',
    condition: {
      name: 'Cicatrice da taglio cesareo e aderenze',
      alternateName: [
        'Cicatrice cesareo',
        'Aderenze cicatrice addominale',
        'Cicatrice post-parto',
        'Tiraggio cicatrice cesareo',
        'Cicatrice aderente',
        'Disfunzione cicatriziale post-cesareo',
      ],
      anatomy: 'Parete addominale, cicatrice cesarea e bacino',
    },
    therapy: {
      name: 'Trattamento osteopatico per cicatrice da cesareo',
      description:
        'Approccio osteopatico integrato su cicatrice, aderenze, tessuti addominali, bacino e postura post-parto.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per cicatrice da cesareo',
      },
    },
    breadcrumbName: 'Cicatrici cesareo',
    faq: [
      {
        name: 'Sono passati anni: ormai è così?',
        text: 'No, non necessariamente. Il tempo chiude la ferita, non scolla gli strati: su una cicatrice si può lavorare anche a distanza di anni. La valutazione dice quanto margine c’è, senza promesse facili.',
      },
      {
        name: 'Mi imbarazza farla toccare: come lavorate?',
        text: 'Comprensibile. Si lavora con delicatezza, spiegando ogni passaggio, con il tuo consenso a ogni passo. Ti fermi quando vuoi: comanda il tuo comfort, non un protocollo uguale per tutte.',
      },
      {
        name: 'Che c’entra la cicatrice col mio mal di schiena?',
        text: 'Un punto che tira davanti fa compensare dietro: è meccanica semplice. Ed è il collegamento che spesso nessuno ha controllato. Lavoriamo su cicatrice e compensi insieme, in affiancamento al percorso medico se già in corso.',
      },
      {
        name: 'La massaggio già da sola: ha senso venire?',
        text: 'Sì, se il tiraggio resta. L’automassaggio è un’ottima intuizione: con le direzioni e i piani giusti diventa davvero efficace. Ti insegniamo come, così il lavoro continua a casa tra le sedute.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'In presenza di rossore, calore, secrezione o febbre nella zona della cicatrice, dolore acuto e improvviso alla pancia, massa dura che cresce nella zona, dolore che si accende ogni ciclo sulla cicatrice, perdite di sangue anomale e persistenti, oppure gravidanza in corso con dolore forte sulla cicatrice, la priorità è la valutazione medica o ginecologica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function CicatriciCesareo() {
  return <PrimaVisitaLanding page={PAGE} />
}
