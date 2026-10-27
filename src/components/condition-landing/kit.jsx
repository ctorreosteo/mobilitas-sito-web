import { useContext } from 'react'
import { CalendarCheck, Check, Phone } from 'lucide-react'
import { MaskLines } from '../home-sections/HomeKit'
import { CtaContext } from './ctaContext'
import { VisitaCtas } from '../landing/VisitaCtas'

// Titolo a due righe: { main, accent } (accent opzionale)
export const Title = ({ as: Tag = 'h2', title, className = 'mx-cl-h2', accentClass = 'mx-accent', immediate = false, delay = 0 }) => (
  <Tag className={`mx-h ${className}`}>
    <MaskLines
      immediate={immediate}
      delay={delay}
      lines={[{ text: title.main }, ...(title.accent ? [{ text: title.accent, className: accentClass }] : [])]}
    />
  </Tag>
)

// Etichetta con versione corta (telefono) e lunga (da 640px)
export const CtaLabel = ({ label }) =>
  label.short === label.long ? (
    label.long
  ) : (
    <>
      <span className="mx-cl-m">{label.short}</span>
      <span className="mx-cl-d">{label.long}</span>
    </>
  )

// Le due azioni di prenotazione (aprono il BookingPopup): prima visita / lista in verde, consulto in secondo piano.
// Con i testi standard sono i bottoni comuni delle landing di prima visita (come cervicalgia e osteopata Torino);
// con testi propri (es. la lista d'attesa di /yt-postura) restano questi.
export const BookCtas = ({ className = '' }) => {
  const cta = useContext(CtaContext)
  if (!cta.custom) {
    return <VisitaCtas onVisita={cta.openPrimaVisita} onConsulto={cta.openConsulto} className={className} />
  }
  return (
    <div className={`mx-ctas mx-cl-ctas ${className}`}>
      <button type="button" className="mx-btn mx-btn--primary mx-cl-btn" onClick={cta.openPrimaVisita}>
        <span className="mx-cl-btn__txt">
          <CtaLabel label={cta.labels.visit} />
        </span>
        <span className="mx-btn__icon">
          <CalendarCheck size={20} strokeWidth={2.4} />
        </span>
      </button>
      <button type="button" className="mx-btn mx-btn--ghost mx-cl-btn" onClick={cta.openConsulto}>
        <span className="mx-cl-btn__txt">
          <CtaLabel label={cta.labels.consulto} />
        </span>
        <span className="mx-btn__icon">
          <Phone size={19} strokeWidth={2.4} />
        </span>
      </button>
    </div>
  )
}

export const CheckList = ({ items, className = '' }) => (
  <ul className={`mx-cl-checks ${className}`}>
    {items.map((item, i) => (
      <li key={i}>
        <span className="mx-cl-checks__tick" aria-hidden="true">
          <Check size={14} strokeWidth={3} />
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
)
