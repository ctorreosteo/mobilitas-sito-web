import React, { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { RECENSIONI_IMAGES } from '../../data/recensioni'
import { RECENSIONI_TOTALI } from '../../data/studi'
import GoogleReviewsLinks from '../GoogleReviewsLinks'

// Nastro delle recensioni (screenshot ufficiali) per la campagna cervicalgia:
// carosello a scorrimento con barra di avanzamento e frecce su desktop.
const TILTS = [-1.6, 1.2, -0.6, 1.8, -1.2, 0.8]

const CervReviews = ({ align = 'start', className = '' }) => {
  const ref = useRef(null)
  const [pos, setPos] = useState(0)

  const onScroll = () => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setPos(max > 0 ? el.scrollLeft / max : 0)
  }

  const nudge = (dir) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 980), behavior: 'smooth' })
  }

  return (
    <div className={`mx-cerv-rev mx-cerv-rev--${align} ${className}`}>
      <div className="mx-cerv-rev__head">
        <h2 className="mx-h mx-cerv-rev__title">
          <span className="mx-cerv-rev__star" aria-hidden="true">
            <Star size={18} strokeWidth={2.4} />
          </span>
          <span>
            Siamo lo studio osteopatico con <span className="mx-accent">più recensioni d'Italia</span>
          </span>
        </h2>
        <div className="mx-cerv-rev__arrows">
          <button type="button" onClick={() => nudge(-1)} aria-label="Recensioni precedenti">
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label="Recensioni successive">
            <ArrowRight size={18} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      <div className="mx-cerv-rev__track" ref={ref} onScroll={onScroll}>
        {RECENSIONI_IMAGES.map((src, i) => (
          <figure
            key={src}
            className="mx-cerv-rev__card"
            style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}
            data-recensione-card={i}
          >
            <img src={src} alt={`Recensione ${i + 1}`} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>

      <div className="mx-cerv-rev__bar" aria-hidden="true">
        <i style={{ transform: `translateX(${pos * 400}%)` }} />
      </div>

      <p className="mx-cerv-rev__note">
        Scorri per vedere alcune delle oltre {RECENSIONI_TOTALI} recensioni ufficiali
      </p>
      <GoogleReviewsLinks align={align} className="mx-cerv-rev__links" />
    </div>
  )
}

export default CervReviews
