import {
  MapPin,
  Sunrise,
  Timer,
  Users,
  Utensils,
  FileSearch,
  Brain,
  MessageCircleOff,
  RefreshCw,
  Car,
} from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'

// Landing "Colon irritabile": solo contenuti e dati. Struttura, grafica e logica (video, popup di
// prenotazione, recensioni, SEO) stanno in components/condition-landing.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('COLON_IRRITABILE_VSL')

const HERO_BENEFITS = [
  <>
    Smettere di cercare i <strong>bagni</strong> ovunque tu vada
  </>,
  <>
    Uscire senza aspettare il <strong>verdetto</strong> della mattina
  </>,
  <>
    Tornare a dire <strong>sì</strong>: gite, viaggi, cene, matrimoni
  </>,
]

const PAIN_POINTS = [
  {
    icon: MapPin,
    title: 'Sai dove sono i bagni ovunque tu vada',
    body: 'È diventato un riflesso. Entri in un posto nuovo e la prima cosa che fai è capire dov’è il bagno. Non ci pensi nemmeno più, lo fai e basta.',
  },
  {
    icon: Sunrise,
    title: 'Non esci di casa finché non sei «a posto»',
    body: 'La mattina hai un rituale: aspetti. Aspetti di andare in bagno, di capire come sarà oggi, prima di decidere se puoi uscire. La tua giornata inizia solo dopo quel verdetto.',
  },
  {
    icon: Timer,
    title: 'L’urgenza che ti terrorizza',
    body: 'Quella morsa improvvisa in cui hai pochi minuti. Sei in macchina in tangenziale, in riunione, in fila. E l’unica cosa a cui pensi è: ce la faccio?',
  },
  {
    icon: Users,
    title: 'Hai smesso di dire sì',
    body: 'La gita, il viaggio in pullman, la cena, il matrimonio. Trovi una scusa. Non dici mai il vero motivo, e ogni volta ti sembra di rinunciare a un altro pezzo di vita.',
  },
  {
    icon: Utensils,
    title: 'Il cibo è diventato un nemico',
    body: 'Mangiare era un piacere. Adesso è un calcolo: cosa mi farà male, cosa posso rischiare, quanto tempo ho dopo. Hai tolto tutto — glutine, lattosio, FODMAP — e non è cambiato niente.',
  },
  {
    icon: RefreshCw,
    title: 'Non c’è una regola',
    body: 'Mangi una cosa e stai bene. La stessa identica cosa la settimana dopo ti distrugge. Non riesci a trovare il filo, e quello ti fa impazzire più del dolore.',
  },
  {
    icon: FileSearch,
    title: 'Gli esami dicono tutti che stai bene',
    body: 'Colonscopia, analisi, ecografie. Tutto negativo. Dovresti essere sollevata, e invece sei lì con lo stesso identico problema e nessuna risposta.',
  },
  {
    icon: Brain,
    title: '«È stress, sei una persona ansiosa»',
    body: 'La spiegazione che arriva quando non ne hanno altre. Come se te lo stessi creando da sola, come se bastasse rilassarsi.',
  },
  {
    icon: MessageCircleOff,
    title: 'Non lo dici a nessuno',
    body: 'Non è una cosa di cui si parla. Non puoi dire al capo perché sei uscita dalla riunione. Ci convivi da anni e nessuno intorno a te lo sa davvero.',
  },
  {
    icon: Car,
    title: 'Ci hai fatto l’abitudine e questo è il peggio',
    body: 'Hai smesso di cercare risposte. Hai organizzato tutta la tua vita intorno a questa cosa e la chiami «normale». Ma non è normale: è solo che ti ci sei arresa.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'L’intestino ha un secondo cervello',
    b: 'Milioni di nervi parlano in diretta con la testa, nei due sensi: non è immaginazione, è un dialogo nervoso reale.',
  },
  {
    k: '02',
    t: 'Quando il sistema è in allerta, l’intestino lo sente',
    b: 'Stress, tensione, respiro corto: l’intestino accelera, si blocca o si gonfia subito.',
  },
  {
    k: '03',
    t: 'La colonscopia è perfetta e tu no',
    b: 'Il problema è nel comando e nello spazio, non nella struttura: diaframma e pancia tesi comprimono l’intestino.',
  },
]

const BENEFITS = [
  {
    image: '/reflusso/reflusso1.JPG',
    imageClassName: 'object-[58%_55%]',
    alt: 'Trattamento osteopatico sull’addome per il colon irritabile',
    title: 'Eliminazione di cibi',
    body: 'Glutine, lattosio, FODMAP: possono ridurre i sintomi, ma restringono la vita e raramente risolvono.',
  },
  {
    image: '/reflusso/reflusso2.JPG',
    imageClassName: 'object-[52%_58%]',
    alt: 'Valutazione osteopatica di pancia e diaframma per il colon irritabile',
    title: 'Fermenti lattici e probiotici',
    body: 'Aiutano una parte delle persone, ma di rado cambiano il quadro da soli.',
  },
  {
    image: '/reflusso/reflusso3.JPG',
    imageClassName: 'object-[42%_52%]',
    alt: 'Lavoro osteopatico in affiancamento agli esami digestivi',
    title: 'Colonscopia ed esami',
    body: 'Fondamentali per escludere malattie: ecografia, breath test, calprotectina fecale. E quando sono negativi, resti con lo stesso identico problema.',
  },
  {
    image: '/reflusso/reflusso4.JPG',
    imageClassName: 'object-[45%_52%]',
    alt: 'Approccio osteopatico oltre i farmaci sintomatici per il colon irritabile',
    title: 'Farmaci sintomatici',
    body: 'Antispastici (otilonio, mebeverina, trimebutina, pinaverio), simeticone, loperamide o macrogol, antidepressivi a basso dosaggio: gestiscono l’episodio, non il funzionamento.',
  },
  {
    image: '/reflusso/reflusso5.JPG',
    imageClassName: 'object-[48%_55%]',
    alt: 'Percorso osteopatico oltre integratori e fibre',
    title: 'Integratori e fibre',
    body: 'Possono aiutare, ma su un intestino iperreattivo a volte peggiorano il gonfiore. Test per intolleranze: molto richiesti, poco dirimenti.',
  },
  {
    image: '/reflusso/reflusso6.JPG',
    imageClassName: 'object-[50%_55%]',
    alt: 'Approccio osteopatico in affiancamento al supporto psicologico',
    title: '«È stress» e «ci devi convivere»',
    body: 'Lo stress incide davvero, ma attraverso il sistema neurovegetativo: qualcosa di concreto, non un’accusa. Supporto psicologico e tecniche di rilassamento aiutano, ma spesso arrivano come se il problema fosse solo mentale.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Smettere di cercare i <strong>bagni</strong> ovunque tu vada
  </>,
  <>
    Riprenderti il <strong>piacere del cibo</strong>, senza calcoli e
    rinunce
  </>,
  <>
    Capire perché non c’è una <strong>regola</strong>: oggi va, domani no
  </>,
  <>
    Smettere di chiamarlo <strong>normale</strong>: non ti ci sei arresa, ti
    ci hai organizzato la vita
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
    body: 'Colloquio e valutazione iniziale — i tuoi sintomi, i tuoi ritmi, cosa è già stato escluso.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo sul diaframma e sul respiro, tecniche dolci sull’addome, riequilibrio del sistema di comando e lavoro su bacino e schiena bassa.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo consigli su respiro e momenti critici — strumenti pratici per l’urgenza e le giornate difficili, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'cosa-valutate',
    question: (
      <>
        Su cosa lavorate di <strong>concreto</strong>, se gli esami sono a posto?
      </>
    ),
    answer: (
      <>
        Sugli aspetti che la colonscopia non mostra: diaframma, mobilità addominale, bacino e
        dialogo testa-pancia. Sono pezzi meccanici e nervosi che possono mantenere urgenza e
        gonfiore anche quando la struttura dell’intestino è sana — in <em>affiancamento</em> al
        medico, non al posto degli esami che hai già fatto.
      </>
    ),
  },
  {
    id: 'ansia',
    question: (
      <>
        Mi hanno detto che è <strong>ansia</strong>: come se me lo stessi inventando?
      </>
    ),
    answer: (
      <>
        Il collegamento testa-pancia esiste davvero, ma passa da nervi e muscoli concreti. Non è
        colpa tua: è un sistema da riequilibrare, non un’accusa. Lo stress incide attraverso il
        sistema neurovegetativo — qualcosa di concreto su cui si può lavorare, in parallelo a ciò
        che stai già facendo col medico.
      </>
    ),
  },
  {
    id: 'colonscopia',
    question: (
      <>
        La <strong>colonscopia</strong> è perfetta: perché ho ancora tutti i sintomi?
      </>
    ),
    answer: (
      <>
        Ottimo: esclude le malattie. Il funzionamento però non si vede in colonscopia — è il campo
        su cui lavoriamo. Ecografia, breath test e calprotectina fecale restano riferimenti medici
        fondamentali; noi interveniamo sulla parte funzionale che resta dopo.
      </>
    ),
  },
  {
    id: 'diete',
    question: (
      <>
        Ho tolto <strong>glutine, lattosio e FODMAP</strong>: i sintomi vanno e vengono lo stesso.
        Perché?
      </>
    ),
    answer: (
      <>
        Segno che la variabile non è solo il cibo: è il sistema che lo gestisce. Diaframma, addome,
        bacino e comando nervoso — su quello nessuno ha ancora lavorato in modo mirato. Ridurre i
        trigger alimentari resta utile; noi completiamo con la parte che la dieta non affronta.
      </>
    ),
  },
  {
    id: 'farmaci',
    question: (
      <>
        Prendo già <strong>antispastici</strong> o loperamide: ha senso fare anche un percorso da
        voi?
      </>
    ),
    answer: (
      <>
        Spesso sì, se i sintomi persistono nonostante farmaci e attenzione alimentare. Antispastici,
        loperamide e macrogol gestiscono l’episodio — non il funzionamento. Noi valutiamo se esiste
        una componente funzionale su cui intervenire. Qualsiasi modifica terapeutica resta sempre in
        capo al medico prescrittore.
      </>
    ),
  },
  {
    id: 'convivere',
    question: (
      <>
        È <strong>colon irritabile</strong>, mi hanno detto di conviverci: c’è altro da fare?
      </>
    ),
    answer: (
      <>
        Il nome descrive, non spiega. «Ci devi convivere» chiude la ricerca — la domanda utile è
        perché il tuo intestino lavora così. Noi valutiamo diaframma, meccanica e sistema che
        comanda l’intestino. L’obiettivo onesto è ridurre l’impatto su urgenza, pasti e libertà:
        quanto si può migliorare nel tuo caso si capisce solo valutandoti, senza promesse facili.
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
        In presenza di sangue nelle feci, calo di peso involontario, febbre insieme ai disturbi
        intestinali, diarrea che ti sveglia di notte, esordio dei sintomi dopo i 50 anni o storia
        familiare di malattie intestinali importanti, la priorità è la valutazione medica tempestiva.
        Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'colon-irritabile',
  heroVideo,
  videoTitle: 'Video trattamento colon irritabile - Mobilitas Torino',
  images: {
    hero: '/cervicalgia/cerv11.JPG',
    band: '/cervicalgia/cerv10.JPG',
    final: '/cervicalgia/cerv13.JPG',
  },
  hero: {
    place: 'Torino',
    name: 'Colon irritabile',
    title: { main: 'Soffri di colon irritabile e ti dicono che devi convivere?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>diaframma</strong>,{' '}
        <strong>addome</strong> e{' '}
        <strong>sistema neurovegetativo</strong> per
        alleggerire quanto il colon irritabile pesa su urgenza, pasti e vita sociale.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'Il colon irritabile non ti limita solo nei sintomi.', accent: 'Ti limita nelle scelte quotidiane.' },
    intro: (
      <>
        Ignorarlo non lo fa sparire: lo normalizza. E più lo normalizzi, più ti toglie{' '}
        <strong>libertà</strong>,{' '}
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
        l’unico livello del problema: il{' '}
        <strong>sistema che comanda l’intestino</strong> può
        mantenere attivi i sintomi anche quando sei attentissima.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Intestino' }, { text: 'Addome' }, { text: 'Diaframma', accent: true }, { text: 'Nervi' }],
      caption: 'L’intestino dialoga con la testa: quando il sistema è in allerta, lo sente subito.',
    },
    narrative: (
      <>
        L’intestino ha un suo «secondo cervello»: milioni di nervi che parlano in diretta con
        la testa, nei due sensi. Quando il sistema è in allerta — stress, tensione, respiro
        corto — l’intestino lo sente subito: accelera, si blocca, si gonfia. Non è
        immaginazione: è un dialogo nervoso reale. E se diaframma e pancia sono tesi,
        l’intestino lavora anche compresso.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve «tagliare ancora cibi».', accent: 'A volte serve riequilibrare comando e spazio.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sul sistema che comanda l’intestino.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> del colon irritabile sulla
          tua vita quotidiana, con un percorso serio e misurabile.
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
        <strong>libertà</strong>, più{' '}
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
        e iniziamo a costruire un percorso concreto per ridurre l’impatto del colon irritabile
        sulla tua vita quotidiana.
      </>
    ),
  },
  seo: {
    dataPage: 'colon-irritabile',
    path: '/colon-irritabile',
    ogImage: '/reflusso/reflusso1.JPG',
    title: 'Osteopata Colon Irritabile Torino | IBS e Diaframma | Mobilitas',
    description:
      'Osteopata per colon irritabile a Torino (San Donato e Crocetta). Lavoriamo su diaframma, addome e sistema neurovegetativo, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata colon irritabile torino',
      'colon irritabile torino',
      'IBS torino',
      'osteopatia colon irritabile',
      'trattamento colon irritabile osteopata',
      'sindrome dell intestino irritabile torino',
      'disturbo intestino osteopata',
      'osteopata diaframma torino',
      'urgenza intestinale osteopata',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per colon irritabile – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Colon Irritabile Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per colon irritabile – Mobilitas Torino',
    condition: {
      name: 'Colon irritabile',
      alternateName: [
        'Sindrome dell’intestino irritabile',
        'IBS',
        'Irritable bowel syndrome',
        'Disturbo funzionale intestinale',
      ],
      anatomy: 'Intestino',
    },
    therapy: {
      name: 'Trattamento osteopatico per colon irritabile',
      description:
        'Approccio osteopatico integrato su diaframma, addome, bacino e sistema neurovegetativo, in affiancamento al percorso medico gastroenterologico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per colon irritabile',
      },
    },
    breadcrumbName: 'Colon irritabile',
    faq: [
      {
        name: 'Su cosa lavorate di concreto, se gli esami sono a posto?',
        text: "Sugli aspetti che la colonscopia non mostra: diaframma, mobilità addominale, bacino e dialogo testa-pancia. L'osteopatia lavora in affiancamento al medico su pezzi meccanici e nervosi che possono mantenere i sintomi anche quando la struttura dell'intestino è sana.",
      },
      {
        name: 'Mi hanno detto che è ansia: come se me lo stessi inventando?',
        text: "Il collegamento testa-pancia esiste davvero, ma passa da nervi e muscoli concreti. Lo stress incide attraverso il sistema neurovegetativo — qualcosa di concreto su cui si può lavorare, non un'accusa.",
      },
      {
        name: 'La colonscopia è perfetta: perché ho ancora tutti i sintomi?',
        text: "Ottimo: esclude le malattie. Il funzionamento però non si vede in colonscopia — è il campo su cui lavora l'osteopatia, in parallelo al percorso medico.",
      },
      {
        name: 'Ho tolto glutine, lattosio e FODMAP: i sintomi vanno e vengono lo stesso. Perché?',
        text: "Segno che la variabile non è solo il cibo: è il sistema che lo gestisce. L'osteopatia completa con la parte che la dieta non affronta.",
      },
      {
        name: 'Prendo già antispastici o loperamide: ha senso fare anche un percorso osteopatico?',
        text: "Spesso sì, se i sintomi persistono nonostante farmaci e attenzione alimentare. I farmaci gestiscono l'episodio — non il funzionamento. Qualsiasi modifica terapeutica resta in capo al medico prescrittore.",
      },
      {
        name: "È colon irritabile, mi hanno detto di conviverci: c'è altro da fare?",
        text: "Il nome descrive, non spiega. La domanda utile è perché l'intestino lavora così: diaframma, meccanica e sistema nervoso sono il campo su cui si può intervenire.",
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'In presenza di sangue nelle feci, calo di peso involontario, febbre con disturbi intestinali, diarrea notturna, esordio dopo i 50 anni o storia familiare di malattie intestinali importanti, la priorità è la valutazione medica tempestiva.',
      },
    ],
  },
}

export default function ColonIrritabile() {
  return <ConditionLanding page={PAGE} />
}
