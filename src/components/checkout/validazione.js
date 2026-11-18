// Controlli dei dati di fatturazione della pagina di pagamento: gli stessi del gestionale
// (OrdineOnlineService.compilaFatturazione), che li rifà comunque.

const DISPARI = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23]
const FORMATO_CF = /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$/

export const pulisciCodiceFiscale = (v) => v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16)

// Codice fiscale di persona fisica, con il carattere di controllo giusto (anche con omocodia)
export function codiceFiscaleValido(cf) {
  if (!FORMATO_CF.test(cf)) return false
  let somma = 0
  for (let i = 0; i < 15; i += 1) {
    const c = cf[i]
    const v = c >= '0' && c <= '9' ? c.charCodeAt(0) - 48 : c.charCodeAt(0) - 65
    somma += i % 2 === 0 ? DISPARI[v] : v
  }
  return String.fromCharCode(65 + (somma % 26)) === cf[15]
}

const ITALIA = ['italia', 'italy', 'it']

// campi: { nome, cognome, codiceFiscale, email, cellulare, indirizzo, cap, citta, nazione, consensoPrivacy }
// → { campo: messaggio } solo per i campi sbagliati
export function errori(c) {
  const e = {}
  const vuoto = (v) => !v || !String(v).trim()
  if (vuoto(c.nome)) e.nome = 'Scrivi il tuo nome'
  if (vuoto(c.cognome)) e.cognome = 'Scrivi il tuo cognome'
  if (vuoto(c.codiceFiscale)) e.codiceFiscale = 'Serve il codice fiscale'
  else if (c.codiceFiscale.length !== 16) e.codiceFiscale = 'Il codice fiscale ha 16 caratteri'
  else if (!codiceFiscaleValido(c.codiceFiscale)) e.codiceFiscale = 'Questo codice fiscale non torna: controllalo'
  if (vuoto(c.email)) e.email = "Serve l'email: ti mandiamo lì la conferma"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email.trim())) e.email = "L'email non sembra giusta"
  const cell = (c.cellulare || '').replace(/[\s./()-]/g, '')
  if (!cell) e.cellulare = 'Serve il cellulare: la segreteria ti contatta qui per le visite'
  else if (!/^\+?[0-9]{6,15}$/.test(cell)) e.cellulare = 'Il numero non sembra giusto'
  if (vuoto(c.indirizzo)) e.indirizzo = 'Scrivi via e numero civico'
  const italia = ITALIA.includes((c.nazione || '').trim().toLowerCase())
  if (vuoto(c.cap)) e.cap = 'Serve il CAP'
  else if (italia ? !/^[0-9]{5}$/.test(c.cap.trim()) : !/^[A-Za-z0-9 -]{3,10}$/.test(c.cap.trim())) e.cap = 'CAP non valido'
  if (vuoto(c.citta)) e.citta = 'Scrivi la città'
  if (vuoto(c.nazione)) e.nazione = 'Scrivi la nazione'
  if (!c.consensoPrivacy) e.consensoPrivacy = "Per continuare serve accettare l'informativa"
  return e
}
