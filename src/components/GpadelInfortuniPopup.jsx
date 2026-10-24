import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import '../styles/pages/gpadel-lm.css'

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

  // Esc per chiudere e pagina ferma sotto il pannello
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape' && !isSubmitting) onClose()
    }
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, isSubmitting, onClose])

  if (!isOpen) return null

  const fieldClass = (name) => `mx-gpl-field ${formErrors[name] ? 'is-error' : ''}`

  return createPortal(
    <div
      className="mx-gpl-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mx-gpl-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose()
        }
      }}
    >
      <motion.div
        className="mx-gpl-sheet"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Chiudi"
          onClick={() => {
            if (!isSubmitting) {
              onClose()
            }
          }}
          disabled={isSubmitting}
          className="mx-gpl-sheet__close"
        >
          <X size={20} />
        </button>

        <div className="mx-gpl-sheet__head">
          <span className="mx-gpl-sheet__thumb" aria-hidden="true">
            <img src="/landing-pages/web/lm-gpadel-copertina-480.jpg" alt="" width="1414" height="2000" />
          </span>
          <div>
            <h3 id="mx-gpl-modal-title" className="mx-h mx-gpl-sheet__title">Compila il form</h3>
          </div>
        </div>
        <p className="mx-gpl-sheet__intro">
          Dopo che avrai compilato il form, la nostra segreteria farà un controllo manuale che si tratti di una richiesta vera e ti inverà la guida gratuita. 
          Compila subito il form! 👇🏼
        </p>

        <form onSubmit={handleFormSubmit} className="mx-gpl-form">
          <div className="mx-gpl-form__row">
            <div className={fieldClass('nome')}>
              <input
                type="text"
                name="nome"
                placeholder="Nome *"
                aria-label="Nome"
                autoComplete="given-name"
                value={formData.nome}
                onChange={handleInputChange}
                required
                minLength={2}
                disabled={isSubmitting}
              />
              {formErrors.nome && <p className="mx-gpl-field__err">{formErrors.nome}</p>}
            </div>
            <div className={fieldClass('cognome')}>
              <input
                type="text"
                name="cognome"
                placeholder="Cognome *"
                aria-label="Cognome"
                autoComplete="family-name"
                value={formData.cognome}
                onChange={handleInputChange}
                required
                minLength={2}
                disabled={isSubmitting}
              />
              {formErrors.cognome && <p className="mx-gpl-field__err">{formErrors.cognome}</p>}
            </div>
          </div>

          <div className={fieldClass('cellulare')}>
            <input
              type="tel"
              name="cellulare"
              placeholder="Cellulare *"
              aria-label="Cellulare"
              autoComplete="tel"
              value={formData.cellulare}
              onChange={handleInputChange}
              required
              minLength={10}
              pattern="[0-9+\s\-\(\)]+"
              disabled={isSubmitting}
            />
            {formErrors.cellulare && <p className="mx-gpl-field__err">{formErrors.cellulare}</p>}
          </div>

          <div className={fieldClass('email')}>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              aria-label="Email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            {formErrors.email && <p className="mx-gpl-field__err">{formErrors.email}</p>}
          </div>

          <div>
            <div className="mx-gpl-consent">
              <input
                type="checkbox"
                name="privacy"
                id="privacy"
                checked={formData.privacy}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
              <label htmlFor="privacy">
                Accetto la <a href="https://www.iubenda.com/privacy-policy/67925714" target="_blank" rel="noopener noreferrer">privacy policy</a> e autorizzo il trattamento dei miei dati personali
              </label>
            </div>
            {formErrors.privacy && <p className="mx-gpl-field__err">{formErrors.privacy}</p>}
          </div>

          {formErrors.submit && (
            <div className="mx-gpl-form__fail">
              <p>{formErrors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mx-gpl-submit"
          >
            {isSubmitting ? 'Invio in corso...' : 'Scarica la guida gratis'}
          </button>
        </form>
      </motion.div>
    </div>,
    document.body
  )
}
