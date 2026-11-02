// Richiesta al gestionale per la landing /yt-postura-v2.
// Nata come copia della richiesta del popup condiviso (src/components/BookingPopup.jsx, pageContext "yt-postura"):
// pulizia di nome e numero e indirizzo sono gli stessi. Dal 02/11/2026 i valori (fonte, tag, lead magnet, nota)
// sono propri di questa landing: vedi costruisciRichiesta. Il popup condiviso non è stato toccato.

import { dimenticaRichiesta } from '../../components/prenota-visita/richiestaSalvata'

// Gestionale pubblicato (lo stesso indirizzo che usa il sito online: hq.studiomobilitas.it/api non è il gestionale,
// risponde con la pagina web).
const GESTIONALE_PUBBLICATO = 'https://mobilitas-backend-990845221858.europe-west8.run.app'

// Dove vanno le richieste di questa landing, anche in locale (npm run dev): il gestionale pubblicato, così le prove
// arrivano dove lavora lo studio (scelta del titolare, 02/11/2026). Attenzione: sono richieste vere.
// Per mandarle al gestionale locale (localhost:8080, tramite il proxy di Vite) aprire la pagina con ?gestionale=locale.
const gestionaleLocale = () =>
  import.meta.env.DEV &&
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('gestionale') === 'locale'
export const apiRichieste = () => (gestionaleLocale() ? '' : import.meta.env.VITE_API_BASE || GESTIONALE_PUBBLICATO)

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

// Corpo della richiesta. Due tipi, decisi dal titolare il 02/11/2026:
//   - «percorso»: chi chiede subito di iniziare il percorso da 299€ (lista d'attesa del percorso);
//   - «consulto»: chi chiede prima la telefonata gratuita.
// Uguale per entrambi: fonte CONTENT, tag TAG_DOLORE_POSTURA, nota che dice sempre da dove arriva e cosa chiede.
// Lead magnet: CT_GRATUITA solo per la telefonata; il percorso per ora non ne ha (scelta in sospeso del titolare).
// Il gestionale cerca fonte e lead magnet per nome e ignora in silenzio i nomi che non esistono
// (RichiestaController, findByNome): usare solo nomi presenti nel gestionale.
// Il gestionale riduce la nota a una riga (spazi e a capo diventano uno spazio): le parti si separano con « · ».
export const TIPI_RICHIESTA = {
  percorso: {
    nota: 'Percorso posturale 299€ · Vuole iniziare subito il percorso (lista d’attesa) · Landing YouTube /yt-postura-v2',
  },
  consulto: {
    nota: 'Percorso posturale 299€ · Chiede la telefonata gratuita prima di iniziare · Landing YouTube /yt-postura-v2',
    leadMagnetString: 'CT_GRATUITA',
    leadMagnetRequestedString: 'CT_GRATUITA',
  },
}

export function costruisciRichiesta(form, tipo) {
  const t = TIPI_RICHIESTA[tipo] ?? TIPI_RICHIESTA.percorso
  const fascia = FASCE_ORARIE.find((f) => f.value === form.orarioChiamata)
  const orarioText = fascia ? fascia.testo : form.orarioChiamata
  const { prefissoCellulare, cellulare } = parseCellulare(form.cellulare)
  return {
    nome: cleanName(form.nome),
    cognome: cleanName(form.cognome),
    prefissoCellulare,
    cellulare,
    statusRichiesta: 'LEAD',
    fonteString: 'CONTENT',
    ...(t.leadMagnetString && { leadMagnetString: t.leadMagnetString }),
    ...(t.leadMagnetRequestedString && { leadMagnetRequestedString: t.leadMagnetRequestedString }),
    tags: ['TAG_DOLORE_POSTURA'],
    note: orarioText ? `${t.nota} · Orario richiesta: ${orarioText}` : t.nota,
  }
}

// Invio: BookingPopup.jsx:302-312. Pagina di conferma dopo il successo: BookingPopup.jsx:319.
export const PAGINA_CONFERMA = '/conferma-richiesta'
export async function inviaRichiesta(body) {
  const response = await fetch(`${apiRichieste()}/api/richieste`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await response.json()
  if (!json.success) {
    throw new Error(json.error || json.message || `Errore ${response.status}`)
  }
  // Lista d'attesa, non un dolore: la conferma resta generica anche se prima era stato inviato un altro form
  dimenticaRichiesta()
  return json
}
