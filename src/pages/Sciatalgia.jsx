import {
  Activity,
  Armchair,
  ArrowDown,
  Flame,
  Footprints,
  Moon,
  Split,
  Zap,
  PersonStanding,
  BatteryLow,
} from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'

// Landing "Sciatalgia": solo contenuti e dati. Struttura, grafica e logica (video, popup di
// prenotazione, recensioni, SEO) stanno in components/condition-landing.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('SCIATALGIA_VSL')

const HERO_BENEFITS = [
  <>
    Trovare finalmente una <strong>posizione</strong> senza cambiarla ogni cinque
    minuti
  </>,
  <>
    Dormire senza <strong>alzarti alle tre di notte</strong> per il dolore lungo
    la gamba
  </>,
  <>
    <strong>Piegarti</strong> senza aspettare che passi la scossa elettrica
  </>,
]

const PAIN_POINTS = [
  {
    icon: ArrowDown,
    title: 'Dolore che scende lungo la gamba',
    body: 'Parte da gluteo o parte bassa della schiena e scende dietro la coscia, verso il polpaccio e a volte fino al piede.',
  },
  {
    icon: Split,
    title: 'Dolore su un lato solo',
    body: 'Quasi sempre interessa una gamba sola, non entrambe.',
  },
  {
    icon: Zap,
    title: 'Scossa elettrica con certi movimenti',
    body: 'Piegarsi in avanti, tossire, starnutire o sforzarsi in bagno scatena una fitta improvvisa.',
  },
  {
    icon: Activity,
    title: 'Formicolio o intorpidimento',
    body: 'Sensazione di puntine, o zone della gamba e del piede che senti meno.',
  },
  {
    icon: BatteryLow,
    title: 'Debolezza della gamba o del piede',
    body: 'La gamba cede o il piede fa fatica a sollevarsi bene quando cammini.',
  },
  {
    icon: Armchair,
    title: 'Peggiora stando seduto a lungo',
    body: 'Guidare, stare alla scrivania, un volo o un viaggio in treno: il dolore sale.',
  },
  {
    icon: PersonStanding,
    title: 'Difficoltà ad alzarsi dalla sedia',
    body: 'Il momento del passaggio da seduto a in piedi è uno dei più dolorosi.',
  },
  {
    icon: Flame,
    title: 'Bruciore lungo il percorso del nervo',
    body: 'Non è sempre una fitta: spesso è un bruciore continuo lungo la gamba.',
  },
  {
    icon: Moon,
    title: 'Peggiora la notte o al risveglio',
    body: 'Il dolore si intensifica da sdraiato e ti sveglia, oppure ti trovi rigido e dolorante al mattino.',
  },
  {
    icon: Footprints,
    title: 'Sollievo camminando o cambiando posizione',
    body: 'Stare fermi peggiora, muoversi un po’ spesso allevia — almeno all’inizio.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Il dolore indica dove il nervo soffre',
    b: 'Non sempre coincide con il punto disturbato: un bacino ruotato, un gluteo contratto o una schiena che scarica male possono irritare il nervo lungo la strada.',
  },
  {
    k: '02',
    t: 'Il nervo attraversa tutto il percorso',
    b: 'Parte dalla schiena, attraversa bacino e gluteo e scende lungo la gamba: la compressione può nascere in più punti della catena.',
  },
  {
    k: '03',
    t: 'Serve liberare tutto il percorso',
    b: 'Lavorare solo dove fa male spesso non basta: bisogna togliere pressione da schiena, bacino e gluteo insieme.',
  },
]

const BENEFITS = [
  {
    image: '/trattamenti/anca_flessa-supino_07_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di anca e bacino di una paziente con la gamba flessa',
    title: 'Antinfiammatori',
    body: 'Riducono il dolore nella fase acuta, ma non modificano ciò che sta irritando il nervo. FANS orali (ketoprofene, diclofenac, naprossene) sono spesso la prima linea, a dosaggi pieni nella fase acuta.',
  },
  {
    image: '/trattamenti/gamba_gamba-tesa-sollevata_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Valutazione con la gamba tesa sollevata di un paziente',
    title: 'Riposo',
    body: 'Qualche giorno può servire, oltre tende a peggiorare rigidità e debolezza.',
  },
  {
    image: '/trattamenti/anca_decubito-laterale_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta anca e bacino di una paziente sdraiata su un fianco',
    title: 'Cortisone',
    body: 'Spesso dà un sollievo reale e importante, però temporaneo: quando finisce, la causa meccanica è ancora lì. Cortisonici (prednisone, betametasone, desametasone) sono cicli brevi molto usati nel dolore radicolare intenso, su prescrizione.',
  },
  {
    image: '/trattamenti/gamba_ginocchio-anca-flessione_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che mobilizza ginocchio e anca di una paziente',
    title: 'Fisioterapia e esercizi specifici',
    body: 'Molto utili, ma se il carico arriva da bacino, anca o postura, la zona continua a essere sollecitata.',
  },
  {
    image: '/trattamenti/schiena_lombare-prono_03_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento osteopatico della zona lombare di un paziente a pancia in giù',
    title: 'Ghiaccio, calore e massaggi',
    body: 'Ghiaccio e calore gestiscono il fastidio, non la compressione o l’irritazione del nervo. I massaggi sciolgono la contrattura di difesa, che però è la reazione del corpo e non l’origine.',
  },
  {
    image: '/trattamenti/schiena_lombare-supino_02_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che lavora sulla zona lombare di una paziente supina',
    title: 'Risonanza, fascia lombare e infiltrazioni',
    body: 'La risonanza magnetica lombosacrale è l’esame di riferimento; radiografia, elettromiografia e TAC completano il quadro. Servono a escludere problemi seri, ma molte persone hanno gli stessi dischi in immagine senza alcun dolore. Fascia lombare, infiltrazioni e valutazione chirurgica restano opzioni mirate, non risolutive da sole.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    Trovare finalmente una <strong>posizione</strong>: seduto, in piedi o sdraiato
    senza cambiare posto ogni cinque minuti
  </>,
  <>
    Dormire senza <strong>alzarti alle tre di notte</strong> perché il dolore
    lungo la gamba ti sveglia
  </>,
  <>
    <strong>Piegarti</strong> senza la scossa: raccogliere qualcosa da terra
    senza restare fermo ad aspettare che passi
  </>,
  <>
    Ritrovare <strong>fiducia nella tua gamba</strong> e smettere di avere paura
    che ceda mentre scendi le scale
  </>,
  <>
    Capire perché tanta gente ha gli stessi <strong>dischi</strong> e non ha
    dolore — partendo da questa domanda, non dall’immagine della risonanza
  </>,
  <>
    Rifare un <strong>viaggio in macchina</strong> senza fermarti: restituirti
    i quaranta minuti seduto che oggi sono un problema logistico
  </>,
  <>
    Ridurre il ricorso ad <strong>antinfiammatori e cortisone</strong>: se la
    causa viene affrontata, il tampone serve sempre meno
  </>,
  <>
    Affrontare la <strong>giornata di lavoro</strong> senza pagarla la sera,
    che tu stia in piedi o seduto
  </>,
  <>
    Guardare la parola <strong>intervento</strong> da più lontano, prima di
    arrivare lì
  </>,
  <>
    Smettere di muoverti in <strong>difesa</strong> e tornare a fidarti dei
    tuoi movimenti invece di calcolarli tutti
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
    body: 'Colloquio e valutazione iniziale — capiamo in che punto del percorso il nervo viene disturbato.',
  },
  {
    title: 'Trattamento specifico',
    body: 'Se indicato, lavoriamo su scioglimento di gluteo e muscoli profondi del bacino, sblocco dolce di schiena bassa e bacino, tecniche di scorrimento del nervo e lavoro su respiro e pancia.',
  },
  {
    title: 'Indicazioni pratiche personalizzate',
    body: 'Ti diamo consigli su posizioni e movimenti — come sederti, dormire e muoverti senza irritarlo — da integrare con il percorso medico.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'toccare',
    question: (
      <>
        Ho paura che <strong>toccandomi</strong> peggiori: è così?
      </>
    ),
    answer: (
      <>
        Nella fase acuta si lavora lontano dal punto irritato, con tecniche dolci: l’obiettivo è
        togliere pressione, non aggiungerla. Nulla viene fatto senza il tuo consenso e senza
        valutare cosa il tuo nervo può tollerare in quel momento.
      </>
    ),
  },
  {
    id: 'ernia',
    question: (
      <>
        La <strong>risonanza</strong> dice ernia: serve l’operazione?
      </>
    ),
    answer: (
      <>
        L’operazione ha indicazioni precise che decide il medico. Moltissime sciatalgie migliorano per
        altre strade: vale la pena esplorarle prima. Le stesse immagini si trovano in tantissime
        persone senza alcun dolore — l’immagine da sola non dice come stai.
      </>
    ),
  },
  {
    id: 'cortisone',
    question: (
      <>
        Il <strong>cortisone</strong> mi ha aiutato, poi è tornato: perché?
      </>
    ),
    answer: (
      <>
        Il cortisone spegne l’infiammazione, non toglie ciò che la provoca: è proprio su quello che
        lavoriamo. Gabapentinoidi (pregabalin, gabapentin) e miorilassanti (tiocolchicoside) possono
        aiutare nella fase acuta, ma restano un tampone se la causa meccanica non viene affrontata.
        Qualsiasi modifica terapeutica resta sempre in capo al medico prescrittore.
      </>
    ),
  },
  {
    id: 'funzionera',
    question: (
      <>
        <strong>Funzionerà</strong> nel mio caso?
      </>
    ),
    answer: (
      <>
        Non lo promettiamo: la prima visita serve a valutare il percorso del tuo nervo e a dirti
        onestamente se possiamo lavorarci — e cosa no — senza forzare un percorso che non ha senso.
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
        In presenza di perdita di controllo di pipì o feci, o zona tra le gambe addormentata (pronto
        soccorso subito), piede o gamba che perdono forza rapidamente (piede che “cade” camminando),
        dolore forte a entrambe le gambe comparso di colpo, febbre o infezione recente insieme al
        dolore, oppure dolore notturno continuo che cresce con calo di peso o storia di tumore, la
        priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è
        appropriato a un supporto osteopatico.
      </>
    ),
  },
]

const PAGE = {
  slug: 'sciatalgia',
  heroVideo,
  videoTitle: 'Video trattamento sciatalgia - Mobilitas Torino',
  images: {
    hero: '/trattamenti/anca_flessa-supino_12_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/schiena_lombare-prono_15_orizzontale',
    bandClassName: 'object-[45%_88%]',
    final: '/trattamenti/anca_flessa-supino_06_orizzontale',
    finalClassName: 'object-[40%_60%]',
  },
  hero: {
    place: 'Torino',
    name: 'Sciatalgia',
    title: { main: 'Soffri di sciatalgia e ti hanno detto che è l’ernia?', accent: 'Prenota il tuo trattamento specifico.' },
    lead: (
      <>
        Interveniamo in modo specifico su{' '}
        <strong>nervo sciatico</strong>,{' '}
        <strong>bacino</strong> e{' '}
        <strong>gluteo</strong> per ridurre l’impatto
        della sciatalgia su sonno, lavoro e movimento quotidiano.
      </>
    ),
    benefits: HERO_BENEFITS,
  },
  pain: {
    title: { main: 'La sciatalgia non ti limita solo nel dolore.', accent: 'Ti limita in ogni posizione.' },
    intro: (
      <>
        Ti siedi e fa male. Ti alzi e fa male. Ti sdrai e fa male uguale. Ignorarlo non lo fa
        sparire: più lo normalizzi, più ti toglie{' '}
        <strong>sonno</strong>,{' '}
        <strong>viaggi</strong> e{' '}
        <strong>fiducia</strong> nella tua gamba.
      </>
    ),
    items: PAIN_POINTS,
  },
  mechanism: {
    title: { main: 'Perché puoi fare “tutto giusto”', accent: 'e stare comunque male' },
    intro: (
      <>
        <strong>I farmaci contano</strong>.{' '}
        <strong>La risonanza conta</strong>. Ma non sono
        l’unico livello del problema: se bacino, gluteo e schiena non liberano il{' '}
        <strong>nervo</strong>, il dolore lungo la gamba
        continua a tornare.
      </>
    ),
    emblem: {
      variant: 'ring',
      labels: [{ text: 'Schiena' }, { text: 'Bacino' }, { text: 'Gluteo', accent: true }, { text: 'Nervo' }],
      caption: 'Il dolore ti dice dove il nervo soffre, non sempre dove viene disturbato.',
    },
    narrative: (
      <>
        Il nervo sciatico parte dalla schiena e attraversa bacino e gluteo prima di scendere
        lungo la gamba. Il dolore ti dice dove il nervo soffre, non sempre dove viene
        disturbato: un{' '}
        <strong>bacino ruotato</strong>, un{' '}
        <strong>gluteo contratto</strong> o una{' '}
        <strong>schiena</strong> che scarica male possono
        irritarlo lungo la strada.
      </>
    ),
    steps: MECHANISM_STEPS,
    quote: { main: 'Non sempre serve “un altro antinfiammatorio”.', accent: 'A volte serve liberare tutto il percorso del nervo.' },
    sub: {
      title: { main: 'Ecco perché è fondamentale intervenire', accent: 'sulla componente meccanica.' },
      intro: (
        <>
          Colloquio iniziale, scioglimento di gluteo e bacino, tecniche di scorrimento del nervo
          e consigli su posizioni e movimenti: un percorso chiaro per ridurre l’
          <strong>impatto</strong> della sciatalgia sulla tua
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
        e iniziamo a lavorare sul percorso del tuo nervo — oltre al tampone di pastiglie e cortisone.
      </>
    ),
  },
  seo: {
    dataPage: 'sciatalgia',
    path: '/sciatalgia',
    ogImage: '/trattamenti/og/anca_flessa-supino_07_orizzontale.jpg',
    title: 'Osteopata Sciatalgia Torino | Nervo Sciatico, Bacino e Gluteo | Mobilitas',
    description:
      'Osteopata per sciatalgia a Torino (San Donato e Crocetta). Lavoriamo su nervo sciatico, bacino, gluteo e schiena bassa, in affiancamento al medico. Prima visita 49€.',
    keywords: [
      'osteopata sciatalgia torino',
      'sciatalgia torino',
      'osteopatia sciatalgia',
      'trattamento sciatalgia osteopata',
      'nervo sciatico torino',
      'dolore radicolare torino',
      'ernia disco osteopata torino',
      'osteopata bacino torino',
      'dolore gamba osteopata',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Trattamento osteopatico per sciatalgia – Studio Mobilitas Torino',
    twitterTitle: 'Osteopata Sciatalgia Torino | Mobilitas',
    twitterImageAlt: 'Trattamento osteopatico per sciatalgia – Mobilitas Torino',
    condition: {
      name: 'Sciatalgia',
      alternateName: [
        'Nervo sciatico infiammato',
        'Dolore radicolare',
        'Dolore che scende lungo la gamba',
        'Radicolopatia lombosacrale',
        'Lombosciatalgia',
      ],
      anatomy: 'Nervo sciatico, bacino, gluteo e colonna lombosacrale',
    },
    therapy: {
      name: 'Trattamento osteopatico per sciatalgia',
      description:
        'Approccio osteopatico integrato su nervo sciatico, bacino, gluteo e schiena bassa, in affiancamento al percorso medico.',
      offer: {
        price: '49',
        availability: 'https://schema.org/InStock',
        name: 'Prima visita osteopatica per sciatalgia',
      },
    },
    breadcrumbName: 'Sciatalgia',
    faq: [
      {
        name: 'Ho paura che toccandomi peggiori: è così?',
        text: 'Nella fase acuta si lavora lontano dal punto irritato, con tecniche dolci: l’obiettivo è togliere pressione, non aggiungerla. Nulla viene fatto senza il tuo consenso e senza valutare cosa il tuo nervo può tollerare in quel momento.',
      },
      {
        name: 'La risonanza dice ernia: serve l’operazione?',
        text: 'L’operazione ha indicazioni precise che decide il medico. Moltissime sciatalgie migliorano per altre strade: vale la pena esplorarle prima. Le stesse immagini si trovano in tantissime persone senza alcun dolore — l’immagine da sola non dice come stai.',
      },
      {
        name: 'Il cortisone mi ha aiutato, poi è tornato: perché?',
        text: 'Il cortisone spegne l’infiammazione, non toglie ciò che la provoca: è proprio su quello che lavoriamo. Gabapentinoidi e miorilassanti possono aiutare nella fase acuta, ma restano un tampone se la causa meccanica non viene affrontata. Qualsiasi modifica terapeutica resta sempre in capo al medico prescrittore.',
      },
      {
        name: 'Funzionerà nel mio caso?',
        text: 'Non lo promettiamo: la prima visita serve a valutare il percorso del tuo nervo e a dirti onestamente se possiamo lavorarci — e cosa no — senza forzare un percorso che non ha senso.',
      },
      {
        name: 'Quando è necessario prima un controllo medico urgente?',
        text: 'In presenza di perdita di controllo di pipì o feci, o zona tra le gambe addormentata (pronto soccorso subito), piede o gamba che perdono forza rapidamente, dolore forte a entrambe le gambe comparso di colpo, febbre o infezione recente insieme al dolore, oppure dolore notturno continuo che cresce con calo di peso o storia di tumore, la priorità è la valutazione medica tempestiva. Noi interveniamo solo quando il quadro è appropriato a un supporto osteopatico.',
      },
    ],
  },
}

export default function Sciatalgia() {
  return <ConditionLanding page={PAGE} />
}
