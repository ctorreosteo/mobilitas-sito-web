// Emblema del meccanismo: quattro punti del corpo, uno in evidenza (dove il problema
// nasce o si concentra secondo la pagina). variant 'ring' = quattro punti intorno a un centro,
// 'chain' = catena dall'alto in basso (collo → mano, testa → piedi).

const RING = [
  { x: 200, y: 64, lx: 50, ly: 16, cls: 'is-top' },
  { x: 200, y: 336, lx: 50, ly: 84, cls: 'is-bottom' },
  { x: 336, y: 200, lx: 84, ly: 50, cls: 'is-right' },
  { x: 64, y: 200, lx: 16, ly: 50, cls: 'is-left' },
]

const CHAIN = [
  { x: 168, y: 62 },
  { x: 222, y: 150 },
  { x: 178, y: 250 },
  { x: 226, y: 338 },
]
const CHAIN_PATH = 'M168 62 C 150 100, 230 112, 222 150 C 214 192, 168 206, 178 250 C 188 292, 236 300, 226 338'

const Emblem = ({ emblem, id }) => {
  const { labels, caption, variant = 'ring' } = emblem
  const accentIndex = Math.max(0, labels.findIndex((l) => l.accent))

  if (variant === 'chain') {
    return (
      <figure className="mx-cl-emblem mx-cl-emblem--chain">
        <div className="mx-cl-emblem__stage">
          <svg viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <linearGradient id={`${id}-chain`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#72fa93" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <circle className="mx-cl-emblem__orbit" cx="200" cy="200" r="176" />
            <path d={CHAIN_PATH} className="mx-cl-emblem__glow" />
            <path d={CHAIN_PATH} fill="none" stroke={`url(#${id}-chain)`} strokeWidth="3" strokeLinecap="round" />
            <circle r="6" className="mx-cl-emblem__runner" style={{ offsetPath: `path('${CHAIN_PATH}')` }} />
            {CHAIN.map((p, i) =>
              i === accentIndex ? (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="30" className="mx-cl-emblem__pulse" />
                  <circle cx={p.x} cy={p.y} r="13" fill="#72fa93" />
                  <circle cx={p.x} cy={p.y} r="5" fill="#002552" />
                </g>
              ) : (
                <circle key={i} cx={p.x} cy={p.y} r="9" fill="#002552" stroke="#f4f4f4" strokeOpacity="0.7" strokeWidth="2" />
              )
            )}
          </svg>
          {labels.map((l, i) => (
            <span
              key={l.text}
              className={`mx-cl-emblem__label ${i % 2 ? 'is-left' : 'is-right'} ${i === accentIndex ? 'is-accent' : ''}`}
              style={{ top: `${(CHAIN[i].y / 400) * 100}%`, left: `${(CHAIN[i].x / 400) * 100}%` }}
            >
              {l.text}
            </span>
          ))}
        </div>
        <figcaption>{caption}</figcaption>
      </figure>
    )
  }

  const a = RING[accentIndex]
  return (
    <figure className="mx-cl-emblem">
      <div className="mx-cl-emblem__stage">
        <svg viewBox="0 0 400 400" aria-hidden="true">
          <defs>
            <radialGradient id={`${id}-core`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#72fa93" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#72fa93" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle className="mx-cl-emblem__orbit" cx="200" cy="200" r="176" />
          <circle cx="200" cy="200" r="136" fill="none" stroke="#f4f4f4" strokeOpacity="0.12" strokeWidth="1" />
          {RING.map((p, i) =>
            i === accentIndex ? null : (
              <line key={i} x1={p.x} y1={p.y} x2="200" y2="200" stroke="#f4f4f4" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="3 7" />
            )
          )}
          <line x1={a.x} y1={a.y} x2="200" y2="200" stroke="#72fa93" strokeWidth="2.5" strokeLinecap="round" />
          <circle r="5" className="mx-cl-emblem__runner" style={{ offsetPath: `path('M${a.x} ${a.y} L200 200')` }} />
          <circle cx="200" cy="200" r="58" fill={`url(#${id}-core)`} />
          <circle cx="200" cy="200" r="26" fill="#002552" stroke="#72fa93" strokeWidth="2" />
          <circle cx="200" cy="200" r="7" fill="#72fa93" />
          {RING.map((p, i) =>
            i === accentIndex ? (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="30" className="mx-cl-emblem__pulse" />
                <circle cx={p.x} cy={p.y} r="14" fill="#72fa93" />
                <circle cx={p.x} cy={p.y} r="5" fill="#002552" />
              </g>
            ) : (
              <circle key={i} cx={p.x} cy={p.y} r="9" fill="#002552" stroke="#f4f4f4" strokeOpacity="0.7" strokeWidth="2" />
            )
          )}
        </svg>
        {labels.map((l, i) => (
          <span
            key={l.text}
            className={`mx-cl-emblem__label ${RING[i].cls} ${i === accentIndex ? 'is-accent' : ''}`}
            style={{ top: `${RING[i].ly}%`, left: `${RING[i].lx}%` }}
          >
            {l.text}
          </span>
        ))}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default Emblem
