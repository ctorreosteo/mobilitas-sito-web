import {
  Activity,
  Lock,
  Dumbbell,
  Armchair,
  AlarmClock,
  Volume2,
  ArrowDownToLine,
  Zap,
  PersonStanding,
  BatteryLow,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'
import { prefetchHeroVideo } from '../../components/condition-landing/heroVideo'

// Landing "Mal di schiena": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('MALDISCHIENA_VSL')

const HERO_BENEFITS = [
  <>
    Torna a <strong>chinarti</strong> senza calcolare ogni{' '}
    <strong>movimento</strong>
  </>,
  <>
    Svegliati senza la <strong>schiena bloccata</strong> e la rigidità del{' '}
    <strong>mattino</strong>
  </>,
  <>
    Arriva a fine giornata senza il <strong>peso</strong> sulla{' '}
    <strong>schiena</strong>
  </>,
]

const PAIN_POINTS = [
  {
    icon: Activity,
    title: 'Dolore diffuso lungo la schiena',
    body: 'Un dolore sordo che può spostarsi lungo la colonna, spesso più intenso al risveglio o a fine giornata.',
  },
  {
    icon: Lock,
    title: 'Rigidità e movimenti che si bloccano',
    body: 'Chinarti, ruotare il busto, alzarti dalla sedia: il movimento tira e si ferma prima del normale.',
  },
  {
    icon: Dumbbell,
    title: 'Muscoli della schiena contratti',
    body: 'Le fasce ai lati della colonna sono dure al tatto e dolenti se premute.',
  },
  {
    icon: Armchair,
    title: 'Peggiora stando fermo a lungo',
    body: 'Seduto alla scrivania, in piedi in fila, in auto: più resti nella stessa posizione, più il dolore sale.',
  },
  {
    icon: AlarmClock,
    title: 'Rigidità al risveglio',
    body: 'La schiena è dura appena sveglio e ci vogliono minuti prima di muoverti con normalità.',
  },
  {
    icon: Volume2,
    title: 'Scrocchi e rumori muovendo la schiena',
    body: 'Rumori articolari quando ti pieghi o ti giri, spesso senza dolore ma fastidiosi.',
  },
  {
    icon: ArrowDownToLine,
    title: 'Difficoltà a chinarti',
    body: 'Raccogliere qualcosa da terra, allacciarti le scarpe, svuotare la lavastoviglie: gesti semplici diventati una manovra.',
  },
  {
    icon: Zap,
    title: 'Il “blocco” improvviso',
    body: 'Un movimento banale e la schiena si inchioda: per qualche istante non riesci più a raddrizzarti.',
  },
  {
    icon: PersonStanding,
    title: 'Fastidio che si estende verso gluteo o gamba',
    body: 'A volte la tensione non resta nella schiena: scende verso il gluteo o lungo la gamba, in genere da un lato solo.',
  },
  {
    icon: BatteryLow,
    title: 'Pesantezza e stanchezza a fine giornata',
    body: 'Verso sera la schiena è pesante, come se avesse retto un carico per ore.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'La schiena paga il conto di ciò che succede intorno',
    b: 'Sta al centro del corpo, dove il peso della parte alta incontra il bacino e le gambe, e si muove insieme al respiro.',
  },
  {
    k: '02',
    t: 'Anche, bacino e respiro smettono di sostenere',
    b: 'Quando le anche perdono mobilità, resti seduto otto ore o il respiro resta corto, i muscoli della schiena lavorano il doppio per compensare.',
  },
  {
    k: '03',
    t: 'Alla lunga si irrigidiscono',
    b: 'Quella rigidità la senti come dolore, blocchi e pesantezza: non è solo “la schiena”, è la catena che non si muove più.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/schiena_lombare-supino_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che lavora sulla zona lombare di una paziente supina',
    title: 'Antinfiammatori e antidolorifici',
    body: 'Abbassano il dolore per qualche ora, ma agiscono sul sintomo: quando finisce l’effetto, la tensione che lo produce è ancora lì. FANS orali e topici, paracetamolo e miorilassanti sono i più usati — utili, non risolutivi sulla causa.',
  },
  {
    image: '/trattamenti/schiena_lombare-prono_14_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico della zona lombare di un paziente a pancia in giù',
    title: 'Massaggi',
    body: 'Danno un sollievo reale ma spesso breve, perché lavorano sul muscolo contratto e non sul motivo per cui si contrae.',
  },
  {
    image: '/trattamenti/anca_decubito-laterale_07_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta anca e bacino di una paziente sdraiata su un fianco',
    title: 'Materassi nuovi',
    body: 'Rigido, in memory, ortopedico: aiutano la notte, ma non cambiano quello che la schiena accumula nelle sedici ore in cui sei sveglio.',
  },
  {
    image: '/trattamenti/schiena_dorso-sacrale-prono_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di zona dorsale e sacro di un paziente',
    title: 'Fisioterapia e rieducazione',
    body: 'Spesso migliorano, ma se la schiena compensa per anche, bacino o respiro, il risultato tende a non durare. Anche esercizi online e fasce lombari restano generici se lo schema di movimento non cambia.',
  },
  {
    image: '/trattamenti/anca_flessa-supino_12_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di anca e bacino di una paziente con la gamba flessa',
    title: 'Risonanza e visite specialistiche',
    body: 'Radiografia, RM, TAC ed elettromiografia servono a escludere problemi seri, e questo conta. Ma un’immagine non spiega perché certi giorni stai bene e altri no: protrusioni e discopatie sono comuni anche in chi non ha dolore.',
  },
  {
    image: '/trattamenti/schiena_lombare-decubito-laterale_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento lombare di un paziente sdraiato su un fianco',
    title: 'Infiltrazioni',
    body: 'Opzione più invasiva riservata a casi selezionati, che agisce sull’infiammazione locale ma non su ciò che continua a generarla. Ghiaccio e calore restano utili nella fase acuta, non risolutivi su una tensione che si ripresenta da anni.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Tornare a <strong>chinarti</strong> senza pensarci, senza calcolare ogni
    movimento
  </>,
  <>
    Svegliarti senza la <strong>schiena bloccata</strong> e senza “scioglierti”
    ogni mattina
  </>,
  <>
    Arrivare a fine giornata senza il <strong>peso</strong> sulla schiena
  </>,
  <>
    Capire da dove nasce davvero il <strong>dolore</strong>, per smettere di
    ripeterlo
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
    body: 'Analizziamo schiena, bacino, anche e dinamica corporea per individuare fattori che possono alimentare il dolore.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su posizioni, pause e movimento a casa e alla scrivania, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'scrocchio',
    question: (
      <>
        Ho paura che mi <strong>scrocchiate</strong> la schiena: è obbligatorio?
      </>
    ),
    answer: (
      <>
        No. Le manipolazioni con lo scrocchio non sono obbligatorie: esistono tecniche dolci
        altrettanto valide. Nulla viene fatto senza il tuo consenso, e se preferisci un approccio
        senza “click” lo rispettiamo.
      </>
    ),
  },
  {
    id: 'protrusioni',
    question: (
      <>
        La risonanza dice che ho <strong>protrusioni</strong>: c’è poco da fare?
      </>
    ),
    answer: (
      <>
        Le stesse immagini si trovano in tantissime persone senza alcun dolore: l’immagine da sola
        non dice come stai. Su muscoli e movimento si può lavorare, in affiancamento al percorso
        medico — non al posto degli esami che hai già fatto.
      </>
    ),
  },
  {
    id: 'massaggi',
    question: (
      <>
        Ho già fatto <strong>massaggi</strong>: dura tre giorni. Perché venire da voi?
      </>
    ),
    answer: (
      <>
        Il massaggio lavora sul muscolo contratto; noi cerchiamo anche il motivo per cui si contrae —
        spesso anche, bacino o respiro. La prima visita serve proprio a capire se c’è qualcosa su
        cui intervenire oltre al sollievo breve.
      </>
    ),
  },
  {
    id: 'funzionera',
    question: (
      <>
        <strong>Funzionerà</strong> per me?
      </>
    ),
    answer: (
      <>
        Non lo promettiamo a prescindere. La prima visita serve a valutare se il tuo caso è
        trattabile e a dirti onestamente cosa possiamo fare — e cosa no — senza forzare un percorso
        che non ha senso.
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
        In presenza di trauma recente importante con dolore forte, febbre associata al mal di
        schiena, perdita di forza o sensibilità alle gambe che peggiora, difficoltà a controllare
        urina o feci, intorpidimento nella zona a sella, dolore notturno continuo con calo di peso o
        storia di tumore, oppure dolore che scende lungo la gamba con debolezza marcata e crescente,
        la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è
        appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'maldischiena',
  heroVideo,
  videoTitle: 'Video trattamento mal di schiena - Mobilitas Torino',
  images: {
    hero: '/trattamenti/anca_decubito-laterale_06_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/schiena_lombare-prono_10_orizzontale',
    bandClassName: 'object-[50%_75%]',
    final: '/trattamenti/schiena_lombare-supino_02_orizzontale',
    finalClassName: 'object-[45%_62%]',
  },
  hero: {
    place: 'Torino',
    name: 'Mal di schiena',
    title: { main: 'Soffri di mal di schiena e ogni gesto è un rischio?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>schiena</strong>,{' '}
        <strong>bacino</strong> e{' '}
        <strong>anche</strong> per ridurre l’impatto
        del mal di schiena su movimento, lavoro e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'Il mal di schiena non ti limita solo nei sintomi.', accent: 'Ti limita nei gesti di ogni giorno.' },
    intro: (
      <>
        Ignorarlo non lo fa sparire: lo normalizza. E più lo normalizzi, più ti toglie{' '}
        <strong>libertà di movimento</strong>,{' '}
        <strong>serenità al risveglio</strong> e{' '}
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
        <strong>I massaggi contano</strong>. Ma non sono
        l’unico livello del problema: se anche, bacino e respiro non sostengono, la{' '}
        <strong>schiena</strong> continua a compensare.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Schiena' }, { text: 'Bacino' }, { text: 'Anche', accent: true }, { text: 'Respiro' }],
      caption: 'Quando bacino e anche non sostengono, la schiena paga il conto.',
    },
    narrative: (
      <>
        Quello che spesso non viene detto è che la{' '}
        <strong>schiena</strong> paga il conto di
        quello che succede intorno. Quando le{' '}
        <strong>anche</strong> perdono mobilità, quando
        resti seduto otto ore, quando il{' '}
        <strong>respiro</strong> resta corto e alto, i
        muscoli della schiena lavorano il doppio per tenerti in piedi.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve “un altro massaggio”.', accent: 'A volte serve cambiare il contesto meccanico.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Valutazione iniziale, scioglimento di schiena e bacino, lavoro su anche e respiro,
          consigli pratici per casa e scrivania: un percorso chiaro per ridurre l’
          <strong>impatto</strong> del mal di schiena sulla tua
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
        <strong>scioltezza</strong>, più{' '}
        <strong>fiducia nel movimento</strong> e meno peso a
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
        Se anche una sola di queste risposte ti rappresenta, non restare fermo a spegnere solo
        l’allarme con pastiglie e massaggi.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a lavorare sul perché la schiena si contrae — oltre al sollievo di tre giorni.
      </>
    ),
  },
  seo: {
    dataPage: 'maldischiena',
    path: '/maldischiena',
    ogImage: '/trattamenti/og/schiena_lombare-supino_01_orizzontale.jpg',
    title: 'Osteopata Mal di Schiena Torino | Lombalgia, Bacino e Anche | Mobilitas',
    description:
      'Osteopata per mal di schiena a Torino (San Donato e Crocetta). Lavoriamo su schiena, bacino, anche e respiro, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata mal di schiena torino',
      'mal di schiena torino',
      'osteopatia lombalgia',
      'trattamento mal di schiena osteopata',
      'osteopata schiena torino',
      'lombalgia osteopata torino',
      'dolore lombare torino',
      'osteopata bacino torino',
      'blocco schiena osteopata',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per mal di schiena – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Mal di Schiena Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per mal di schiena – Mobilitas Torino',
    condition: {
      name: 'Mal di schiena',
      alternateName: [
        'Lombalgia',
        'Dolore lombare',
        'Dolore alla schiena',
        'Contrattura lombare',
        'Blocco della schiena',
      ],
      anatomy: 'Colonna vertebrale, bacino e anche',
    },
    therapy: {
      name: 'Trattamento osteopatico per mal di schiena',
      description:
        'Approccio osteopatico integrato su schiena, bacino, anche e respiro, in affiancamento al percorso medico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per mal di schiena',
      },
    },
    breadcrumbName: 'Mal di schiena',
    faq: [
      {
        name: 'Ho paura che mi scrocchiate la schiena: è obbligatorio?',
        text: 'No. Le manipolazioni con lo scrocchio non sono obbligatorie: esistono tecniche dolci altrettanto valide. Nulla viene fatto senza il tuo consenso, e se preferisci un approccio senza “click” lo rispettiamo.',
      },
      {
        name: 'La risonanza dice che ho protrusioni: c’è poco da fare?',
        text: 'Le stesse immagini si trovano in tantissime persone senza alcun dolore: l’immagine da sola non dice come stai. Su muscoli e movimento si può lavorare, in affiancamento al percorso medico — non al posto degli esami che hai già fatto.',
      },
      {
        name: 'Ho già fatto massaggi: dura tre giorni. Perché venire da voi?',
        text: 'Il massaggio lavora sul muscolo contratto; noi cerchiamo anche il motivo per cui si contrae — spesso anche, bacino o respiro. La prima visita serve proprio a capire se c’è qualcosa su cui intervenire oltre al sollievo breve.',
      },
      {
        name: 'Funzionerà per me?',
        text: 'Non lo promettiamo a prescindere. La prima visita serve a valutare se il tuo caso è trattabile e a dirti onestamente cosa possiamo fare — e cosa no — senza forzare un percorso che non ha senso.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'In presenza di trauma recente importante con dolore forte, febbre associata al mal di schiena, perdita di forza o sensibilità alle gambe che peggiora, difficoltà a controllare urina o feci, intorpidimento nella zona a sella, dolore notturno continuo con calo di peso o storia di tumore, oppure dolore che scende lungo la gamba con debolezza marcata e crescente, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function MalDiSchiena() {
  return <PrimaVisitaLanding page={PAGE} />
}
