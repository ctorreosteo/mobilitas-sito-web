import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download } from 'lucide-react'
import Dialog, { DialogHeader } from './ui/Dialog'

const API_BASE = import.meta.env.VITE_API_BASE
  || 'https://mobilitas-backend-990845221858.europe-west8.run.app'

const cleanName = (name) =>
  name.trim().replace(/\s+/g, ' ').split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')

const parseCellulare = (raw) => {
  const s = raw.trim().replace(/\s+/g, '').replace(/[-.]/g, '')
  if (!s) return { prefissoCellulare: '+39', cellulare: '' }
  if (s.startsWith('+')) {
    const match = s.match(/^(\+\d{1,4})(\d+)$/)
    if (match) return { prefissoCellulare: match[1], cellulare: match[2] }
    const digits = s.replace(/\D/g, '')
    const pref = digits.length >= 2 ? '+' + digits.slice(0, 2) : '+39'
    const num = digits.slice(2).replace(/^0+/, '') || digits
    return { prefissoCellulare: pref, cellulare: num }
  }
  return { prefissoCellulare: '+39', cellulare: s.replace(/\D/g, '') }
}

export default function GpadelInfortuniPopup({ isOpen, onClose }) {
  const navigate = useNavigate()
  const uid = useId()
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    cellulare: '',
    email: '',
    privacy: false
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormErrors({})
    
    const errors = {}
    
    // Validazione nome
    if (!formData.nome.trim() || formData.nome.length < 2) {
      errors.nome = 'Il nome deve essere di almeno 2 caratteri'
    }
    
    // Validazione cognome
    if (!formData.cognome.trim() || formData.cognome.length < 2) {
      errors.cognome = 'Il cognome deve essere di almeno 2 caratteri'
    }
    
    // Validazione cellulare
    if (!formData.cellulare.trim() || formData.cellulare.length < 10) {
      errors.cellulare = 'Inserisci un numero di cellulare valido'
    }
    
    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Inserisci un indirizzo email valido'
    }
    
    // Validazione privacy
    if (!formData.privacy) {
      errors.privacy = 'Devi accettare la privacy policy'
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)

    const { prefissoCellulare, cellulare } = parseCellulare(formData.cellulare)
    const body = {
      nome: cleanName(formData.nome),
      cognome: cleanName(formData.cognome),
      email: formData.email.trim(),
      prefissoCellulare,
      cellulare,
      statusRichiesta: 'LEAD',
      fonteString: 'GPADEL',
      leadMagnetString: 'GPADEL_39',
      leadMagnetRequestedString: 'GPADEL_39',
      tag: 'PADEL',
      note: 'Pagina: lm-gpadel-infortuni. Guida Infortuni Padel gratuita.'
    }

    try {
      const response = await fetch(`${API_BASE}/api/richieste`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const json = await response.json()
      if (!response.ok || !json.success) {
        throw new Error(json.error || json.message || `Errore ${response.status}`)
      }

      setIsSubmitting(false)
      onClose()
      navigate('/lm-gpadel-infortuni-grazie')
    } catch (error) {
      console.error('API richieste:', error)
      setFormErrors({ submit: error.message || 'Si è verificato un errore durante l\'invio. Riprova più tardi.' })
      setIsSubmitting(false)
    }
  }

  const field = (name, label, props) => (
    <div className="mx-dlg-field">
      <label className="mx-dlg-label" htmlFor={`${uid}-${name}`}>{label}</label>
      <input
        className="mx-dlg-input"
        id={`${uid}-${name}`}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        required
        disabled={isSubmitting}
        aria-invalid={Boolean(formErrors[name])}
        aria-describedby={formErrors[name] ? `${uid}-${name}-err` : undefined}
        {...props}
      />
      {formErrors[name] && (
        <p className="mx-dlg-fielderr" id={`${uid}-${name}-err`}>{formErrors[name]}</p>
      )}
    </div>
  )

  return (
    <Dialog isOpen={isOpen} onClose={onClose} closeDisabled={isSubmitting} title="Compila il form">
      <DialogHeader
        kicker="Guida gratuita"
        title="Compila il form"
        text="Dopo che avrai compilato il form, la nostra segreteria farà un controllo manuale che si tratti di una richiesta vera e ti inverà la guida gratuita. Compila subito il form! 👇🏼"
      />

      <form className="mx-dlg-form" onSubmit={handleFormSubmit} noValidate>
        <div className="mx-dlg-row mx-dlg-row--2">
          {field('nome', 'Nome *', { type: 'text', placeholder: 'Nome *', autoComplete: 'given-name' })}
          {field('cognome', 'Cognome *', { type: 'text', placeholder: 'Cognome *', autoComplete: 'family-name' })}
        </div>
        {field('cellulare', 'Cellulare *', { type: 'tel', inputMode: 'tel', placeholder: 'Cellulare *', autoComplete: 'tel' })}
        {field('email', 'Email *', { type: 'email', inputMode: 'email', placeholder: 'Email *', autoComplete: 'email' })}

        <div>
          <label className="mx-dlg-check" htmlFor={`${uid}-privacy`}>
            <input
              type="checkbox"
              name="privacy"
              id={`${uid}-privacy`}
              checked={formData.privacy}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(formErrors.privacy)}
            />
            <span>
              Accetto la{' '}
              <a href="https://www.iubenda.com/privacy-policy/67925714" target="_blank" rel="noopener noreferrer">
                privacy policy
              </a>{' '}
              e autorizzo il trattamento dei miei dati personali
            </span>
          </label>
          {formErrors.privacy && <p className="mx-dlg-fielderr">{formErrors.privacy}</p>}
        </div>

        {formErrors.submit && <p className="mx-dlg-error" role="alert">{formErrors.submit}</p>}

        <button type="submit" className="mx-dlg-submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="mx-dlg-spinner" aria-hidden="true" />
              Invio in corso...
            </>
          ) : (
            <>
              Scarica la guida gratis
              <Download size={20} strokeWidth={2.6} />
            </>
          )}
        </button>
      </form>
    </Dialog>
  )
}
