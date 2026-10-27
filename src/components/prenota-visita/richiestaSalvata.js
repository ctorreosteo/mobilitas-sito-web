// La richiesta appena inviata dal form, per la pagina di conferma: pageContext (da quale landing arriva),
// id e token per prenotare, tipo ('primaVisita' | 'consulto'). Sta in sessionStorage così l'URL della
// conferma resta sempre lo stesso e la pagina sopravvive a un ricarica.
const CHIAVE = 'mx-richiesta-inviata'
const CHIAVE_PRENOTATA = 'mx-visita-prenotata'

const leggi = (chiave) => {
  try {
    const v = sessionStorage.getItem(chiave)
    return v ? JSON.parse(v) : null
  } catch {
    return null
  }
}

const scrivi = (chiave, valore) => {
  try {
    sessionStorage.setItem(chiave, JSON.stringify(valore))
  } catch {
    // Navigazione privata o storage bloccato: la conferma funziona lo stesso, generica e senza calendario
  }
}

const togli = (chiave) => {
  try {
    sessionStorage.removeItem(chiave)
  } catch {
    // vedi sopra
  }
}

export const salvaRichiesta = (richiesta) => {
  scrivi(CHIAVE, richiesta)
  togli(CHIAVE_PRENOTATA)
}

// Per i form che non vengono da una landing di un dolore: la conferma non deve mostrare quella precedente
export const dimenticaRichiesta = () => {
  togli(CHIAVE)
  togli(CHIAVE_PRENOTATA)
}

export const leggiRichiesta = () => leggi(CHIAVE)

export const salvaPrenotata = (visita) => scrivi(CHIAVE_PRENOTATA, visita)

export const leggiPrenotata = () => leggi(CHIAVE_PRENOTATA)
