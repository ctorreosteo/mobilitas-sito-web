// Anatomia della tavola «Osso o posizione?» (/yt-postura-v2): vista da dietro, proporzioni dell'adulto.
// Unità: 1 cm ≈ 3,3. Vertice del capo y≈10, terra y≈597. Asse del corpo x=CX. Il lato destro del disegno è il
// lato destro della persona (la guardiamo da dietro).
// Livelli: C7 ≈ 115, T12 ≈ 218, L5 ≈ 272, base del sacro 279, creste iliache 260 (L4), teste del femore 301,
// interlinea del ginocchio 452, caviglia 576. Coste: 12 paia, articolate con i processi trasversi.
// Scoliosi funzionale: bacino inclinato, curva morbida, vertebre non ruotate. Strutturale: curva a S
// (toracica destra, lombare sinistra), vertebre ruotate verso la convessità, coste più aperte e sporgenti
// sul lato convesso (gibbo), angolo di Cobb misurato sulle vertebre limite.
import { curva, linea, lerp, ruota, somma, piegatoAvanti } from './anatomia'

export const CX = 120
const rad = (g) => (g * Math.PI) / 180
const deg = (r) => (r * 180) / Math.PI
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const ass = (pts, lato = 1) => pts.map(([x, y]) => [CX + lato * x, y])
const gira = (pts, c, a) => pts.map((p) => somma(c, ruota([p[0] - c[0], p[1] - c[1]], a)))
const sposta = (pts, dx, dy) => pts.map(([x, y]) => [x + dx, y + dy])
// Mezza forma (lato destro, x ≥ 0) → forma intera simmetrica.
const intera = (meta) => {
  const sx = meta.filter(([x]) => x > 0.0001).reverse().map(([x, y]) => [-x, y])
  return [...meta, ...sx]
}
const ellissePti = (c, rx, ry, a = 0, n = 18) => {
  const out = []
  for (let i = 0; i < n; i++) {
    const s = (i / n) * Math.PI * 2
    out.push(somma(c, ruota([rx * Math.cos(s), ry * Math.sin(s)], a)))
  }
  return out
}
const chiusa = (pts) => curva(pts, true)
const forma = (k, pts) => ({ k, d: chiusa(pts) })

// Curva di Catmull-Rom campionata (per i nastri delle coste).
function campiona(pts, passi = 6) {
  const n = pts.length
  const Q = (i) => pts[Math.max(0, Math.min(n - 1, i))]
  const out = []
  for (let i = 0; i < n - 1; i++) {
    const [p0, p1, p2, p3] = [Q(i - 1), Q(i), Q(i + 1), Q(i + 2)]
    for (let k = 0; k < passi; k++) {
      const s = k / passi
      const s2 = s * s
      const s3 = s2 * s
      out.push(
        [0, 1].map(
          (j) =>
            0.5 *
            (2 * p1[j] + (-p0[j] + p2[j]) * s + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * s2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * s3)
        )
      )
    }
  }
  out.push(pts[n - 1])
  return out
}
function campionaValori(v, passi = 6) {
  const out = []
  for (let i = 0; i < v.length - 1; i++) for (let k = 0; k < passi; k++) out.push(lerp(v[i], v[i + 1], k / passi))
  out.push(v[v.length - 1])
  return out
}
// Nastro di larghezza variabile attorno a una linea: la forma di una costa.
function nastro(centro, larghezze) {
  const C = campiona(centro)
  const W = campionaValori(larghezze)
  const a = []
  const b = []
  C.forEach((p, i) => {
    const p0 = C[Math.max(0, i - 1)]
    const p1 = C[Math.min(C.length - 1, i + 1)]
    let nx = -(p1[1] - p0[1])
    let ny = p1[0] - p0[0]
    const l = Math.hypot(nx, ny) || 1
    nx /= l
    ny /= l
    const w = W[i] / 2
    a.push([p[0] + nx * w, p[1] + ny * w])
    b.push([p[0] - nx * w, p[1] - ny * w])
  })
  return curva([...a, ...b.reverse()], true)
}

// Interpolazione cubica (Hermite) di x in funzione di y.
function spline(nodi) {
  const m = (k) => {
    const a = nodi[Math.max(0, k - 1)]
    const b = nodi[Math.min(nodi.length - 1, k + 1)]
    return (b[1] - a[1]) / (b[0] - a[0])
  }
  return (y) => {
    if (y <= nodi[0][0]) return nodi[0][1]
    if (y >= nodi[nodi.length - 1][0]) return nodi[nodi.length - 1][1]
    let i = 0
    while (y > nodi[i + 1][0]) i++
    const [y0, x0] = nodi[i]
    const [y1, x1] = nodi[i + 1]
    const h = y1 - y0
    const s = (y - y0) / h
    const s2 = s * s
    const s3 = s2 * s
    return (2 * s3 - 3 * s2 + 1) * x0 + (s3 - 2 * s2 + s) * h * m(i) + (-2 * s3 + 3 * s2) * x1 + (s3 - s2) * h * m(i + 1)
  }
}

/* ——— Colonna ——— */
// Livelli dall'epistrofeo (C2) a L5: tipo, passo (corpo + disco), larghezza del corpo, processo spinoso e trasversi.
export const LIVELLI = (() => {
  const L = []
  for (let i = 2; i <= 7; i++) L.push({ n: `C${i}`, k: i === 7 ? 'c7' : 'c', s: 6.3, w: 12.5 + (i - 2) * 0.7, kS: 1, kT: 1 })
  const kS = [0.8, 0.9, 1, 1.1, 1.12, 1.14, 1.14, 1.1, 1, 0.85, 0.72, 0.62]
  const kT = [1.1, 1, 1, 1, 1, 1, 1, 1, 0.98, 0.9, 0.66, 0.46]
  for (let i = 1; i <= 12; i++) L.push({ n: `T${i}`, k: 't', s: 7.3 + i * 0.22, w: 16.5 + (i - 1) * 0.85, kS: kS[i - 1], kT: kT[i - 1] })
  ;[
    [10, 27.5, 0.72],
    [10.6, 28.6, 0.88],
    [11, 29.6, 1.05],
    [11.2, 30.6, 0.98],
    [11.2, 31.6, 0.92],
  ].forEach(([s, w, t], i) => L.push({ n: `L${i + 1}`, k: 'l', s, w, kS: 1, kT: t }))
  let y = 84
  L.forEach((v, i) => {
    if (i) y += (L[i - 1].s + v.s) / 2
    v.y = y
  })
  return L
})()

// Forme in coordinate normalizzate (x in larghezze del corpo, y in passi). Metà destra, dall'alto.
const ARCO = {
  t: [[0, -0.3], [0.1, -0.36], [0.15, -0.5], [0.22, -0.54], [0.27, -0.44], [0.28, -0.26], [0.27, -0.04], [0.24, 0.16], [0.2, 0.32], [0.13, 0.38], [0.075, 0.5], [0.06, 0.8], [0.055, 1.08], [0.07, 1.22], [0.04, 1.32], [0, 1.34]],
  l: [[0, -0.28], [0.09, -0.32], [0.13, -0.48], [0.2, -0.55], [0.26, -0.5], [0.27, -0.34], [0.24, -0.16], [0.22, 0.06], [0.19, 0.26], [0.13, 0.32], [0.1, 0.36], [0.115, 0.62], [0.1, 0.74], [0, 0.76]],
  c: [[0, -0.28], [0.12, -0.33], [0.22, -0.42], [0.33, -0.38], [0.36, -0.14], [0.33, 0.14], [0.22, 0.3], [0.1, 0.36], [0.075, 0.52], [0.1, 0.68], [0.05, 0.72], [0, 0.62]],
  c7: [[0, -0.28], [0.12, -0.33], [0.22, -0.42], [0.33, -0.38], [0.36, -0.14], [0.33, 0.14], [0.22, 0.3], [0.1, 0.36], [0.075, 0.52], [0.065, 0.95], [0.075, 1.1], [0.04, 1.18], [0, 1.2]],
}
const TRASVERSO = {
  t: [[0.22, -0.34], [0.4, -0.39], [0.58, -0.47], [0.7, -0.47], [0.74, -0.36], [0.68, -0.25], [0.5, -0.2], [0.25, -0.13]],
  l: [[0.22, -0.24], [0.42, -0.27], [0.58, -0.3], [0.64, -0.27], [0.63, -0.17], [0.44, -0.13], [0.22, -0.07]],
  c: [[0.33, -0.26], [0.48, -0.3], [0.55, -0.2], [0.5, -0.08], [0.34, -0.04]],
}
TRASVERSO.c7 = TRASVERSO.c
const ARTICOLAZIONE_COSTA = [0.69, -0.37]
const CORPO = [[-0.47, -0.37], [0.47, -0.37], [0.5, -0.31], [0.5, 0.31], [0.47, 0.37], [-0.47, 0.37], [-0.5, 0.31], [-0.5, -0.31]]

// Trasforma un punto della vertebra: rotazione assiale (arco verso la concavità, trasverso convesso più corto),
// inclinazione sul piano frontale, posizione.
function puntoVertebra(V, pos, [xn, yn], parte, lato = 0) {
  const sr = Math.sin(rad(pos.rho))
  let x = xn
  if (parte === 'tp') {
    const convesso = Math.sign(pos.rho) === lato && pos.rho !== 0
    const k = V.kT * (convesso ? 1 - 1.1 * Math.abs(sr) : 1 + 0.35 * Math.abs(sr))
    x = Math.sign(xn) * (0.22 + (Math.abs(xn) - 0.22) * k)
  }
  let yy = yn
  if (parte === 'arco' && yn > 0.5) yy = 0.5 + (yn - 0.5) * V.kS
  let px = x * V.w
  const py = yy * V.s
  if (parte !== 'corpo') px += -sr * V.w * (parte === 'arco' ? 0.5 + 0.35 * clamp(yy, 0, 1.3) : 0.5)
  return somma([pos.x, pos.y], ruota([px, py], pos.a))
}

function vertebra(V, pos) {
  const P = (pts, parte, lato) => pts.map((p) => puntoVertebra(V, pos, p, parte, lato))
  const tp = TRASVERSO[V.k]
  return {
    corpo: forma('osso-dietro', P(CORPO, 'corpo')),
    arco: [
      forma('osso', P(tp, 'tp', 1)),
      forma('osso', P(tp.map(([x, y]) => [-x, y]).reverse(), 'tp', -1)),
      forma('osso', P(intera(ARCO[V.k]), 'arco')),
    ],
    centro: [pos.x, pos.y],
    spinoso: puntoVertebra(V, pos, [0, ARCO[V.k][ARCO[V.k].length - 1][1]], 'arco'),
    articolazione: [1, -1].map((l) => puntoVertebra(V, pos, [l * ARTICOLAZIONE_COSTA[0], ARTICOLAZIONE_COSTA[1]], 'tp', l)),
  }
}

// Curve della colonna: x laterale (positivo = destra) in funzione di y.
const STRUTTURALE = spline([[100, 0], [122, 0.3], [140, 3.5], [162, 9], [180, 10], [198, 7], [216, 1.5], [232, -4.5], [246, -6.5], [259, -5], [270, -2], [279, 0]])
const funzionale = (y) => (y < 116 || y > 279 ? 0 : 7 * Math.sin((Math.PI * (279 - y)) / 163))
const TILT_BACINO = 4 // gradi, lato destro più basso (scoliosi funzionale)

function colonna(t, piegatoFunz = 1) {
  const tau = (1 - t) * TILT_BACINO
  const base = 22 * Math.sin(rad(tau))
  const f = (y) => (1 - t) * piegatoFunz * funzionale(y) + t * STRUTTURALE(y) + base * clamp((y - 116) / 163)
  const d = (y) => (f(y + 1) - f(y - 1)) / 2
  const pos = LIVELLI.map((V) => ({
    x: CX + f(V.y),
    y: V.y,
    a: -deg(Math.atan(d(V.y))),
    rho: t * 1.6 * STRUTTURALE(V.y),
  }))
  return { f, pos, tau }
}

/* ——— Coste ——— */
const COSTE_L = [27, 35, 41, 45, 48, 50, 51, 51.5, 51, 49, 41, 33]
const COSTE_D = [9, 12, 15, 17.5, 20, 22, 24, 25.5, 26.5, 27, 21, 14]
function costa(i, J, lato, pos, f) {
  const s = clamp(Math.abs(pos.rho) / 16)
  const convesso = pos.rho !== 0 && Math.sign(pos.rho) === lato
  const D = COSTE_D[i] * (convesso ? 1 - 0.3 * s : 1 + 0.2 * s)
  const meta = CX + f(J[1]) * 0.55 + lato * (COSTE_L[i] + (convesso ? 3 * s : -2.5 * s))
  const Lr = Math.abs(meta - J[0])
  let fr
  let w
  if (i === 11) {
    fr = [[0, 0], [0.2, 0.05], [0.5, 0.25], [0.8, 0.5], [1, 0.75]]
    w = [2.2, 2.8, 2.8, 2.2, 1.2]
  } else if (i === 10) {
    fr = [[0, 0], [0.15, 0.04], [0.38, 0.18], [0.62, 0.42], [0.85, 0.72], [1, 1]]
    w = [2.3, 2.9, 3.3, 3.2, 2.6, 1.4]
  } else {
    fr = [[0, 0], [0.15, 0.04], [0.38, 0.18], [0.62, 0.42], [0.85, 0.72], [1, 1], [0.97, 1.32]]
    w = [2.4, 3, 3.6, 3.6, 3.4, 3.2, 2.6]
  }
  const pts = gira(fr.map(([fx, fy]) => [J[0] + lato * fx * Lr, J[1] + fy * D]), J, pos.a * 0.6)
  return nastro(pts, w)
}

/* ——— Cingolo scapolare e arto superiore (lato destro, x dall'asse) ——— */
const SCAPOLA = [[23, 130], [28, 125], [36, 123], [44, 124], [49, 126], [53, 127], [57, 130], [60, 134], [61, 141], [59, 146], [55, 154], [50, 164], [44, 174], [37, 182], [31, 186], [28, 184], [26, 176], [24.5, 162], [23.5, 148], [23, 138]]
const SPINA_SCAPOLA = [[23.5, 139], [30, 137.5], [39, 134.5], [48, 131], [55, 127.5], [60, 124], [64, 121], [69, 120.5], [72, 122.5], [70, 126.5], [64, 128], [57, 131], [49, 135.5], [40, 139.5], [31, 142.5], [24.5, 144]]
const BORDO_LATERALE = [[57, 147], [52, 158], [45, 170], [37, 180]]
const OMERO = [[56, 130], [58, 125.5], [64, 124], [70, 127], [72.5, 133], [71, 140], [68.5, 147], [68.5, 175], [69.5, 205], [72.5, 216], [74, 223], [70.5, 227], [66.5, 225], [62, 227.5], [58.5, 224], [60, 217], [63.5, 205], [64.5, 175], [64, 147], [60, 141], [56.5, 136]]
const ULNA = [[60.5, 222], [65, 221], [66.5, 227], [66, 240], [67.5, 270], [69, 300], [70.5, 306], [67.5, 308], [66, 300], [63.5, 270], [62, 240], [59.5, 230]]
const RADIO = [[69, 230], [74, 229.5], [74.5, 236], [75, 260], [77.5, 292], [79.5, 304], [77, 308], [72, 306], [72, 292], [70.5, 262], [69.5, 238]]
const CLAVICOLA = [[7, 127], [18, 125.5], [31, 124], [44, 123.5], [55, 122], [63, 121]]
const BRACCIO_PELLE = [[64, 119], [72, 121], [77.5, 127], [80.5, 136], [80.5, 150], [78.5, 168], [77.5, 190], [77.5, 210], [79, 224], [80.5, 240], [81.5, 262], [81, 285], [79.5, 303], [81.5, 315], [82, 333], [80, 348], [76, 355], [71.5, 352], [69, 340], [67.5, 322], [66.5, 308], [64.5, 290], [62.5, 262], [60.5, 240], [59.5, 225], [59.5, 205], [59, 180], [58, 162], [60, 145], [62, 128]]

/* ——— Bacino e femore (lato destro) ——— */
export const ANCA = [30, 301] // centro della testa del femore, lato destro
const R_TESTA = 8.4
const EMIBACINO = [[13, 285.5], [14, 279], [17.5, 270], [24, 263], [33, 259.5], [42, 261], [47.5, 266], [50, 273], [48.5, 281], [45, 286], [44.5, 291], [42, 296], [41.5, 302], [41, 309], [36.5, 316], [31, 322], [27.5, 330], [24.5, 335.5], [18.5, 337.5], [13.5, 335], [9, 329], [3.5, 324.5], [2.2, 318], [2.5, 311], [9, 308], [16, 307], [19.5, 304], [23.5, 298], [22, 292], [16, 290]]
const OTTURATORIO = { c: [13.5, 321], rx: 4.6, ry: 6.6, a: -15 }
const CRESTA = [33, 259.5]
const SPINA_ILIACA = [13, 285.5]
const SACRO = intera([[0, 279], [5, 278], [9, 275], [12, 278], [19, 281], [19, 288], [17, 296], [13, 305], [8, 313], [4, 319], [2, 321]])
const FORI_SACRALI = [[7.5, 286], [6.8, 294], [6, 302], [5, 309]]
const FEMORE = [[34, 295], [43, 291.5], [48.5, 290.5], [52.5, 295], [54, 303], [53, 312], [50, 320], [47.5, 330], [45.5, 360], [44, 395], [43.5, 420], [45.5, 435], [47.5, 443], [46, 450], [41, 452.5], [36, 449.5], [32.5, 445], [28.5, 449.5], [23, 452.5], [19, 449], [19.5, 440], [23, 432], [29.5, 418], [33, 390], [35, 355], [36, 333], [34.5, 328], [30.5, 325.5], [31, 320], [33.5, 315], [32, 309]]
const CRESTA_INTERTROCANTERICA = [[49, 297], [44, 310], [38, 322]]
const TIBIA = [[18, 455], [46, 455], [46, 463], [41, 475], [35.5, 500], [33.5, 540], [34.5, 562], [37.5, 572], [26, 575], [22, 580], [21.5, 572], [25.5, 560], [26, 530], [25, 495], [20, 475], [17, 464]]
const FIBULA = [[45, 466], [51, 466], [52, 472], [49, 480], [48, 520], [47, 565], [49, 575], [46, 586], [42, 580], [43, 565], [45, 520], [46, 480], [44, 472]]
const CALCAGNO = [[24, 580], [42, 581], [45, 588], [42, 595], [33, 597], [25, 595], [21, 588]]

/* ——— Pelle (lato destro) ——— */
const TRONCO = [[12.5, 80], [13.5, 92], [15, 101], [21, 106], [32, 110.5], [44, 114.5], [55, 117.5], [63, 119.5], [65, 124], [62, 135], [59, 150], [57.5, 165], [56, 180], [53.5, 198], [50, 215], [46.5, 232], [46, 244], [49, 256], [54, 270], [59, 286], [62, 302], [62.5, 318], [61, 336], [58.5, 356], [56, 375], [54, 400]]
const ORECCHIO = [[27.5, 44], [31, 46], [32, 54], [30.5, 63], [27, 66]]
const GAMBA_PELLE = [[62.5, 318], [61, 336], [58.5, 356], [55.5, 380], [52.5, 405], [50, 430], [48.5, 448], [49.5, 462], [52, 478], [53, 494], [51, 514], [46.5, 538], [42.5, 556], [40.5, 570], [42.5, 582], [43.5, 590], [40, 597], [26, 597.5], [21, 593], [21.5, 584], [20.5, 576], [20, 563], [17.5, 540], [14, 516], [12, 494], [13, 476], [15, 460], [14.5, 445], [11, 425], [7, 400], [4, 378], [2.5, 368]]
const PIEGA_GLUTEA = [[3, 368], [18, 373], [36, 371], [50, 364]]

/* ——— Vista in piedi, da dietro ——— */
export function dorsoInPiedi(t) {
  const { f, pos, tau } = colonna(t)
  const centroBacino = [CX, ANCA[1]]
  const bac = (pts) => gira(pts, centroBacino, tau)
  // Spalla destra: un poco più alta e scapola più sporgente nella scoliosi strutturale.
  const spDx = (pts) => gira(sposta(pts, 1.5 * t, -3 * t), [CX + 40, 155], -3 * t)
  const brDx = (pts) => sposta(pts, 0, -3 * t)
  const pelleTronco = (pts, lato) =>
    pts.map(([x, y]) => {
      const k = y > 104 && y < 300 ? 0.4 * f(y) : 0
      const sp = lato > 0 && y < 140 ? -3 * t * clamp((140 - y) / 30) : 0
      return [x + k, y + sp]
    })

  const troncoDx = pelleTronco(ass(TRONCO, 1), 1)
  const troncoSx = pelleTronco(ass(TRONCO, -1), -1)
  const pelle = [
    chiusa([...troncoDx, ...troncoSx.slice().reverse()]),
    chiusa(ellissePti([CX, 47], 28, 38)),
    chiusa(ass(ORECCHIO, 1)),
    chiusa(ass(ORECCHIO, -1)),
  ]
  const braccia = [chiusa(brDx(ass(BRACCIO_PELLE, 1))), chiusa(ass(BRACCIO_PELLE, -1))]

  const spinosi = pos.map((p, i) => vertebra(LIVELLI[i], p).spinoso)
  const solco = curva(spinosi.filter((_, i) => i >= 5))
  const paraDx = curva(spinosi.filter((_, i) => i >= 14).map((p, j) => [p[0] + 9 + j * 0.3, p[1]]))
  const paraSx = curva(spinosi.filter((_, i) => i >= 14).map((p, j) => [p[0] - 9 - j * 0.3, p[1]]))
  const linee = [
    solco,
    paraDx,
    paraSx,
    curva(spDx(ass([[25, 136], [25.5, 168], [31, 189]], 1))),
    curva(ass([[25, 136], [25.5, 168], [31, 189]], -1)),
    chiusa(ellissePti(bac([[CX + 13, 286]])[0], 1.7, 1.1)),
    chiusa(ellissePti(bac([[CX - 13, 286]])[0], 1.7, 1.1)),
    linea([[CX, 320], [CX, 372]]),
    curva(ass(PIEGA_GLUTEA, 1)),
    curva(ass(PIEGA_GLUTEA, -1)),
  ]

  // Ossa lontane (davanti, viste in trasparenza): clavicole, cranio, ossa delle braccia.
  const lontane = [
    { k: 'osso-lieve', d: nastro(ass(CLAVICOLA, -1), [3, 3.6, 3.4, 3.4, 3.8, 4]) },
    { k: 'osso-lieve', d: nastro(spDx(ass(CLAVICOLA, 1)), [3, 3.6, 3.4, 3.4, 3.8, 4]) },
    forma('osso-lieve', ass(OMERO, -1)),
    forma('osso-lieve', brDx(ass(OMERO, 1))),
    forma('osso-lieve', ass(ULNA, -1)),
    forma('osso-lieve', brDx(ass(ULNA, 1))),
    forma('osso-lieve', ass(RADIO, -1)),
    forma('osso-lieve', brDx(ass(RADIO, 1))),
  ]
  const cranio = [
    forma('osso', ellissePti([CX, 45.5], 25, 34.5)),
    { k: 'osso-fine', d: linea([[CX - 23, 52], [CX - 19, 45], [CX - 15, 40], [CX - 10, 34], [CX - 5, 29], [CX, 25], [CX + 5, 29], [CX + 10, 34], [CX + 15, 40], [CX + 19, 45], [CX + 23, 52]].map(([x, y], i) => [x, y + (i % 2 ? 1 : -0.5)])) },
    { k: 'osso-fine', d: linea([[CX, 3 + 22], [CX, 12]]) },
  ]

  // Bacino e femori, inclinati insieme nella scoliosi funzionale.
  const testaDx = bac([[CX + ANCA[0], ANCA[1]]])[0]
  const testaSx = bac([[CX - ANCA[0], ANCA[1]]])[0]
  const bacino = [
    forma('osso', bac(ass(FEMORE, 1))),
    forma('osso', bac(ass(FEMORE, -1))),
    { k: 'osso-linea', d: curva(bac(ass(CRESTA_INTERTROCANTERICA, 1))) },
    { k: 'osso-linea', d: curva(bac(ass(CRESTA_INTERTROCANTERICA, -1))) },
    forma('osso-fine', ellissePti(testaDx, R_TESTA, R_TESTA)),
    forma('osso-fine', ellissePti(testaSx, R_TESTA, R_TESTA)),
    ...[1, -1].map((l) => ({
      k: 'osso-foro',
      d: chiusa(bac(ass(EMIBACINO, l))) + chiusa(bac(ass(ellissePti(OTTURATORIO.c, OTTURATORIO.rx, OTTURATORIO.ry, OTTURATORIO.a), l))),
    })),
    {
      k: 'osso-foro',
      d: chiusa(bac(ass(SACRO, 1))) + FORI_SACRALI.flatMap(([x, y]) => [1, -1].map((l) => chiusa(bac(ellissePti([CX + l * x, y], 1.6, 2.1))))).join(''),
    },
    { k: 'osso-linea', d: curva(bac([[CX, 283], [CX + 0.8, 289], [CX, 295], [CX + 0.8, 301], [CX, 307], [CX, 314]])) },
    ...[[321, 4.2, 3.6], [325.6, 3.4, 3], [329.4, 2.5, 2.4]].map(([y, w, h]) => forma('osso', bac(ellissePti([CX, y], w / 2 + 0.6, h / 2)))),
  ]

  // Colonna: dischi e corpi dietro, poi coste, poi archi posteriori.
  const V = pos.map((p, i) => vertebra(LIVELLI[i], p))
  const dischi = []
  for (let i = 0; i < LIVELLI.length - 1; i++) {
    const a = pos[i]
    const b = pos[i + 1]
    const w = ((LIVELLI[i].w + LIVELLI[i + 1].w) / 2) * 0.9
    const h = (LIVELLI[i].s + LIVELLI[i + 1].s) / 2 - (LIVELLI[i].s + LIVELLI[i + 1].s) * 0.37
    const c = [(a.x + b.x) / 2, (a.y + b.y) / 2]
    const ang = (a.a + b.a) / 2
    dischi.push(forma('disco', gira([[c[0] - w / 2, c[1] - h / 2], [c[0] + w / 2, c[1] - h / 2], [c[0] + w / 2, c[1] + h / 2], [c[0] - w / 2, c[1] + h / 2]], c, ang)))
  }
  const coste = []
  LIVELLI.forEach((Lv, i) => {
    if (Lv.k !== 't') return
    const n = Number(Lv.n.slice(1)) - 1
    ;[1, -1].forEach((l, j) => coste.push({ k: 'osso', d: costa(n, V[i].articolazione[j], l, pos[i], f) }))
  })
  const scapole = [
    forma('osso', ass(SCAPOLA, -1)),
    forma('osso', spDx(ass(SCAPOLA, 1))),
    { k: 'osso-linea', d: curva(ass(BORDO_LATERALE, -1)) },
    { k: 'osso-linea', d: curva(spDx(ass(BORDO_LATERALE, 1))) },
    forma('osso', ass(SPINA_SCAPOLA, -1)),
    forma('osso', spDx(ass(SPINA_SCAPOLA, 1))),
  ]
  const ossa = [
    ...dischi,
    ...V.map((v) => v.corpo),
    ...coste,
    ...V.flatMap((v) => v.arco),
    ...scapole,
  ]

  // Misure: creste iliache, vertebre limite della curva toracica (angolo di Cobb), apice.
  const creste = [bac([[CX - CRESTA[0], CRESTA[1]]])[0], bac([[CX + CRESTA[0], CRESTA[1]]])[0]]
  const iApice = LIVELLI.findIndex((v) => v.n === 'T8')
  let iSu = 0
  let iGiu = iApice
  for (let i = 0; i < LIVELLI.length; i++) {
    if (LIVELLI[i].k !== 't' && LIVELLI[i].n !== 'L1' && LIVELLI[i].n !== 'L2') continue
    if (i <= iApice && (iSu === 0 || pos[i].a < pos[iSu].a)) iSu = i
    if (i >= iApice && pos[i].a > pos[iGiu].a) iGiu = i
  }
  const piatto = (i, alto) => {
    const p = pos[i]
    const c = somma([p.x, p.y], ruota([0, (alto ? -1 : 1) * LIVELLI[i].s * 0.37], p.a))
    const dir = ruota([1, 0], p.a)
    const fino = CX + 84
    const s0 = -LIVELLI[i].w * 0.6
    const s1 = (fino - c[0]) / dir[0]
    return [somma(c, [dir[0] * s0, dir[1] * s0]), somma(c, [dir[0] * s1, dir[1] * s1])]
  }
  const cobb = Math.round(pos[iGiu].a - pos[iSu].a)
  return {
    pelle,
    braccia,
    linee,
    lontane,
    cranio,
    bacino,
    ossa,
    note: {
      creste,
      apice: V[iApice].spinoso,
      apiceCentro: [pos[iApice].x, pos[iApice].y],
      cobb,
      piatti: [piatto(iSu, true), piatto(iGiu, false)],
    },
  }
}

/* ——— Busto in avanti (test di Adams) ———
   In alto la persona di profilo, piegata in avanti, con il piano del taglio. Sotto, la sezione del torace
   all'altezza delle coste come la vede chi sta dietro: schiena in alto, sterno in basso, destra a destra. */
// Persona di profilo, piegata in avanti (test di Adams): la stessa figura anatomica delle altre tavole
// (anatomia.js), ridotta e appoggiata a terra a y = 151. Il piano del taglio passa per T8.
const FIG = piegatoAvanti()
const FIG_K = 0.32
const FIG_T = [CX - 296 * FIG_K, 151 - 581 * FIG_K]
const aFig = ([x, y]) => [FIG_T[0] + x * FIG_K, FIG_T[1] + y * FIG_K]
const T8 = aFig(FIG.punti.t8)
const PIANO_TAGLIO = [[T8[0], T8[1] - 14], [T8[0], T8[1] + 34]]
const SEZ_K = 1.55
const SEZ_O = [CX, 290]
const GIBBO = 6.5

// Profilo della schiena nella sezione (u, v in unità della sezione, v negativo verso la schiena).
function dors(u, t) {
  return -30 + 20 * Math.pow(Math.abs(u) / 70, 2.4) + 2.5 * Math.exp(-(((u + 3 * t) / 5) ** 2)) - GIBBO * t * Math.exp(-(((u - 28) / 16) ** 2)) + 1.8 * t * Math.exp(-(((u + 28) / 17) ** 2))
}

export function dorsoPiegato(t) {
  const P = (u, v) => [SEZ_O[0] + u * SEZ_K, SEZ_O[1] + v * SEZ_K]
  const PL = (pts) => pts.map(([u, v]) => P(u, v))
  const ventr = (u) => 33 - 13 * Math.pow(Math.abs(u) / 70, 2.2)

  const cute = []
  for (let u = -70; u <= 70; u += 5) cute.push(P(u, dors(u, t)))
  cute.push(P(72, -4), P(72.5, 5), P(70, 14))
  for (let u = 66; u >= -66; u -= 6) cute.push(P(u, ventr(u)))
  cute.push(P(-70, 14), P(-72.5, 5), P(-72, -4))

  // Vertebra: nella scoliosi strutturale il corpo ruota verso la convessità (destra), lo spinoso va a sinistra.
  const B = [2 * t, -3]
  const rot = -16 * t
  const V = (pts) => pts.map(([u, v]) => P(...somma(B, ruota([u, v], rot))))
  const ARCO_SEZ = intera([[0, -6.5], [4.5, -6], [6, -10.5], [9, -12.5], [15, -16], [18, -18], [19.5, -16], [17, -13.5], [10.5, -10.5], [7.5, -14.5], [4.5, -19.5], [2, -23.5], [1.8, -28.5], [0, -30]])
  const tp = (l) => V([[l * 18.5, -16.5]])[0]
  const costaDx = [tp(1), P(26, -22 - 6 * t), P(38, -20.5 - 6 * t), P(50, -13 - 4 * t), P(58, -2 - 1.5 * t), P(60.5, 8), P(56, 19), P(45, 27), P(31, 31)]
  const costaSx = [tp(-1), P(-26, -22 + 2.5 * t), P(-38, -20.5 + 2.5 * t), P(-50, -13 + 1.5 * t), P(-58, -2), P(-60.5, 8), P(-56, 19), P(-45, 27), P(-31, 31)]
  const larghe = [2.2, 2.8, 3, 3, 2.9, 2.8, 2.7, 2.6, 2.2].map((w) => w * SEZ_K)
  const muscolo = (l, k) => chiusa(PL([[2.5, -25], [8, -28.5 - k], [16, -27.5 - k], [22, -23.5 - k], [22.5, -17.5 - k * 0.4], [14, -14.5], [6, -16]].map(([u, v]) => [l * u, v])))
  const scapola = (l, k) => nastro(PL([[29, -24.5 - k], [38, -26 - k], [47, -22.5 - k], [53, -16 - k * 0.6], [55, -12]].map(([u, v]) => [l * u, v])), [1.2, 2.4, 2.6, 2.2, 1].map((w) => w * SEZ_K))
  const polmoneDx = [[9, -12], [22, -17 - 3 * t], [36, -17 - 4 * t], [49, -10 - 2 * t], [55, 1], [53, 13], [45, 22], [32, 25], [18, 22], [11, 14], [8, 2]]
  const polmoneSx = [[-9, -12], [-22, -17 + 2 * t], [-36, -17 + 2 * t], [-49, -10 + t], [-55, 1], [-53, 13], [-45, 22], [-34, 24], [-24, 18], [-14, 8], [-9, 0]]

  const sezione = {
    cute: chiusa(cute),
    muscoli: [muscolo(1, 4 * t), muscolo(-1, -1.5 * t)],
    organi: [chiusa(PL(polmoneDx)), chiusa(PL(polmoneSx)), chiusa(PL(ellissePti([-8, 17], 15, 9, -20)))],
    vasi: [chiusa(PL(ellissePti([-9.5, -1], 3.2, 3.2))), chiusa(V(ellissePti([0, -13], 2, 1.8)))],
    ossa: [
      { k: 'osso-lieve', d: nastro([P(31, 31), P(18, 32.5), P(6, 31)], [2, 1.8, 1.6].map((w) => w * SEZ_K)) },
      { k: 'osso-lieve', d: nastro([P(-31, 31), P(-18, 32.5), P(-6, 31)], [2, 1.8, 1.6].map((w) => w * SEZ_K)) },
      { k: 'osso', d: nastro(costaDx, larghe) },
      { k: 'osso', d: nastro(costaSx, larghe) },
      { k: 'osso', d: scapola(1, 5 * t) },
      { k: 'osso', d: scapola(-1, -1.5 * t) },
      forma('osso', PL([[-5.5, 28.5], [5.5, 28.5], [6, 33.5], [-6, 33.5]])),
      forma('osso', V(ellissePti([0, 0], 8.5, 7.5))),
      { k: 'osso-foro', d: chiusa(V(ARCO_SEZ)) + chiusa(V(ellissePti([0, -12.5], 4.2, 3.6))) },
    ],
  }

  // Scoliometro appoggiato sulla schiena, a cavallo della colonna.
  const a = P(-26, dors(-26, t))
  const b = P(26, dors(26, t))
  const angolo = deg(Math.atan2(b[1] - a[1], b[0] - a[0]))
  const n = ruota([0, -1], angolo)
  const centro = [(a[0] + b[0]) / 2 + n[0] * 7.5, (a[1] + b[1]) / 2 + n[1] * 7.5]

  return {
    figura: { F: FIG, transform: `translate(${FIG_T[0]} ${FIG_T[1]}) scale(${FIG_K})`, piano: PIANO_TAGLIO },
    sezione,
    note: {
      angolo,
      centro,
      larghezza: Math.hypot(b[0] - a[0], b[1] - a[1]) + 18,
      gibbo: P(30, dors(30, t)),
      simmetria: P(34, dors(34, t)),
      vertebra: V([[-7, 3]])[0],
    },
  }
}

/* ——— Bacino e gambe, da dietro ——— */
// g = 0: gambe uguali, bacino ruotato (ala iliaca destra più alta). g = 1: gamba destra più corta di 1,5 cm.
const DELTA = 5
export function bacinoGambe(g) {
  const phi = deg(Math.atan((DELTA * g) / (2 * ANCA[0])))
  const ancaSx = [CX - ANCA[0], ANCA[1]]
  const bac = (pts) => gira(pts, ancaSx, phi)
  // Rotazione dell'ala iliaca destra (solo se le gambe sono uguali): la cresta sale, l'ischio scende appena.
  const giraAla = (pts) =>
    pts.map(([x, y]) => {
      const k = 1 - g
      if (y < ANCA[1]) return [x, y - 5 * k * clamp((ANCA[1] - y) / 41)]
      return [x, y + 2 * k * clamp((y - ANCA[1]) / 36)]
    })
  const sacroRot = (pts) => gira(pts, [CX, ANCA[1]], -2.5 * (1 - g))
  const accorcia = (pts) => pts.map(([x, y]) => (y < 452 ? [x, y + DELTA * g * clamp((452 - y) / (452 - ANCA[1]))] : [x, y]))

  const testaDx = bac([[CX + ANCA[0], ANCA[1]]])[0]
  const testaSx = [CX - ANCA[0], ANCA[1]]
  const emiDx = bac(giraAla(ass(EMIBACINO, 1)))
  const emiSx = bac(ass(EMIBACINO, -1))
  const forame = (l, fn) => chiusa(fn(ass(ellissePti(OTTURATORIO.c, OTTURATORIO.rx, OTTURATORIO.ry, OTTURATORIO.a), l)))

  // Ultime lombari: seguono l'inclinazione del sacro.
  const inclSacro = phi - 2.5 * (1 - g)
  const lombari = LIVELLI.filter((v) => ['L3', 'L4', 'L5'].includes(v.n)).map((V) => {
    const k = V.n === 'L5' ? 1 : V.n === 'L4' ? 0.6 : 0.2
    const base = bac(sacroRot([[CX, 279]]))[0]
    const p = { x: base[0] + (base[0] - CX) * 0.2 * (1 - k), y: V.y + (base[1] - 279) * k, a: inclSacro * k, rho: 0 }
    return vertebra(V, p)
  })
  const dischi = lombari.slice(0, -1).map((v, i) => {
    const a = v.centro
    const b = lombari[i + 1].centro
    return forma('disco', ellissePti([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], 15, 1.6, inclSacro * 0.7))
  })

  const ossa = [
    ...dischi,
    ...lombari.map((v) => v.corpo),
    ...lombari.flatMap((v) => v.arco),
    forma('osso', ass(TIBIA, -1)),
    forma('osso', ass(TIBIA, 1)),
    forma('osso', ass(FIBULA, -1)),
    forma('osso', ass(FIBULA, 1)),
    forma('osso', ass(CALCAGNO, -1)),
    forma('osso', ass(CALCAGNO, 1)),
    forma('osso', ass(FEMORE, -1)),
    forma('osso', accorcia(ass(FEMORE, 1))),
    { k: 'osso-linea', d: curva(ass(CRESTA_INTERTROCANTERICA, -1)) },
    { k: 'osso-linea', d: curva(accorcia(ass(CRESTA_INTERTROCANTERICA, 1))) },
    forma('osso-fine', ellissePti(testaSx, R_TESTA, R_TESTA)),
    forma('osso-fine', ellissePti(testaDx, R_TESTA, R_TESTA)),
    { k: 'osso-foro', d: chiusa(emiSx) + forame(-1, bac) },
    { k: 'osso-foro', d: chiusa(emiDx) + forame(1, (p) => bac(giraAla(p))) },
    {
      k: 'osso-foro',
      d: chiusa(bac(sacroRot(ass(SACRO, 1)))) + FORI_SACRALI.flatMap(([x, y]) => [1, -1].map((l) => chiusa(bac(sacroRot(ellissePti([CX + l * x, y], 1.6, 2.1)))))).join(''),
    },
    { k: 'osso-linea', d: curva(bac(sacroRot([[CX, 283], [CX + 0.8, 289], [CX, 295], [CX + 0.8, 301], [CX, 307], [CX, 314]]))) },
    ...[[321, 4.2, 3.6], [325.6, 3.4, 3], [329.4, 2.5, 2.4]].map(([y, w, h]) => forma('osso', bac(sacroRot(ellissePti([CX, y], w / 2 + 0.6, h / 2))))),
  ]

  // Pelle: tronco dalla vita in giù e gambe. Il fianco destro scende con il bacino.
  const scendeDx = (pts) => pts.map(([x, y]) => [x, y + DELTA * g * 0.8 * clamp((y - 250) / 60) * clamp((380 - y) / 40)])
  const troncoBasso = TRONCO.filter(([, y]) => y >= 225 && y < 318)
  const latoDx = scendeDx(ass([...troncoBasso, ...GAMBA_PELLE], 1))
  const latoSx = ass([...troncoBasso, ...GAMBA_PELLE], -1)
  const pelle = [chiusa([[CX + 47, 222], ...latoDx, ...latoSx.reverse(), [CX - 47, 222]])]
  const linee = [
    linea([[CX, 318], [CX, 366]]),
    curva(scendeDx(ass(PIEGA_GLUTEA, 1))),
    curva(ass(PIEGA_GLUTEA, -1)),
    ...[1, -1].flatMap((l) => [
      curva(ass([[20, 452], [33, 455.5], [46, 452]], l)),
      curva(ass([[31, 470], [31.5, 505]], l)),
      curva(ass([[27, 548], [28, 575]], l)),
      curva(ass([[36, 548], [35, 575]], l)),
    ]),
    chiusa(ellissePti(bac(giraAla([[CX + 13, 286]]))[0], 1.7, 1.1)),
    chiusa(ellissePti(bac([[CX - 13, 286]])[0], 1.7, 1.1)),
  ]

  const cresteP = [bac([[CX - CRESTA[0], CRESTA[1]]])[0], bac(giraAla([[CX + CRESTA[0], CRESTA[1]]]))[0]]
  return {
    pelle,
    linee,
    ossa,
    note: { creste: cresteP, teste: [testaSx, testaDx], r: R_TESTA, terra: 597.5, spina: bac(giraAla([[CX + SPINA_ILIACA[0], SPINA_ILIACA[1]]]))[0] },
  }
}

