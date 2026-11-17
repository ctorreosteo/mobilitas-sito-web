import { CalendarClock } from 'lucide-react'
import { MaskLines } from '../home-sections/HomeKit'
import { SCADENZA_TESTO, due, useMancano } from './offerta'
import '../../styles/pages/black-friday.css'

// Pezzi grafici comuni alle landing del Black Friday 2026 (stile in styles/pages/black-friday.css, prefisso mx-bf-).

// Conto alla rovescia fino alla fine dell'offerta; finita l'offerta, lo dice
export function ContoAllaRovescia({ className = '' }) {
  const mancano = useMancano()
  if (!mancano) {
    return (
      <p className={`mx-bf-count is-over ${className}`}>
        <CalendarClock size={16} strokeWidth={2.4} aria-hidden="true" />
        L’offerta Black Friday è terminata
      </p>
    )
  }
  const parti = [
    [mancano.giorni, mancano.giorni === 1 ? 'giorno' : 'giorni'],
    [due(mancano.ore), 'ore'],
    [due(mancano.min), 'min'],
    [due(mancano.sec), 'sec'],
  ]
  return (
    <div className={`mx-bf-count ${className}`} role="timer" aria-label={`Mancano ${mancano.giorni} giorni e ${mancano.ore} ore alla fine dell’offerta`}>
      <span className="mx-bf-count__lbl">
        <CalendarClock size={15} strokeWidth={2.4} aria-hidden="true" />
        Fino a {SCADENZA_TESTO}
      </span>
      <span className="mx-bf-count__time" aria-hidden="true">
        {parti.map(([v, u]) => (
          <span key={u} className="mx-bf-count__unit">
            <b>{v}</b>
            <small>{u}</small>
          </span>
        ))}
      </span>
    </div>
  )
}

// Titolo a due righe { main, accent } con l'effetto delle sezioni della cervicalgia
export function Titolo({ title, className = 'mx-h mx-h--lg' }) {
  return (
    <h2 className={className}>
      <MaskLines lines={[{ text: title.main }, ...(title.accent ? [{ text: title.accent, className: 'mx-gradient' }] : [])]} />
    </h2>
  )
}

// "Qualunque sia il suo problema": i problemi che trattiamo, come etichette
export function ElencoProblemi({ problemi, titolo = 'Qualunque sia il suo problema, per esempio:' }) {
  return (
    <div className="mx-bf-problems">
      <p className="mx-bf-problems__t">{titolo}</p>
      <ul className="mx-bf-problems__list">
        {problemi.map((p) => (
          <li key={p}>{p}</li>
        ))}
        <li className="is-more">e molto altro</li>
      </ul>
    </div>
  )
}
