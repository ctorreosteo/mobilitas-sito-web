import React, { useRef } from 'react'
import { RECENSIONI_IMAGES } from '../../data/recensioni'
import { SCOMPENSI, VISITA, OBIETTIVO, MAPPA, RECENSIONI_CAROSELLO } from './contenuti'
import './foto.css'

// Foto reali dello studio usate come grafica: scompensi su foto allineate, prima visita annotata, obiettivo.
// Ritagli in public/yt-postura-v2/ (fonti nel brief dell'incarico).

const src = (nome, w) => `/yt-postura-v2/${nome}-${w}.jpg`
const set = (nome, larghezze) => larghezze.map((w) => `${src(nome, w)} ${w}w`).join(', ')

// Ritagli «scompenso-*»: stessa scala per tutti (sommità del capo al 5%, malleolo al 93% dell'altezza),
// malleolo al centro, soggetti tutti rivolti a destra. Coordinate in % del ritaglio (x, y).
const K = 2.222 // altezza/larghezza del ritaglio (0,45): il disegno usa un viewBox 100 × 222
const PUNTI = {
  dritto: { orecchio: [51.6, 12.3] },
  lui: { orecchio: [54.9, 12.7], schiena: [[39.5, 22], [34, 30], [35.5, 40], [41, 48], [37, 55]] },
  sport: { orecchio: [56.5, 13.2], schiena: [[50.7, 20], [40, 25], [36.7, 30], [37.8, 40], [41, 48], [39, 55]] },
  lei: { orecchio: [53.9, 12.5], schiena: [[40, 20], [36.7, 30], [40, 40], [42, 45], [34.4, 52], [37.8, 58]] },
  uomo: { orecchio: [55.5, 11.7], schiena: [[46.7, 20], [38.9, 25], [36.7, 32], [40, 40], [42, 46], [38.9, 52]] },
}
const CAV = [50, 93]

// Curva morbida che passa per i punti, spostata un poco fuori dalla pelle.
function curva(pts, dx = -3) {
  const P = pts.map(([x, y]) => [x + dx, y * K])
  let d = `M${P[0][0]},${P[0][1]}`
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[Math.max(0, i - 1)]
    const p1 = P[i]
    const p2 = P[i + 1]
    const p3 = P[Math.min(P.length - 1, i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`
  }
  return d
}

function Segni({ id }) {
  const P = PUNTI[id]
  const [ox, oy] = P.orecchio
  return (
    <svg className="ytp-sc__segni" viewBox={`0 0 100 ${100 * K}`} preserveAspectRatio="none" aria-hidden="true">
      <line className="ytp-sc__filo" x1={CAV[0]} y1={3 * K} x2={CAV[0]} y2={CAV[1] * K} />
      {P.schiena ? <path className="ytp-sc__schiena" d={curva(P.schiena)} /> : null}
      {ox - CAV[0] > 2.5 ? <line className="ytp-sc__gap" x1={CAV[0]} y1={oy * K} x2={ox} y2={oy * K} /> : null}
      <circle className="ytp-sc__punto" cx={ox} cy={oy * K} r="2.6" />
      <circle className="ytp-sc__punto" cx={CAV[0]} cy={CAV[1] * K} r="2.6" />
    </svg>
  )
}

/* ——— Scompensi: fila di foto piccole (su telefono si scorre col dito) ——— */
export function Scompensi() {
  return (
    <figure className="ytp-sc">
      <div className="ytp-sc__testa">
        <h3 className="ytp-h3 ytp-sc__title">
          <span className="ytp-h3__t">{SCOMPENSI.titolo}</span>
        </h3>
        <p className="ytp-sc__text">{SCOMPENSI.testo}</p>
      </div>
      <ul className="ytp-sc__fila ytp-strip">
        {SCOMPENSI.foto.map((f) => (
          <li key={f.id} className={`ytp-sc__card${f.riferimento ? ' is-rif' : ''}`}>
            <div className="ytp-sc__foto">
              <img
                src={src(`scompenso-${f.id}`, 240)}
                srcSet={set(`scompenso-${f.id}`, [240, 360])}
                sizes="(min-width: 64rem) 9rem, 7rem"
                width="240"
                height="533"
                alt={`Persona in piedi di profilo: ${f.t.toLowerCase()}`}
                loading="lazy"
                decoding="async"
              />
              <Segni id={f.id} />
            </div>
            <p className="ytp-sc__t">{f.t}</p>
          </li>
        ))}
      </ul>
      <figcaption className="ytp-sc__cap">{SCOMPENSI.nota}</figcaption>
    </figure>
  )
}

/* ——— Recensioni: carosello orizzontale ——— */
export function Carosello() {
  const ref = useRef(null)
  const vai = (dir) => {
    const el = ref.current
    if (!el) return
    const passo = el.querySelector('li')?.getBoundingClientRect().width || 300
    el.scrollBy({ left: dir * (passo + 16), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }
  return (
    <div className="ytp-car">
      <ul className="ytp-car__lista ytp-strip" ref={ref} aria-label="Recensioni Google">
        {RECENSIONI_IMAGES.slice(0, RECENSIONI_CAROSELLO.quante).map((img, i) => (
          <li key={img}>
            <img src={img} alt={`Recensione Google ${i + 1}`} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
      <div className="ytp-car__comandi">
        <span className="ytp-car__hint">{RECENSIONI_CAROSELLO.scorri}</span>
        <button type="button" className="ytp-car__btn" onClick={() => vai(-1)} aria-label="Recensioni precedenti">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" className="ytp-car__btn" onClick={() => vai(1)} aria-label="Recensioni successive">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  )
}

/* ——— Mappa delle due sedi: vie reali (OpenStreetMap) in un SVG statico, pin sopra ——— */
// Stessa proiezione di runtime/mappa-script/genera.py (incarico): quadro e scala devono coincidere.
const MAP = { W: 700, H: 1008.3, lon: [7.647, 7.676], lat: [45.0555, 45.085] }
const MAP_KX = Math.cos((45.07 * Math.PI) / 180)
const MAP_S = MAP.W / ((MAP.lon[1] - MAP.lon[0]) * MAP_KX)
const mxy = (lat, lon) => [(lon - MAP.lon[0]) * MAP_KX * MAP_S, (MAP.lat[1] - lat) * MAP_S]

export function MappaTorino({ sedi, scuro = false }) {
  const [A, B] = MAPPA.sedi
  const pa = mxy(A.lat, A.lon)
  const pb = mxy(B.lat, B.lon)
  const km = (Math.hypot(pb[0] - pa[0], pb[1] - pa[1]) / MAP_S / 0.0089932).toFixed(1).replace('.', ',') // gradi → km
  const mid = [pa[0] + (pb[0] - pa[0]) * 0.3, pa[1] + (pb[1] - pa[1]) * 0.3]
  const km1 = 0.0089932 * MAP_S // 1 km in unità della mappa
  return (
    <figure className="ytp-mappa">
      <div className="ytp-mappa__quadro">
        <img src={scuro ? '/yt-postura-v2/mappa-sedi-scura.svg' : '/yt-postura-v2/mappa-sedi.svg'} alt="" width="700" height="1008" loading="lazy" decoding="async" />
        <svg viewBox={`0 0 ${MAP.W} ${MAP.H}`} role="img" aria-label={`Mappa di Torino con le due sedi: ${A.nome}, ${A.via}, e ${B.nome}, ${B.via}, a circa ${km} km in linea d’aria`}>
          <path d={`M${pa[0]},${pa[1]}L${pb[0]},${pb[1]}`} className="ytp-mappa__tratto" />
          <g transform={`translate(${mid[0]}, ${mid[1]})`}>
            <rect x="-46" y="-19" width="92" height="38" rx="19" className="ytp-mappa__km-bg" />
            <text y="9" className="ytp-mappa__km">{km} km</text>
          </g>
          {[[A, pa, 1], [B, pb, -1]].map(([s, p, lato]) => (
            <a key={s.id} href={sedi[s.id]} target="_blank" rel="noopener noreferrer" className="ytp-mappa__sede" aria-label={`${s.nome}, ${s.via}: apri in Google Maps`}>
              <rect x={lato > 0 ? p[0] - 30 : p[0] - 248} y={p[1] - 84} width="278" height="104" className="ytp-mappa__area" />
              <ellipse cx={p[0]} cy={p[1]} rx="12" ry="5" className="ytp-mappa__ombra" />
              <path d={`M${p[0]},${p[1]}c-4-10-18-17-18-30a18,18 0 1 1 36,0c0,13-14,20-18,30z`} className="ytp-mappa__pin" />
              <circle cx={p[0]} cy={p[1] - 31} r="7" className="ytp-mappa__pin-dot" />
              <g transform={`translate(${lato > 0 ? p[0] + 28 : p[0] - 238}, ${p[1] - 62})`}>
                <rect width="210" height="66" rx="10" className="ytp-mappa__card" />
                <text x="16" y="28" className="ytp-mappa__nome">{s.nome}</text>
                <text x="16" y="54" className="ytp-mappa__via">{s.via}</text>
              </g>
            </a>
          ))}
          <g className="ytp-mappa__scala" transform={`translate(${MAP.W - 24 - km1}, ${MAP.H - 26})`}>
            <rect x="-12" y="-38" width={km1 + 24} height="50" rx="8" className="ytp-mappa__km-bg" />
            <path d={`M0,0L${km1},0M0,-6L0,6M${km1},-6L${km1},6`} />
            <text x={km1 / 2} y="-12">1 km</text>
          </g>
        </svg>
      </div>
      <figcaption className="ytp-mappa__cap">
        {MAPPA.nota} Dati © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>.
      </figcaption>
    </figure>
  )
}

/* ——— Foto annotata della prima visita ——— */
// Nel ritaglio: centro tra i talloni al 50%, linea delle spalle al 22%, del bacino al 44%.
const LINEE_VISITA = { filo: 50, spalle: 22.2, bacino: 43.9 }

export function Visita() {
  return (
    <figure className="ytp-visita">
      <div className="ytp-visita__foto">
        <img
          src={src('visita-dietro', 400)}
          srcSet={set('visita-dietro', [400, 640, 960])}
          sizes="(min-width: 64rem) 15rem, 40vw"
          width="400"
          height="817"
          alt="Persona in piedi vista da dietro, durante la valutazione posturale in studio"
          loading="lazy"
          decoding="async"
        />
        <svg viewBox="0 0 100 204" preserveAspectRatio="none" aria-hidden="true">
          <line className="is-filo" x1={LINEE_VISITA.filo} y1="2" x2={LINEE_VISITA.filo} y2="200" vectorEffect="non-scaling-stroke" />
          <line x1="8" y1={LINEE_VISITA.spalle * 2.04} x2="78" y2={LINEE_VISITA.spalle * 2.04} vectorEffect="non-scaling-stroke" />
          <line x1="14" y1={LINEE_VISITA.bacino * 2.04} x2="78" y2={LINEE_VISITA.bacino * 2.04} vectorEffect="non-scaling-stroke" />
        </svg>
        {VISITA.punti.map((p, i) => (
          <span
            key={p.id}
            className={`ytp-visita__n ytp-visita__n--${p.id}`}
            style={p.id === 'filo' ? { left: `${LINEE_VISITA.filo}%`, top: '6%' } : { left: '84%', top: `${LINEE_VISITA[p.id]}%` }}
            aria-hidden="true"
          >
            {i + 1}
          </span>
        ))}
      </div>
      <div className="ytp-visita__testo">
        <h3 className="ytp-h3">
          <span className="ytp-h3__t">{VISITA.titolo}</span>
        </h3>
        <ol className="ytp-visita__lista">
          {VISITA.punti.map((p, i) => (
            <li key={p.id}>
              <span className="ytp-visita__k" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>{p.t}</b> {p.b}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="ytp-visita__cap">{VISITA.nota}</figcaption>
    </figure>
  )
}

/* ——— Obiettivo ——— */
export function Obiettivo() {
  return (
    <figure className="ytp-obiettivo">
      <div className="ytp-sc__foto ytp-obiettivo__foto">
        <img
          src={src('scompenso-dritto', 240)}
          srcSet={set('scompenso-dritto', [240, 360, 540])}
          sizes="(min-width: 64rem) 12rem, 32vw"
          width="240"
          height="533"
          alt={OBIETTIVO.alt}
          loading="lazy"
          decoding="async"
        />
        <Segni id="dritto" />
      </div>
      <figcaption className="ytp-obiettivo__testo">
        {OBIETTIVO.righe.map((r) => (
          <span key={r} className="ytp-obiettivo__riga">
            {r}
          </span>
        ))}
        <strong className="ytp-obiettivo__chiusa">{OBIETTIVO.chiusa}</strong>
      </figcaption>
    </figure>
  )
}
