// Tracker della heatmap interna: registra click e profondità di scroll e li invia a gruppi
// al gestionale (POST /api/sito/eventi). Nessun cookie, nessun testo digitato, nessuna query string.
// Contratto del payload: docs/heatmap/SPEC.md

import { HEATMAP_BUILD, HEATMAP_ENDPOINT, HEATMAP_SAMPLE, dispositivoDa, normalizzaPagina } from './heatmapConfig'

const VERSIONE_PAYLOAD = 1
const MAX_EVENTI_BUFFER = 30
const INTERVALLO_INVIO_MS = 10_000
const MAX_CARATTERI_PAYLOAD = 15_000
const DURATA_MINIMA_MS = 1_000
const CHIAVE_SESSIONE = 'mx_hm_s'

const INTERATTIVI = 'a,button,[role="button"],input,select,textarea,label,summary'
const CON_ETICHETTA = 'a,button,[role="button"],summary'

let installato = false
let sessione = null
let pv = null // visita di pagina corrente
let buffer = []
let timer = null

// ---------- sessione ----------

function nuovoId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID()
  const b = new Uint8Array(16)
  window.crypto.getRandomValues(b)
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

function leggiSessione() {
  try {
    const salvata = JSON.parse(sessionStorage.getItem(CHIAVE_SESSIONE) || 'null')
    if (salvata?.id) return salvata
  } catch {
    // sessionStorage non disponibile o valore corrotto: si riparte
  }
  const nuova = { id: nuovoId(), campionata: Math.random() < HEATMAP_SAMPLE }
  try {
    sessionStorage.setItem(CHIAVE_SESSIONE, JSON.stringify(nuova))
  } catch {
    // modalità privata con storage bloccato: la sessione vive solo in memoria
  }
  return nuova
}

// ---------- elementi ----------

const ID_STABILE = /^[A-Za-z][\w-]*$/

// Percorso CSS dal primo antenato con id stabile (o da body). null se troppo lungo.
export function selettoreDi(el) {
  const parti = []
  let nodo = el
  while (nodo && nodo.nodeType === 1 && nodo !== document.body && nodo !== document.documentElement) {
    if (nodo.id && ID_STABILE.test(nodo.id)) {
      parti.unshift(`#${nodo.id}`)
      break
    }
    const tag = nodo.tagName.toLowerCase()
    const fratelli = nodo.parentElement ? [...nodo.parentElement.children].filter((c) => c.tagName === nodo.tagName) : []
    parti.unshift(fratelli.length > 1 ? `${tag}:nth-of-type(${fratelli.indexOf(nodo) + 1})` : tag)
    nodo = nodo.parentElement
  }
  if (!parti.length) return null
  if (!parti[0].startsWith('#')) parti.unshift('body')
  const sel = parti.join(' > ')
  return sel.length <= 500 ? sel : null
}

function elementoBersaglio(target) {
  if (!(target instanceof Element)) return null
  const interattivo = target.closest(INTERATTIVI)
  if (interattivo) return interattivo
  // le icone SVG: si prende l'svg intero, non il singolo path
  if (target instanceof SVGElement) return target.closest('svg') ?? target
  return target
}

// Click dentro elementi fissi (header, barra CTA mobile, WhatsApp) o finestre modali:
// non hanno una posizione stabile nella pagina, finiscono solo nella classifica degli elementi.
function inElementoFisso(el) {
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    if (n.tagName === 'DIALOG' || n.getAttribute?.('role') === 'dialog' || n.getAttribute?.('aria-modal') === 'true') return true
    if (getComputedStyle(n).position === 'fixed') return true
  }
  return false
}

function etichettaDi(el) {
  if (!el.matches(CON_ETICHETTA)) return null
  const testo = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').replace(/\s+/g, ' ').trim()
  return testo ? testo.slice(0, 80) : null
}

const arrotonda = (n, decimali = 1) => {
  const f = 10 ** decimali
  return Math.round(n * f) / f
}
const limita = (n, min, max) => Math.min(Math.max(n, min), max)

// ---------- misure pagina ----------

const larghezzaPagina = () => document.documentElement.clientWidth || window.innerWidth
const altezzaPagina = () => Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0)

function aggiornaScroll() {
  if (!pv) return
  const h = altezzaPagina()
  if (!h) return
  const visto = ((window.scrollY + window.innerHeight) / h) * 100
  pv.scrollMax = Math.max(pv.scrollMax, limita(Math.round(visto), 0, 100))
}

function aggiornaTempoVisibile() {
  if (!pv) return
  const ora = performance.now()
  if (pv.visibileDa != null) pv.durataMs += ora - pv.visibileDa
  pv.visibileDa = document.visibilityState === 'visible' ? ora : null
}

// ---------- invio ----------

function contesto() {
  const w = larghezzaPagina()
  return {
    v: VERSIONE_PAYLOAD,
    sessione: sessione.id,
    pv: pv.id,
    pagina: pv.pagina,
    dispositivo: dispositivoDa(w),
    viewport_w: Math.round(w),
    viewport_h: Math.round(window.innerHeight),
    doc_h: Math.round(altezzaPagina()),
    versione: HEATMAP_BUILD,
  }
}

function spedisci(corpo) {
  try {
    if (navigator.sendBeacon?.(HEATMAP_ENDPOINT, corpo)) return
  } catch {
    // si prova con fetch
  }
  try {
    fetch(HEATMAP_ENDPOINT, {
      method: 'POST',
      body: corpo,
      keepalive: true,
      credentials: 'omit',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).catch(() => {})
  } catch {
    // la heatmap non deve mai rompere il sito
  }
}

function invia() {
  if (!pv || !buffer.length) return
  const base = contesto()
  let eventi = buffer
  buffer = []
  // pacchetti sotto i 16 KB accettati dal backend
  while (eventi.length) {
    let n = eventi.length
    let corpo = JSON.stringify({ ...base, eventi: eventi.slice(0, n) })
    while (corpo.length > MAX_CARATTERI_PAYLOAD && n > 1) {
      n = Math.ceil(n / 2)
      corpo = JSON.stringify({ ...base, eventi: eventi.slice(0, n) })
    }
    if (corpo.length <= MAX_CARATTERI_PAYLOAD) spedisci(corpo)
    eventi = eventi.slice(n)
  }
}

function accoda(evento) {
  buffer.push(evento)
  if (buffer.length >= MAX_EVENTI_BUFFER) invia()
}

// Evento di scroll della visita: può partire più volte (scheda nascosta, poi uscita);
// il backend tiene il valore più alto per (sessione, pv).
function accodaScroll() {
  if (!pv) return
  aggiornaScroll()
  aggiornaTempoVisibile()
  const durata = Math.round(pv.durataMs)
  if (durata < DURATA_MINIMA_MS) return
  if (pv.scrollInviato && pv.scrollInviato.max === pv.scrollMax && durata - pv.scrollInviato.durata < 2_000) return
  pv.scrollInviato = { max: pv.scrollMax, durata }
  accoda({ t: 'scroll', ts: Date.now(), max_pct: pv.scrollMax, durata_ms: durata })
}

// ---------- ascoltatori ----------

let rafScroll = 0
function suScroll() {
  if (rafScroll) return
  rafScroll = requestAnimationFrame(() => {
    rafScroll = 0
    aggiornaScroll()
  })
}

function suClick(e) {
  if (!pv || !e.isTrusted) return
  // click da tastiera (Invio sui bottoni): nessuna coordinata reale
  if (e.detail === 0 && e.clientX === 0 && e.clientY === 0) return
  const el = elementoBersaglio(e.target)
  if (!el) return
  const r = el.getBoundingClientRect()
  const w = larghezzaPagina()
  const evento = {
    t: 'click',
    ts: Date.now(),
    x_pct: arrotonda(limita((e.pageX / w) * 100, 0, 100)),
    y_px: Math.max(0, Math.round(e.pageY)),
    sel: selettoreDi(el),
    el_x_pct: r.width ? arrotonda(limita(((e.clientX - r.left) / r.width) * 100, 0, 100)) : null,
    el_y_pct: r.height ? arrotonda(limita(((e.clientY - r.top) / r.height) * 100, 0, 100)) : null,
    label: etichettaDi(el),
  }
  if (inElementoFisso(el)) evento.fisso = true
  accoda(evento)
}

let ultimoDispositivo = null
function suResize() {
  const d = dispositivoDa(larghezzaPagina())
  // cambio di fascia (es. rotazione tablet): si chiude il pacchetto con il contesto vecchio
  if (ultimoDispositivo && d !== ultimoDispositivo) invia()
  ultimoDispositivo = d
}

function suVisibilita() {
  aggiornaTempoVisibile()
  if (document.visibilityState === 'hidden') {
    accodaScroll()
    invia()
  }
}

function suUscita() {
  accodaScroll()
  invia()
}

// ---------- API ----------

export function installa() {
  if (installato) return false
  sessione = leggiSessione()
  if (!sessione.campionata) {
    sessione = null
    return false
  }
  installato = true
  ultimoDispositivo = dispositivoDa(larghezzaPagina())
  document.addEventListener('click', suClick, { capture: true, passive: true })
  window.addEventListener('scroll', suScroll, { passive: true })
  window.addEventListener('resize', suResize, { passive: true })
  document.addEventListener('visibilitychange', suVisibilita)
  window.addEventListener('pagehide', suUscita)
  timer = window.setInterval(invia, INTERVALLO_INVIO_MS)
  return true
}

export function disinstalla() {
  if (!installato) return
  chiudiPagina()
  document.removeEventListener('click', suClick, { capture: true })
  window.removeEventListener('scroll', suScroll)
  window.removeEventListener('resize', suResize)
  document.removeEventListener('visibilitychange', suVisibilita)
  window.removeEventListener('pagehide', suUscita)
  window.clearInterval(timer)
  installato = false
}

export function avviaPagina(pathname) {
  if (!installato) return
  chiudiPagina()
  const pagina = normalizzaPagina(pathname)
  if (!pagina) return
  pv = {
    id: nuovoId().slice(0, 8),
    pagina,
    scrollMax: 0,
    durataMs: 0,
    visibileDa: document.visibilityState === 'visible' ? performance.now() : null,
    scrollInviato: null,
  }
  requestAnimationFrame(aggiornaScroll)
}

export function chiudiPagina() {
  if (!pv) return
  accodaScroll()
  invia()
  pv = null
}
