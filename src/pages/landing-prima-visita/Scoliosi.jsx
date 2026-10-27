import {
  Scale,
  Shirt,
  Eye,
  Hourglass,
  Lock,
  Wind,
  BatteryLow,
  TrendingUp,
  Users,
  Armchair,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'

// Landing "Scoliosi": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

const HERO_BENEFITS = [
  <>
    Stare in piedi o seduto a lungo senza che la <strong>schiena</strong> presenti
    il conto
  </>,
  <>
    Capire cosa si può fare per <strong>dolore e rigidità</strong>, anche se la
    curva resta
  </>,
  <>
    Farti guardare <strong>torace</strong>,{' '}
    <strong>respiro</strong> e spalle, non solo i gradi della radiografia
  </>,
]

const PAIN_POINTS = [
  {
    icon: Scale,
    title: 'Spalle o fianchi ad altezze diverse',
    body: 'Una spalla più alta dell’altra, un fianco più marcato: lo noti allo specchio e, una volta visto, non riesci più a non vederlo.',
  },
  {
    icon: Shirt,
    title: 'I vestiti cadono storti',
    body: 'L’orlo della maglietta più alto da un lato, la spallina che scivola sempre dalla stessa parte, i pantaloni che girano.',
  },
  {
    icon: Eye,
    title: 'Un lato della schiena più sporgente',
    body: 'Quando ti pieghi in avanti una scapola o un lato delle costole sporge di più. A volte è qualcun altro a fartelo notare.',
  },
  {
    icon: Hourglass,
    title: 'Mal di schiena dopo ore in piedi',
    body: 'Fila al supermercato, cucina, una giornata in giro: la schiena regge per un po’, poi inizia a tirare e a bruciare.',
  },
  {
    icon: Armchair,
    title: 'Seduto non trovi mai la posizione giusta',
    body: 'Ti sposti sulla sedia, ti appoggi da un lato, cambi posizione di continuo: la scrivania diventa una lotta.',
  },
  {
    icon: Lock,
    title: 'Schiena rigida, soprattutto nelle torsioni',
    body: 'Girarti per fare retromarcia, allacciarti le scarpe o ruotare verso un lato costa più fatica che verso l’altro.',
  },
  {
    icon: BatteryLow,
    title: 'Un lato sempre più stanco e contratto',
    body: 'A fine giornata senti i muscoli di un lato della schiena tesi come corde, e l’altro quasi “spento”.',
  },
  {
    icon: Wind,
    title: 'Il respiro non si apre fino in fondo',
    body: 'Hai la sensazione che un lato del torace si espanda meno, e che un respiro profondo resti a metà.',
  },
  {
    icon: TrendingUp,
    title: 'La paura che peggiori',
    body: 'Ad ogni controllo aspetti il numero dei gradi con l’ansia, e ti chiedi come sarà la tua schiena tra dieci o vent’anni.',
  },
  {
    icon: Users,
    title: 'La preoccupazione per tuo figlio',
    body: 'La diagnosi a scuola o dal pediatra, il corsetto, gli esercizi: vuoi fare tutto il possibile, ma non sai bene cosa sia utile e cosa no.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'La curva non è solo un numero',
    b: 'La radiografia misura i gradi, ma il dolore di oggi dipende spesso da altro: muscoli che lavorano in modo asimmetrico, torace rigido, un bacino che compensa.',
  },
  {
    k: '02',
    t: 'Il corpo si organizza intorno alla curva',
    b: 'Collo, spalle, gabbia toracica e bacino si adattano per tenerti dritto e con lo sguardo in avanti. Quei compensi, nel tempo, possono irrigidirsi e fare male.',
  },
  {
    k: '03',
    t: 'Sulla curva decide lo specialista, sui compensi si può lavorare',
    b: 'Ecco perché “non c’è niente da fare” è vero solo a metà: la curva resta, ma rigidità, respiro e dolore sono un livello su cui si può intervenire.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Valutazione in piedi di spalle e postura di un paziente',
    title: 'Radiografia e controlli periodici',
    body: 'Sono indispensabili: misurano la curva e permettono allo specialista di seguirla nel tempo, soprattutto nei ragazzi in crescita. Ma dicono quanti gradi ha la curva, non perché oggi ti fa male: gradi e dolore spesso non vanno di pari passo.',
  },
  {
    image: '/trattamenti/schiena_dorso-sacrale-prono_02_orizzontale',
    imageClassName: 'object-[50%_60%]',
    alt: 'Osteopata che tratta la schiena di un paziente a pancia in giù, tra zona dorsale e sacro',
    title: 'Corsetto',
    body: 'Nei ragazzi in crescita, quando lo prescrive lo specialista, è uno degli strumenti più importanti per contenere il peggioramento della curva, e non va mai tolto o ridotto di propria iniziativa. Può però lasciare rigidità e fastidi che nessuno segue da vicino.',
  },
  {
    image: '/trattamenti/schiena_lombare-decubito-laterale_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento della zona lombare di una paziente sdraiata su un fianco',
    title: 'Esercizi specifici per la scoliosi',
    body: 'Gli esercizi specifici con un professionista formato sono un riferimento serio, in crescita e da adulti. Chiedono costanza, e quando schiena e torace sono rigidi o doloranti diventa difficile farli bene e con continuità.',
  },
  {
    image: '/trattamenti/collo_cervicale-e-spalle-supino_03_orizzontale',
    imageClassName: 'object-[0%_50%]',
    alt: 'Osteopata che tratta collo e spalle di una paziente supina',
    title: 'Antidolorifici e antinfiammatori',
    body: 'Aiutano nelle giornate peggiori, ed è giusto usarli quando il medico li indica. Abbassano il dolore, ma non toccano la rigidità e i compensi che lo riaccendono a fine giornata.',
  },
  {
    image: '/trattamenti/spalla_scapola-decubito-laterale_06_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di scapola e spalla di una paziente sdraiata su un fianco',
    title: 'Massaggi e ginnastica posturale generica',
    body: 'Il massaggio scioglie per qualche giorno i muscoli più tesi; la ginnastica generica ti tiene attivo, ed è già molto. Spesso però sono uguali per tutti, mentre una scoliosi chiede di lavorare in modo diverso sui due lati.',
  },
  {
    image: '/trattamenti/schiena_lombare-prono_14_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico della zona lombare di un paziente a pancia in giù',
    title: 'Visita ortopedica e “non c’è niente da fare”',
    body: 'Lo specialista è il riferimento per la curva: decide controlli, corsetto e, nei casi selezionati, la chirurgia. Quando ti dice che “non c’è niente da fare” di solito significa che la curva non va trattata, non che dolore e rigidità debbano restare così.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Arrivare a sera con una <strong>schiena</strong> meno rigida e meno
    stanca da un lato
  </>,
  <>
    Capire la differenza tra la <strong>curva</strong>, che segue lo
    specialista, e il dolore, su cui si può lavorare
  </>,
  <>
    Lavorare anche su <strong>respiro</strong> e mobilità del torace, non solo
    sulla schiena
  </>,
  <>
    Affiancare <strong>corsetto ed esercizi</strong> invece di sentirti
    solo con un numero sulla radiografia
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
    body: 'Ricostruiamo la storia della curva, radiografie e controlli, corsetto o esercizi in corso, sintomi e terapie, per definire priorità e obiettivi realistici.',
  },
  {
    title: 'Valutazione obiettiva e posturale',
    body: 'Valutiamo mobilità della colonna, gabbia toracica e respiro, spalle, bacino e come il corpo compensa la curva nei gesti di ogni giorno.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo con tecniche dolci su rigidità di schiena e torace, respiro, collo, spalle e bacino, nel rispetto delle indicazioni dello specialista e senza intervenire sulla curva in sé.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo consigli su posizioni, respiro e movimento quotidiano, da integrare con gli esercizi specifici e il percorso indicato da ortopedico o fisiatra.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'raddrizzare',
    question: (
      <>
        L’osteopatia può <strong>raddrizzare</strong> la colonna o ridurre i gradi della curva?
      </>
    ),
    answer: (
      <>
        No, e chi te lo promette non è onesto. La curva della scoliosi non si corregge con il
        trattamento osteopatico: quella la segue lo specialista, con controlli, corsetto ed esercizi
        specifici quando servono. Noi lavoriamo su un altro livello —{' '}
        <strong>dolore, rigidità, respiro e funzione</strong> — in <em>affiancamento</em> a
        ortopedico e fisiatra, non al posto loro.
      </>
    ),
  },
  {
    id: 'corsetto',
    question: (
      <>
        Mio figlio ha la scoliosi e porta il <strong>corsetto</strong>: ha senso venire da voi?
      </>
    ),
    answer: (
      <>
        Per un ragazzo in crescita il riferimento resta lo specialista: corsetto ed esercizi
        prescritti non si toccano e non si riducono. Se ci sono fastidi, rigidità o dolori legati al
        corsetto o allo sport, possiamo valutarli e affiancare il percorso, sempre in accordo con le
        indicazioni dello specialista e con un genitore presente alla visita.
      </>
    ),
  },
  {
    id: 'niente-da-fare',
    question: (
      <>
        Mi hanno detto che “<strong>non c’è niente da fare</strong>”: è davvero così?
      </>
    ),
    answer: (
      <>
        Sulla curva, spesso sì: se è stabile e non richiede corsetto o chirurgia, lo specialista ti
        dice correttamente che non va trattata. Ma questo non significa che dolore, rigidità e
        stanchezza a fine giornata debbano restare così. Su quella parte si può lavorare, con
        obiettivi realistici.
      </>
    ),
  },
  {
    id: 'peggiorare',
    question: (
      <>
        Ho paura che la scoliosi <strong>peggiori</strong> con l’età: cosa posso fare?
      </>
    ),
    answer: (
      <>
        La prima cosa è fare i controlli che ti indica lo specialista: è lui a dire se e quanto la
        curva cambia nel tempo. Noi non possiamo fermare un peggioramento della curva. Possiamo però
        aiutarti a mantenere la schiena più mobile e il corpo più attivo, che è una parte importante
        del vivere bene con la scoliosi.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che il <strong>mal di schiena</strong> da scoliosi passa del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. L’obiettivo onesto è capire come il tuo corpo si è organizzato
        intorno alla curva e ridurre l’impatto su lavoro, sonno e movimento: meno rigidità, più
        attenzione al respiro, giornate più leggere. Quanto si può migliorare nel tuo caso si capisce
        solo valutandoti — nessuna promessa facile, solo chiarezza.
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
        In presenza di una curva o un’asimmetria che peggiora visibilmente in pochi mesi durante la
        crescita, dolore notturno intenso che sveglia e non cambia con la posizione (soprattutto con
        febbre o calo di peso), formicolii, perdita di forza o di sensibilità alle gambe, difficoltà a
        camminare o problemi di controllo di pipì o feci, fiato corto marcato o che peggiora, oppure
        una curva comparsa o aggravata rapidamente in età adulta, la priorità è la valutazione medica
        tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'scoliosi',
  heroVideo: null, // Video non ancora girato: in apertura c'è la foto images.hero. Quando c'è, prefetchHeroVideo('SCOLIOSI_VSL') a livello di modulo
  videoTitle: 'Video trattamento scoliosi - Mobilitas Torino',
  images: {
    hero: '/trattamenti/schiena_dorsale-alta-prono_04_orizzontale',
    heroClassName: 'object-[40%_50%]',
    band: '/trattamenti/collo_allungamento-cervicale-supino_02_orizzontale',
    bandClassName: 'object-[30%_60%]',
    final: '/trattamenti/collo_presa-cervicale-supino_17_orizzontale',
    finalClassName: 'object-[15%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Scoliosi',
    title: { main: 'Hai la scoliosi e ti hanno detto che non c’è niente da fare?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Non raddrizziamo la colonna: interveniamo in modo specifico su{' '}
        <strong>rigidità</strong>,{' '}
        <strong>respiro</strong> e{' '}
        <strong>compensi</strong> per alleggerire
        quanto la scoliosi pesa su schiena, lavoro e vita di tutti i giorni, in affiancamento allo
        specialista.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La scoliosi non è solo una curva sulla radiografia.', accent: 'È una schiena che porti ogni giorno.' },
    intro: (
      <>
        Ignorare i fastidi non li fa sparire: li normalizza. E più li normalizzi, più ti tolgono{' '}
        <strong>scioltezza</strong>,{' '}
        <strong>fiato</strong> e la{' '}
        <strong>serenità</strong> di guardarti allo specchio
        senza cercare la curva.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>I controlli contano</strong>.{' '}
        <strong>Corsetto ed esercizi contano</strong>. Ma non
        sono l’unico livello del problema: il modo in cui{' '}
        <strong>collo, spalle, torace e bacino</strong> si
        adattano alla curva può mantenere dolore e rigidità anche quando la curva è stabile.
      </>
    ),
    emblem: {
      variant: 'chain',
      labels: [{ text: 'COLLO' }, { text: 'SPALLE' }, { text: 'TORACE', accent: true }, { text: 'BACINO' }],
      caption: 'La curva la segue lo specialista. Come il corpo la porta, è il livello su cui lavoriamo.',
    },
    narrative: (
      <>
        Con la scoliosi la colonna non è solo inclinata: è anche ruotata, e si porta dietro le
        costole. Per tenerti dritto e con lo sguardo in avanti, il corpo compensa: una{' '}
        <strong>spalla</strong> lavora più dell’altra, il{' '}
        <strong>torace</strong> si muove meno da un lato, il
        bacino si adatta. Sono questi compensi, più dei gradi, a farsi sentire a fine giornata.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'La curva non si cancella.', accent: 'Ma il modo in cui la porti può cambiare.' },
    sub: {
      title: { main: 'Ecco perché è importante intervenire', accent: 'su rigidità, respiro e compensi.' },
      intro: (
        <>
          Nessuna promessa sulla curva, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> della scoliosi sulla tua vita
          quotidiana, con un percorso serio e coordinato con lo specialista.
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
        <strong>scioltezza</strong>, più attenzione al{' '}
        <strong>respiro</strong> e meno peso a
        fine giornata. Inizia con un consulto telefonico o la prima visita.
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
        Se anche una sola di queste risposte ti rappresenta, non restare fermo con un numero sulla
        radiografia e un dolore che nessuno segue.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire un percorso concreto, accanto allo specialista, per ridurre l’impatto
        della scoliosi sulla tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'scoliosi',
    path: '/scoliosi',
    ogImage: '/trattamenti/og/schiena_lombare-supino_01_orizzontale.jpg',
    title: 'Osteopata Scoliosi Torino | Dolore, Rigidità e Respiro | Mobilitas',
    description:
      'Osteopata per scoliosi a Torino (San Donato e Crocetta). Non correggiamo la curva: lavoriamo su dolore, rigidità, respiro e compensi, in affiancamento a ortopedico e fisiatra. Prima visita 49€.',
    keywords: [
      'osteopata scoliosi torino',
      'scoliosi torino',
      'osteopatia scoliosi',
      'trattamento scoliosi osteopata',
      'scoliosi adulto torino',
      'mal di schiena scoliosi',
      'scoliosi corsetto',
      'scoliosi ragazzi torino',
      'spalle asimmetriche',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per scoliosi – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Scoliosi Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per scoliosi – Mobilitas Torino',
    condition: {
      name: 'Scoliosi',
      alternateName: [
        'Scoliosi idiopatica',
        'Scoliosi dell’adulto',
        'Scoliosi degenerativa',
        'Curva della colonna vertebrale',
        'Deviazione laterale della colonna',
      ],
      anatomy: 'Colonna vertebrale, gabbia toracica, spalle, bacino e muscoli respiratori',
    },
    therapy: {
      name: 'Trattamento osteopatico per scoliosi',
      description:
        'Approccio osteopatico su dolore, rigidità, respiro e compensi posturali legati alla scoliosi, senza intervento sulla curva, in affiancamento al percorso ortopedico e fisiatrico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per scoliosi',
      },
    },
    breadcrumbName: 'Scoliosi',
    faq: [
      {
        name: 'L’osteopatia può raddrizzare la colonna o ridurre i gradi della curva?',
        text: 'No, e chi te lo promette non è onesto. La curva della scoliosi non si corregge con il trattamento osteopatico: quella la segue lo specialista, con controlli, corsetto ed esercizi specifici quando servono. Noi lavoriamo su dolore, rigidità, respiro e funzione, in affiancamento a ortopedico e fisiatra.',
      },
      {
        name: 'Mio figlio ha la scoliosi e porta il corsetto: ha senso venire da voi?',
        text: 'Per un ragazzo in crescita il riferimento resta lo specialista: corsetto ed esercizi prescritti non si toccano e non si riducono. Se ci sono fastidi, rigidità o dolori legati al corsetto o allo sport, possiamo valutarli e affiancare il percorso, sempre in accordo con le indicazioni dello specialista e con un genitore presente.',
      },
      {
        name: 'Mi hanno detto che non c’è niente da fare: è davvero così?',
        text: 'Sulla curva, spesso sì: se è stabile e non richiede corsetto o chirurgia, non va trattata. Ma questo non significa che dolore, rigidità e stanchezza a fine giornata debbano restare così. Su quella parte si può lavorare, con obiettivi realistici.',
      },
      {
        name: 'Ho paura che la scoliosi peggiori con l’età: cosa posso fare?',
        text: 'La prima cosa è fare i controlli che ti indica lo specialista: è lui a dire se e quanto la curva cambia nel tempo. Noi non possiamo fermare un peggioramento della curva, ma possiamo aiutarti a mantenere la schiena più mobile e il corpo più attivo.',
      },
      {
        name: 'Mi promettete che il mal di schiena da scoliosi passa del tutto?',
        text: 'No, e diffidiamo di chi lo fa. L’obiettivo onesto è capire come il tuo corpo si è organizzato intorno alla curva e ridurre l’impatto su lavoro, sonno e movimento — nessuna promessa facile, solo chiarezza.',
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'In presenza di una curva o un’asimmetria che peggiora visibilmente in pochi mesi durante la crescita, dolore notturno intenso che sveglia e non cambia con la posizione (soprattutto con febbre o calo di peso), formicolii, perdita di forza o di sensibilità alle gambe, difficoltà a camminare o problemi di controllo di pipì o feci, fiato corto marcato o che peggiora, oppure una curva comparsa o aggravata rapidamente in età adulta, la priorità è la valutazione medica tempestiva.',
      },
    ],
  },
}

export default function Scoliosi() {
  return <PrimaVisitaLanding page={PAGE} />
}
