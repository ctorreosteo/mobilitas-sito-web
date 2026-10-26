// Anatomia delle tavole di /yt-postura-v2: funzioni pure che calcolano le forme (pelle e ossa) in SVG.
// Unità: statura 560 (pavimento y=580, vertice y=20); 1 cm ≈ 3,2 unità.
// Proporzioni da tabelle antropometriche dell'adulto (altezze dei punti di repere in frazione di statura):
// trago 0,93 · mento 0,87 · C7 e acromion 0,82 · cresta iliaca 0,59 · grande trocantere 0,52 ·
// interlinea del ginocchio 0,285 · malleolo laterale 0,04. Linea di gravità secondo Kendall:
// trago, acromion, grande trocantere, poco davanti al ginocchio, poco davanti al malleolo.
// Le ossa sono semplificate ma nelle forme, nei rapporti e nei numeri reali (7 cervicali, 12 toraciche,
// 5 lombari, sacro, coccige; 12 paia di coste, di cui 7 vere, 3 false, 2 fluttuanti).

/* ——— Geometria ——— */
export const lerp = (a, b, t) => a + (b - a) * t
export const lerpP = (p, q, t) => [lerp(p[0], q[0], t), lerp(p[1], q[1], t)]
export const lerpL = (A, B, t) => A.map((p, i) => lerpP(p, B[i], t))
const r1 = (n) => Math.round(n * 10) / 10
export const ruota = ([x, y], g) => {
  const a = (g * Math.PI) / 180
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [x * c - y * s, x * s + y * c]
}
export const somma = (p, q) => [p[0] + q[0], p[1] + q[1]]
export const diff = (p, q) => [p[0] - q[0], p[1] - q[1]]
export const per = (p, k) => [p[0] * k, p[1] * k]
const lung = (p) => Math.hypot(p[0], p[1])
const unit = (p) => per(p, 1 / (lung(p) || 1))
const gradi = (rad) => (rad * 180) / Math.PI
// Sistema locale: v in avanti (verso +x a riposo), u in basso; a = rotazione in gradi.
export const loc = (f, [v, u]) => somma(f.o, ruota([v, u], f.a))
const locL = (f, pts) => pts.map((p) => loc(f, p))
const aLoc = (f, p) => ruota(diff(p, f.o), -f.a)
const angoloVerso = (d) => gradi(Math.atan2(-d[0], d[1])) // rotazione che porta (0,1) su d

export function linea(pts, chiusa = false) {
  return pts.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0])},${r1(p[1])}`).join('') + (chiusa ? 'Z' : '')
}
// Curva morbida (Catmull-Rom) che passa per tutti i punti.
export function curva(pts, chiusa = false) {
  const n = pts.length
  if (n < 3) return linea(pts, chiusa)
  const P = (i) => (chiusa ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))])
  let d = `M${r1(pts[0][0])},${r1(pts[0][1])}`
  const fine = chiusa ? n : n - 1
  for (let i = 0; i < fine; i++) {
    const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${r1(c1[0])},${r1(c1[1])} ${r1(c2[0])},${r1(c2[1])} ${r1(p2[0])},${r1(p2[1])}`
  }
  return chiusa ? `${d}Z` : d
}
export const ellisse = (c, rx, ry, a = 0) => {
  const pts = []
  for (let i = 0; i < 16; i++) {
    const t = (i / 16) * Math.PI * 2
    pts.push(somma(c, ruota([rx * Math.cos(t), ry * Math.sin(t)], a)))
  }
  return curva(pts, true)
}

// Punti densi lungo la curva, per misurare e campionare.
function densa(pts, passi = 14) {
  const N = pts.length
  const P = (i) => pts[Math.max(0, Math.min(N - 1, i))]
  const out = []
  for (let i = 0; i < N - 1; i++) {
    const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)]
    for (let s = 0; s < passi; s++) {
      const u = s / passi
      const u2 = u * u
      const u3 = u2 * u
      const k = (a, b, c, d) =>
        0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u2 + (-a + 3 * b - 3 * c + d) * u3)
      out.push([k(p0[0], p1[0], p2[0], p3[0]), k(p0[1], p1[1], p2[1], p3[1])])
    }
  }
  out.push(pts[N - 1])
  return out
}
// Punto e tangente alle frazioni di lunghezza indicate.
function lungo(pts, frazioni) {
  const D = densa(pts)
  const L = [0]
  for (let i = 1; i < D.length; i++) L.push(L[i - 1] + lung(diff(D[i], D[i - 1])))
  const tot = L[L.length - 1]
  return frazioni.map((f) => {
    const m = tot * Math.max(0, Math.min(1, f))
    let j = 0
    while (j < L.length - 2 && L[j + 1] < m) j++
    const u = (m - L[j]) / (L[j + 1] - L[j] || 1)
    return { p: lerpP(D[j], D[j + 1], u), t: unit(diff(D[j + 1], D[j])), tot }
  })
}

/* ——— Colonna ——— */
// Altezze relative (corpo + disco) dei 24 segmenti presacrali, da C1 a L5.
const ALTEZZE = [
  ...[5.0, 5.6, 5.4, 5.4, 5.5, 5.6, 5.8],
  ...Array.from({ length: 12 }, (_, i) => 6.6 + (1.7 * i) / 11),
  ...[10.6, 11.0, 11.3, 11.5, 11.4],
]
export const NOMI_VERTEBRE = [
  ...Array.from({ length: 7 }, (_, i) => `C${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `T${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `L${i + 1}`),
]
const FRAZ = (() => {
  const c = [0]
  for (let i = 1; i < ALTEZZE.length; i++) c.push(c[i - 1] + ALTEZZE[i - 1] / 2 + ALTEZZE[i] / 2)
  const tot = c[c.length - 1] + ALTEZZE[ALTEZZE.length - 1] / 2
  return c.map((x) => x / tot)
})()

// Centri e assi delle 24 vertebre lungo la linea dei corpi vertebrali (da C1 al piatto di S1).
export function vertebre(controllo) {
  return lungo(controllo, FRAZ).map((q, i) => ({ ...q, i, n: [q.t[1], -q.t[0]] }))
}

function misureVertebra(i) {
  if (i < 7) return { hd: i === 0 ? 2.6 : 4.4, hh: 2.3, arco: 5, sp: i === 1 ? 7.5 : i === 6 ? 11 : 6.2, cade: 2.2, sh: 1.7 }
  if (i < 19) {
    const k = (i - 7) / 11
    return { hd: 5.4 + 2.2 * k, hh: 2.9 + 1.3 * k, arco: 5.5, sp: 8.5 - 1.5 * k, cade: 6 + 6 * Math.sin(Math.PI * Math.min(1, k * 1.3)), sh: 2 + 0.9 * k }
  }
  const k = (i - 19) / 4
  return { hd: 8.2 + 0.8 * k, hh: 4.5, arco: 6.4, sp: 8.6, cade: 1.4, sh: 4.4 }
}

// Una vertebra di profilo: corpo, peduncolo e lamina, processo spinoso; dischi a parte.
export function vertebraProfilo(V) {
  const { p: c, t, n, i } = V
  const m = misureVertebra(i)
  const A = (dn, dt) => somma(c, somma(per(n, dn), per(t, dt)))
  const forme = []
  if (i === 0) {
    // Atlante: arco anteriore e arco posteriore, senza corpo.
    forme.push({ k: 'osso', d: ellisse(A(3, 0), 2.6, 2.1, angoloVerso(t)) })
    forme.push({ k: 'osso', d: curva([A(-5, -1.4), A(-11, -1.2), A(-14.5, 0), A(-11, 1.6), A(-5, 1.4)], true) })
    return forme
  }
  const r = Math.min(1.1, m.hh * 0.4)
  const corpo = [
    A(m.hd - r, -m.hh), A(m.hd, -m.hh + r), A(m.hd, m.hh - r), A(m.hd - r, m.hh),
    A(-m.hd + r, m.hh), A(-m.hd, m.hh - r), A(-m.hd, -m.hh + r), A(-m.hd + r, -m.hh),
  ]
  if (i === 1) corpo.splice(0, 1, A(m.hd - r, -m.hh - 4.5), A(m.hd - 2.6, -m.hh - 6)) // dente dell'epistrofeo
  forme.push({ k: 'osso', d: linea(corpo, true) })
  const b = -m.hd
  const arco = [
    A(b + 0.4, -m.hh * 0.45),
    A(b - m.arco, -m.hh * 0.7),
    A(b - m.arco - m.sp, -m.hh * 0.2 + m.cade - m.sh / 2),
    A(b - m.arco - m.sp - 0.8, m.cade + m.sh * 0.1),
    A(b - m.arco - m.sp, m.cade + m.sh / 2),
    A(b - m.arco, m.hh * 0.75),
    A(b + 0.4, m.hh * 0.45),
  ]
  forme.push({ k: 'osso', d: linea(arco, true) })
  if (i >= 7 && i < 19) forme.push({ k: 'osso-fine', d: ellisse(A(b - m.arco * 0.55, -m.hh * 0.05), 1.7, 1.5) })
  return forme
}

// Dischi intervertebrali tra corpi consecutivi (da C2-C3 a L5-S1).
export function dischi(VV, s1) {
  const out = []
  for (let i = 1; i < VV.length; i++) {
    const a = VV[i - 1]
    const b = VV[i]
    const ma = misureVertebra(a.i)
    const mb = misureVertebra(b.i)
    if (a.i < 1) continue
    const p = [
      somma(a.p, somma(per(a.n, ma.hd - 0.6), per(a.t, ma.hh))),
      somma(b.p, somma(per(b.n, mb.hd - 0.6), per(b.t, -mb.hh))),
      somma(b.p, somma(per(b.n, -mb.hd + 0.6), per(b.t, -mb.hh))),
      somma(a.p, somma(per(a.n, -ma.hd + 0.6), per(a.t, ma.hh))),
    ]
    out.push({ k: 'disco', d: linea(p, true) })
  }
  if (s1) {
    const a = VV[VV.length - 1]
    const ma = misureVertebra(a.i)
    out.push({
      k: 'disco',
      d: linea(
        [
          somma(a.p, somma(per(a.n, ma.hd - 0.6), per(a.t, ma.hh))),
          s1.ant,
          s1.post,
          somma(a.p, somma(per(a.n, -ma.hd + 0.6), per(a.t, ma.hh))),
        ],
        true
      ),
    })
  }
  return out
}

/* ——— Profilo intero (vista laterale destra, il soggetto guarda verso +x) ——— */
export const FILO_X = 180

// Due pose: allineata (Kendall) e cifo-lordotica (testa avanti, dorso curvo, bacino in antiversione,
// ginocchia in leggera iperestensione). La tavola interpola tra le due.
const POSE = {
  dritto: {
    anca: [180, 292], bacino: 0, ginocchio: [177, 421], testa: 0, protrazione: 0, omero: -2, gomito: 8, polso: 4,
    spina: [[183, 74], [188, 92], [181, 112], [169, 140], [165, 170], [171, 203], [182, 232]],
    davanti: 0,
  },
  curvo: {
    anca: [186, 293], bacino: 11, ginocchio: [172, 421], testa: 7, protrazione: 1, omero: -7, gomito: 14, polso: 8,
    spina: [[212, 91], [207, 103], [194, 120], [171, 148], [161, 182], [170, 214], [188, 242]],
    davanti: 1,
  },
}
const CAVIGLIA = [176, 552]

// Pelle davanti e dietro alla colonna, per livello (distanza dal centro del corpo vertebrale, in unità).
const PELLE_DAVANTI = [22, 20, 18, 18, 17.5, 17, 18.5, 24, 33, 41, 47, 51, 53, 54, 53, 51, 49, 47, 45, 43.5, 43, 43.5, 45, 46]
const PELLE_DIETRO = [16, 18.5, 20.5, 21.5, 22.5, 24, 26, 27, 28.5, 29.5, 30, 30, 29, 28, 26.5, 25.5, 24.5, 24, 24, 23.5, 23, 22, 21.5, 21.5]

// Testa nel suo sistema: origine nel meato acustico (porion), v avanti, u in basso, piano di Francoforte
// orizzontale (porion e orbitale alla stessa altezza). Atlante in (2,15).
// Altezze del viso riportate ai valori medi dell'adulto (nasion–mento circa 12 cm).
const viso = (pts, xmin = 14) => pts.map(([v, u]) => (v > xmin && u > -16 ? [v, -7 + (u + 11) * 0.807] : [v, u]))
const TESTA_PELLE = viso([
  [-15, 26], [-19.5, 18], [-24.5, 10], [-28.6, -1], [-30.6, -15], [-26.5, -31], [-15, -42], [3, -46], [19, -42.5],
  [29.5, -33], [33.4, -24], [34.6, -16], [33, -10.5], [36.4, -3], [40.4, 4.6], [43, 9.4], [41.6, 12.2], [38.4, 13.6],
  [36.4, 14.4], [38.2, 18], [37.8, 20.6], [36.2, 22.2], [37.2, 24.4], [36, 27.2], [33.6, 29.2], [35, 32.4], [33.4, 35.8],
  [30, 37.6], [21, 38], [12, 35], [4, 33],
], 10).map(([v, u]) => (v < 0 && u > 15 ? [v + 2, u] : [v, u]))
const CRANIO = viso([
  [32.4, -16], [30.6, -27.5], [23, -36.6], [9, -41.4], [-4, -41.2], [-16, -37.6], [-23.6, -27.4], [-27.2, -13.6],
  [-25.8, -3], [-19, 4.2], [-11, 7.6], [-4.4, 11], [-2.2, 6.4], [3, 4.4], [10, 3.6], [17.5, 4.6], [22.5, 6.6],
  [26.4, 10.6], [30.6, 13.4], [32.2, 15.6], [32.6, 19.2], [29.8, 18.6], [30.2, 15.4], [33.6, 9.4], [31.4, 4.6],
  [34.4, -2.6], [31, -11.2],
])
const MANDIBOLA = viso([
  [2.6, 0.6], [5, -1], [6.6, 1.4], [8.6, 3.6], [11.2, 0], [12.8, -0.6], [13.6, 6], [15.6, 16.4], [22, 18.2],
  [29, 19.4], [31.2, 20.6], [30.4, 25.6], [31.2, 29.8], [27.4, 33.6], [20, 32.4], [12.6, 30.4], [8, 27.4], [4, 23.4],
  [2.6, 17], [2.2, 8], [1.6, 3],
], -10)
const CRANIO_LINEE = [
  [[27.6, -13.4], [22.6, -8.6], [21.6, -2.6], [24.4, 1.2], [28.4, 0.6]], // margine laterale dell'orbita
  [[3, 1.6], [10, 0.4], [18, 0], [22.6, 1.8]], // arcata zigomatica
  [[10, -41], [12.4, -30], [14.6, -20], [17, -14]], // sutura coronale
  [[-23.4, -27.2], [-16, -22], [-9, -16]], // sutura lambdoidea
  [[19.6, 18.4], [30.4, 19]], // arcate dentarie
]

function testa(f) {
  const pelle = curva(locL(f, TESTA_PELLE), true)
  const ossa = [
    { k: 'osso', d: curva(locL(f, CRANIO), true) },
    { k: 'osso', d: curva(locL(f, MANDIBOLA), true) },
    { k: 'osso-fine', d: ellisse(loc(f, [0, 0]), 2.2, 2.6, f.a) }, // meato acustico esterno
    ...CRANIO_LINEE.map((l, i) => ({ k: i < 2 || i === 4 ? 'osso-linea' : 'osso-fine', d: curva(locL(f, i === 2 || i === 3 ? l : viso(l))) })),
  ]
  const V = (l) => curva(locL(f, viso(l)))
  const dettagli = [
    { k: 'pelle-linea', d: curva(locL(f, [[2.6, -7], [-1.6, -11.4], [-7.4, -9], [-9.4, -1], [-7.6, 6.8], [-3.4, 10.4], [0.4, 9.6]])) }, // padiglione
    { k: 'pelle-linea', d: curva(locL(f, [[-1.4, -5.2], [-5, -4.4], [-5.8, 1.4], [-2.6, 4.6]])) },
    { k: 'pelle-linea', d: V([[28.6, -6.8], [31.4, -7.8], [33.2, -7]]) }, // palpebra
    { k: 'pelle-linea', d: V([[27, -11.6], [31, -12.6], [33.4, -12]]) }, // sopracciglio
    { k: 'pelle-linea', d: V([[36, 22.4], [33.4, 22.6], [31.8, 22]]) }, // labbra
    { k: 'pelle-linea', d: V([[37.6, 12.6], [35.6, 11.8], [35.2, 9.6]]) }, // ala del naso
  ]
  return { pelle, ossa, dettagli }
}

// Torace: frame con origine in T1 e asse verso T10.
function torace(VV, protrazione) {
  const T1 = VV[7]
  const T10 = VV[16]
  const f = { o: T1.p, a: angoloVerso(diff(T10.p, T1.p)) }
  const L = lung(diff(T10.p, T1.p))
  const k = L / 70
  const sterno = (u) => lerp(25 - 2 * protrazione, 44, Math.max(0, Math.min(1, (u - 8) / 58)))
  const coste = []
  const DISCESA = [8, 15, 21, 25, 28, 30, 31, 32, 31, 27]
  for (let r = 0; r < 12; r++) {
    const V = VV[7 + r]
    const m = misureVertebra(V.i)
    const inizio = aLoc(f, somma(V.p, per(V.n, -m.hd - 1.5)))
    const [v0, u0] = inizio
    let pts
    if (r < 10) {
      // Dalla vertebra all'angolo costale (indietro), poi obliqua in avanti e in basso; le coste dalla 3ª
      // risalgono con la cartilagine fino allo sterno (8ª-10ª fino all'arcata costale).
      const dsc = DISCESA[r] * k
      const vf = sterno(u0 + dsc) - (r >= 7 ? (r - 6) * 6 : 0)
      const risale = r < 2 ? 0 : Math.min(9, 2 + r * 1.2)
      pts = [[v0, u0], [v0 - 9, u0 + 2.5], [lerp(v0 - 9, vf, 0.5), u0 + 2.5 + (dsc + risale) * 0.55], [vf - 7, u0 + dsc + risale], [vf, u0 + dsc]]
    } else {
      pts = [[v0, u0], [v0 - 8, u0 + 3], [v0 + 2, u0 + 15], [v0 + 12 - (r - 10) * 7, u0 + 22]]
    }
    coste.push({ k: 'costa', d: curva(locL(f, pts)) })
  }
  const sternoPts = [[sterno(8) - 2, 7], [sterno(8) + 1, 8], [sterno(22) + 1, 22], [sterno(60) + 1, 60], [sterno(66) - 1, 70], [sterno(60) - 3, 60], [sterno(22) - 3, 22], [sterno(8) - 3, 10]]
  const scapola = [[-3, 4], [-14, 1], [-22, 5], [-25, 26], [-24, 50], [-19, 44], [-13, 26], [-8, 13]]
  const clavicola = [[-2, 5.5], [7, 3], [17, 7.5], [sterno(8) - 1.5, 8]]
  const acromion = loc(f, [-1 + 9 * protrazione, 6.5 + 1.5 * protrazione])
  const spalla = loc(f, [2 + 9 * protrazione, 14 + 2 * protrazione])
  return {
    f,
    coste,
    ossa: [
      { k: 'osso', d: curva(locL(f, scapola.map(([v, u]) => [v + 8 * protrazione, u + 2 * protrazione])), true) },
      { k: 'osso', d: curva(locL(f, sternoPts), true) },
      { k: 'costa', d: curva(locL(f, clavicola.map(([v, u], j) => [v + (j < 2 ? 8 * protrazione : 3 * protrazione), u]))) },
    ],
    acromion,
    spalla,
  }
}

// Osso dell'anca (vista laterale), sacro e coccige, nel frame del bacino (origine: centro dell'acetabolo).
const OSSO_ANCA = [
  [26, -22], [22, -17.5], [23.5, -12], [14, -5.5], // spina iliaca antero-superiore, antero-inferiore, ciglio dell'acetabolo
  [14.5, 1], [19.5, 4], [22.5, 7.5], [22, 13], [15, 17.5], // ramo superiore del pube, sinfisi, ramo inferiore
  [4, 22], [-6, 25.5], [-12, 22.5], [-14.5, 15], // ramo ischiatico e tuberosità ischiatica
  [-14, 9], [-18.5, 3], [-15, -4], [-17, -11], // piccola incisura, spina ischiatica, grande incisura ischiatica
  [-27, -18], [-29.5, -24.5], [-26.5, -30], // spine iliache posteriori
  [-14, -37], [0, -39.5], [14, -35.5], [24, -28], // cresta iliaca
]
const SACRO = [[-5, -27.5], [-20, -32.5], [-27, -22], [-31.5, -8], [-31, 4], [-28, 11], [-25.5, 9], [-23, -2], [-17, -13], [-10, -21]]
const COCCIGE = [[-28, 11], [-27, 15], [-24.5, 18.5], [-22.5, 17], [-23.5, 13], [-25.5, 9]]
const BACINO_PELLE = [[-24, -42], [-41, -27], [-48.5, -5], [-46.5, 12], [-38, 26], [-26, 31], [-8, 32], [12, 30], [22, 24], [30, 10], [33, -16], [27, -40]]
const COSCIA = [[30, -6], [35, 20], [33, 58], [27, 94], [23.5, 114], [24, 126], [17, 136], [-6, 138], [-21, 134], [-25, 112], [-31, 74], [-36, 44], [-38, 28], [-33, 12]]
const FEMORE = [[6, 7], [8.5, 30], [8.5, 70], [7.5, 100], [11, 113], [12.5, 121], [9, 130], [0, 134], [-9, 133.5], [-14.5, 128], [-14.5, 118], [-9, 108], [-5.5, 95], [-6, 60], [-6.5, 24], [-5, 13]]
const GAMBA = [[23.5, 1], [20, 14], [15.5, 40], [13, 80], [11.5, 112], [12.5, 129], [-12.5, 131], [-13.5, 118], [-17, 97], [-25.5, 62], [-30, 42], [-28, 20], [-22, 3]]
const TIBIA = [[-14, 4], [11.5, 4], [13.5, 9], [11.5, 16.5], [8.5, 25], [6, 62], [5, 108], [6.5, 120], [7.5, 129], [1, 132], [-4.5, 129], [-5, 112], [-5.5, 60], [-9, 22], [-14, 11]]
const PIEDE = [[162, 543], [157.5, 559], [155.5, 571], [160, 579.5], [196, 580], [242, 579.5], [249, 575.5], [244, 570], [222, 565], [205, 558], [192, 545.5]]
const OSSA_PIEDE = [
  curva([[171, 548], [178, 545.5], [186, 549], [188, 555.5], [180, 559.5], [171, 557]], true), // astragalo
  curva([[163, 560], [159, 569], [161, 576], [177, 576.5], [186, 569], [183, 561], [172, 558]], true), // calcagno
  curva([[188, 553], [195, 554.5], [196, 561], [189, 562], [186, 558]], true), // navicolare
  curva([[197, 556.5], [207, 560], [206, 567], [195, 566.5]], true), // cuneiformi e cuboide
  curva([[207, 561], [230, 569], [231, 573], [206, 567.5]], true), // metatarsi
  curva([[231, 569.5], [244, 573.5], [245, 576.5], [232, 574]], true), // falangi
]

// Arto superiore: braccio, avambraccio, mano. Frame con origine nella spalla.
const BRACCIO_PELLE = [[11, -9], [16.5, 8], [15.5, 40], [12, 72], [10, 92], [-10.5, 94], [-13.5, 66], [-15, 32], [-14, 4], [-6, -11]]
const OMERO = [[0, -7.5], [6.5, -3], [5, 8], [3.5, 60], [6.5, 84], [5, 91], [-6, 91], [-7, 84], [-3.5, 60], [-4, 10], [-7, -2]]
const AVAMBRACCIO_PELLE = [[10.5, -2], [12.5, 20], [9.5, 52], [7.5, 79], [-6.5, 80], [-8.5, 54], [-12.5, 22], [-11, 0]]
const RADIO_ULNA = [
  [[-4, -6], [-7.5, -1], [-4, 6], [-3, 74], [-0.5, 78], [-2, 70], [-0.5, 8], [0, 0]], // ulna con olecrano
  [[2, 2], [5, 4], [3.5, 30], [5, 72], [7, 78], [3, 78], [2, 30], [0.5, 6]], // radio
]
const MANO_PELLE = [[7, -1], [9.5, 18], [8.5, 38], [5, 58], [0.5, 61], [-3.5, 56], [-7, 32], [-7.5, 2]]
const MANO_OSSA = [
  [[-5, 1], [6, 1], [6.5, 9], [-5.5, 9.5]],
  [[4.5, 10], [5.5, 30], [4, 44], [2.5, 56]],
  [[1, 10], [1.5, 31], [0.5, 45], [-0.5, 57]],
  [[-2.5, 10], [-2.5, 30], [-3, 43], [-3.5, 52]],
]

function catena(o, a, len) {
  const f = { o, a }
  return { f, fine: loc(f, [0, len]) }
}

function interpola(t) {
  const D = POSE.dritto
  const C = POSE.curvo
  const P = {}
  Object.keys(D).forEach((k) => {
    if (k === 'spina') P[k] = lerpL(D[k], C[k], t)
    else if (Array.isArray(D[k])) P[k] = lerpP(D[k], C[k], t)
    else P[k] = lerp(D[k], C[k], t)
  })
  return P
}

export function profilo(t) {
  return disegna(interpola(t))
}

// Busto per la tavola della testa: posa allineata, collo flesso di «gradi» (distribuiti sulle cervicali,
// di più su quelle basse e medie), braccia che tengono il telefono davanti al petto.
export function busto(g) {
  const P = interpola(0)
  const c7 = P.spina[2]
  P.spina = P.spina.map((q, i) => (i === 0 ? somma(c7, ruota(diff(q, c7), g * 0.72)) : i === 1 ? somma(c7, ruota(diff(q, c7), g * 0.42)) : q))
  P.testaAssoluta = g - 4
  P.omero = -14
  P.gomito = 128
  P.polso = -16
  const F = disegna(P)
  // Telefono tenuto tra pollice e dita, con lo schermo verso il viso.
  const m = F.punti.mano
  F.telefono = linea(locL(m, [[-3, 22], [3.5, 22], [3.5, 66], [-3, 66]]), true)
  F.schermo = linea(locL(m, [[-3, 25], [-3, 63]]))
  return F
}

// Test di Adams: in piedi a gambe tese, busto piegato in avanti di circa 90°, braccia che pendono verso terra,
// testa rilassata in basso. Il bacino flette sulle anche, la colonna lombare completa il movimento.
export function piegatoAvanti() {
  const P = interpola(0)
  const anca = P.anca
  const n = P.spina.length
  P.spina = P.spina.map((q, i) => somma(anca, ruota(diff(q, anca), lerp(92, 74, i / (n - 1)))))
  P.bacino = 70
  P.testaAssoluta = 112
  P.omero = -6
  P.gomito = -4
  P.polso = -2
  P.davanti = 0
  const F = disegna(P)
  F.punti.t8 = F.vertebre[NOMI_VERTEBRE.indexOf('T8')].p
  return F
}

function disegna(P) {
  const L = (k) => P[k]
  const anca = P.anca
  const bacino = { o: anca, a: L('bacino') }
  const s1Centro = loc(bacino, [-12.5, -29.5])
  const s1 = { ant: loc(bacino, [-5, -27.5]), post: loc(bacino, [-20, -32.5]) }
  const spina = [...P.spina, s1Centro]
  const VV = vertebre(spina)
  const protr = L('protrazione')

  // Pelle del tronco: offset lungo le normali della colonna.
  const davanti = VV.map((V, i) => somma(V.p, per(V.n, PELLE_DAVANTI[i] + (i >= 20 ? 5 * L('davanti') * Math.sin(((i - 19) / 5) * Math.PI) : 0) - (i >= 8 && i <= 12 ? 3 * protr : 0))))
  const dietro = VV.map((V, i) => somma(V.p, per(V.n, -PELLE_DIETRO[i] - (i >= 8 && i <= 13 ? 2 * protr : 0))))
  const liscia = (pts) => pts.map((p, i) => (i === 0 || i === pts.length - 1 ? p : lerpP(p, lerpP(pts[i - 1], pts[i + 1], 0.5), 0.6)))
  // la parete addominale prosegue fino al pube
  const pube = [loc(bacino, [37, 2]), loc(bacino, [31, 22])]
  const tronco = curva([...liscia(liscia(dietro)), loc(bacino, [-30, -18]), ...pube.reverse(), ...liscia(liscia(davanti)).reverse()], true)

  // Testa: l'atlante della testa coincide con C1.
  const aTesta = P.testaAssoluta ?? L('testa') + angoloVerso(VV[0].t) * 0.25
  const trago = diff(VV[0].p, ruota([2, 15], aTesta))
  const fTesta = { o: trago, a: aTesta }
  const T = testa(fTesta)

  const TX = torace(VV, protr)
  const ginocchio = P.ginocchio
  const femore = { o: anca, a: angoloVerso(diff(ginocchio, anca)) }
  const kF = lung(diff(ginocchio, anca)) / 130
  const tibia = { o: ginocchio, a: angoloVerso(diff(CAVIGLIA, ginocchio)) }
  const kT = lung(diff(CAVIGLIA, ginocchio)) / 131
  const sc = (pts, kx = 1, ky = 1) => pts.map(([v, u]) => [v * kx, u * ky])

  const braccio = catena(TX.spalla, L('omero'), 92)
  const avamb = catena(braccio.fine, L('omero') - L('gomito'), 79)
  const mano = catena(avamb.fine, L('omero') - L('gomito') + L('polso'), 60)

  const pelleCorpo = [
    tronco,
    curva(locL(bacino, BACINO_PELLE), true),
    curva(locL(femore, sc(COSCIA, 1, kF)), true),
    curva(locL(tibia, sc(GAMBA, 1, kT)), true),
    curva(PIEDE, true),
    T.pelle,
  ]
  const pelleBraccio = [
    curva(locL(braccio.f, BRACCIO_PELLE), true),
    curva(locL(avamb.f, AVAMBRACCIO_PELLE), true),
    curva(locL(mano.f, MANO_PELLE), true),
  ]
  const ossa = [
    ...TX.coste,
    ...TX.ossa.slice(0, 1),
    ...dischi(VV, s1),
    ...VV.flatMap((V) => vertebraProfilo(V)),
    { k: 'osso', d: curva(locL(bacino, SACRO), true) },
    { k: 'osso', d: curva(locL(bacino, COCCIGE), true) },
    { k: 'osso', d: curva(locL(bacino, OSSO_ANCA), true) },
    { k: 'osso-fine', d: ellisse(loc(bacino, [5, 13]), 6.5, 4.4, bacino.a + 22) }, // forame otturato
    { k: 'osso-fine', d: ellisse(anca, 10.5, 10.5) }, // ciglio dell'acetabolo
    { k: 'osso', d: curva(locL(femore, sc(FEMORE, 1, kF)), true) },
    { k: 'osso', d: ellisse(anca, 8.5, 8.5) }, // testa del femore
    { k: 'osso', d: curva(locL(femore, [[-3, -4], [-9, -9.5], [-15, -6], [-14, 3], [-7, 8]]), true) }, // grande trocantere
    { k: 'osso', d: ellisse(loc(femore, [21.5, 124 * kF]), 4.2, 8.4, femore.a) }, // rotula
    { k: 'osso', d: curva(locL(tibia, sc(TIBIA, 1, kT)), true) },
    { k: 'osso', d: curva(locL(tibia, sc([[-15.5, 9], [-10.5, 8.5], [-9, 15], [-8, 70], [-6, 122], [-2.5, 132], [-6.5, 136], [-10, 131], [-10.5, 70], [-13, 17]], 1, kT)), true) }, // perone
    ...OSSA_PIEDE.map((d) => ({ k: 'osso', d })),
    ...TX.ossa.slice(1),
    ...T.ossa,
  ]
  const ossaBraccio = [
    { k: 'osso', d: curva(locL(braccio.f, OMERO), true) },
    ...RADIO_ULNA.map((p) => ({ k: 'osso', d: curva(locL(avamb.f, p), true) })),
    ...MANO_OSSA.map((p, j) => ({ k: j ? 'osso-linea' : 'osso', d: j ? curva(locL(mano.f, p)) : curva(locL(mano.f, p), true) })),
  ]
  const occhio = loc(fTesta, [31, -5])
  return {
    pelleCorpo,
    pelleBraccio,
    ossa,
    ossaBraccio,
    dettagli: T.dettagli,
    punti: {
      orecchio: trago,
      acromion: TX.acromion,
      trocantere: loc(femore, [-6, -2]),
      ginocchio,
      malleolo: [171, 555],
      occhio,
      sguardo: loc(fTesta, [58, -5]),
      c7: VV[6].p,
      baricentroTesta: loc(fTesta, [5, -10]),
      mano: mano.f,
    },
    fTesta,
    vertebre: VV,
  }
}

/* ——— Vista posteriore del tronco (tavola «Osso o posizione?») ——— */
// Il soggetto è visto da dietro: a destra del disegno c'è il suo lato destro. Curva tipica:
// toracica convessa a destra (apice T8), lombare convessa a sinistra (apice L2). amp = ampiezza 0–1.
export const DX = 180
const SIM = (pts) => [...pts, ...pts.slice().reverse().map(([x, y]) => [-x, y])]

export function dorso(amp, spalla = amp) {
  const X = (x, y) => [DX + x, y]
  // Linea delle vertebre: C1 al centro, poi la curva.
  const ctrl = [[0, 74], [0, 108], [8 * amp, 140], [20 * amp, 172], [5 * amp, 205], [-13 * amp, 228], [-5 * amp, 255], [0, 266]]
  const VV = vertebre(ctrl.map(([x, y]) => X(x, y)))
  const dy = 6 * spalla // spalla destra più alta dal lato convesso
  const sh = 3 * amp // tronco spostato verso sinistra

  // Pelle: testa, collo, trapezi, spalle, fianchi, glutei.
  const contorno = [
    [-18, 90], [-22, 100], [-38, 108 + dy * 0.6], [-56, 116 + dy], [-64, 123 + dy], [-71, 134 + dy], [-72, 150 + dy],
    [-52, 152], [-51, 180], [-45 + sh, 222], [-47 + sh, 240], [-55, 262], [-59, 288], [-57, 330], [-52, 378],
    [52, 378], [57, 330], [59, 288], [55, 262], [47 + sh, 240], [44 + sh, 222], [51, 180], [52, 152],
    [72, 150 - dy], [71, 134 - dy], [64, 123 - dy], [56, 116 - dy], [38, 108 - dy * 0.6], [22, 100], [18, 90],
  ].map(([x, y]) => X(x, y))
  const pelle = [curva(contorno, true), ellisse(X(0, 52), 25, 32)]
  const orecchie = [-1, 1].map((s) => curva([X(s * 24, 48), X(s * 29, 52), X(s * 29.5, 63), X(s * 25, 70)]))
  const braccia = [-1, 1].map((s) => {
    const d = s < 0 ? dy : -dy
    return curva(
      [[s * 72, 132 + d], [s * 76, 160], [s * 72, 222], [s * 68, 262], [s * 60, 305], [s * 58, 338], [s * 48, 338], [s * 47, 305], [s * 50, 262], [s * 52, 222], [s * 53, 160], [s * 58, 136 + d]].map(([x, y]) => X(x, y)),
      true
    )
  })

  const ossa = []
  // Coste: dal processo trasverso di ogni toracica, all'indietro e in fuori, poi in basso lungo la parete.
  for (let r = 0; r < 12; r++) {
    const V = VV[7 + r]
    for (const s of [-1, 1]) {
      const larg = [26, 36, 43, 47, 50, 52, 53, 53, 51, 48, 40, 33][r]
      const giu = [7, 11, 14, 16, 17, 18, 18, 18, 17, 16, 15, 12][r]
      const conv = s * amp > 0 ? 1 + 0.18 * amp * Math.max(0, 1 - Math.abs(r - 6) / 6) : 1 - 0.1 * amp * Math.max(0, 1 - Math.abs(r - 6) / 6)
      const p0 = somma(V.p, [s * 9, 0])
      const pts = [p0, somma(p0, [s * 9, -2]), X(s * larg * 0.82 * conv, V.p[1] + giu * 0.35), X(s * larg * conv, V.p[1] + giu)]
      ossa.push({ k: 'costa', d: curva(pts) })
    }
  }
  // Scapole: margine mediale a circa 5–6 cm dalle spinose, angolo inferiore a T7.
  const SCAPOLA = [[24, 126], [44, 127], [57, 136], [54, 146], [44, 162], [31, 175], [23, 150]]
  const SPINA_SCAPOLA = [[23, 141], [40, 134], [58, 127], [64, 124]]
  for (const s of [-1, 1]) {
    const su = s > 0 ? -dy * 0.8 : dy * 0.8
    const fuori = s * amp > 0 ? 3 * amp : 0
    const T = ([x, y]) => X(s * (x + fuori), y + su)
    ossa.push({ k: 'osso', d: curva(SCAPOLA.map(T), true) })
    ossa.push({ k: 'osso-linea', d: curva(SPINA_SCAPOLA.map(T)) })
    ossa.push({ k: 'osso', d: ellisse(T([60, 140]), 8.5, 9) }) // testa dell'omero
    ossa.push({ k: 'osso', d: curva([[56, 148], [62, 147], [63, 200], [67, 220], [54, 222], [57, 200], [56, 150]].map(T), true) }) // omero
    ossa.push({ k: 'osso-fine', d: curva([[63, 124], [40, 117], [14, 117]].map(T)) }) // clavicola, in trasparenza
  }
  // Vertebre viste da dietro: corpo in trasparenza, lamine, processi trasversi e spinoso.
  VV.forEach((V) => {
    const { i } = V
    const a = angoloVerso(V.t)
    const f = { o: V.p, a }
    const corpo = i < 7 ? 6.5 : i < 19 ? 8 + (3.5 * (i - 7)) / 11 : 13 + (i - 19) * 0.6
    const hh = misureVertebra(i).hh
    const tr = i < 7 ? 9 : i < 19 ? [15, 14.5, 14, 13.5, 13, 12.5, 12, 11.5, 11, 10, 9, 8][i - 7] : [11, 13, 15, 14, 13][i - 19]
    ossa.push({ k: 'osso-fine', d: linea(locL(f, [[-corpo, -hh], [corpo, -hh], [corpo, hh], [-corpo, hh]]), true) })
    const sp = i < 7 ? 2.2 : 2.6
    ossa.push({
      k: 'osso',
      d: curva(locL(f, [[-tr, -1.4], [-6, -hh * 0.9], [-sp, -hh * 1.1], [sp, -hh * 1.1], [6, -hh * 0.9], [tr, -1.4], [tr, 1.4], [6, hh * 0.6], [sp, hh * 1.3], [0, hh * 1.6], [-sp, hh * 1.3], [-6, hh * 0.6], [-tr, 1.4]]), true),
    })
  })
  // Bacino da dietro: ali iliache, spine iliache postero-superiori, sacro con i forami, coccige, femori.
  for (const s of [-1, 1]) {
    const T = ([x, y]) => X(s * x, y)
    // osso dell'anca: ala iliaca, grande incisura ischiatica, tuberosità ischiatica, forame otturato
    ossa.push({ k: 'osso', d: curva([[14, 268], [13, 254], [18, 242], [28, 235], [42, 234], [53, 240], [57, 251], [52, 266], [46, 280], [45, 292], [42, 304], [34, 318], [24, 321], [15, 318], [9, 312], [17, 302], [22, 293], [19, 284], [16, 276]].map(T), true) })
    ossa.push({ k: 'osso-fine', d: ellisse(T([28, 306]), 6, 4.6, s * 25) })
    // femore: testa, collo, grande e piccolo trocantere, diafisi obliqua verso il ginocchio
    ossa.push({ k: 'osso', d: curva([[33, 288], [42, 284], [49, 289], [56, 286], [61.5, 292], [60.5, 304], [57, 314], [51, 380], [40, 380], [45, 322], [41.5, 317], [44, 310], [39.5, 301], [33, 298]].map(T), true) })
    ossa.push({ k: 'osso', d: ellisse(T([38, 291]), 8.5, 8.5) })
    // avambraccio: ulna e radio, fino al polso
    ossa.push({ k: 'osso', d: curva([[60, 222], [64, 226], [59, 300], [56, 300]].map((q) => T([q[0], q[1]])), true) })
    ossa.push({ k: 'osso', d: curva([[66, 224], [68, 228], [62, 302], [59.5, 301]].map((q) => T([q[0], q[1]])), true) })
  }
  ossa.push({ k: 'osso', d: curva(SIM([[-17, 262], [-15, 276], [-10, 292], [-4, 304]]).map(([x, y]) => X(x, y)), true) })
  for (let k = 0; k < 4; k++) for (const s of [-1, 1]) ossa.push({ k: 'osso-fine', d: ellisse(X(s * (8 - k * 1.3), 270 + k * 8.5), 1.8, 1.6) })
  ossa.push({ k: 'osso', d: curva([X(-3.5, 305), X(3.5, 305), X(2, 313), X(0, 316), X(-2, 313)], true) })
  // Cranio da dietro, mastoidi e rami della mandibola.
  ossa.push({ k: 'osso', d: ellisse(X(0, 50), 21.5, 28) })
  for (const s of [-1, 1]) {
    ossa.push({ k: 'osso', d: curva([X(s * 17, 70), X(s * 21, 72), X(s * 19, 80)], true) })
    ossa.push({ k: 'osso-linea', d: curva([X(s * 20, 66), X(s * 22, 80), X(s * 17, 86)]) })
  }
  const pieghe = [
    curva([X(0, 276), X(0.6, 300), X(0, 322)]),
    ...[-1, 1].map((s) => curva([X(s * 2, 322), X(s * 22, 328), X(s * 46, 322)])),
  ]
  return { pelle, braccia, orecchie, ossa, pieghe, vertebre: VV, linea: curva(VV.map((V) => V.p)) }
}

// Sezione trasversale del torace a livello dell'apice, vista da dietro con il busto piegato in avanti
// (test di Adams): sopra la schiena. Con la curva dell'osso la vertebra è ruotata e le coste del lato
// convesso sollevano la schiena (gibbo).
export function sezioneAdams(rot, o = [DX, 0]) {
  const X = ([x, y]) => somma(o, ruota([x, y], -rot))
  const gabbia = [[0, -18], [14, -26], [32, -24], [52, -14], [64, 2], [62, 18], [46, 32], [22, 40], [0, 42], [-22, 40], [-46, 32], [-62, 18], [-64, 2], [-52, -14], [-32, -24], [-14, -26]]
  const ossa = [
    { k: 'costa', d: curva(gabbia.map(X), true) },
    { k: 'osso', d: ellisse(X([0, -8]), 8, 7.5, -rot) }, // corpo vertebrale
    { k: 'osso', d: curva([[-7, -14], [-13, -20], [-16, -24], [-9, -23], [-3, -28], [-1, -38], [1, -38], [3, -28], [9, -23], [16, -24], [13, -20], [7, -14]].map(X), true) }, // arco e spinoso
    { k: 'osso', d: ellisse(X([0, 39]), 5, 3, -rot) }, // sterno
  ]
  const muscoli = [-1, 1].map((s) => curva([[s * 3, -36], [s * 12, -38], [s * 26, -34], [s * 33, -26], [s * 22, -22], [s * 12, -20], [s * 5, -24]].map(X), true))
  // Schiena: inviluppo superiore della gabbia più muscoli e pelle.
  const pelle = []
  for (let x = -76; x <= 76; x += 8) {
    let top = 0
    for (let k = 0; k < 360; k += 3) {
      const t = (k * Math.PI) / 180
      const q = X([66 * Math.cos(t), 2 + 40 * Math.sin(t)])
      if (Math.abs(q[0] - (o[0] + x)) < 4) top = Math.min(top, q[1] - o[1])
    }
    const solco = 4 * Math.exp(-((x + rot * 0.6) ** 2) / 60)
    pelle.push([o[0] + x, o[1] + Math.min(-22, top - 13) + solco])
  }
  return { ossa, muscoli, schiena: curva(pelle), puntiSchiena: pelle }
}

/* ——— Arti inferiori visti da dietro (scheda «Gamba corta o bacino girato?») ——— */
// corta: la gamba destra è più corta (femore), quindi l'anca e tutto il bacino scendono da quel lato.
// Bacino girato: le anche restano alla stessa altezza e le gambe sono uguali; ruotano le due ossa
// dell'anca in senso opposto, e le creste iliache (i «fianchi») risultano una più alta dell'altra.
const ALA_DIETRO = [[14, 268], [13, 254], [18, 242], [28, 235], [42, 234], [53, 240], [57, 251], [52, 266], [46, 280], [45, 292], [42, 304], [34, 318], [24, 321], [15, 318], [9, 312], [17, 302], [22, 293], [19, 284], [16, 276]]

export function gambe(corta) {
  const X = (x, y) => [DX + x, y]
  const dx = corta ? 14 : 0
  const yAnca = { '-1': 292, 1: 292 + dx }
  const terra = 580
  const out = { pelle: [], ossa: [], pieghe: [] }
  const giro = corta ? 0 : 11
  const incl = (Math.atan2(dx, 80) * 180) / Math.PI
  const centro = X(0, 292 + dx / 2)

  // Pelle: bacino e glutei, poi le due gambe.
  const g = (s, x, y, peso = 1) => X(s * x, y + (s > 0 ? dx * peso : 0))
  out.pelle.push(
    curva(
      [g(-1, 46, 222, 0), g(-1, 51, 240, 0.2), g(-1, 57, 264, 0.6), g(-1, 59.5, 290, 0.9), g(-1, 57, 318, 1), g(-1, 30, 330, 1), X(0, 324 + dx / 2), g(1, 30, 330, 1), g(1, 57, 318, 1), g(1, 59.5, 290, 0.9), g(1, 57, 264, 0.6), g(1, 51, 240, 0.2), g(1, 46, 222, 0), X(0, 218)],
      true
    )
  )
  for (const s of [-1, 1]) {
    const h = s > 0 ? dx : 0
    out.pelle.push(
      curva(
        [
          X(s * 58, 288 + h), X(s * 57.5, 330 + h * 0.7), X(s * 52, 380 + h * 0.3), X(s * 47.5, 414), X(s * 48, 440), X(s * 49, 462),
          X(s * 44, 500), X(s * 39, 532), X(s * 41, 552), X(s * 40, 568), X(s * 39, 579.5), X(s * 21, 579.5), X(s * 19.5, 566),
          X(s * 19, 550), X(s * 20, 518), X(s * 13.5, 480), X(s * 14.5, 450), X(s * 15, 426), X(s * 14, 400), X(s * 9, 362), X(s * 3, 326 + h * 0.8),
        ],
        true
      )
    )
    out.pieghe.push(curva([X(s * 2, 324 + h * 0.8), X(s * 24, 331 + h), X(s * 50, 322 + h)]))
    out.pieghe.push(curva([X(s * 22, 424), X(s * 32, 428), X(s * 42, 424)])) // cavo popliteo
  }
  out.pieghe.push(curva([X(0, 272), X(0.6, 300), X(0, 324 + dx / 2)]))

  // Ossa dell'anca: ruotano con il bacino (gamba corta) o ognuna sulla propria anca (bacino girato).
  for (const s of [-1, 1]) {
    const acet = X(s * 40, yAnca[s])
    const T = ([x, y]) => {
      const p = X(s * x, y)
      if (corta) return somma(centro, ruota(diff(p, X(0, 292)), incl))
      return somma(acet, ruota(diff(p, X(s * 40, 292)), giro))
    }
    out.ossa.push({ k: 'osso', d: curva(ALA_DIETRO.map(T), true) })
    out.ossa.push({ k: 'osso-fine', d: ellisse(T([28, 306]), 6, 4.6, s * 25 + (corta ? incl : giro)) })
    out.cresta = out.cresta || {}
    out.cresta[s] = T([42, 234])
  }
  const sacroT = (p) => (corta ? somma(centro, ruota(diff(p, X(0, 292)), incl)) : p)
  out.ossa.push({ k: 'osso', d: curva(SIM([[-17, 262], [-15, 276], [-10, 292], [-4, 304]]).map(([x, y]) => sacroT(X(x, y))), true) })
  for (let k = 0; k < 4; k++) for (const s of [-1, 1]) out.ossa.push({ k: 'osso-fine', d: ellisse(sacroT(X(s * (8 - k * 1.3), 270 + k * 8.5)), 1.8, 1.6) })

  // Femori, tibie, peroni, astragali e calcagni.
  out.anca = {}
  for (const s of [-1, 1]) {
    const H = X(s * 40, yAnca[s])
    const K = X(s * 31, 418)
    const A2 = X(s * 31, 552)
    out.anca[s] = H
    const f = { o: H, a: angoloVerso(diff(K, H)) }
    const l = lung(diff(K, H))
    const Fm = (pts) => pts.map(([v, u]) => loc(f, [s * v, u]))
    out.ossa.push({
      k: 'osso',
      d: curva(Fm([[4, -5], [12, -7], [19, -11], [23.5, -5], [22, 8], [17, 18], [9, 40], [8, l - 26], [13.5, l - 8], [12, l + 1], [3, l + 3.5], [-5, l + 1.5], [-14.5, l - 2], [-12.5, l - 14], [-4, l - 32], [-1, 30], [-2.5, 22], [-6, 18], [-1, 12], [-4, 5]]), true),
    })
    out.ossa.push({ k: 'osso', d: ellisse(H, 8.5, 8.5) })
    const K2 = X(s * 31, 423)
    const t2 = { o: K2, a: angoloVerso(diff(A2, K2)) }
    const l2 = lung(diff(A2, K2))
    const Tb = (pts) => pts.map(([v, u]) => loc(t2, [s * v, u]))
    out.ossa.push({ k: 'osso', d: curva(Tb([[-17, 2], [17, 2], [17.5, 9], [11, 16], [6, 26], [4.5, l2 - 24], [5.5, l2 - 8], [1, l2 - 3], [-6, l2 - 3], [-10, l2 + 6], [-12.5, l2 - 2], [-7.5, l2 - 24], [-7, 26], [-12, 16], [-17.5, 9]]), true) })
    out.ossa.push({ k: 'osso', d: curva(Tb([[11.5, 9], [17.5, 9.5], [17, 16], [14, 30], [13.5, l2 - 10], [16, l2 + 10], [11, l2 + 7], [10.5, l2 - 10], [11, 30], [11, 16]]), true) })
    out.ossa.push({ k: 'osso', d: curva(Tb([[-8, l2 + 2], [8, l2 + 2], [9, l2 + 10], [-9, l2 + 10]]), true) })
    out.ossa.push({ k: 'osso', d: curva(Tb([[-9, l2 + 11], [9, l2 + 11], [10, l2 + 22], [6, l2 + 27.5], [-6, l2 + 27.5], [-10, l2 + 22]]), true) })
  }
  out.terra = terra
  return out
}
