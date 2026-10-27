import { Repeat, Clock, Archive, Dumbbell, Camera, ScanSearch } from 'lucide-react'
import ConditionLanding from '../components/condition-landing/ConditionLanding'
import { prefetchHeroVideo } from '../components/condition-landing/heroVideo'
import { RECENSIONI_TOTALI } from '../data/studi'

// Landing /yt-postura (dal video YouTube di Nicolas): stesso template delle landing di
// patologia, con la variante "lista d'attesa": percorso a 299€, CTA "Mettiti in lista" /
// "Telefonata gratis", sezione "Due modi per entrare" al posto delle tappe della visita.

// Codice stabile del video nel gestionale: non hardcodare l'UID Cloudflare.
// Il fetch parte subito (prima del mount) per ridurre il tempo a primo frame.
const heroVideo = prefetchHeroVideo('YT_POSTURA_VSL')

const HERO_BENEFITS = [
  <>
    <strong>Visita posturale</strong>: guardiamo tutto il corpo, non il punto
    che brucia. Fissiamo l’obiettivo. Il tuo.
  </>,
  <>
    <strong>3 sedute osteopatiche</strong>: solo per quell’obiettivo. Alla
    fine, la postura che vuoi. Il problema per cui sei arrivato, risolto.
  </>,
  <>
    <strong>App su misura</strong>: i corsi scelti dai professionisti sul tuo
    caso. Per tenere l’obiettivo. Tutto nel telefono.
  </>,
]

const PAIN_POINTS = [
  {
    icon: Camera,
    title: 'In foto sembri più stanco di come ti senti',
    body: 'Ti vedi di lato, in una vetrina o in una foto, e non ti riconosci. Schiena chiusa, testa davanti alle spalle. Sembri più vecchio di come ti senti. Non è la luce. È come stai tutto il giorno, anche quando non ci pensi.',
  },
  {
    icon: Clock,
    title: 'La sera brucia sempre nello stesso punto',
    body: 'Verso sera, in mezzo alla schiena, torna quel bruciore. Quei muscoli non sono il problema: tengono su una schiena che non si apre più. Il massaggio ti fa stare bene due giorni. Poi sei da capo.',
  },
  {
    icon: Repeat,
    title: 'Ti raddrizzi, e non resta',
    body: 'Apri le spalle, tiri indietro la testa. Un minuto, e ricadi. Per il corpo quella è la posizione comoda: è quella che ha imparato. Voler stare dritto non basta, se una parte della schiena non si muove più.',
  },
  {
    icon: Archive,
    title: 'Hai già comprato un sacco di cose',
    body: 'Correttore, cuscino, sedia, plantare. Finché li tieni addosso, ti reggono loro. Li togli, e torni come prima. Non hai sbagliato a provarci. Hai sistemato il pezzo di sopra. Il motivo stava sotto.',
  },
  {
    icon: ScanSearch,
    title: 'Ti hanno detto una parola, e poi basta',
    body: 'Sul referto c’è «collo dritto», oppure «scoliosi», oppure «hai una gamba più corta». E lì si sono fermati. Quasi nessuno ti ha detto se è l’osso, che non si cambia, o il corpo che si è messo storto per stare in equilibrio. Sono due cose diverse. Cambia tutto.',
  },
  {
    icon: Dumbbell,
    title: 'Ti alleni, ma torni sempre uguale',
    body: 'Palestra, ginnastica, nuoto, addominali. Diventi più forte, e va bene. Ma se sotto c’è una zona ferma, l’esercizio le gira intorno. Alleni il corpo così com’è. Non gli insegni a stare in un altro modo.',
  },
]

const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Prima cambia la postura. Poi arriva il dolore',
    b: 'Prima del dolore, il petto non si apre, la testa non sta sopra le spalle, il bacino non è dritto. Quello che senti arriva dopo.',
  },
  {
    k: '02',
    t: 'Fa male in un punto. Il motivo è un altro',
    b: 'Il bruciore in mezzo alla schiena è il muscolo che ti regge tutto il giorno. Il collo duro sorregge una schiena chiusa. Se fa male sempre dallo stesso lato, è da lì che carichi.',
  },
  {
    k: '03',
    t: 'Non ti manca la voglia. Ti manca il movimento',
    b: 'Se schiena e costole non si aprono, stare dritto non ha un appoggio. Ci resti un attimo, poi ricadi. Quando quel movimento torna, resti dritto senza pensarci.',
  },
  {
    k: '04',
    t: 'L’osso resta. Quello che si muove, se aspetti, si blocca',
    b: 'Se la curva è diventata osso, resta. Te lo diciamo subito. Schiena, costole, bacino, anche e piedi, quasi sempre, si muovono ancora. Si lavora lì. Più aspetti, più si irrigidiscono.',
  },
]

const BENEFITS = [
  {
    icon: Camera,
    image: '/trattamenti/collo_cervicale-e-spalle-supino_02_orizzontale',
    imageClassName: 'object-[0%_50%]',
    alt: 'Osteopata che tratta collo e spalle di una paziente supina',
    eyebrow: 'La foto di lato',
    title: 'In foto torni a sembrare te',
    body: 'Testa sopra le spalle, petto aperto. Quell’aria stanca di lato si vede meno. Spesso non sono gli anni. È come stai tutto il giorno.',
  },
  {
    icon: Clock,
    image: '/trattamenti/schiena_dorsale-alta-prono_04_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che tratta la parte alta della schiena di un paziente',
    eyebrow: 'Il bruciore della sera',
    title: 'La sera, quel punto molla',
    body: 'Quel bruciore è il muscolo che ti regge fino a sera. Se la schiena torna a sostenersi da sola, il muscolo può smettere. Il fastidio che conoscevi a memoria si fa vedere meno.',
  },
  {
    icon: Repeat,
    image: '/trattamenti/schiena_lombare-supino_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Osteopata che lavora sulla zona lombare di una paziente supina',
    eyebrow: 'Ti tiri su, e ricadi',
    title: 'Stai dritto senza tenerti su',
    body: 'Oggi ci resti un minuto, poi ricadi. Quando schiena e costole si riaprono, stare dritto ha un appoggio. Non lo tieni con la volontà. Ci arrivi da solo, e ci resti più a lungo.',
  },
  {
    icon: Archive,
    image: '/trattamenti/spalla_scapola-decubito-laterale_06_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Trattamento di scapola e spalla di una paziente sdraiata su un fianco',
    eyebrow: 'Correttore, cuscino, sedia',
    title: 'Li togli, e non ricadi',
    body: 'Finché li usi, ti tengono loro. Li togli, e torni come prima. Se la schiena si riapre e il bacino torna dritto, ti tiene il corpo. Non un pezzo comprato.',
  },
  {
    icon: ScanSearch,
    image: '/trattamenti/collo_presa-cervicale-supino_19_orizzontale',
    imageClassName: 'object-[18%_50%]',
    alt: 'Trattamento osteopatico del collo di una paziente supina',
    eyebrow: 'La parola sul referto',
    title: 'Capisci se è osso o posizione',
    body: 'Curva dell’osso, o corpo inclinato. Scoliosi vera, o schiena messa storta. Gamba corta, o bacino girato. Si lavora solo sulla seconda di ogni coppia. Alla prima visita te lo diciamo, con i tuoi esami in mano.',
  },
  {
    icon: Dumbbell,
    image: '/trattamenti/spalla_valutazione-in-piedi_01_orizzontale',
    imageClassName: 'object-[50%_50%]',
    alt: 'Valutazione della spalla in piedi di un paziente',
    eyebrow: 'Ti alleni, e torni uguale',
    title: 'Quello che alleni, resta',
    body: 'Palestra, nuoto, ginnastica: continua. La forza serve. Su una schiena che si apre e su un bacino dritto, quello che alleni resta. Su una zona ferma, lo perdi appena smetti.',
  },
]

const AFTER_IMAGES_BENEFITS = [
  <>
    <strong>Prima visita</strong>: ti diciamo cosa si muove ancora, e cosa è osso
  </>,
  <>
    <strong>3 sedute</strong>: solo su quella parte. Niente programma uguale per tutti
  </>,
  <>
    <strong>App</strong>: pochi esercizi, così a casa non torni dov’eri
  </>,
  <>
    <strong>299€</strong> invece di 600€. Oggi non paghi niente
  </>,
]

const ENTRY_DOORS = [
  {
    id: 'lista',
    kicker: 'Tiene il posto',
    title: 'Mettiti in lista',
    lead: 'Per chi si è già riconosciuto. Il percorso sta per partire. Il posto del mese va a chi lascia nome e numero prima.',
    points: [
      'Oggi non paghi. Lasci nome e numero, e basta.',
      'Ti richiamiamo noi. Ti confermiamo 299€ invece di 600€.',
      'Se il mese è pieno, il posto è di chi è arrivato prima.',
    ],
  },
  {
    id: 'consulto',
    kicker: 'Se ti resta un dubbio',
    title: 'Fatti dire se è il tuo caso',
    lead: 'Una telefonata gratis. Non per convincerti. Per dirti se ha senso farlo così, nel tuo caso.',
    points: [
      'Ti richiamiamo noi. Non è una visita, e non è un video.',
      'Se non ha senso, te lo diciamo. Non ti vendiamo niente.',
      'Se invece sì, da quella telefonata entri in lista.',
    ],
  },
]

const AFTER_ENTRY = [
  {
    k: '01',
    t: 'Lasci nome e numero',
    b: 'Lista o telefonata: è lo stesso gesto. Oggi non parte nessun pagamento.',
  },
  {
    k: '02',
    t: 'Ti richiamiamo noi',
    b: 'Sede, prezzo, e se questo mese c’è ancora posto. Non aspetti una mail.',
  },
  {
    k: '03',
    t: 'In studio, prima la verità',
    b: 'Ti guardiamo in piedi. Se è osso, te lo diciamo. Se si muove, partono le 3 sedute e l’app.',
  },
]

const FAQ_ITEMS = [
  {
    id: 'lista-attesa',
    question: (
      <>
        Quale dei due <strong>bottoni</strong> è il mio?
      </>
    ),
    answer: (
      <>
        Se hai già capito che è il tuo caso, premi il verde: entri in lista. Il percorso sta per
        partire. Ogni mese i posti sono pochi, e li prende chi si iscrive prima. Se ti resta un
        dubbio, premi l’altro: è una telefonata gratis. Ti richiamiamo e ti diciamo se ha senso
        farlo così. In nessuno dei due casi paghi oggi.
      </>
    ),
  },
  {
    id: 'raddrizzare',
    question: (
      <>
        Mi <strong>raddrizzate</strong>?
      </>
    ),
    answer: (
      <>
        No. E non fidarti di chi te lo promette prima di averti visto. Una parte della curva può
        essere diventata osso: quella non si cambia con le mani. Si lavora su quello che si muove
        ancora: schiena, costole, bacino. Quanto migliori, lo vedi strada facendo. Non il giorno in
        cui lasci il numero.
      </>
    ),
  },
  {
    id: 'referto',
    question: (
      <>
        Nel referto c’è <em>scoliosi</em>, o mi hanno detto che ho una gamba corta.
      </>
    ),
    answer: (
      <>
        Sono le due frasi che chiudono il discorso troppo presto. La scoliosi vera è dell’osso: la
        curva resta anche quando ti pieghi in avanti, e si vede sulla lastra. Molte volte, invece,
        il corpo si è solo inclinato per stare in equilibrio. Ti chini, e la storta si riduce. Di
        solito parte dal bacino, da un’anca, o da come appoggi il piede. Anche «ho una gamba più
        corta», quasi sempre, non è vero: le gambe sono uguali, è il bacino che si è girato. La
        gamba davvero più corta si misura con una lastra, e sono pochi casi. La visita serve a
        questo, con i tuoi esami in mano.
      </>
    ),
  },
  {
    id: 'gia-provato',
    question: (
      <>
        Faccio già <em>palestra</em>, posturale o fisioterapia.
      </>
    ),
    answer: (
      <>
        Continua. Diventare più forte serve, e il sollievo che senti è vero. Il punto è un altro.
        Se una zona è ferma, l’esercizio le gira intorno. Il massaggio scioglie il muscolo che sta
        lavorando al posto suo, e non tocca il motivo per cui si affatica. Qui si comincia
        rimettendo in movimento quella zona. Poi l’app ti aiuta a tenere quello che si è mosso, nei
        giorni in cui non sei in studio.
      </>
    ),
  },
  {
    id: 'estetica',
    question: (
      <>
        Non ho dolore. Mi dà fastidio solo <strong>come mi vedo</strong>.
      </>
    ),
    answer: (
      <>
        È il momento migliore per venire: c’è ancora spazio per lavorare. Una schiena chiusa, una
        testa in avanti, un bacino inclinato. Oggi sono lo specchio. Domani sono la schiena dura, il
        fiato corto, il dolore. Non è solo una questione di foto. È lo stesso problema, visto prima
        che faccia male.
      </>
    ),
  },
  {
    id: 'cosa-include',
    question: (
      <>
        Cosa c’è nei <strong>299€</strong>?
      </>
    ),
    answer: (
      <>
        Una prima visita, per capire il tuo caso. Poi 3 sedute con l’osteopata, su quello che abbiamo
        trovato: non un programma uguale per tutti. E l’app, con un piano semplice da fare a casa.
        Il prezzo pieno è 600€. Il percorso è 299€. Oggi non paghi: o entri in lista, o chiedi la
        telefonata. Il prezzo te lo confermiamo quando ti richiamiamo.
      </>
    ),
  },
  {
    id: 'app',
    question: <>L’app è un altro video da guardare?</>,
    answer: (
      <>
        No. Dopo la visita trovi pochi esercizi e delle video lezioni scelte sulla tua situazione.
        Non due movimenti presi da internet. Li fai a casa, o in pausa, quando puoi. L’app non
        sostituisce le 3 sedute. Serve nelle ore in cui nessuno ti mette le mani addosso, perché il
        corpo non torni da solo dov’era.
      </>
    ),
  },
  {
    id: 'red-flags',
    question: (
      <>
        Quando devo andare prima dal <strong>medico</strong>?
      </>
    ),
    answer: (
      <>
        Vai prima dal medico se non controlli più la pipì o le feci. Se un braccio o una gamba
        diventa più debole di giorno in giorno. Se il dolore di notte cresce e stai perdendo peso.
        Se hai la febbre insieme al dolore. Se in poche settimane un lato del corpo è diventato
        molto più storto. Se il mal di testa arriva all’improvviso, fortissimo, e insieme non vedi
        bene, non parli bene o non hai forza. In questi casi, prima il medico. Poi, se serve, si
        vede il resto.
      </>
    ),
  },
]

const PAGE = {
  slug: 'yt-postura',
  heroVideo,
  videoTitle: 'Percorso posturale - Mobilitas Torino',
  images: {
    hero: '/trattamenti/collo_presa-cervicale-supino_26_orizzontale',
    heroClassName: 'object-[50%_60%]',
    band: '/trattamenti/schiena_lombare-prono_14_orizzontale',
    bandClassName: 'object-[45%_88%]',
    final: '/trattamenti/anca_decubito-laterale_06_orizzontale',
    finalClassName: 'object-[45%_60%]',
  },
  cta: {
    visit: { short: 'Mettiti in lista', long: 'Mettiti in lista' },
    consulto: { short: 'Telefonata gratis', long: 'Telefonata gratis' },
  },
  hero: {
    kicker: 'Dal video di Nicolas',
    bigTitle: true,
    title: { main: 'Perché torni storto', accent: 'appena smetti di pensarci?' },
    lead: (
      <>
        Lo fai ogni giorno. Ti tiri su, apri le spalle, sistemi la testa. Per un attimo ci sei.
        Poi riprendi il telefono, il lavoro o la macchina, e torni storto. Non sei pigro. Ti
        manca il movimento, non la voglia.
      </>
    ),
    // Senza video (o mentre carica) resta visibile questa foto, come prima
    fallback: {
      src: '/trattamenti/collo_presa-cervicale-supino_26_orizzontale',
      alt: 'Trattamento osteopatico del collo di una paziente supina',
      className: 'object-[50%_60%]',
    },
    intro: { main: 'Nel video abbiamo studiato il problema.', accent: 'Adesso vediamo come risolverlo.' },
    benefits: HERO_BENEFITS,
    price: {
      old: '600€',
      value: '299€',
      note: 'percorso completo',
      tag: 'Oggi non paghi',
      tagTone: 'positive',
    },
    notes: [
      'Il verde ti mette in lista: nome e numero, e il posto è tuo. Oggi non paghi.',
      'L’altro è una consulenza gratis. Parli con i responsabili dello studio: ti dicono se il percorso fa per te, e se la tua situazione si può risolvere qui.',
    ],
  },
  pain: {
    kicker: 'Ti ci ritrovi?',
    title: { main: 'Ecco perché rimani storto.', accent: null },
    intro:
      'Quando ti fa male un punto, la cosa naturale è curare solo quello. Quasi sempre, però, il problema non è lì: c’è un’altra parte del corpo che è ferma e non si muove più, e il punto che senti si stanca perché deve lavorare anche per quella. Se una di queste storie è la tua, continua.',
    items: PAIN_POINTS,
  },
  mechanism: {
    kicker: 'In parole povere',
    title: { main: 'Fa male in un punto.', accent: 'Il resto del corpo compensa.' },
    intro:
      'Se curi solo il punto che brucia, stai meglio un po’ e poi torna. Massaggio, pastiglia, correttore: calmano il fastidio. Non tolgono il motivo per cui, ogni giorno, si riforma.',
    emblem: {
      variant: 'chain',
      labels: [{ text: 'Testa' }, { text: 'Petto', accent: true }, { text: 'Bacino' }, { text: 'Piedi' }],
      caption: 'Fa male sopra. Il motivo sta sotto.',
    },
    narrative: [
      'La testa sta dritta solo se la schiena sotto è aperta. Se resti curvo per ore, il petto si chiude e le spalle cadono in avanti. La testa le segue. Il collo si irrigidisce per tenerla su.',
      'Più in basso è la stessa storia. Bacino inclinato in avanti: la pancia sporge, anche se non è grassa. Un fianco più alto: quasi mai è una gamba corta. È il bacino che si è girato. Il ginocchio che cade in dentro lo spostano l’anca e il piede. E se ti sei messo storto per un dolore, puoi restare così anche quando il dolore è passato.',
    ],
    steps: MECHANISM_STEPS,
    quote: {
      main: 'Chi ti promette di raddrizzarti prima di averti visto, ti sta prendendo in giro.',
      accent: 'Noi ti diciamo dove si può intervenire. E dove non serve.',
    },
    sub: {
      kicker: 'Cosa può tornare',
      title: { main: 'Non devi più tenerti su.', accent: 'Resta dritto da solo.' },
      intro:
        'Non è uguale per tutti, e non deve esserlo. Se una parte è diventata osso, resta: te lo diciamo alla prima visita. Se schiena, costole, bacino o piedi si muovono ancora, il lavoro è lì. Queste cose possono tornare. Non il giorno in cui lasci il numero. Strada facendo.',
    },
    cards: BENEFITS,
    checklist: AFTER_IMAGES_BENEFITS,
    checklistBox: {
      title: 'Se la visita dice sì, il percorso è questo.',
      note: 'Oggi non paghi. Il prezzo te lo confermiamo quando ti richiamiamo.',
    },
  },
  reviews: {
    title: { main: `Più di ${RECENSIONI_TOTALI} persone`, accent: 'hanno già smesso di provare a caso.' },
    intro:
      'Siamo lo studio di osteopatia più recensito d’Italia. Non sono storie di chi ha provato una cosa sola. Sono di gente già passata dal massaggio, dalla palestra e dalle pastiglie.',
    closing:
      'Se è il tuo caso, entra in lista. Se ti resta un dubbio, chiedi la telefonata. In tutti e due i casi lasci nome e numero. Oggi non paghi.',
  },
  entry: {
    kicker: 'Come si entra',
    title: { main: 'Due modi per entrare.', accent: 'Uno solo ti tiene il posto.' },
    intro:
      'Il verde è la lista. Ogni mese i posti sono pochi: li prende chi lascia nome e numero prima. L’altro è una telefonata gratis, se ti resta un dubbio. Ti diciamo noi se questo percorso ha senso. Oggi non paghi, né con la lista né con la telefonata.',
    doors: ENTRY_DOORS.map((door) =>
      door.id === 'lista' ? { ...door, priceOld: '600€', price: '299€' } : { ...door, price: 'Gratis' }
    ),
    afterTitle: 'Appena lasci il numero, succede questo.',
    after: AFTER_ENTRY,
    closing:
      'Se ti sei riconosciuto, il passo è uno. Lasci nome e numero. Il posto di questo mese lo prende chi entra prima.',
  },
  locations: {
    kicker: 'Dove siamo',
    intro:
      'San Donato e Crocetta. Quando ti richiamiamo, scegli la sede che ti viene meglio. Metro, bus o macchina: il posto in lista non dipende da quale delle due ti è più vicina.',
    metro: 'In metro. San Donato: Bernini o Principi d’Acaja. Crocetta: la fermata Crocetta.',
    parkingNote: 'Strisce blu e parcheggi intorno',
  },
  faq: {
    kicker: 'Prima di scegliere',
    title: { main: 'Le domande che ti fermano.', accent: 'Con una risposta secca.' },
    intro:
      'Aprine una. Se dopo ti resta un dubbio, è per questo che c’è la telefonata. Se ti sono chiare, il verde è il passo giusto.',
    items: FAQ_ITEMS,
    closing:
      'Un dubbio: chiedi la telefonata. Hai già deciso: mettiti in lista. Ti richiamiamo il prima possibile. Oggi non paghi. I posti di questo mese li prende chi entra prima.',
  },
  seo: {
    dataPage: 'yt-postura',
    path: '/yt-postura',
    ogImage: '/trattamenti/og/collo_cervicale-e-spalle-supino_02_orizzontale.jpg',
    title: 'Perché torni storto appena smetti di pensarci? | Mobilitas Torino',
    description:
      'Ti tiri su e dopo un minuto sei di nuovo giù. Non è pigrizia: una parte del corpo non si muove più, e il resto si sposta per tenerla su. Lista d’attesa a 299€ invece di 600€, oppure una telefonata gratis. Oggi non paghi.',
    keywords: [
      'percorso posturale torino',
      'osteopata postura torino',
      'valutazione posturale torino',
      'trattamento osteopatico postura',
      'postura collo schiena torino',
      'testa avanti osteopata',
      'mal di schiena postura torino',
      'app esercizi posturali',
      'osteopata san donato torino',
      'osteopata crocetta torino',
      'studio osteopatico mobilitas',
    ],
    ogImageAlt: 'Percorso posturale – Studio Mobilitas Torino',
    twitterTitle: 'Perché torni storto appena smetti di pensarci? | Mobilitas',
    twitterImageAlt: 'Percorso posturale – Mobilitas Torino',
    condition: {
      name: 'Disturbi posturali',
      alternateName: [
        'Testa in avanti',
        'Ipercifosi',
        'Spalle chiuse',
        'Iperlordosi',
        'Atteggiamento scoliotico',
        'Dolore posturale',
      ],
      anatomy: 'Colonna vertebrale, bacino e cingolo scapolare',
    },
    therapy: {
      name: 'Percorso posturale',
      description:
        'Una prima visita per capire cosa si muove ancora, 3 sedute dall’osteopata su quella parte, e un’app con un piano semplice. 299 euro invece di 600. Oggi non si paga: lista d’attesa oppure telefonata gratuita.',
      offer: {
        price: '299',
        availability: 'https://schema.org/PreOrder',
        name: 'Percorso posturale: visita, 3 trattamenti e app',
      },
    },
    breadcrumbName: 'Percorso posturale',
    faq: [
      {
        name: 'Quale dei due bottoni è il mio?',
        text: 'Se hai già capito che è il tuo caso, premi il verde: entri in lista. Il percorso sta per partire. Ogni mese i posti sono pochi, e li prende chi si iscrive prima. Se ti resta un dubbio, l’altro bottone è una telefonata gratis. Ti richiamiamo e ti diciamo se ha senso farlo così. In nessuno dei due casi paghi oggi.',
      },
      {
        name: 'Mi raddrizzate?',
        text: 'No. Una parte della curva può essere diventata osso: quella non si cambia con le mani. Si lavora su quello che si muove ancora: schiena, costole, bacino. Quanto migliori, lo vedi strada facendo. Non il giorno in cui lasci il numero.',
      },
      {
        name: 'Nel referto c’è scoliosi, o mi hanno detto che ho una gamba corta.',
        text: 'La scoliosi vera è dell’osso: la curva resta anche quando ti pieghi in avanti, e si vede sulla lastra. Molte volte il corpo si è solo inclinato per stare in equilibrio. Anche «ho una gamba più corta», quasi sempre, non è vero: le gambe sono uguali, è il bacino che si è girato. La visita serve a dirti quale dei due è il tuo caso.',
      },
      {
        name: 'Faccio già palestra, posturale o fisioterapia.',
        text: 'Continua. Diventare più forte serve. Se una zona è ferma, l’esercizio le gira intorno. Qui si comincia rimettendo in movimento quella zona. Poi l’app ti aiuta a tenere quello che si è mosso, nei giorni in cui non sei in studio.',
      },
      {
        name: 'Non ho dolore. Mi dà fastidio solo come mi vedo.',
        text: 'È il momento migliore per venire: c’è ancora spazio per lavorare. Una schiena chiusa, una testa in avanti, un bacino inclinato. Oggi sono lo specchio. Domani sono la schiena dura, il fiato corto, il dolore.',
      },
      {
        name: 'Cosa c’è nei 299€?',
        text: 'Una prima visita, per capire il tuo caso. Poi 3 sedute con l’osteopata, su quello che abbiamo trovato. E l’app, con un piano semplice da fare a casa. Il prezzo pieno è 600€. Il percorso è 299€. Oggi non paghi. Il prezzo te lo confermiamo quando ti richiamiamo.',
      },
      {
        name: 'L’app è un altro video da guardare?',
        text: 'No. Dopo la visita trovi pochi esercizi e delle video lezioni scelte sulla tua situazione. Li fai a casa, o in pausa, quando puoi. L’app non sostituisce le 3 sedute. Serve perché, nelle ore in cui nessuno ti mette le mani addosso, il corpo non torni da solo dov’era.',
      },
      {
        name: 'Quando devo andare prima dal medico?',
        text: 'Vai prima dal medico se non controlli più la pipì o le feci. Se un braccio o una gamba diventa più debole di giorno in giorno. Se il dolore di notte cresce e stai perdendo peso. Se hai la febbre insieme al dolore. Se in poche settimane un lato del corpo è diventato molto più storto. Se il mal di testa arriva all’improvviso, fortissimo, e insieme non vedi bene, non parli bene o non hai forza. In questi casi, prima il medico.',
      },
    ],
  },
}

export default function YtPostura() {
  return <ConditionLanding page={PAGE} />
}
