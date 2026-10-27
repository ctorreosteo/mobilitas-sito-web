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
    intro: 'Scegli la sede più comoda tra San Donato e Crocetta: apri le indicazioni con un clic.',
  },
  faq: {
    kicker: 'Hai domande?',
    title: { main: 'Le domande che ci fate più spesso', accent: 'prima della prenotazione.' },
    intro: 'Risposte dirette, senza promesse facili e senza scorciatoie comunicative.',
  },
}

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
