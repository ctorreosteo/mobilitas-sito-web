import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import '../../styles/pages/landing-accordion.css'

// Fisarmonica accessibile per le FAQ delle landing.
// Le risposte restano nel DOM (SEO), chiuse con grid-template-rows: 0fr.
// Lo stile della singola landing passa da `className` (es. "mx-mds-faq").
// Controllata (open/onToggle) o autonoma.
export default function LandingAccordion({ items, className = '', open, onToggle, defaultOpen = null }) {
  const [inner, setInner] = useState(defaultOpen)
  const uid = useId()
  const current = open !== undefined ? open : inner
  const toggle = (i) => {
    const next = current === i ? null : i
    if (onToggle) onToggle(next)
    else setInner(next)
  }

  return (
    <div className={`mx-acc ${className}`}>
      {items.map((item, i) => {
        const isOpen = current === i
        const Icon = item.icon
        return (
          <div key={i} className={`mx-acc__item ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              id={`${uid}-q${i}`}
              className="mx-acc__q"
              aria-expanded={isOpen}
              aria-controls={`${uid}-a${i}`}
              onClick={() => toggle(i)}
            >
              {Icon && (
                <span className="mx-acc__icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={2.2} />
                </span>
              )}
              <span className="mx-acc__label">{item.q}</span>
              <span className="mx-acc__chev" aria-hidden="true">
                <ChevronDown size={20} strokeWidth={2.4} />
              </span>
            </button>
            <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className="mx-acc__a">
              <div className="mx-acc__a-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
