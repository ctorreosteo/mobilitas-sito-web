// Pagina di pagamento: chiamate al gestionale (/api/sito/checkout). In sviluppo '' (proxy di Vite → gestionale
// locale, che non incassa mai soldi veri: pagamento simulato o sandbox PayPal), in produzione VITE_API_BASE come
// BookingPopup.jsx. L'importo lo decide il gestionale: qui non si manda mai un prezzo.
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')
const BASE = `${API_BASE}/api/sito/checkout`

// Errore del gestionale col messaggio da mostrare; rifiutato = carta o PayPal hanno detto no (si può riprovare)
export class ErroreCheckout extends Error {
  constructor(message, { rifiutato = false } = {}) {
    super(message)
    this.rifiutato = rifiutato
  }
}

async function chiama(url, options) {
  let res
  try {
    res = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) } })
  } catch {
    throw new ErroreCheckout('Connessione assente. Controlla la rete e riprova.')
  }
  let body = null
  try {
    body = await res.json()
  } catch {
    body = null
  }
  if (!res.ok || !body?.success) {
    throw new ErroreCheckout(body?.message || 'Qualcosa non ha funzionato. Riprova tra poco.', {
      rifiutato: res.status === 402,
    })
  }
  return body.data
}

// { codice, nome, descrizione, importo, valuta, validaFino, disponibile, motivo, ambiente, paypalClientId }
export const leggiOfferta = (codice) => chiama(`${BASE}/offerte/${encodeURIComponent(codice)}`)

// dati: { offerta, pagatoCon (CARTA, PAYPAL, PAYPAL_RATE: il bottone scelto), nome, cognome, indirizzo, citta, cap, nazione, codiceFiscale, email, cellulare, consensoPrivacy }
// → { ordine, paypalOrderId, ambiente }
export const creaOrdine = (dati) => chiama(`${BASE}/ordini`, { method: 'POST', body: JSON.stringify(dati) })

// → { numero, stato, descrizione, importo, metodoPagamento (sempre «PayPal»), pagatoCon, nome, email, pagatoIl, ambiente }
export const confermaOrdine = (ordine, paypalOrderId, simulaRifiuto = false) =>
  chiama(`${BASE}/ordini/${encodeURIComponent(ordine)}/conferma`, {
    method: 'POST',
    body: JSON.stringify({ paypalOrderId, simulaRifiuto }),
  })
