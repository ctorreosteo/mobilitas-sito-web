// Testi della landing /yt-postura-v2.
// Copy riscritto il 22/10/2026 con l'agente Copywriting Marketing, su dati confermati dal titolare:
// - percorso 299€ tutto incluso: prima visita posturale con un professionista esperto in postura, 3 sedute
//   osteopatiche di circa un'ora con lo stesso osteopata, distribuite in alcune settimane, 12 mesi di app;
// - telefonata gratuita e senza impegno, con un protocollo di valutazione preliminare (non è una visita);
// - dal 24/10/2026: si paga dopo la prima visita, solo se il percorso è adatto (altrimenti non si paga niente),
//   in un'unica soluzione o in due rate (condizioni e importo delle rate non in pagina). Nessun'altra garanzia.
// Esclusi su indicazione del titolare: prezzo barrato, posti limitati, importo e scadenze delle rate.
// Altre fonti: Nicolas Ricciardi osteopata (sito-web/LaNostraStoria.jsx), direttore (titolare); orari (Footer.jsx).
// La landing originale /yt-postura (YtPostura.jsx) non cambia.

// Sezione video: i 3 passi del percorso.
export const HERO_BENEFITS = [
  <>
    <strong className="font-bold">Prima visita posturale</strong>: il punto di partenza che finora ti è
    mancato. Un professionista esperto in postura osserva tutto il corpo, trova da dove parte il problema
    (spesso non è dove lo senti) e fissa con te un obiettivo realistico.
  </>,
  <>
    <strong className="font-bold">3 sedute di osteopatia</strong>: il lavoro che non puoi fare da solo.
    Circa un’ora ciascuna, nell’arco di alcune settimane, sempre con lo stesso osteopata.
  </>,
  <>
    <strong className="font-bold">12 mesi di app</strong>: così il risultato non si perde quando esci dallo
    studio. Esercizi e video lezioni scelti per il tuo obiettivo, anche dopo l’ultima seduta.
  </>,
]

// Capitolo Testa: autotest. Ogni voce è una scena quotidiana, con quello che costa.
export const PAIN_POINTS = [
  {
    title: 'Nelle foto di lato non ti riconosci',
    body: 'Testa in avanti, spalle chiuse, schiena tonda. In una vetrina o in una foto hai un’aria più stanca di come ti senti. E così, nelle foto, cerchi l’angolo giusto o ti metti dietro.',
  },
  {
    title: 'A fine giornata brucia sempre lo stesso punto',
    body: 'Tra le scapole o alla base del collo. Un massaggio ti dà sollievo per un paio di giorni, poi ricomincia. Ci hai fatto l’abitudine, ma non passa.',
  },
  {
    title: 'Ti raddrizzi, ma dopo poco sei di nuovo giù',
    body: 'In riunione, in macchina, davanti allo schermo. Ti correggi più volte al giorno e, senza accorgertene, torni come prima. È una fatica che nessuno vede.',
  },
  {
    title: 'Hai già comprato correttore, cuscino o sedia nuova',
    body: 'Finché li usi ti aiutano. Appena li togli, torni come prima. Hai speso, e sei al punto di partenza.',
  },
  {
    title: 'Sul referto c’è una parola, e nessuna spiegazione',
    body: '«Scoliosi», «collo dritto», «una gamba più corta». Nessuno ti ha detto cosa significa per te, né se si può migliorare.',
  },
  {
    title: 'Ti alleni, ma la postura resta quella',
    body: 'Palestra, ginnastica, nuoto. Diventi più forte, ed è giusto. Ma allo specchio cambia poco.',
  },
]

// Capitolo Petto: perché non è bastato niente.
// Mostrati solo i titoli («t»): la pagina li presenta come quattro frasi brevi. I «b» restano come riferimento.
export const MECHANISM_STEPS = [
  {
    k: '01',
    t: 'Il punto che fa male spesso non è la causa',
    b: 'Il bruciore tra le scapole o al collo è spesso un muscolo che lavora tutto il giorno in una posizione faticosa. Lo massaggi e si calma. Ma la posizione resta, e il bruciore torna.',
  },
  {
    k: '02',
    t: 'Correttori e cuscini lavorano al posto tuo. Quando li togli, torni come prima',
    b: 'Finché li usi, fanno loro il lavoro. Il corpo però non impara niente di nuovo, e quando li togli torna come prima.',
  },
  {
    k: '03',
    t: 'Allenarsi serve, ma da solo non basta',
    b: 'Palestra e nuoto ti rendono più forte. Ma se alcune zone si muovono poco, rinforzi il corpo nella posizione che ha già.',
  },
  {
    k: '04',
    t: 'Non tutto si può cambiare. Ed è giusto saperlo subito',
    b: 'Alcune curve sono strutturali, cioè dell’osso: il lavoro manuale non le modifica. Molte altre volte è il corpo che si è adattato, e lì si può lavorare. Capire in quale caso sei è il primo passo.',
  },
]

// Capitolo Bacino: obiettivi, non promesse. Foto invariate.
export const BENEFITS = [
  {
    image: 'profilo-collo',
    alt: 'Lavoro su collo e spalle in studio',
    eyebrow: 'La foto di lato',
    title: 'Riconoscerti di più nelle foto',
    body: 'Testa più allineata alle spalle, petto più aperto. Meno quell’aria stanca che vedi di lato.',
  },
  {
    image: 'cura-scapola',
    alt: 'Trattamento osteopatico sulla schiena',
    eyebrow: 'Il bruciore della sera',
    title: 'Arrivare a sera con meno fatica',
    body: 'Se la schiena si muove meglio, i muscoli che ti tengono su tutto il giorno possono lavorare di meno.',
  },
  {
    image: 'cura-schiena',
    alt: 'Trattamento osteopatico sulla schiena, in studio a Torino',
    eyebrow: 'Ti tiri su, e ricadi',
    title: 'Raddrizzarti con meno sforzo',
    body: 'Non con la forza di volontà, che dura un minuto. Perché, lavorandoci, il corpo impara a tornarci più facilmente.',
  },
  {
    image: 'cura-bacino',
    alt: 'Seduta in studio per la postura',
    eyebrow: 'Correttore, cuscino, sedia',
    title: 'Non dipendere da un oggetto',
    body: 'Usarli quando ti servono, non perché senza torni giù.',
  },
  {
    image: 'cura-anca',
    alt: 'Valutazione di schiena e bacino',
    eyebrow: 'La parola sul referto',
    title: 'Sapere cosa hai davvero',
    body: 'Cosa è osso e cosa è adattamento. Cosa si può migliorare, e cosa no. Te lo dice la prima visita.',
  },
  {
    image: 'cura-fianco',
    alt: 'Trattamento osteopatico sulla schiena',
    eyebrow: 'Ti alleni, e torni uguale',
    title: 'Allenarti su un corpo che si muove meglio',
    body: 'Palestra e nuoto restano. Cambia la base su cui li fai.',
  },
]

// Offerta: cosa comprende il percorso e a cosa serve ogni parte.
export const AFTER_IMAGES_BENEFITS = [
  <>
    <strong className="font-bold">Prima visita posturale</strong>: un professionista esperto in postura capisce
    cosa la mantiene e fissa con te l’obiettivo
  </>,
  <>
    <strong className="font-bold">3 sedute di osteopatia</strong>: circa un’ora ciascuna, sempre con lo stesso
    osteopata, sulle zone emerse dalla visita
  </>,
  <>
    <strong className="font-bold">12 mesi di app</strong>: esercizi e video lezioni scelti per te, per mantenere il
    lavoro ogni giorno
  </>,
  <>
    <strong className="font-bold">Paghi dopo la prima visita</strong>: se il percorso non è adatto a te, non paghi
    niente. Se lo inizi, puoi pagare in un’unica soluzione o in due rate
  </>,
]

// Capitolo Piedi: le due schede. «lista» (fondo blu, prezzo) = per chi è; «consulto» (bordo, «Gratis») = la
// telefonata. Entrambi i pulsanti aprono la stessa richiesta: telefonata gratuita (CT_GRATUITA).
export const ENTRY_DOORS = [
  {
    id: 'lista',
    title: 'Il percorso fa per te se…',
    lead: 'Non è per te se cerchi qualcuno che ti raddrizzi in una seduta, o se hai sintomi da far vedere prima al medico (li trovi nelle domande qui sotto).',
    points: [
      'La tua postura non ti piace e vuoi capire perché, invece di correggerti a forza.',
      'Hai già provato correttori, massaggi o palestra, e vuoi un percorso con un inizio e una fine.',
      'Vuoi fare la tua parte, con pochi esercizi a casa.',
    ],
  },
  {
    id: 'consulto',
    title: 'Prima di iniziare, una telefonata',
    lead: 'Non vogliamo farti venire in studio per niente. Per questo, prima della visita, ti chiamiamo noi.',
    points: [
      'Con un protocollo di domande preciso verifichiamo che il percorso sia adatto al tuo caso.',
      'Rispondiamo ai tuoi dubbi e definiamo con te i prossimi passi.',
      'Non è una visita. È gratuita e senza impegno.',
    ],
  },
]

export const AFTER_ENTRY = [
  {
    k: '01',
    t: 'Richiedi il percorso',
    b: 'Lasci nome, cellulare e la fascia oraria in cui preferisci che ti chiamiamo. Richiederlo è gratuito.',
  },
  {
    k: '02',
    t: 'Ti chiamiamo noi',
    b: 'Verifichiamo che il percorso sia adatto a te, rispondiamo alle tue domande e definiamo i prossimi passi.',
  },
  {
    k: '03',
    t: 'Prima visita in studio',
    b: 'Con un professionista esperto in postura, a San Donato o in Crocetta. Paghi solo dopo, e solo se il percorso è adatto a te.',
  },
]

// Domande frequenti. «nome» e «testo» (solo testo) alimentano anche i dati strutturati per Google (FAQPage).
export const FAQ_ITEMS = [
  {
    id: 'gia-tutto',
    nome: 'Ho già provato di tutto. Perché questa volta dovrebbe andare diversamente?',
    question: (
      <>
        Ho già provato <strong>di tutto</strong>. Perché questa volta dovrebbe andare diversamente?
      </>
    ),
    testo:
      'Perché non partiamo dal punto che fa male. Prima capiamo cosa mantiene la tua postura, poi lavoriamo su quello, poi ti diamo un piano per mantenere il lavoro a casa per 12 mesi. E se il percorso non è adatto a te, lo scopri prima di cominciare: al telefono o, al più tardi, alla prima visita. E in quel caso non paghi niente.',
  },
  {
    id: 'prezzo',
    nome: '299€ non sono pochi. Perché dovrei spenderli?',
    question: (
      <>
        <strong>299€</strong> non sono pochi. Perché dovrei spenderli?
      </>
    ),
    testo:
      'Perché non compri una seduta, ma un percorso completo: una prima visita posturale, 3 sedute di osteopatia di circa un’ora con lo stesso osteopata e 12 mesi di esercizi guidati nell’app. Pensa a quanto hai già speso in soluzioni che hanno aiutato per poco. E non paghi niente in anticipo: paghi dopo la prima visita, solo se il percorso è adatto a te, anche in due rate.',
  },
  {
    id: 'raddrizzare',
    nome: 'Mi raddrizzate?',
    question: (
      <>
        Mi <strong>raddrizzate</strong>?
      </>
    ),
    testo:
      'No, e diffida di chi te lo promette prima di averti visto. Alcune curve sono dell’osso e non cambiano con le mani. Si lavora su quello che si è adattato e si muove ancora. Quanto migliori dipende dal tuo caso, e lo vedi strada facendo.',
  },
  {
    id: 'referto',
    nome: 'Nel referto c’è scoliosi, o mi hanno detto che ho una gamba più corta.',
    question: (
      <>
        Nel referto c’è <em>scoliosi</em>, o mi hanno detto che ho una gamba più corta.
      </>
    ),
    testo:
      'Sono parole che spesso chiudono il discorso troppo presto. Una scoliosi strutturale è dell’osso e si vede sulla lastra: la curva resta anche quando ti pieghi in avanti. Altre volte il corpo si è solo inclinato per stare in equilibrio, e quando ti chini la storta si riduce. Anche per la gamba più corta: a volte la differenza è davvero nelle ossa, e si misura con una lastra. Spesso, invece, è il bacino che si è girato. Alla prima visita capisci in quale caso sei.',
  },
  {
    id: 'telefonata',
    nome: 'Cosa succede quando richiedo il percorso?',
    question: (
      <>
        Cosa succede quando <strong>richiedo il percorso</strong>?
      </>
    ),
    testo:
      'Ti chiamiamo noi, nella fascia oraria che hai scelto. Con un protocollo di domande preciso verifichiamo che il percorso sia adatto al tuo caso, rispondiamo ai tuoi dubbi e definiamo con te i prossimi passi. La telefonata non è una visita e non sostituisce la valutazione in studio. È gratuita e senza impegno.',
  },
  {
    id: 'cosa-include',
    nome: 'Cosa comprende il percorso da 299€?',
    question: (
      <>
        Cosa comprende il percorso da <strong>299€</strong>?
      </>
    ),
    testo:
      'Una prima visita posturale con un professionista esperto in postura. 3 sedute di osteopatia di circa un’ora, distribuite in alcune settimane, sempre con lo stesso osteopata. 12 mesi di app con esercizi e video lezioni scelti per te. Paghi dopo la prima visita, solo se il percorso è adatto a te: in un’unica soluzione o in due rate. Le condizioni delle rate te le spieghiamo in studio.',
  },
  {
    id: 'soddisfatto',
    nome: 'E se il percorso non mi soddisfa?',
    question: (
      <>
        E se il percorso non mi <strong>soddisfa</strong>?
      </>
    ),
    testo:
      'C’è una garanzia precisa: paghi solo dopo la prima visita, e se il percorso non è adatto a te non paghi niente. Non offriamo garanzie sul risultato, perché nessun professionista serio può prometterlo prima di averti seguito. Se durante il percorso qualcosa non ti convince, parlane con il tuo osteopata.',
  },
  {
    id: 'tempo',
    nome: 'Quanto tempo mi serve?',
    question: (
      <>
        Quanto <strong>tempo</strong> mi serve?
      </>
    ),
    testo:
      'Le 3 sedute durano circa un’ora ciascuna e sono distribuite nell’arco di alcune settimane. Gli esercizi dell’app li fai quando puoi, a casa o in pausa. Siamo aperti dal lunedì al venerdì dalle 8 alle 21 e il sabato dalle 9 alle 18, in due sedi.',
  },
  {
    id: 'gia-provato',
    nome: 'Faccio già palestra, posturale o fisioterapia.',
    question: (
      <>
        Faccio già <em>palestra</em>, posturale o fisioterapia.
      </>
    ),
    testo:
      'Continua. Diventare più forte serve, e il sollievo che senti è vero. Il punto è un altro. Se una zona si muove poco, l’esercizio le gira intorno. Il massaggio scioglie il muscolo stanco, ma non tocca il motivo per cui si affatica. Qui si comincia rimettendo in movimento quella zona. Poi l’app ti aiuta a mantenere il lavoro nei giorni in cui non sei in studio.',
  },
  {
    id: 'estetica',
    nome: 'Non ho dolore. Mi dà fastidio solo come mi vedo.',
    question: (
      <>
        Non ho dolore. Mi dà fastidio solo <strong>come mi vedo</strong>.
      </>
    ),
    testo:
      'È un buon motivo per venire: c’è ancora spazio per lavorare. Testa in avanti, spalle chiuse, bacino inclinato: oggi li vedi allo specchio. Lavorarci adesso vuol dire farlo senza un dolore di mezzo.',
  },
  {
    id: 'app',
    nome: 'L’app è un altro video da guardare?',
    question: <>L’app è un altro video da guardare?</>,
    testo:
      'No. Dopo la visita trovi pochi esercizi e video lezioni scelti per il tuo obiettivo, non movimenti presi da internet. Li fai a casa o in pausa, quando puoi, per 12 mesi. L’app non sostituisce le sedute: serve nei giorni in cui non sei in studio, perché il lavoro fatto non si perda.',
  },
  {
    id: 'red-flags',
    nome: 'Quando devo andare prima dal medico?',
    question: (
      <>
        Quando devo andare prima dal <strong>medico</strong>?
      </>
    ),
    // Invariata rispetto all'originale (YtPostura.jsx): segnali d'allarme.
    testo:
      'Vai prima dal medico se non controlli più la pipì o le feci. Se un braccio o una gamba diventa più debole di giorno in giorno. Se il dolore di notte cresce e stai perdendo peso. Se hai la febbre insieme al dolore. Se in poche settimane un lato del corpo è diventato molto più storto. Se il mal di testa arriva all’improvviso, fortissimo, e insieme non vedi bene, non parli bene o non hai forza. In questi casi, prima il medico. Poi, se serve, si vede il resto.',
  },
]

// ——— Tavole interattive (Tavole.jsx) ———
// NUOVO (22/10/2026), da approvare. Le frasi riprendono i testi della pagina (riferimenti accanto);
// l'unico dato nuovo è la stima del carico sul collo (TAVOLA_TESTA.dati), con la fonte citata in pagina.

// Tavola 1 · capitolo Testa. Dati: Hansraj K.K., «Assessment of stresses in the cervical spine caused by
// posture and position of the head», Surgical Technology International 25 (2014): 0° 10–12 lb, 15° 27 lb,
// 30° 40 lb, 45° 49 lb, 60° 60 lb (convertiti in kg e arrotondati). È una stima da modello, non una misura.
export const TAVOLA_TESTA = {
  titolo: 'Quanto pesa la testa, per il collo.',
  testo:
    'La testa pesa circa 5 chili. Finché sta sopra le spalle, il collo la regge senza fatica. Quando scende in avanti è come tenere una borsa con il braccio teso invece che vicino al corpo: il peso è lo stesso, ma lo sforzo cresce.',
  cursore: 'Quanto guardi in basso',
  dati: [
    { gradi: 0, kg: 5 },
    { gradi: 15, kg: 12 },
    { gradi: 30, kg: 18 },
    { gradi: 45, kg: 22 },
    { gradi: 60, kg: 27 },
  ],
  legenda: [
    { id: 'peso', t: 'Peso della testa', b: 'Circa 5 chili. Resta sempre uguale.' },
    { id: 'leva', t: 'Distanza', b: 'Quanto la testa è avanti rispetto al collo. Più guardi in basso, più cresce.' },
    { id: 'collo', t: 'Base del collo', b: 'Il punto che regge la testa. È qui che senti tirare.' },
  ],
  fonte:
    'I chili sono una stima: vengono da uno studio fatto con un modello al computer (K. K. Hansraj, Surgical Technology International, 2014). Cambiano da persona a persona.',
}

// Tavola 2 · capitolo Petto. Riprende il testo del meccanismo (YtPosturaV2, sezione Petto).
// Il riferimento «di lato, orecchio, spalla, anca e caviglia vicini a una verticale» è lo standard dei
// manuali di valutazione posturale (linea di gravità, Kendall).
export const TAVOLA_FILO = {
  titolo: 'Il problema parte dalla testa. E\u00a0arriva fino ai\u00a0piedi.',
  testo:
    'Guarda il corpo di profilo. Quando è allineato, orecchio, spalla, anca e caviglia stanno quasi sulla stessa linea verticale. Sposta il cursore e guarda cosa succede dopo ore a testa bassa: la testa va avanti e il resto del corpo la segue.',
  estremi: ['Allineato', 'Dopo ore a testa bassa'],
  punti: [
    { id: 'testa', t: 'Testa', dritto: 'Sta sopra le spalle.', curvo: 'Va avanti. Il collo si irrigidisce per tenerla su.' },
    { id: 'petto', t: 'Petto', dritto: 'Aperto.', curvo: 'Si chiude, e le spalle cadono in avanti.' },
    { id: 'bacino', t: 'Bacino', dritto: 'Dritto.', curvo: 'Si inclina in avanti: la pancia sporge.' },
    { id: 'piedi', t: 'Piedi', dritto: 'Il peso cade qui.', curvo: 'Restano fermi. È sopra di loro che il corpo si sposta.' },
  ],
  nota: 'Schema anatomico semplificato: proporzioni dell’adulto medio, linea di gravità secondo Kendall (trago, acromion, grande trocantere, davanti al malleolo).',
}

// Tavola 3 · capitolo Bacino. Riprende la domanda frequente sul referto (FAQ_ITEMS «referto»).
export const TAVOLA_OSSO = {
  titolo: 'Scoliosi? Gamba corta? Spesso è un’altra cosa.',
  testo:
    'A volte la schiena è storta perché l’osso stesso è cresciuto curvo: è la scoliosi vera, e con le mani non cambia. Molto più spesso è il corpo che si è messo storto per abitudine. Allo specchio sembrano uguali, ma su questo si può lavorare. Guarda la differenza qui sotto.',
  schede: [
    {
      id: 'curva',
      t: 'Scoliosi vera o postura storta?',
      casi: [
        { id: 'posizione', t: 'Postura storta' },
        { id: 'osso', t: 'Scoliosi vera' },
      ],
      posizioni: ['In piedi', 'Busto in avanti'],
      spiega: {
        posizione: [
          'Le ossa sono normali: è il corpo che si è messo storto, spesso perché il bacino non è in pari.',
          'Quando ti pieghi in avanti, la schiena torna pari. Qui si può lavorare.',
        ],
        osso: [
          'Sono le vertebre stesse a essere curve e girate. È la scoliosi vera: si vede e si misura sulla lastra.',
          'Quando ti pieghi in avanti, un lato della schiena resta più alto: è la gobba. Con le mani questo non cambia.',
        ],
      },
    },
    {
      id: 'gamba',
      t: 'Gamba più corta o bacino storto?',
      casi: [
        { id: 'bacino', t: 'Bacino storto' },
        { id: 'gamba', t: 'Gamba più corta' },
      ],
      spiega: {
        bacino: [
          'Le gambe sono lunghe uguali. È il bacino che si è girato, e così un fianco sembra più alto.',
          'È il caso più frequente, e si può migliorare.',
        ],
        gamba: [
          'Una gamba è davvero più corta: la differenza è nelle ossa.',
          'Succede di rado e si misura con una lastra. Con le mani non cambia.',
        ],
      },
    },
  ],
  sezione:
    'Sotto la figura vedi il torace tagliato a metà, come se lo guardassi da dietro. Lo strumento appoggiato sulla schiena misura se un lato è più alto dell’altro.',
  nota: 'È un disegno per capire, non un test da fare da soli. La differenza la vediamo insieme alla prima visita.',
}

// ——— Titoli dei capitoli (le grandi frasi sul filo) ———
// NUOVO (22/10/2026), da approvare. Sostituiscono «Testa», «Petto», «Bacino», «Piedi».
// Principi di risposta diretta (Dan Kennedy): togliere la colpa, indicare il vero nemico, franchezza,
// rischio zero sul primo passo. Il quarto è vero: la telefonata è gratuita e senza impegno (sezione «piedi»).
export const CAPITOLI_TITOLI = {
  testa: 'Non è pigrizia.',
  petto: 'Il colpevole è altrove.',
  bacino: 'Cosa cambia. E cosa no.',
  piedi: 'Il primo passo è gratis.',
}

// ——— Scompensi su foto reali (Foto.jsx) ———
// NUOVO (22/10/2026), da approvare. Foto del titolare (DSC009xx, fonti nel brief dell'incarico), stessa scala,
// filo dalla caviglia. Sono osservazioni visibili su una foto, non diagnosi.
// Prima della pubblicazione: consenso scritto delle persone ritratte (da verificare).
export const SCOMPENSI = {
  titolo: 'Ti riconosci in una di queste?',
  testo: 'La linea tratteggiata parte dalla caviglia e sale dritta. In una postura allineata l’orecchio sta su quella linea. Nelle altre foto, guarda quanto l’orecchio finisce in avanti rispetto alla linea.',
  foto: [
    { id: 'dritto', t: 'Allineato', riferimento: true },
    { id: 'lui', t: 'Testa avanti' },
    { id: 'sport', t: 'Dorso curvo' },
    { id: 'lei', t: 'Schiena inarcata' },
    { id: 'uomo', t: 'Dorso tondo' },
  ],
  nota: 'Osservazioni su foto in piedi, non diagnosi.',
}

// Foto annotata della prima visita (sezione «piedi»).
export const VISITA = {
  titolo: 'Alla prima visita guardiamo questo.',
  punti: [
    { id: 'filo', t: 'Il filo', b: 'Il peso cade al centro, tra i due piedi?' },
    { id: 'spalle', t: 'Le spalle', b: 'Sono alla stessa altezza?' },
    { id: 'bacino', t: 'Il bacino', b: 'È dritto, o un fianco è più alto?' },
  ],
  nota: 'Poi di lato e in movimento: dove cade la testa, cosa si muove e cosa no. Alla fine sai da dove partire.',
}

// Foto dell'obiettivo (sezione «bacino»).
export const OBIETTIVO = {
  righe: ['Testa sopra le spalle.', 'Petto aperto.', 'Bacino dritto.'],
  chiusa: 'Senza doverci pensare.',
  alt: 'Persona in piedi di profilo, con l’orecchio sopra la caviglia, nello studio Mobilitas',
}

// Domande mostrate (in quest'ordine) e usate nei dati strutturati: quelle che tengono indecisi, più il medico
// (obbligatoria per le regole sanitarie). Le altre restano in FAQ_ITEMS, non mostrate. Scelta del 23/10/2026, da approvare.
export const FAQ_SCELTE = ['gia-tutto', 'prezzo', 'raddrizzare', 'telefonata', 'soddisfatto', 'red-flags']

// Mappa delle sedi (Foto.jsx · MappaTorino). Coordinate delle sedi: dati strutturati di YtPosturaV2.jsx (JSON-LD).
// Punti di riferimento (coordinate pubbliche approssimate): stazioni Porta Susa e Porta Nuova, piazza Castello, il Po.
export const MAPPA = {
  sedi: [
    { id: 'sanDonato', nome: 'San Donato', via: 'Via Peyron 54', lat: 45.0802312, lon: 7.6577188 },
    { id: 'crocetta', nome: 'Crocetta', via: 'Via Lamarmora 35', lat: 45.0593749, lon: 7.6660428 },
  ],
  riferimenti: [
    { nome: 'Porta Susa', lat: 45.0719, lon: 7.6655 },
    { nome: 'Porta Nuova', lat: 45.0620, lon: 7.6785 },
    { nome: 'Piazza Castello', lat: 45.0711, lon: 7.6856 },
  ],
  po: [[45.0830, 7.7085], [45.0745, 7.7030], [45.0665, 7.6965], [45.0605, 7.6925], [45.0545, 7.6895], [45.0470, 7.6880]],
  nota: 'Tocca una sede per aprirla in Google Maps.',
}

export const RECENSIONI_CAROSELLO = { quante: 8, scorri: 'Scorri per leggerne altre' }
