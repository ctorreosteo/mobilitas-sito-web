import { parseCellulare } from '../../utils/phone'
import { salvaRichiesta } from '../prenota-visita/richiestaSalvata'
import { PRIMA_VISITA_AMICO } from '../black-friday/offerta'

// Invito "porta un amico" del Black Friday 2026 (/black-friday-2026-amico): link personale e richiesta al gestionale.
// Segue la guida interna «Richieste API · 1. Porta un amico» (formazione, aggiornata al 16/11/2026): se la guida cambia
// (per esempio quando arriva il collegamento automatico al paziente che invita), aggiornare qui.
//
// ——— Il link personale ———
// Il gestionale manda a ogni paziente (campagne WhatsApp e SMS) un link con il suo codice:
//   https://www.studiomobilitas.it/black-friday-2026-amico?code=K7P2M9QX4D
// Il codice: 10 caratteri, maiuscole e cifre, casuale (non contiene dati del paziente). Può mancare o essere vuoto
// (messaggio a un numero che non è di un paziente); «PROVA» è il codice dei messaggi di prova e non è valido.
// Il parametro si chiama sempre «code». /amico rimanda qui tenendo i parametri (App.jsx).

// In sviluppo '' (proxy di Vite → gestionale locale), in produzione VITE_API_BASE: la stessa base di BookingPopup.jsx
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

const CHIAVE_SESSIONE = 'codiceInvito'

const leggiSessione = () => {
  try {
    return sessionStorage.getItem(CHIAVE_SESSIONE) || ''
  } catch {
    return '' // navigazione privata o storage bloccato: la pagina funziona lo stesso
  }
}

const scriviSessione = (codice) => {
  try {
    sessionStorage.setItem(CHIAVE_SESSIONE, codice)
  } catch {
    // vedi sopra
  }
}

export const dimenticaCodice = () => {
  try {
    sessionStorage.removeItem(CHIAVE_SESSIONE)
  } catch {
    // vedi sopra
  }
}

// Passo 1 (guida): il codice dall'indirizzo, senza spazi e in maiuscolo, tenuto per tutta la visita in sessionStorage
// (l'amico può cambiare pagina prima del form). Poi lo toglie dalla barra degli indirizzi: il codice identifica un
// paziente e non deve finire negli strumenti esterni (Analytics, Meta Pixel) che registrano l'indirizzo della pagina.
export function leggiCodice() {
  if (typeof window === 'undefined') return ''
  const url = new URL(window.location.href)
  const codice = (url.searchParams.get('code') || '').trim().toUpperCase()
  if (codice) scriviSessione(codice)
  if (url.searchParams.has('code')) {
    url.searchParams.delete('code')
    window.history.replaceState(window.history.state, '', url.toString())
  }
  return codice || leggiSessione()
}

// Passo 2 (guida): chi ha invitato. GET senza autenticazione; il gestionale risponde sempre 200 e il codice è buono solo
// se data.valido è true. nomeInvitante può essere null anche con un codice valido.
// Codice assente, non valido o gestionale che non risponde: null (pagina normale, nessuna riga nella richiesta).
// Una sola chiamata per codice, anche se la pagina si monta due volte (StrictMode in sviluppo).
const chiamate = new Map()

export function chiediInvito(codice) {
  if (!codice) return Promise.resolve(null)
  if (!chiamate.has(codice)) {
    chiamate.set(
      codice,
      (async () => {
        try {
          const risposta = await fetch(`${API_BASE}/api/sito/invito/${encodeURIComponent(codice)}`)
          if (!risposta.ok) return null
          const json = await risposta.json()
          return json.data && json.data.valido ? json.data : null
        } catch {
          return null
        }
      })(),
    )
  }
  return chiamate.get(codice)
}

// ——— La richiesta ———
// Come il popup condiviso (components/BookingPopup.jsx), con i valori di questa campagna:
//   - lead magnet COUPON49 (prima visita 49€ invece di 90€), richiesto e assegnato;
//   - tag «blackfriday» (testo libero: il gestionale accetta qualunque tag);
//   - nota con la campagna e l'orario scelto; con un invito valido, in fondo e su una riga nuova, la riga della guida:
//     «Porta un amico — invitato da Mario (codice K7P2M9QX4D)», senza nome «Porta un amico — codice K7P2M9QX4D».
// Nessuna fonte (deciso il 17/11/2026: niente REFERRAL). Codice assente o non valido: nessuna riga dell'invito.
// Il gestionale ignora in silenzio un lead magnet con un nome che non esiste: usare solo nomi presenti.
// Il collegamento automatico fra la richiesta e il paziente che invita arriverà più avanti (guida, passo 4): per ora
// la segreteria lo fa dalla nota.

export const PAGE_CONTEXT = 'black-friday-2026-amico'
export const LEAD_MAGNET = 'COUPON49'
export const TAG = 'blackfriday'

// Fasce orarie: stessi valori e testi del popup condiviso (nella nota va il testo)
export const ORARI = [
  { value: 'mattina', label: 'Mattina (9:00 – 12:00)' },
  { value: 'pausa-pranzo', label: 'Pausa pranzo (13:00 – 14:00)' },
  { value: 'pomeriggio', label: 'Pomeriggio (14:00 – 18:00)' },
  { value: 'sera', label: 'Sera (18:00 – 20:00)' },
  { value: 'qualsiasi', label: 'Qualsiasi orario' },
]

const cleanName = (name) =>
  name
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

// Riga della guida (passo 4), solo con un invito valido. Con il nome: «Porta un amico — invitato da Mario (codice X)»;
// senza nome: «Porta un amico — codice X» (come scritto nel testo della guida; il suo esempio di codice metteva le
// parentesi anche senza nome).
export const notaInvito = (invito) => {
  if (!invito) return ''
  return invito.nomeInvitante
    ? `Porta un amico — invitato da ${invito.nomeInvitante} (codice ${invito.codice})`
    : `Porta un amico — codice ${invito.codice}`
}

// invito: la risposta del gestionale con valido = true, oppure null
export function costruisciRichiesta(form, invito) {
  const orario = ORARI.find((o) => o.value === form.orarioChiamata)?.label
  const base = [`Black Friday 2026 · Prima visita ${PRIMA_VISITA_AMICO}€`, orario && `Orario richiesta: ${orario}`]
    .filter(Boolean)
    .join(' · ')
  const riga = notaInvito(invito)
  const { prefissoCellulare, cellulare } = parseCellulare(form.cellulare)
  return {
    nome: cleanName(form.nome),
    cognome: cleanName(form.cognome),
    prefissoCellulare,
    cellulare,
    statusRichiesta: 'LEAD',
    leadMagnetString: LEAD_MAGNET,
    leadMagnetRequestedString: LEAD_MAGNET,
    tags: [TAG],
    // Guida, passo 4: la riga dell'invito in fondo alle note, su una riga nuova
    note: riga ? `${base}\n${riga}` : base,
  }
}

// Invio. Dopo il successo la pagina di conferma (/conferma-richiesta) mostra il calendario della prima visita a 49€,
// come per le landing dei dolori (id e token della risposta).
export async function inviaRichiesta(body) {
  const response = await fetch(`${API_BASE}/api/richieste`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  // Risposta vuota o non JSON (gestionale spento, indirizzo sbagliato): un messaggio comprensibile, non un errore tecnico
  const json = await response.json().catch(() => null)
  if (!json?.success) {
    throw new Error(
      json?.error || json?.message || `Non siamo riusciti a inviare la richiesta (errore ${response.status}). Riprova tra poco.`,
    )
  }
  // Guida, passo 4: dopo l'invio il codice si può togliere dalla sessione
  dimenticaCodice()
  salvaRichiesta({
    pageContext: PAGE_CONTEXT,
    id: json.data?.id ?? null,
    token: json.data?.tokenPrenotazione ?? null,
    tipo: 'primaVisita',
    nome: body.nome,
  })
  return json
}
