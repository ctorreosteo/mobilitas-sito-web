import {
  Link2,
  Hand,
  Layers,
  PersonStanding,
  MoveHorizontal,
  ArrowUpFromLine,
  Wind,
  Moon,
  Shirt,
  CircleAlert,
} from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'

// Landing "Cicatrici seno": solo contenuti e dati. Struttura, grafica e logica (video, popup di
// prenotazione, recensioni, SEO) stanno in components/condition-landing.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('CICATRICI_SENO_VSL')

const HERO_BENEFITS = [
  <>
    Smetti di sentirti dire che <strong>l’hai voluto tu</strong>
  </>,
  <>
    Riduci la <strong>tensione</strong> del petto e la cicatrice che non{' '}
    <strong>scorre</strong>
  </>,
  <>
    Torna a <strong>respirare</strong> a fondo, con le{' '}
    <strong>spalle</strong> più aperte
  </>,
]

const PAIN_POINTS = [
  {
    icon: Link2,
    title: 'Senso di tensione o “corda” sul torace',
    body: 'Una sensazione di stretto davanti, come se il petto fosse fasciato.',
  },
  {
    icon: Hand,
    title: 'Zona addormentata intorno alla cicatrice',
    body: 'Sotto il seno, sotto l’ascella o intorno al capezzolo, un’area con sensibilità ridotta o assente.',
  },
  {
    icon: Layers,
    title: 'Cicatrice dura, che non scorre',
    body: 'Provi a muoverla con le dita e resta attaccata, come incollata sotto.',
  },
  {
    icon: PersonStanding,
    title: 'Dolore dorsale tra le scapole',
    body: 'Un dolore posteriore, spesso comparso dopo l’intervento, senza un motivo apparente.',
  },
  {
    icon: MoveHorizontal,
    title: 'Spalle chiuse in avanti',
    body: 'La postura si è modificata: le spalle sono più anteposte e il torace più chiuso.',
  },
  {
    icon: ArrowUpFromLine,
    title: 'Limitazione nell’alzare il braccio',
    body: 'Portare il braccio in alto o indietro tira, soprattutto se la cicatrice è ascellare.',
  },
  {
    icon: Wind,
    title: 'Respiro corto o “che si ferma a metà”',
    body: 'Difficoltà a fare un respiro profondo, sensazione di ampiezza ridotta del torace.',
  },
  {
    icon: Moon,
    title: 'Fastidio dormendo a pancia in giù',
    body: 'La posizione prona diventa scomoda o dolorosa.',
  },
  {
    icon: Shirt,
    title: 'Fastidio con reggiseno, cinture o zaini',
    body: 'Qualsiasi cosa che prema su quella zona dà fastidio più del normale.',
  },
  {
    icon: CircleAlert,
    title: 'Tensione al collo',
    body: 'I muscoli che collegano torace e collo si irrigidiscono e tirano verso l’alto.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Gli strati restano aderenti',
    b: 'Ogni intervento lascia cicatrici anche dove non le vedi: sotto la pelle, intorno alla protesi, negli strati che devono scorrere.',
  },
  {
    k: '02',
    t: 'Il tessuto tira e il torace si chiude',
    b: 'Quando quegli strati restano incollati, il braccio trova un limite, il respiro non scende più fino in fondo, le spalle si chiudono.',
  },
  {
    k: '03',
    t: 'Si lavora sullo scorrimento',
    b: 'Il risultato estetico può essere perfetto. Sul tessuto che tira — e non scorre — spesso nessuno ha ancora lavorato.',
  },
]

const BENEFITS = [
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.1.png',
    imageClassName: 'object-[58%_42%]',
    alt: 'Trattamento osteopatico delicato su cicatrici del seno e torace',
    title: 'Creme, oli e silicone: solo in superficie',
    body: 'Migliorano l’aspetto della cicatrice. Non sciolgono le aderenze in profondità né la tensione del torace.',
  },
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.8.JPG',
    imageClassName: 'object-[55%_52%]',
    alt: 'Valutazione osteopatica post-intervento al seno sulla schiena e torace',
    title: '“L’hai voluto tu”',
    body: 'La frase che ti blocca in gola tutto il resto. Non è un’obiezione medica: è un giudizio. Qui non c’è.',
  },
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.2.png',
    imageClassName: 'object-[40%_45%]',
    alt: 'Lavoro manuale su collo e tensioni collegate alle cicatrici del seno',
    title: 'Controlli dal chirurgo: tutto perfetto',
    body: 'Verificano risultato estetico e guarigione. E tu annuisci, perché esteticamente ha ragione — ma quello che senti addosso resta fuori.',
  },
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.5.JPG',
    imageClassName: 'object-[42%_48%]',
    alt: 'Trattamento su spalla e torace collegato alla cicatrice',
    title: 'Fisioterapia spalla e mobilità del braccio',
    body: 'Utili, però se il tessuto davanti non scorre l’allungamento trova sempre lo stesso blocco. La causa resta sul torace.',
  },
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.6.JPG',
    imageClassName: 'object-[58%_48%]',
    alt: 'Lavoro posturale e sulle tensioni dopo mastoplastica',
    title: 'Ginnastica posturale e “dai tempo”',
    body: 'Lavora sulle spalle chiuse, che sono la conseguenza. Il tempo lo hai dato: da solo non scioglie un tessuto aderente.',
  },
  {
    image: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.7.JPG',
    imageClassName: 'object-[48%_52%]',
    alt: 'Valutazione manuale dello scorrimento tessutale del torace e bacino',
    title: 'Esami e protesi: un pezzo del quadro',
    body: 'Ecografia, RM e mammografia restano riferimenti chirurgici. Nessuno valuta lo scorrimento del tessuto: è una valutazione manuale.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Sciogliamo la <strong>tensione</strong> del petto e la cicatrice che
    non scorre
  </>,
  <>
    Torni a <strong>respirare</strong> a fondo, con le{' '}
    <strong>spalle</strong> più aperte
  </>,
  <>
    Torni a muoverti con più <strong>scioltezza</strong> di braccio e
    torace
  </>,
  <>
    Non sostituiamo il chirurgo: lavoriamo su ciò che l’
    <strong>estetica</strong> non risolve da sola
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
    body: 'Analizziamo cicatrici, scorrimento dei piani, torace, spalle e dinamica corporea per individuare fattori che alimentano la tensione.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, iniziamo tecniche manuali personalizzate sulla tua situazione clinica.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo strategie concrete su automassaggio, respiro e movimento, da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'chirurgo-perfetto',
    question: (
      <>
        Il chirurgo dice che è tutto <strong>perfetto</strong>: perché venire da voi?
      </>
    ),
    answer: (
      <>
        Sull’estetica ha ragione. Lo scorrimento dei tessuti è un’altra cosa: si valuta con le
        mani ed è il nostro campo. Lavoriamo in affiancamento al chirurgo, non al posto suo.
      </>
    ),
  },
  {
    id: 'paura-protesi',
    question: (
      <>
        Ho paura per la <strong>protesi</strong>: è sicuro?
      </>
    ),
    answer: (
      <>
        Si lavora con tecniche dolci, nel rispetto dei tessuti e della protesi, e nei tempi giusti
        dopo l’intervento. Il tuo chirurgo può restare nel giro: non sostituiamo il percorso
        chirurgico, lo affianchiamo.
      </>
    ),
  },
  {
    id: 'lho-voluto-io',
    question: (
      <>
        L’ho voluto io: posso ancora <strong>parlarne</strong>?
      </>
    ),
    answer: (
      <>
        Sì. Qui non c’è nessun giudizio da superare: c’è un torace che deve tornare a muoversi
        bene. Aver scelto l’intervento non toglie il diritto di chiedere aiuto se qualcosa tira
        ancora.
      </>
    ),
  },
  {
    id: 'imbarazzo',
    question: (
      <>
        Mi imbarazza la <strong>zona</strong>: come lavorate?
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
    id: 'red-flags',
    question: (
      <>
        Quando è necessario prima un controllo medico?
      </>
    ),
    answer: (
      <>
        In presenza di rossore, calore, secrezione o febbre nella zona, cambio improvviso di
        forma, volume o consistenza del seno, gonfiore comparso a distanza di tempo da un solo
        lato, nodulo nuovo al seno o sotto l’ascella, oppure dolore forte e improvviso al petto
        con affanno, la priorità è la valutazione chirurgica o medica tempestiva. Noi
        interveniamo solo quando il quadro è appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'cicatrici-seno',
  heroVideo,
  videoTitle: 'Video trattamento cicatrici seno - Mobilitas Torino',
  images: {
    hero: '/cervicalgia/cerv11.JPG',
    band: '/cervicalgia/cerv10.JPG',
    final: '/cervicalgia/cerv13.JPG',
  },
  hero: {
    place: 'Torino',
    name: 'Cicatrici seno',
    title: { main: 'Hai rifatto il seno e ti dicono che la tensione è normale?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>cicatrici</strong>,{' '}
        <strong>torace</strong> e{' '}
        <strong>spalle</strong> per ridurre l’impatto della
        tensione su respiro, movimento e vita quotidiana.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La cicatrice non ti limita solo sul taglio.', accent: 'Ti limita nel torace che non si apre più.' },
    intro: (
      <>
        Ignorarla non la fa sparire: la normalizza. E più la normalizzi, più ti toglie{' '}
        <strong>respiro</strong>,{' '}
        <strong>movimento</strong> e{' '}
        <strong>serenità</strong> nel tuo corpo.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>Il chirurgo conta</strong>.{' '}
        <strong>Le creme contano</strong>. Ma non sono
        l’unico livello del problema: i{' '}
        <strong>piani aderenti</strong> possono continuare
        a tirare anche quando l’estetica è già perfetta.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Spalle' }, { text: 'Torace' }, { text: 'Respiro' }, { text: 'Cicatrice', accent: true }],
      caption: 'L’estetica può essere perfetta. La cicatrice può continuare a tirare.',
    },
    narrative: (
      <>
        Ogni intervento lascia cicatrici anche dove non le vedi: sotto la pelle, intorno
        alla <strong>protesi</strong>, negli strati che
        devono scorrere. Quando restano aderenti, il{' '}
        <strong>torace</strong> si chiude: braccio
        limitato, respiro a metà, spalle in avanti.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre basta “dare tempo”.', accent: 'A volte serve lavorare sullo scorrimento dei tessuti.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Nessuna promessa assoluta, ma un obiettivo chiaro: ridurre l’
          <strong>impatto</strong> della tensione su respiro,
          movimento e sulla vita quotidiana, con un percorso serio e misurabile.
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
        <strong>respiro</strong> e meno tensione al petto.
        Inizia con un consulto telefonico o la prima visita.
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
        e iniziamo a costruire un percorso concreto sullo scorrimento dei tessuti — oltre
        all’estetica.
      </>
    ),
  },
  seo: {
    dataPage: 'cicatrici-seno',
    path: '/cicatrici-seno',
    ogImage: '/ciclo-menopausa-cicatricix2/ciclo-menopausa-cicatricix2.1.png',
    title: 'Osteopata Cicatrici Seno Torino | Torace, Aderenze e Post-Chirurgia | Mobilitas',
    description:
      'Osteopata per cicatrici del seno a Torino (San Donato e Crocetta). Lavoriamo su aderenze, torace, spalle e respiro dopo mastoplastica o chirurgia mammaria. Prima visita 49€.',
    keywords: [
      'osteopata cicatrici seno torino',
      'cicatrice seno osteopata',
      'aderenze dopo mastoplastica',
      'trattamento cicatrice seno',
      'torace teso dopo protesi',
      'post chirurgia mammaria osteopata',
      'cicatrice ascellare osteopatia',
      'spalle chiuse dopo seno rifatto',
      'massaggio cicatrice seno',
      'respiro dopo mastoplastica',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per cicatrici del seno – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Cicatrici Seno Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per cicatrici del seno – Mobilitas Torino',
    condition: {
      name: 'Cicatrici del seno e aderenze toraciche',
      alternateName: [
        'Cicatrice seno',
        'Aderenze post-mastoplastica',
        'Cicatrice dopo seno rifatto',
        'Tensione toracica post-chirurgica',
        'Cicatrice ascellare',
        'Disfunzione cicatriziale mammaria',
      ],
      anatomy: 'Torace, cicatrice mammaria, spalle e collo',
    },
    therapy: {
      name: 'Trattamento osteopatico per cicatrici del seno',
      description:
        'Approccio osteopatico integrato su cicatrici mammarie, aderenze, torace, spalle e respiro, nel rispetto della protesi e in affiancamento al chirurgo.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per cicatrici del seno',
      },
    },
    breadcrumbName: 'Cicatrici seno',
    faq: [
      {
        name: 'Il chirurgo dice che è tutto perfetto: perché venire da voi?',
        text: 'Sull’estetica ha ragione. Lo scorrimento dei tessuti è un’altra cosa: si valuta con le mani ed è il nostro campo. Lavoriamo in affiancamento al chirurgo, non al posto suo.',
      },
      {
        name: 'Ho paura per la protesi: è sicuro?',
        text: 'Si lavora con tecniche dolci, nel rispetto dei tessuti e della protesi, e nei tempi giusti dopo l’intervento. Il tuo chirurgo può restare nel giro: non sostituiamo il percorso chirurgico, lo affianchiamo.',
      },
      {
        name: 'L’ho voluto io: posso ancora parlarne?',
        text: 'Sì. Qui non c’è nessun giudizio da superare: c’è un torace che deve tornare a muoversi bene. Aver scelto l’intervento non toglie il diritto di chiedere aiuto se qualcosa tira ancora.',
      },
      {
        name: 'Mi imbarazza la zona: come lavorate?',
        text: 'Comprensibile. Si lavora con delicatezza, spiegando ogni passaggio, con il tuo consenso a ogni passo. Ti fermi quando vuoi: comanda il tuo comfort, non un protocollo uguale per tutte.',
      },
      {
        name: 'Quando è necessario prima un controllo medico?',
        text: 'In presenza di rossore, calore, secrezione o febbre nella zona, cambio improvviso di forma, volume o consistenza del seno, gonfiore comparso a distanza di tempo da un solo lato, nodulo nuovo al seno o sotto l’ascella, oppure dolore forte e improvviso al petto con affanno, la priorità è la valutazione chirurgica o medica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function CicatriciSeno() {
  return <ConditionLanding page={PAGE} />
}
