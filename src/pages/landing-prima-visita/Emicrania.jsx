import {
  Activity,
  Move,
  Droplets,
  Sun,
  Sparkles,
  Clock,
  AlarmClock,
  BatteryLow,
  Zap,
  PersonStanding,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'
import { prefetchHeroVideo } from '../../components/condition-landing/heroVideo'

// Landing "Emicrania": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('EMICRANIA_VSL')

const HERO_BENEFITS = [
  <>
    Riprenditi i <strong>giorni</strong> che oggi cancelli dal calendario
  </>,
  <>
    Poter <strong>programmare</strong> qualcosa senza tenere una via di fuga
  </>,
  <>
    Non chiuderti più al <strong>buio</strong> mentre i tuoi figli giocano di là
  </>,
]

const PAIN_POINTS = [
  {
    icon: Activity,
    title: 'Dolore pulsante, spesso da un lato',
    body: 'Un dolore che batte al ritmo del battito, in genere su metà testa, tempia o zona oculare.',
  },
  {
    icon: Move,
    title: 'Peggiora con il movimento',
    body: 'Salire le scale, chinarsi o anche solo camminare intensifica il dolore.',
  },
  {
    icon: Droplets,
    title: 'Nausea e a volte vomito',
    body: 'Lo stomaco si chiude e nei casi peggiori si arriva a vomitare.',
  },
  {
    icon: Sun,
    title: 'Fastidio intenso a luce e rumore',
    body: 'Fotofobia e fonofobia che ti costringono a cercare buio e silenzio.',
  },
  {
    icon: Sparkles,
    title: 'Aura visiva prima dell’attacco',
    body: 'In una parte dei casi: luci, zig-zag, macchie o campo visivo ridotto nei minuti precedenti.',
  },
  {
    icon: Clock,
    title: 'Durata da qualche ora a giorni',
    body: 'Un attacco non trattato può durare da 4 a 72 ore.',
  },
  {
    icon: AlarmClock,
    title: 'Fase premonitoria',
    body: 'Sbadigli, irritabilità, voglia di dolci, stanchezza o rigidità al collo nelle ore precedenti.',
  },
  {
    icon: BatteryLow,
    title: 'Stanchezza profonda dopo l’attacco',
    body: 'La cosiddetta fase post-attacco: svuotamento, testa annebbiata e spossatezza per un giorno intero.',
  },
  {
    icon: Zap,
    title: 'Scatenanti riconoscibili',
    body: 'Ciclo mestruale, sonno irregolare, digiuno, alcol, cambi di tempo, stress o rilascio dopo lo stress.',
  },
  {
    icon: PersonStanding,
    title: 'Tensione a collo e spalle associata',
    body: 'Rigidità cervicale e contrattura del trapezio spesso presenti prima o durante l’attacco.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Il terreno è neurologico',
    b: 'L’emicrania è un cervello più sensibile del normale agli stimoli: questo è il terreno, e non si cancella.',
  },
  {
    k: '02',
    t: 'La legna sul fuoco',
    b: 'Gli attacchi partono più facilmente quando il sistema è già sotto pressione: collo rigido, mandibola serrata, sonno rotto, respiro corto.',
  },
  {
    k: '03',
    t: 'Alzare la soglia',
    b: 'Su quella legna si può lavorare con le mani, per alzare la soglia oltre la quale l’attacco parte.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/collo_presa-cervicale-supino_26_orizzontale',
    imageClassName: 'object-[12%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    title: 'Antidolorifici comuni',
    body: 'Spesso insufficienti sull’emicrania vera, e con l’uso frequente possono peggiorare la situazione.',
  },
  {
    image: '/trattamenti/atm_mandibola-con-guanto_03_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento della mandibola (ATM) di una paziente',
    title: 'Farmaci specifici prescritti dallo specialista',
    body: 'Sumatriptan, rizatriptan, zolmitriptan e almotriptan agiscono sull’attacco quando è già partito. FANS ad alto dosaggio e antiemetici completano il quadro — ma non riducono il motivo per cui parte.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico del collo di un paziente supino',
    title: 'Buio e silenzio',
    body: 'L’unica strategia che ti resta durante l’attacco. Non è una cura: è resistere.',
  },
  {
    image: '/trattamenti/collo_cervicale-e-spalle-supino_04_orizzontale',
    imageClassName: 'object-[0%_50%]',
    alt: 'Osteopata che tratta collo e spalle di una paziente supina',
    title: 'Visita neurologica, TAC e risonanza',
    body: 'Risonanza, TAC, angio-risonanza e visita oculistica restano riferimenti medici fondamentali. Quando sono normali, ti resta un nome e nessuna spiegazione.',
  },
  {
    image: '/trattamenti/atm_presa-mandibolare-esterna_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Presa esterna sulla mandibola di una paziente per l’ATM',
    title: 'Diario alimentare ed eliminazione di cibi',
    body: 'Può individuare qualche scatenante, ma raramente basta e spesso restringe la vita senza risolvere.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_31_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico del collo di un paziente supino',
    title: 'Terapie di profilassi',
    body: 'Propranololo, topiramato, amitriptilina e flunarizina riducono la frequenza in una parte dei casi. Regolarizzare sonno e ritmi aiuta, ma con tensione cronica gli attacchi arrivano lo stesso. Integratori, fisioterapia cervicale e nuove terapie iniettive toccano pezzi del quadro — raramente la catena intera.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Far guardare finalmente il tuo <strong>collo</strong>, oltre agli esami del
    cervello
  </>,
  <>
    Ridurre il bisogno di <strong>farmaci</strong> sempre più forti
  </>,
  <>
    Lavorare sui tuoi <strong>scatenanti reali</strong>: sonno, tensione,
    mandibola, postura
  </>,
  <>
    Affiancare il tuo <strong>neurologo</strong>, non sostituirlo
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
    body: 'Colloquio e valutazione iniziale sui tuoi attacchi, i tuoi segnali d’allarme e i tuoi fattori scatenanti.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo scioglimento di collo e nuca, lavoro su mandibola e masticazione, sblocco dolce delle prime vertebre e lavoro su respiro e sistema di allerta.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo un piano tra un attacco e l’altro: il lavoro si fa nei periodi liberi, non durante la crisi.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'neurologo',
    question: (
      <>
        Il <strong>neurologo</strong> mi segue già: ha senso venire da voi?
      </>
    ),
    answer: (
      <>
        Perfetto, e continua con lui: l’emicrania resta una condizione neurologica e il neurologo è
        il riferimento clinico. Noi non sostituiamo esami o terapia: lavoriamo in{' '}
        <em>affiancamento</em> su collo, mandibola e tensioni — la parte che spesso non entra nel
        piano medico. Le due cose si sommano.
      </>
    ),
  },
  {
    id: 'mani',
    question: (
      <>
        L’<strong>emicrania</strong> è neurologica: cosa c’entrano le <em>mani</em>?
      </>
    ),
    answer: (
      <>
        Il terreno è neurologico, ed è giusto che ci pensi lo specialista. Ma i fattori che accendono
        l’attacco — collo rigido, mandibola serrata, respiro corto — sono spesso fisici. Su quella
        «legna sul fuoco» si lavora con le mani, in parallelo al percorso neurologico, non al posto
        suo.
      </>
    ),
  },
  {
    id: 'tutto',
    question: (
      <>
        Ho già provato <strong>farmaci</strong>, diari e integratori: cosa può cambiare?
      </>
    ),
    answer: (
      <>
        Farmaci, diari alimentari, integratori, profilassi: quasi tutto guarda dentro la testa o negli
        scatenanti esterni. Collo e mandibola quasi mai. Se quella catena non è stata valutata, è il
        pezzo che spesso manca — ed è su quello che lavoriamo noi.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che gli <strong>attacchi</strong> spariscono del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. L’obiettivo onesto è lavorare sui fattori fisici per alzare
        la soglia oltre la quale l’attacco parte: meno frequenza, meno intensità, meno giorni persi.
        Quanto si può migliorare nel tuo caso si capisce solo valutandoti — nessuna promessa facile,
        solo chiarezza.
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
        In presenza di mal di testa improvviso e violentissimo mai provato prima (pronto soccorso
        subito), aura che dura più di un’ora o disturbi di vista, parola o forza che non passano,
        emicrania che cambia completamente carattere o frequenza, prima emicrania comparsa dopo i 50
        anni, oppure mal di testa con febbre alta e collo rigido, la priorità è la valutazione medica
        tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'emicrania',
  heroVideo,
  videoTitle: 'Video trattamento emicrania - Mobilitas Torino',
  images: {
    hero: '/trattamenti/collo_presa-cervicale-supino_18_orizzontale',
    heroClassName: 'object-[50%_62%]',
    band: '/trattamenti/collo_presa-cervicale-supino_17_orizzontale',
    bandClassName: 'object-[32%_70%]',
    final: '/trattamenti/atm_mandibola-con-guanto_01_orizzontale',
    finalClassName: 'object-[35%_70%]',
  },
  hero: {
    place: 'Torino',
    name: 'Emicrania',
    title: { main: 'Soffri di emicrania e ti dicono che è solo mal di testa?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>collo</strong>,{' '}
        <strong>mandibola</strong> e{' '}
        <strong>tensioni fisiche</strong> per ridurre l’impatto
        dell’emicrania su giornate, programmi e vita familiare.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'L’emicrania non è solo mal di testa.', accent: 'Ti cancella giornate intere.' },
    intro: (
      <>
        Ignorarla non la fa sparire: la normalizza. E più la normalizzi, più ti toglie{' '}
        <strong>giornate</strong>,{' '}
        <strong>programmi</strong> e{' '}
        <strong>presenza</strong> con chi ami.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Il neurologo conta</strong>.{' '}
        <strong>I farmaci contano</strong>. Ma non sono
        l’unico livello del problema:{' '}
        <strong>collo, mandibola e tensioni</strong> possono
        mantenere attivi gli attacchi anche quando la testa è già stata guardata.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Collo' }, { text: 'Nuca' }, { text: 'Mandibola', accent: true }, { text: 'Pressione' }],
      caption: 'Il neurologo guarda il cervello. Collo e mandibola restano fuori.',
    },
    narrative: (
      <>
        L’emicrania è un cervello più sensibile del normale agli stimoli: questo è il
        terreno, e non si cancella. Ma gli attacchi partono più facilmente quando{' '}
        <strong>collo</strong>,{' '}
        <strong>mandibola</strong> e respiro sono già
        sotto pressione: è qui che un lavoro manuale mirato può affiancare il percorso
        neurologico.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre basta una pastiglia.', accent: 'A volte serve lavorare sulla legna sul fuoco.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> dell’emicrania su attacchi,
          giornate e sulla vita quotidiana, con un percorso serio e misurabile.
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
        <strong>giornate</strong>, più{' '}
        <strong>programmi</strong> e meno rinunce
        quotidiane. Inizia con un consulto telefonico o la prima visita.
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
        e iniziamo a lavorare su collo, mandibola e tensioni — la parte che finora nessuno ha
        affrontato.
      </>
    ),
  },
  seo: {
    dataPage: 'emicrania',
    path: '/emicrania',
    ogImage: '/trattamenti/og/collo_presa-cervicale-supino_26_orizzontale.jpg',
    title: 'Osteopata Emicrania Torino | Collo, Mandibola e Cefalea | Mobilitas',
    description:
      'Osteopata per emicrania a Torino (San Donato e Crocetta). Lavoriamo su collo, mandibola e tensioni fisiche, in affiancamento al neurologo. Prima visita 49€.',
    keywords: [
      'osteopata emicrania torino',
      'emicrania torino',
      'osteopatia emicrania',
      'trattamento emicrania osteopata',
      'cefalea osteopata torino',
      'mal di testa cronico torino',
      'aura emicrania trattamento',
      'cervicalgia emicrania osteopata',
      'mandibola emicrania osteopata',
      'profilassi emicrania osteopata',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per emicrania – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Emicrania Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per emicrania – Mobilitas Torino',
    condition: {
      name: 'Emicrania',
      alternateName: [
        'Cefalea emicranica',
        'Emicrania con aura',
        'Emicrania senza aura',
        'Mal di testa cronico',
      ],
      anatomy: 'Sistema nervoso centrale, collo e mandibola',
    },
    therapy: {
      name: 'Trattamento osteopatico per emicrania',
      description:
        'Approccio osteopatico integrato su collo, mandibola, respirazione e tensioni fisiche, in affiancamento al percorso neurologico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per emicrania',
      },
    },
    breadcrumbName: 'Emicrania',
    faq: [
      {
        name: 'Il neurologo mi segue già: ha senso venire da voi?',
        text: "Perfetto, e continua con lui: l'emicrania resta una condizione neurologica e il neurologo è il riferimento clinico. Noi non sostituiamo esami o terapia: lavoriamo in affiancamento su collo, mandibola e tensioni — la parte che spesso non entra nel piano medico. Le due cose si sommano.",
      },
      {
        name: "L'emicrania è neurologica: cosa c'entrano le mani?",
        text: "Il terreno è neurologico, ed è giusto che ci pensi lo specialista. Ma i fattori che accendono l'attacco — collo rigido, mandibola serrata, respiro corto — sono spesso fisici. Su quella «legna sul fuoco» si lavora con le mani, in parallelo al percorso neurologico, non al posto suo.",
      },
      {
        name: 'Ho già provato farmaci, diari e integratori: cosa può cambiare?',
        text: 'Farmaci, diari alimentari, integratori, profilassi: quasi tutto guarda dentro la testa o negli scatenanti esterni. Collo e mandibola quasi mai. Se quella catena non è stata valutata, è il pezzo che spesso manca — ed è su quello che lavoriamo noi.',
      },
      {
        name: 'Mi promettete che gli attacchi spariscono del tutto?',
        text: "No, e diffidiamo di chi lo fa. L'obiettivo onesto è lavorare sui fattori fisici per alzare la soglia oltre la quale l'attacco parte: meno frequenza, meno intensità, meno giorni persi. Quanto si può migliorare nel tuo caso si capisce solo valutandoti — nessuna promessa facile, solo chiarezza.",
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: "In presenza di mal di testa improvviso e violentissimo mai provato prima (pronto soccorso subito), aura che dura più di un'ora o disturbi di vista, parola o forza che non passano, emicrania che cambia completamente carattere o frequenza, prima emicrania comparsa dopo i 50 anni, oppure mal di testa con febbre alta e collo rigido, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.",
      },
    ],
  },
}

export default function Emicrania() {
  return <PrimaVisitaLanding page={PAGE} />
}
