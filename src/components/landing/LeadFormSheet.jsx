import React from 'react'
import Dialog, { DialogHeader } from '../ui/Dialog'
import '../../styles/pages/lead-sheet.css'

// Modulo di richiesta delle landing a pagamento (osteopata-torino, offerta-yt, offerta-influencer),
// costruito sul guscio comune dei popup (components/ui/Dialog).
// Solo presentazione: stato, validazione e invio restano nelle pagine, identici a prima.
// tone: 'ot' | 'yt' | 'inf' cambia solo un accento grafico.
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
  const err = (name) => formErrors[name] && <p className="mx-lsh__err">{formErrors[name]}</p>

  return (
    <Dialog isOpen={open} onClose={onClose} title={title} closeDisabled={isSubmitting} size="sm" className={`mx-lsh mx-lsh--${tone}`}>
      <DialogHeader title={title} text={intro} />

      <form onSubmit={onSubmit} className="mx-dlg-form">
        <div className="mx-dlg-row mx-dlg-row--2 mx-lsh__row">
          <div className="mx-dlg-field">
            <input
              type="text"
              name="nome"
              placeholder="Nome *"
              value={formData.nome}
              onChange={onChange}
              required
              minLength={2}
              autoComplete="given-name"
              aria-label="Nome"
              className={`mx-dlg-input ${formErrors.nome ? 'is-error' : ''}`}
            />
            {err('nome')}
          </div>
          <div className="mx-dlg-field">
            <input
              type="text"
              name="cognome"
              placeholder="Cognome *"
              value={formData.cognome}
              onChange={onChange}
              required
              minLength={2}
              autoComplete="family-name"
              aria-label="Cognome"
              className={`mx-dlg-input ${formErrors.cognome ? 'is-error' : ''}`}
            />
            {err('cognome')}
          </div>
        </div>

        <div className="mx-dlg-field">
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
            aria-label="Cellulare"
            className={`mx-dlg-input ${formErrors.cellulare ? 'is-error' : ''}`}
          />
          {err('cellulare')}
        </div>

        <div className="mx-dlg-field">
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={onChange}
            required
            autoComplete="email"
            aria-label="Email"
            className={`mx-dlg-input ${formErrors.email ? 'is-error' : ''}`}
          />
          {err('email')}
        </div>

        {extraField}

        <div className="mx-dlg-field">
          <label className="mx-dlg-check" htmlFor="privacy">
            <input
              type="checkbox"
              name="privacy"
              id="privacy"
              checked={formData.privacy}
              onChange={onChange}
              required
            />
            <span>
              Accetto la{' '}
              <a href="https://www.iubenda.com/privacy-policy/67925714" target="_blank" rel="noopener noreferrer" className="mx-lsh__link">
                privacy policy
              </a> e autorizzo il trattamento dei miei dati personali
            </span>
          </label>
          {err('privacy')}
        </div>

        {submitError && <p className="mx-dlg-error">{submitError}</p>}

        <button type="submit" disabled={isSubmitting} className="mx-dlg-submit">
          {isSubmitting && <span className="mx-dlg-spinner" aria-hidden="true" />}
          {isSubmitting ? 'Invio in corso...' : submitLabel}
        </button>
      </form>
    </Dialog>
  )
}

export default LeadFormSheet
