import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import '../../styles/pages/lead-sheet.css'

// Modulo di richiesta delle landing a pagamento (osteopata-torino, offerta-yt, offerta-influencer).
// Solo presentazione: stato, validazione e invio restano nelle pagine, identici a prima.
// Su telefono sale dal basso come un foglio; su desktop è una finestra centrata.
// tone: 'ot' | 'yt' | 'inf' cambia solo l'accento grafico.
const LeadFormSheet = ({
  open,
  onClose,
  title,
  intro,
  formData,
  formErrors,
  onChange,
  onSubmit,
  isSubmitting = false,
  submitError = '',
  submitLabel = 'Prenota con sconto',
  extraField = null,
  tone = 'ot',
}) => {
  // Blocca lo scorrimento della pagina sotto il foglio
  useEffect(() => {
    if (!open) return undefined
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prev
    }
  }, [open])

  const err = (name) => formErrors[name] && <p className="mx-lsh__err">{formErrors[name]}</p>

  if (typeof document === 'undefined') return null

  // Portale nel body: deve coprire anche l'header fisso, che sta fuori da .mx-page
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`mx-lsh mx-lsh--${tone}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose()
            }
          }}
        >
          <motion.div
            className="mx-lsh__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`mx-lsh-title-${tone}`}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <span className="mx-lsh__grip" aria-hidden="true" />
            <button type="button" onClick={onClose} className="mx-lsh__close" aria-label="Chiudi">
              <X size={18} strokeWidth={2.6} />
            </button>

            <div className="mx-lsh__head">
              <h3 id={`mx-lsh-title-${tone}`} className="mx-lsh__title">{title}</h3>
              <p className="mx-lsh__intro">{intro}</p>
            </div>

            <form onSubmit={onSubmit} className="mx-lsh__form">
              <div className="mx-lsh__row">
                <div className="mx-lsh__field">
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome *"
                    value={formData.nome}
                    onChange={onChange}
                    required
                    minLength={2}
                    autoComplete="given-name"
                    className={`mx-lsh__input ${formErrors.nome ? 'is-error' : ''}`}
                  />
                  {err('nome')}
                </div>
                <div className="mx-lsh__field">
                  <input
                    type="text"
                    name="cognome"
                    placeholder="Cognome *"
                    value={formData.cognome}
                    onChange={onChange}
                    required
                    minLength={2}
                    autoComplete="family-name"
                    className={`mx-lsh__input ${formErrors.cognome ? 'is-error' : ''}`}
                  />
                  {err('cognome')}
                </div>
              </div>

              <div className="mx-lsh__field">
                <input
                  type="tel"
                  name="cellulare"
                  placeholder="Cellulare *"
                  value={formData.cellulare}
                  onChange={onChange}
                  required
                  minLength={10}
                  pattern="[0-9+\s\-\(\)]+"
                  autoComplete="tel"
                  className={`mx-lsh__input ${formErrors.cellulare ? 'is-error' : ''}`}
                />
                {err('cellulare')}
              </div>

              <div className="mx-lsh__field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                  className={`mx-lsh__input ${formErrors.email ? 'is-error' : ''}`}
                />
                {err('email')}
              </div>

              {extraField}

              <div className="mx-lsh__field">
                <div className="mx-lsh__check">
                  <input
                    type="checkbox"
                    name="privacy"
                    id="privacy"
                    checked={formData.privacy}
                    onChange={onChange}
                    required
                  />
                  <label htmlFor="privacy">
                    Accetto la <a href="#">privacy policy</a> e autorizzo il trattamento dei miei dati personali
                  </label>
                </div>
                {err('privacy')}
              </div>

              {submitError && <p className="mx-lsh__submit-err">{submitError}</p>}

              <button type="submit" disabled={isSubmitting} className="mx-lsh__submit">
                {isSubmitting ? 'Invio in corso...' : submitLabel}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default LeadFormSheet
