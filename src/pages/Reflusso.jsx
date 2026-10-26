import {
  Moon,
  Utensils,
  Pill,
  Users,
  Coffee,
  Mic,
} from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'

// Landing "Reflusso": solo contenuti e dati. Struttura, grafica e logica (video, popup di
// prenotazione, recensioni, SEO) stanno in components/condition-landing.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('REFLUSSO_VSL')

const HERO_BENEFITS = [
  <>
    Respira più liberamente e senti meno <strong>tensione</strong> in{' '}
    <strong>petto</strong> e addome
  </>,
  <>
    Riduci <strong>bruciore notturno</strong>, risvegli, {' '}
    <strong>fastidio</strong> in gola al mattino e raceudine
  </>,
  <>
    Torna a vivere i <strong>pasti</strong> con più serenità e meno{' '}
    <strong>rinunce</strong>
  </>,
]

const PAIN_POINTS = [
  {
    icon: Pill,
    title: 'La giornata scandita dalla pastiglia',
    body: 'La prendi per funzionare, non per stare davvero bene. Ti protegge per qualche ora, poi il reflusso torna a dettare regole.',
  },
  {
    icon: Coffee,
    title: 'Hai tolto quasi tutto, ma non è cambiato quasi niente',
    body: 'Caffè, vino, pomodoro, fritti: eliminati. Eppure il bruciore resta. Quando succede, la causa non è solo nel piatto.',
  },
  {
    icon: Moon,
    title: 'La notte è diventata una strategia di sopravvivenza',
    body: 'Ti corichi e l’acido risale. Due cuscini, sonno leggero, risvegli con gola irritata e bocca amara.',
  },
  {
    icon: Utensils,
    title: 'Ogni pasto è una trattativa con la paura',
    body: 'Non mangi con appetito: mangi facendo calcoli. Orario, porzioni, rischio notturno.',
  },
  {
    icon: Users,
    title: 'Le rinunce sociali che nessuno vede',
    body: 'Eviti cene, brindisi, spontaneità. Fuori sembri sereno, dentro stai gestendo sintomi e imbarazzo.',
  },
  {
    icon: Mic,
    title: 'Sintomi “strani” che restano senza nome',
    body: 'Tosse secca, nodo in gola, voce roca, pressione retrosternale: segnali che spesso non vengono collegati in un quadro unico.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Il diaframma perde elasticità',
    b: 'Stress, postura rigida e respiro superficiale possono alterare il lavoro del muscolo respiratorio.',
  },
  {
    k: '02',
    t: 'La valvola è meno supportata',
    b: 'Quando il diaframma lavora male, la pressione addominale può favorire la risalita del contenuto gastrico.',
  },
  {
    k: '03',
    t: 'I sintomi si riaccendono',
    b: 'Per questo puoi mangiare leggero e avere comunque bruciore: non dipende solo dagli alimenti.',
  },
]

const BENEFITS = [
  {
    image: '/reflusso/reflusso1.JPG',
    imageClassName: 'object-[58%_55%]',
    alt: 'Trattamento osteopatico sull’addome per il reflusso',
    title: 'Quando ti sdrai, il reflusso prende il controllo',
    body: 'Se i sintomi peggiorano appena ti corichi, si valuta la componente meccanica che può influenzare pressione e risalita notturna.',
  },
  {
    image: '/reflusso/reflusso2.JPG',
    imageClassName: 'object-[52%_58%]',
    alt: 'Osteopata che lavora sulla pancia e sulla dinamica digestiva',
    title: 'Dieta impeccabile, risultato insufficiente',
    body: 'Quando i trigger alimentari sono già ridotti ma i sintomi persistono, ha senso approfondire diaframma, torace e dinamica digestiva.',
  },
  {
    image: '/reflusso/reflusso3.JPG',
    imageClassName: 'object-[42%_52%]',
    alt: 'Manovra osteopatica sull’addome in studio a Torino',
    title: 'Farmaco utile, ma non sempre risolutivo',
    body: 'La terapia prescritta dal medico resta centrale. In parallelo, si può lavorare su ciò che i farmaci non affrontano direttamente: la parte funzionale e meccanica.',
  },
  {
    image: '/reflusso/reflusso4.JPG',
    imageClassName: 'object-[45%_52%]',
    alt: 'Trattamento osteopatico manuale su diaframma e zona gastrica',
    title: 'Il diaframma è un pezzo chiave del problema',
    body: 'Il diaframma contribuisce alla continenza della valvola gastroesofagea. Se è rigido o poco coordinato, i sintomi possono amplificarsi.',
  },
  {
    image: '/reflusso/reflusso5.JPG',
    imageClassName: 'object-[48%_55%]',
    alt: 'Osteopata che tratta la pancia durante la visita',
    title: 'Il reflusso non colpisce solo lo stomaco',
    body: 'Impatta sonno, relazioni, lavoro e sicurezza a tavola. Un percorso efficace deve considerare anche questo impatto quotidiano.',
  },
  {
    image: '/reflusso/reflusso6.JPG',
    imageClassName: 'object-[50%_55%]',
    alt: 'Lavoro osteopatico sull’addome in affiancamento al percorso medico',
    title: 'Approccio integrato: medico + osteopatico',
    body: 'Gastroscopia, pH-impedenzometria e manometria restano riferimenti medici. Noi lavoriamo in affiancamento sulla componente posturale, respiratoria e meccanica.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Lavoriamo sulla <strong>componente meccanica</strong> che dieta e pastiglia
    non affrontano
  </>,
  <>
    Torni a coricarti con più <strong>tranquillità</strong>, senza
    strategizzare ogni notte
  </>,
  <>
    Riprendi <strong>serenità a tavola</strong>, con meno calcoli e meno
    rinunce
  </>,
  <>
    Segui un percorso <strong>chiaro e misurabile</strong> per stare meglio
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
    body: 'Analizziamo respirazione, diaframma, torace e dinamica corporea per individuare fattori che possono alimentare il reflusso.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su respiro, posture e gestione dei pasti, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'osteopata-stomaco',
    question: (
      <>
        Cosa c’entra l’<strong>osteopatia</strong> con il <em>reflusso</em>?
      </>
    ),
    answer: (
      <>
        Il reflusso è una condizione medica e il gastroenterologo resta il riferimento clinico.
        L’osteopatia non sostituisce esami o terapia farmacologica: lavora in{' '}
        <em>affiancamento</em> su diaframma, torace, postura e respirazione, fattori che possono
        influenzare la dinamica meccanica della risalita.
      </>
    ),
  },
  {
    id: 'pastiglia-anni',
    question: (
      <>
        Prendo già i farmaci: ha senso fare anche un percorso da voi?
      </>
    ),
    answer: (
      <>
        Spesso sì, se i sintomi persistono nonostante terapia e attenzione alimentare. I farmaci
        riducono l’acidità e possono essere indispensabili; noi valutiamo se esiste una componente
        funzionale su cui intervenire. Qualsiasi modifica terapeutica resta sempre in capo al medico
        prescrittore.
      </>
    ),
  },
  {
    id: 'gastroscopia',
    question: (
      <>
        Se la <strong>gastroscopia</strong> è nella norma, perché ho ancora sintomi?
      </>
    ),
    answer: (
      <>
        Una gastroscopia negativa è una buona notizia: esclude molte criticità. Tuttavia non misura
        tutto il comportamento funzionale del sistema esofago-stomaco. In alcuni casi servono altri
        esami (come pH-impedenzometria o manometria) e un lavoro complementare sulla parte
        meccanica.
      </>
    ),
  },
  {
    id: 'dieta-tutto',
    question: (
      <>
        Ho già eliminato molti cibi, ma il reflusso resta. Che senso ha continuare?
      </>
    ),
    answer: (
      <>
        Ridurre trigger alimentari è utile, ma non sempre sufficiente. Se la dieta non basta, non
        significa che “non c’è nulla da fare”: può significare che bisogna integrare altri livelli
        di intervento, con un piano personalizzato e realistico.
      </>
    ),
  },
  {
    id: 'solo-stress',
    question: (
      <>
        È solo <strong>stress</strong> oppure no?
      </>
    ),
    answer: (
      <>
        Lo stress incide davvero su digestione e percezione dei sintomi, ma ridurre tutto a “ansia”
        è spesso semplicistico. Nel nostro approccio consideriamo insieme fattori emotivi, biomeccanici
        e clinici, senza negare nessuno di questi livelli.
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
        In presenza di difficoltà a deglutire, calo di peso involontario, sangue nel vomito o nelle
        feci, dolore toracico da sforzo, vomito persistente o comparsa recente dei sintomi dopo i 50
        anni, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro
        è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'reflusso',
  heroVideo,
  videoTitle: 'Video trattamento reflusso - Mobilitas Torino',
  images: {
    hero: '/cervicalgia/cerv11.JPG',
    band: '/cervicalgia/cerv10.JPG',
    final: '/cervicalgia/cerv13.JPG',
  },
  hero: {
    place: 'Torino',
    name: 'Reflusso',
    title: { main: 'Soffri di reflusso e ogni pasto è una rinuncia?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>diaframma</strong>,{' '}
        <strong>postura</strong> e{' '}
        <strong>zona gastrica</strong> per ridurre l’impatto
        del reflusso su sonno, pasti e vita sociale.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'Il reflusso non ti limita solo nei sintomi.', accent: 'Ti limita nelle scelte quotidiane.' },
    intro: (
      <>
        Ignorarlo non lo fa sparire: lo normalizza. E più lo normalizzi, più ti toglie{' '}
        <strong>sonno</strong>,{' '}
        <strong>serenità a tavola</strong> e{' '}
        <strong>spontaneità</strong> nella vita sociale.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Il cibo conta</strong>.{' '}
        <strong>I farmaci contano</strong>. Ma non sono
        l’unico livello del problema: la{' '}
        <strong>componente meccanica</strong> puo mantenere
        attivi i sintomi anche quando sei attentissimo.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Esofago' }, { text: 'Stomaco' }, { text: 'Diaframma', accent: true }, { text: 'Valvola' }],
      caption: 'In equilibrio, l’anello del diaframma tiene la valvola chiusa.',
    },
    narrative: (
      <>
        Tra stomaco ed esofago c’e una valvola. A sostenerla c’e anche il{' '}
        <strong>diaframma</strong>. Se questo sistema
        perde coordinazione, la risalita puo diventare piu probabile: e qui che un lavoro
        manuale mirato puo affiancare il percorso medico.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve “tagliare ancora cibi”.', accent: 'A volte serve cambiare il contesto meccanico.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> del reflusso sulla tua vita
          quotidiana, con un percorso serio e misurabile.
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
        <strong>sonno</strong>, più{' '}
        <strong>serenità a tavola</strong> e meno rinunce
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
        e iniziamo a costruire un percorso concreto per ridurre l’impatto del reflusso sulla
        tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'reflusso',
    path: '/reflusso',
    ogImage: '/reflusso/reflusso1.JPG',
    title: 'Osteopata Reflusso Torino | Reflusso Gastroesofageo e Diaframma | Mobilitas',
    description:
      'Osteopata per reflusso gastroesofageo a Torino (San Donato e Crocetta). Lavoriamo su diaframma, postura e meccanica, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata reflusso torino',
      'reflusso gastroesofageo torino',
      'osteopatia reflusso',
      'trattamento reflusso osteopata',
      'diaframma reflusso',
      'ernia iatale osteopata torino',
      'bruciore di stomaco osteopata',
      'pirosi gastrica torino',
      'osteopata stomaco torino',
      'reflusso notturno trattamento',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per reflusso gastroesofageo – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Reflusso Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per reflusso – Mobilitas Torino',
    condition: {
      name: 'Reflusso gastroesofageo',
      alternateName: [
        'Malattia da reflusso gastroesofageo',
        'MRGE',
        'GERD',
        'Pirosi',
        'Bruciore di stomaco',
        'Reflusso acido',
      ],
      anatomy: 'Esofago e stomaco',
    },
    therapy: {
      name: 'Trattamento osteopatico per reflusso gastroesofageo',
      description:
        'Approccio osteopatico integrato su diaframma, torace, postura e respirazione, in affiancamento al percorso medico gastroenterologico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per reflusso',
      },
    },
    breadcrumbName: 'Reflusso gastroesofageo',
    faq: [
      {
        name: "Cosa c'entra l'osteopatia con il reflusso?",
        text: "Il reflusso è una condizione medica e il gastroenterologo resta il riferimento clinico. L'osteopatia non sostituisce esami o terapia farmacologica: lavora in affiancamento su diaframma, torace, postura e respirazione, fattori che possono influenzare la dinamica meccanica della risalita.",
      },
      {
        name: 'Prendo già i farmaci: ha senso fare anche un percorso da voi?',
        text: "Spesso sì, se i sintomi persistono nonostante terapia e attenzione alimentare. I farmaci riducono l'acidità e possono essere indispensabili; noi valutiamo se esiste una componente funzionale su cui intervenire. Qualsiasi modifica terapeutica resta sempre in capo al medico prescrittore.",
      },
      {
        name: 'Se la gastroscopia è nella norma, perché ho ancora sintomi?',
        text: 'Una gastroscopia negativa è una buona notizia: esclude molte criticità. Tuttavia non misura tutto il comportamento funzionale del sistema esofago-stomaco. In alcuni casi servono altri esami e un lavoro complementare sulla parte meccanica.',
      },
      {
        name: 'Ho già eliminato molti cibi, ma il reflusso resta. Che senso ha continuare?',
        text: 'Ridurre trigger alimentari è utile, ma non sempre sufficiente. Se la dieta non basta, può significare che bisogna integrare altri livelli di intervento, con un piano personalizzato e realistico.',
      },
      {
        name: 'È solo stress oppure no?',
        text: 'Lo stress incide davvero su digestione e percezione dei sintomi, ma ridurre tutto a “ansia” è spesso semplicistico. Nel nostro approccio consideriamo insieme fattori emotivi, biomeccanici e clinici.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'In presenza di difficoltà a deglutire, calo di peso involontario, sangue nel vomito o nelle feci, dolore toracico da sforzo, vomito persistente o comparsa recente dei sintomi dopo i 50 anni, la priorità è la valutazione medica tempestiva.',
      },
    ],
  },
}

export default function Reflusso() {
  return <ConditionLanding page={PAGE} />
}
