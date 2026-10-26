import React, { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { TAVOLA_TESTA, TAVOLA_FILO, TAVOLA_OSSO } from './contenuti'
import { profilo, busto, linea, ruota, somma, lerp, FILO_X } from './anatomia'
import { CX, dorsoInPiedi, dorsoPiegato, bacinoGambe } from './osso'
import './tavole.css'

// Tavole interattive della landing /yt-postura-v2: figure anatomiche calcolate in SVG (anatomia.js),
// corpo in trasparenza con lo scheletro, inchiostro blu su panna o panna su blu notte.

/* ——— Disegno ——— */
// Pelle come unione: prima tutti i contorni, poi tutti i riempimenti, così restano solo i bordi esterni.
function Pelle({ forme, classe = '' }) {
  return (
    <g className={`ytp-an__pelle ${classe}`}>
      {forme.map((d, i) => (
        <path key={`t${i}`} className="ytp-an__tratto" d={d} />
      ))}
      {forme.map((d, i) => (
        <path key={`f${i}`} className="ytp-an__fondo" d={d} />
      ))}
    </g>
  )
}

function Ossa({ forme }) {
  return (
    <g className="ytp-an__ossa">
      {forme.map((o, i) =>
        o.k === 'costa' ? (
          <g key={i}>
            <path className="ytp-an__costa" d={o.d} />
            <path className="ytp-an__costa-in" d={o.d} />
          </g>
        ) : (
          <path key={i} className={`ytp-an__${o.k}`} d={o.d} />
        )
      )}
    </g>
  )
}

function Linee({ forme }) {
  return (
    <g>
      {forme.map((d, i) => (
        <path key={i} className="ytp-an__pelle-linea" d={typeof d === 'string' ? d : d.d} />
      ))}
    </g>
  )
}

// Un solo «momento d'autore» per tavola: quando entra in vista, il disegno si muove una volta da solo
// e mostra che si può toccare. Appena la persona tocca il comando, si ferma. Con «riduci movimento» va
// direttamente allo stato finale.
function useDimostrazione(ref, da, a, imposta) {
  const inVista = useInView(ref, { once: true, amount: 0.45 })
  const riduci = useReducedMotion()
  const toccato = useRef(false)
  useEffect(() => {
    if (!inVista || toccato.current) return undefined
    if (riduci) {
      imposta(a)
      return undefined
    }
    const c = animate(da, a, {
      duration: 1.8,
      delay: 0.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (x) => {
        if (!toccato.current) imposta(x)
      },
    })
    return () => c.stop()
  }, [inVista, riduci]) // eslint-disable-line react-hooks/exhaustive-deps
  return toccato
}

// Valore che raggiunge il bersaglio con una transizione breve (subito, con «riduci movimento»).
function useTransizione(meta, durata = 0.7) {
  const riduci = useReducedMotion()
  const [v, setV] = useState(meta)
  const ref = useRef(meta)
  useEffect(() => {
    if (riduci) {
      ref.current = meta
      setV(meta)
      return undefined
    }
    const c = animate(ref.current, meta, {
      duration: durata,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (x) => {
        ref.current = x
        setV(x)
      },
    })
    return () => c.stop()
  }, [meta, riduci, durata])
  return v
}

function Cursore({ id, valore, min, max, onChange, etichetta, estremi, testoValore }) {
  const pct = ((valore - min) / (max - min)) * 100
  return (
    <div className="ytp-range">
      <label className="ytp-range__label" htmlFor={id}>
        {etichetta}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={Math.round(valore)}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={testoValore}
        style={{ '--pct': `${pct}%` }}
      />
      {estremi ? (
        <div className="ytp-range__ends" aria-hidden="true">
          <span>{estremi[0]}</span>
          <span>{estremi[1]}</span>
        </div>
      ) : null}
    </div>
  )
}

function Scelta({ opzioni, valore, onChange, etichetta }) {
  return (
    <div className="ytp-seg" role="radiogroup" aria-label={etichetta}>
      {opzioni.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={valore === o.id}
          className={`ytp-seg__btn${valore === o.id ? ' is-on' : ''}`}
          onClick={() => onChange(o.id)}
        >
          {o.t}
        </button>
      ))}
    </div>
  )
}

/* ———————————————————————————————————————————————————————————————
   Tavola · Quanto pesa la testa (capitolo Testa)
   ——————————————————————————————————————————————————————————————— */
function kgPer(gradi) {
  const d = TAVOLA_TESTA.dati
  for (let i = 0; i < d.length - 1; i++) {
    if (gradi <= d[i + 1].gradi) {
      const u = (gradi - d[i].gradi) / (d[i + 1].gradi - d[i].gradi)
      return lerp(d[i].kg, d[i + 1].kg, u)
    }
  }
  return d[d.length - 1].kg
}

export function TavolaTesta() {
  const ref = useRef(null)
  const [gradi, setGradi] = useState(0)
  const toccato = useDimostrazione(ref, 0, 45, setGradi)
  const kg = kgPer(gradi)
  const g = Math.round(gradi * 2) / 2
  const F = useMemo(() => busto(g), [g])
  const c7 = F.punti.c7
  const com = F.punti.baricentroTesta
  const R = 104
  const sulArco = (a, r = R) => somma(c7, ruota([0, -r], a))
  const freccia = 14 + kg * 3.1
  const attivo = TAVOLA_TESTA.dati.reduce((m, d) => (Math.abs(d.gradi - gradi) < Math.abs(m.gradi - gradi) ? d : m))

  return (
    <figure className="ytp-tav ytp-tav--testa" ref={ref}>
      <div className="ytp-tav__head">
        <h3 className="ytp-h3 ytp-tav__title">
          <span className="ytp-h3__t">{TAVOLA_TESTA.titolo}</span>
        </h3>
        <p className="ytp-tav__text">{TAVOLA_TESTA.testo}</p>
      </div>

      <div className="ytp-tav__stage ytp-tav__stage--testa">
        <svg
          className="ytp-tav__svg"
          viewBox="96 0 210 236"
          role="img"
          aria-label={`Schema anatomico: testa flessa di ${Math.round(gradi)} gradi, circa ${Math.round(kg)} chili sul collo`}
        >
          <path d={`M${sulArco(0).join(',')} A${R},${R} 0 0 1 ${sulArco(60).join(',')}`} className="ytp-tav__guide" />
          {[0, 15, 30, 45, 60].map((a) => (
            <path key={a} d={linea([sulArco(a, R - 5), sulArco(a, R + 5)])} className="ytp-tav__tick" />
          ))}
          <path d={linea([sulArco(gradi, R - 9), sulArco(gradi, R + 9)])} className="ytp-tav__needle" />

          <Pelle forme={F.pelleCorpo} />
          <Linee forme={F.dettagli} />
          <Ossa forme={F.ossa} />
          <Pelle forme={F.pelleBraccio} classe="ytp-an__pelle--braccio" />
          <Ossa forme={F.ossaBraccio} />
          <path className="ytp-an__telefono" d={F.telefono} />

          {/* Il filo: la verticale che passa per C7 */}
          <path d={linea([[c7[0], 10], c7])} className="ytp-tav__plumb" />
          {com[0] - c7[0] > 3 ? (
            <g className="ytp-tav__lever">
              <path d={linea([[c7[0], com[1]], com])} />
              <path d={linea([[c7[0], com[1] - 4], [c7[0], com[1] + 4]])} />
            </g>
          ) : null}
          <g className="ytp-tav__weight">
            <path d={linea([com, [com[0], com[1] + freccia]])} />
            <path d={linea([[com[0] - 4.5, com[1] + freccia - 7], [com[0], com[1] + freccia], [com[0] + 4.5, com[1] + freccia - 7]])} />
            <circle cx={com[0]} cy={com[1]} r="3.2" />
          </g>
          <circle className="ytp-tav__mark" cx={c7[0]} cy={c7[1]} r="4" />
        </svg>
      </div>

      <div className="ytp-tav__readout">
        <p className="ytp-tav__big">
          <span className="ytp-tav__approx">circa</span>
          <span className="ytp-tav__num">{Math.round(kg)}</span>
          <span className="ytp-tav__unit">kg</span>
        </p>
        <p className="ytp-tav__sub">di carico sul collo, con la testa piegata di {Math.round(gradi)}°</p>
      </div>

      <div className="ytp-tav__controls">
        <Cursore
          id="ytp-cur-testa"
          valore={gradi}
          min={0}
          max={60}
          etichetta={TAVOLA_TESTA.cursore}
          estremi={['0°', '60°']}
          testoValore={`${Math.round(gradi)} gradi, circa ${Math.round(kg)} chili`}
          onChange={(x) => {
            toccato.current = true
            setGradi(x)
          }}
        />
        <ol className="ytp-bars" aria-label="Carico stimato sul collo per inclinazione">
          {TAVOLA_TESTA.dati.map((d) => (
            <li key={d.gradi} className={d === attivo ? 'is-on' : ''}>
              <button
                type="button"
                onClick={() => {
                  toccato.current = true
                  setGradi(d.gradi)
                }}
                aria-label={`${d.gradi} gradi: circa ${d.kg} chili`}
              >
                <span className="ytp-bars__kg">{d.kg}</span>
                <span className="ytp-bars__bar" style={{ '--h': d.kg / 27 }} />
                <span className="ytp-bars__deg">{d.gradi}°</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <ul className="ytp-tav__legend ytp-tav__legend--row">
        {TAVOLA_TESTA.legenda.map((l) => (
          <li key={l.id}>
            <span className={`ytp-key ytp-key--${l.id}`} aria-hidden="true" />
            <span>
              <b>{l.t}</b> {l.b}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="ytp-tav__cap">{TAVOLA_TESTA.fonte}</figcaption>
    </figure>
  )
}

/* ———————————————————————————————————————————————————————————————
   Tavola · Il filo a piombo (capitolo Petto)
   ——————————————————————————————————————————————————————————————— */
const SLOT = [70, 190, 330, 520] // altezza delle voci di legenda, in unità del disegno
const VB_FILO = [100, 10, 240, 580]
const RIFERIMENTO = profilo(0)

export function TavolaFilo() {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  const toccato = useDimostrazione(ref, 0, 100, setV)
  const t = Math.round(v) / 100
  const F = useMemo(() => profilo(t), [t])
  const curvo = t > 0.5
  const P = F.punti
  const marcatori = [P.orecchio, P.acromion, P.trocantere, P.malleolo]

  return (
    <figure className="ytp-tav ytp-tav--filo" ref={ref}>
      <div className="ytp-tav__head">
        <h3 className="ytp-h3 ytp-tav__title">
          <span className="ytp-h3__t">{TAVOLA_FILO.titolo}</span>
        </h3>
        <p className="ytp-tav__text">{TAVOLA_FILO.testo}</p>
        <Cursore
          id="ytp-cur-filo"
          valore={v}
          min={0}
          max={100}
          etichetta="Postura"
          estremi={TAVOLA_FILO.estremi}
          testoValore={curvo ? TAVOLA_FILO.estremi[1] : TAVOLA_FILO.estremi[0]}
          onChange={(x) => {
            toccato.current = true
            setV(x)
          }}
        />
      </div>

      <div className="ytp-tav__stage ytp-tav__stage--filo">
        <svg
          className="ytp-tav__svg ytp-tav__svg--filo"
          viewBox={VB_FILO.join(' ')}
          role="img"
          aria-label={curvo ? 'Schema anatomico di profilo: testa, spalle e bacino fuori dal filo' : 'Schema anatomico di profilo: corpo allineato sul filo'}
        >
          {t > 0.02 ? (
            <g className="ytp-an__traccia">
              <path d={RIFERIMENTO.pelleCorpo[0]} />
              <path d={RIFERIMENTO.pelleCorpo[RIFERIMENTO.pelleCorpo.length - 1]} />
            </g>
          ) : null}
          <Pelle forme={F.pelleCorpo} />
          <Linee forme={F.dettagli} />
          <Ossa forme={F.ossa} />
          <Pelle forme={F.pelleBraccio} classe="ytp-an__pelle--braccio" />
          <Ossa forme={F.ossaBraccio} />

          {/* Il filo a piombo */}
          <path className="ytp-tav__plumb" d={linea([[FILO_X, 14], [FILO_X, 562]])} />
          <path
            className="ytp-tav__bob"
            d={`M${FILO_X},562c3,2.6 5.4,6.4 4.7,10L${FILO_X},588l-4.7-16C${FILO_X - 5.4},568.4 ${FILO_X - 3},564.6 ${FILO_X},562z`}
          />

          {marcatori.map((m, i) => {
            const fuori = Math.abs(m[0] - FILO_X) > 3
            return (
              <g key={i}>
                <path className="ytp-tav__leader" d={linea([m, [298, m[1]], [336, SLOT[i]]])} />
                {fuori ? (
                  <g className="ytp-tav__gap">
                    <path d={linea([[FILO_X, m[1]], m])} />
                    <path d={linea([[FILO_X, m[1] - 4], [FILO_X, m[1] + 4]])} />
                  </g>
                ) : null}
                <circle className="ytp-tav__mark" cx={m[0]} cy={m[1]} r="5" />
                <circle className="ytp-tav__mark-dot" cx={m[0]} cy={m[1]} r="1.8" />
              </g>
            )
          })}
        </svg>

        <ol className="ytp-tav__legend ytp-tav__legend--side">
          {TAVOLA_FILO.punti.map((pt, i) => (
            <li key={pt.id} style={{ '--y': `${((SLOT[i] - VB_FILO[1]) / VB_FILO[3]) * 100}%` }}>
              <b>{pt.t}</b>
              <span aria-live="polite">{curvo ? pt.curvo : pt.dritto}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="ytp-tav__cap">{TAVOLA_FILO.nota}</figcaption>
    </figure>
  )
}

/* ———————————————————————————————————————————————————————————————
   Tavola · Osso o posizione? (capitolo Bacino). Anatomia vista da dietro: osso.js
   ——————————————————————————————————————————————————————————————— */
// Margini laterali per le didascalie: il disegno occupa x 38–202, le note stanno fuori.
const VB_DORSO = '-36 2 312 398'
const VB_GAMBE = '-36 222 312 384'
const NOTA_SX = CX - 88
const NOTA_DX = CX + 88
const RIGA = 11.5

function Nota({ lato = 'sx', y, righe, bersaglio, opacita = 1 }) {
  if (opacita <= 0.01) return null
  const x = lato === 'sx' ? NOTA_SX : NOTA_DX
  const y0 = y - ((righe.length - 1) * RIGA) / 2 + 3.4
  const attacco = [lato === 'sx' ? x + 3 : x - 3, y]
  return (
    <g className="ytp-os__nota" style={{ opacity: opacita }} aria-hidden="true">
      {bersaglio ? (
        <>
          <path className="ytp-os__guida" d={linea([attacco, bersaglio])} />
          <circle className="ytp-os__punto" cx={bersaglio[0]} cy={bersaglio[1]} r="1.6" />
        </>
      ) : null}
      <text x={x} y={y0} textAnchor={lato === 'sx' ? 'end' : 'start'}>
        {righe.map((r, i) => (
          <tspan key={i} x={x} dy={i ? RIGA : 0} className={r.valore ? 'is-valore' : undefined}>
            {r.valore ?? r}
          </tspan>
        ))}
      </text>
    </g>
  )
}

const prolunga = (a, b, k) => {
  const d = [b[0] - a[0], b[1] - a[1]]
  const l = Math.hypot(d[0], d[1]) || 1
  return [[a[0] - (d[0] / l) * k, a[1] - (d[1] / l) * k], [b[0] + (d[0] / l) * k, b[1] + (d[1] / l) * k]]
}

function DorsoInPiedi({ t }) {
  const F = useMemo(() => dorsoInPiedi(t), [t])
  const N = F.note
  const [cS, cD] = N.creste
  const [p1, p2] = N.piatti
  return (
    <g>
      <Pelle forme={F.braccia} classe="ytp-an__pelle--braccio" />
      <Pelle forme={F.pelle} />
      <Linee forme={F.linee} />
      <Ossa forme={F.lontane} />
      <Ossa forme={F.cranio} />
      <Ossa forme={F.bacino} />
      <Ossa forme={F.ossa} />
      <path className="ytp-os__asse" d={linea([[CX, 92], [CX, 348]])} />

      {/* Creste iliache: la linea che le unisce, e l'orizzontale di riferimento. */}
      <path className="ytp-os__livello" d={linea([[cS[0] - 16, cS[1]], [cD[0] + 16, cS[1]]])} />
      <path className="ytp-os__linea" d={linea(prolunga(cS, cD, 16))} />
      <circle className="ytp-tav__mark" cx={cS[0]} cy={cS[1]} r="3" />
      <circle className="ytp-tav__mark" cx={cD[0]} cy={cD[1]} r="3" />

      {/* Angolo di Cobb: le due vertebre più inclinate della curva toracica. */}
      <g style={{ opacity: t }}>
        <path className="ytp-os__linea ytp-os__linea--tratto" d={linea(p1)} />
        <path className="ytp-os__linea ytp-os__linea--tratto" d={linea(p2)} />
      </g>

      <Nota y={cS[1] + 4} righe={['Bacino', 'non in pari']} bersaglio={cS} opacita={1 - t} />
      <Nota y={cS[1] + 4} righe={['Bacino', 'in pari']} bersaglio={cS} opacita={t} />
      <Nota y={N.apice[1] - 6} righe={['Vertebre', 'normali']} bersaglio={N.apice} opacita={1 - t} />
      <Nota y={N.apice[1] - 6} righe={['Vertebre', 'girate']} bersaglio={N.apice} opacita={t} />
      <Nota lato="dx" y={(p1[1][1] + p2[1][1]) / 2} righe={['Curva', 'dell’osso', { valore: `${N.cobb}°` }]} opacita={t} />
    </g>
  )
}

function DorsoPiegato({ t }) {
  const F = useMemo(() => dorsoPiegato(t), [t])
  const N = F.note
  const S = F.sezione
  const lettura = Math.round(Math.abs(N.angolo))
  const mezza = N.larghezza / 2
  return (
    <g>
      {/* La persona piegata in avanti, di profilo, e il piano del taglio */}
      <g className="ytp-os__figura" transform={F.figura.transform}>
        <Pelle forme={F.figura.F.pelleCorpo} />
        <Linee forme={F.figura.F.dettagli} />
        <Ossa forme={F.figura.F.ossa} />
        <Pelle forme={F.figura.F.pelleBraccio} classe="ytp-an__pelle--braccio" />
        <Ossa forme={F.figura.F.ossaBraccio} />
      </g>
      <path className="ytp-os__linea ytp-os__linea--tratto" d={linea(F.figura.piano)} />
      <text className="ytp-os__etichetta" x={F.figura.piano[0][0]} y={F.figura.piano[0][1] - 5} textAnchor="middle">
        sezione
      </text>
      <path className="ytp-tav__ground" d={linea([[60, 151], [200, 151]])} />
      <path className="ytp-os__guida" d={linea([[CX, 162], [CX, 196]])} />
      <path className="ytp-os__guida" d={linea([[CX - 4, 191], [CX, 196], [CX + 4, 191]])} />

      {/* Sezione del torace, vista da dietro */}
      <Pelle forme={[S.cute]} />
      {S.organi.map((d, i) => (
        <path key={i} className="ytp-os__organo" d={d} />
      ))}
      {S.vasi.map((d, i) => (
        <path key={i} className="ytp-os__vaso" d={d} />
      ))}
      {S.muscoli.map((d, i) => (
        <path key={i} className="ytp-an__muscolo" d={d} />
      ))}
      <Ossa forme={S.ossa} />

      {/* Scoliometro appoggiato sulla schiena */}
      <g transform={`translate(${N.centro[0]} ${N.centro[1]}) rotate(${N.angolo})`}>
        <rect className="ytp-os__strumento" x={-mezza} y="-7" width={N.larghezza} height="14" rx="3.5" />
        {[-0.75, -0.5, -0.25, 0.25, 0.5, 0.75].map((k) => (
          <path key={k} className="ytp-os__tacca" d={`M${k * mezza},-7v${Math.abs(k) === 0.5 ? 4.5 : 2.8}`} />
        ))}
        <text className="ytp-os__lettura" x="0" y="3.6" textAnchor="middle">
          {lettura}°
        </text>
      </g>

      <Nota y={N.centro[1] - 16} righe={['Misuratore']} bersaglio={[N.centro[0] - mezza * 0.7, N.centro[1] - 4]} />
      <Nota lato="dx" y={N.simmetria[1] - 22} righe={['Schiena', 'pari']} bersaglio={N.simmetria} opacita={1 - t} />
      <Nota lato="dx" y={N.gibbo[1] - 22} righe={['Gobba']} bersaglio={N.gibbo} opacita={t} />
      <Nota y={350} righe={['Vertebra', 'normale']} bersaglio={N.vertebra} opacita={1 - t} />
      <Nota y={350} righe={['Vertebra', 'girata']} bersaglio={N.vertebra} opacita={t} />
    </g>
  )
}

function BacinoGambe({ g }) {
  const F = useMemo(() => bacinoGambe(g), [g])
  const N = F.note
  const [cS, cD] = N.creste
  const [tS, tD] = N.teste
  const barre = [
    [tS, CX - 76],
    [tD, CX + 76],
  ]
  const ancaDx = [tD[0], tD[1]]
  return (
    <g>
      <Pelle forme={F.pelle} />
      <Linee forme={F.linee} />
      <Ossa forme={F.ossa} />
      <path className="ytp-tav__ground" d={linea([[CX - 86, N.terra], [CX + 86, N.terra]])} />

      <path className="ytp-os__livello" d={linea([[cS[0] - 18, cS[1]], [cD[0] + 18, cS[1]]])} />
      <path className="ytp-os__linea" d={linea(prolunga(cS, cD, 18))} />
      <circle className="ytp-tav__mark" cx={cS[0]} cy={cS[1]} r="3" />
      <circle className="ytp-tav__mark" cx={cD[0]} cy={cD[1]} r="3" />
      <path className="ytp-os__livello" d={linea(prolunga(tS, tD, 24))} />

      {/* Lunghezza delle gambe: dalla testa del femore a terra */}
      {barre.map(([p, x], i) => {
        const y0 = p[1] - N.r
        return (
          <g key={i} className="ytp-os__misura">
            <path className="ytp-os__guida" d={linea([[p[0], y0], [x, y0]])} />
            <path className="ytp-os__linea" d={linea([[x, y0], [x, N.terra]])} />
            <path className="ytp-os__linea" d={linea([[x - 4, y0], [x + 4, y0]])} />
            <path className="ytp-os__linea" d={linea([[x - 4, N.terra], [x + 4, N.terra]])} />
          </g>
        )
      })}

      {/* Ala iliaca ruotata: la freccia gira attorno all'anca */}
      <g className="ytp-tav__turn" style={{ opacity: 1 - g }}>
        <path d={`M${ancaDx[0] - 20},${ancaDx[1] - 30} A36,36 0 0 1 ${ancaDx[0] + 22},${ancaDx[1] - 28}`} />
        <path d={linea([[ancaDx[0] + 14, ancaDx[1] - 33], [ancaDx[0] + 22, ancaDx[1] - 28], [ancaDx[0] + 15, ancaDx[1] - 22]])} />
      </g>

      <Nota y={cS[1]} righe={['Fianchi']} bersaglio={cS} />
      <Nota y={tS[1] + 6} righe={['Anche']} bersaglio={[tS[0] - N.r, tS[1]]} />
      <Nota lato="dx" y={cD[1] - 14} righe={['Bacino', 'girato']} bersaglio={[cD[0] + 4, cD[1] - 2]} opacita={1 - g} />
      <Nota lato="dx" y={440} righe={['Gambe', 'uguali']} opacita={1 - g} />
      <Nota lato="dx" y={440} righe={['Destra', { valore: '−1,5 cm' }]} opacita={g} />
    </g>
  )
}

export function TavolaOsso() {
  const ref = useRef(null)
  const [scheda, setScheda] = useState('curva')
  const [casoCurva, setCasoCurva] = useState('posizione')
  const [casoGamba, setCasoGamba] = useState('bacino')
  const [piegato, setPiegato] = useState(false)
  const S = TAVOLA_OSSO.schede
  const sc = S.find((s) => s.id === scheda)
  const caso = scheda === 'curva' ? casoCurva : casoGamba

  const t = useTransizione(casoCurva === 'osso' ? 1 : 0)
  const b = useTransizione(piegato ? 1 : 0, 0.45)
  const g = useTransizione(casoGamba === 'gamba' ? 1 : 0)
  const tR = Math.round(t * 40) / 40
  const gR = Math.round(g * 40) / 40
  const spiega = sc.spiega[caso]
  const descrizione =
    scheda === 'curva'
      ? `Schiena vista da dietro, ${piegato ? 'busto in avanti con lo strumento di misura' : 'in piedi'}: ${sc.casi.find((c) => c.id === caso).t.toLowerCase()}`
      : `Bacino e gambe visti da dietro: ${sc.casi.find((c) => c.id === caso).t.toLowerCase()}`

  return (
    <figure className="ytp-tav ytp-tav--osso" ref={ref}>
      <div className="ytp-tav__head">
        <h3 className="ytp-h3 ytp-tav__title">
          <span className="ytp-h3__t">{TAVOLA_OSSO.titolo}</span>
        </h3>
        <p className="ytp-tav__text">{TAVOLA_OSSO.testo}</p>
        <div className="ytp-tabs" role="tablist" aria-label="Scegli il confronto">
          {S.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`ytp-tab-${s.id}`}
              aria-selected={scheda === s.id}
              aria-controls="ytp-tav-osso-pannello"
              className={`ytp-tabs__btn${scheda === s.id ? ' is-on' : ''}`}
              onClick={() => {
                setScheda(s.id)
                setPiegato(false)
              }}
            >
              {s.t}
            </button>
          ))}
        </div>
      </div>

      <div className="ytp-tav__panel" id="ytp-tav-osso-pannello" role="tabpanel" aria-labelledby={`ytp-tab-${scheda}`}>
        <div className="ytp-tav__stage ytp-tav__stage--osso">
          <svg className="ytp-tav__svg ytp-os" viewBox={scheda === 'curva' ? VB_DORSO : VB_GAMBE} role="img" aria-label={descrizione}>
            {scheda === 'curva' ? (
              <>
                {b < 0.99 ? (
                  <g style={{ opacity: 1 - b }}>
                    <DorsoInPiedi t={tR} />
                  </g>
                ) : null}
                {b > 0.01 ? (
                  <g style={{ opacity: b }}>
                    <DorsoPiegato t={tR} />
                  </g>
                ) : null}
              </>
            ) : (
              <BacinoGambe g={gR} />
            )}
          </svg>
        </div>

        <div className="ytp-tav__side">
          <Scelta etichetta="Caso" opzioni={sc.casi} valore={caso} onChange={scheda === 'curva' ? setCasoCurva : setCasoGamba} />
          {scheda === 'curva' ? (
            <Scelta
              etichetta="Posizione"
              opzioni={sc.posizioni.map((x, i) => ({ id: i ? 'giu' : 'su', t: x }))}
              valore={piegato ? 'giu' : 'su'}
              onChange={(id) => setPiegato(id === 'giu')}
            />
          ) : null}
          <div className="ytp-tav__explain" aria-live="polite">
            {spiega.map((s, i) => (
              <p key={i}>{s}</p>
            ))}
            {scheda === 'curva' && piegato ? <p className="ytp-tav__hint">{TAVOLA_OSSO.sezione}</p> : null}
          </div>
        </div>
      </div>
      <figcaption className="ytp-tav__cap">{TAVOLA_OSSO.nota}</figcaption>
    </figure>
  )
}

// Figura allineata, ferma: chiusura della pagina (stesso disegno della tavola del filo, posa allineata).
export function FiguraAllineata({ className = '' }) {
  return (
    <svg className={className} viewBox={VB_FILO.join(' ')} aria-hidden="true">
      <Pelle forme={RIFERIMENTO.pelleCorpo} />
      <Linee forme={RIFERIMENTO.dettagli} />
      <Ossa forme={RIFERIMENTO.ossa} />
      <Pelle forme={RIFERIMENTO.pelleBraccio} classe="ytp-an__pelle--braccio" />
      <Ossa forme={RIFERIMENTO.ossaBraccio} />
      <path className="ytp-tav__plumb" d={linea([[FILO_X, 10], [FILO_X, 590]])} />
      {[RIFERIMENTO.punti.orecchio, RIFERIMENTO.punti.acromion, RIFERIMENTO.punti.trocantere, RIFERIMENTO.punti.malleolo].map((m, i) => (
        <circle key={i} className="ytp-tav__mark" cx={m[0]} cy={m[1]} r="4.5" />
      ))}
    </svg>
  )
}
