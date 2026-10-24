import { RECENSIONI_TOTALI } from '../../data/studi'

// Testi condivisi da tutte le landing di patologia (verbatim dalle pagine originali).
// Ogni pagina può sovrascriverli nel proprio config (es. /yt-postura).
const DEFAULTS = {
  cta: {
    visit: { short: 'Prima visita a 49€', long: 'Prima visita a 49€' },
    consulto: { short: 'Consulto gratuito', long: 'Consulto telefonico gratuito' },
  },
  price: {
    old: null,
    value: '49€',
    note: 'visita di 1h',
    tag: (
      <>
        Solo <b>40 posti</b> al mese
      </>
    ),
    tagTone: 'scarcity',
  },
  addresses: ['Via Peyron 54, Torino (San Donato)', 'Via Lamarmora 35, Torino (Crocetta)'],
  pain: { kicker: 'I sintomi più comuni' },
  mechanism: { kicker: 'Il trattamento' },
  reviews: {
    kicker: 'Recensioni',
    title: { main: `Oltre ${RECENSIONI_TOTALI} recensioni tra i nostri due studi.`, accent: 'Recensioni reali.' },
    intro:
      'Prima di iniziare meriti certezze: centinaia di pazienti hanno già percorso la stessa strada e condiviso la loro esperienza, così puoi affidarti con più tranquillità.',
  },
  visit: {
    kicker: 'Come funziona',
    title: { main: 'Cosa succede quando', accent: 'prenoti' },
    intro: 'Niente percorsi nebulosi: sai esattamente cosa facciamo, in che ordine e con quale razionale clinico.',
  },
  locations: {
    kicker: 'le nostre sedi.',
    title: { main: 'Due studi a', accent: 'Torino' },
    intro: 'Scegli la sede piu comoda tra San Donato e Crocetta: accesso rapido con metro, mezzi e auto.',
    metro: 'Entrambe le sedi sono raggiungibili in metro: San Donato (Bernini o Principi d’Acaja), Crocetta (fermata Crocetta).',
    parkingTitle: 'Parcheggio vicino a entrambe le sedi',
    parkingNote: 'Parcheggi nelle vicinanze e strisce blu',
  },
  faq: {
    kicker: 'Hai domande?',
    title: { main: 'Le domande che ci fate più spesso', accent: 'prima della prenotazione.' },
    intro: 'Risposte dirette, senza promesse facili e senza scorciatoie comunicative.',
  },
}

export const MAPS = [
  {
    label: 'San Donato — Via Peyron 54',
    title: 'Mobilitas — San Donato, Via Peyron 54',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.274078923546!2d7.65514387704107!3d45.08023495897442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe2e29f381fdc93%3A0x97eee174cab07ada!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Osteopata%20Torino!5e0!3m2!1sit!2sit!4v1760785981478!5m2!1sit!2sit',
  },
  {
    label: 'Crocetta — Via Lamarmora 35',
    title: 'Mobilitas — Crocetta, Via Lamarmora 35',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2818.3024747731265!2d7.666042812749457!3d45.0593748602363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d57f00fa44f%3A0x510e3404feb8af98!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Crocetta!5e0!3m2!1sit!2sit!4v1784309089765!5m2!1sit!2sit',
  },
]

// Unisce i default con il config della pagina (un livello di profondità per sezione)
export const withDefaults = (page) => {
  const out = { ...page }
  for (const k of ['pain', 'mechanism', 'reviews', 'visit', 'locations', 'faq']) {
    out[k] = { ...DEFAULTS[k], ...(page[k] || {}) }
  }
  out.cta = { ...DEFAULTS.cta, ...(page.cta || {}) }
  out.hero = { ...page.hero, price: { ...DEFAULTS.price, ...(page.hero.price || {}) }, addresses: DEFAULTS.addresses }
  return out
}
