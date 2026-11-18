// Ricevuta dell'ultimo pagamento, passata dalla pagina di pagamento a quella di conferma
// (/black-friday-2026/pagamento → /black-friday-2026/grazie) in sessionStorage, come richiestaSalvata.js per
// /conferma-richiesta: niente dati nell'indirizzo, niente endpoint pubblici. Resta finché la scheda è aperta, così la
// conferma regge il ricaricamento; dopo un giorno non vale più.
// tracciata: le conversioni (Meta Purchase, Google Ads) sono già partite per questo ordine, non si ripetono.

const CHIAVE = 'mobilitas_ricevuta_black_friday'
const VALIDITA_MS = 24 * 60 * 60 * 1000

export function salvaRicevuta(ricevuta) {
  try {
    sessionStorage.setItem(CHIAVE, JSON.stringify({ ...ricevuta, salvataIl: Date.now(), tracciata: false }))
    return true
  } catch {
    return false
  }
}

export function leggiRicevuta() {
  try {
    const r = JSON.parse(sessionStorage.getItem(CHIAVE) || 'null')
    if (!r || !r.numero || Date.now() - (r.salvataIl || 0) > VALIDITA_MS) return null
    return r
  } catch {
    return null
  }
}

export function segnaTracciata() {
  try {
    const r = JSON.parse(sessionStorage.getItem(CHIAVE) || 'null')
    if (r) sessionStorage.setItem(CHIAVE, JSON.stringify({ ...r, tracciata: true }))
  } catch {
    // storage bloccato: al massimo la conversione si ripete al ricaricamento
  }
}
