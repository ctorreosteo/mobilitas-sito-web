// Richiesta al gestionale per la landing /yt-postura-v2.
// È la STESSA richiesta che il popup condiviso (src/components/BookingPopup.jsx) invia per pageContext "yt-postura":
// stesso indirizzo, stessi campi, stessi valori. Copiata riga per riga (riferimenti accanto) per non toccare il
// componente condiviso, come autorizzato dal titolare il 21/10/2026.
// Se cambia la logica del popup condiviso per "yt-postura", va aggiornata anche qui.

// BookingPopup.jsx:20
export const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

// BookingPopup.jsx:7-11
export const cleanName = (name) => {
  return name.trim().replace(/\s+/g, ' ').split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

// BookingPopup.jsx:13-15
const cleanPhone = (phone) => {
  return phone.trim().replace(/\s+/g, '')
}

// BookingPopup.jsx:22-36
export function parseCellulare(raw) {
  const s = cleanPhone(raw).replace(/[-.]/g, '')
  if (!s) return { prefissoCellulare: '+39', cellulare: '' }
  if (s.startsWith('+')) {
    const match = s.match(/^(\+\d{1,4})(\d+)$/)
    if (match) return { prefissoCellulare: match[1], cellulare: match[2] }
    const digits = s.replace(/\D/g, '')
    const pref = digits.length >= 2 ? '+' + digits.slice(0, 2) : '+39'
    const num = digits.slice(2).replace(/^0+/, '') || digits
    return { prefissoCellulare: pref, cellulare: num }
  }
  const digits = s.replace(/\D/g, '')
  return { prefissoCellulare: '+39', cellulare: digits }
}

// Fasce orarie: stessi valori e stessi testi delle <option> di BookingPopup.jsx:441-446.
// Nella nota va il TESTO della fascia, come fa l'originale (BookingPopup.jsx:219-221, 298).
export const FASCE_ORARIE = [
  { value: 'mattina', testo: 'Mattina (9:00 – 12:00)', nome: 'Mattina', ore: '9:00 – 12:00' },
  { value: 'pausa-pranzo', testo: 'Pausa pranzo (13:00 – 14:00)', nome: 'Pausa pranzo', ore: '13:00 – 14:00' },
  { value: 'pomeriggio', testo: 'Pomeriggio (14:00 – 18:00)', nome: 'Pomeriggio', ore: '14:00 – 18:00' },
  { value: 'sera', testo: 'Sera (18:00 – 20:00)', nome: 'Sera', ore: '18:00 – 20:00' },
  { value: 'qualsiasi', testo: 'Qualsiasi orario', nome: 'Qualsiasi orario', ore: '' },
]

// Corpo della richiesta: BookingPopup.jsx:223-299 con pageContext = 'yt-postura'.
//   isLandingVisita('yt-postura') = true  → con ctaType 'consulto' il lead magnet è CT_GRATUITA,
//   altrimenti LISTA_ATTESA_YT_POSTURA; isPainLanding = false (nessun leadMagnetRequestedString);
//   fonte YOUTUBE, campagna «YouTube | Percorso posturale», tag «Lista attesa percorso YouTube»;
//   nessun ID Meta (yt-postura non è nell'elenco metaAdLandingContexts).
//
// Modifiche del 22/10/2026, su parametri confermati dal titolare, solo per la telefonata gratuita («consulto»,
// l'unica modalità usata dalla pagina):
//   - campagna lasciata vuota (non inviata: la landing GPadel già non la invia, quindi il gestionale la accetta);
//   - leadMagnetRequestedString 'CT_GRATUITA' (le landing sul dolore lo inviano già con lo stesso valore).
// IN SOSPESO, da verificare sul gestionale prima di attivarli (nessuna pagina del sito li usa oggi):
//   fonteString 'CONTENT' (oggi resta 'YOUTUBE') e tags ['TAG_DOLORE_POSTURA'] (il sito invia sempre «tag»,
//   testo singolo; resta quello di yt-postura).
export function costruisciRichiesta(form, ctaType) {
  const fascia = FASCE_ORARIE.find((f) => f.value === form.orarioChiamata)
  const orarioText = fascia ? fascia.testo : form.orarioChiamata
  const { prefissoCellulare, cellulare } = parseCellulare(form.cellulare)
  const consulto = ctaType === 'consulto'
  return {
    nome: cleanName(form.nome),
    cognome: cleanName(form.cognome),
    prefissoCellulare,
    cellulare,
    statusRichiesta: 'LEAD',
    fonteString: 'YOUTUBE',
    leadMagnetString: consulto ? 'CT_GRATUITA' : 'LISTA_ATTESA_YT_POSTURA',
    ...(consulto ? { leadMagnetRequestedString: 'CT_GRATUITA' } : { campagna: 'YouTube | Percorso posturale' }),
    tag: 'Lista attesa percorso YouTube',
    note: orarioText ? `Orario richiesta: ${orarioText}` : undefined,
  }
}

// Invio: BookingPopup.jsx:302-312. Pagina di conferma dopo il successo: BookingPopup.jsx:319.
export const PAGINA_CONFERMA = '/conferma-richiesta'
export async function inviaRichiesta(body) {
  const response = await fetch(`${API_BASE}/api/richieste`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await response.json()
  if (!json.success) {
    throw new Error(json.error || json.message || `Errore ${response.status}`)
  }
  return json
}
