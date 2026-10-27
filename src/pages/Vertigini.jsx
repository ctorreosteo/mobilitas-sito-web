import {
  RotateCcw,
  Footprints,
  CloudFog,
  Zap,
  Droplets,
  Eye,
  CircleDot,
  Ear,
  ArrowUpFromLine,
  Monitor,
} from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'

// Landing "Vertigini": solo contenuti e dati. Struttura, grafica e logica (video, popup di
// prenotazione, recensioni, SEO) stanno in components/condition-landing.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('VERTIGINI_VSL')

const HERO_BENEFITS = [
  <>
    Smetti di vivere in <strong>allerta</strong>, aspettando il prossimo{' '}
    <strong>attacco</strong>
  </>,
  <>
    Torna a <strong>guidare</strong>, salire le{' '}
    <strong>scale</strong> e uscire senza chiedere di essere accompagnato
  </>,
  <>
    Torna a <strong>scegliere</strong> tu dove andare, non la{' '}
    <strong>paura</strong>
  </>,
]

const PAIN_POINTS = [
  {
    icon: RotateCcw,
    title: 'La stanza che gira appena ti giri nel letto',
    body: 'Ti volti sul fianco, guardi in alto per prendere qualcosa dallo scaffale, e il mondo parte in rotazione. Bastano pochi secondi, ma sono terrificanti.',
  },
  {
    icon: Footprints,
    title: 'La sensazione di camminare sulla gommapiuma',
    body: 'Non è che gira: è che il terreno non è stabile. Cammini come su un materasso, come sul ponte di una nave. Instabilità costante, sorda, che non passa mai del tutto.',
  },
  {
    icon: CloudFog,
    title: 'La testa “ovattata” / annebbiata',
    body: 'Quella sensazione di avere la testa piena di cotone, di essere dentro una bolla, staccato dal mondo. Non è dolore, non è vertigine vera: è un non-esserci che nessuno riesce a descrivere bene al medico.',
  },
  {
    icon: Zap,
    title: 'Il senso di sbandamento improvviso',
    body: 'Cammini normale e per un attimo ti tira da un lato, come se qualcuno ti spingesse. Un secondo, poi passa. Ma quel secondo ti resta addosso tutto il giorno.',
  },
  {
    icon: Droplets,
    title: 'La nausea con sudore freddo',
    body: 'Lo stomaco che si rivolta, la salivazione che aumenta, il sudore gelido, il pallore. Il corpo intero che collassa insieme alla testa.',
  },
  {
    icon: Eye,
    title: 'La visione che si muove / gli oggetti che ballano',
    body: 'Guardi un punto fermo e sembra oscillare. Leggi e le righe si spostano. Lo scaffale del supermercato che “vibra”.',
  },
  {
    icon: CircleDot,
    title: 'La testa pesante e il collo rigido',
    body: 'Sensazione di casco, tensione alla base del cranio, collo bloccato. E ti chiedi se sia la cervicale a farti girare la testa o il contrario.',
  },
  {
    icon: Ear,
    title: 'Il fischio o l’orecchio “pieno”',
    body: 'Ronzio, orecchio ovattato, senso di pressione o tappo. Il sospetto che orecchio e vertigine c’entrino qualcosa tra loro.',
  },
  {
    icon: ArrowUpFromLine,
    title: 'Il “vuoto alla testa” quando ti alzi',
    body: 'Ti alzi dalla sedia o dal letto e per qualche secondo tutto si annebbia, devi appoggiarti. Ogni cambio di posizione è un piccolo azzardo.',
  },
  {
    icon: Monitor,
    title: 'La vista che si affatica / gli occhi che non tengono',
    body: 'Fissare lo schermo, guidare al tramonto, i luoghi affollati e pieni di stimoli visivi ti scatenano il malessere. Il supermercato è il posto peggiore del mondo.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Tre sistemi devono parlarsi',
    b: 'L’equilibrio nasce da orecchie, occhi e segnali del collo: se uno dei tre manda informazioni confuse, il cervello perde stabilità.',
  },
  {
    k: '02',
    t: 'Il collo e la mandibola confondono i segnali',
    b: 'Quando il collo è rigido, la mandibola resta serrata o la postura è sbilanciata, i messaggi sullo spazio arrivano distorti.',
  },
  {
    k: '03',
    t: 'Nasce l’instabilità che senti',
    b: 'Se le informazioni non tornano tra loro, il risultato può essere proprio quella sensazione di sbandamento, bolla o pavimento che manca.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/collo_presa-cervicale-supino_18_orizzontale',
    imageClassName: 'object-[18%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    title: 'Farmaci utili in crisi, ma non sulla causa',
    body: 'Antivertiginosi e antiemetici gestiscono l’attacco acuto. In parallelo si può lavorare su tensioni e segnali confusi che i farmaci non correggono.',
  },
  {
    image: '/trattamenti/collo_cervicale-e-spalle-supino_03_orizzontale',
    imageClassName: 'object-[0%_50%]',
    alt: 'Osteopata che tratta collo e spalle di una paziente supina',
    title: 'ORL e esami vestibolari negativi: e adesso?',
    body: 'Escludere l’orecchio interno è fondamentale. Quando gli esami sono a posto e l’instabilità resta, il collo è spesso il posto giusto dove guardare.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_09_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico del collo di un paziente supino',
    title: 'Manovre liberatorie: efficaci solo in certi casi',
    body: 'Quando la causa è specifica e riconosciuta funzionano. Se il tuo quadro è diverso, servono un altro razionale e un altro lavoro.',
  },
  {
    image: '/trattamenti/atm_mandibola-con-guanto_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento della mandibola (ATM) di una paziente',
    title: '“Sarà la cervicale”: un’intuizione da tradurre in pratica',
    body: 'Spesso è un’ipotesi giusta. Quasi nessuno, però, la traduce in un lavoro concreto su collo, mandibola e base del cranio.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_25_orizzontale',
    imageClassName: 'object-[12%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    title: 'Le vertigini non sono solo un sintomo: restringono la vita',
    body: 'Guida, folla, scale, lavoro, riposo: l’obiettivo è togliere la paura permanente e riallargare le scelte quotidiane.',
  },
  {
    image: '/trattamenti/collo_presa-cervicale-supino_22_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico del collo di un paziente supino',
    title: 'Approccio integrato: medico + osteopatico',
    body: 'Esami ORL, neurologici e vestibolari restano il riferimento clinico. Noi partiamo da dove finiscono: sulla componente meccanica di collo e postura.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Sciogliamo le <strong>tensioni di collo e mandibola</strong> che
    possono confondere l’equilibrio
  </>,
  <>
    Torni ad alzarti e a guidare con più <strong>sicurezza</strong>, senza
    dover calcolare ogni movimento
  </>,
  <>
    Torni al <strong>supermercato</strong> e nei{' '}
    <strong>posti affollati</strong>, senza far decidere la paura
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
    body: 'Analizziamo collo, mandibola, postura e dinamica corporea per individuare fattori che possono alimentare le vertigini.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su sguardo, posture e movimento, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'orecchio-a-posto',
    question: (
      <>
        Se l’<strong>orecchio</strong> è a posto, cosa c’entra l’<em>osteopatia</em>?
      </>
    ),
    answer: (
      <>
        Le vertigini sono una condizione clinica e ORL e neurologo restano il riferimento. L’osteopatia
        non sostituisce esami o terapia: lavora in <em>affiancamento</em> su collo, mandibola e
        postura, fattori che possono influenzare i segnali dell’equilibrio — proprio quando
        l’orecchio è a posto e l’instabilità resta.
      </>
    ),
  },
  {
    id: 'ansia',
    question: (
      <>
        Mi hanno detto che è <strong>ansia</strong>: e adesso?
      </>
    ),
    answer: (
      <>
        La paura c’è, ed è comprensibile: ma spesso è la <em>conseguenza</em> degli attacchi, non
        la causa. Meritano entrambe una risposta, senza liquidarti con un’etichetta vaga.
      </>
    ),
  },
  {
    id: 'paura-toccare-collo',
    question: (
      <>
        Se mi toccate il collo, rischio un attacco di <strong>vertigini</strong>?
      </>
    ),
    answer: (
      <>
        È una paura legittima. Si lavora con tecniche <strong>dolci e graduali</strong>, al tuo
        ritmo: niente di brusco. Se qualcosa non ti convince, ci fermiamo subito.
      </>
    ),
  },
  {
    id: 'caso-trattabile',
    question: (
      <>
        Il mio caso è trattabile?
      </>
    ),
    answer: (
      <>
        È la prima cosa da capire, ed è lo scopo della chiamata e della prima visita: se non lo è,
        te lo diciamo. Nessuna promessa facile, solo chiarezza.
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
        In presenza di vertigini con parola impastata, visione doppia, perdita di forza o
        incoordinazione, oppure se non riesci a stare in piedi o a camminare, con mal di testa
        improvviso e violento, dolore al petto, battito irregolare o svenimento, la priorità è
        chiamare subito i soccorsi o andare al pronto soccorso. Un calo improvviso dell’udito da
        un solo orecchio richiede invece una valutazione urgente da otorino entro pochi giorni. Noi
        interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'vertigini',
  heroVideo,
  videoTitle: 'Video trattamento vertigini - Mobilitas Torino',
  images: {
    hero: '/trattamenti/collo_presa-cervicale-supino_19_orizzontale',
    heroClassName: 'object-[50%_62%]',
    band: '/trattamenti/collo_presa-cervicale-supino_17_orizzontale',
    bandClassName: 'object-[32%_70%]',
    final: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
    finalClassName: 'object-[10%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Vertigini',
    title: { main: 'Soffri di vertigini e vivi sempre in allerta?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>collo</strong>,{' '}
        <strong>mandibola</strong> e{' '}
        <strong>postura</strong> per rimettere ordine nei
        segnali dell’equilibrio e ridurre la paura del prossimo attacco.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La vertigine non ti limita solo nei sintomi.', accent: 'Ti limita nelle scelte quotidiane.' },
    intro: (
      <>
        Ignorarla non la fa sparire: la normalizza. E più la normalizzi, più ti toglie{' '}
        <strong>sicurezza nel movimento</strong>,{' '}
        <strong>serenità alla guida</strong> e{' '}
        <strong>spontaneità</strong> fuori casa.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>L’orecchio conta</strong>.{' '}
        <strong>I farmaci contano</strong>. Ma non sono
        l’unico livello del problema: la{' '}
        <strong>componente meccanica</strong> del collo può
        mantenere attivi i sintomi anche quando gli esami sono a posto.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Occhi', accent: true }, { text: 'Collo' }, { text: 'Orecchie' }, { text: 'Equilibrio' }],
      caption: 'In equilibrio, orecchie, occhi e collo devono parlarsi tra loro.',
    },
    narrative: (
      <>
        L’equilibrio non dipende solo dall’orecchio. Il tuo corpo capisce dove si trova
        nello spazio grazie a tre cose che devono parlarsi tra loro: le{' '}
        <strong>orecchie</strong>, gli{' '}
        <strong>occhi</strong> e i segnali che arrivano
        dal <strong>collo</strong>. Quando quei
        segnali arrivano confusi, può nascere proprio l’instabilità che senti.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve un altro esame.', accent: 'A volte serve rimettere ordine nei segnali del collo.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> della vertigine sulla tua
          vita quotidiana, con un percorso serio e misurabile.
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
        <strong>autonomia</strong>, più{' '}
        <strong>sicurezza nel movimento</strong> e meno paura
        del prossimo attacco. Inizia con un consulto telefonico o la prima visita.
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
        e iniziamo a costruire un percorso concreto per ridurre l’impatto delle vertigini sulla
        tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'vertigini',
    path: '/vertigini',
    ogImage: '/trattamenti/og/collo_presa-cervicale-supino_18_orizzontale.jpg',
    title: 'Osteopata Vertigini Torino | Instabilità, Collo ed Equilibrio | Mobilitas',
    description:
      'Osteopata per vertigini e instabilità a Torino (San Donato e Crocetta). Lavoriamo su collo, mandibola e postura, in affiancamento al percorso ORL e neurologico. Prima visita 49€.',
    keywords: [
      'osteopata vertigini torino',
      'vertigini torino',
      'osteopatia vertigini',
      'trattamento vertigini osteopata',
      'instabilità equilibrio osteopata',
      'vertigini cervicali torino',
      'capogiri osteopata torino',
      'vertigine postura collo',
      'osteopata orecchio a posto',
      'riabilitazione equilibrio torino',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per vertigini e instabilità – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Vertigini Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per vertigini – Mobilitas Torino',
    condition: {
      name: 'Vertigini e instabilità dell’equilibrio',
      alternateName: [
        'Vertigine',
        'Capogiri',
        'Instabilità posturale',
        'Vertigine cervicale',
        'Disequilibrio',
        'Sensazione di sbandamento',
      ],
      anatomy: 'Collo, sistema vestibolare e postura',
    },
    therapy: {
      name: 'Trattamento osteopatico per vertigini e instabilità',
      description:
        'Approccio osteopatico integrato su collo, mandibola, base del cranio e postura, in affiancamento al percorso ORL e neurologico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per vertigini',
      },
    },
    breadcrumbName: 'Vertigini',
    faq: [
      {
        name: "Se l'orecchio è a posto, cosa c'entra l'osteopatia?",
        text: "Le vertigini sono una condizione clinica e ORL e neurologo restano il riferimento. L'osteopatia non sostituisce esami o terapia: lavora in affiancamento su collo, mandibola e postura, fattori che possono influenzare i segnali dell'equilibrio — proprio quando l'orecchio è a posto e l'instabilità resta.",
      },
      {
        name: 'Mi hanno detto che è ansia: e adesso?',
        text: 'La paura c’è, ed è comprensibile: ma spesso è la conseguenza degli attacchi, non la causa. Meritano entrambe una risposta, senza liquidarti con un’etichetta vaga.',
      },
      {
        name: 'Se mi toccate il collo, rischio un attacco di vertigini?',
        text: 'È una paura legittima. Si lavora con tecniche dolci e graduali, al tuo ritmo: niente di brusco. Se qualcosa non ti convince, ci fermiamo subito.',
      },
      {
        name: 'Il mio caso è trattabile?',
        text: 'È la prima cosa da capire, ed è lo scopo della chiamata e della prima visita: se non lo è, te lo diciamo. Nessuna promessa facile, solo chiarezza.',
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'In presenza di vertigini con parola impastata, visione doppia, perdita di forza o incoordinazione, oppure se non riesci a stare in piedi o a camminare, con mal di testa improvviso e violento, dolore al petto, battito irregolare o svenimento, la priorità è chiamare subito i soccorsi o andare al pronto soccorso. Un calo improvviso dell’udito da un solo orecchio richiede invece una valutazione urgente da otorino entro pochi giorni. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function Vertigini() {
  return <ConditionLanding page={PAGE} />
}
