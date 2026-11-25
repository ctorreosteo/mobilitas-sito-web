// Finto backend della heatmap, solo per prove in locale. Nessuna dipendenza: `node finto-backend.mjs`
//
// Fa le stesse cose che farà il gestionale (docs/heatmap/SPEC.md), in memoria + file JSONL:
//   POST /api/sito/eventi           riceve i pacchetti del tracker (stesse validazioni della SPEC)
//   GET  /api/heatmap/pagine        elenco pagine nel periodo
//   GET  /api/heatmap/click         punti aggregati + elementi più cliccati
//   GET  /api/heatmap/scroll        profondità di scroll
//   GET  /                          prototipo della pagina "Marketing › Heatmap" (visualizzatore.html)
//
// È anche l'implementazione di riferimento delle aggregazioni per chi scrive il backend vero.
// Variabili: PORT (default 8080), HM_DATI (file JSONL, default ./eventi.jsonl), SITO (default http://localhost:5173)

import { createServer } from 'node:http'
import { appendFileSync, existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const QUI = dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT || 8080)
const FILE_DATI = process.env.HM_DATI || join(QUI, 'eventi.jsonl')
const SITO = process.env.SITO || 'http://localhost:5173'

const MAX_BODY = 16 * 1024
const MAX_EVENTI = 50
const PAGINA_VALIDA = /^\/[a-z0-9\-/]*$/
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const DISPOSITIVI = new Set(['mobile', 'tablet', 'desktop'])

// ---------- archivio ----------

const righe = existsSync(FILE_DATI)
  ? readFileSync(FILE_DATI, 'utf8').split('\n').filter(Boolean).map((r) => JSON.parse(r))
  : []

function salva(riga) {
  righe.push(riga)
  appendFileSync(FILE_DATI, JSON.stringify(riga) + '\n')
}

// ---------- validazione (come da SPEC §5.2) ----------

const num = (v, min, max) => (typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max ? v : null)
const testo = (v, max) => (typeof v === 'string' && v.length <= max ? v : null)

function righeDaPacchetto(p) {
  if (!p || p.v !== 1) return []
  if (!testo(p.pagina, 255) || !PAGINA_VALIDA.test(p.pagina)) return []
  if (!DISPOSITIVI.has(p.dispositivo) || !UUID.test(p.sessione ?? '')) return []
  if (!Array.isArray(p.eventi) || !p.eventi.length || p.eventi.length > MAX_EVENTI) return []
  const base = {
    pagina: p.pagina,
    dispositivo: p.dispositivo,
    viewport_w: num(p.viewport_w, 200, 8000),
    viewport_h: num(p.viewport_h, 200, 8000),
    doc_h: num(p.doc_h, 0, 200000),
    sessione: p.sessione,
    pv: testo(p.pv, 16),
    versione: testo(p.versione, 40),
    avvenuto_il: new Date().toISOString(), // ora del server, non del browser
  }
  const out = []
  for (const e of p.eventi) {
    if (e?.t === 'click') {
      const x = num(e.x_pct, 0, 100)
      const y = num(e.y_px, 0, 200000)
      if (x == null || y == null) continue
      out.push({
        ...base,
        tipo: 'click',
        x_pct: x,
        y_px: Math.round(y),
        selettore: testo(e.sel, 500),
        el_x_pct: num(e.el_x_pct, 0, 100),
        el_y_pct: num(e.el_y_pct, 0, 100),
        etichetta: testo(e.label, 80),
        fisso: e.fisso === true,
      })
    } else if (e?.t === 'scroll') {
      const max = num(e.max_pct, 0, 100)
      if (max == null) continue
      out.push({ ...base, tipo: 'scroll', scroll_max_pct: Math.round(max), durata_ms: num(e.durata_ms, 0, 86_400_000) })
    }
  }
  return out
}

// ---------- aggregazioni (SPEC §5.4) ----------

const giornoDi = (iso) => {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function filtra(q, tipo) {
  return righe.filter(
    (r) =>
      (!tipo || r.tipo === tipo) &&
      (!q.pagina || r.pagina === q.pagina) &&
      (!q.dispositivo || r.dispositivo === q.dispositivo) &&
      (!q.versione || r.versione === q.versione) &&
      (!q.dal || giornoDi(r.avvenuto_il) >= q.dal) &&
      (!q.al || giornoDi(r.avvenuto_il) <= q.al),
  )
}

// Una visita = una coppia (sessione, pv); dello scroll si tiene il valore più alto.
function visite(q) {
  const m = new Map()
  for (const r of filtra(q, 'scroll')) {
    const k = `${r.sessione}|${r.pv}`
    const v = m.get(k)
    if (!v || r.scroll_max_pct > v.max) m.set(k, { max: r.scroll_max_pct, durata: Math.max(r.durata_ms ?? 0, v?.durata ?? 0) })
    else v.durata = Math.max(v.durata, r.durata_ms ?? 0)
  }
  return [...m.values()]
}

const mediana = (valori) => {
  if (!valori.length) return null
  const o = [...valori].sort((a, b) => a - b)
  return o[Math.floor(o.length / 2)]
}

const bucket = (v, passo) => (v == null ? null : Math.min(100, Math.round(v / passo) * passo))

// Tutte le pagine con dati nel periodo (qualunque dispositivo), con il dettaglio per dispositivo.
function pagine(q) {
  const per = new Map()
  const vuoto = () => ({ visite: new Set(), click: 0 })
  for (const r of filtra({ dal: q.dal, al: q.al })) {
    const p =
      per.get(r.pagina) ??
      { pagina: r.pagina, tot: vuoto(), dispositivi: { mobile: vuoto(), tablet: vuoto(), desktop: vuoto() }, versioni: new Set() }
    const d = p.dispositivi[r.dispositivo]
    if (r.tipo === 'click') {
      p.tot.click++
      d.click++
    } else {
      p.tot.visite.add(`${r.sessione}|${r.pv}`)
      d.visite.add(`${r.sessione}|${r.pv}`)
    }
    if (r.versione) p.versioni.add(r.versione)
    per.set(r.pagina, p)
  }
  return [...per.values()]
    .map((p) => ({
      pagina: p.pagina,
      visite: p.tot.visite.size,
      click: p.tot.click,
      per_dispositivo: Object.fromEntries(Object.entries(p.dispositivi).map(([k, v]) => [k, { visite: v.visite.size, click: v.click }])),
      versioni: [...p.versioni].sort(),
    }))
    .sort((a, b) => b.visite - a.visite || b.click - a.click)
}

function click(q) {
  const punti = new Map()
  const elementi = new Map()
  const altezze = []
  const click = filtra(q, 'click')
  for (const r of click) {
    const ex = bucket(r.el_x_pct, 5)
    const ey = bucket(r.el_y_pct, 5)
    const k = r.selettore ? `s|${r.selettore}|${ex}|${ey}|${r.fisso}` : `c|${Math.round(r.x_pct)}|${Math.round(r.y_px / 20) * 20}`
    const p =
      punti.get(k) ??
      (r.selettore
        ? { sel: r.selettore, ex, ey, x: r.x_pct, y: r.y_px, n: 0, etichetta: r.etichetta || undefined, fisso: r.fisso || undefined }
        : { sel: null, x: Math.round(r.x_pct), y: Math.round(r.y_px / 20) * 20, n: 0 })
    p.n++
    punti.set(k, p)
    const ke = r.selettore ?? `(${Math.round(r.x_pct)}%, ${r.y_px}px)`
    const e = elementi.get(ke) ?? { sel: r.selettore, etichetta: r.etichetta, n: 0, fisso: r.fisso || undefined }
    e.n++
    if (!e.etichetta && r.etichetta) e.etichetta = r.etichetta
    elementi.set(ke, e)
    if (r.doc_h) altezze.push(r.doc_h)
  }
  const v = visite(q)
  return {
    visite: v.length,
    click: click.length,
    sessioni: new Set(click.map((r) => r.sessione)).size,
    visite_con_click: new Set(click.map((r) => `${r.sessione}|${r.pv}`)).size,
    altezza_tipica: mediana(altezze),
    // altezza tipica dello schermo dei visitatori: serve a disegnare la "fine del primo schermo"
    schermo_tipico: mediana(filtra(q).map((r) => r.viewport_h).filter(Boolean)),
    versioni: [...new Set(click.map((r) => r.versione).filter(Boolean))].sort(),
    punti: [...punti.values()],
    elementi: [...elementi.values()].sort((a, b) => b.n - a.n).slice(0, 20),
  }
}

function scroll(q) {
  const v = visite(q)
  const fasce = []
  for (let f = 0; f <= 100; f += 10) {
    fasce.push({ fascia: f, pct: v.length ? Math.round((v.filter((x) => x.max >= f).length / v.length) * 1000) / 10 : 0 })
  }
  return {
    visite: v.length,
    scroll_medio: v.length ? Math.round(v.reduce((s, x) => s + x.max, 0) / v.length) : 0,
    durata_media_ms: v.length ? Math.round(v.reduce((s, x) => s + x.durata, 0) / v.length) : 0,
    fasce,
  }
}

// Andamento giorno per giorno (per dispositivo): visite, click, scroll medio, quota che arriva in fondo.
function giorni(q) {
  const per = new Map()
  const chiave = (r) => `${giornoDi(r.avvenuto_il)}|${r.dispositivo}`
  for (const r of filtra({ pagina: q.pagina, dal: q.dal, al: q.al })) {
    const k = chiave(r)
    const g = per.get(k) ?? { giorno: giornoDi(r.avvenuto_il), dispositivo: r.dispositivo, click: 0, visite: new Map() }
    if (r.tipo === 'click') g.click++
    else {
      const v = `${r.sessione}|${r.pv}`
      g.visite.set(v, Math.max(g.visite.get(v) ?? 0, r.scroll_max_pct))
    }
    per.set(k, g)
  }
  return [...per.values()]
    .map((g) => {
      const max = [...g.visite.values()]
      return {
        giorno: g.giorno,
        dispositivo: g.dispositivo,
        visite: max.length,
        click: g.click,
        scroll_medio: max.length ? Math.round(max.reduce((a, b) => a + b, 0) / max.length) : 0,
        in_fondo_pct: max.length ? Math.round((max.filter((x) => x >= 100).length / max.length) * 100) : 0,
      }
    })
    .sort((a, b) => a.giorno.localeCompare(b.giorno) || a.dispositivo.localeCompare(b.dispositivo))
}

// Eventi singoli per lo scarico dei dati grezzi. Niente id di sessione: solo un codice di visita.
function eventi(q) {
  return filtra({ pagina: q.pagina, dal: q.dal, al: q.al })
    .slice(0, 100_000)
    .map((r) => ({
      avvenuto_il: r.avvenuto_il,
      pagina: r.pagina,
      dispositivo: r.dispositivo,
      tipo: r.tipo,
      visita: r.pv,
      x_pct: r.x_pct ?? null,
      y_px: r.y_px ?? null,
      selettore: r.selettore ?? null,
      etichetta: r.etichetta ?? null,
      fisso: r.fisso ?? false,
      scroll_max_pct: r.scroll_max_pct ?? null,
      durata_ms: r.durata_ms ?? null,
      viewport_w: r.viewport_w,
      versione: r.versione,
    }))
}

// ---------- server ----------

function rispondi(res, stato, corpo, tipo = 'application/json') {
  res.writeHead(stato, {
    'Content-Type': tipo,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  })
  res.end(typeof corpo === 'string' ? corpo : JSON.stringify(corpo))
}

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  const q = Object.fromEntries(url.searchParams)

  if (req.method === 'POST' && url.pathname === '/api/sito/eventi') {
    let dimensione = 0
    const pezzi = []
    req.on('data', (c) => {
      dimensione += c.length
      if (dimensione <= MAX_BODY) pezzi.push(c)
    })
    req.on('end', () => {
      if (dimensione <= MAX_BODY) {
        try {
          const nuove = righeDaPacchetto(JSON.parse(Buffer.concat(pezzi).toString('utf8')))
          nuove.forEach(salva)
          if (nuove.length) console.log(`+${nuove.length} eventi  ${nuove[0].pagina}  ${nuove[0].dispositivo}`)
        } catch {
          // JSON non valido: scartato in silenzio
        }
      }
      rispondi(res, 204, '')
    })
    return
  }

  if (req.method === 'GET' && url.pathname === '/api/heatmap/pagine') return rispondi(res, 200, { success: true, data: pagine(q) })
  if (req.method === 'GET' && url.pathname === '/api/heatmap/click') return rispondi(res, 200, { success: true, data: click(q) })
  if (req.method === 'GET' && url.pathname === '/api/heatmap/scroll') return rispondi(res, 200, { success: true, data: scroll(q) })
  if (req.method === 'GET' && url.pathname === '/api/heatmap/giorni') return rispondi(res, 200, { success: true, data: giorni(q) })
  if (req.method === 'GET' && url.pathname === '/api/heatmap/eventi') return rispondi(res, 200, { success: true, data: eventi(q) })

  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/visualizzatore.html')) {
    const html = readFileSync(join(QUI, 'visualizzatore.html'), 'utf8').replace('__SITO__', SITO)
    return rispondi(res, 200, html, 'text/html; charset=utf-8')
  }

  // tutto il resto del sito in dev (form, video…) qui non esiste
  rispondi(res, 404, { success: false, message: 'Finto backend heatmap: endpoint non gestito' })
}).listen(PORT, () => {
  console.log(`Finto backend heatmap su http://localhost:${PORT}  (dati: ${FILE_DATI}, ${righe.length} eventi già salvati)`)
  console.log(`Visualizzatore: http://localhost:${PORT}/`)
})
