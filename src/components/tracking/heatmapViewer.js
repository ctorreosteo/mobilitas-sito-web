// Modalità visualizzazione della heatmap (?hm_view=1).
// La pagina viene aperta in un iframe dal gestionale (Marketing › Heatmap), che le passa i dati
// aggregati via postMessage: la mappa si disegna qui dentro, sulla pagina vera, così resta allineata
// anche con scroll, FAQ aperte, colonne sticky e altezze diverse.
// Protocollo dei messaggi: docs/heatmap/SPEC.md §5

import { origineViewerAmmessa } from './heatmapConfig'

const PREFISSO = 'mobilitas-heatmap:'
// da freddo (pochi) a caldo (tanti): usata sia per i click sia per lo scroll
const PALETTE = { 0.2: '#3b5bdb', 0.4: '#22b8cf', 0.6: '#51cf66', 0.8: '#fcc419', 1: '#f03e3e' }
const SOGLIE_SCROLL = [75, 50, 25]
const RIGHE_PER_BLOCCO = 1024
const MODI = new Set(['click', 'scroll', 'entrambi'])

let avviato = false
let dati = { click: [], scroll: [], schermo: null, elementi: [], opzioni: {} }
let canvas = null
let tooltip = null
let evidenza = null
let origineGestionale = null
let tempoRidisegno = 0
let disegnati = [] // punti posizionati sull'ultimo disegno, per il tooltip
let altezzaUltima = 0

const modo = () => (MODI.has(dati.opzioni?.modo) ? dati.opzioni.modo : 'click')
const conClick = () => modo() !== 'scroll'
const conScroll = () => modo() !== 'click'

function invia(tipo, corpo = {}) {
  if (window.parent === window) return
  window.parent.postMessage({ type: PREFISSO + tipo, ...corpo }, origineGestionale ?? '*')
}

// ---------- preparazione della pagina ----------

function preparaPagina() {
  document.documentElement.setAttribute('data-hm-view', '')
  const stile = document.createElement('style')
  stile.textContent = `
    html[data-hm-view] [data-hm-fisso] { visibility: hidden !important; }
    html[data-hm-view] [data-hm-sticky] { position: relative !important; top: auto !important; bottom: auto !important; }
    #hm-canvas { position: absolute; left: 0; top: 0; pointer-events: none; z-index: 2147483645; }
    #hm-tooltip { position: absolute; z-index: 2147483647; pointer-events: none; display: none;
      font: 600 12px/1.35 system-ui, -apple-system, 'Segoe UI', sans-serif; color: #fff;
      background: rgba(17, 17, 17, .92); padding: 7px 10px; border-radius: 8px; max-width: 240px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, .25); }
    #hm-tooltip small { display: block; font-weight: 400; opacity: .8; margin-top: 2px; }
    #hm-evidenza { position: absolute; z-index: 2147483646; pointer-events: none; border-radius: 10px;
      border: 3px solid #f03e3e; box-shadow: 0 0 0 6px rgba(240, 62, 62, .25);
      animation: hm-pulsa 1.1s ease-in-out 3; }
    @keyframes hm-pulsa { 50% { box-shadow: 0 0 0 14px rgba(240, 62, 62, 0); } }
  `
  document.head.appendChild(stile)

  // nella vista non si naviga e non si inviano moduli (si possono però aprire FAQ e accordion)
  document.addEventListener(
    'click',
    (e) => {
      const link = e.target instanceof Element ? e.target.closest('a[href]') : null
      if (link) e.preventDefault()
    },
    true,
  )
  document.addEventListener('submit', (e) => e.preventDefault(), true)
}

// Elementi fissi (header, barra CTA, WhatsApp, popup) nascosti; sticky riportati nel flusso normale.
function normalizzaPosizioni() {
  for (const el of document.body.querySelectorAll('*')) {
    if (el.id?.startsWith('hm-')) continue
    if (el.hasAttribute('data-hm-fisso') || el.hasAttribute('data-hm-sticky')) continue
    const pos = getComputedStyle(el).position
    if (pos === 'fixed') el.setAttribute('data-hm-fisso', '')
    else if (pos === 'sticky') el.setAttribute('data-hm-sticky', '')
  }
}

const altezzaPagina = () => {
  if (canvas) canvas.style.display = 'none'
  const h = Math.min(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), 30000)
  if (canvas) canvas.style.display = 'block'
  return h
}

// ---------- scroll: quota di visite che arriva a una certa altezza ----------

// fasce = [{fascia: 0..100, pct}] → % di visite che raggiunge `posizione` (0–100), interpolando
function raggiungono(posizione) {
  const f = [...(dati.scroll ?? [])].sort((a, b) => a.fascia - b.fascia)
  if (!f.length) return null
  if (posizione <= f[0].fascia) return f[0].pct
  for (let i = 1; i < f.length; i++) {
    const a = f.at(i - 1)
    const b = f.at(i)
    if (posizione <= b.fascia) return a.pct + ((posizione - a.fascia) / (b.fascia - a.fascia || 1)) * (b.pct - a.pct)
  }
  return f.at(-1).pct
}

// ---------- disegno ----------

let timbro = null
let timbroRaggio = 0
function creaTimbro(raggio) {
  if (timbro && timbroRaggio === raggio) return timbro
  const sfocatura = Math.round(raggio * 0.75)
  const lato = (raggio + sfocatura) * 2
  timbro = document.createElement('canvas')
  timbro.width = timbro.height = lato
  const c = timbro.getContext('2d')
  // il cerchio si disegna fuori dal canvas e se ne tiene solo l'ombra sfocata
  c.shadowOffsetX = c.shadowOffsetY = lato * 2
  c.shadowBlur = sfocatura
  c.shadowColor = 'black'
  c.beginPath()
  c.arc(lato / 2 - lato * 2, lato / 2 - lato * 2, raggio, 0, Math.PI * 2)
  c.fill()
  timbroRaggio = raggio
  return timbro
}

let gradiente = null
function tavolozza() {
  if (gradiente) return gradiente
  const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
  c.canvas.width = 256
  c.canvas.height = 1
  const g = c.createLinearGradient(0, 0, 256, 0)
  for (const [stop, colore] of Object.entries(PALETTE)) g.addColorStop(Number(stop), colore)
  c.fillStyle = g
  c.fillRect(0, 0, 256, 1)
  gradiente = c.getImageData(0, 0, 256, 1).data
  return gradiente
}

function coloreDa(valore, alfa) {
  const t = tavolozza()
  const j = Math.round(Math.min(Math.max(valore, 0), 1) * 255) * 4
  return `rgba(${t[j]}, ${t[j + 1]}, ${t[j + 2]}, ${alfa})`
}

function trovaElemento(cache, sel) {
  if (cache.has(sel)) return cache.get(sel)
  let el = null
  try {
    el = document.querySelector(sel)
  } catch {
    el = null
  }
  cache.set(sel, el)
  return el
}

// Posizione di ogni gruppo di click sulla pagina com'è adesso.
function calcolaPunti() {
  const cache = new Map()
  const larghezza = document.documentElement.clientWidth
  const punti = []
  let nonTrovati = 0
  let nascosti = 0
  for (const p of dati.click) {
    if (p.fisso) continue
    let x
    let y
    if (p.sel) {
      const el = trovaElemento(cache, p.sel)
      if (!el) {
        nonTrovati += p.n
        continue
      }
      const r = el.getBoundingClientRect()
      if (!r.width && !r.height) {
        nascosti += p.n
        continue
      }
      x = r.left + window.scrollX + ((p.ex ?? 50) / 100) * r.width
      y = r.top + window.scrollY + ((p.ey ?? 50) / 100) * r.height
    } else {
      x = (p.x / 100) * larghezza
      y = p.y
    }
    punti.push({ x, y, n: p.n, etichetta: p.etichetta || null })
  }
  return { punti, nonTrovati, nascosti }
}

function disegnaClick(ctx, larghezza, altezza, punti) {
  const raggio = Number(dati.opzioni?.raggio) || (larghezza < 640 ? 18 : 24)
  const t = creaTimbro(raggio)
  const meta = t.width / 2
  const max = Math.max(1, ...punti.map((p) => p.n))
  for (const p of punti) {
    ctx.globalAlpha = Math.min(Math.max(p.n / max, 0.12), 1)
    ctx.drawImage(t, p.x - meta, p.y - meta)
  }
  ctx.globalAlpha = 1

  // colorazione a blocchi per non allocare un'unica immagine enorme
  const pal = tavolozza()
  const opacita = Math.min(Math.max(Number(dati.opzioni?.opacita) || 0.85, 0.1), 1)
  for (let y0 = 0; y0 < altezza; y0 += RIGHE_PER_BLOCCO) {
    const h = Math.min(RIGHE_PER_BLOCCO, altezza - y0)
    const img = ctx.getImageData(0, y0, larghezza, h)
    const px = img.data
    for (let i = 3; i < px.length; i += 4) {
      const a = px[i]
      if (!a) continue
      const j = a * 4
      px[i - 3] = pal[j]
      px[i - 2] = pal[j + 1]
      px[i - 1] = pal[j + 2]
      px[i] = Math.round(Math.min(255, a * 1.5) * opacita)
    }
    ctx.putImageData(img, 0, y0)
  }
}

// Mappa dello scroll: la pagina si colora dall'alto (rosso, la vedono tutti) al basso (blu, la vedono in pochi).
// Disegnata SOTTO i click (destination-over), così in modalità "entrambi" i click restano leggibili.
function disegnaScroll(ctx, larghezza, altezza) {
  if (!dati.scroll?.length) return
  const alfa = modo() === 'entrambi' ? 0.18 : 0.32
  ctx.save()
  ctx.globalCompositeOperation = 'destination-over'
  const passo = 6
  for (let y = 0; y < altezza; y += passo) {
    const v = raggiungono((y / altezza) * 100) ?? 0
    ctx.fillStyle = coloreDa(v / 100, alfa)
    ctx.fillRect(0, y, larghezza, passo)
  }
  ctx.restore()
}

function etichettaLinea(ctx, testo, y, colore, larghezza) {
  ctx.font = '600 13px system-ui, -apple-system, Segoe UI, sans-serif'
  const w = ctx.measureText(testo).width + 20
  const x = Math.max(8, larghezza - w - 8)
  ctx.fillStyle = colore
  ctx.beginPath()
  ctx.roundRect(x, y - 14, w, 28, 14)
  ctx.fill()
  ctx.fillStyle = '#fff'
  ctx.textBaseline = 'middle'
  ctx.fillText(testo, x + 10, y + 1)
}

function lineeScroll(ctx, larghezza, altezza) {
  ctx.save()
  // fine del primo schermo dei visitatori (altezza tipica dello schermo)
  const schermo = Number(dati.schermo)
  if (schermo > 0 && schermo < altezza) {
    ctx.strokeStyle = 'rgba(255,255,255,.95)'
    ctx.lineWidth = 2
    ctx.setLineDash([2, 5])
    ctx.beginPath()
    ctx.moveTo(0, schermo)
    ctx.lineTo(larghezza, schermo)
    ctx.stroke()
    etichettaLinea(ctx, 'Fine del primo schermo (in media)', schermo, 'rgba(17,17,17,.88)', larghezza)
  }
  if (dati.scroll?.length) {
    for (const soglia of SOGLIE_SCROLL) {
      // altezza in cui la quota scende sotto la soglia (ricerca sul profilo interpolato)
      let pos = null
      for (let p = 0; p <= 100; p += 0.5) {
        if ((raggiungono(p) ?? 100) < soglia) {
          pos = p
          break
        }
      }
      if (pos == null || pos <= 0) continue
      const y = Math.round((pos / 100) * altezza)
      ctx.strokeStyle = 'rgba(17,17,17,.9)'
      ctx.lineWidth = 2
      ctx.setLineDash([10, 6])
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(larghezza, y)
      ctx.stroke()
      ctx.setLineDash([])
      etichettaLinea(ctx, `Fin qui arriva il ${soglia}% dei visitatori`, y, 'rgba(17,17,17,.88)', larghezza)
    }
  }
  ctx.restore()
}

// In modalità scroll: accanto a ogni titolo, la quota di visitatori che ci arriva.
function etichetteSezioni(ctx, sezioni, altezza) {
  ctx.save()
  ctx.font = '700 13px system-ui, -apple-system, Segoe UI, sans-serif'
  ctx.textBaseline = 'middle'
  for (const s of sezioni) {
    if (s.raggiungono == null) continue
    const y = Math.max(16, (s.pct / 100) * altezza - 18)
    const testo = `la vede il ${s.raggiungono}%`
    const w = ctx.measureText(testo).width + 34
    ctx.fillStyle = 'rgba(17,17,17,.9)'
    ctx.beginPath()
    ctx.roundRect(8, y - 13, w, 26, 13)
    ctx.fill()
    ctx.fillStyle = coloreDa(s.raggiungono / 100, 1)
    ctx.beginPath()
    ctx.arc(22, y, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.fillText(testo, 32, y + 1)
  }
  ctx.restore()
}

function disegna() {
  if (!canvas) {
    canvas = document.createElement('canvas')
    canvas.id = 'hm-canvas'
    document.body.appendChild(canvas)
  }
  normalizzaPosizioni()

  const larghezza = document.documentElement.clientWidth
  const altezza = altezzaPagina()
  altezzaUltima = altezza
  canvas.width = larghezza
  canvas.height = altezza
  canvas.style.width = `${larghezza}px`
  canvas.style.height = `${altezza}px`

  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.clearRect(0, 0, larghezza, altezza)

  const { punti, nonTrovati, nascosti } = calcolaPunti()
  const misure = misuraPagina(altezza)
  disegnati = conClick() ? punti : []
  if (conClick()) disegnaClick(ctx, larghezza, altezza, punti)
  if (conScroll()) disegnaScroll(ctx, larghezza, altezza)
  lineeScroll(ctx, larghezza, altezza)
  if (conScroll()) etichetteSezioni(ctx, misure.sezioni ?? [], altezza)

  invia('stato', {
    modo: modo(),
    disegnati: punti.reduce((s, p) => s + p.n, 0),
    nonTrovati,
    nascosti,
    fissi: dati.click.filter((p) => p.fisso).reduce((s, p) => s + p.n, 0),
    larghezza,
    altezza,
    ...misure,
  })
  inviaPosizione()
}

// ---------- lettura dello scroll sulla pagina vera ----------

const testoBreve = (el) => (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 70)
const visibile = (el) => {
  const r = el.getBoundingClientRect()
  return (r.width || r.height) && !el.closest('[data-hm-fisso]')
}
const quota = (pct) => (dati.scroll?.length ? Math.round(raggiungono(pct)) : null)

// Le sezioni (titoli) con la quota di visitatori che le raggiunge, la posizione dei bottoni
// più cliccati e la fine del primo schermo: servono al gestionale per leggere lo scroll per nome.
function misuraPagina(altezza) {
  if (!altezza) return {}
  let titoli = [...document.querySelectorAll('h1, h2')].filter(visibile)
  if (titoli.length < 3) titoli = [...document.querySelectorAll('h1, h2, h3')].filter(visibile)
  const sezioni = []
  for (const t of titoli) {
    const titolo = testoBreve(t)
    if (!titolo) continue
    const pct = ((t.getBoundingClientRect().top + window.scrollY) / altezza) * 100
    if (sezioni.length && pct - sezioni.at(-1).pct < 1) continue
    sezioni.push({ titolo, pct: Math.round(pct * 10) / 10, raggiungono: quota(pct) })
  }
  const visibilita = []
  for (const sel of dati.elementi ?? []) {
    let el = null
    try {
      el = document.querySelector(sel)
    } catch {
      el = null
    }
    if (!el || !visibile(el)) {
      visibilita.push({ sel, pct: null, raggiungono: null })
      continue
    }
    const r = el.getBoundingClientRect()
    const pct = ((r.top + window.scrollY + r.height / 2) / altezza) * 100
    visibilita.push({ sel, pct: Math.round(pct * 10) / 10, raggiungono: quota(pct) })
  }
  const schermo = Number(dati.schermo)
  return {
    sezioni: sezioni.slice(0, 40),
    visibilita,
    primoSchermo: schermo > 0 ? Math.min(100, Math.round((schermo / altezza) * 1000) / 10) : null,
  }
}

function pianificaRidisegno(ritardo = 250) {
  window.clearTimeout(tempoRidisegno)
  tempoRidisegno = window.setTimeout(() => requestAnimationFrame(disegna), ritardo)
}

// ---------- tooltip ----------

function nascondiTooltip() {
  if (tooltip) tooltip.style.display = 'none'
}

function suMovimento(e) {
  if (!tooltip) {
    tooltip = document.createElement('div')
    tooltip.id = 'hm-tooltip'
    document.body.appendChild(tooltip)
  }
  const x = e.pageX
  const y = e.pageY
  const altezza = altezzaUltima || altezzaPagina()
  let titolo = null
  let dettaglio = null

  if (conClick() && disegnati.length) {
    const raggio = document.documentElement.clientWidth < 640 ? 26 : 32
    const vicini = disegnati.filter((p) => Math.hypot(p.x - x, p.y - y) <= raggio)
    const n = vicini.reduce((s, p) => s + p.n, 0)
    if (n) {
      const etichette = new Map()
      for (const p of vicini) if (p.etichetta) etichette.set(p.etichetta, (etichette.get(p.etichetta) ?? 0) + p.n)
      const top = [...etichette.entries()].sort((a, b) => b[1] - a[1])[0]
      titolo = `${n} click qui`
      dettaglio = top ? `su «${top[0]}»` : null
    }
  }
  if (!titolo && conScroll() && dati.scroll?.length) {
    const v = raggiungono((y / altezza) * 100)
    if (v != null) {
      titolo = `Qui arriva il ${Math.round(v)}% dei visitatori`
      dettaglio = `${Math.round((y / altezza) * 100)}% dell'altezza della pagina`
    }
  }
  if (!titolo) return nascondiTooltip()
  tooltip.textContent = titolo
  if (dettaglio) {
    const s = document.createElement('small')
    s.textContent = dettaglio
    tooltip.appendChild(s)
  }
  tooltip.style.display = 'block'
  const larghezza = document.documentElement.clientWidth
  const w = tooltip.offsetWidth
  const sx = x + 14 + w > larghezza - 8 ? x - w - 14 : x + 14
  tooltip.style.left = `${Math.min(Math.max(8, sx), Math.max(8, larghezza - w - 8))}px`
  tooltip.style.top = `${y + 14}px`
}

// ---------- posizione corrente e comandi dal gestionale ----------

let rafPosizione = 0
function inviaPosizione() {
  if (rafPosizione) return
  rafPosizione = requestAnimationFrame(() => {
    rafPosizione = 0
    const altezza = altezzaUltima || altezzaPagina()
    if (!altezza) return
    const inizio = (window.scrollY / altezza) * 100
    const fine = ((window.scrollY + window.innerHeight) / altezza) * 100
    const centro = (inizio + fine) / 2
    invia('posizione', {
      inizio: Math.round(inizio * 10) / 10,
      fine: Math.round(Math.min(fine, 100) * 10) / 10,
      raggiungono: dati.scroll?.length ? Math.round(raggiungono(centro)) : null,
    })
  })
}

function evidenzia(sel) {
  let el = null
  try {
    el = sel ? document.querySelector(sel) : null
  } catch {
    el = null
  }
  const r = el?.getBoundingClientRect()
  if (!el || (!r.width && !r.height) || el.closest('[data-hm-fisso]')) {
    invia('evidenziato', { sel, trovato: false })
    return
  }
  el.scrollIntoView({ block: 'center', behavior: 'smooth' })
  window.setTimeout(() => {
    const q = el.getBoundingClientRect()
    evidenza?.remove()
    evidenza = document.createElement('div')
    evidenza.id = 'hm-evidenza'
    Object.assign(evidenza.style, {
      left: `${q.left + window.scrollX - 6}px`,
      top: `${q.top + window.scrollY - 6}px`,
      width: `${q.width + 12}px`,
      height: `${q.height + 12}px`,
    })
    document.body.appendChild(evidenza)
    window.setTimeout(() => evidenza?.remove(), 3600)
  }, 450)
  invia('evidenziato', { sel, trovato: true })
}

function suMessaggio(e) {
  if (e.source !== window.parent || !origineViewerAmmessa(e.origin)) return
  const msg = e.data
  if (!msg || typeof msg.type !== 'string' || !msg.type.startsWith(PREFISSO)) return
  origineGestionale = e.origin
  const tipo = msg.type.slice(PREFISSO.length)
  if (tipo === 'dati') {
    dati = {
      click: Array.isArray(msg.click) ? msg.click : [],
      scroll: Array.isArray(msg.scroll) ? msg.scroll : [],
      schermo: Number(msg.schermo) || null,
      elementi: Array.isArray(msg.elementi) ? msg.elementi.filter((x) => typeof x === 'string').slice(0, 50) : [],
      opzioni: msg.opzioni ?? {},
    }
    pianificaRidisegno(0)
  } else if (tipo === 'modo') {
    dati.opzioni = { ...dati.opzioni, modo: msg.modo }
    nascondiTooltip()
    pianificaRidisegno(0)
  } else if (tipo === 'evidenzia') {
    evidenzia(msg.sel)
  } else if (tipo === 'vai') {
    const altezza = altezzaUltima || altezzaPagina()
    const pct = Math.min(Math.max(Number(msg.pct) || 0, 0), 100)
    window.scrollTo({ top: Math.max(0, (pct / 100) * altezza - window.innerHeight / 2), behavior: 'smooth' })
  } else if (tipo === 'ridisegna') {
    pianificaRidisegno(0)
  }
}

export function avviaViewer() {
  if (avviato) return
  avviato = true
  preparaPagina()
  window.addEventListener('message', suMessaggio)
  window.addEventListener('resize', () => pianificaRidisegno())
  window.addEventListener('scroll', inviaPosizione, { passive: true })
  document.addEventListener('mousemove', suMovimento, { passive: true })
  document.addEventListener('mouseleave', nascondiTooltip)
  new ResizeObserver(() => pianificaRidisegno()).observe(document.body)
  new MutationObserver((lista) => {
    // le modifiche fatte dalla vista stessa (tooltip, riquadro) non richiedono un nuovo disegno
    const nostro = (n) => n instanceof Element && n.closest('[id^="hm-"]')
    const esterne = lista.some((m) => !nostro(m.target) && [...m.addedNodes, ...m.removedNodes].some((n) => !nostro(n)))
    if (esterne) pianificaRidisegno(400)
  }).observe(document.body, { childList: true, subtree: true })
  // la pagina React può comparire un attimo dopo: si annuncia quando è pronta
  window.setTimeout(() => {
    invia('pronto', { pagina: window.location.pathname, larghezza: document.documentElement.clientWidth })
    pianificaRidisegno(0)
  }, 300)
}
