import { parseCellulare } from '../../utils/phone'
import { salvaRichiesta } from '../prenota-visita/richiestaSalvata'
import { PRIMA_VISITA_AMICO } from '../black-friday/offerta'

// Invito "porta un amico" del Black Friday 2026 (/black-friday-2026-amico): link personale e richiesta al gestionale.
//
// ——— Il link personale ———
// Il paziente riceve per messaggio il suo link e lo inoltra all'amico. Formato (deciso il 16/11/2026):
//   https://www.studiomobilitas.it/black-friday-2026-amico?code=K7P2M9QX4D
// «code» è il codice personale del paziente: non si mostra, finisce solo nella nota della richiesta, così la segreteria
// sa chi ha invitato (e a chi spetta la visita gratis). Facoltativo &nome=<nome del paziente>: con quello la pagina
// dice «Mario ti ha invitato», senza dice «Un amico». Si accettano anche ?invito=, ?ref= e ?codice= al posto di ?code=.
// /amico rimanda qui tenendo i parametri (App.jsx).

const pulisciCodice = (v) => (v || '').trim().replace(/[^\w-]/g, '').slice(0, 40)

// Solo lettere, spazi, apostrofi e trattini; prima lettera maiuscola. Un nome strano non deve finire in pagina.
const pulisciNome = (v) => {
  const n = (v || '').trim().replace(/\s+/g, ' ')
  if (!n || n.length > 30 || !/^[\p{L}' -]+$/u.test(n)) return ''
  return n
    .split(' ')
    .map((w) => w.charAt(0).toLocaleUpperCase('it') + w.slice(1).toLocaleLowerCase('it'))
    .join(' ')
}

export function leggiInvito() {
  if (typeof window === 'undefined') return { codice: '', nome: '' }
  const p = new URLSearchParams(window.location.search)
  return {
    codice: pulisciCodice(p.get('code') || p.get('invito') || p.get('ref') || p.get('codice')),
    nome: pulisciNome(p.get('nome')),
  }
}

// ——— La richiesta ———
// Come il popup condiviso (components/BookingPopup.jsx), con i valori di questa campagna:
//   - lead magnet COUPON49 (prima visita 49€ invece di 90€), richiesto e assegnato;
//   - tag «blackfriday» (testo libero: il gestionale accetta qualunque tag);
//   - fonte REFERRAL («Referral e raccomandazioni» nel gestionale);
//   - nota con la campagna, chi ha invitato (codice e nome dal link) e l'orario scelto.
// Il gestionale ignora in silenzio fonte e lead magnet con un nome che non esiste: usare solo nomi presenti.
// Il collegamento automatico al paziente che invita (oggetto «referral» della richiesta) qui non si usa: il gestionale
// lo accetta solo se la richiesta ha già un paziente, e dal form pubblico non ce l'ha. Lo fa la segreteria dalla nota.

// In sviluppo '' (proxy di Vite → gestionale locale), in produzione VITE_API_BASE: come BookingPopup.jsx
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

export const PAGE_CONTEXT = 'black-friday-2026-amico'
export const LEAD_MAGNET = 'COUPON49'
export const TAG = 'blackfriday'
export const FONTE = 'REFERRAL'

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

export function costruisciRichiesta(form, invito) {
  const orario = ORARI.find((o) => o.value === form.orarioChiamata)?.label
  const daChi = [invito.nome, invito.codice && `codice ${invito.codice}`].filter(Boolean).join(', ')
  // Il gestionale riduce la nota a una riga: le parti si separano con « · »
  const note = [
    `Black Friday 2026 · Porta un amico · Prima visita ${PRIMA_VISITA_AMICO}€`,
    daChi ? `Invitato da: ${daChi}` : 'Invito senza codice (pagina aperta senza link personale)',
    orario && `Orario richiesta: ${orario}`,
  ]
    .filter(Boolean)
    .join(' · ')
  const { prefissoCellulare, cellulare } = parseCellulare(form.cellulare)
  return {
    nome: cleanName(form.nome),
    cognome: cleanName(form.cognome),
    prefissoCellulare,
    cellulare,
    statusRichiesta: 'LEAD',
    fonteString: FONTE,
    leadMagnetString: LEAD_MAGNET,
    leadMagnetRequestedString: LEAD_MAGNET,
    tags: [TAG],
    note,
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
  salvaRichiesta({
    pageContext: PAGE_CONTEXT,
    id: json.data?.id ?? null,
    token: json.data?.tokenPrenotazione ?? null,
    tipo: 'primaVisita',
    nome: body.nome,
  })
  return json
}
