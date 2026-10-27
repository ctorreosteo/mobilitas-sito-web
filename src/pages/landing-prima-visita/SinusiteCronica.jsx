import {
  Wind,
  ScanFace,
  ArrowDownToLine,
  Droplets,
  Utensils,
  Moon,
  Sunrise,
  Repeat,
  Ear,
  CloudFog,
} from 'lucide-react'
import PrimaVisitaLanding from '../../components/landing/PrimaVisitaLanding'

// Landing "Sinusite cronica": solo contenuti e dati. Struttura, grafica e logica (stile cervicalgia: video,
// popup di prenotazione, recensioni, SEO) stanno in components/landing/PrimaVisitaLanding.

const HERO_BENEFITS = [
  <>
    Respirare dal <strong>naso</strong> la notte, senza svegliarti a bocca secca
  </>,
  <>
    Capire perché dopo l’ennesimo <strong>antibiotico</strong> torna tutto come prima
  </>,
  <>
    Farti guardare <strong>viso</strong>, <strong>collo</strong> e{' '}
    <strong>respiro</strong>, in affiancamento all’otorino
  </>,
]

const PAIN_POINTS = [
  {
    icon: Wind,
    title: 'Naso chiuso che non si libera mai',
    body: 'Prima una narice, poi l’altra, spesso tutte e due: soffi, ma l’aria continua a non passare.',
  },
  {
    icon: ScanFace,
    title: 'Pressione su fronte e zigomi',
    body: 'Un peso sopra gli occhi e sulle guance, a volte fino ai denti dell’arcata superiore.',
  },
  {
    icon: ArrowDownToLine,
    title: 'Mal di testa quando ti chini',
    body: 'Allacciarti le scarpe o raccogliere qualcosa da terra e la faccia sembra “riempirsi”.',
  },
  {
    icon: Droplets,
    title: 'Muco che scende in gola',
    body: 'Lo senti colare dietro il naso, ti obbliga a schiarirti la voce di continuo, soprattutto al mattino.',
  },
  {
    icon: Utensils,
    title: 'Olfatto e gusto spenti',
    body: 'Il caffè non profuma più come prima e il cibo sa di poco.',
  },
  {
    icon: Moon,
    title: 'Notti a bocca aperta',
    body: 'Respiri con la bocca, russi di più e ti svegli con la gola secca e la sensazione di non aver riposato.',
  },
  {
    icon: Sunrise,
    title: 'Mattine da fazzoletto',
    body: 'Appena alzato devi soffiarti il naso più volte prima di sentirti una persona normale.',
  },
  {
    icon: Repeat,
    title: 'Un raffreddore che non finisce mai',
    body: 'Ogni inverno, ogni cambio di stagione, ogni aria condizionata: riparte sempre lo stesso giro.',
  },
  {
    icon: Ear,
    title: 'Orecchie ovattate',
    body: 'Una sensazione di orecchio tappato che va e viene, insieme alla congestione.',
  },
  {
    icon: CloudFog,
    title: 'Testa pesante tutto il giorno',
    body: 'Stanchezza, poca lucidità e concentrazione che cala già a metà mattina.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'I seni drenano da porte piccolissime',
    b: 'Fronte e zigomi si svuotano nel naso attraverso aperture di pochi millimetri: basta una mucosa gonfia perché il muco ristagni e la pressione salga.',
  },
  {
    k: '02',
    t: 'Respiro corto, collo e viso rigidi',
    b: 'Se respiri a bocca aperta e col petto, il diaframma lavora poco e collo e mandibola restano in tensione: un contesto che non aiuta il naso a liberarsi.',
  },
  {
    k: '03',
    t: 'La terapia spegne, il contesto resta',
    b: 'Antibiotici e cortisonici fanno il loro lavoro sulla mucosa. Ma se respiro e mobilità restano gli stessi, al primo raffreddore il giro riparte.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/atm_intraorale_01_orizzontale',
    imageClassName: 'object-[55%_70%]',
    alt: 'Trattamento osteopatico intraorale di palato e mascella con guanto',
    title: 'Cicli di antibiotici',
    body: 'Servono quando c’è un’infezione batterica in corso, e lì vanno fatti. Nella sinusite che dura da mesi, però, spesso il problema di fondo è il ristagno: finito il ciclo, il terreno è lo stesso.',
  },
  {
    image: '/trattamenti/collo_cervicale-e-spalle-supino_03_orizzontale',
    imageClassName: 'object-[0%_50%]',
    alt: 'Osteopata che tratta collo e spalle di una paziente supina',
    title: 'Spray decongestionanti',
    body: 'Liberano il naso in pochi minuti. Usati per più di qualche giorno, però, possono dare l’effetto rimbalzo: il naso si richiude e serve un altro spruzzo. Come ridurli lo decide il medico o il farmacista.',
  },
  {
    image: '/trattamenti/pancia_addome-supino_13_orizzontale',
    imageClassName: 'object-[35%_50%]',
    alt: 'Trattamento osteopatico sull’addome e sul diaframma di una paziente',
    title: 'Cortisonici nasali',
    body: 'Sono tra le terapie di riferimento per sgonfiare la mucosa e vanno usati con costanza, come indicato dall’otorino. Agiscono sull’infiammazione, non sul modo in cui respiri e muovi collo e viso.',
  },
  {
    image: '/trattamenti/pancia_addome-dettaglio-mani_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Mani dell’osteopata sull’addome durante il trattamento',
    title: 'Lavaggi nasali e aerosol',
    body: 'Utili e spesso consigliati: puliscono e idratano. Ma se il drenaggio resta lento, il muco si riforma e il lavaggio diventa un rito quotidiano senza fine.',
  },
  {
    image: '/trattamenti/atm_presa-mandibolare-esterna_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Presa esterna sul viso e sulla mandibola di una paziente',
    title: 'Antistaminici e test allergologici',
    body: 'Se c’è una componente allergica aiutano davvero. Ma non tutte le sinusiti croniche sono allergiche, e quando i test sono negativi resti con il naso chiuso e nessuna spiegazione in più.',
  },
  {
    image: '/trattamenti/schiena_dorsale-alta-prono_06_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta la parte alta della schiena e la gabbia toracica di un paziente',
    title: 'Otorino, TAC e chirurgia',
    body: 'La visita otorino e la TAC restano il riferimento: mostrano mucosa ispessita, deviazioni del setto, polipi. La chirurgia endoscopica è una possibilità per casi selezionati. Nessuno di questi passaggi, però, guarda respiro e mobilità.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Respirare dal <strong>naso</strong> la notte e svegliarti meno stanco
  </>,
  <>
    Capire perché i cicli di <strong>antibiotici</strong> non hanno chiuso il
    giro
  </>,
  <>
    Sentire meno <strong>pressione</strong> su fronte e zigomi quando ti chini
  </>,
  <>
    Lavorare su <strong>viso</strong>, collo e diaframma, senza toccare le
    terapie dell’otorino
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
    body: 'Ricostruiamo da quanto dura, quante volte si riaccende, gli esami dell’otorino, le allergie e le terapie in corso, che non tocchiamo.',
  },
  {
    title: 'Valutazione di viso, collo e respiro',
    body: 'Osserviamo come respiri, quanto si muovono diaframma e gabbia toracica, la mobilità di collo, mandibola e viso.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo con tecniche dolci su viso e zigomi, collo, diaframma e torace, per favorire mobilità e drenaggio dei tessuti.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo esercizi di respirazione nasale e piccole abitudini quotidiane, da integrare con le indicazioni del tuo otorino.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'antibiotici',
    question: (
      <>
        Ho fatto tre cicli di <strong>antibiotici</strong> in un anno: perché torna sempre?
      </>
    ),
    answer: (
      <>
        Perché l’antibiotico cura l’infezione, non il terreno su cui si ripresenta. Se il drenaggio
        dei seni resta lento e il naso è sempre congestionato, al primo raffreddore il giro riparte.
        Noi lavoriamo su quel terreno — viso, collo, respiro e diaframma — in{' '}
        <em>affiancamento</em> al medico, non al posto delle sue terapie.
      </>
    ),
  },
  {
    id: 'spray',
    question: (
      <>
        Uso lo <strong>spray decongestionante</strong> tutti i giorni: devo smettere?
      </>
    ),
    answer: (
      <>
        Non decidiamo noi come cambiare le tue terapie. È vero che i decongestionanti usati a lungo
        possono dare un effetto rimbalzo, per questo è importante parlarne con il medico o il
        farmacista e farti guidare da loro. Noi, nel frattempo, lavoriamo sulla parte che lo spray
        non tocca: respiro, mobilità e tensioni di collo e viso.
      </>
    ),
  },
  {
    id: 'otorino',
    question: (
      <>
        Mi segue già un <strong>otorino</strong>: ha senso venire anche da voi?
      </>
    ),
    answer: (
      <>
        Sì, ed è il modo giusto di farlo. L’otorino resta il riferimento per diagnosi, esami e
        terapie; noi non sostituiamo nulla e non ti chiediamo di sospendere niente. Il nostro lavoro
        si aggiunge al suo, su un livello diverso: come respiri e come si muovono i tessuti intorno
        al naso.
      </>
    ),
  },
  {
    id: 'collo-diaframma',
    question: (
      <>
        Cosa c’entrano <strong>collo</strong> e <strong>diaframma</strong> con il naso?
      </>
    ),
    answer: (
      <>
        Più di quanto sembri. Chi ha il naso chiuso da mesi tende a respirare con la bocca e con la
        parte alta del petto: il diaframma lavora poco, collo e mandibola si irrigidiscono. Ridare
        mobilità a questi distretti non “apre” i seni da solo, ma può rendere più facile tornare a
        respirare dal naso e alleggerire la sensazione di pressione.
      </>
    ),
  },
  {
    id: 'promessa',
    question: (
      <>
        Mi promettete che la <strong>sinusite</strong> passa del tutto?
      </>
    ),
    answer: (
      <>
        No, e diffidiamo di chi lo fa. La sinusite cronica ha spesso più cause — mucosa, allergie,
        anatomia del naso — e alcune sono di competenza esclusiva dell’otorino. L’obiettivo onesto è
        ridurne l’impatto: respirare meglio, sentire meno pressione, dormire di più. Quanto si può
        migliorare nel tuo caso si capisce solo valutandoti — nessuna promessa facile, solo
        chiarezza.
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
        In presenza di febbre alta, gonfiore o arrossamento attorno all’occhio, vista doppia o
        calo della vista, forte mal di testa con rigidità del collo o confusione, intorpidimento
        del viso, oppure sintomi da un solo lato con sangue dal naso o croste che non passano, la
        priorità è la valutazione medica urgente. Noi interveniamo solo quando il quadro è
        appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'sinusite-cronica',
  heroVideo: null, // Video non ancora girato: in apertura c'è la foto images.hero. Quando c'è, prefetchHeroVideo('SINUSITE_CRONICA_VSL') a livello di modulo
  videoTitle: 'Video trattamento sinusite cronica - Mobilitas Torino',
  images: {
    hero: '/trattamenti/atm_mandibola-con-guanto_03_orizzontale',
    heroClassName: 'object-[50%_50%]',
    band: '/trattamenti/collo_allungamento-cervicale-supino_02_orizzontale',
    bandClassName: 'object-[50%_50%]',
    final: '/trattamenti/collo_presa-cervicale-supino_30_orizzontale',
    finalClassName: 'object-[20%_50%]',
  },
  hero: {
    place: 'Torino',
    name: 'Sinusite cronica',
    title: { main: 'Hai il naso chiuso da mesi e la sinusite torna a ogni raffreddore?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>viso</strong>,{' '}
        <strong>collo</strong> e{' '}
        <strong>respirazione</strong> per alleggerire
        quanto la sinusite pesa su sonno, lavoro e giornate, in affiancamento all’otorino.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La sinusite cronica non ti chiude solo il naso.', accent: 'Ti toglie sonno, lucidità e il gusto delle cose.' },
    intro: (
      <>
        Abituarti non la fa sparire: la rende normale. E più diventa normale, più ti toglie{' '}
        <strong>notti di sonno vero</strong>,{' '}
        <strong>energia</strong> durante il giorno e
        persino il piacere di un pranzo.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Le terapie dell’otorino contano</strong>.{' '}
        <strong>I lavaggi contano</strong>. Ma non sono
        l’unico livello del problema: il{' '}
        <strong>drenaggio dei seni</strong> dipende anche da come
        respiri e da come si muovono viso, collo e diaframma.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Naso', accent: true }, { text: 'Diaframma' }, { text: 'Collo' }, { text: 'Viso' }],
      caption: 'Il naso è dove senti la pressione, ma il respiro passa da tutto il corpo.',
    },
    narrative: (
      <>
        Fronte e zigomi si svuotano nel naso attraverso aperture minuscole. Quando la mucosa è
        gonfia da mesi, il muco ristagna; e se nel frattempo respiri a bocca aperta, con il{' '}
        <strong>diaframma</strong> fermo e collo e mandibola
        contratti, il corpo smette di aiutare quel drenaggio invece di sostenerlo.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre bastano spray e antibiotici.', accent: 'A volte serve guardare respiro, collo e viso.' },
    sub: {
      title: { main: 'Ecco perché è utile lavorare', accent: 'su tutto ciò che fa respirare il naso.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> della sinusite sulla tua
          vita quotidiana, con un percorso serio e affiancato all’otorino.
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
        <strong>respiro</strong>, più{' '}
        <strong>notti tranquille</strong> e meno fazzoletti
        nella borsa. Inizia con un consulto telefonico o la prima visita.
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
        Se anche una sola di queste risposte ti rappresenta, non restare fermo tra uno spray e
        l’altro.{' '}
        <strong>
          Prenota un consulto o la prima visita
        </strong>{' '}
        e iniziamo a costruire un percorso concreto per ridurre l’impatto della sinusite sulla tua
        vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'sinusite-cronica',
    path: '/sinusite-cronica',
    ogImage: '/trattamenti/og/atm_mandibola-con-guanto_01_orizzontale.jpg',
    title: 'Osteopata Sinusite Cronica Torino | Naso, Viso e Respirazione | Mobilitas',
    description:
      'Osteopata per sinusite cronica a Torino (San Donato e Crocetta). Lavoriamo su viso, collo, respirazione e diaframma per favorire il drenaggio, in affiancamento all’otorino. Prima visita 49€.',
    keywords: [
      'osteopata sinusite torino',
      'sinusite cronica torino',
      'osteopatia sinusite',
      'trattamento sinusite osteopata',
      'naso chiuso cronico',
      'pressione seni paranasali',
      'drenaggio seni paranasali',
      'sinusite mal di testa',
      'rinosinusite cronica',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per sinusite cronica – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Sinusite Cronica Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per sinusite cronica – Mobilitas Torino',
    condition: {
      name: 'Sinusite cronica',
      alternateName: [
        'Rinosinusite cronica',
        'Sinusite ricorrente',
        'Congestione nasale cronica',
        'Dolore ai seni paranasali',
      ],
      anatomy: 'Seni paranasali, cavità nasali, viso, collo e diaframma',
    },
    therapy: {
      name: 'Trattamento osteopatico per sinusite cronica',
      description:
        'Approccio osteopatico integrato su mobilità di viso e collo, respirazione e diaframma per favorire il drenaggio, in affiancamento al percorso otorinolaringoiatrico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per sinusite cronica',
      },
    },
    breadcrumbName: 'Sinusite cronica',
    faq: [
      {
        name: 'Ho fatto tre cicli di antibiotici in un anno: perché torna sempre?',
        text: "Perché l'antibiotico cura l'infezione, non il terreno su cui si ripresenta. Se il drenaggio dei seni resta lento e il naso è sempre congestionato, al primo raffreddore il giro riparte. Noi lavoriamo su viso, collo, respiro e diaframma, in affiancamento al medico, non al posto delle sue terapie.",
      },
      {
        name: 'Uso lo spray decongestionante tutti i giorni: devo smettere?',
        text: "Non decidiamo noi come cambiare le tue terapie. I decongestionanti usati a lungo possono dare un effetto rimbalzo, per questo è importante parlarne con il medico o il farmacista. Noi lavoriamo sulla parte che lo spray non tocca: respiro, mobilità e tensioni di collo e viso.",
      },
      {
        name: 'Mi segue già un otorino: ha senso venire anche da voi?',
        text: "Sì. L'otorino resta il riferimento per diagnosi, esami e terapie; noi non sostituiamo nulla e non ti chiediamo di sospendere niente. Il nostro lavoro si aggiunge al suo, su come respiri e come si muovono i tessuti intorno al naso.",
      },
      {
        name: 'Cosa c’entrano collo e diaframma con il naso?',
        text: 'Chi ha il naso chiuso da mesi tende a respirare con la bocca e con la parte alta del petto: il diaframma lavora poco, collo e mandibola si irrigidiscono. Ridare mobilità a questi distretti non apre i seni da solo, ma può rendere più facile tornare a respirare dal naso e alleggerire la pressione.',
      },
      {
        name: 'Mi promettete che la sinusite passa del tutto?',
        text: "No, e diffidiamo di chi lo fa. La sinusite cronica ha spesso più cause, alcune di competenza esclusiva dell'otorino. L'obiettivo onesto è ridurne l'impatto: respirare meglio, sentire meno pressione, dormire di più — nessuna promessa facile, solo chiarezza.",
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: "In presenza di febbre alta, gonfiore o arrossamento attorno all'occhio, vista doppia o calo della vista, forte mal di testa con rigidità del collo o confusione, intorpidimento del viso, oppure sintomi da un solo lato con sangue dal naso o croste che non passano, la priorità è la valutazione medica urgente.",
      },
    ],
  },
}

export default function SinusiteCronica() {
  return <PrimaVisitaLanding page={PAGE} />
}
